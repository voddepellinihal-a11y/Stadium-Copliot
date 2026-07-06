'use client';

import React, { useEffect, useRef } from 'react';
import { Eye, ChevronDown } from 'lucide-react';
import { useApp, AppMode, CityKey } from './AppContext';

const cityNames: Record<CityKey, string> = {
  metlife: 'MetLife Stadium',
  sofi: 'SoFi Stadium',
  azteca: 'Estadio Azteca',
  bc_place: 'BC Place',
};

const modeLabels: Record<AppMode, Record<string, string>> = {
  fan: { en: 'Fan Chat', es: 'Chat Fan', fr: 'Chat Fan' },
  volunteer: { en: 'Volunteer', es: 'Voluntario', fr: 'Bénévole' },
  ops: { en: 'Operations', es: 'Operaciones', fr: 'Opérations' },
  analytics: { en: 'Analytics', es: 'Analítica', fr: 'Analytique' },
  sustainability: { en: 'Green', es: 'Verde', fr: 'Vert' },
  accessibility: { en: 'Access', es: 'Acceso', fr: 'Accès' },
};

const modeIcons: Record<AppMode, string> = {
  fan: '💬',
  volunteer: '👥',
  ops: '📊',
  analytics: '📈',
  sustainability: '🌱',
  accessibility: '♿',
};

export default function GlobalHeader() {
  const { mode, setMode, language, setLanguage, highContrast, setHighContrast, city, setCity } = useApp();
  const [cityOpen, setCityOpen] = React.useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  // Close city dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close city dropdown on Escape
  const handleCityKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setCityOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${highContrast ? 'bg-yellow-500 text-black' : 'bg-gradient-to-r from-blue-600 to-blue-800 text-white'} shadow-lg`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-2 py-1.5">
        <div className="flex items-center justify-between gap-1">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-base ${highContrast ? 'bg-black text-yellow-500' : 'bg-blue-500'}`}
              aria-hidden="true"
            >⚽</div>
            <span className="sr-only">Stadium Copilot 2026</span>
          </div>

          {/* Mode Switcher */}
          <nav
            className="flex items-center gap-0.5 overflow-x-auto max-w-[55%] md:max-w-none no-scrollbar bg-black/10 rounded-lg p-0.5"
            role="tablist"
            aria-label={language === 'es' ? 'Navegación de modos' : language === 'fr' ? 'Navigation des modes' : 'Mode navigation'}
          >
            {(Object.keys(modeLabels) as AppMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                role="tab"
                aria-selected={mode === m}
                aria-label={`${modeIcons[m]} ${modeLabels[m][language]}`}
                className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] md:text-xs font-semibold whitespace-nowrap transition-all ${
                  mode === m
                    ? highContrast ? 'bg-black text-yellow-500' : 'bg-white text-blue-700 shadow-sm'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <span aria-hidden="true">{modeIcons[m]}</span>
                <span className="hidden md:inline">{modeLabels[m][language]}</span>
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1 flex-shrink-0">
            {/* City selector */}
            <div className="relative" ref={cityRef} onKeyDown={handleCityKeyDown}>
              <button
                onClick={() => setCityOpen(!cityOpen)}
                aria-expanded={cityOpen}
                aria-haspopup="listbox"
                aria-label={language === 'es' ? 'Seleccionar ciudad' : language === 'fr' ? 'Sélectionner la ville' : 'Select city'}
                className={`flex items-center gap-0.5 px-1.5 py-1 rounded text-[10px] ${highContrast ? 'bg-black text-yellow-500' : 'bg-blue-700'} hover:opacity-90`}
              >
                <span className="hidden sm:inline text-[10px]">{cityNames[city].split(' ')[0]}</span>
                <span className="sm:hidden text-[9px]">{city.toUpperCase().slice(0, 3)}</span>
                <ChevronDown className="w-2.5 h-2.5" aria-hidden="true" />
              </button>
              {cityOpen && (
                <div
                  className={`absolute right-0 mt-1 w-40 rounded-lg shadow-xl z-50 ${highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white border'}`}
                  role="listbox"
                  aria-label={language === 'es' ? 'Lista de ciudades' : language === 'fr' ? 'Liste des villes' : 'City list'}
                >
                  {(Object.entries(cityNames) as [CityKey, string][]).map(([key, name]) => (
                    <button
                      key={key}
                      onClick={() => { setCity(key); setCityOpen(false); }}
                      role="option"
                      aria-selected={city === key}
                      className={`block w-full text-left px-3 py-1.5 text-xs ${highContrast ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} ${city === key ? 'font-bold' : ''}`}
                    >{name}</button>
                  ))}
                </div>
              )}
            </div>

            {/* Language */}
            <div className="flex gap-px" role="radiogroup" aria-label={language === 'es' ? 'Seleccionar idioma' : language === 'fr' ? 'Sélectionner la langue' : 'Select language'}>
              {(['en', 'es', 'fr'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  role="radio"
                  aria-checked={language === l}
                  aria-label={l === 'en' ? 'English' : l === 'es' ? 'Español' : 'Français'}
                  className={`px-1 py-0.5 text-[9px] font-bold uppercase rounded transition-colors ${
                    language === l ? highContrast ? 'bg-black text-yellow-500' : 'bg-white text-blue-700' : 'text-white/60 hover:text-white'
                  }`}>{l}</button>
              ))}
            </div>

            {/* High Contrast */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-label={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
              aria-pressed={highContrast}
              className={`p-1 rounded-full transition-colors ${highContrast ? 'bg-black text-yellow-500 hover:bg-gray-900' : 'bg-blue-700 hover:bg-blue-600'}`}
              title="Toggle high contrast"
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
