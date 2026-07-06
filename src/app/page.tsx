'use client';

import React from 'react';
import { AppProvider, useApp } from './components/shared/AppContext';
import GlobalHeader from './components/shared/GlobalHeader';
import { Chat } from './components/chat/ChatMain';
import VolunteerContent from './components/modes/VolunteerContent';
import OpsContent from './components/modes/OpsContent';
import AnalyticsContent from './components/modes/AnalyticsContent';
import SustainabilityContent from './components/modes/SustainabilityContent';
import AccessibilityContent from './components/modes/AccessibilityContent';
import { MessageSquare, Users, LayoutDashboard, BarChart3, Leaf, Accessibility } from 'lucide-react';

const modes = [
  { key: 'fan', icon: MessageSquare, label: { en: 'Fan', es: 'Fan', fr: 'Fan' } },
  { key: 'volunteer', icon: Users, label: { en: 'Volunteer', es: 'Voluntario', fr: 'Bénévole' } },
  { key: 'ops', icon: LayoutDashboard, label: { en: 'Ops', es: 'Operaciones', fr: 'Ops' } },
  { key: 'analytics', icon: BarChart3, label: { en: 'Analytics', es: 'Analítica', fr: 'Analytique' } },
  { key: 'sustainability', icon: Leaf, label: { en: 'Green', es: 'Verde', fr: 'Vert' } },
  { key: 'accessibility', icon: Accessibility, label: { en: 'Access', es: 'Acceso', fr: 'Accès' } },
] as const;

type ModeKey = typeof modes[number]['key'];

function ModeRouter() {
  const { mode, setMode, highContrast, language } = useApp();

  const renderContent = () => {
    switch (mode as ModeKey) {
      case 'fan': return <Chat />;
      case 'volunteer': return <VolunteerContent />;
      case 'ops': return <OpsContent />;
      case 'analytics': return <AnalyticsContent />;
      case 'sustainability': return <SustainabilityContent />;
      case 'accessibility': return <AccessibilityContent />;
      default: return <Chat />;
    }
  };

  return (
    <div className={`flex flex-col h-screen overflow-hidden transition-colors duration-300 ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <GlobalHeader />
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>
      <nav
        className={`flex justify-around items-stretch py-1.5 px-1 text-[10px] font-semibold z-50 flex-shrink-0 ${
          highContrast ? 'bg-gray-900 border-t-2 border-yellow-500' : 'bg-white border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]'
        }`}
        role="tablist"
        aria-label="Mode navigation"
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
              <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-sm' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[9px] leading-tight truncate w-full text-center">{m.label[language]}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function Home() {
  return (
    <AppProvider>
      <ModeRouter />
    </AppProvider>
  );
}
