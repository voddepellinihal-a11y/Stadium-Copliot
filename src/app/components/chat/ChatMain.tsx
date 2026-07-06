'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import { useApp, Lang, CityKey } from '../shared/AppContext';
import { checkRateLimit, sanitizeInput, validateInput } from '../../lib/security';
import { t } from '../../data/translations';
import { getCityData } from '../../data/cityData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isEmergency?: boolean;
}

const responseCache = new Map<string, string>();

function findAnswer(question: string, city: CityKey, lang: Lang): string {
  const lower = question.toLowerCase();
  const venue = getCityData(city);
  if (!venue.name) return t(lang, 'sorryError');

  const cacheKey = `${city}:${lang}:${lower}`;
  if (responseCache.has(cacheKey)) return responseCache.get(cacheKey)!;

  const tr = (obj: Record<string, string> | undefined): string => {
    if (!obj) return '';
    return obj[lang] || obj.en || '';
  };

  const fallback = t(lang, 'sorryError');

  let answer: string;

  if (lower.includes('fire') || lower.includes('medical') || lower.includes('emergency') || lower.includes('help') || lower.includes('doctor') || lower.includes('hospital') || lower.includes('police') || lower.includes('ambulance') || lower.includes('fuego') || lower.includes('médico') || lower.includes('urgencia') || lower.includes('ayuda') || lower.includes('incendie') || lower.includes('urgence')) {
    answer = `🚨 EMERGENCY: Please stay calm. A staff member is being notified. Medical aid is at ${tr(venue.services?.medical)}.`;
  } else if (lower.includes('gate') || lower.includes('puerta') || lower.includes('porte')) {
    const gates = venue.gates;
    answer = gates ? Object.values(gates).map((v) => `• ${tr(v)}`).join('\n') : fallback;
  } else if (lower.includes('restroom') || lower.includes('bathroom') || lower.includes('toilet') || lower.includes('baño') || lower.includes('toilettes')) {
    answer = venue.restrooms?.map((r) => `• ${tr(r)}`).join('\n') || 'Restrooms are available near all sections.';
  } else if (lower.includes('food') || lower.includes('eat') || lower.includes('comida') || lower.includes('manger')) {
    answer = venue.food?.map((f) => `• ${tr(f)}`).join('\n') || 'Multiple food options available throughout the concourses.';
  } else if (lower.includes('wheelchair') || lower.includes('accessible') || lower.includes('accesible')) {
    answer = `${tr(venue.accessibility?.wheelchair_routes)}\n\nAssistance: ${tr(venue.accessibility?.assistance)}`;
  } else if (lower.includes('match') || lower.includes('start') || lower.includes('schedule') || lower.includes('partido') || lower.includes('hora')) {
    answer = typeof venue.schedule === 'object' ? tr(venue.schedule) : (venue.schedule || 'Match schedule is available at the information boards.');
  } else if (lower.includes('parking') || lower.includes('park') || lower.includes('estacionamiento') || lower.includes('stationnement')) {
    answer = tr(venue.transport?.parking) || 'Parking information is available at the venue website.';
  } else if (lower.includes('train') || lower.includes('metro') || lower.includes('skytrain') || lower.includes('shuttle') || lower.includes('bus') || lower.includes('transport')) {
    const transport = venue.transport;
    answer = !transport ? 'Public transit information available at information desks.' : Object.values(transport).map((v) => `• ${tr(v)}`).join('\n');
  } else if (lower.includes('bag') || lower.includes('bolsa') || lower.includes('sac')) {
    answer = tr(venue.bag_policy) || 'Check venue policy on the official website.';
  } else if (lower.includes('medical') || lower.includes('first aid')) {
    answer = `Medical services: ${tr(venue.services?.medical)}\nLost & Found: ${tr(venue.services?.lost_and_found)}`;
  } else {
    answer = `${fallback}\n\n${typeof venue.schedule === 'object' ? tr(venue.schedule) : (venue.schedule || '')}`;
  }

  responseCache.set(cacheKey, answer);
  if (responseCache.size > 200) {
    const firstKey = responseCache.keys().next().value!;
    responseCache.delete(firstKey);
  }
  return answer;
}

