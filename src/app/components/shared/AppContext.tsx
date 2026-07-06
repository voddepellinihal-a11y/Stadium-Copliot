'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'es' | 'fr';

export type AppMode = 'fan' | 'volunteer' | 'ops' | 'analytics' | 'sustainability' | 'accessibility';

export type CityKey =
  | 'metlife' | 'sofi' | 'azteca' | 'bc_place'
  | 'arrowhead' | 'at_t_stadium' | 'hard_rock' | 'lincoln_financial'
  | 'nrg' | 'lumen' | 'mercedes_benz' | 'gillette'
  | 'cotton_bowl';

interface AppState {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  language: Lang;
  setLanguage: (lang: Lang) => void;
  highContrast: boolean;
  setHighContrast: (v: boolean) => void;
  fontScale: number;
  setFontScale: (v: number) => void;
  city: CityKey;
  setCity: (city: CityKey) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (v: boolean) => void;
  userRole: string;
  setUserRole: (role: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('fan');
  const [language, setLanguage] = useState<Lang>('en');
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [city, setCity] = useState<CityKey>('metlife');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('fan');

  return (
    <AppContext.Provider value={{
      mode, setMode,
      language, setLanguage,
      highContrast, setHighContrast,
      fontScale, setFontScale,
      city, setCity,
      isAuthenticated, setIsAuthenticated,
      userRole, setUserRole,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
