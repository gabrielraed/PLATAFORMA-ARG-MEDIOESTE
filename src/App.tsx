/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';

import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';

import { PublicHome } from './components/public/PublicHome';
import { MainDashboard } from './components/dashboard/MainDashboard';
import { OpportunitiesView } from './components/opportunities/OpportunitiesView';
import { InvestorsView } from './components/investors/InvestorsView';
import { CompaniesView } from './components/companies/CompaniesView';
import { AiMatchView } from './components/ai/AiMatchView';
import { IntroductionsView } from './components/introductions/IntroductionsView';
import { MessagingView } from './components/messages/MessagingView';
import { DealRoomsView } from './components/dealroom/DealRoomsView';
import { EventsView } from './components/events/EventsView';
import { IntelligenceView } from './components/intelligence/IntelligenceView';
import { CrmView } from './components/admin/CrmView';
import { AdminView } from './components/admin/AdminView';
import { AboutPage } from './components/public/AboutPage';
import { MembershipView } from './components/public/MembershipView';
import { LegalView } from './components/public/LegalView';
import { ChairmanDashboard } from './components/chairman/ChairmanDashboard';
import { DealDeskView } from './components/dealdesk/DealDeskView';
import { BusinessRoomsView } from './components/businessroom/BusinessRoomsView';
import { KrestonCrmView } from './components/kreston/KrestonCrmView';
import { KrestonAdvisoryPublicView } from './components/kreston/KrestonAdvisoryPublicView';
import { HowItWorksView } from './components/public/HowItWorksView';
import { SystemHealthView } from './components/system/SystemHealthView';

import { OpportunityDetailModal } from './components/opportunities/OpportunityDetailModal';
import { InvestorBriefModal } from './components/opportunities/InvestorBriefModal';
import { RequestIntroModal } from './components/introductions/RequestIntroModal';
import { DealRoomModal } from './components/dealroom/DealRoomModal';
import { AmbcAiModal } from './components/ai/AmbcAiModal';
import { AiChairmanAssistantModal } from './components/ai/AiChairmanAssistantModal';
import { SearchModal } from './components/common/SearchModal';
import { AuthModal } from './components/auth/AuthModal';
import { OnboardingModal } from './components/onboarding/OnboardingModal';

function AppContent() {
  const [currentView, setCurrentView] = useState<string>('public-home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  const {
    selectedOpportunity,
    setSelectedOpportunity,
    briefModalOpportunity,
    setBriefModalOpportunity,
  } = useApp();
  const { isAuthenticated } = useAuth();
  const { isRtl } = useLanguage();

  const isPublicMode =
    currentView === 'public-home' ||
    currentView === 'about' ||
    currentView === 'membership' ||
    currentView === 'how-it-works' ||
    currentView === 'kreston-advisory' ||
    currentView.startsWith('legal-');

  const renderView = () => {
    switch (currentView) {
      case 'public-home':
        return <PublicHome setCurrentView={setCurrentView} />;
      case 'dashboard':
        return <MainDashboard setCurrentView={setCurrentView} />;
      case 'opportunities':
        return <OpportunitiesView setCurrentView={setCurrentView} />;
      case 'investors':
        return <InvestorsView setCurrentView={setCurrentView} />;
      case 'companies':
        return <CompaniesView setCurrentView={setCurrentView} />;
      case 'ai-match':
        return <AiMatchView setCurrentView={setCurrentView} />;
      case 'chairman-dashboard':
        return <ChairmanDashboard setCurrentView={setCurrentView} />;
      case 'deal-desk':
        return <DealDeskView setCurrentView={setCurrentView} />;
      case 'business-rooms':
        return <BusinessRoomsView />;
      case 'kreston-crm':
        return <KrestonCrmView />;
      case 'kreston-advisory':
        return <KrestonAdvisoryPublicView setCurrentView={setCurrentView} />;
      case 'how-it-works':
        return <HowItWorksView setCurrentView={setCurrentView} />;
      case 'system-health':
        return <SystemHealthView />;
      case 'introductions':
        return <IntroductionsView setCurrentView={setCurrentView} />;
      case 'messages':
        return <MessagingView />;
      case 'deal-rooms':
        return <DealRoomsView setCurrentView={setCurrentView} />;
      case 'events':
        return <EventsView setCurrentView={setCurrentView} />;
      case 'intelligence':
        return <IntelligenceView />;
      case 'crm':
        return <CrmView />;
      case 'admin':
        return <AdminView />;
      case 'about':
        return <AboutPage />;
      case 'membership':
        return <MembershipView />;
      case 'legal-terms':
        return <LegalView initialTab="terms" />;
      case 'legal-privacy':
        return <LegalView initialTab="privacy" />;
      case 'legal-disclaimer':
        return <LegalView initialTab="disclaimer" />;
      default:
        return <MainDashboard setCurrentView={setCurrentView} />;
    }
  };

  return (
    <div className={`min-h-screen bg-[#070D18] text-slate-100 flex flex-col font-sans ${isRtl ? 'rtl' : 'ltr'}`}>
      {/* Top Header */}
      <Header
        currentView={currentView}
        setCurrentView={(view) => {
          if (view === 'login') {
            setIsAuthModalOpen(true);
          } else {
            setCurrentView(view);
          }
        }}
        isPublicMode={isPublicMode}
      />

      {/* Main Container with Sidebar (when in Portal mode) */}
      <div className="flex-1 flex w-full">
        {!isPublicMode && (
          <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        )}

        {/* Primary Viewport Area */}
        <main className={`flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto ${isPublicMode ? 'max-w-7xl mx-auto w-full' : ''}`}>
          {renderView()}
        </main>
      </div>

      {/* Institutional Footer */}
      <Footer setCurrentView={setCurrentView} />

      {/* Global Interactive Modals */}
      <OpportunityDetailModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />

      <InvestorBriefModal
        opportunity={briefModalOpportunity}
        onClose={() => setBriefModalOpportunity(null)}
      />

      <RequestIntroModal />
      <DealRoomModal />
      <AmbcAiModal />
      <AiChairmanAssistantModal />
      <SearchModal setCurrentView={setCurrentView} />
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <OnboardingModal isOpen={isOnboardingOpen} onClose={() => setIsOnboardingOpen(false)} />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
