import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { IntroductionStatus } from '../../types';
import {
  Users2,
  Clock,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Calendar,
  Building,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

interface IntroductionsViewProps {
  setCurrentView: (view: string) => void;
}

export const IntroductionsView: React.FC<IntroductionsViewProps> = ({ setCurrentView }) => {
  const { introductions, updateIntroductionStatus } = useApp();
  const { currentUser } = useAuth();
  const [filter, setFilter] = useState<string>('ALL');

  const getStatusBadge = (status: IntroductionStatus) => {
    switch (status) {
      case 'REQUESTED':
        return (
          <span className="px-2.5 py-1 rounded bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
            Requested
          </span>
        );
      case 'UNDER_REVIEW':
        return (
          <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold">
            Under Diplomatic Review
          </span>
        );
      case 'APPROVED':
        return (
          <span className="px-2.5 py-1 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
            Approved by Secretariat
          </span>
        );
      case 'INTRODUCTION_MADE':
        return (
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            Introduction Made
          </span>
        );
      case 'MEETING_SCHEDULED':
        return (
          <span className="px-2.5 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
            Meeting Scheduled
          </span>
        );
      case 'NEGOTIATION':
        return (
          <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-ambc-gold text-ambc-gold text-xs font-semibold">
            Term Sheet Negotiation
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 text-xs">
            {status}
          </span>
        );
    }
  };

  const filtered = introductions.filter((i) => {
    if (filter === 'ALL') return true;
    return i.status === filter;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Executive Facilitation
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Bilateral Introduction Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Track diplomatic screening, ministerial introductions, and bilateral deal sessions
            facilitated directly by the AMBC Connect Secretariat.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            Total Facilitations: <strong className="text-white">{introductions.length}</strong>
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 text-xs no-scrollbar">
        {['ALL', 'UNDER_REVIEW', 'INTRODUCTION_MADE', 'MEETING_SCHEDULED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors whitespace-nowrap ${
              filter === st
                ? 'bg-amber-500/20 text-ambc-gold border border-ambc-gold/40'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Introductions Cards List */}
      <div className="space-y-4">
        {filtered.map((intro) => (
          <div
            key={intro.id}
            className="p-6 rounded-2xl border border-slate-800 bg-[#091120] hover:border-slate-700 transition-all space-y-4"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-ambc-gold font-semibold">
                    ID: {intro.id}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs text-slate-400">Created: {intro.createdAt}</span>
                </div>
                <h3 className="text-base font-serif font-bold text-white mt-1">
                  Introduction with: {intro.targetName}
                </h3>
                <div className="text-xs text-slate-300 mt-0.5">
                  Target: {intro.targetCompany} ({intro.targetCountry})
                </div>
              </div>

              <div>{getStatusBadge(intro.status)}</div>
            </div>

            {/* Purpose & Ticket Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">Purpose</div>
                <div className="font-semibold text-white mt-0.5">{intro.purpose}</div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">
                  Anticipated Capital Ticket
                </div>
                <div className="font-semibold text-ambc-gold mt-0.5">
                  {intro.investmentTicketExpected}
                </div>
              </div>
            </div>

            {/* Message context */}
            <div className="space-y-1 text-xs">
              <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                Submitted Briefing Note:
              </div>
              <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                "{intro.message}"
              </p>
            </div>

            {/* Secretariat Notes */}
            {intro.adminNotes && (
              <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-ambc-gold flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white">AMBC Secretariat Update: </strong>
                  {intro.adminNotes}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">Direct bilateral channel facilitated</span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentView('messages')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-ambc-gold" />
                  <span>Open Messaging Thread</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IntroductionsView;
