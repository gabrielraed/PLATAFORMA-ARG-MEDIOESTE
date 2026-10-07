import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Search,
  Compass,
  Briefcase,
  Building2,
  Calendar,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface SearchModalProps {
  setCurrentView: (view: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ setCurrentView }) => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    opportunities,
    investors,
    companies,
    events,
    reports,
    setSelectedOpportunity,
  } = useApp();

  const [query, setQuery] = useState('');

  // Handle Cmd+K / Ctrl+K keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setIsSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredOpportunities = opportunities.filter(
    (o) =>
      o.title.toLowerCase().includes(q) ||
      o.sector.toLowerCase().includes(q) ||
      o.location.toLowerCase().includes(q) ||
      o.companyName.toLowerCase().includes(q)
  );

  const filteredInvestors = investors.filter(
    (i) =>
      i.name.toLowerCase().includes(q) ||
      i.organization.toLowerCase().includes(q) ||
      i.country.toLowerCase().includes(q) ||
      i.preferredSectors.some((s) => s.toLowerCase().includes(q))
  );

  const filteredCompanies = companies.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      (c.industry || c.sector || '').toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q)
  );

  const filteredReports = reports.filter(
    (r) =>
      r.title.toLowerCase().includes(q) ||
      r.sector.toLowerCase().includes(q) ||
      r.summary.toLowerCase().includes(q)
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-start justify-center pt-20 p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091120] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden text-left">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3 bg-[#070D18]">
          <Search className="w-5 h-5 text-ambc-gold shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects, investors, companies, minerals, RIGI, events..."
            className="flex-1 bg-transparent text-sm text-white focus:outline-none placeholder-slate-500"
          />
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-96 overflow-y-auto p-4 space-y-4">
          {/* Opportunities Category */}
          {filteredOpportunities.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ambc-gold px-2 mb-1 flex items-center gap-1.5">
                <Compass className="w-3.5 h-3.5" />
                <span>Investment Opportunities ({filteredOpportunities.length})</span>
              </div>
              <div className="space-y-1">
                {filteredOpportunities.slice(0, 3).map((opp) => (
                  <button
                    key={opp.id}
                    onClick={() => {
                      setSelectedOpportunity(opp);
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-ambc-gold">
                        {opp.title}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {opp.estimatedScale || opp.investmentRequired || (typeof opp.investmentAmount === 'number' ? `USD $${(opp.investmentAmount / 1000000).toFixed(0)}M` : opp.investmentAmount || 'USD $180M')} · {opp.sector} ·{' '}
                        {opp.location}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-ambc-gold transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Investors Category */}
          {filteredInvestors.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ambc-gold px-2 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" />
                <span>Investors & Family Offices ({filteredInvestors.length})</span>
              </div>
              <div className="space-y-1">
                {filteredInvestors.slice(0, 3).map((inv) => (
                  <button
                    key={inv.id}
                    onClick={() => {
                      setCurrentView('investors');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-ambc-gold">
                        {inv.organization}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {inv.city}, {inv.country} · Ticket: {inv.ticketRange}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-ambc-gold" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Companies Category */}
          {filteredCompanies.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ambc-gold px-2 mb-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>Enterprises ({filteredCompanies.length})</span>
              </div>
              <div className="space-y-1">
                {filteredCompanies.slice(0, 2).map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => {
                      setCurrentView('companies');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-ambc-gold">
                        {comp.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {comp.city}, {comp.country} · {comp.industry || comp.sector}
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-ambc-gold" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Reports Category */}
          {filteredReports.length > 0 && (
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-ambc-gold px-2 mb-1 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Intelligence Briefings ({filteredReports.length})</span>
              </div>
              <div className="space-y-1">
                {filteredReports.slice(0, 2).map((rep) => (
                  <button
                    key={rep.id}
                    onClick={() => {
                      setCurrentView('intelligence');
                      setIsSearchModalOpen(false);
                    }}
                    className="w-full p-2.5 rounded-lg bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 flex items-center justify-between text-left transition-colors group"
                  >
                    <div>
                      <div className="text-xs font-bold text-white group-hover:text-ambc-gold">
                        {rep.title}
                      </div>
                      <div className="text-[11px] text-slate-400">{rep.readTime} · {rep.sector}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-ambc-gold" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredOpportunities.length === 0 &&
            filteredInvestors.length === 0 &&
            filteredCompanies.length === 0 &&
            filteredReports.length === 0 && (
              <div className="py-8 text-center text-xs text-slate-400">
                No matching results found for "{query}". Try searching "Lithium", "Dubai", "RIGI",
                or "Agro".
              </div>
            )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2.5 border-t border-slate-800 bg-[#070D18] flex items-center justify-between text-[11px] text-slate-400">
          <span>Search across 100% verified institutional data</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
