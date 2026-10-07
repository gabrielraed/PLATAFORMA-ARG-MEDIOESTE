import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Briefcase,
  Users2,
  FolderLock,
  FileCheck,
  TrendingUp,
} from 'lucide-react';

export const HowItWorksView: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { t } = useLanguage();

  const steps = [
    {
      step: '01',
      title: 'Join',
      category: 'Accreditation',
      desc: 'Corporate and institutional members apply for accredited standing. Verification of authorized representation and corporate identity.',
      icon: Users2,
    },
    {
      step: '02',
      title: 'Discover',
      category: 'Intelligence',
      desc: 'Explore pre-screened Argentine and GCC enterprises, verified capabilities, and strategic business opportunities across priority sectors.',
      icon: Briefcase,
    },
    {
      step: '03',
      title: 'Request Introduction',
      category: 'Chairman Gate™ Intake',
      desc: 'Submit a structured bilateral introduction request specifying business objectives, relationship type, estimated scale, and required advisory.',
      icon: ArrowRight,
    },
    {
      step: '04',
      title: 'AGBIC Qualifies',
      category: 'Executive Deal Desk',
      desc: 'The Executive Deal Desk screens commercial viability, mutual alignment, counterparty capacity, and regulatory compliance.',
      icon: ShieldCheck,
    },
    {
      step: '05',
      title: 'Chairman Gate Approves',
      category: 'Supreme Governance',
      desc: 'Council Chairman H.E. Juan Carlos Moretti reviews the strategic mandate. Approves, holds, or assigns senior executive liaison.',
      icon: CheckCircle2,
    },
    {
      step: '06',
      title: 'Introduction',
      category: 'Diplomatic Channel',
      desc: 'A formal bilateral video or in-person conference is facilitated under diplomatic decorum by the AGBIC Executive Secretariat.',
      icon: Users2,
    },
    {
      step: '07',
      title: 'Business Room',
      category: 'Confidential VDR',
      desc: 'A private virtual data room is provisioned with bilateral NDA, technical dossiers, scheduled milestones, and moderated messaging.',
      icon: FolderLock,
    },
    {
      step: '08',
      title: 'Execution',
      category: 'Commercial Agreement',
      desc: 'Parties formulate joint venture contracts, distribution agreements, or supply commitments with structured legal timelines.',
      icon: FileCheck,
    },
    {
      step: '09',
      title: 'Professional Support',
      category: 'Kreston Argentina Advisory',
      desc: 'Castillo & Asociados – Kreston Argentina delivers complete local market-entry, entity incorporation, tax structuring (RIGI), and audit.',
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-12 text-left animate-in fade-in duration-300 max-w-6xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
          The Controlled Business Development Framework
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          How It Works — The 9-Step Journey
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          “We don’t simply connect businesses. We qualify, structure and facilitate strategic relationships.”
          <br />
          <span className="text-amber-400 font-medium">
            No direct contact. No uncontrolled introductions. All strategic alliances pass through the AGBIC Deal Desk.
          </span>
        </p>
      </div>

      {/* Steps Timeline Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#091120] border border-slate-800 hover:border-amber-500/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-serif font-bold font-mono text-ambc-gold">
                    {item.step}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    {item.category}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-serif font-bold text-white">{item.title}</h3>

                <p className="text-xs text-slate-300 leading-relaxed font-sans">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 font-mono">
                Stage {idx + 1} of 9 · Chairman Gate Protocol
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA Box */}
      <div className="rounded-2xl border border-ambc-gold/40 bg-gradient-to-r from-slate-950 via-[#0B1527] to-slate-950 p-8 text-center space-y-4">
        <h3 className="text-xl font-serif font-bold text-white">
          Ready to initiate a qualified strategic introduction?
        </h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto">
          Explore our pre-screened business opportunities or request an executive relationship
          through the AGBIC Deal Desk.
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <button
            onClick={() => setCurrentView('opportunities')}
            className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase"
          >
            Explore Opportunities
          </button>
          <button
            onClick={() => setCurrentView('membership')}
            className="px-6 py-2.5 rounded-xl bg-slate-800 text-white font-semibold text-xs border border-slate-700"
          >
            Apply for Membership
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksView;
