import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Send,
  ShieldCheck,
  Building,
  CheckCircle2,
  Lock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import {
  RelationshipType,
  ProfessionalServiceType,
  ConfidentialityLevel,
  PriorityLevel,
  Country,
  Sector,
} from '../../types';

export const RequestIntroModal: React.FC = () => {
  const { introModalTarget, setIntroModalTarget, submitIntroductionRequest } = useApp();
  const { currentUser } = useAuth();
  const { isRtl } = useLanguage();

  const [relationshipType, setRelationshipType] = useState<RelationshipType>('Joint Venture');
  const [businessObjective, setBusinessObjective] = useState(
    'Formulate a strategic cross-border partnership to co-develop production capacity and secure long-term commercial distribution.'
  );
  const [estimatedSize, setEstimatedSize] = useState('USD $25M - $50M Project Scale');
  const [timeframe, setTimeframe] = useState('Next 60 Days');
  const [ndaRequired, setNdaRequired] = useState(true);
  const [confidentiality, setConfidentiality] = useState<ConfidentialityLevel>('Strictly Confidential');
  const [priority, setPriority] = useState<PriorityLevel>('High');
  const [additionalComments, setAdditionalComments] = useState(
    'Our board has completed internal screening and requests formal diplomatic facilitation by the AGBIC Deal Desk.'
  );

  const [selectedServices, setSelectedServices] = useState<ProfessionalServiceType[]>([
    'Market Entry',
    'Tax Advisory',
    'Corporate Structuring',
  ]);

  const [submittedId, setSubmittedId] = useState<string | null>(null);

  if (!introModalTarget) return null;

  const allRelationshipTypes: RelationshipType[] = [
    'Strategic Partnership',
    'Joint Venture',
    'Distribution & Representation',
    'Commercial Agreement',
    'Supplier Relationship',
    'Export / Import',
    'Manufacturing Partnership',
    'Licensing & Franchising',
    'Market Entry & Soft-Landing',
    'M&A / Corporate Transaction',
    'Technology Partnership',
    'Infrastructure Partnership',
    'Professional Services',
    'Other Strategic Opportunity',
  ];

  const allServices: ProfessionalServiceType[] = [
    'Market Entry',
    'Company Incorporation',
    'Tax Advisory',
    'Accounting & Outsourcing',
    'Payroll & HR',
    'Due Diligence',
    'Corporate Structuring',
    'KYC & Compliance',
    'Financial Analysis',
    'Business Valuation',
    'M&A Advisory',
    'Legal Coordination',
    'Statutory Audit',
    'International Tax Structuring',
    'Transfer Pricing',
  ];

  const toggleService = (svc: ProfessionalServiceType) => {
    setSelectedServices((prev) =>
      prev.includes(svc) ? prev.filter((s) => s !== svc) : [...prev, svc]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const id = submitIntroductionRequest({
      opportunityId: introModalTarget.opportunityId,
      requesterId: currentUser?.id || 'usr_guest',
      requesterName: currentUser?.name || 'Accredited Representative',
      requesterCompany: currentUser?.companyName || 'Member Enterprise',
      requesterCountry: currentUser?.country || 'United Arab Emirates',
      targetCompanyId: introModalTarget.id,
      targetCompanyName: introModalTarget.name,
      targetCountry: introModalTarget.country || 'Argentina',
      sector: (introModalTarget.sector || 'Energy & Cleantech') as Sector,
      relationshipType,
      businessObjective,
      estimatedBusinessSize: estimatedSize,
      timeframe,
      requiredServices: selectedServices,
      additionalComments,
      ndaRequired,
      confidentiality,
      priority,
      chairmanNotes: 'Entered Chairman Gate screening queue.',
    });

    setSubmittedId(id);
    setTimeout(() => {
      setSubmittedId(null);
      setIntroModalTarget(null);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-[#091120] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 text-left">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-ambc-gold font-bold">
                CHAIRMAN GATE™
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-xs text-slate-400 font-mono">
                AGBIC Executive Deal Desk
              </span>
            </div>
            <h3 className="text-lg font-serif font-bold text-white mt-0.5">
              Request Strategic Bilateral Introduction
            </h3>
          </div>
          <button
            onClick={() => setIntroModalTarget(null)}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedId ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-2xl font-bold">
              ✓
            </div>
            <h4 className="text-lg font-serif font-bold text-white">
              Introduction Request Dispatched
            </h4>
            <div className="text-xs font-mono text-ambc-gold font-bold">
              Tracking ID: {submittedId}
            </div>
            <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been submitted to the AGBIC Executive Deal Desk. Chairman H.E. Juan Carlos
              Moretti and assigned advisors will screen the request under Chairman Gate protocols.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1">
            {/* Target Card Banner */}
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase font-mono text-slate-400">Target Counterpart:</span>
                <div className="font-bold text-white text-sm">{introModalTarget.name}</div>
                <div className="text-[11px] text-slate-400">
                  {introModalTarget.country} · {introModalTarget.sector}
                </div>
              </div>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-ambc-gold font-mono text-[10px] font-bold">
                NO DIRECT CONTACT EXPOSURE
              </span>
            </div>

            {/* Relationship Type & Estimated Scale */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Type of Strategic Relationship
                </label>
                <select
                  value={relationshipType}
                  onChange={(e) => setRelationshipType(e.target.value as RelationshipType)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                >
                  {allRelationshipTypes.map((rt) => (
                    <option key={rt} value={rt}>
                      {rt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">
                  Estimated Commercial Scale
                </label>
                <input
                  type="text"
                  value={estimatedSize}
                  onChange={(e) => setEstimatedSize(e.target.value)}
                  placeholder="e.g. USD $20M Project Scale or Volume"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                />
              </div>
            </div>

            {/* Timeframe & Priority */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                >
                  <option value="Immediate (Next 30 Days)">Immediate (Next 30 Days)</option>
                  <option value="Next 60 Days">Next 60 Days</option>
                  <option value="Q1/Q2 2027">Q1/Q2 2027</option>
                  <option value="Strategic Scoping (Flexible)">Strategic Scoping (Flexible)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Confidentiality Tier</label>
                <select
                  value={confidentiality}
                  onChange={(e) => setConfidentiality(e.target.value as ConfidentialityLevel)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs"
                >
                  <option value="Standard">Standard Corporate</option>
                  <option value="Restricted">Restricted Executive</option>
                  <option value="Strictly Confidential">Strictly Confidential (Bilateral NDA)</option>
                  <option value="Chairman Eyes Only">Chairman Eyes Only</option>
                </select>
              </div>
            </div>

            {/* Business Objective */}
            <div className="text-xs">
              <label className="block text-slate-300 font-semibold mb-1">
                Concrete Business Objective & Value Proposition
              </label>
              <textarea
                rows={3}
                value={businessObjective}
                onChange={(e) => setBusinessObjective(e.target.value)}
                required
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs resize-none"
              />
            </div>

            {/* Required Professional Services (Kreston Conversion Engine) */}
            <div className="space-y-1.5 text-xs">
              <label className="block text-slate-300 font-semibold">
                Required Advisory Services (Castillo & Asociados – Kreston Argentina):
              </label>
              <div className="flex flex-wrap gap-1.5">
                {allServices.map((svc) => (
                  <button
                    key={svc}
                    type="button"
                    onClick={() => toggleService(svc)}
                    className={`px-2.5 py-1 rounded text-[11px] font-medium border transition-colors ${
                      selectedServices.includes(svc)
                        ? 'bg-amber-500/20 text-ambc-gold border-ambc-gold'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    {svc}
                  </button>
                ))}
              </div>
            </div>

            {/* Additional Comments */}
            <div className="text-xs">
              <label className="block text-slate-300 font-semibold mb-1">
                Notes for AGBIC Deal Desk & Chairman
              </label>
              <textarea
                rows={2}
                value={additionalComments}
                onChange={(e) => setAdditionalComments(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs resize-none"
              />
            </div>

            {/* Notice */}
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[10px] text-slate-400 leading-relaxed">
              <strong>Chairman Gate Policy:</strong> This request will enter the AGBIC Deal Desk
              status workflow. Upon Chairman clearance, a private Business Room with bilateral NDA and
              Castillo & Asociados legal coordination will be provisioned.
            </div>

            {/* Submit */}
            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIntroModalTarget(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit to Chairman Gate</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default RequestIntroModal;
