import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  MapPin,
  ShieldCheck,
  Building,
  Users2,
  Compass,
  Calendar,
  Lock,
  ChevronRight,
  Briefcase,
  Layers,
  FolderLock,
  CheckCircle2,
  FileCheck,
} from 'lucide-react';

export const MainDashboard: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { t, language } = useLanguage();
  const { currentUser } = useAuth();
  const {
    opportunities,
    companies,
    setSelectedOpportunity,
    setIsAiChairmanAssistantOpen,
    introductions,
    businessRooms,
  } = useApp();

  const featuredOpp = opportunities[0]; // Lithium
  const sidebarOpps = opportunities.slice(1, 4);

  const pendingClearances = introductions.filter((i) => i.chairmanStatus === 'PENDING').length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300 text-left">
      {/* Top Greeting & Council Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-ambc-gold/40 bg-gradient-to-r from-[#0C1629] via-[#091120] to-[#0C1629] p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
                Argentina–GCC Business & Investment Council (AGBIC)
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Chairman Gate™ Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              {language === 'es'
                ? `Bienvenido, ${currentUser?.name.split(' ')[0] || 'Estimado Consejero'}`
                : language === 'ar'
                ? `مرحباً بك، ${currentUser?.name.split(' ')[0] || 'شريكنا المؤسسي'}`
                : `Welcome, ${currentUser?.name.split(' ')[0] || 'Council Executive'}`}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-xl font-sans leading-relaxed">
              “We don’t simply connect businesses. We qualify, structure and facilitate strategic relationships.”
            </p>

            <div className="text-[11px] font-mono text-amber-300/90 pt-1">
              NO DIRECT CONTACT · ALL STRATEGIC INTRODUCTIONS PASS THROUGH AGBIC EXECUTIVE DEAL DESK
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsAiChairmanAssistantOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-ambc-gold font-semibold text-xs border border-amber-500/30 flex items-center gap-2 transition-all shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-ambc-gold" />
              <span>AI Deal Desk Briefing</span>
            </button>

            <button
              onClick={() => setCurrentView('opportunities')}
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md flex items-center gap-2"
            >
              <span>Explore Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-arabesque-pattern opacity-10 pointer-events-none" />
      </div>

      {/* Hero Showcase Grid (Exact visual style from Cover Laptop UI) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Featured Opportunity Card */}
        {featuredOpp && (
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-950 group shadow-2xl flex flex-col justify-end min-h-[360px] sm:min-h-[420px]">
            <img
              src={featuredOpp.imageUrl}
              alt={featuredOpp.title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-[0.7]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-[#070D18]/50 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="px-3 py-1 rounded bg-black/70 backdrop-blur border border-slate-700 text-xs font-semibold text-white flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-ambc-gold" />
                {featuredOpp.location}
              </span>

              <span className="px-3 py-1.5 rounded-lg bg-gold-gradient text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>97% STRATEGIC FIT</span>
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 p-6 sm:p-8 space-y-3">
              <div className="text-xs uppercase font-mono tracking-widest text-ambc-gold font-bold">
                Oportunidad Estratégica Destacada
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
                {featuredOpp.title}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 font-medium">
                <span className="text-lg font-bold text-white font-mono">
                  Scale: {featuredOpp.estimatedScale}
                </span>
                <span>|</span>
                <span className="text-ambc-gold-light">{featuredOpp.relationshipType}</span>
                <span>|</span>
                <span className="text-emerald-400 font-semibold font-mono">RIGI Tier 1 Certified</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 max-w-xl font-sans">
                {featuredOpp.businessObjective}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setSelectedOpportunity(featuredOpp)}
                  className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 transition-all shadow-md inline-flex items-center gap-2"
                >
                  <span>Ver Oportunidad</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Right 1 Col: Oportunidades Destacadas (Sidebar List from Cover) */}
        <div className="rounded-2xl border border-slate-800 bg-[#091120] p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-300">
                Oportunidades Destacadas
              </h3>
              <button
                onClick={() => setCurrentView('opportunities')}
                className="text-[11px] text-ambc-gold hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Ver todas</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {sidebarOpps.map((opp) => (
                <button
                  key={opp.id}
                  onClick={() => setSelectedOpportunity(opp)}
                  className="w-full p-3 rounded-xl bg-slate-900/80 hover:bg-slate-800/90 border border-slate-800/90 hover:border-amber-500/40 text-left transition-all flex items-center gap-3 group"
                >
                  <img
                    src={opp.imageUrl}
                    alt={opp.title}
                    className="w-14 h-14 rounded-lg object-cover shrink-0 brightness-90 group-hover:scale-105 transition-transform"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold text-white group-hover:text-ambc-gold truncate">
                      {opp.title}
                    </div>
                    <div className="text-[11px] font-mono text-ambc-gold-light mt-0.5 truncate">
                      {opp.estimatedScale} · {opp.relationshipType}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 truncate">{opp.location}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chairman Gate Alert Box */}
          <div className="mt-4 p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs">
            <div className="flex items-center justify-between font-bold text-ambc-gold mb-1">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5" />
                Chairman Gate™ Queue
              </span>
              <span className="font-mono text-white">{pendingClearances} Pending</span>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
              All strategic introductions pass through Chairman H.E. Juan Carlos Moretti.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Core Directory Pillars (Directly from Laptop UI Screen bottom) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Deal Desk */}
        <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 hover:border-amber-500/30 transition-all text-left flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Mesa Ejecutiva (Deal Desk)</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Recepción, calificación comercial y asignación bilateral de mandatos estratégicos.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('deal-desk')}
            className="mt-6 text-xs font-bold text-ambc-gold hover:text-amber-300 flex items-center gap-1.5 group"
          >
            <span>Ver Deal Desk CRM</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Empresas */}
        <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 hover:border-amber-500/30 transition-all text-left flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
              <Building className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Empresas Acreditadas</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Corporaciones argentinas y del Golfo con capacidades verificadas y objetivos estratégicos.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('companies')}
            className="mt-6 text-xs font-bold text-ambc-gold hover:text-amber-300 flex items-center gap-1.5 group"
          >
            <span>Ver Directorio</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Kreston Advisory */}
        <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 hover:border-amber-500/30 transition-all text-left flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-serif font-bold text-white">Castillo & Asociados – Kreston</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Asesoría de entrada al mercado, constitución societaria, estructura tributaria y due diligence.
              </p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('kreston-crm')}
            className="mt-6 text-xs font-bold text-ambc-gold hover:text-amber-300 flex items-center gap-1.5 group"
          >
            <span>Ver CRM Kreston</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* 4 Official Value Proposition Pillars from Cover Image */}
      <div className="rounded-2xl border border-slate-800 bg-[#091120] p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          <div className="pt-4 sm:pt-0 sm:px-4 first:pl-0 space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto sm:mx-0 text-ambc-gold">
              <Briefcase className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Accede a oportunidades exclusivas de inversión y negocios.
            </p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4 space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto sm:mx-0 text-ambc-gold">
              <Users2 className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Conecta con inversores, empresas y family offices del Medio Oriente.
            </p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4 space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto sm:mx-0 text-ambc-gold">
              <Layers className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Explora proyectos en sectores estratégicos: energía, minería, agroindustria, infraestructura y tecnología.
            </p>
          </div>

          <div className="pt-4 sm:pt-0 sm:px-4 space-y-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto sm:mx-0 text-ambc-gold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Plataforma segura, con perfiles verificados y tecnología de vanguardia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;
