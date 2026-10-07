import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import { MarketReport } from '../../types';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  TrendingUp,
  FileText,
  Shield,
  X,
  Printer,
  Sparkles,
} from 'lucide-react';

export const IntelligenceView: React.FC = () => {
  const { reports } = useApp();
  const [selectedReport, setSelectedReport] = useState<MarketReport | null>(null);

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Bilateral Economic Research
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            AMBC Market Intelligence & Research
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            In-depth macroeconomic briefings, regulatory updates on Argentine RIGI statutory
            protections, and commodity supercycle intelligence between Argentina and the GCC.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Research Briefs: <strong className="text-white">{reports.length}</strong> Dossiers
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div
            key={report.id}
            className="p-6 rounded-2xl border border-slate-800 bg-[#091120] hover:border-amber-500/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="text-ambc-gold font-mono font-bold uppercase">{report.sector}</span>
                <span>{report.readTime}</span>
              </div>

              <h2 className="text-base font-serif font-bold text-white leading-snug">
                {report.title}
              </h2>

              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                {report.summary}
              </p>

              {/* Highlights bullets */}
              <div className="space-y-1.5 pt-2 border-t border-slate-800/80 text-xs">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                  Key Takeaways:
                </div>
                {(report.highlights || report.strategicTakeaways || []).slice(0, 2).map((h, idx) => (
                  <div key={idx} className="text-slate-300 flex items-start gap-1.5 text-[11px]">
                    <span className="text-ambc-gold font-bold">·</span>
                    <span className="line-clamp-2">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80">
              <button
                onClick={() => setSelectedReport(report)}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider border border-slate-700/80 hover:border-amber-500/30 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Read Institutional Report</span>
                <ArrowRight className="w-3.5 h-3.5 text-ambc-gold" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Report Reader Modal */}
      {selectedReport && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-[#091120] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-left">
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-800 bg-[#070D18] flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-ambc-gold font-bold uppercase">
                <BookOpen className="w-4 h-4" />
                <span>AMBC Strategic Intelligence Briefing</span>
              </div>
              <button
                onClick={() => setSelectedReport(null)}
                className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Content */}
            <div className="flex-1 overflow-y-auto p-8 sm:p-12 space-y-6">
              <div>
                <div className="text-xs font-mono text-ambc-gold font-bold uppercase">
                  {selectedReport.country} · {selectedReport.sector} · {selectedReport.date}
                </div>
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
                  {selectedReport.title}
                </h1>
                <div className="text-xs text-slate-400 mt-2">{selectedReport.readTime}</div>
              </div>

              {/* Key Figures Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-slate-900 border border-slate-800">
                {(selectedReport.keyFigures || [
                  { label: 'Corporate Tax Rate', value: '25%' },
                  { label: 'Stability Term', value: '30 Years' },
                  { label: 'Export Duties', value: '0%' },
                  { label: 'Forex Freedom', value: '100%' },
                ]).map((fig, idx) => (
                  <div key={idx}>
                    <div className="text-[10px] uppercase font-mono text-slate-400">{fig.label}</div>
                    <div className="text-base font-bold text-white mt-0.5">{fig.value}</div>
                  </div>
                ))}
              </div>

              {/* Full Text */}
              <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed whitespace-pre-line space-y-4">
                {selectedReport.content}
              </div>

              {/* Disclaimer */}
              <div className="pt-6 border-t border-slate-800 text-[10px] text-slate-500 font-mono leading-relaxed">
                RESEARCH NOTICE: AMBC Market Intelligence is prepared exclusively for institutional
                members of AMBC Connect. The contents do not constitute legal or tax advice.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntelligenceView;