/** Fan chat interface with keyword-driven Q&A, rate limiting, and accessibility support */
export function Chat() {
  const { language: lang, highContrast, city } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', text: t(lang, 'welcomeMessage'), sender: 'ai', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitWarning, setRateLimitWarning] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, []);
  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  useEffect(() => {
    return () => {
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
    };
  }, []);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const question = sanitizeInput(input.trim());
    if (!question) return;

    const validation = validateInput(question);
    if (!validation.valid) {
      setRateLimitWarning(validation.error || t(lang, 'errorOccurred'));
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      warningTimerRef.current = setTimeout(() => setRateLimitWarning(''), 3000);
      return;
    }

    if (!checkRateLimit()) {
      setRateLimitWarning(t(lang, 'tooManyMessages'));
      if (warningTimerRef.current) clearTimeout(warningTimerRef.current);
      warningTimerRef.current = setTimeout(() => setRateLimitWarning(''), 5000);
      return;
    }

    setRateLimitWarning('');
    setMessages(prev => [...prev, { id: Date.now().toString(), text: question, sender: 'user', timestamp: new Date() }]);
    setInput('');
    setIsLoading(true);

    try {
      await new Promise(r => setTimeout(r, 600));
      const answer = findAnswer(question, city, lang);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: answer, sender: 'ai', timestamp: new Date() }]);
    } catch {
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: t(lang, 'sorryError'), sender: 'ai', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const quickActions = [
    { key: 'qaRestroom' as const },
    { key: 'qaGateA' as const },
    { key: 'qaMatchTime' as const },
    { key: 'qaFood' as const },
    { key: 'qaWheelchair' as const },
    { key: 'qaParking' as const },
  ];

  return (
    <div className="flex flex-col h-full" role="main" aria-label={t(lang, 'stadiumCopilot')}>
      {rateLimitWarning && (
        <div role="alert" className="bg-yellow-100 text-yellow-800 text-xs text-center py-1 px-3" aria-live="polite">
          {rateLimitWarning}
        </div>
      )}

      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${highContrast ? 'bg-black' : 'bg-gray-50'}`}
        role="log"
        aria-label={t(lang, 'chatMessages')}
        aria-live="polite"
      >
        {messages.map(m => (
          <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                m.sender === 'user'
                  ? highContrast ? 'bg-yellow-500 text-black' : 'bg-blue-600 text-white rounded-br-md'
                  : highContrast ? 'bg-gray-800 text-white border border-gray-600 rounded-bl-md' : 'bg-white text-gray-800 shadow-sm rounded-bl-md'
              } ${m.isEmergency ? 'bg-red-600 text-white font-bold' : ''}`}
              role="article"
              aria-label={m.sender === 'user' ? t(lang, 'youSaid') : t(lang, 'assistantSaid')}
            >
              {m.text}
              <div className="text-[10px] mt-1.5 opacity-60">
                <time dateTime={m.timestamp.toISOString()}>{m.timestamp.toLocaleTimeString()}</time>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start" role="status" aria-label={t(lang, 'typing')}>
            <div className={`p-4 rounded-2xl ${highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-white shadow-sm'}`}>
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                <div className="w-2.5 h-2.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} aria-hidden="true" />
      </div>

      <div className={`flex flex-wrap gap-1.5 p-3 justify-center ${highContrast ? 'bg-black border-t border-gray-700' : 'bg-white border-t'}`} role="group" aria-label={t(lang, 'quickActions')}>
        {quickActions.map(qa => (
          <button key={qa.key} onClick={() => setInput(t(lang, qa.key))}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              highContrast ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
            aria-label={t(lang, qa.key)}
          >{t(lang, qa.key)}</button>
        ))}
      </div>

      <div className={`border-t p-3 ${highContrast ? 'bg-black border-gray-700' : 'bg-white'}`}>
        <form onSubmit={sendMessage} className="flex gap-2 max-w-4xl mx-auto" role="search">
          <label htmlFor="chat-input" className="sr-only">
            {t(lang, 'typeYourQuestion')}
          </label>
          <input
            ref={inputRef}
            id="chat-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={t(lang, 'askAboutStadium')}
            maxLength={500}
            aria-label={t(lang, 'typeYourQuestion')}
            className={`flex-1 p-3 rounded-xl outline-none ring-2 transition-all text-sm ${
              highContrast ? 'bg-gray-800 text-white ring-gray-600 focus:ring-yellow-500 placeholder-gray-400' : 'bg-gray-100 text-gray-800 ring-gray-200 focus:ring-blue-500'
            }`}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}
            aria-label={t(lang, 'sendMessage')}
            className={`px-5 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 ${
              highContrast ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}>
            <Send className="w-5 h-5" aria-hidden="true" />
          </button>
        </form>
        <div className="text-[10px] text-center mt-1 opacity-40">
          {input.length}/500 {t(lang, 'charactersLeft')}
        </div>
      </div>
    </div>
  );
}
