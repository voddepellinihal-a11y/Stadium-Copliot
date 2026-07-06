'use client';

import React, { useState, useRef } from 'react';
import { MapPin, Navigation, AlertTriangle, Users, Info, MessageSquare, Languages } from 'lucide-react';
import { useApp } from '../shared/AppContext';
import { t, CityKnowledge } from '../../data/translations';
import cityKnowledgeData from '../../data/city_knowledge.json';

export default function VolunteerContent() {
  const { language, highContrast, city } = useApp();
  const [query, setQuery] = useState('');
  const [reply, setReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const cityData = (cityKnowledgeData as CityKnowledge)[city];
  const gateKeys = cityData.gates ? Object.keys(cityData.gates) : [];
  const gateNames = gateKeys.map(k => cityData.gates[k as keyof typeof cityData.gates][language as 'en' | 'es' | 'fr'] || cityData.gates[k as keyof typeof cityData.gates].en);

  const faqTopics = [
    { id: 'gates', icon: MapPin, label: 'gatesRestrooms' },
    { id: 'safety', icon: AlertTriangle, label: 'safetyProcedures' },
    { id: 'lost', icon: Users, label: 'lostPerson' },
    { id: 'wheelchair', icon: Navigation, label: 'wheelchairAccess' },
  ] as const;

  const quickResponses: Record<string, { en: string; es: string; fr: string }> = {
    gates: {
      en: `All gates open 2 hours before kickoff. ${gateNames[0] || 'Main Gate'} and ${gateNames[1] || 'South Gate'} are for general admission.`,
      es: `Todos los portones se abren 2 horas antes del inicio. ${gateNames[0] || 'Puerta Principal'} y ${gateNames[1] || 'Puerta Sur'} son para admisión general.`,
      fr: `Toutes les portes ouvrent 2 heures avant le coup d'envoi. ${gateNames[0] || 'Porte Principale'} et ${gateNames[1] || 'Porte Sud'} sont pour l'admission générale.`,
    },
    safety: {
      en: `Emergency exits are located at ${gateNames.join(', ') || 'all gates'}. Report any suspicious activity to security immediately.`,
      es: `Las salidas de emergencia están en ${gateNames.join(', ') || 'todas las puertas'}. Reporte cualquier actividad sospechosa a seguridad.`,
      fr: `Les sorties de secours se trouvent aux ${gateNames.join(', ') || 'toutes les portes'}. Signalez toute activité suspecte à la sécurité.`,
    },
    lost: {
      en: `Lost and Found is located at Guest Services near the main entrance. Please check there first.`,
      es: `Objetos perdidos está en Servicios al Huésped cerca de la entrada principal. Por favor revise ahí primero.`,
      fr: `Objets trouvés se trouve aux Services aux Invités près de l'entrée principale. Veuillez vérifier d'abord.`,
    },
    wheelchair: {
      en: `${cityData.capacity} total capacity. Wheelchair accessible routes available at all gates.`,
      es: `${cityData.capacity} capacidad total. Rutas accesibles para silla de ruedas disponibles en todas las puertas.`,
      fr: `${cityData.capacity} capacité totale. Itinéraires accessibles aux fauteuils roulants disponibles à toutes les portes.`,
    },
  };

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setReply('');
    setSelectedTopic(null);
    try {
      const res = await fetch('/api/volunteer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, lang: language, city }),
      });
      if (res.ok) {
        const data = await res.json();
        setReply(data.reply || data.answer);
      } else {
        setReply(quickResponses.gates[language] || 'I can help you find the right answer. Please check with the information desk.');
      }
    } catch {
      setReply(quickResponses.gates[language] || 'I can help you find the right answer. Please check with the information desk.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col p-4 pb-2" role="tabpanel" id="panel-volunteer" aria-labelledby="tab-volunteer">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highContrast ? 'bg-gray-800 text-blue-400' : 'bg-blue-50'}`}>
            <MessageSquare className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{t(language, 'volunteer')} Hub</h1>
            <p className="text-xs text-gray-500">{t(language, 'volunteerDesc')}</p>
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-3 mb-3 ${highContrast ? 'bg-gray-800 text-white' : 'bg-blue-50 text-gray-800'}`}>
        <div className="flex items-start gap-2 mb-3">
          <Info className="w-4 h-4 mt-0.5 flex-shrink-0 text-blue-500" />
          <p className="text-xs leading-relaxed font-medium">{t(language, 'officialResponse')}</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-3" role="group" aria-label="FAQ Topics">
        {faqTopics.map(topic => {
          const Icon = topic.icon;
          const isActive = selectedTopic === topic.id;
          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopic(topic.id);
                setReply(quickResponses[topic.id]?.[language] || '');
              }}
              role="checkbox"
              aria-checked={isActive}
              aria-label={t(language, topic.label)}
              className={`flex flex-col items-center p-2.5 rounded-xl border-2 transition-all text-center ${
                highContrast
                  ? isActive ? 'bg-yellow-500 border-yellow-500 text-black font-bold' : 'border-gray-600 hover:border-yellow-500 text-gray-300'
                  : isActive ? 'bg-blue-100 border-blue-500 text-blue-700 font-semibold shadow-sm' : 'border-gray-200 hover:border-blue-300 bg-white'
              }`}
            >
              <Icon className="w-4 h-4 mb-1" aria-hidden="true" />
              <span className="text-[10px] font-semibold leading-tight">{t(language, topic.label)}</span>
            </button>
          );
        })}
      </div>

      {selectedTopic && quickResponses[selectedTopic] && (
        <div ref={listRef} className="mb-3 space-y-2" role="log" aria-label="Quick response">
          <div className={`rounded-xl p-3 text-sm ${highContrast ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 shadow-sm'}`} role="document">
            <div className="flex items-center gap-2 mb-1.5">
              <Languages className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              <span className="text-[10px] text-gray-500 font-semibold uppercase tracking-wide">{language}</span>
            </div>
            <p className="text-xs leading-relaxed">{quickResponses[selectedTopic][language]}</p>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col gap-2">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAsk()}
            placeholder={t(language, 'askVolunteer')}
            aria-label={t(language, 'askVolunteer')}
            className={`flex-1 rounded-xl border px-3 py-2.5 text-xs focus:ring-2 focus:ring-blue-500 ${
              highContrast ? 'border-gray-600 bg-gray-800 text-white placeholder:text-gray-400' : 'border-gray-200 bg-white'
            }`}
          />
          <button
            onClick={handleAsk}
            disabled={loading || !query.trim()}
            aria-label="Send question"
            className="bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold text-xs hover:bg-blue-700 disabled:opacity-50 transition-colors"
          >
            {loading ? '...' : <SendIcon />}
          </button>
        </div>
        {reply && (
          <div className={`rounded-xl p-3 text-xs leading-relaxed ${highContrast ? 'bg-gray-800 text-white' : 'bg-green-50 text-gray-800 border border-green-200'}`} role="alert">
            {reply}
          </div>
        )}
      </div>
    </div>
  );
}

function SendIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="m22 2-11 11"/></svg>;
}
