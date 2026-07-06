'use client';

import { AppProvider } from '../components/shared/AppContext';
import GlobalHeader from '../components/shared/GlobalHeader';
import OpsContent from '../components/modes/OpsContent';

export default function OpsPage() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <OpsContent />
      </div>
    </AppProvider>
  );
}
