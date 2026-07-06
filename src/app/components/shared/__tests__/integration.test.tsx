import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AppProvider, useApp, Lang, AppMode } from '../AppContext';
import { t } from '../../../data/translations';

function ModeSwitcher() {
  const { mode, setMode, language, setLanguage } = useApp();
  return (
    <div>
      <span data-testid="current-mode">{mode}</span>
      <span data-testid="current-lang">{language}</span>
      <span data-testid="translated">{t(language, 'stadiumCopilot')}</span>
      <button onClick={() => setMode('ops' as AppMode)}>ops</button>
      <button onClick={() => setMode('sustainability' as AppMode)}>sustainability</button>
      <button onClick={() => setLanguage('fr' as Lang)}>fr</button>
      <button onClick={() => setLanguage('es' as Lang)}>es</button>
    </div>
  );
}

describe('Mode switching integration', () => {
  it('switches mode and preserves language', () => {
    render(
      <AppProvider>
        <ModeSwitcher />
      </AppProvider>
    );

    expect(screen.getByTestId('current-mode')).toHaveTextContent('fan');

    act(() => {
      screen.getByText('ops').click();
    });
    expect(screen.getByTestId('current-mode')).toHaveTextContent('ops');

    act(() => {
      screen.getByText('sustainability').click();
    });
    expect(screen.getByTestId('current-mode')).toHaveTextContent('sustainability');
    expect(screen.getByTestId('current-lang')).toHaveTextContent('en');
  });

  it('switches language and updates translated text', () => {
    render(
      <AppProvider>
        <ModeSwitcher />
      </AppProvider>
    );

    expect(screen.getByTestId('translated')).toHaveTextContent('Stadium Copilot');

    act(() => {
      screen.getByText('es').click();
    });
    expect(screen.getByTestId('translated')).toHaveTextContent('Copiloto del Estadio');

    act(() => {
      screen.getByText('fr').click();
    });
    expect(screen.getByTestId('translated')).toHaveTextContent('Copilote du Stade');
  });

  it('preserves mode when language changes', () => {
    render(
      <AppProvider>
        <ModeSwitcher />
      </AppProvider>
    );

    act(() => {
      screen.getByText('ops').click();
    });

    act(() => {
      screen.getByText('fr').click();
    });

    expect(screen.getByTestId('current-mode')).toHaveTextContent('ops');
    expect(screen.getByTestId('current-lang')).toHaveTextContent('fr');
  });
});
