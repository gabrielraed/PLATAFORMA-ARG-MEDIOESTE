import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { CompanyProfile } from '../../types';
import {
  Search,
  Building2,
  MapPin,
  Users,
  ShieldCheck,
  Send,
  ArrowRight,
  Lock,
  Globe,
  Tag,
} from 'lucide-react';

export const CompaniesView: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { t } = useLanguage();
  const { companies, setIntroModalTarget } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');

  const countries = ['All', 'Argentina', 'United Arab Emirates', 'Saudi Arabia'];

  const filtered = companies.filter((c) => {
    if (search) {
      const q = search.toLowerCase();
      const match =
        c.name.toLowerCase().includes(q) ||
        c.sector.toLowerCase().includes(q) ||
        c.city.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        (c.capabilities || []).some((cap) => cap.toLowerCase().includes(q));
      if (!match) return false;
    }
    if (selectedCountry !== 'All' && c.country !== selectedCountry) return false;
    return true;
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Controlled Corporate Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Accredited Enterprise Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Pre-screened industrial conglomerates, energy midstream operators, and agribusiness
            leaders across Argentina and the Arabian Gulf. Contact details protected under Chairman Gate.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Showing <strong className="text-white">{filtered.length}</strong> Accredited Enterprises
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl bg-[#091120] border border-slate-800 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search company by name, sector, capabilities, or products..."
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

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((comp) => (
          <div
            key={comp.id}
            className="rounded-2xl border border-slate-800 bg-[#091120] hover:border-amber-500/40 p-6 space-y-5 flex flex-col justify-between transition-all shadow-xl group"
          >
            <div className="space-y-4">
              {/* Header profile row */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-ambc-gold/40 flex items-center justify-center text-ambc-gold font-bold text-base shadow shrink-0">
                    {comp.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white group-hover:text-ambc-gold transition-colors">
                      {comp.name}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-ambc-gold shrink-0" />
                      <span>
                        {comp.city}, {comp.country}
                      </span>
                    </div>
                  </div>
                </div>

                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-bold shrink-0">
                  {comp.verificationStatus}
                </span>
              </div>

              {/* Corporate Stats Row */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Sector</div>
                  <div className="font-semibold text-white truncate mt-0.5">{comp.sector}</div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Scale</div>
                  <div className="font-semibold text-ambc-gold truncate mt-0.5">
                    {comp.companySize}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Turnover</div>
                  <div className="font-semibold text-slate-300 truncate mt-0.5">
                    {comp.revenueRange || 'Private'}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{comp.description}</p>

              {/* Capabilities & Looking For */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-mono text-ambc-gold font-bold">
                    Key Capabilities & Assets:
                  </div>
                  <ul className="text-slate-300 space-y-0.5 list-disc pl-4 text-[11px]">
                    {(comp.capabilities || []).map((cap, cIdx) => (
                      <li key={cIdx}>{cap}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                  <div className="text-[10px] uppercase font-mono text-slate-400 font-bold">
                    Strategic Objective / Seeking:
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">{comp.lookingFor}</p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-3">
              <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                <Lock className="w-3 h-3 text-ambc-gold" />
                <span>Contact shielded under Chairman Gate</span>
              </div>

              <button
                onClick={() =>
                  setIntroModalTarget({
                    id: comp.id,
                    name: comp.name,
                    country: comp.country,
                    sector: comp.sector,
                  })
                }
                className="py-2.5 px-4 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Introduction</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompaniesView;
