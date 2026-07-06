'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Send } from 'lucide-react';
import { useApp } from '../shared/AppContext';
import { checkRateLimit, sanitizeInput, validateInput } from '../../lib/security';
import cityKnowledge from '../../data/city_knowledge.json';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  isEmergency?: boolean;
}

const responseCache = new Map<string, string>();

function findAnswer(question: string, city: string, lang: string): string {
  const lower = question.toLowerCase();
  const venue = (cityKnowledge as Record<string, any>)[city];
  if (!venue) return lang === 'es' ? 'No tengo esa información. Por favor, pide ayuda a un voluntario.' : lang === 'fr' ? "Je n'ai pas cette information. Veuillez demander de l'aide à un bénévole." : "I don't have that information. Please ask a volunteer for assistance.";

  const cacheKey = `${city}:${lang}:${lower}`;
  if (responseCache.has(cacheKey)) return responseCache.get(cacheKey)!;

  const t = (obj: Record<string, string> | undefined): string => {
    if (!obj) return '';
    return obj[lang] || obj.en || '';
  };

  const fallback = lang === 'es' ? 'Puedo ayudar con puertas, baños, comida, transporte y accesibilidad.' : lang === 'fr' ? 'Je peux aider avec les portes, toilettes, nourriture, transport et accessibilité.' : 'I can help with gates, restrooms, food, transport, and accessibility.';

  let answer: string;

  const emergencyWords = ['fire', 'medical', 'emergency', 'help', 'doctor', 'hospital', 'police', 'ambulance', 'fuego', 'médico', 'urgencia', 'ayuda', 'incendie', 'urgence'];
  if (emergencyWords.some(w => lower.includes(w))) {
    answer = `🚨 EMERGENCY: Please stay calm. A staff member is being notified. If immediate help is needed, call local emergency services. Medical aid is at ${t(venue.services?.medical)}.`;
  } else if (lower.includes('gate') || lower.includes('puerta') || lower.includes('porte')) {
    const gates = venue.gates;
    answer = gates ? Object.values(gates).map((v) => `• ${t(v as Record<string, string>)}`).join('\n') : fallback;
  } else if (lower.includes('restroom') || lower.includes('bathroom') || lower.includes('toilet') || lower.includes('baño') || lower.includes('toilettes')) {
    answer = venue.restrooms?.map((r: Record<string, string>) => `• ${t(r)}`).join('\n') || 'Restrooms are available near all sections.';
  } else if (lower.includes('food') || lower.includes('eat') || lower.includes('comida') || lower.includes('manger')) {
    answer = venue.food?.map((f: Record<string, string>) => `• ${t(f)}`).join('\n') || 'Multiple food options available throughout the concourses.';
  } else if (lower.includes('wheelchair') || lower.includes('accessible') || lower.includes('accesible')) {
    answer = `${t(venue.accessibility?.wheelchair_routes)}\n\nAssistance: ${t(venue.accessibility?.assistance)}`;
  } else if (lower.includes('match') || lower.includes('start') || lower.includes('schedule') || lower.includes('partido') || lower.includes('hora')) {
    answer = t(venue.schedule) || 'Match schedule is available at the information boards.';
  } else if (lower.includes('parking') || lower.includes('park') || lower.includes('estacionamiento') || lower.includes('stationnement')) {
    answer = t(venue.transport?.parking) || 'Parking information is available at the venue website.';
  } else if (lower.includes('train') || lower.includes('metro') || lower.includes('skytrain') || lower.includes('shuttle') || lower.includes('bus') || lower.includes('transport')) {
    const transport = venue.transport;
    answer = !transport ? 'Public transit information available at information desks.' : Object.values(transport).map((v) => `• ${t(v as Record<string, string>)}`).join('\n');
  } else if (lower.includes('bag') || lower.includes('bolsa') || lower.includes('sac')) {
    answer = t(venue.bag_policy) || 'Check venue policy on the official website.';
  } else if (lower.includes('medical') || lower.includes('first aid')) {
    answer = `Medical services: ${t(venue.services?.medical)}\nLost & Found: ${t(venue.services?.lost_and_found)}`;
  } else {
    answer = `${fallback}\n\n${t(venue.schedule) || ''}`;
  }

  responseCache.set(cacheKey, answer);
  if (responseCache.size > 200) {
    const firstKey = responseCache.keys().next().value!;
    responseCache.delete(firstKey);
  }
  return answer;
}

