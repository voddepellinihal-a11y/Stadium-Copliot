'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { Eye, ChevronDown, Globe } from 'lucide-react';
import { useApp, AppMode, CityKey } from './AppContext';
import { t } from '../../data/translations';

const cityFlags: Record<CityKey, string> = {
  metlife: '🇺🇸', sofi: '🇺🇸', azteca: '🇲🇽', bc_place: '🇨🇦',
  arrowhead: '🇺🇸', at_t_stadium: '🇺🇸', hard_rock: '🇺🇸', lincoln_financial: '🇺🇸',
  nrg: '🇺🇸', lumen: '🇺🇸', mercedes_benz: '🇺🇸', gillette: '🇺🇸', cotton_bowl: '🇺🇸',
};

const cityKeys: CityKey[] = [
  'metlife', 'sofi', 'azteca', 'bc_place',
  'arrowhead', 'at_t_stadium', 'hard_rock', 'lincoln_financial',
  'nrg', 'lumen', 'mercedes_benz', 'gillette', 'cotton_bowl',
];

const cityNameKeys: Record<CityKey, string> = {
  metlife: 'metlifeStadium', sofi: 'sofiStadium', azteca: 'aztecaStadium', bc_place: 'bcPlaceStadium',
  arrowhead: 'arrowheadStadium', at_t_stadium: 'attStadium', hard_rock: 'hardRockStadium',
  lincoln_financial: 'lincolnStadium', nrg: 'nrgStadium', lumen: 'lumenStadium',
  mercedes_benz: 'mercedesBenzStadium', gillette: 'gilletteStadium', cotton_bowl: 'cottonBowlStadium',
};

const modeLabelKeys: Record<AppMode, 'fan' | 'volunteer' | 'ops' | 'analytics' | 'sustainability' | 'accessibility'> = {
  fan: 'fan', volunteer: 'volunteer', ops: 'ops', analytics: 'analytics', sustainability: 'sustainability', accessibility: 'accessibility',
};

/** Global header with mode tabs, 13-city selector, language toggle, and contrast controls */
export default function GlobalHeader({ onLanguageClick }: { onLanguageClick?: () => void }) {
  const { mode, setMode, language, highContrast, setHighContrast, city, setCity } = useApp();
  const [cityOpen, setCityOpen] = React.useState(false);
  const cityRef = useRef<HTMLDivElement>(null);
  const cityButtonRef = useRef<HTMLButtonElement>(null);

  const closeCity = useCallback(() => setCityOpen(false), []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        closeCity();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [closeCity]);

  useEffect(() => {
    if (!cityOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeCity();
        cityButtonRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [cityOpen, closeCity]);

  return (
    <header
      className={`flex-shrink-0 sticky top-0 z-50 transition-colors duration-300 ${
        highContrast ? 'bg-yellow-500 text-black' : 'bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white'
      } shadow-lg`}
      role="banner"
    >
      <div className="max-w-7xl mx-auto px-3 py-2">
        <div className="flex items-center justify-between gap-2">
          {/* Logo */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg shadow-sm ${
                highContrast ? 'bg-black text-yellow-500' : 'bg-white/20 backdrop-blur-sm'
              }`}
              aria-hidden="true"
            >
              ⚽
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-bold leading-tight">{t(language, 'stadiumCopilot')}</div>
              <div className="text-[9px] opacity-70 leading-tight">{t(language, 'fifaWorldCup')}</div>
            </div>
          </div>

          {/* Mode Tabs - Desktop */}
          <nav
            className="hidden md:flex items-center gap-1 bg-white/10 rounded-xl px-1.5 py-1"
            role="tablist"
            aria-label={t(language, 'quickActions')}
          >
            {(Object.keys(modeLabelKeys) as AppMode[]).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                role="tab"
                aria-selected={mode === m}
                aria-controls={`panel-${m}`}
                id={`tab-${m}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  mode === m
                    ? highContrast ? 'bg-black text-yellow-500' : 'bg-white text-blue-700 shadow-sm'
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {t(language, modeLabelKeys[m])}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-1.5">
            {/* City selector */}
            <div className="relative" ref={cityRef}>
              <button
                ref={cityButtonRef}
                onClick={() => setCityOpen(!cityOpen)}
                aria-expanded={cityOpen}
                aria-haspopup="listbox"
                aria-label={t(language, 'selectCity')}
                aria-controls="city-listbox"
                className={`flex items-center gap-1 px-2 py-1.5 rounded-lg text-xs font-medium ${
                  highContrast ? 'bg-black text-yellow-500' : 'bg-white/15 hover:bg-white/25'
                }`}
              >
                <span aria-hidden="true">{cityFlags[city]}</span>
                <span className="hidden sm:inline">{t(language, cityNameKeys[city] as 'metlifeStadium').split(' ')[0]}</span>
                <span className="sm:hidden text-[10px]">{city.toUpperCase().slice(0, 4)}</span>
                <ChevronDown className="w-3 h-3 opacity-70" aria-hidden="true" />
              </button>
              {cityOpen && (
                <div
                  id="city-listbox"
                  className={`absolute right-0 mt-1 w-64 max-h-80 overflow-y-auto rounded-xl shadow-2xl z-50 ${
                    highContrast ? 'bg-gray-900 border border-gray-700' : 'bg-white border'
                  }`}
                  role="listbox"
                  aria-label={t(language, 'selectCity')}
                >
                  {cityKeys.map(key => (
                    <button
                      key={key}
                      onClick={() => { setCity(key); setCityOpen(false); cityButtonRef.current?.focus(); }}
                      role="option"
                      aria-selected={city === key}
                      className={`flex items-center gap-2 w-full text-left px-3 py-2 text-sm transition-colors ${
                        city === key
                          ? highContrast ? 'bg-yellow-500 text-black font-bold' : 'bg-blue-50 text-blue-700 font-semibold'
                          : highContrast ? 'text-white hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg" aria-hidden="true">{cityFlags[key]}</span>
                      <span>{t(language, cityNameKeys[key] as 'metlifeStadium')}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language - Big button */}
            <button
              onClick={onLanguageClick}
              aria-label={t(language, 'selectLanguage')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold ${
                highContrast ? 'bg-black text-yellow-500' : 'bg-white/20 hover:bg-white/30'
              }`}
            >
              <Globe className="w-4 h-4" aria-hidden="true" />
              <span className="uppercase">{language}</span>
            </button>

            {/* High Contrast */}
            <button
              onClick={() => setHighContrast(!highContrast)}
              aria-label={highContrast ? t(language, 'disableHighContrast') : t(language, 'enableHighContrast')}
              aria-pressed={highContrast}
              className={`p-2 rounded-lg transition-colors ${
                highContrast ? 'bg-black text-yellow-500' : 'bg-white/15 hover:bg-white/25'
              }`}
            >
              <Eye className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Current mode label - Mobile */}
        <div className="md:hidden mt-1.5">
          <div className="flex items-center gap-1.5 text-xs opacity-80" aria-live="polite">
            <span className="font-medium">{t(language, modeLabelKeys[mode])}</span>
            <span className="opacity-50" aria-hidden="true">•</span>
            <span className="opacity-50">{t(language, cityNameKeys[city] as 'metlifeStadium')}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
