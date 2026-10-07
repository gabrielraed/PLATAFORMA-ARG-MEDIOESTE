import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ProfessionalServicesLead, ProfessionalServiceType } from '../../types';
import {
  Briefcase,
  DollarSign,
  TrendingUp,
  Building,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  FileText,
  UserCheck,
  ChevronRight,
  Shield,
  Plus,
} from 'lucide-react';

export const KrestonCrmView: React.FC = () => {
  const { krestonLeads, updateKrestonLeadStage, createProfessionalServicesLead } = useApp();

  const stages: ProfessionalServicesLead['stage'][] = [
    'LEAD',
    'QUALIFIED',
    'PROPOSAL',
    'NEGOTIATION',
    'WON',
  ];

  const [selectedLead, setSelectedLead] = useState<ProfessionalServicesLead | null>(null);
  const [showNewLeadModal, setShowNewLeadModal] = useState(false);

  // Form state for creating new lead
  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientCountry, setClientCountry] = useState<any>('United Arab Emirates');
  const [service, setService] = useState<ProfessionalServiceType>('Market Entry');
  const [estimatedFee, setEstimatedFee] = useState<number>(50000);
  const [assignedProfessional, setAssignedProfessional] = useState(
    'Dr. Gabriel Raed (Managing Partner, Castillo & Asociados)'
  );

  const totalPipelineFee = krestonLeads.reduce((acc, l) => acc + l.estimatedFeeUsd, 0);
  const totalWonRevenue = krestonLeads.reduce((acc, l) => acc + (l.revenueGenerated || 0), 0);
  const wonCount = krestonLeads.filter((l) => l.stage === 'WON').length;
  const winRate = Math.round((wonCount / (krestonLeads.length || 1)) * 100);

  const handleCreateLead = (e: React.FormEvent) => {
    e.preventDefault();
    createProfessionalServicesLead({
      clientName,
      clientCompany,
      clientCountry,
      service,
      estimatedFeeUsd: Number(estimatedFee),
      probability: 70,
      assignedProfessional,
      stage: 'QUALIFIED',
      nextAction: 'Initiate bilateral tax scoping and proposal drafting.',
      proposalDraft: `Bespoke engagement for ${service}: entity registration, international tax structuring, and compliance for ${clientCompany}.`,
    });
    setShowNewLeadModal(false);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              Exclusive Advisory Partner
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
              CASTILLO & ASOCIADOS – KRESTON ARGENTINA
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Professional Services & Market-Entry CRM
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Commercial conversion engine tracking high-value advisory engagements generated through
            AGBIC Connect: international tax structuring, corporate incorporation, audit, and M&A.
          </p>
        </div>

        <button
          onClick={() => setShowNewLeadModal(true)}
          className="px-4 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow flex items-center gap-1.5 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New Advisory Lead</span>
        </button>
      </div>

      {/* Attribution Formula Box */}
      <div className="p-4 rounded-xl bg-[#0B1528] border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-ambc-gold flex items-center justify-center text-ambc-gold font-bold">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-white uppercase tracking-wider text-[11px]">
              Commercial Value Chain Attribution
            </div>
            <div className="text-slate-300 font-mono text-[11px] mt-0.5">
              AGBIC CONNECT → QUALIFIED INTRODUCTION → KRESTON SERVICE → CONTRACTED REVENUE
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <span className="text-slate-400">
            Source: <strong className="text-ambc-gold">AGBIC CONNECT</strong> (100% Attributed)
          </span>
        </div>
      </div>

      {/* CRM Performance Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Active Advisory Leads</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {krestonLeads.length} Mandates
          </div>
          <div className="text-[10px] text-ambc-gold">Market-Entry & Tax</div>
        </div>

        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Total Advisory Pipeline</div>
          <div className="text-xl font-bold font-mono text-amber-300 mt-0.5">
            USD ${(totalPipelineFee / 1000).toFixed(0)}K
          </div>
          <div className="text-[10px] text-slate-400">Estimated Engagement Fees</div>
        </div>

        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Contracted Revenue (Won)</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
            USD ${(totalWonRevenue / 1000).toFixed(0)}K
          </div>
          <div className="text-[10px] text-emerald-400">{wonCount} Contracts Closed</div>
        </div>

        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Advisory Win Rate</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">{winRate}%</div>
          <div className="text-[10px] text-slate-400">High Trust Bilateral Corridor</div>
        </div>
      </div>

      {/* Kanban Pipeline Board */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1250px]">
          {stages.map((stage) => {
            const leadsInStage = krestonLeads.filter((l) => l.stage === stage);
            const stageFeeTotal = leadsInStage.reduce((acc, l) => acc + l.estimatedFeeUsd, 0);

            return (
              <div
                key={stage}
                className="w-72 bg-[#091120] border border-slate-800 rounded-2xl flex flex-col shrink-0 overflow-hidden"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-800 bg-[#070D18] flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    {stage}
                  </span>
                  <div className="text-[10px] font-mono text-ambc-gold font-bold">
                    ${(stageFeeTotal / 1000).toFixed(0)}K ({leadsInStage.length})
                  </div>
                </div>

                {/* Cards in column */}
                <div className="p-3 flex-1 space-y-3 min-h-[350px]">
                  {leadsInStage.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => setSelectedLead(lead)}
                      className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all text-xs space-y-2.5 shadow-md"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-ambc-gold font-bold">{lead.id}</span>
                        <span className="text-emerald-400 font-bold">
                          USD ${(lead.estimatedFeeUsd / 1000).toFixed(0)}K
                        </span>
                      </div>

                      <div className="font-bold text-white truncate leading-snug">
                        {lead.clientCompany}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {lead.clientName} · {lead.clientCountry}
                      </div>

                      <div className="px-2 py-1 rounded bg-slate-950 border border-slate-800 text-[10px] font-mono text-ambc-gold font-semibold truncate">
                        Service: {lead.service}
                      </div>

                      <p className="text-[10px] text-slate-300 line-clamp-2">
                        Next: {lead.nextAction}
                      </p>

                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500 font-mono">Prob: {lead.probability}%</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const nextIdx = stages.indexOf(stage) + 1;
                            if (nextIdx < stages.length) {
                              updateKrestonLeadStage(lead.id, stages[nextIdx]);
                            }
                          }}
                          className="text-ambc-gold hover:underline flex items-center gap-0.5 font-bold"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {leadsInStage.length === 0 && (
                    <div className="h-28 border border-dashed border-slate-800/80 rounded-xl flex items-center justify-center text-[11px] text-slate-600 font-mono">
                      No mandates
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lead Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#091120] border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-ambc-gold uppercase font-bold">
                  Castillo & Asociados – Kreston Argentina
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                  Advisory Dossier: {selectedLead.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">Client / Counterpart</div>
                <div className="font-bold text-white mt-0.5">{selectedLead.clientCompany}</div>
                <div className="text-[11px] text-slate-400">
                  {selectedLead.clientName} ({selectedLead.clientCountry})
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">Service Scope</div>
                <div className="font-bold text-ambc-gold mt-0.5">{selectedLead.service}</div>
                <div className="text-[11px] text-emerald-400 font-mono font-bold">
                  Fee: USD ${(selectedLead.estimatedFeeUsd / 1000).toFixed(0)}K (Prob: {selectedLead.probability}%)
                </div>
              </div>
            </div>

            {selectedLead.proposalDraft && (
              <div className="space-y-1 text-xs">
                <div className="font-semibold text-slate-300">Proposal Summary & Deliverables:</div>
                <p className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                  {selectedLead.proposalDraft}
                </p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
              <div className="text-slate-400">
                Assigned Lead Partner:{' '}
                <strong className="text-white">{selectedLead.assignedProfessional}</strong>
              </div>
              <div className="text-slate-400">
                Next Strategic Action: <strong className="text-ambc-gold">{selectedLead.nextAction}</strong>
              </div>
            </div>

            {/* Advance Controls */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono">Source: AGBIC CONNECT</span>

              <div className="flex items-center gap-2">
                {selectedLead.stage !== 'WON' && (
                  <button
                    onClick={() => {
                      updateKrestonLeadStage(selectedLead.id, 'WON');
                      setSelectedLead(null);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold"
                  >
                    Mark as Won (USD ${(selectedLead.estimatedFeeUsd / 1000).toFixed(0)}K)
                  </button>
                )}
                <button
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Lead Modal */}
      {showNewLeadModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#091120] border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-base font-bold text-white">Create Kreston Advisory Mandate</h3>
              <button
                onClick={() => setShowNewLeadModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateLead} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Client Contact Name</label>
                <input
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Tariq Al-Mansoor"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Client Company / Group</label>
                <input
                  type="text"
                  required
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="e.g. Emirates Industrial Holdings"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Service Scope</label>
                <select
                  value={service}
                  onChange={(e) => setService(e.target.value as ProfessionalServiceType)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="Market Entry">Market Entry & Incorporation</option>
                  <option value="Tax Advisory">Tax Advisory & Double Tax Treaty</option>
                  <option value="Accounting & Outsourcing">Accounting & Outsourcing</option>
                  <option value="Due Diligence">Due Diligence & Valuation</option>
                  <option value="Corporate Structuring">Corporate Structuring & Holding Setup</option>
                  <option value="M&A Advisory">M&A Advisory</option>
                  <option value="Statutory Audit">Statutory Audit</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Estimated Advisory Fee (USD)</label>
                <input
                  type="number"
                  required
                  value={estimatedFee}
                  onChange={(e) => setEstimatedFee(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewLeadModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-gold-gradient text-slate-950 font-bold uppercase"
                >
                  Register Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KrestonCrmView;
