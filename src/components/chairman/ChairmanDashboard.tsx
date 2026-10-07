import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Briefcase,
  Layers,
  ArrowRight,
  Sparkles,
  Building,
  TrendingUp,
  Lock,
  Calendar,
  AlertTriangle,
  FolderLock,
  UserCheck,
} from 'lucide-react';

export const ChairmanDashboard: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { introductions, chairmanDecision, opportunities, krestonLeads, businessRooms, setSelectedOpportunity } =
    useApp();
  const { currentUser } = useAuth();
  const { t } = useLanguage();

  const [selectedIntroId, setSelectedIntroId] = useState<string | null>(null);
  const [decisionNotes, setDecisionNotes] = useState('');
  const [activeFilter, setActiveFilter] = useState<'PENDING' | 'APPROVED' | 'ALL'>('PENDING');

  const pendingApprovals = introductions.filter((i) => i.chairmanStatus === 'PENDING');
  const approvedIntros = introductions.filter((i) => i.chairmanStatus === 'APPROVED');

  const filteredIntros =
    activeFilter === 'PENDING'
      ? pendingApprovals
      : activeFilter === 'APPROVED'
      ? approvedIntros
      : introductions;

  const totalStrategicPipeline = 1420; // in USD Millions

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="relative rounded-2xl overflow-hidden border border-ambc-gold/50 bg-gradient-to-r from-[#0C1629] via-[#091120] to-[#0C1629] p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-ambc-gold border border-amber-500/40 text-[10px] font-mono font-bold tracking-widest uppercase">
                CHAIRMAN GATE™ SUPREME GOVERNANCE
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Active Executive Session
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide">
              Chairman Executive Decision Console
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Every strategic business relationship, high-value cross-border alliance, and market-entry
              initiative requires formal Chairman Gate clearance before counterparty engagement.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentView('deal-desk')}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 flex items-center gap-2 shadow"
            >
              <Briefcase className="w-4 h-4 text-ambc-gold" />
              <span>Open Deal Desk CRM</span>
            </button>
            <button
              onClick={() => setCurrentView('kreston-crm')}
              className="px-4 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center gap-2"
            >
              <span>Kreston Advisory Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Institutional KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-mono text-slate-400">Chairman Gate Queue</div>
          <div className="text-2xl font-bold font-mono text-amber-300">
            {pendingApprovals.length} Pending Clearances
          </div>
          <div className="text-[10px] text-slate-400">Strict Executive SLA</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-mono text-slate-400">Strategic Deal Pipeline</div>
          <div className="text-2xl font-bold font-mono text-ambc-gold">
            USD ${totalStrategicPipeline}M
          </div>
          <div className="text-[10px] text-emerald-400">Argentina ↔ GCC Corridors</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-mono text-slate-400">Active Business Rooms</div>
          <div className="text-2xl font-bold font-mono text-white">
            {businessRooms.length} Controlled Vaults
          </div>
          <div className="text-[10px] text-slate-400">Bilateral NDAs Executed</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-[10px] uppercase font-mono text-slate-400">Kreston Advisory Value</div>
          <div className="text-2xl font-bold font-mono text-emerald-400">
            USD ${(krestonLeads.reduce((acc, l) => acc + l.estimatedFeeUsd, 0) / 1000).toFixed(0)}K
          </div>
          <div className="text-[10px] text-slate-400">Source: AGBIC CONNECT</div>
        </div>
      </div>

      {/* Main Section: Introduction Requests Requiring Chairman Decision */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-serif font-bold text-white">
              Strategic Introductions Awaiting Decision
            </h2>
            <p className="text-xs text-slate-400">
              Evaluate commercial fit, confidentiality requirements, and Kreston advisory scope.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => setActiveFilter('PENDING')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'PENDING'
                  ? 'bg-amber-500/20 text-ambc-gold border border-ambc-gold/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Pending Approval ({pendingApprovals.length})
            </button>
            <button
              onClick={() => setActiveFilter('APPROVED')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'APPROVED'
                  ? 'bg-amber-500/20 text-ambc-gold border border-ambc-gold/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              Cleared Introductions ({approvedIntros.length})
            </button>
            <button
              onClick={() => setActiveFilter('ALL')}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                activeFilter === 'ALL'
                  ? 'bg-amber-500/20 text-ambc-gold border border-ambc-gold/40'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              All Records
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {filteredIntros.map((req) => (
            <div
              key={req.id}
              className="p-6 rounded-2xl border border-slate-800 bg-[#091120] hover:border-slate-700 transition-all space-y-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-ambc-gold font-bold">{req.id}</span>
                    <span className="text-slate-500">·</span>
                    <span className="text-xs text-slate-300 font-semibold">{req.sector}</span>
                    <span className="text-slate-500">·</span>
                    <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-[10px] font-mono">
                      {req.confidentiality}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-ambc-gold text-[10px] font-mono">
                      Priority: {req.priority}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-serif font-bold text-white mt-1">
                    {req.requesterCompany} ({req.requesterCountry}) ↔ {req.targetCompanyName} ({req.targetCountry})
                  </h3>

                  <div className="text-xs text-slate-400">
                    Relationship: <strong className="text-white">{req.relationshipType}</strong> · Estimated Scale:{' '}
                    <strong className="text-ambc-gold">{req.estimatedBusinessSize}</strong> · Timeframe: {req.timeframe}
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold ${
                      req.chairmanStatus === 'APPROVED'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : req.chairmanStatus === 'PENDING'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 animate-pulse'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    Chairman: {req.chairmanStatus}
                  </span>
                </div>
              </div>

              {/* Business Objective & Context */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-300">Stated Business Objective:</div>
                <p className="text-slate-200 leading-relaxed font-sans">{req.businessObjective}</p>
                {req.additionalComments && (
                  <div className="pt-2 border-t border-slate-800 text-slate-400 italic">
                    Note: "{req.additionalComments}"
                  </div>
                )}
              </div>

              {/* Professional Services Scoping (Castillo & Asociados – Kreston Argentina) */}
              <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/30 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono uppercase text-ambc-gold font-bold">
                    Kreston Advisory Scope:
                  </span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(req.requiredServices || []).map((svc, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-200 text-[10px]"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-slate-300 font-medium">
                  Assigned Executive: <strong className="text-white">{req.assignedExecutive}</strong>
                </div>
              </div>

              {/* Chairman Action Bar */}
              <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  Last updated on {req.updatedAt} · AGBIC Deal Desk Tracking
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => {
                      chairmanDecision(
                        req.id,
                        'APPROVE',
                        'Executive Chairman clearance granted. Proceed with diplomatic introduction and Business Room setup.'
                      );
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5 transition-all shadow"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Approve Strategic Intro</span>
                  </button>

                  <button
                    onClick={() => {
                      chairmanDecision(
                        req.id,
                        'REQUEST_MORE_INFO',
                        'Request detailed beneficial ownership and technical feasibility documents before introduction.'
                      );
                    }}
                    className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-ambc-gold" />
                    <span>Request More Info</span>
                  </button>

                  <button
                    onClick={() => {
                      chairmanDecision(
                        req.id,
                        'REJECT',
                        'Introduction declined due to mandate incompatibility.'
                      );
                    }}
                    className="px-3 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filteredIntros.length === 0 && (
            <div className="p-12 text-center rounded-2xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400">
              No introduction requests currently matching this filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChairmanDashboard;
