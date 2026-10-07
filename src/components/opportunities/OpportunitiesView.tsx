import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { BusinessOpportunity, Sector, RelationshipType } from '../../types';
import {
  Search,
  MapPin,
  Building,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Bookmark,
  ArrowRight,
  FolderLock,
  RotateCcw,
  AlertTriangle,
} from 'lucide-react';

export const OpportunitiesView: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { t } = useLanguage();
  const {
    opportunities,
    setSelectedOpportunity,
    setIntroModalTarget,
    savedOpportunityIds,
    toggleSaveOpportunity,
    businessRooms,
    setActiveBusinessRoom,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSector, setSelectedSector] = useState<string>('All');
  const [selectedRelationship, setSelectedRelationship] = useState<string>('All');

  const sectors = [
    'All',
    'Lithium & Battery Value Chain',
    'Oil & Gas Midstream',
    'Agribusiness & Commodities',
    'Energy & Cleantech',
    'Technology & Software',
    'Mining & Critical Minerals',
  ];

  const relationshipTypes = [
    'All',
    'Joint Venture',
    'Strategic Partnership',
    'Distribution & Representation',
    'Infrastructure Partnership',
    'Licensing & Franchising',
    'Commercial Agreement',
  ];

  const filtered = opportunities.filter((opp) => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match =
        opp.title.toLowerCase().includes(q) ||
        opp.location.toLowerCase().includes(q) ||
        opp.sector.toLowerCase().includes(q) ||
        opp.companyName.toLowerCase().includes(q) ||
        (opp.businessObjective || opp.description || '').toLowerCase().includes(q);
      if (!match) return false;
    }

    if (selectedSector !== 'All' && opp.sector !== selectedSector) return false;
    if (selectedRelationship !== 'All' && opp.relationshipType !== selectedRelationship)
      return false;

    return true;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedSector('All');
    setSelectedRelationship('All');
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Controlled Bilateral Pipeline
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Strategic Business Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Pre-screened commercial joint ventures, distributions, and industrial partnerships
            between Argentina and the GCC. All introductions pass through Chairman Gate™.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">
            Showing <strong className="text-white">{filtered.length}</strong> of{' '}
            <strong className="text-ambc-gold">{opportunities.length}</strong> Strategic Opportunities
          </span>
        </div>
      </div>

      {/* CNV / Capital Markets Compliance Banner */}
      <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-slate-300 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-ambc-gold shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <span className="font-bold text-ambc-gold uppercase tracking-wider text-[11px]">
            Institutional Compliance Notice:
          </span>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            This platform facilitates business relationships, market entry, and strategic alliances.
            It does NOT constitute an open investment crowdfunding platform or a public offering of
            securities. Certain transactions may be subject to applicable capital-market regulations
            and may require the participation of duly authorized professionals or intermediaries.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-xl bg-[#091120] border border-slate-800 space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Search Query */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by mineral, sector, province, or strategic objective..."
              className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
            />
          </div>

          {/* Sector Select */}
          <div>
            <select
              value={selectedSector}
              onChange={(e) => setSelectedSector(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
            >
              {sectors.map((s) => (
                <option key={s} value={s}>
                  Sector: {s}
                </option>
              ))}
            </select>
          </div>

          {/* Relationship Select */}
          <div>
            <select
              value={selectedRelationship}
              onChange={(e) => setSelectedRelationship(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
            >
              {relationshipTypes.map((rt) => (
                <option key={rt} value={rt}>
                  Relationship: {rt}
                </option>
              ))}
            </select>
          </div>
        </div>

        {(searchQuery || selectedSector !== 'All' || selectedRelationship !== 'All') && (
          <div className="pt-2 border-t border-slate-800 flex justify-end">
            <button
              onClick={resetFilters}
              className="text-xs text-slate-400 hover:text-ambc-gold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((opp) => {
          const isSaved = savedOpportunityIds.includes(opp.id);
          const room = businessRooms.find((br) => br.opportunityId === opp.id);

          return (
            <div
              key={opp.id}
              className="rounded-2xl border border-slate-800 bg-[#091120] hover:border-amber-500/40 transition-all shadow-xl overflow-hidden flex flex-col group"
            >
              {/* Image Preview Header */}
              <div className="h-48 relative overflow-hidden bg-slate-950">
                <img
                  src={opp.imageUrl}
                  alt={opp.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#091120] via-black/30 to-transparent" />

                {/* Floating Tags */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded bg-black/70 backdrop-blur border border-slate-700 text-[10px] font-semibold text-white">
                    {opp.relationshipType}
                  </span>
                </div>

                {/* Match Score & Bookmark */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {opp.aiMatchScore && (
                    <span className="px-2 py-0.5 rounded bg-gold-gradient text-slate-950 font-bold text-[10px] flex items-center gap-1 shadow">
                      <Sparkles className="w-3 h-3" />
                      <span>{opp.aiMatchScore}%</span>
                    </span>
                  )}
                  <button
                    onClick={() => toggleSaveOpportunity(opp.id)}
                    className={`p-1.5 rounded bg-black/60 backdrop-blur border border-slate-700 transition-colors ${
                      isSaved ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Title & Location on Image Bottom */}
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-ambc-gold" />
                    <span>{opp.location}</span>
                  </div>
                  <h3 className="text-base font-serif font-bold text-white leading-snug mt-0.5 truncate">
                    {opp.title}
                  </h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono text-ambc-gold">
                    <span>Scale: {opp.estimatedScale}</span>
                    <span className="text-slate-400">{opp.timeline}</span>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed font-sans">
                    {opp.businessObjective}
                  </p>

                  <div className="text-[11px] text-slate-400 pt-1">
                    Sponsor: <strong className="text-slate-200">{opp.companyName}</strong>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={() => setSelectedOpportunity(opp)}
                    className="w-full py-2.5 px-3 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-1.5"
                  >
                    <span>View Strategic Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setIntroModalTarget({
                          id: opp.companyName,
                          name: opp.companyName,
                          country: opp.country,
                          sector: opp.sector,
                          opportunityId: opp.id,
                        })
                      }
                      className="flex-1 py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700/80 text-[11px] font-semibold text-center"
                    >
                      Request Introduction
                    </button>

                    {room && (
                      <button
                        onClick={() => setActiveBusinessRoom(room)}
                        className="py-1.5 px-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-ambc-gold border border-slate-700/80 text-[11px] font-semibold flex items-center gap-1"
                        title="Enter Confidential Business Room"
                      >
                        <FolderLock className="w-3.5 h-3.5" />
                        <span>Room</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OpportunitiesView;
