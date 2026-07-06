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
  { key: 'fan', icon: <MessageSquare className="w-4 h-4" /> },
  { key: 'volunteer', icon: <Users className="w-4 h-4" /> },
  { key: 'ops', icon: <LayoutDashboard className="w-4 h-4" /> },
  { key: 'analytics', icon: <BarChart3 className="w-4 h-4" /> },
  { key: 'sustainability', icon: <Leaf className="w-4 h-4" /> },
  { key: 'accessibility', icon: <Accessibility className="w-4 h-4" /> },
] as const;

type ModeKey = typeof modes[number]['key'];

function ModeRouter() {
  const { mode, setMode, highContrast } = useApp();

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
    <div className={`flex flex-col min-h-screen transition-colors duration-300 ${highContrast ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'}`}>
      <GlobalHeader />
      {renderContent()}
      <nav className={`flex justify-around py-1 px-1 text-[10px] font-medium z-50 ${highContrast ? 'bg-gray-900 border-t-2 border-yellow-500' : 'bg-white border-t shadow-lg'}`}>
        {modes.map(m => (
          <button key={m.key} onClick={() => setMode(m.key)}
            className={`flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg transition-all ${
              mode === m.key ? highContrast ? 'text-yellow-500' : 'text-blue-600' : highContrast ? 'text-gray-400' : 'text-gray-400'
            }`}>
            <div className={mode === m.key ? 'scale-110' : ''}>{m.icon}</div>
            <span className="text-[9px] leading-tight capitalize">{m.key}</span>
          </button>
        ))}
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
