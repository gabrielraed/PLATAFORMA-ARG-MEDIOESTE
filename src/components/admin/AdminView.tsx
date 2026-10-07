import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Users,
  Briefcase,
  Compass,
  DollarSign,
  CheckCircle2,
  XCircle,
  FileCheck,
  TrendingUp,
  Activity,
  FolderLock,
  Layers,
} from 'lucide-react';

export const AdminView: React.FC = () => {
  const { introductions, updateIntroductionStatus, opportunities, investors, companies, dealRooms } =
    useApp();
  const [activeTab, setActiveTab] = useState<'metrics' | 'intros' | 'verification'>('metrics');

  const pendingIntros = introductions.filter((i) => i.status === 'UNDER_REVIEW' || i.status === 'REQUESTED');

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              AMBC Secretariat
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] bg-amber-500/20 text-ambc-gold px-1.5 py-0.5 rounded font-mono">
              ROOT ADMIN CONSOLE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Institutional Administration Console
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Oversee membership accreditation, moderate diplomatic introductions, monitor deal
            vault activity, and manage cross-border pipelines.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('metrics')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'metrics' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Executive KPIs & Metrics
          {activeTab === 'metrics' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('intros')}
          className={`pb-3 relative transition-colors flex items-center gap-1.5 ${
            activeTab === 'intros' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
          }`}
        >
          <span>Introduction Requests</span>
          {pendingIntros.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px] font-bold">
              {pendingIntros.length}
            </span>
          )}
          {activeTab === 'intros' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('verification')}
          className={`pb-3 relative transition-colors ${
            activeTab === 'verification' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
          }`}
        >
          KYC & Member Accreditation Queue
          {activeTab === 'verification' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
          )}
        </button>
      </div>

      {/* Tab: Metrics */}
      {activeTab === 'metrics' && (
        <div className="space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono text-slate-400">Total Deal Pipeline</div>
              <div className="text-2xl font-bold font-mono text-ambc-gold">$1,850M USD</div>
              <div className="text-[10px] text-emerald-400">5 Tier-1 RIGI Projects</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono text-slate-400">Active Allocators</div>
              <div className="text-2xl font-bold font-mono text-white">{investors.length + 115}</div>
              <div className="text-[10px] text-slate-400">UAE, KSA, Qatar, Kuwait</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono text-slate-400">Registered Enterprises</div>
              <div className="text-2xl font-bold font-mono text-white">{companies.length + 84}</div>
              <div className="text-[10px] text-slate-400">Export Certified & Growth</div>
            </div>

            <div className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-1">
              <div className="text-[10px] uppercase font-mono text-slate-400">Facilitated Intros</div>
              <div className="text-2xl font-bold font-mono text-white">{introductions.length + 42}</div>
              <div className="text-[10px] text-emerald-400">92% Bilateral Satisfaction</div>
            </div>
          </div>

          {/* System status & AI health */}
          <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 space-y-4">
            <h3 className="text-base font-serif font-bold text-white">
              Platform Infrastructure & Security Health
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">Virtual Data Room (VDR) Vaults</div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>2 Active Vaults (256-Bit Encrypted)</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">AI Matching Engine Status</div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Operational (Gemini 2.5 Flash Grounded)</span>
                </div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-slate-400">Bilateral Diplomatic Corridors</div>
                <div className="font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>6 Active (ARG ↔ UAE, KSA, QAT, KWT)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Introductions Moderation */}
      {activeTab === 'intros' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-400">
            Moderate and advance bilateral requests between Argentine sponsors and Gulf allocators.
          </div>

          {introductions.map((intro) => (
            <div
              key={intro.id}
              className="p-5 rounded-2xl bg-[#091120] border border-slate-800 space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-mono text-ambc-gold font-bold">
                    Requester: {intro.fromUserName || intro.requesterName} ({intro.fromCompany || intro.requesterCompany})
                  </span>
                  <h4 className="text-sm font-bold text-white mt-0.5">
                    Target: {intro.targetName || intro.targetCompanyName} ({intro.targetCompany || intro.targetCompanyName})
                  </h4>
                  <div className="text-xs text-slate-400 mt-0.5">
                    Ticket: {intro.investmentTicketExpected || intro.estimatedBusinessSize} · Objective: {intro.purpose || intro.businessObjective}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {intro.status}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                "{intro.message}"
              </p>

              {/* Moderation Controls */}
              <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
                <span className="text-[11px] text-slate-500">Submitted: {intro.createdAt}</span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      updateIntroductionStatus(
                        intro.id,
                        'INTRODUCTION_MADE',
                        'Approved by Secretariat. Bilateral introductions initiated via executive video conference.'
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 font-semibold flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Approve & Dispatch Intro</span>
                  </button>

                  <button
                    onClick={() =>
                      updateIntroductionStatus(
                        intro.id,
                        'DECLINED',
                        'Declined due to mandate mismatch.'
                      )
                    }
                    className="px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-300 border border-rose-500/20 hover:bg-rose-500/20 font-semibold flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Decline</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab: Verification Queue */}
      {activeTab === 'verification' && (
        <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-serif font-bold text-white">
              Institutional Accreditation Queue
            </h3>
            <span className="text-xs text-slate-400">All submissions verified for 2026/2027</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Al-Mansoor Family Office (Dubai, UAE)</div>
                <div className="text-slate-400 text-[11px]">
                  Beneficial Ownership & DIFC Trade License Verified
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                INSTITUTIONAL ACCREDITED
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Catamarca Lithium Resources S.A. (Argentina)</div>
                <div className="text-slate-400 text-[11px]">
                  Mining Concession Title & Environmental License Verified
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold">
                PREMIUM VERIFIED
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminView;
