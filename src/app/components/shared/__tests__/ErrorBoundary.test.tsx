import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ErrorBoundary } from '../ErrorBoundary';

function GoodChild() {
  return <div>Content loaded</div>;
}

function BadChild() {
  throw new Error('Test error');
}

function GoodFallback() {
  return <div>Fallback content</div>;
}

describe('ErrorBoundary', () => {
  it('renders children when no error', () => {
    render(
      <ErrorBoundary>
        <GoodChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Content loaded')).toBeInTheDocument();
  });

  it('renders default fallback on error', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary>
        <BadChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    expect(screen.getByText('Refresh Page')).toBeInTheDocument();
    spy.mockRestore();
  });

  it('renders custom fallback when provided', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    render(
      <ErrorBoundary fallback={<GoodFallback />}>
        <BadChild />
      </ErrorBoundary>
    );
    expect(screen.getByText('Fallback content')).toBeInTheDocument();
    spy.mockRestore();
  });
});
