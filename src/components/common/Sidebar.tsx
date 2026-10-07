import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Compass,
  Building2,
  Sparkles,
  ShieldCheck,
  Briefcase,
  FolderLock,
  Calendar,
  BookOpen,
  Activity,
  Layers,
  CreditCard,
  Info,
  Bot,
  HelpCircle,
  FileCheck,
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView }) => {
  const { t, isRtl } = useLanguage();
  const { currentUser } = useAuth();
  const {
    setIsAiChairmanAssistantOpen,
    introductions,
    businessRooms,
    krestonLeads,
  } = useApp();

  const pendingChairmanClearances = introductions.filter((i) => i.chairmanStatus === 'PENDING').length;
  const activeRoomsCount = businessRooms.length;

  const coreNavItems = [
    { id: 'dashboard', label: t.nav.dashboard, icon: LayoutDashboard },
    { id: 'opportunities', label: t.nav.opportunities, icon: Compass },
    { id: 'companies', label: t.nav.companies, icon: Building2 },
    { id: 'ai-match', label: t.nav.aiMatch, icon: Sparkles },
    {
      id: 'ai-dealdesk-trigger',
      label: t.nav.aiChairmanAssistant,
      icon: Bot,
      isSpecialAi: true,
    },
  ];

  const operationsNavItems = [
    {
      id: 'chairman-dashboard',
      label: t.nav.chairmanDashboard,
      icon: ShieldCheck,
      badge: pendingChairmanClearances > 0 ? pendingChairmanClearances : undefined,
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    {
      id: 'deal-desk',
      label: t.nav.dealDesk,
      icon: Briefcase,
      badge: introductions.length,
      badgeColor: 'bg-slate-800 text-ambc-gold border border-slate-700',
    },
    {
      id: 'business-rooms',
      label: t.nav.businessRooms,
      icon: FolderLock,
      badge: activeRoomsCount > 0 ? activeRoomsCount : undefined,
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40',
    },
    {
      id: 'kreston-crm',
      label: t.nav.krestonCrm,
      icon: Layers,
      badge: krestonLeads.length,
      badgeColor: 'bg-amber-500/20 text-ambc-gold border border-amber-500/30',
    },
  ];

  const councilNavItems = [
    { id: 'events', label: t.nav.events, icon: Calendar },
    { id: 'intelligence', label: t.nav.marketIntelligence, icon: BookOpen },
    { id: 'how-it-works', label: 'How It Works (9 Steps)', icon: HelpCircle },
    { id: 'kreston-advisory', label: 'Kreston Advisory Suite', icon: FileCheck },
    { id: 'system-health', label: t.nav.systemHealth, icon: Activity },
    { id: 'membership', label: t.nav.monetization, icon: CreditCard },
    { id: 'about', label: t.nav.aboutAgbic, icon: Info },
  ];

  return (
    <aside
      className={`hidden md:flex flex-col w-64 bg-[#070D18] border-r border-slate-800/90 shrink-0 select-none ${
        isRtl ? 'border-l border-r-0' : ''
      }`}
    >
      {/* Current User Role Header */}
      {currentUser && (
        <div className="p-3 mx-3 my-3 rounded-lg bg-slate-900/90 border border-slate-800 flex items-center gap-3">
          <div className="w-9 h-9 rounded-md bg-amber-500/15 border border-ambc-gold/40 flex items-center justify-center text-ambc-gold font-bold text-sm shrink-0">
            {currentUser.name.charAt(0)}
          </div>
          <div className="overflow-hidden min-w-0">
            <div className="text-xs font-bold text-white truncate">{currentUser.name}</div>
            <div className="text-[10px] text-ambc-gold font-mono truncate uppercase">
              {currentUser.role.replace(/_/g, ' ')}
            </div>
          </div>
        </div>
      )}

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 space-y-1 py-1">
        <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Core Platform
        </div>

        {coreNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;

          if (item.isSpecialAi) {
            return (
              <button
                key={item.id}
                onClick={() => setIsAiChairmanAssistantOpen(true)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-ambc-gold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-ambc-gold group-hover:scale-110 transition-transform" />
                  <span className="truncate">{item.label}</span>
                </div>
                <span className="text-[9px] bg-amber-500/30 text-ambc-gold-light px-1.5 py-0.2 rounded font-mono">
                  AI
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/15 text-ambc-gold font-semibold border-l-2 border-ambc-gold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-ambc-gold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
            </button>
          );
        })}

        {/* Chairman Gate & Deal Operations */}
        <div className="pt-4 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-amber-400/90 font-mono flex items-center justify-between">
          <span>Chairman Gate™ Operations</span>
        </div>

        {operationsNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/15 text-ambc-gold font-semibold border-l-2 border-ambc-gold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-ambc-gold' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full font-mono ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Institutional & Council Suite */}
        <div className="pt-4 pb-1 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Council Governance
        </div>

        {councilNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                isActive
                  ? 'bg-amber-500/15 text-ambc-gold font-semibold'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0 text-slate-400" />
              <span className="truncate">{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Chairman Gate Active Shield Box */}
      <div className="p-3 m-3 rounded-xl bg-gradient-to-br from-slate-900 to-[#0A1424] border border-ambc-gold/30 text-[11px] text-slate-400">
        <div className="flex items-center justify-between font-semibold text-white mb-1">
          <span className="flex items-center gap-1.5 text-ambc-gold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Chairman Gate™</span>
          </span>
          <span className="text-emerald-400 text-[10px] font-mono">ACTIVE</span>
        </div>
        <p className="text-[10px] text-slate-400 leading-relaxed">
          No uncontrolled introductions. All strategic relationships pass through the Deal Desk.
        </p>
      </div>
    </aside>
  );
};

export default Sidebar;
