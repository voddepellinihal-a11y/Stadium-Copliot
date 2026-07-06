'use client';

import { AppProvider } from '../components/shared/AppContext';
import GlobalHeader from '../components/shared/GlobalHeader';
import SustainabilityContent from '../components/modes/SustainabilityContent';

export default function SustainabilityPage() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <SustainabilityContent />
      </div>
    </AppProvider>
  );
}
