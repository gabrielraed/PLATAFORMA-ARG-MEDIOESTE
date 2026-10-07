import React from 'react';
import {
  Logo,
  ArgentinaFlag,
  UAEFlag,
  SaudiArabiaFlag,
  QatarFlag,
  KuwaitFlag,
  BahrainFlag,
  OmanFlag,
} from '../common/Logo';
import { Shield, Globe, Award, Building, Users, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-12 text-left animate-in fade-in duration-300 max-w-5xl mx-auto py-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <Logo size="lg" className="justify-center" showSubtitle={true} showArabicConcept={true} />
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-white tracking-wide">
          About AMBC Connect
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Argentina – Middle East Business & Investment Platform
          <br />
          <span className="text-ambc-gold font-medium">
            “Connecting Capital, Opportunities & People” · “Opportunities Without Borders”
          </span>
        </p>
      </div>

      {/* Diplomatic & Private Sector Independence Disclaimer */}
      <div className="p-5 rounded-2xl bg-[#0E1726] border border-amber-500/30 text-xs text-slate-300 space-y-2">
        <div className="flex items-center gap-2 text-ambc-gold font-bold uppercase tracking-wider text-[11px]">
          <Shield className="w-4 h-4" />
          <span>Independent Institutional Charter & Mandate</span>
        </div>
        <p className="leading-relaxed">
          <strong>Official Governance Statement:</strong> AMBC Connect is an independent,
          private-sector international business and investment facilitation platform. AMBC Connect
          does not represent any national government, ministry, embassy, consulate, or diplomatic
          mission unless expressly authorized by written bilateral mandate. It functions as a
          private bridge uniting verified business leaders, institutional funds, and industrial
          enterprises.
        </p>
      </div>

      {/* Mission & Vision Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-white">Our Mission</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To catalyze cross-border capital formation and bilateral joint ventures between Argentina
            and the Gulf Cooperation Council (GCC). We systematically eliminate informational
            asymmetry, structure bank-grade due diligence data rooms, and connect qualified sponsors
            with sovereign and private wealth allocators.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold font-bold">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-serif font-bold text-white">Our Vision</h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            To become the premier institutional corridor connecting Latin America's natural resource
            and technological wealth with the capital depth, sovereign funds, and industrial
            ambitions of the Middle East.
          </p>
        </div>
      </div>

      {/* Strategic Geographic Hubs */}
      <div className="space-y-4">
        <h3 className="text-lg font-serif font-bold text-white">
          Active Geographic Focus & Representative Hubs
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1.5 flex flex-col items-center justify-center hover:border-amber-500/40 transition-colors">
            <ArgentinaFlag className="w-7 h-5 shadow" />
            <div className="font-bold text-white">Argentina</div>
            <div className="text-[10px] text-ambc-gold">Buenos Aires</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1.5 flex flex-col items-center justify-center hover:border-amber-500/40 transition-colors">
            <UAEFlag className="w-7 h-5 shadow" />
            <div className="font-bold text-white">UAE</div>
            <div className="text-[10px] text-ambc-gold">Dubai & Abu Dhabi</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1.5 flex flex-col items-center justify-center hover:border-amber-500/40 transition-colors">
            <SaudiArabiaFlag className="w-7 h-5 shadow" />
            <div className="font-bold text-white">Saudi Arabia</div>
            <div className="text-[10px] text-ambc-gold">Riyadh & Jeddah</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1.5 flex flex-col items-center justify-center hover:border-amber-500/40 transition-colors">
            <QatarFlag className="w-7 h-5 shadow" />
            <div className="font-bold text-white">Qatar</div>
            <div className="text-[10px] text-ambc-gold">Doha</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1.5 flex flex-col items-center justify-center hover:border-amber-500/40 transition-colors">
            <KuwaitFlag className="w-7 h-5 shadow" />
            <div className="font-bold text-white">Kuwait</div>
            <div className="text-[10px] text-ambc-gold">Kuwait City</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center space-y-1.5 flex flex-col items-center justify-center hover:border-amber-500/40 transition-colors">
            <div className="flex items-center gap-1">
              <BahrainFlag className="w-5 h-3.5 shadow" />
              <OmanFlag className="w-5 h-3.5 shadow" />
            </div>
            <div className="font-bold text-white">Bahrain & Oman</div>
            <div className="text-[10px] text-ambc-gold">Manama & Muscat</div>
          </div>
        </div>
      </div>

      {/* Core Sectors */}
      <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 space-y-4">
        <h3 className="text-lg font-serif font-bold text-white">
          Priority Investment & Trade Verticals
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="space-y-1">
            <div className="font-bold text-ambc-gold">Critical Minerals & Mining</div>
            <p className="text-slate-300">
              Lithium brine concessions in the Puna, copper mega-deposits in San Juan, gold, and rare earth elements.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-ambc-gold">Energy & Infrastructure</div>
            <p className="text-slate-300">
              Vaca Muerta shale gas liquefaction, deep-water LNG export terminals, solar parks, and green hydrogen.
            </p>
          </div>
          <div className="space-y-1">
            <div className="font-bold text-ambc-gold">Agribusiness & Halal Food</div>
            <p className="text-slate-300">
              River port elevators along the Paraná, certified Halal grain crushing, and GCC food security stockpiles.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
