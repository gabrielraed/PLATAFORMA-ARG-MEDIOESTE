import React, { useState } from 'react';
import { Shield, FileText, AlertTriangle, Lock } from 'lucide-react';

interface LegalViewProps {
  initialTab?: 'terms' | 'privacy' | 'disclaimer';
}

export const LegalView: React.FC<LegalViewProps> = ({ initialTab = 'disclaimer' }) => {
  const [tab, setTab] = useState<'terms' | 'privacy' | 'disclaimer'>(initialTab);

  return (
    <div className="space-y-8 text-left animate-in fade-in duration-300 max-w-4xl mx-auto py-4">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
          Institutional Governance & Compliance
        </span>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
          Legal Framework & Disclaimers
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-6 border-b border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setTab('disclaimer')}
          className={`pb-3 relative transition-colors ${
            tab === 'disclaimer' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Regulatory Disclaimer & Risk Disclosure
          {tab === 'disclaimer' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
          )}
        </button>

        <button
          onClick={() => setTab('terms')}
          className={`pb-3 relative transition-colors ${
            tab === 'terms' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Terms of Service
          {tab === 'terms' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
          )}
        </button>

        <button
          onClick={() => setTab('privacy')}
          className={`pb-3 relative transition-colors ${
            tab === 'privacy' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Confidentiality & Data Privacy
          {tab === 'privacy' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-8 rounded-2xl bg-[#091120] border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed space-y-6">
        {tab === 'disclaimer' && (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-ambc-gold font-bold flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 shrink-0" />
              <span>Mandatory Statutory Regulatory Notice</span>
            </div>

            <h3 className="text-base font-bold text-white">1. Non-Regulated Financial Intermediary Notice</h3>
            <p>
              AMBC Connect is an independent international technology and business platform. AMBC
              Connect is <strong>NOT</strong>:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300">
              <li>A registered securities broker-dealer or investment advisor;</li>
              <li>A commercial bank, trust company, or credit institution;</li>
              <li>An investment fund, venture capital fund, or collective investment scheme;</li>
              <li>A securities exchange or multilateral trading facility;</li>
              <li>A governmental, diplomatic, or consular entity of the Argentine Republic, the United Arab Emirates, the Kingdom of Saudi Arabia, the State of Qatar, or the State of Kuwait.</li>
            </ul>

            <h3 className="text-base font-bold text-white pt-2">2. Information Only & No Solicitation</h3>
            <p>
              Nothing contained on this platform constitutes an offer to sell, a solicitation of an
              offer to buy, or a recommendation of any security, derivative, private placement, or
              financial instrument. All project dossiers, geological models, and financial returns
              are provided by respective project sponsors and are subject to independent legal, tax,
              and accounting due diligence.
            </p>

            <h3 className="text-base font-bold text-white pt-2">3. Cross-Border Risk Disclosure</h3>
            <p>
              Cross-border capital investments in natural resources, infrastructure, and developing
              markets involve substantial risks, including currency fluctuation, geopolitical shifts,
              and commodity cycle volatility. Bilateral participants should seek professional counsel
              before entering into binding legal contracts.
            </p>
          </div>
        )}

        {tab === 'terms' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Terms of Platform Access</h3>
            <p>
              By accessing AMBC Connect, you affirm that you are an institutional, corporate, or
              accredited investor acting on behalf of a legitimate enterprise.
            </p>
            <p>
              1. <strong>Accreditation:</strong> Users must provide accurate corporate identity and
              beneficial ownership information. Misrepresentation of authority constitutes a breach
              of platform rules and immediate termination of access.
            </p>
            <p>
              2. <strong>Confidentiality:</strong> Non-public data rooms and financial models are
              protected under bilateral non-disclosure agreements enforceable in DIFC / ICC
              arbitration tribunals.
            </p>
            <p>
              3. <strong>Governing Law:</strong> Platform usage disputes shall be resolved in
              accordance with international commercial arbitration rules.
            </p>
          </div>
        )}

        {tab === 'privacy' && (
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white">Confidentiality & Privacy Standards</h3>
            <p>
              AMBC Connect adheres to the highest international data confidentiality standards,
              reflecting the sensitive nature of sovereign, family office, and corporate deal-making.
            </p>
            <p>
              1. <strong>Private Deal Rooms:</strong> Documents uploaded to Deal Rooms are stored
              with 256-bit AES encryption at rest and in transit. Access is monitored with forensic
              watermarks and immutable audit logs.
            </p>
            <p>
              2. <strong>Direct Contact Protection:</strong> Contact details (phone numbers, direct
              emails) are strictly shielded until both counterparties mutually accept an introduction
              facilitated by the AMBC Secretariat.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LegalView;
