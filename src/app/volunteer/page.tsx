'use client';

import { AppProvider } from '../components/shared/AppContext';
import GlobalHeader from '../components/shared/GlobalHeader';
import VolunteerContent from '../components/modes/VolunteerContent';

export default function VolunteerPage() {
  return (
    <AppProvider>
      <div className="flex flex-col min-h-screen">
        <GlobalHeader />
        <VolunteerContent />
      </div>
    </AppProvider>
  );
}