export function Chat() {
  const { language: lang, highContrast, city } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { id: 'welcome', text: "👋 Welcome to Stadium Copilot! I'm your AI assistant for the FIFA World Cup 2026. How can I help you today?", sender: 'ai', timestamp: new Date() },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimitWarning, setRateLimitWarning] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, []);
  useEffect(() => { scrollToBottom(); }, [messages, scrollToBottom]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    // Sanitize input
    const question = sanitizeInput(input.trim());
    if (!question) return;

    // Validate input
    const validation = validateInput(question);
    if (!validation.valid) {
      setRateLimitWarning(validation.error || 'Invalid input');
      setTimeout(() => setRateLimitWarning(''), 3000);
      return;
    }

    // Rate limit check
    if (!checkRateLimit()) {
      setRateLimitWarning('Too many messages. Please wait a moment before sending again.');
      setTimeout(() => setRateLimitWarning(''), 5000);
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
    } catch (err) {
      console.error('[Chat Error]', err);
      const errorMsg = lang === 'es' ? 'Lo siento, tuve un problema. Por favor, intenta de nuevo.' : lang === 'fr' ? "Désolé, j'ai eu un problème. Veuillez réessayer." : "Sorry, I'm having trouble processing your request. Please try again.";
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), text: errorMsg, sender: 'ai', timestamp: new Date() }]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const quickActions = [
    { en: 'Where is the nearest restroom?', es: '¿Dónde está el baño más cercano?', fr: 'Où sont les toilettes les plus proches ?' },
    { en: 'How do I get to Gate A?', es: '¿Cómo llego a la Puerta A?', fr: 'Comment aller à la Porte A ?' },
    { en: 'What time does the match start?', es: '¿A qué hora empieza el partido?', fr: 'À quelle heure commence le match ?' },
    { en: 'Where can I find food?', es: '¿Dónde puedo encontrar comida?', fr: 'Où puis-je trouver à manger ?' },
    { en: 'Is there wheelchair access?', es: '¿Hay acceso para silla de ruedas?', fr: "Y a-t-il un accès fauteuil roulant ?" },
    { en: 'Where is the parking?', es: '¿Dónde está el estacionamiento?', fr: 'Où est le parking ?' },
  ];

  return (
    <div className="flex flex-col h-full" role="main" aria-label={lang === 'es' ? 'Asistente del Estadio' : lang === 'fr' ? 'Assistant du Stade' : 'Stadium Assistant'}>
      {/* Rate limit warning */}
      {rateLimitWarning && (
        <div role="alert" className="bg-yellow-100 text-yellow-800 text-xs text-center py-1 px-3" aria-live="polite">
          {rateLimitWarning}
        </div>
      )}

      {/* Messages */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-4 ${highContrast ? 'bg-black' : 'bg-gray-50'}`}
        role="log"
        aria-label={lang === 'es' ? 'Mensajes del chat' : lang === 'fr' ? 'Messages du chat' : 'Chat messages'}
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
              aria-label={m.sender === 'user' ? 'You said' : 'Assistant said'}
            >
              {m.text}
              <div className="text-[10px] mt-1.5 opacity-60">
                <time dateTime={m.timestamp.toISOString()}>{m.timestamp.toLocaleTimeString()}</time>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start" role="status" aria-label={lang === 'es' ? 'Escribiendo...' : lang === 'fr' ? 'En train d\'écrire...' : 'Typing...'}>
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

      {/* Quick Actions */}
      <div className={`flex flex-wrap gap-1.5 p-3 justify-center ${highContrast ? 'bg-black border-t border-gray-700' : 'bg-white border-t'}`} role="group" aria-label={lang === 'es' ? 'Acciones rápidas' : lang === 'fr' ? 'Actions rapides' : 'Quick actions'}>
        {quickActions.map(q => (
          <button key={q.en} onClick={() => setInput(q[lang as keyof typeof q])}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              highContrast ? 'bg-gray-800 text-white border border-gray-600 hover:bg-gray-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
            aria-label={q[lang as keyof typeof q]}
          >{q[lang as keyof typeof q]}</button>
        ))}
      </div>

      {/* Input */}
      <div className={`border-t p-3 ${highContrast ? 'bg-black border-gray-700' : 'bg-white'}`}>
        <form onSubmit={sendMessage} className="flex gap-2 max-w-4xl mx-auto" role="search">
          <label htmlFor="chat-input" className="sr-only">
            {lang === 'es' ? 'Escribe tu pregunta...' : lang === 'fr' ? 'Tapez votre question...' : 'Type your question...'}
          </label>
          <input
            ref={inputRef}
            id="chat-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={lang === 'es' ? 'Pregúntame sobre el estadio...' : lang === 'fr' ? 'Demandez-moi sur le stade...' : 'Ask me anything about the stadium...'}
            maxLength={500}
            aria-label={lang === 'es' ? 'Escribe tu pregunta' : lang === 'fr' ? 'Tapez votre question' : 'Type your question'}
            aria-describedby={rateLimitWarning ? 'rate-limit-msg' : undefined}
            className={`flex-1 p-3 rounded-xl outline-none ring-2 transition-all text-sm ${
              highContrast ? 'bg-gray-800 text-white ring-gray-600 focus:ring-yellow-500 placeholder-gray-400' : 'bg-gray-100 text-gray-800 ring-gray-200 focus:ring-blue-500'
            }`}
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !input.trim()}
            aria-label={lang === 'es' ? 'Enviar mensaje' : lang === 'fr' ? 'Envoyer le message' : 'Send message'}
            className={`px-5 py-3 rounded-xl font-semibold transition-all active:scale-95 disabled:opacity-50 ${
              highContrast ? 'bg-yellow-500 text-black hover:bg-yellow-400' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
            }`}>
            <Send className="w-5 h-5" aria-hidden="true" />
          </button>
        </form>
        <div className="text-[10px] text-center mt-1 opacity-40">
          {input.length}/500
        </div>
      </div>
    </div>
  );
}
