'use client';

import React, { useState } from 'react';
import { Accessibility, Volume2, Eye, Ear, ZoomIn, Map, ChevronRight, HelpCircle } from 'lucide-react';
import { useApp } from '../shared/AppContext';

export default function AccessibilityContent() {
  const { language: lang, highContrast: globalContrast, setHighContrast } = useApp();
  const [fontSize, setFontSize] = useState(100);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [showEscalation, setShowEscalation] = useState(false);

  const t = (en: string, es: string, fr: string) => lang === 'en' ? en : lang === 'es' ? es : fr;

  const features = [
    { icon: <Eye className="w-8 h-8" />, title: t('High Contrast', 'Alto Contraste', 'Haut Contraste'), desc: t('Toggle high contrast colors', 'Active colores de alto contraste', 'Activez les couleurs contrastées'), action: () => setHighContrast(!globalContrast), active: globalContrast },
    { icon: <ZoomIn className="w-8 h-8" />, title: t('Text Size', 'Tamaño Texto', 'Taille Texte'), desc: t('Adjust text size', 'Ajuste tamaño', 'Ajustez la taille'), control: 'slider', value: fontSize, setValue: setFontSize },
    { icon: <Volume2 className="w-8 h-8" />, title: t('Voice Output', 'Salida de Voz', 'Sortie Vocale'), desc: t('Enable text-to-speech', 'Active texto a voz', 'Activez synthèse vocale'), action: () => setVoiceEnabled(!voiceEnabled), active: voiceEnabled },
  ];

  return (
    <div className={`flex-1 overflow-y-auto ${globalContrast ? 'bg-black' : 'bg-gray-50'}`} style={{ fontSize: `${fontSize}%` }} role="main" aria-label={t('Accessibility Companion', 'Compañero de Accesibilidad', "Compagnon d'Accessibilité")}>
      <div className="max-w-5xl mx-auto p-4 space-y-4">
        {/* Header */}
        <div className={`p-5 rounded-2xl ${globalContrast ? 'bg-gray-900 border-2 border-yellow-500' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'}`}>
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center" aria-hidden="true">
              <Accessibility className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl font-bold">{t('Accessibility Companion', 'Compañero de Accesibilidad', "Compagnon d'Accessibilité")}</h2>
              <p className="text-sm opacity-90">{t('Inclusive for everyone!', '¡Inclusivo para todos!', 'Inclusif pour tous!')}</p>
            </div>
          </div>
        </div>

        {/* Step-Free Routes */}
        <div className={`p-4 rounded-xl ${globalContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
          <h3 className="font-bold text-sm mb-3">
            <Map className="w-4 h-4 inline text-purple-600 mr-2" aria-hidden="true" />
            {t('Step-Free Routes', 'Rutas Sin Escaleras', 'Itinéraires Sans Marches')}
          </h3>
          <div className="grid sm:grid-cols-2 gap-2" role="list" aria-label={t('Available step-free routes', 'Rutas sin escaleras disponibles', 'Itinéraires sans marches disponibles')}>
            {[
              'Gate A → Section 101-110 ♿',
              'Gate B → Section 111-120 ♿',
              'Gate C → Section 121-130 ♿',
              'Parking A → Gate A ♿',
            ].map((r, i) => (
              <div key={i} role="listitem" className={`flex items-center justify-between p-3 rounded-lg text-sm ${globalContrast ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <span>{r}</span>
                <ChevronRight className="w-4 h-4 opacity-40" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-3">
          {features.map((feat, i) => (
            <div key={i} className={`p-4 rounded-xl transition-all ${
              globalContrast ? feat.active ? 'bg-yellow-500 text-black border-2 border-yellow-500' : 'bg-gray-900 border border-gray-700'
              : feat.active ? 'bg-purple-50 border-2 border-purple-500 shadow-md' : 'bg-white shadow-sm hover:shadow-md'
            }`}>
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${feat.active ? 'opacity-100' : globalContrast ? 'bg-gray-800' : 'bg-purple-100'}`} aria-hidden="true">
                  {feat.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-sm">{feat.title}</h4>
                  <p className="text-xs opacity-70 mt-0.5">{feat.desc}</p>
                  {feat.action && (
                    <button
                      onClick={feat.action}
                      aria-pressed={feat.active}
                      aria-label={`${feat.title}: ${feat.active ? t('Active', 'Activo', 'Actif') : t('Enable', 'Activar', 'Activer')}`}
                      className={`mt-2 px-4 py-1.5 rounded-lg text-xs font-semibold ${feat.active ? globalContrast ? 'bg-black text-yellow-500' : 'bg-purple-600 text-white' : globalContrast ? 'bg-gray-800 text-white border border-gray-600' : 'bg-gray-200 text-gray-700'}`}
                    >
                      {feat.active ? '✓ Active' : 'Enable'}
                    </button>
                  )}
                  {feat.control === 'slider' && (
                    <div className="mt-2">
                      <label htmlFor={`font-slider-${i}`} className="sr-only">{t('Font size', 'Tamaño de fuente', 'Taille de police')}</label>
                      <input
                        id={`font-slider-${i}`}
                        type="range"
                        min="75"
                        max="150"
                        value={feat.value}
                        onChange={e => feat.setValue(parseInt(e.target.value))}
                        aria-valuenow={feat.value}
                        aria-valuemin={75}
                        aria-valuemax={150}
                        aria-label={t('Font size', 'Tamaño de fuente', 'Taille de police')}
                        className="w-full h-1.5 rounded-full appearance-none cursor-pointer bg-gray-300"
                      />
                      <div className="flex justify-between text-[10px] opacity-50 mt-0.5" aria-hidden="true">
                        <span>A</span><span>{feat.value}%</span><span className="text-lg">A</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Emergency Assistance */}
        <div className={`p-4 rounded-xl ${globalContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white shadow-sm'}`}>
          <h3 className="font-bold text-sm mb-3">{t('Need Human Assistance?', '¿Necesita Ayuda?', "Besoin d'Aide?")}</h3>
          <button
            onClick={() => setShowEscalation(!showEscalation)}
            aria-expanded={showEscalation}
            aria-label={t('Emergency Assistance', 'Asistencia de Emergencia', "Assistance d'Urgence")}
            className="w-full p-3 rounded-lg text-sm font-semibold bg-red-500 text-white hover:bg-red-600"
          >
            {t('Emergency Assistance', 'Asistencia de Emergencia', "Assistance d'Urgence")}
          </button>
          {showEscalation && (
            <div className={`mt-3 p-3 rounded-lg text-sm ${globalContrast ? 'bg-gray-800 border border-yellow-500' : 'bg-red-50 border border-red-200'}`} role="alert">
              <p className="font-bold mb-1">{t('Help is on the way!', '¡Ayuda en camino!', "L'aide arrive!")}</p>
              <p>{t('A volunteer has been notified of your location.', 'Un voluntario ha sido notificado.', 'Un bénévole a été averti.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
