import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { Investor, Country } from '../../types';
import {
  Search,
  MapPin,
  Briefcase,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  DollarSign,
  Layers,
  Send,
  Building,
} from 'lucide-react';

interface InvestorsViewProps {
  setCurrentView: (view: string) => void;
}

export const InvestorsView: React.FC<InvestorsViewProps> = ({ setCurrentView }) => {
  const { t } = useLanguage();
  const { investors, setIntroModalTarget } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string>('All');

  const countries = ['All', 'United Arab Emirates', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Argentina'];

  const filtered = investors.filter((inv) => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        inv.organization.toLowerCase().includes(q) ||
        inv.name.toLowerCase().includes(q) ||
        inv.city.toLowerCase().includes(q) ||
        inv.preferredSectors.some((s) => s.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedCountry !== 'All' && inv.country !== selectedCountry) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Institutional Capital Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Middle East & Global Investor Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Sovereign wealth funds, prominent Gulf family offices, and private equity institutions
            actively allocating capital into Latin American resource and infrastructure assets.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <strong className="text-white">{filtered.length}</strong> Verified Syndicates
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#091120] border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search family offices, sovereign funds, cities, or target minerals..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
          />
        </div>

        <div className="sm:w-64">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
          >
            {countries.map((c) => (
              <option key={c} value={c}>
                Country: {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid of Investor Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((inv) => (
          <div
            key={inv.id}
            className="rounded-2xl border border-slate-800 bg-[#091120] hover:border-amber-500/40 p-6 space-y-4 flex flex-col justify-between transition-all shadow-xl group"
          >
            <div className="space-y-4">
              {/* Header profile row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-ambc-gold/40 flex items-center justify-center text-ambc-gold font-bold text-base shadow shrink-0">
                    {inv.organization.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-ambc-gold transition-colors">
                      {inv.organization}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-ambc-gold shrink-0" />
                      <span>
                        {inv.city}, {inv.country}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold shrink-0">
                  {inv.verificationStatus}
                </span>
              </div>

              {/* Status Indicator */}
              <div className="p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-[11px] text-emerald-300 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">{inv.statusText}</span>
              </div>

              {/* Financial Profile Matrix */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Target Ticket</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">
                    {inv.ticketRange}
                  </div>
                  <div className="text-[10px] text-ambc-gold">{inv.type}</div>
                </div>

                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Est. Assets (AUM)</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono mt-0.5">
                    {inv.aum}
                  </div>
                  <div className="text-[10px] text-slate-400">Deals Closed: {inv.dealsCount}</div>
                </div>
              </div>

              {/* Mandate Description */}
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                  Investment Mandate
                </div>
                <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                  {inv.currentMandate}
                </p>
              </div>

              {/* Preferred Sectors Tags */}
              <div className="space-y-1">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                  Sectors of Interest
                </div>
                <div className="flex flex-wrap gap-1">
                  {inv.preferredSectors.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] text-slate-300"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() =>
                  setIntroModalTarget({
                    id: inv.id,
                    name: inv.organization,
                    type: 'INVESTOR',
                    company: `${inv.name} (${inv.type})`,
                    country: inv.country,
                  })
                }
                className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Bilateral Introduction</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorsView;
