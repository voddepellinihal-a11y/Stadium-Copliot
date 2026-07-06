'use client';

import React, { useState } from 'react';
import { Leaf, Train, Bike, Droplets, Zap, Award, Recycle } from 'lucide-react';
import { useApp } from '../shared/AppContext';

const tips = [
  { icon: <Train className="w-6 h-6" />, color: 'text-green-600',
    en: 'Take the shuttle or public transit to reduce emissions. Shuttles run every 15 minutes from major transit hubs.',
    es: 'Tome el autobús o transporte público para reducir emisiones.',
    fr: 'Prenez la navette ou les transports en commun pour réduire les émissions.' },
  { icon: <Bike className="w-6 h-6" />, color: 'text-emerald-600',
    en: 'Walking or biking? Use designated green routes. Free bike parking at all gates!',
    es: '¿Caminando o en bicicleta? Use las rutas verdes. Estacionamiento gratis.',
    fr: 'Vous marchez ou à vélo ? Utilisez les voies vertes. Stationnement vélo gratuit!' },
  { icon: <Droplets className="w-6 h-6" />, color: 'text-blue-600',
    en: 'Refill your water bottle at 50+ stations. 10,000+ plastic bottles saved per match!',
    es: 'Recargue su botella en 50+ estaciones. ¡10,000+ botellas ahorradas!',
    fr: 'Remplissez votre gourde à 50+ stations. 10 000+ bouteilles sauvées!' },
  { icon: <Recycle className="w-6 h-6" />, color: 'text-teal-600',
    en: 'Use designated recycling bins. Green for recyclables, black for waste.',
    es: 'Use contenedores de reciclaje. Verde para reciclables, negro para residuos.',
    fr: 'Utilisez les bacs de recyclage. Vert pour recyclables, noir pour déchets.' },
  { icon: <Zap className="w-6 h-6" />, color: 'text-yellow-600',
    en: 'The stadium runs on 100% renewable energy - solar panels and LED lighting throughout.',
    es: 'El estadio funciona con 100% energía renovable - paneles solares e iluminación LED.',
    fr: "Le stade fonctionne avec 100% d'énergie renouvelable." },
  { icon: <Leaf className="w-6 h-6" />, color: 'text-green-700',
    en: 'Digital tickets only - no paper waste! Show your QR code for paperless entry.',
    es: '¡Solo boletos digitales! Muestre su código QR para entrada sin papel.',
    fr: 'Billets numériques uniquement ! Montrez votre code QR.' },
];

export default function SustainabilityContent() {
  const { language: lang, highContrast } = useApp();
  const [score, setScore] = useState(45);
  const [actions, setActions] = useState<string[]>([]);

  const t = (en: string, es: string, fr: string) => lang === 'en' ? en : lang === 'es' ? es : fr;

  const items = [
    { key: 'transit', en: 'Used public transit', es: 'Usé transporte público', fr: 'Transport en commun' },
    { key: 'walked', en: 'Walked or biked', es: 'Caminé o bicicleta', fr: 'Marché ou vélo' },
    { key: 'refill', en: 'Used refillable bottle', es: 'Usé botella recargable', fr: 'Gourde réutilisable' },
    { key: 'recycle', en: 'Used recycling bins', es: 'Usé reciclaje', fr: 'Utilisé recyclage' },
    { key: 'digital', en: 'Used digital ticket', es: 'Usé boleto digital', fr: 'Billet numérique' },
  ];

  const toggle = (key: string) => {
    const updated = actions.includes(key) ? actions.filter(a => a !== key) : [...actions, key];
    setActions(updated);
    setScore(Math.min(100, updated.length * 20));
  };

  const badge = score >= 80 ? '🏆 Green Champion' : score >= 50 ? '🌿 Eco-Friendly' : score >= 20 ? '🌱 Getting Started' : '♻️ Beginner';

  return (
    <div className={`flex-1 overflow-y-auto ${highContrast ? 'bg-black' : 'bg-gray-50'}`} role="main" aria-label={t('Sustainability Tracker', 'Rastreador de Sostenibilidad', 'Suivi Durabilité')}>
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        {/* Score Card */}
        <div className={`p-6 rounded-2xl text-center ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-md'}`}>
          <div className="text-5xl mb-2" aria-hidden="true">{badge.split(' ')[0]}</div>
          <div className="text-3xl font-bold" aria-label={`${t('Score', 'Puntuación', 'Score')}: ${score}%`}>{score}%</div>
          <div className="text-sm mt-1 font-semibold">{badge.slice(badge.indexOf(' ') + 1)}</div>
          <div className={`h-2 rounded-full mt-3 ${highContrast ? 'bg-gray-700' : 'bg-gray-200'}`} role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={t('Green score', 'Puntuación verde', 'Score vert')}>
            <div className={`h-full rounded-full transition-all duration-1000 ${highContrast ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${score}%` }}></div>
          </div>
        </div>

        {/* Action Tracker */}
        <div className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
          <h3 className="font-bold text-sm mb-3">
            <Award className="w-4 h-4 inline text-green-600 mr-2" aria-hidden="true" />
            {t('Track Your Green Actions', 'Registra tus Acciones Verdes', 'Suivez Vos Actions Vertes')}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2" role="group" aria-label={t('Green actions checklist', 'Lista de acciones verdes', 'Liste d\'actions vertes')}>
            {items.map(item => (
              <button
                key={item.key}
                onClick={() => toggle(item.key)}
                role="checkbox"
                aria-checked={actions.includes(item.key)}
                aria-label={t(item.en, item.es, item.fr)}
                className={`p-3 rounded-lg text-sm text-left transition-all ${
                  actions.includes(item.key) ? highContrast ? 'bg-yellow-500 text-black border-2 border-yellow-500' : 'bg-green-100 text-green-800 border-2 border-green-500'
                  : highContrast ? 'bg-gray-800 border border-gray-600' : 'bg-gray-50 border'
                }`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${actions.includes(item.key) ? 'bg-green-500 border-green-500' : highContrast ? 'border-gray-500' : 'border-gray-300'}`} aria-hidden="true">
                    {actions.includes(item.key) && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span>{t(item.en, item.es, item.fr)}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="grid gap-3 md:grid-cols-2">
          {tips.map((tip, i) => (
            <div key={i} className={`p-4 rounded-xl ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm hover:shadow-md'}`}>
              <div className={`mb-2 ${tip.color}`} aria-hidden="true">{tip.icon}</div>
              <p className="text-sm leading-relaxed">{t(tip.en, tip.es, tip.fr)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
