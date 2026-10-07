import React, { useState } from 'react';
import { Check, ShieldCheck, Sparkles, CreditCard, ArrowRight } from 'lucide-react';

export const MembershipView: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [billingCycle, setBillingCycle] = useState<'annual' | 'quarterly'>('annual');

  const plans = [
    {
      id: 'FREE',
      name: 'Registered Observer',
      tagline: 'Basic access to public research briefs and macro summaries.',
      price: '$0',
      period: 'forever',
      features: [
        'Browse public project headlines',
        'Standard market intelligence articles',
        'Access to open bilateral webinars',
        'Basic profile listing',
      ],
      cta: 'Current Plan',
      badge: 'Free Tier',
    },
    {
      id: 'MEMBER',
      name: 'Executive Member',
      tagline: 'For professionals and mid-tier executives exploring bilateral deals.',
      price: billingCycle === 'annual' ? '$2,400' : '$750',
      period: billingCycle === 'annual' ? '/ year' : '/ quarter',
      features: [
        'Full project dossier visibility (excluding proprietary models)',
        'Submit up to 3 introduction requests / quarter',
        'Direct bilateral messaging with verified counterparties',
        'Invitations to general investment forums in Dubai & BA',
        'Standard KYC verification badge',
      ],
      cta: 'Select Member',
      badge: 'Professional',
    },
    {
      id: 'CORPORATE',
      name: 'Corporate Sponsor',
      tagline: 'For Argentine corporations and project sponsors seeking Gulf capital.',
      price: billingCycle === 'annual' ? '$9,500' : '$2,900',
      period: billingCycle === 'annual' ? '/ year' : '/ quarter',
      features: [
        'Host up to 3 dedicated confidential Deal Rooms (VDR)',
        'Unlimited AI Mandate Matching with GCC syndicates',
        'AI Investor Brief generation & custom pitch optimization',
        'Secretariat diplomatic facilitation for introductions',
        'VIP bilateral delegation passes for DIFC and KAFD summits',
        'RIGI eligibility advisory screening',
      ],
      cta: 'Upgrade to Corporate',
      badge: 'Most Popular',
      highlighted: true,
    },
    {
      id: 'INVESTOR_PREMIUM',
      name: 'Institutional Investor',
      tagline: 'For Family Offices, Sovereign Funds, and Private Equity allocators.',
      price: billingCycle === 'annual' ? '$18,000' : '$5,500',
      period: billingCycle === 'annual' ? '/ year' : '/ quarter',
      features: [
        'Unrestricted access to all tier-1 Deal Rooms & financial models',
        'Direct priority introductions to Argentine provincial governors & CEOs',
        'Bespoke off-market deal sourcing & feasibility verification',
        'Private Chatham House roundtable seats at bilateral forums',
        'Dedicated AMBC Secretariat investment liaison director',
        'Full bilateral CRM syndicate collaboration tools',
      ],
      cta: 'Apply for Investor Accreditation',
      badge: 'Sovereign & Family',
    },
  ];

  return (
    <div className="space-y-12 text-left animate-in fade-in duration-300 max-w-6xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
          Institutional Accreditation
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          Membership & Participation Tiers
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          AMBC Connect operates under strict institutional accreditation. Select the membership
          tier appropriate to your capital deployment or project sponsorship mandate.
        </p>

        {/* Billing cycle toggle */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs mt-2">
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-4 py-1.5 rounded-lg font-semibold transition-colors ${
              billingCycle === 'annual'
                ? 'bg-amber-500/20 text-ambc-gold border border-ambc-gold/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual Allocation (Save 20%)
          </button>
          <button
            onClick={() => setBillingCycle('quarterly')}
            className={`px-4 py-1.5 rounded-lg font-semibold transition-colors ${
              billingCycle === 'quarterly'
                ? 'bg-amber-500/20 text-ambc-gold border border-ambc-gold/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Quarterly
          </button>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-2xl p-6 flex flex-col justify-between transition-all shadow-xl space-y-6 ${
              plan.highlighted
                ? 'bg-[#0B172E] border-2 border-ambc-gold'
                : 'bg-[#091120] border border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-ambc-gold">
                  {plan.badge}
                </span>
                {plan.highlighted && (
                  <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[9px] uppercase tracking-wider">
                    Recommended
                  </span>
                )}
              </div>

              <div>
                <h3 className="text-lg font-serif font-bold text-white">{plan.name}</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{plan.tagline}</p>
              </div>

              <div className="pt-2">
                <span className="text-2xl font-bold font-mono text-white">{plan.price}</span>
                <span className="text-xs text-slate-400 ml-1">{plan.period}</span>
              </div>

              <div className="space-y-2 pt-4 border-t border-slate-800/80 text-xs text-slate-300">
                {plan.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-ambc-gold shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedPlan(plan.name)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md ${
                  plan.highlighted
                    ? 'bg-gold-gradient text-slate-950 hover:opacity-95'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Payment Gateway Architecture Placeholder Notice */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs text-slate-400">
        <div className="flex items-center gap-2 text-white font-semibold">
          <CreditCard className="w-4 h-4 text-ambc-gold" />
          <span>Payment Processing Architecture (Stripe & Mercado Pago Ready)</span>
        </div>
        <p className="leading-relaxed">
          Institutional membership billing is architected with dual international payment
          gateways: <strong>Stripe Billing</strong> for USD international wire/card invoicing across
          the GCC (UAE, Saudi Arabia, Qatar, Kuwait) and <strong>Mercado Pago Enterprise</strong> for
          domestic Argentine corporate billing. Live payment credentials will be activated upon
          formal commercial launch.
        </p>
      </div>

      {/* Subscription Selected Simulation Modal */}
      {selectedPlan && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0E1726] border border-amber-500/50 rounded-2xl p-6 space-y-4 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-ambc-gold font-bold uppercase">
                Membership Accreditation Application
              </span>
              <button
                onClick={() => setSelectedPlan(null)}
                className="text-slate-400 hover:text-white text-xs"
              >
                ✕
              </button>
            </div>
            <h3 className="text-base font-bold text-white">Selected Tier: {selectedPlan}</h3>
            <p className="text-xs text-slate-300">
              Your organization has been placed in the accreditation review queue. An AMBC Connect
              Secretariat director will reach out within 24 hours with bilateral onboarding documents
              and invoice instructions.
            </p>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedPlan(null)}
                className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase"
              >
                Acknowledge & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipView;
