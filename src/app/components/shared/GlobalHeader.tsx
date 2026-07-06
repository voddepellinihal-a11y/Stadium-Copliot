'use client';

import React, { useEffect, useRef } from 'react';
import { Eye, ChevronDown, Globe, Shield } from 'lucide-react';
import { useApp, AppMode, CityKey } from './AppContext';

const cityNames: Record<CityKey, string> = {
  metlife: 'MetLife Stadium',
  sofi: 'SoFi Stadium',
  azteca: 'Estadio Azteca',
  bc_place: 'BC Place',
};

const cityFlags: Record<CityKey, string> = {
  metlife: '🇺🇸',
  sofi: '🇺🇸',
  azteca: '🇲🇽',
  bc_place: '🇨🇦',
};

const modeLabels: Record<AppMode, Record<string, string>> = {
  fan: { en: 'Fan Chat', es: 'Chat Fan', fr: 'Chat Fan' },
  volunteer: { en: 'Volunteer', es: 'Voluntario', fr: 'Bénévole' },
  ops: { en: 'Operations', es: 'Operaciones', fr: 'Opérations' },
  analytics: { en: 'Analytics', es: 'Analítica', fr: 'Analytique' },
  sustainability: { en: 'Green', es: 'Verde', fr: 'Vert' },
  accessibility: { en: 'Access', es: 'Acceso', fr: 'Accès' },
};

export default function GlobalHeader() {
  const { mode, setMode, language, setLanguage, highContrast, setHighContrast, city, setCity } = useApp();
  const [cityOpen, setCityOpen] = React.useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <header
      className={`flex-shrink-0 sticky top-0 z-50 transition-colors duration-300 ${
        highContrast ? 'bg-yellow-500 text-black' : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
      } shadow-lg`}
      role="banner"
    >
      {/* Top row: Logo + Mode tabs + Actions */}
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${
                highContrast ? 'bg-black text-yellow-500' : 'bg-white/20 backdrop-blur-sm'
              }`}
            >
              ⚽
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">Stadium Copilot</div>
              <div className="text-[9px] opacity-70 leading-tight">FIFA World Cup 2026</div>
            </div>
          </div>

          {/* Mode Tabs - Desktop */}
          <nav
            className="hidden md:flex items-center gap-1 bg-white/10 rounded-xl px-1.5 py-1"
            role="tablist"
            aria-label="Mode navigation"
          >
            {(Object.keys(modeLabels) as AppMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                role="tab"
                aria-selected={mode === m}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === m
                    ? highContrast ? 'bg-black text-yellow-500' : 'bg-white text-blue-700 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {modeLabels[m][language]}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* City selector */}
            <div className="relative" ref={cityRef}>
              <button
                onClick={() => setCityOpen(!cityOpen)}
                aria-expanded={cityOpen}
                aria-haspopup="listbox"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium ${
                  highContrast ? 'bg-black text-yellow-500' : 'bg-white/15 hover:bg-white/25'
                }`}
              >
                <span>{cityFlags[city]}</span>
                <span className="hidden sm:inline">{cityNames[city].split(' ')[0]}</span>
                <span className="sm:hidden text-[10px]">{city.toUpperCase().slice(0, 3)}</span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>
              {cityOpen && (
                <div
                  className={`absolute right-0 mt-1 w-48 rounded-xl shadow-2xl z-50 overflow-hidden ${
                    highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white border'
                  }`}
                  role="listbox"
                >
                  {(Object.entries(cityNames) as [CityKey, string][]).map(([key, name]) => (
                    <button
                      key={key}
                      onClick={() => { setCity(key); setCityOpen(false); }}
                      role="option"
                      aria-selected={city === key}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors ${
                        city === key
                          ? highContrast ? 'bg-yellow-500 text-black font-bold' : 'bg-blue-50 text-blue-700 font-semibold'
                          : highContrast ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span>{cityFlags[key]}</span>
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language */}
            <div className={`flex rounded-lg overflow-hidden ${highContrast ? 'bg-black' : 'bg-white/15'}`} role="radiogroup" aria-label="Select language">
              {(['en', 'es', 'fr'] as const).map(l => (
                <button
                  key={l}
                  onClick={() => setLanguage(l)}
                  role="radio"
                  aria-checked={language === l}
                  aria-label={l === 'en' ? 'English' : l === 'es' ? 'Español' : 'Français'}
                  className={`px-2 py-1.5 text-[10px] font-bold uppercase transition-colors ${
                    language === l
                      ? highContrast ? 'bg-yellow-500 text-black' : 'bg-white text-blue-700'
                      : 'text-white/60 hover:text-white'
                  }`}
                >{l}</button>
              ))}
            </div>

            {/* High Contrast */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-label={highContrast ? 'Disable high contrast' : 'Enable high contrast'}
              aria-pressed={highContrast}
              className={`p-2 rounded-lg transition-colors ${
                highContrast ? 'bg-black text-yellow-500' : 'bg-white/15 hover:bg-white/25'
              }`}
            >
              <Eye className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Current mode label - Mobile */}
        <div className="md:hidden mt-1.5">
          <div className="flex items-center gap-1.5 text-xs opacity-80">
            <Shield className="w-3 h-3" />
            <span className="font-medium">{modeLabels[mode][language]}</span>
            <span className="opacity-50">•</span>
            <span className="opacity-50">{cityNames[city]}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
