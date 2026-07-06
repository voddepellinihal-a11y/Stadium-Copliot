'use client';

import React, { useState, Suspense, useEffect, useRef, useCallback } from 'react';
import dynamic from 'next/dynamic';
import { AppProvider, useApp, Lang } from './components/shared/AppContext';
import GlobalHeader from './components/shared/GlobalHeader';
import { MessageSquare, Users, LayoutDashboard, BarChart3, Leaf, Accessibility } from 'lucide-react';
import { t } from './data/translations';

const Chat = dynamic(() => import('./components/chat/ChatMain').then(m => m.Chat), { ssr: false, loading: () => <LoadingSpinner /> });
const VolunteerContent = dynamic(() => import('./components/modes/VolunteerContent'), { ssr: false, loading: () => <LoadingSpinner /> });
const OpsContent = dynamic(() => import('./components/modes/OpsContent'), { ssr: false, loading: () => <LoadingSpinner /> });
const AnalyticsContent = dynamic(() => import('./components/modes/AnalyticsContent'), { ssr: false, loading: () => <LoadingSpinner /> });
const SustainabilityContent = dynamic(() => import('./components/modes/SustainabilityContent'), { ssr: false, loading: () => <LoadingSpinner /> });
const AccessibilityContent = dynamic(() => import('./components/modes/AccessibilityContent'), { ssr: false, loading: () => <LoadingSpinner /> });

/** Loading spinner shown during dynamic component loading */
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-full" role="status" aria-label="Loading">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
    </div>
  );
}

const modes = [
  { key: 'fan', icon: MessageSquare, labelKey: 'fan' as const },
  { key: 'volunteer', icon: Users, labelKey: 'volunteer' as const },
  { key: 'ops', icon: LayoutDashboard, labelKey: 'ops' as const },
  { key: 'analytics', icon: BarChart3, labelKey: 'analytics' as const },
  { key: 'sustainability', icon: Leaf, labelKey: 'sustainability' as const },
  { key: 'accessibility', icon: Accessibility, labelKey: 'accessibility' as const },
] as const;

/** Union type derived from the modes list for type-safe mode switching */
type ModeKey = typeof modes[number]['key'];

const langConfig: { code: Lang; name: string; flag: string; nativeName: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇲🇽', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
];

/** Full-screen language selector modal with flag icons and native language names */
function LanguageModal({ onSelect, onClose }: { onSelect: (lang: Lang) => void; onClose: () => void }) {
  const firstButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    firstButtonRef.current?.focus();
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={onClose} role="dialog" aria-modal="true" aria-label={t('en', 'selectLanguage')}>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-center text-white">
          <div className="text-4xl mb-2" aria-hidden="true">🌍</div>
          <h2 className="text-xl font-bold">Choose Your Language</h2>
          <p className="text-sm opacity-80 mt-1">Elige tu idioma / Choisissez votre langue</p>
        </div>
        <div className="p-4 space-y-2" role="group" aria-label="Language options">
          {langConfig.map((l, idx) => (
            <button
              key={l.code}
              ref={idx === 0 ? firstButtonRef : undefined}
              onClick={() => { onSelect(l.code); onClose(); }}
              className="w-full flex items-center gap-4 p-4 rounded-2xl border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all group"
              aria-label={`Select ${l.nativeName}`}
            >
              <span className="text-3xl" aria-hidden="true">{l.flag}</span>
              <div className="text-left flex-1">
                <div className="font-bold text-gray-900 text-lg">{l.nativeName}</div>
                <div className="text-sm text-gray-500">{l.name}</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-100 group-hover:bg-blue-500 group-hover:text-white flex items-center justify-center transition-all" aria-hidden="true">
                →
              </div>
            </button>
          ))}
        </div>
        <button onClick={onClose} aria-label="Close language selector" className="w-full p-3 text-sm text-gray-400 hover:text-gray-600 transition-colors">
          Close
        </button>
      </div>
    </div>
  );
}

/** Routes between 6 mode views based on current AppContext mode state */
function ModeRouter() {
  const { mode, setMode, highContrast, language, setLanguage } = useApp();
  const [showLangModal, setShowLangModal] = useState(false);

  const renderContent = useCallback(() => {
    switch (mode as ModeKey) {
      case 'fan': return <Chat />;
      case 'volunteer': return <VolunteerContent />;
      case 'ops': return <OpsContent />;
      case 'analytics': return <AnalyticsContent />;
      case 'sustainability': return <SustainabilityContent />;
      case 'accessibility': return <AccessibilityContent />;
      default: return <Chat />;
    }
  }, [mode]);

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-300 ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <GlobalHeader onLanguageClick={() => setShowLangModal(true)} />
      <main className="flex-1 overflow-hidden" id="main-content">
        <Suspense fallback={<LoadingSpinner />}>
          {renderContent()}
        </Suspense>
      </main>
      <nav
        className={`flex justify-around items-stretch py-1.5 px-1 text-[10px] font-semibold z-50 flex-shrink-0 ${
          highContrast ? 'bg-gray-900 border-t-2 border-yellow-500' : 'bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'
        }`}
        role="tablist"
        aria-label={t(language, 'quickActions')}
      >
        {modes.map(m => {
          const Icon = m.icon;
          const isActive = mode === m.key;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${m.key}`}
              aria-label={t(language, m.labelKey)}
              id={`tab-${m.key}`}
              className={`flex flex-col items-center justify-center gap-0.5 px-1.5 py-1 rounded-xl transition-all min-w-0 flex-1 ${
                isActive
                  ? highContrast
                    ? 'bg-yellow-500 text-black'
                    : 'bg-blue-50 text-blue-600'
                  : highContrast
                    ? 'text-gray-400 hover:text-white'
                    : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-sm' : ''}`} strokeWidth={isActive ? 2.5 : 2} aria-hidden="true" />
              <span className="text-[9px] leading-tight truncate w-full text-center">{t(language, m.labelKey)}</span>
            </button>
          );
        })}
      </nav>

      {showLangModal && <LanguageModal onSelect={setLanguage} onClose={() => setShowLangModal(false)} />}
    </div>
  );
}

/** Main application entry point wrapping the entire app in global state provider */
export default function Home() {
  return (
    <AppProvider>
      <ModeRouter />
    </AppProvider>
  );
}
