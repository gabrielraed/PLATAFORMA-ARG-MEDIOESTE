import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Logo } from '../common/Logo';
import { ASSET_IMAGES } from '../../assets/images';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Globe,
  TrendingUp,
  Building,
  Users2,
  Briefcase,
  Layers,
  ChevronRight,
  AlertTriangle,
  FolderLock,
  HelpCircle,
} from 'lucide-react';

export const PublicHome: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { t, language } = useLanguage();
  const { opportunities, setSelectedOpportunity } = useApp();

  const featured = opportunities.slice(0, 3);

  return (
    <div className="space-y-16 animate-in fade-in duration-300 text-left">
      {/* Hero Section matching Official Cover Image */}
      <section className="relative rounded-3xl overflow-hidden border border-ambc-gold/40 bg-slate-950 min-h-[580px] sm:min-h-[660px] flex items-center shadow-2xl">
        {/* Background Skyline Image */}
        <img
          src={ASSET_IMAGES.heroSkyline}
          alt="Argentina-GCC Connect Hero Skyline"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.42] scale-105"
        />

        {/* Ambient Dark Navy & Gold Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#070D18] via-[#070D18]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070D18] via-transparent to-transparent" />

        {/* Subtle Arabesque Pattern Overlay */}
        <div className="absolute inset-0 bg-arabesque-pattern opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl px-6 sm:px-12 py-16 space-y-6">
          {/* Top Pill / Kicker */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono tracking-widest uppercase text-ambc-gold font-bold">
              ARGENTINA–GCC CONNECT
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-300 tracking-wider uppercase font-medium">
              Argentina–GCC Business & Investment Council (AGBIC)
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
              Connecting Companies, Markets & <br />
              <span className="text-gold-gradient">Strategic Partners</span>
            </h1>

            <div className="text-base sm:text-lg text-slate-300 font-sans italic pt-1">
              “We don’t simply connect businesses. We qualify, structure and facilitate strategic relationships.”
            </div>

            <div className="text-lg sm:text-xl font-arabic font-bold text-ambc-gold-light tracking-wide pt-1">
              فرص بلا حدود · شراكات استراتيجية موثقة
            </div>
          </div>

          {/* Subheadline */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed font-sans">
            A private B2B strategic relationship, market-entry and joint-venture ecosystem operated
            by the Argentina–GCC Business & Investment Council (AGBIC). All strategic introductions
            pass through the AGBIC Executive Deal Desk and Chairman Gate™.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <button
              onClick={() => setCurrentView('opportunities')}
              className="px-7 py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl transition-all flex items-center gap-2"
            >
              <span>Explore Business Opportunities</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setCurrentView('how-it-works')}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-xs uppercase tracking-wider border border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <HelpCircle className="w-4 h-4 text-ambc-gold" />
              <span>How It Works (9 Steps)</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className="px-5 py-3.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-ambc-gold font-semibold text-xs border border-amber-500/30 transition-all flex items-center gap-1.5"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Enter Executive Portal</span>
            </button>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">180+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Accredited Enterprises</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-ambc-gold">$1.4B+</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Strategic Deal Pipeline</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">Argentina ↔ GCC</div>
              <div className="text-[11px] text-slate-400 mt-0.5">6 Strategic Partner Nations</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-400">100%</div>
              <div className="text-[11px] text-slate-400 mt-0.5">Deal Desk Qualified</div>
            </div>
          </div>
        </div>
      </section>

      {/* Chairman Gate™ Controlled Ecosystem Feature */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#0C1629] via-[#091120] to-[#0C1629] border border-ambc-gold/40 shadow-xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              Institutional Governance Principle
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Chairman Gate™ — Controlled Relationship Architecture
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              The platform does NOT operate as an open social network where members directly exchange
              unvetted contact data. Private phone numbers and personal emails are strictly shielded.
              Every high-value partnership is qualified by the AGBIC Deal Desk and approved by Chairman
              H.E. Juan Carlos Moretti.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-xs shrink-0">
            <div className="font-bold text-amber-300 font-mono">CORE GOVERNANCE RULE:</div>
            <div className="text-slate-200 font-mono text-[11px]">
              NO DIRECT CONTACT · NO UNCONTROLLED INTRODUCTIONS
            </div>
            <div className="text-slate-400 text-[10px] pt-1 border-t border-slate-800">
              Primary Action: <strong>"REQUEST INTRODUCTION"</strong>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Official Value Proposition Pillars from Cover */}
      <section className="rounded-3xl border border-slate-800 bg-[#091120] p-8 sm:p-12 shadow-xl">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Bilateral Council Mandate
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Why AGBIC Connect
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Structured to eliminate informational friction, protect confidentiality, and ensure
            smooth market entry between Latin America and the Arabian Gulf.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Oportunidades Exclusivas</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Accede a oportunidades estratégicas precalificadas en minería de litio, energía,
              agroindustria, infraestructura y tecnología.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
              <Users2 className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Red Bilateral de Alto Nivel</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Conecta con empresas líderes, conglomerados industriales y oficinas familiares de Dubái,
              Abu Dabi, Riad, Doha y Ciudad de Kuwait.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Sectores Estratégicos</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Foco en minerales críticos, corredores agroalimentarios halal, ductos de gas de Vaca
              Muerta y software portuario bilateral.
            </p>
          </div>

          <div className="space-y-3 p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-left">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white">Soporte Kreston y RIGI</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Asistencia tributaria y societaria provista por Castillo & Asociados – Kreston Argentina
              para garantizar seguridad jurídica bajo la ley RIGI.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Strategic Opportunities */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              Curated Pipeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
              Featured Strategic Opportunities
            </h2>
          </div>
          <button
            onClick={() => setCurrentView('opportunities')}
            className="text-xs text-ambc-gold hover:underline flex items-center gap-1 font-semibold"
          >
            <span>View All Opportunities</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((opp) => (
            <div
              key={opp.id}
              className="rounded-2xl border border-slate-800 bg-[#091120] hover:border-amber-500/40 transition-all shadow-xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-slate-950">
                  <img
                    src={opp.imageUrl}
                    alt={opp.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.7]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#091120] via-black/30 to-transparent" />
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur border border-slate-700 text-[10px] font-bold text-white">
                    {opp.relationshipType}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <h3 className="text-base font-serif font-bold text-white group-hover:text-ambc-gold transition-colors">
                    {opp.title}
                  </h3>
                  <div className="text-xs font-mono text-ambc-gold font-bold">
                    Scale: {opp.estimatedScale}
                  </div>
                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-sans">
                    {opp.businessObjective}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => setSelectedOpportunity(opp)}
                  className="w-full py-2 px-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-1.5"
                >
                  <span>Review Strategic Dossier</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Services Conversion Section (Castillo & Asociados – Kreston Argentina) */}
      <section className="rounded-3xl border border-slate-800 bg-[#091120] p-8 sm:p-12 space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              Exclusive Advisory Partner
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Castillo & Asociados – Kreston Argentina
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Strategic relationships require solid execution. As the exclusive professional services
              partner of AGBIC, Castillo & Asociados provides international tax structuring, local
              incorporation, due diligence, and transfer pricing for Gulf companies entering Argentina.
            </p>
          </div>

          <button
            onClick={() => setCurrentView('kreston-advisory')}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 shrink-0"
          >
            Explore Advisory Suite
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">Market-Entry & Entity Setup</div>
            <p className="text-slate-400 leading-relaxed">
              Argentine S.A. incorporation, CUIT tax registry, and statutory representation.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">RIGI Statutory Tax Stability</div>
            <p className="text-slate-400 leading-relaxed">
              30-year tax lock-in, 0% export withholdings, and offshore forex retention advisory.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="font-bold text-white text-sm">M&A & Concession Due Diligence</div>
            <p className="text-slate-400 leading-relaxed">
              Financial auditing, title validation, and transfer pricing optimization.
            </p>
          </div>
        </div>
      </section>

      {/* Official Bottom Call to Action */}
      <section className="relative rounded-3xl overflow-hidden border border-ambc-gold/40 bg-gradient-to-r from-[#0B1527] via-slate-950 to-[#0B1527] p-8 sm:p-14 text-center space-y-6">
        <Logo size="lg" className="justify-center" showSubtitle={false} showArabicConcept={true} />

        <div className="max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">
            Argentina y el Golfo Pérsico. El momento es ahora.
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Apply for accredited standing with the Argentina–GCC Business & Investment Council to
            access screened opportunities and confidential Business Rooms.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setCurrentView('opportunities')}
            className="px-8 py-3.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-xl flex items-center gap-2"
          >
            <span>Request Business Introduction</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentView('how-it-works')}
            className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs border border-slate-700/80"
          >
            How It Works
          </button>
        </div>
      </section>
    </div>
  );
};

export default PublicHome;
