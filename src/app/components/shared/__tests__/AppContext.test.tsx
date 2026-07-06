import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider, useApp, Lang, AppMode, CityKey, UserRole } from '../AppContext';

function TestComponent() {
  const {
    mode, setMode,
    language, setLanguage,
    highContrast, setHighContrast,
    fontScale, setFontScale,
    city, setCity,
    isAuthenticated, setIsAuthenticated,
    userRole, setUserRole,
  } = useApp();

  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <span data-testid="language">{language}</span>
      <span data-testid="highContrast">{String(highContrast)}</span>
      <span data-testid="fontScale">{fontScale}</span>
      <span data-testid="city">{city}</span>
      <span data-testid="isAuthenticated">{String(isAuthenticated)}</span>
      <span data-testid="userRole">{userRole}</span>
      <button onClick={() => setMode('ops' as AppMode)}>switch-ops</button>
      <button onClick={() => setLanguage('es' as Lang)}>switch-es</button>
      <button onClick={() => setLanguage('fr' as Lang)}>switch-fr</button>
      <button onClick={() => setHighContrast(true)}>enable-hc</button>
      <button onClick={() => setFontScale(1.2)}>set-font</button>
      <button onClick={() => setCity('sofi' as CityKey)}>switch-sofi</button>
      <button onClick={() => setCity('azteca' as CityKey)}>switch-azteca</button>
      <button onClick={() => setCity('bc_place' as CityKey)}>switch-bc</button>
      <button onClick={() => setIsAuthenticated(true)}>login</button>
      <button onClick={() => setUserRole('admin' as UserRole)}>set-admin</button>
      <button onClick={() => setUserRole('volunteer' as UserRole)}>set-volunteer</button>
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
    expect(screen.getByTestId('fontScale')).toHaveTextContent('1');
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

  it('allows language switching to Spanish', () => {
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

  it('allows language switching to French', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('switch-fr').click();
    });

    expect(screen.getByTestId('language')).toHaveTextContent('fr');
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

  it('allows font scale changes', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('set-font').click();
    });

    expect(screen.getByTestId('fontScale')).toHaveTextContent('1.2');
  });

  it('allows city switching to SoFi', () => {
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

  it('allows city switching to Azteca', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('switch-azteca').click();
    });

    expect(screen.getByTestId('city')).toHaveTextContent('azteca');
  });

  it('allows city switching to BC Place', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('switch-bc').click();
    });

    expect(screen.getByTestId('city')).toHaveTextContent('bc_place');
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

  it('allows role changes to admin', () => {
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

  it('allows role changes to volunteer', () => {
    render(
      <AppProvider>
        <TestComponent />
      </AppProvider>
    );

    act(() => {
      screen.getByText('set-volunteer').click();
    });

    expect(screen.getByTestId('userRole')).toHaveTextContent('volunteer');
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
