'use client';

import { AppProvider } from '../components/shared/AppContext';
import GlobalHeader from '../components/shared/GlobalHeader';
import AnalyticsContent from '../components/modes/AnalyticsContent';

export default function AnalyticsPage() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <AnalyticsContent />
      </div>
    </AppProvider>
  );
}
