import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import {
  Search,
  Bell,
  Sparkles,
  Globe,
  ChevronDown,
  User as UserIcon,
  LogOut,
  ShieldCheck,
  Check,
  Menu,
  X,
  Briefcase,
  FileText,
} from 'lucide-react';
import { SupportedLanguage } from '../../i18n/translations';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  isPublicMode?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  isPublicMode = false,
}) => {
  const { language, setLanguage, isRtl } = useLanguage();
  const { currentUser, switchDemoUser, logout } = useAuth();
  const {
    notifications,
    markNotificationsAsRead,
    setIsAiChairmanAssistantOpen,
    setIsSearchModalOpen,
    introductions,
  } = useApp();

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notifMenuOpen, setNotifMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const pendingApprovals = introductions.filter((i) => i.chairmanStatus === 'PENDING').length;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLangChange = (lang: SupportedLanguage) => {
    setLanguage(lang);
    setLangMenuOpen(false);
  };

  const navItems = isPublicMode
    ? [
        { id: 'public-home', label: 'Home' },
        { id: 'opportunities', label: 'Opportunities' },
        { id: 'companies', label: 'Companies' },
        { id: 'how-it-works', label: 'How It Works' },
        { id: 'kreston-advisory', label: 'Kreston Advisory' },
        { id: 'events', label: 'Summits' },
        { id: 'membership', label: 'Membership' },
        { id: 'about', label: 'About AGBIC' },
      ]
    : [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'opportunities', label: 'Opportunities' },
        { id: 'companies', label: 'Companies' },
        { id: 'chairman-dashboard', label: 'Chairman Gate' },
        { id: 'deal-desk', label: 'Deal Desk' },
        { id: 'business-rooms', label: 'Business Rooms' },
        { id: 'kreston-crm', label: 'Kreston CRM' },
        { id: 'system-health', label: 'System Health' },
      ];

  return (
    <header className="sticky top-0 z-40 bg-[#070D18]/95 backdrop-blur-md border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView(isPublicMode ? 'public-home' : 'dashboard')}
            className="text-left focus:outline-none"
          >
            <Logo size="md" showSubtitle={true} />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-5 text-sm font-medium">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`transition-colors py-2 relative text-xs tracking-wider uppercase font-semibold ${
                currentView === item.id
                  ? 'text-ambc-gold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {item.label}
              {currentView === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls & User Suite */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Global Search Button */}
          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="flex items-center gap-2 px-3 py-2 text-xs text-slate-400 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-all"
            title="Search Platform (Cmd+K)"
          >
            <Search className="w-3.5 h-3.5 text-ambc-gold" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          {/* AI Deal Desk Assistant Button */}
          <button
            onClick={() => setIsAiChairmanAssistantOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-ambc-gold bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-lg transition-all shadow-[0_0_12px_rgba(197,160,89,0.15)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-ambc-gold animate-pulse" />
            <span className="hidden sm:inline">AI Deal Desk</span>
          </button>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-2 text-xs font-semibold text-slate-300 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-ambc-gold" />
              <span className="uppercase">{language}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {langMenuOpen && (
              <div
                className={`absolute top-full mt-2 w-36 bg-[#0E1726] border border-slate-700 rounded-lg shadow-2xl py-1 z-50 ${
                  isRtl ? 'left-0' : 'right-0'
                }`}
              >
                <button
                  onClick={() => handleLangChange('en')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-slate-200 hover:bg-slate-800"
                >
                  <span>English (EN)</span>
                  {language === 'en' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                </button>
                <button
                  onClick={() => handleLangChange('es')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-slate-200 hover:bg-slate-800"
                >
                  <span>Español (ES)</span>
                  {language === 'es' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                </button>
                <button
                  onClick={() => handleLangChange('ar')}
                  className="w-full flex items-center justify-between px-3 py-2 text-xs text-left text-slate-200 hover:bg-slate-800 font-arabic"
                >
                  <span>العربية (AR)</span>
                  {language === 'ar' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                </button>
              </div>
            )}
          </div>

          {/* Notifications Popover */}
          <div className="relative">
            <button
              onClick={() => {
                setNotifMenuOpen(!notifMenuOpen);
                if (!notifMenuOpen) markNotificationsAsRead();
              }}
              className="relative p-2 text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-slate-300" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 font-bold text-[10px] rounded-full flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {notifMenuOpen && (
              <div
                className={`absolute top-full mt-2 w-80 bg-[#0E1726] border border-slate-700 rounded-lg shadow-2xl p-3 z-50 ${
                  isRtl ? 'left-0' : 'right-0'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                    Deal Desk & Chairman Alerts
                  </span>
                  <span className="text-[10px] text-ambc-gold">Live Stream</span>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded bg-slate-800/60 border border-slate-700/50 text-left hover:border-slate-600 transition-colors"
                    >
                      <div className="flex items-center justify-between text-[11px] font-semibold text-ambc-gold-light">
                        <span>{n.title}</span>
                        <span className="text-[9px] text-slate-400 font-normal">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1 line-clamp-2">{n.message}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Persona & Role Switcher */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1.5 pl-2 text-left bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 rounded-lg transition-colors"
              >
                <div className="w-7 h-7 rounded bg-amber-500/20 border border-ambc-gold text-ambc-gold font-bold text-xs flex items-center justify-center shrink-0">
                  {currentUser.name.charAt(0)}
                </div>
                <div className="hidden lg:block text-left pr-1 max-w-[130px]">
                  <div className="text-xs font-bold text-slate-200 leading-tight truncate">
                    {currentUser.name.split(' ')[0]}
                  </div>
                  <div className="text-[10px] text-ambc-gold font-mono leading-none truncate">
                    {currentUser.role.replace(/_/g, ' ')}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {userMenuOpen && (
                <div
                  className={`absolute top-full mt-2 w-80 bg-[#0E1726] border border-slate-700 rounded-lg shadow-2xl p-2 z-50 ${
                    isRtl ? 'left-0' : 'right-0'
                  }`}
                >
                  <div className="p-2 border-b border-slate-800 mb-2">
                    <div className="text-xs font-bold text-white">{currentUser.name}</div>
                    <div className="text-[11px] text-slate-400">{currentUser.companyName}</div>
                    <div className="text-[10px] text-ambc-gold mt-1 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" />
                      <span>{currentUser.verificationStatus}</span>
                      <span>·</span>
                      <span>Tier: {currentUser.membershipTier}</span>
                    </div>
                  </div>

                  {/* Persona Switcher Quick Access */}
                  <div className="px-2 py-1 text-[10px] uppercase tracking-wider text-slate-400 font-bold">
                    Switch Council / Partner Persona:
                  </div>

                  <button
                    onClick={() => {
                      switchDemoUser('chairman');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded text-xs text-left transition-colors ${
                      currentUser.role === 'CHAIRMAN'
                        ? 'bg-amber-500/10 text-ambc-gold border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">H.E. Juan Carlos Moretti</div>
                      <div className="text-[10px] text-slate-400">Chairman of the Council (AGBIC)</div>
                    </div>
                    {currentUser.role === 'CHAIRMAN' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                  </button>

                  <button
                    onClick={() => {
                      switchDemoUser('deal_desk_mgr');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded text-xs text-left transition-colors ${
                      currentUser.role === 'DEAL_DESK_MANAGER'
                        ? 'bg-amber-500/10 text-ambc-gold border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Sofia Al-Rashid</div>
                      <div className="text-[10px] text-slate-400">Deal Desk Lead (Dubai DIFC)</div>
                    </div>
                    {currentUser.role === 'DEAL_DESK_MANAGER' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                  </button>

                  <button
                    onClick={() => {
                      switchDemoUser('kreston_partner');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded text-xs text-left transition-colors ${
                      currentUser.role === 'PROFESSIONAL_SERVICES_MANAGER'
                        ? 'bg-amber-500/10 text-ambc-gold border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Dr. Gabriel Raed</div>
                      <div className="text-[10px] text-slate-400">Castillo & Asociados – Kreston Argentina</div>
                    </div>
                    {currentUser.role === 'PROFESSIONAL_SERVICES_MANAGER' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                  </button>

                  <button
                    onClick={() => {
                      switchDemoUser('company_arg');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded text-xs text-left transition-colors ${
                      currentUser.id === 'usr_valeria'
                        ? 'bg-amber-500/10 text-ambc-gold border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Ing. Valeria Rossi</div>
                      <div className="text-[10px] text-slate-400">CEO, Catamarca Lithium (Argentina)</div>
                    </div>
                    {currentUser.id === 'usr_valeria' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                  </button>

                  <button
                    onClick={() => {
                      switchDemoUser('company_gcc');
                      setUserMenuOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded text-xs text-left transition-colors ${
                      currentUser.id === 'usr_sultan'
                        ? 'bg-amber-500/10 text-ambc-gold border border-amber-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-white">Sultan Al-Falasi</div>
                      <div className="text-[10px] text-slate-400">VP, Gulf Industrial Holdings (UAE)</div>
                    </div>
                    {currentUser.id === 'usr_sultan' && <Check className="w-3.5 h-3.5 text-ambc-gold" />}
                  </button>

                  <div className="border-t border-slate-800 mt-2 pt-1">
                    <button
                      onClick={() => {
                        setCurrentView('chairman-dashboard');
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded text-xs text-slate-300 hover:bg-slate-800 text-left"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-ambc-gold" />
                      <span>Chairman Gate Dashboard</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded text-xs text-rose-400 hover:bg-rose-500/10 text-left mt-1"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setCurrentView('login')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-900 bg-gold-gradient rounded-lg hover:opacity-95 shadow-md"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="xl:hidden p-2 text-slate-300 hover:text-white bg-slate-900/80 border border-slate-700/60 rounded-lg"
          >
            {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileNavOpen && (
        <div className="xl:hidden border-t border-slate-800 bg-[#070D18] px-4 pt-3 pb-6 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentView(item.id);
                setMobileNavOpen(false);
              }}
              className={`w-full text-left py-2 px-3 rounded text-sm font-medium ${
                currentView === item.id
                  ? 'bg-amber-500/15 text-ambc-gold'
                  : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;
