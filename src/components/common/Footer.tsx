import React from 'react';
import { Logo } from './Logo';
import { useLanguage } from '../../context/LanguageContext';
import { Shield, ExternalLink, Globe } from 'lucide-react';

export const Footer: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#050912] border-t border-slate-800/80 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4 text-left">
            <Logo size="lg" showSubtitle={true} showArabicConcept={true} />
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm mt-3 font-sans">
              Argentina–GCC Connect is the private B2B strategic relationships and market-entry
              platform operated by the Argentina–GCC Business & Investment Council (AGBIC).
            </p>
            <div className="text-[11px] text-ambc-gold font-medium font-sans">
              “Connecting Companies, Markets & Strategic Partners”
            </div>
            <div className="text-[11px] text-slate-400 italic">
              Exclusive Advisory Partner: Castillo & Asociados – Kreston Argentina.
            </div>
          </div>

          {/* Core Modules */}
          <div className="text-left">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3 font-mono">
              Ecosystem
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('opportunities')}
                  className="hover:text-white transition-colors"
                >
                  Strategic Opportunities
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('companies')}
                  className="hover:text-white transition-colors"
                >
                  Accredited Companies
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('how-it-works')}
                  className="hover:text-white transition-colors"
                >
                  How It Works (9 Steps)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('chairman-dashboard')}
                  className="hover:text-white transition-colors text-ambc-gold font-semibold"
                >
                  Chairman Gate™ Console
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('deal-desk')}
                  className="hover:text-white transition-colors"
                >
                  Executive Deal Desk CRM
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('business-rooms')}
                  className="hover:text-white transition-colors"
                >
                  Confidential Business Rooms
                </button>
              </li>
            </ul>
          </div>

          {/* Professional Services */}
          <div className="text-left">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3 font-mono">
              Kreston Advisory
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => setCurrentView('kreston-advisory')}
                  className="hover:text-white transition-colors"
                >
                  Market-Entry & Setup S.A.
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('kreston-advisory')}
                  className="hover:text-white transition-colors"
                >
                  International Tax Structuring
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('kreston-advisory')}
                  className="hover:text-white transition-colors"
                >
                  RIGI Statutory Stability
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('kreston-advisory')}
                  className="hover:text-white transition-colors"
                >
                  M&A Due Diligence & Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('kreston-crm')}
                  className="text-ambc-gold hover:underline flex items-center gap-1 font-semibold"
                >
                  <span>Kreston Advisory CRM</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </li>
            </ul>
          </div>

          {/* Governance & Compliance */}
          <div className="text-left">
            <h4 className="text-white font-semibold uppercase tracking-wider text-xs mb-3 font-mono">
              Governance
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setCurrentView('about')}
                  className="hover:text-white transition-colors"
                >
                  About AGBIC Council
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('system-health')}
                  className="hover:text-white transition-colors text-emerald-400"
                >
                  System Health & Audit
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('membership')}
                  className="hover:text-white transition-colors"
                >
                  Membership Tiers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('legal-terms')}
                  className="hover:text-white transition-colors"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('legal-privacy')}
                  className="hover:text-white transition-colors"
                >
                  Confidentiality Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('legal-disclaimer')}
                  className="hover:text-white transition-colors"
                >
                  CNV Compliance Notice
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer Box */}
        <div className="mt-10 pt-6 border-t border-slate-800/80 text-left">
          <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed flex items-start gap-3">
            <Shield className="w-5 h-5 text-ambc-gold shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300">
                Statutory Governance & Capital Markets Disclaimer:{' '}
              </span>
              The Argentina–GCC Business & Investment Council (AGBIC) is an independent private-sector
              business initiative. It does not represent any government, ministry, embassy, or
              diplomatic mission unless expressly authorized in writing. AGBIC Connect operates as a
              controlled B2B relationship, market-entry, and joint-venture ecosystem under Chairman
              Gate™ protocols. It is NOT an open investment crowdfunding platform or a public
              securities offering portal, nor does it provide unauthorized securities investment
              advice. Professional services are provided independently by Castillo & Asociados –
              Kreston Argentina under separate client engagement agreements.
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Argentina–GCC Business & Investment Council (AGBIC). All
            international rights reserved. Buenos Aires · Dubai · Riyadh.
          </div>
          <div className="flex items-center gap-6">
            <span className="text-slate-400">Chairman Gate™ Certified</span>
            <span className="text-ambc-gold">Castillo & Asociados – Kreston Argentina Partner</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
