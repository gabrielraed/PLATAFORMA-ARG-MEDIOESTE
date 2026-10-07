import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Briefcase,
  ShieldCheck,
  Building,
  CheckCircle2,
  FileCheck,
  DollarSign,
  ArrowRight,
  TrendingUp,
  Globe,
  Award,
} from 'lucide-react';

export const KrestonAdvisoryPublicView: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { setIntroModalTarget } = useApp();

  const services = [
    {
      title: 'Market-Entry & Entity Incorporation',
      desc: 'Turnkey legal incorporation of Argentine Sociedad Anónima (S.A.) or S.R.L., local fiscal representation, and statutory board registration.',
      tag: 'Soft-Landing',
    },
    {
      title: 'International Tax Structuring & Treaties',
      desc: 'Bilateral tax planning optimizing UAE-Argentina double taxation treaties, withholding tax exemptions, and offshore holding architecture in DIFC / ADGM.',
      tag: 'Fiscal Optimization',
    },
    {
      title: 'Argentine RIGI Statutory Dossier Filing',
      desc: 'Strategic preparation and representation for the 30-year statutory tax stability regime under National Law 27.742, securing 0% export withholdings and forex freedom.',
      tag: 'RIGI Incentive',
    },
    {
      title: 'M&A Financial & Legal Due Diligence',
      desc: 'Forensic audits, target valuation, concession title verification, labor contingency audits, and financial cash flow sensitivity modeling.',
      tag: 'Due Diligence',
    },
    {
      title: 'Statutory Audit & Financial Reporting',
      desc: 'Independent financial statement audit under Argentine GAAP and IFRS, certified by accredited public accountants for international parent companies.',
      tag: 'Statutory Compliance',
    },
    {
      title: 'Accounting Outsourcing & Local Payroll',
      desc: 'Complete outsourcing of corporate accounting, monthly tax filings (AFIP / ARCA), payroll administration, and local regulatory filings.',
      tag: 'Back-Office Outsourcing',
    },
  ];

  return (
    <div className="space-y-12 text-left animate-in fade-in duration-300 max-w-6xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
          Exclusive Professional Advisory Partner
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          Castillo & Asociados – Kreston Argentina
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          A leading audit, tax advisory, and business consulting member firm of{' '}
          <strong>Kreston Global</strong>. Delivering premier international market-entry, corporate
          structuring, and due diligence execution for GCC groups entering South America.
        </p>
      </div>

      {/* Trust & Network Credentials */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-xl font-bold font-mono text-ambc-gold">Kreston Global</div>
          <div className="text-[10px] text-slate-400">160+ Countries Network</div>
        </div>
        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-xl font-bold font-mono text-white">35+ Years</div>
          <div className="text-[10px] text-slate-400">Institutional Track Record</div>
        </div>
        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-xl font-bold font-mono text-emerald-400">RIGI Certified</div>
          <div className="text-[10px] text-slate-400">Major Investment Regime</div>
        </div>
        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800 space-y-1">
          <div className="text-xl font-bold font-mono text-white">Full-Service</div>
          <div className="text-[10px] text-slate-400">Tax, Legal, Audit, Payroll</div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((svc, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-[#091120] border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-wider text-ambc-gold px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                {svc.tag}
              </span>
              <h3 className="text-base font-serif font-bold text-white">{svc.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">{svc.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <button
                onClick={() =>
                  setIntroModalTarget({
                    id: 'KRESTON-ADVISORY',
                    name: `Market-Entry Advisory (${svc.title})`,
                    country: 'Argentina',
                    sector: 'Professional Services',
                  })
                }
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-ambc-gold border border-slate-700/80 text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Request Advisory Scoping</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact & Coordination Banner */}
      <div className="rounded-2xl border border-ambc-gold/40 bg-gradient-to-r from-slate-950 via-[#0B1527] to-slate-950 p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h3 className="text-lg font-serif font-bold text-white">
            Lead Partner: Dr. Gabriel Raed
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            Senior Managing Partner – International Advisory & Bilateral Cross-Border Practice
          </p>
          <div className="text-[11px] text-ambc-gold mt-1 font-mono">
            Castillo & Asociados – Kreston Argentina · Buenos Aires & Corporate Corridors
          </div>
        </div>

        <button
          onClick={() => setCurrentView('kreston-crm')}
          className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase shrink-0"
        >
          View Advisory Pipeline
        </button>
      </div>
    </div>
  );
};

export default KrestonAdvisoryPublicView;
