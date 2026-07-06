import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider, useApp, Lang, AppMode, CityKey } from '../AppContext';

function TestComponent() {
  const {
    mode, setMode,
    language, setLanguage,
    highContrast, setHighContrast,
    city, setCity,
    isAuthenticated, setIsAuthenticated,
    userRole, setUserRole,
  } = useApp();

  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="language">{language}</span>
      <span data-testid="highContrast">{String(highContrast)}</span>
      <span data-testid="city">{city}</span>
      <span data-testid="isAuthenticated">{String(isAuthenticated)}</span>
      <span data-testid="userRole">{userRole}</span>
      <button onClick={() => setMode('ops' as AppMode)}>switch-ops</button>
      <button onClick={() => setLanguage('es' as Lang)}>switch-es</button>
      <button onClick={() => setHighContrast(true)}>enable-hc</button>
      <button onClick={() => setCity('sofi' as CityKey)}>switch-sofi</button>
      <button onClick={() => setIsAuthenticated(true)}>login</button>
      <button onClick={() => setUserRole('admin')}>set-admin</button>
    </div>
  );
}

describe('AppContext', () => {
  it('provides default values', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    expect(screen.getByTestId('mode')).toHaveTextContent('fan');
    expect(screen.getByTestId('language')).toHaveTextContent('en');
    expect(screen.getByTestId('highContrast')).toHaveTextContent('false');
    expect(screen.getByTestId('city')).toHaveTextContent('metlife');
    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('false');
    expect(screen.getByTestId('userRole')).toHaveTextContent('fan');
  });

  it('allows mode switching', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('switch-ops').click();
    });

    expect(screen.getByTestId('mode')).toHaveTextContent('ops');
  });

  it('allows language switching', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('switch-es').click();
    });

    expect(screen.getByTestId('language')).toHaveTextContent('es');
  });

  it('allows high contrast toggle', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('enable-hc').click();
    });

    expect(screen.getByTestId('highContrast')).toHaveTextContent('true');
  });

  it('allows city switching', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('switch-sofi').click();
    });

    expect(screen.getByTestId('city')).toHaveTextContent('sofi');
  });

  it('allows auth state changes', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('login').click();
    });

    expect(screen.getByTestId('isAuthenticated')).toHaveTextContent('true');
  });

  it('allows role changes', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('set-admin').click();
    });

    expect(screen.getByTestId('userRole')).toHaveTextContent('admin');
  });

  it('throws when useApp used outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    function BadComponent() {
      useApp();
      return null;
    }

    expect(() => render(<BadComponent />)).toThrow('useApp must be used within AppProvider');
    spy.mockRestore();
  });
});
