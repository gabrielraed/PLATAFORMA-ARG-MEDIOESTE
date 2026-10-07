import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { PlatformEvent } from '../../types';
import {
  Calendar,
  MapPin,
  Users,
  Shield,
  Clock,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';

interface EventsViewProps {
  setCurrentView: (view: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({ setCurrentView }) => {
  const { t } = useLanguage();
  const { events, toggleEventRegistration } = useApp();

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Bilateral Summitry & Diplomacy
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Bilateral Investment Forums & Roundtables
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            High-level ministerial gatherings, private sovereign wealth roundtables, and cross-border
            investment summits across Dubai, Riyadh, Abu Dhabi, and Buenos Aires.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Scheduled Summits: <strong className="text-white">{events.length}</strong>
        </div>
      </div>

      {/* Grid of Events */}
      <div className="space-y-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-[#091120] hover:border-slate-700 transition-all shadow-xl space-y-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-ambc-gold text-xs font-mono font-bold">
                    {evt.format}
                  </span>
                  {evt.isVipOnly && (
                    <span className="px-2.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold flex items-center gap-1">
                      <Shield className="w-3 h-3" />
                      Chatham House Rule / VIP Only
                    </span>
                  )}
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    {evt.attendeesCount} Confirmed Delegates
                  </span>
                </div>

                <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
                  {evt.title}
                </h2>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
                  <span className="flex items-center gap-1.5 font-medium text-amber-300">
                    <Calendar className="w-4 h-4 text-ambc-gold" />
                    {evt.date} · {evt.time}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-ambc-gold" />
                    {evt.venue} ({evt.city}, {evt.country})
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => toggleEventRegistration(evt.id)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md shrink-0 ${
                  evt.registered
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1.5'
                    : 'bg-gold-gradient text-slate-950 hover:opacity-95'
                }`}
              >
                {evt.registered ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Invitation Confirmed</span>
                  </>
                ) : (
                  <span>Request Delegation Invitation</span>
                )}
              </button>
            </div>

            {/* Event Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
              {evt.description}
            </p>

            {/* Keynote Speakers Row */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-[10px] uppercase font-mono tracking-wider text-ambc-gold font-bold">
                Featured Speakers & Ministerial Delegates:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(evt.speakers || []).map((spk, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs"
                  >
                    <div className="font-bold text-white">{spk.name}</div>
                    <div className="text-[11px] text-ambc-gold mt-0.5">{spk.title}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{spk.org}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsView;
