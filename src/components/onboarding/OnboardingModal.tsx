import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { UserRole, Sector, InvestmentStructure, Country } from '../../types';
import { X, CheckCircle, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Logo } from '../common/Logo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, updateUser } = useAuth();
  const [step, setStep] = useState(1);

  const [role, setRole] = useState<UserRole>(currentUser?.role || 'FAMILY_OFFICE');
  const [country, setCountry] = useState<Country>((currentUser?.country as Country) || 'United Arab Emirates');
  const [city, setCity] = useState(currentUser?.city || 'Dubai');
  const [company, setCompany] = useState(currentUser?.companyName || 'Al-Mansoor Family Office');
  const [title, setTitle] = useState(currentUser?.title || 'Managing Director');
  const [ticketMax, setTicketMax] = useState<number>(100000000);
  const [selectedSectors, setSelectedSectors] = useState<Sector[]>([
    'Mining',
    'Lithium',
    'Energy',
    'Agribusiness',
  ]);
  const [structures, setStructures] = useState<InvestmentStructure[]>([
    'Joint Venture',
    'Project Finance',
    'Equity',
  ]);

  if (!isOpen) return null;

  const allSectors: Sector[] = [
    'Mining',
    'Lithium',
    'Copper',
    'Energy',
    'Oil & Gas',
    'Agribusiness',
    'Food & Beverages',
    'Infrastructure',
    'Renewable Energy',
    'Technology & AI',
    'Fintech',
    'Logistics & Ports',
  ];

  const allStructures: InvestmentStructure[] = [
    'Equity',
    'Joint Venture',
    'Project Finance',
    'Debt / Credit',
    'Strategic Partnership',
    'Offtake Agreement',
  ];

  const handleFinish = () => {
    updateUser({
      role,
      country,
      city,
      companyName: company,
      title,
      investmentTicketMax: ticketMax,
      sectorsOfInterest: selectedSectors,
      onboardingCompleted: true,
    });
    onClose();
  };

  const toggleSector = (sec: Sector) => {
    setSelectedSectors((prev) =>
      prev.includes(sec) ? prev.filter((s) => s !== sec) : [...prev, sec]
    );
  };

  const toggleStructure = (st: InvestmentStructure) => {
    setStructures((prev) => (prev.includes(st) ? prev.filter((s) => s !== st) : [...prev, st]));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200 text-left">
      <div className="relative w-full max-w-2xl bg-[#091120] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <Logo size="sm" showSubtitle={false} />
          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-between text-xs border-b border-slate-800/80 pb-3">
          <span className="font-mono text-ambc-gold font-bold">
            Step {step} of 3: {step === 1 ? 'Organization Profile' : step === 2 ? 'Capital Mandate & Ticket' : 'Strategic Sectors & Structures'}
          </span>
          <span className="text-slate-400">{step === 3 ? '100% Complete' : `${step * 33}%`}</span>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-white">
              Institutional Profile & Representation
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Organization Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="FAMILY_OFFICE">Family Office</option>
                  <option value="INVESTOR">Institutional Investor / PE</option>
                  <option value="COMPANY">Argentine Corporation / Sponsor</option>
                  <option value="PROJECT_OWNER">Project Owner / Developer</option>
                  <option value="STRATEGIC_PARTNER">Strategic Trade Partner</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Country Headquarters</label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value as Country)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                >
                  <option value="United Arab Emirates">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Qatar">Qatar</option>
                  <option value="Kuwait">Kuwait</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Bahrain">Bahrain</option>
                  <option value="Oman">Oman</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Company / Entity Name</label>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">City Hub</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Continue to Capital Mandate</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-white">
              Target Ticket Size & Allocation Scope
            </h3>
            <p className="text-xs text-slate-400">
              Select your primary investment ticket bracket for bilateral syndications.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { label: 'USD 500K - 1M', val: 1000000 },
                { label: 'USD 1M - 5M', val: 5000000 },
                { label: 'USD 5M - 15M', val: 15000000 },
                { label: 'USD 15M - 50M', val: 50000000 },
                { label: 'USD 50M - 100M', val: 100000000 },
                { label: 'USD 100M+ (Syndicate)', val: 250000000 },
              ].map((opt) => (
                <button
                  key={opt.val}
                  type="button"
                  onClick={() => setTicketMax(opt.val)}
                  className={`p-3 rounded-xl border text-center transition-colors ${
                    ticketMax === opt.val
                      ? 'bg-amber-500/20 text-ambc-gold border-ambc-gold font-bold'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="px-5 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5"
              >
                <span>Continue to Sectors</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-lg font-serif font-bold text-white">
              Preferred Sectors & Investment Structures
            </h3>

            <div className="space-y-2">
              <div className="text-xs font-bold text-ambc-gold">Target Verticals:</div>
              <div className="flex flex-wrap gap-1.5">
                {allSectors.map((sec) => (
                  <button
                    key={sec}
                    type="button"
                    onClick={() => toggleSector(sec)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      selectedSectors.includes(sec)
                        ? 'bg-amber-500/20 text-ambc-gold border-ambc-gold'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {sec}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="text-xs font-bold text-ambc-gold">Transaction Structures:</div>
              <div className="flex flex-wrap gap-1.5">
                {allStructures.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => toggleStructure(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                      structures.includes(st)
                        ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                        : 'bg-slate-900 text-slate-400 border-slate-800'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Save & Enter AMBC Connect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingModal;
