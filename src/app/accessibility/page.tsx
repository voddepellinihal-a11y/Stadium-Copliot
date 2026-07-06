'use client';

import { AppProvider } from '../components/shared/AppContext';
import GlobalHeader from '../components/shared/GlobalHeader';
import AccessibilityContent from '../components/modes/AccessibilityContent';

export default function AccessibilityPage() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <AccessibilityContent />
      </div>
    </AppProvider>
  );
}
