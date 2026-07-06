'use client';

import React, { useState } from 'react';
import { Leaf, CheckCircle, Circle, Droplets, Zap, Recycle } from 'lucide-react';
import { useApp } from '../shared/AppContext';
import { t, CityKnowledge } from '../../data/translations';
import cityKnowledgeData from '../../data/city_knowledge.json';

const defaultActions = [
  { id: 1, label: 'Use public transit', labelEs: 'Usar transporte público', labelFr: 'Utiliser les transports en commun', icon: '🚌', completed: false },
  { id: 2, label: 'Bring reusable bottle', labelEs: 'Traer botella reutilizable', labelFr: 'Apporter une bouteille réutilisable', icon: '♻️', completed: false },
  { id: 3, label: 'Use recycling bins', labelEs: 'Usar contenedores de reciclaje', labelFr: 'Utiliser les bacs de recyclage', icon: '♻️', completed: false },
  { id: 4, label: 'Walk to nearby amenities', labelEs: 'Caminar a amenidades cercanas', labelFr: 'Marcher vers les commodités à proximité', icon: '🚶', completed: false },
  { id: 5, label: 'Share ride with friends', labelEs: 'Compartir viaje con amigos', labelFr: 'Partager le trajet avec des amis', icon: '🚗', completed: false },
];

export default function SustainabilityContent() {
  const { language, highContrast, city } = useApp();
  const [actions, setActions] = useState(defaultActions);
  const cityData = (cityKnowledgeData as CityKnowledge)[city];

  const score = Math.round((actions.filter(a => a.completed).length / actions.length) * 100);

  const toggleAction = (id: number) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const getLabel = (action: typeof defaultActions[0]) => {
    if (language === 'es') return action.labelEs;
    if (language === 'fr') return action.labelFr;
    return action.label;
  };

  const getScoreColor = () => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-600';
  };

  const getScoreBg = () => {
    if (score >= 80) return highContrast ? 'bg-green-900' : 'bg-green-50';
    if (score >= 60) return highContrast ? 'bg-amber-900' : 'bg-amber-50';
    return highContrast ? 'bg-red-900' : 'bg-red-50';
  };

  const sustainabilityFeatures = cityData.sustainability?.features || [
    'Water recycling systems',
    'Solar panel arrays',
    'Composting programs'
  ];

  return (
    <div className="h-full flex flex-col p-4 pb-2" role="tabpanel" id="panel-sustainability" aria-labelledby="tab-sustainability">
      <div className="mb-3">
        <div className="flex items-center gap-2 mb-1">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${highContrast ? 'bg-gray-800 text-green-400' : 'bg-green-50'}`}>
            <Leaf className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h1 className="text-lg font-bold">{t(language, 'sustainability')}</h1>
            <p className="text-xs text-gray-500">{t(language, 'sustainabilityDesc')}</p>
          </div>
        </div>
      </div>

      {/* Score */}
      <div className={`rounded-2xl p-4 mb-3 text-center ${getScoreBg()}`} role="status" aria-label={`Sustainability score: ${score}%`}>
        <div className="text-5xl font-black mb-1">
          <span className={getScoreColor()}>{score}</span>
          <span className="text-2xl">%</span>
        </div>
        <p className="text-xs font-medium text-gray-600">{t(language, 'score')} {t(language, 'sustainability')}</p>
        <div className="w-full h-3 rounded-full bg-gray-200 mt-3 overflow-hidden" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label="Sustainability score progress">
          <div className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500" style={{ width: `${score}%` }} />
        </div>
        <p className="text-[10px] text-gray-500 mt-2">{actions.filter(a => a.completed).length} / {actions.length} {t(language, 'actionsCompleted')}</p>
      </div>

      {/* Action Checklist */}
      <div className={`rounded-2xl p-3 mb-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className="font-bold text-xs mb-2">{t(language, 'ecoActions')}</h3>
        <div className="space-y-1.5" role="group" aria-label="Sustainability actions">
          {actions.map(action => (
            <button
              key={action.id}
              onClick={() => toggleAction(action.id)}
              role="checkbox"
              aria-checked={action.completed}
              aria-label={getLabel(action)}
              className={`flex items-center gap-3 w-full p-2.5 rounded-xl text-left transition-all ${
                highContrast
                  ? action.completed ? 'bg-green-900 text-green-400' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : action.completed ? 'bg-green-50 text-green-700' : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              {action.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" aria-hidden="true" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 flex-shrink-0" aria-hidden="true" />
              )}
              <span className="text-lg" aria-hidden="true">{action.icon}</span>
              <span className={`text-xs font-medium ${action.completed ? 'line-through' : ''}`}>{getLabel(action)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Stadium Features */}
      <div className={`rounded-2xl p-3 ${highContrast ? 'bg-gray-800' : 'bg-white border border-gray-200'}`}>
        <h3 className="font-bold text-xs mb-2">{t(language, 'stadiumFeatures')}</h3>
        <div className="space-y-1.5">
          <div className={`flex items-center gap-2 p-2 rounded-xl ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <Droplets className="w-4 h-4 text-blue-500" aria-hidden="true" />
            <div>
              <div className="text-[10px] font-semibold">{t(language, 'waterRecycling')}</div>
              <div className="text-[9px] text-gray-500">{sustainabilityFeatures[0]}</div>
            </div>
          </div>
          <div className={`flex items-center gap-2 p-2 rounded-xl ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <Zap className="w-4 h-4 text-yellow-500" aria-hidden="true" />
            <div>
              <div className="text-[10px] font-semibold">{t(language, 'solarPower')}</div>
              <div className="text-[9px] text-gray-500">{sustainabilityFeatures[1]}</div>
            </div>
          </div>
          <div className={`flex items-center gap-2 p-2 rounded-xl ${highContrast ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <Recycle className="w-4 h-4 text-green-500" aria-hidden="true" />
            <div>
              <div className="text-[10px] font-semibold">{t(language, 'composting')}</div>
              <div className="text-[9px] text-gray-500">{sustainabilityFeatures[2]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
