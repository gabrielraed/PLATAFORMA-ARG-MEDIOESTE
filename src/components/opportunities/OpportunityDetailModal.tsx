import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { BusinessOpportunity } from '../../types';
import {
  X,
  ShieldCheck,
  Sparkles,
  MapPin,
  Building,
  Briefcase,
  FileText,
  Lock,
  Bookmark,
  CheckCircle2,
  AlertTriangle,
  FolderLock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface OpportunityDetailModalProps {
  opportunity: BusinessOpportunity | null;
  onClose: () => void;
}

export const OpportunityDetailModal: React.FC<OpportunityDetailModalProps> = ({
  opportunity,
  onClose,
}) => {
  const { t } = useLanguage();
  const {
    savedOpportunityIds,
    toggleSaveOpportunity,
    setIntroModalTarget,
    businessRooms,
    setActiveBusinessRoom,
  } = useApp();

  if (!opportunity) return null;

  const isSaved = savedOpportunityIds.includes(opportunity.id);
  const matchingRoom = businessRooms.find((br) => br.opportunityId === opportunity.id);

  const handleRequestIntro = () => {
    setIntroModalTarget({
      id: opportunity.companyName,
      name: opportunity.companyName,
      country: opportunity.country,
      sector: opportunity.sector,
      opportunityId: opportunity.id,
    });
  };

  const handleOpenRoom = () => {
    if (matchingRoom) {
      setActiveBusinessRoom(matchingRoom);
      onClose();
    } else {
      // If none yet, trigger intro request
      handleRequestIntro();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200 text-left">
      <div className="relative w-full max-w-5xl bg-[#091120] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#070D18]">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-wider uppercase text-ambc-gold font-bold">
              AGBIC Strategic Opportunity Dossier
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-xs text-slate-300 font-mono font-bold">{opportunity.id}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleSaveOpportunity(opportunity.id)}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-amber-500/20 text-ambc-gold border-ambc-gold'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
              title={isSaved ? 'Saved in Portfolio' : 'Save Dossier'}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          {/* Hero Banner Section */}
          <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950">
            <div className="h-64 sm:h-80 w-full relative overflow-hidden">
              <img
                src={opportunity.imageUrl}
                alt={opportunity.title}
                className="w-full h-full object-cover brightness-[0.7]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#091120] via-black/40 to-transparent" />

              {/* Status and Verification Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded bg-black/60 backdrop-blur border border-slate-700 text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-ambc-gold" />
                  {opportunity.location}
                </span>
                <span className="px-3 py-1 rounded bg-black/60 backdrop-blur border border-slate-700 text-xs font-semibold text-amber-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-ambc-gold" />
                  {opportunity.sector}
                </span>
                <span className="px-3 py-1 rounded bg-emerald-950/80 backdrop-blur border border-emerald-500/50 text-xs font-bold text-emerald-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  {opportunity.verificationStatus}
                </span>
              </div>

              {/* Match Score Badge */}
              {opportunity.aiMatchScore && (
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-lg bg-gold-gradient text-slate-950 font-extrabold text-xs flex items-center gap-1.5 shadow-lg">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{opportunity.aiMatchScore}% MANDATE FIT</span>
                </div>
              )}

              {/* Title & Relationship Type on bottom */}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="text-xs uppercase font-mono tracking-wider text-ambc-gold font-bold">
                  {opportunity.relationshipType}
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-wide mt-1">
                  {opportunity.title}
                </h1>
                <div className="text-xs text-slate-300 mt-1">
                  Sponsor: <strong className="text-white">{opportunity.companyName}</strong> ({opportunity.country})
                </div>
              </div>
            </div>
          </div>

          {/* CNV / Capital Markets Compliance Notice Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900 border border-amber-500/30 text-xs text-slate-300 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-ambc-gold shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="font-bold text-ambc-gold uppercase tracking-wider text-[11px]">
                Capital Markets & Regulatory Compliance Notice:
              </span>
              <p className="text-[11px] text-slate-300 leading-relaxed">
                This dossier represents a private strategic business development opportunity. It does
                NOT constitute an offer or public solicitation of securities. Certain transactions
                may be subject to applicable capital-market regulations and may require the
                participation of duly authorized professionals or intermediaries.
              </p>
            </div>
          </div>

          {/* Key Strategic Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400">Estimated Scale</div>
              <div className="text-lg sm:text-xl font-bold text-white mt-1">
                {opportunity.estimatedScale}
              </div>
              <div className="text-[10px] text-ambc-gold mt-0.5">{opportunity.relationshipType}</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400">Target Timeframe</div>
              <div className="text-lg sm:text-xl font-bold text-emerald-400 mt-1">
                {opportunity.timeline}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Commercial Target</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400">Confidentiality Tier</div>
              <div className="text-lg sm:text-xl font-bold text-purple-300 mt-1">
                {opportunity.confidentiality}
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">Bilateral NDA Governed</div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              <div className="text-[10px] uppercase font-mono text-slate-400">Regulatory Review</div>
              <div className="text-lg sm:text-xl font-bold text-amber-300 mt-1">
                Verified
              </div>
              <div className="text-[10px] text-slate-400 mt-0.5">
                {(opportunity.regulatoryStatus || 'STANDARD_BUSINESS_OPPORTUNITY').replace(/_/g, ' ')}
              </div>
            </div>
          </div>

          {/* Main Description & Objectives */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Detailed Description */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono border-b border-slate-800 pb-2">
                  Opportunity Scope & Overview
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {opportunity.description}
                </p>
              </div>

              {/* Concrete Business Objective */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono border-b border-slate-800 pb-2">
                  Concrete Business Objective
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {opportunity.businessObjective}
                </p>
              </div>

              {/* Required Partner Profile */}
              <div className="space-y-2">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono border-b border-slate-800 pb-2">
                  Required Counterparty Profile
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                  {opportunity.requiredPartner}
                </p>
              </div>

              {/* Recommended Kreston Advisory Suite */}
              {opportunity.recommendedServices && (
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 space-y-2 text-xs">
                  <div className="font-bold text-ambc-gold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4" />
                    <span>Recommended Professional Advisory (Castillo & Asociados – Kreston Argentina):</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {opportunity.recommendedServices.map((svc, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-200 text-xs font-semibold"
                      >
                        {svc}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Chairman Gate Action Box */}
            <div className="space-y-5">
              <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-[#0B1527] border border-ambc-gold/50 space-y-4 shadow-xl">
                <div className="text-xs font-bold uppercase tracking-wider text-ambc-gold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Chairman Gate™ Relationship Action</span>
                </div>

                <div className="space-y-2.5">
                  <button
                    onClick={handleRequestIntro}
                    className="w-full py-3 px-4 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                  >
                    <span>Request Introduction</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={handleOpenRoom}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 flex items-center justify-center gap-2"
                  >
                    <FolderLock className="w-3.5 h-3.5 text-ambc-gold" />
                    <span>
                      {matchingRoom ? 'Enter Business Room' : 'Request Business Room'}
                    </span>
                  </button>
                </div>

                <div className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Direct personal contact information is protected. All inquiries are screened by the
                  AGBIC Executive Deal Desk and cleared by Chairman H.E. Juan Carlos Moretti.
                </div>
              </div>

              {/* Sponsor Card */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
                <div className="font-semibold text-white">Verified Corporate Sponsor</div>
                <div className="text-slate-300 font-bold">{opportunity.companyName}</div>
                <div className="text-[11px] text-slate-400">{opportunity.location}</div>
                <div className="text-[10px] text-emerald-400 font-mono">
                  AGBIC Accreditation: Active Tier 1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityDetailModal;
