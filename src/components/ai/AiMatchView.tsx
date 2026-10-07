import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  MapPin,
  Building,
  Briefcase,
  DollarSign,
  Filter,
  Sliders,
} from 'lucide-react';

interface AiMatchViewProps {
  setCurrentView: (view: string) => void;
}

export const AiMatchView: React.FC<AiMatchViewProps> = ({ setCurrentView }) => {
  const { t } = useLanguage();
  const { opportunities, setSelectedOpportunity, setIntroModalTarget } = useApp();
  const { currentUser } = useAuth();

  const [minScore, setMinScore] = useState<number>(85);

  const matched = opportunities
    .filter((opp) => (opp.aiMatchScore || 0) >= minScore)
    .sort((a, b) => (b.aiMatchScore || 0) - (a.aiMatchScore || 0));

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              Proprietary AI Bilateral Matching Engine
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] bg-amber-500/20 text-ambc-gold px-1.5 py-0.5 rounded border border-amber-500/30">
              ALGORITHM V4.2
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            AI Mandate Match Engine
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Correlating institutional capital criteria, RIGI statutory thresholds, risk horizons, and
            geographic mandates with verified Argentine and Gulf investment targets.
          </p>
        </div>

        {/* Min Score Filter */}
        <div className="flex items-center gap-3 p-3 rounded-xl bg-[#091120] border border-slate-800 text-xs">
          <Sliders className="w-4 h-4 text-ambc-gold shrink-0" />
          <span className="text-slate-400">Minimum Mandate Fit:</span>
          <select
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            className="px-2 py-1 bg-slate-900 border border-slate-700 rounded text-xs text-ambc-gold font-bold focus:outline-none"
          >
            <option value={95}>95%+ Exceptional Fit</option>
            <option value={90}>90%+ High Synergy</option>
            <option value={85}>85%+ Strong Match</option>
            <option value={80}>80%+ Moderate Alignment</option>
          </select>
        </div>
      </div>

      {/* Active Persona Mandate Card */}
      {currentUser && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B172C] to-slate-900 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-mono tracking-wider text-ambc-gold font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Active Matching Mandate Profile</span>
            </div>
            <div className="text-sm font-bold text-white">
              {currentUser.name} · {currentUser.companyName} ({currentUser.city}, {currentUser.country})
            </div>
            <div className="text-xs text-slate-300 max-w-2xl">
              Target Ticket: USD $10M–$100M · Sectors: Critical Minerals, Lithium, Energy, Agribusiness · Structure: Joint Venture & Project Finance.
            </div>
          </div>

          <button
            onClick={() => setCurrentView('dashboard')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 shrink-0"
          >
            Adjust Criteria in Settings
          </button>
        </div>
      )}

      {/* Ranked Matches List */}
      <div className="space-y-4">
        {matched.map((opp, index) => (
          <div
            key={opp.id}
            className="p-6 rounded-2xl border border-slate-800 bg-[#091120] hover:border-amber-500/40 transition-all shadow-xl space-y-4"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              {/* Left Profile */}
              <div className="flex items-start gap-4">
                <img
                  src={opp.imageUrl}
                  alt={opp.title}
                  className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-800 brightness-90"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      RANK #{index + 1}
                    </span>
                    <span className="text-xs text-ambc-gold font-mono font-semibold">
                      {opp.sector}
                    </span>
                    {opp.rigiEligible && (
                      <span className="text-[10px] text-emerald-400 font-bold">
                        · RIGI Eligible
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-serif font-bold text-white mt-1">{opp.title}</h3>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {opp.companyName} · {opp.location}
                  </div>
                </div>
              </div>

              {/* Match Score Display */}
              <div className="flex items-center gap-4 shrink-0">
                <div className="text-right">
                  <div className="text-2xl font-bold font-mono text-ambc-gold">
                    {opp.aiMatchScore}%
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                    Algorithmic Fit
                  </div>
                </div>

                <button
                  onClick={() => setSelectedOpportunity(opp)}
                  className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-1.5"
                >
                  <span>Review Match</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* AI Explanation Accordion / Reason Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800/80 space-y-2">
              <div className="text-xs font-bold text-ambc-gold-light uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-ambc-gold" />
                <span>Why This Asset Matches Your Mandate:</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                {opp.matchReasons?.map((reason, rIdx) => (
                  <div key={rIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{reason}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs text-slate-400">
              <div className="flex items-center gap-4">
                <span>
                  Capital Required:{' '}
                  <strong className="text-white">
                    {opp.estimatedScale || opp.investmentRequired || (typeof opp.investmentAmount === 'number' ? `USD $${(opp.investmentAmount / 1000000).toFixed(0)}M` : opp.investmentAmount || 'USD $180M')}
                  </strong>
                </span>
                <span>·</span>
                <span>
                  Structure: <strong className="text-white">{opp.investmentStructure || opp.structure || 'Strategic JV'}</strong>
                </span>
                <span>·</span>
                <span>
                  Projected IRR: <strong className="text-emerald-400">{opp.expectedReturn || opp.expectedIrr || opp.financials?.irr || '24.5%'}</strong>
                </span>
              </div>

              <button
                onClick={() =>
                  setIntroModalTarget({
                    id: opp.id,
                    name: opp.title,
                    type: 'OPPORTUNITY',
                    company: opp.companyName,
                    country: opp.country,
                  })
                }
                className="text-xs text-ambc-gold font-bold hover:underline"
              >
                Request Secretariat Introduction →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AiMatchView;
