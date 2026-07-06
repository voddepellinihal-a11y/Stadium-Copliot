'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Lang = 'en' | 'es' | 'fr';

export type AppMode = 'fan' | 'volunteer' | 'ops' | 'analytics' | 'sustainability' | 'accessibility';

export type CityKey =
  | 'metlife' | 'sofi' | 'azteca' | 'bc_place'
  | 'arrowhead' | 'at_t_stadium' | 'hard_rock' | 'lincoln_financial'
  | 'nrg' | 'lumen' | 'mercedes_benz' | 'gillette'
  | 'cotton_bowl';

export type UserRole = 'fan' | 'volunteer' | 'ops' | 'admin';

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
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

/**
 * Global state provider for the Stadium Copilot application.
 * Manages mode, language, city, theme, and authentication state.
 */
export function AppProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('fan');
  const [language, setLanguage] = useState<Lang>('en');
  const [highContrast, setHighContrast] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [city, setCity] = useState<CityKey>('metlife');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>('fan');

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

/**
 * Hook to access the global app state.
 * Must be used within an AppProvider.
 * @returns The current app state and setter functions
 * @throws Error if used outside of AppProvider
 */
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
