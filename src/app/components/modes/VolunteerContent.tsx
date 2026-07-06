'use client';

import React, { useState } from 'react';
import { Languages, MessageSquare, BookOpen, ChevronRight } from 'lucide-react';
import { useApp } from '../shared/AppContext';

const scripts: Record<string, Record<string, string>> = {
  'Where is Gate X?': { en: 'Gate X is located on the [direction] side of the stadium. Follow the signs along the concourse.', es: 'La Puerta X está ubicada en el lado [dirección] del estadio. Siga las señales.', fr: "La Porte X est située du côté [direction] du stade. Suivez les panneaux." },
  'Where is the restroom?': { en: 'The nearest restroom is right around the corner. Follow the restroom signs.', es: 'El baño más cercano está a la vuelta de la esquina. Siga las señales.', fr: "Les toilettes les plus proches sont juste au coin. Suivez les panneaux." },
  'Match information': { en: 'The match starts at [time]. Gates opened [X] hours before kickoff.', es: 'El partido comienza a las [hora]. Las puertas abrieron [X] horas antes.', fr: "Le match commence à [heure]. Les portes ont ouvert [X] heures avant." },
  'Lost child/friend': { en: 'Please stay calm. Go to the nearest Guest Services desk. Staff will help locate them.', es: 'Mantenga la calma. Vaya al Servicio al Huésped más cercano.', fr: "Restez calme. Rendez-vous au service aux invités le plus proche." },
  'Medical emergency': { en: 'Stay with the person. Call 911 or notify security immediately.', es: 'Quédese con la persona. Llame al 911 o notifique a seguridad.', fr: "Restez avec la personne. Appelez le 112 ou prévenez la sécurité." },
  'Wheelchair assistance': { en: 'Wheelchair assistance is available at all gates.', es: 'La asistencia en silla de ruedas está disponible en todas las puertas.', fr: "L'assistance en fauteuil roulant est disponible à toutes les portes." },
  'Food recommendations': { en: 'Several food options available: Pizza, Burgers, Tacos and more on all concourses.', es: 'Varias opciones de comida: Pizza, Hamburguesas, Tacos y más.', fr: "Plusieurs options de restauration : Pizza, Burgers, Tacos et plus." },
};

export default function VolunteerContent() {
  const { language: lang, highContrast } = useApp();
  const [activeScript, setActiveScript] = useState<string | null>(null);
  const t = (obj: Record<string, string>) => obj[lang] || obj.en || '';

  return (
    <div className={`flex-1 overflow-y-auto ${highContrast ? 'bg-black' : 'bg-gray-50'}`} role="main" aria-label={lang === 'en' ? 'Volunteer Hub' : lang === 'es' ? 'Centro de Voluntarios' : 'Centre de Bénévoles'}>
      <div className={`py-3 px-4 ${highContrast ? 'bg-gray-900 border-b border-gray-700' : 'bg-white border-b'} shadow-sm`}>
        <h2 className="text-lg font-bold flex items-center gap-2">
          <BookOpen className="w-5 h-5" aria-hidden="true" />
          {lang === 'en' ? 'Volunteer Quick-Response Hub' : lang === 'es' ? 'Centro de Respuesta Rápida' : 'Centre de Réponse Rapide'}
        </h2>
      </div>
      <div className="p-4">
        <div className="max-w-4xl mx-auto grid gap-3 md:grid-cols-2" role="list" aria-label={lang === 'en' ? 'Available scripts' : lang === 'es' ? 'Guiones disponibles' : 'Scripts disponibles'}>
          {Object.entries(scripts).map(([key, script]) => (
            <button
              key={key}
              onClick={() => setActiveScript(activeScript === key ? null : key)}
              role="listitem"
              aria-label={`${key}. ${activeScript === key ? t(script) : ''}`}
              className={`text-left p-4 rounded-xl transition-all ${highContrast ? activeScript === key ? 'bg-gray-800 border-2 border-yellow-500' : 'bg-gray-900 border border-gray-700' : activeScript === key ? 'bg-blue-50 border-2 border-blue-500 shadow-md' : 'bg-white border hover:shadow-md'}`}
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sm">{key}</h3>
                <ChevronRight className={`w-4 h-4 mt-0.5 transition-transform ${activeScript === key ? 'rotate-90' : ''}`} aria-hidden="true" />
              </div>
              {activeScript === key && (
                <div className="mt-3 p-3 rounded-lg text-sm bg-gray-50" role="region" aria-label={lang === 'en' ? 'Script content' : lang === 'es' ? 'Contenido del guion' : 'Contenu du script'}>
                  <div className="flex items-center gap-1.5 text-xs font-semibold mb-1.5 opacity-60 uppercase">
                    <MessageSquare className="w-3 h-3" aria-hidden="true" /> Script
                  </div>
                  <p>{t(script)}</p>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
