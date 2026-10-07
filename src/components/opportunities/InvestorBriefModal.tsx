import React, { useState } from 'react';
import { Opportunity } from '../../types';
import {
  X,
  Printer,
  Download,
  Sparkles,
  FileText,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  AlertTriangle,
} from 'lucide-react';
import { Logo } from '../common/Logo';

interface InvestorBriefModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export const InvestorBriefModal: React.FC<InvestorBriefModalProps> = ({
  opportunity,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);

  if (!opportunity) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const scale = opportunity.estimatedScale || opportunity.investmentRequired || (typeof opportunity.investmentAmount === 'number' ? `USD $${(opportunity.investmentAmount / 1000000).toFixed(0)}M` : opportunity.investmentAmount || 'USD $180M');
    const irr = opportunity.expectedReturn || opportunity.expectedIrr || opportunity.financials?.irr || '24.5%';
    const sum = opportunity.summary || opportunity.executiveSummary || opportunity.description;
    navigator.clipboard.writeText(
      `AMBC CONNECT - INVESTOR BRIEF\n${opportunity.title}\nCapital Required: ${scale}\nStructure: ${opportunity.investmentStructure || opportunity.structure || 'Strategic JV'}\nTarget IRR: ${irr}\n\nSummary:\n${sum}`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#091120] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col">
        {/* Controls Toolbar */}
        <div className="px-6 py-3.5 border-b border-slate-800 bg-[#070D18] flex items-center justify-between no-print">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-ambc-gold">
            <Sparkles className="w-4 h-4" />
            <span>AMBC AI Generated Institutional Investor Brief</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 border border-slate-700"
            >
              {copied ? 'Copied to Clipboard' : 'Copy Text'}
            </button>
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-ambc-gold hover:bg-amber-400 text-xs font-bold text-slate-950 flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Document Body */}
        <div
          id="investor-brief-print"
          className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-8 bg-[#091120] text-slate-200 text-left font-sans"
        >
          {/* Institutional Document Header */}
          <div className="border-b-2 border-ambc-gold/60 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <Logo size="md" showSubtitle={false} />
              <div className="text-[11px] font-mono tracking-widest uppercase text-slate-400 mt-2">
                Argentina – Middle East Business & Investment Platform
              </div>
            </div>
            <div className="text-right sm:text-right">
              <div className="text-xs font-mono text-ambc-gold font-bold">
                CONFIDENTIAL INVESTMENT MEMORANDUM
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Prepared on {new Date().toLocaleDateString()}
              </div>
              <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                Dossier Code: AMBC-{opportunity.id.toUpperCase()}-SYN
              </div>
            </div>
          </div>

          {/* Project Title & Classification */}
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-ambc-gold">
              Project Brief
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              {opportunity.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-2">
              <span>Sponsor: {opportunity.companyName}</span>
              <span>·</span>
              <span>Location: {opportunity.location}</span>
              <span>·</span>
              <span>Sector: {opportunity.sector}</span>
              <span>·</span>
              <span className="text-emerald-400 font-semibold">
                {opportunity.rigiEligible ? 'RIGI Eligible' : 'Standard'}
              </span>
            </div>
          </div>

          {/* Executive Dashboard Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900/90 border border-slate-800">
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Target Raise</div>
              <div className="text-lg font-bold text-white mt-0.5">
                {opportunity.estimatedScale || opportunity.investmentRequired || (typeof opportunity.investmentAmount === 'number' ? `USD $${(opportunity.investmentAmount / 1000000).toFixed(0)}M` : opportunity.investmentAmount || 'USD $180M')}
              </div>
              <div className="text-[10px] text-ambc-gold">{opportunity.investmentStructure || opportunity.structure || 'Strategic JV'}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Projected IRR</div>
              <div className="text-lg font-bold text-emerald-400 mt-0.5">
                {opportunity.expectedReturn || opportunity.expectedIrr || opportunity.financials?.irr || '24.5%'}
              </div>
              <div className="text-[10px] text-slate-400">USD Denominated</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">Stage & Horizon</div>
              <div className="text-lg font-bold text-white mt-0.5">{opportunity.stage || 'Expansion'}</div>
              <div className="text-[10px] text-slate-400">{opportunity.riskProfile || 'Moderate'}</div>
            </div>
            <div>
              <div className="text-[10px] uppercase font-mono text-slate-400">AI Match Index</div>
              <div className="text-lg font-bold text-ambc-gold mt-0.5">
                {opportunity.aiMatchScore || opportunity.matchScore || 96}% Mandate
              </div>
              <div className="text-[10px] text-slate-400">GCC Allocation</div>
            </div>
          </div>

          {/* Section 1: Executive Summary */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono">
              1. Executive Summary & Context
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {opportunity.summary || opportunity.executiveSummary || opportunity.description}
            </p>
          </div>

          {/* Section 2: Investment Thesis */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono">
              2. Core Investment Thesis & Competitive Moat
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {opportunity.investmentThesis || opportunity.businessObjective || opportunity.description}
            </p>
          </div>

          {/* Section 3: Capital Allocation Breakdown */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono">
              3. Proposed Use of Proceeds
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {(opportunity.useOfFunds || ['Brine Concentration & Extraction Facilities (45%)', 'Clean Power & Solar Cogeneration (25%)', 'Logistics Corridors & Port Delivery (20%)', 'Environmental Compliance & Working Capital (10%)']).map((fund, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-center gap-2"
                >
                  <span className="text-ambc-gold font-mono font-bold">0{idx + 1}.</span>
                  <span>{fund}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Key Strengths & Cross-Border Synergies */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono">
              4. Bilateral Synergies (Argentina ↔ GCC)
            </h2>
            <ul className="space-y-1.5 text-xs text-slate-300">
              {opportunity.matchReasons?.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-ambc-gold shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: Risk Factors & Mitigation */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-amber-400 font-mono">
              5. Key Identified Risks & Mitigation Measures
            </h2>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="font-semibold text-slate-200">
                  Macroeconomic & Currency Volatility:
                </div>
                <div className="text-slate-400 mt-0.5">
                  Mitigated via the Argentine RIGI regime providing 30-year contractual stability,
                  free forex repatriation of export receipts, and offshore escrow accounts in UAE/London.
                </div>
              </div>
              <div className="p-3 rounded bg-slate-900 border border-slate-800">
                <div className="font-semibold text-slate-200">
                  Execution & Infrastructure Timelines:
                </div>
                <div className="text-slate-400 mt-0.5">
                  Pre-qualified EPC contractors and locked long-term equipment procurement schedules.
                </div>
              </div>
            </div>
          </div>

          {/* Section 6: Recommended Questions for Management Meeting */}
          <div className="space-y-2">
            <h2 className="text-sm font-bold uppercase tracking-wider text-ambc-gold font-mono">
              6. Strategic Due Diligence Questions for CEO
            </h2>
            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-ambc-gold shrink-0 mt-0.5" />
                <span>
                  What are the specific milestones required to obtain final operational approval under the Argentine RIGI decree?
                </span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-ambc-gold shrink-0 mt-0.5" />
                <span>
                  What percentage of total output can be reserved for long-term bilateral offtake by Middle Eastern industrial partners?
                </span>
              </div>
              <div className="p-2 rounded bg-slate-900/60 border border-slate-800 flex items-start gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-ambc-gold shrink-0 mt-0.5" />
                <span>
                  Can the corporate governance structure support a dedicated board seat for a GCC sovereign or family office syndicate?
                </span>
              </div>
            </div>
          </div>

          {/* Legal Disclaimer Footer */}
          <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500 leading-relaxed font-mono">
            DISCLAIMER: This investor brief is generated automatically by AMBC Connect AI based on
            pre-vetted submissions by {opportunity.companyName}. It is intended exclusively for
            accredited institutional recipients and does not constitute a prospectus or securities offering.
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvestorBriefModal;
