import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CrmDeal } from '../../types';
import {
  KanbanSquare,
  DollarSign,
  Plus,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Tag,
  ChevronRight,
} from 'lucide-react';

export const CrmView: React.FC = () => {
  const { crmDeals, updateCrmStage } = useApp();

  const stages = [
    'QUALIFIED',
    'MEETING',
    'INTRODUCTION',
    'NEGOTIATION',
    'DUE_DILIGENCE',
    'DEAL',
  ] as const;

  const totalValue = (crmDeals || []).reduce((acc: number, d: CrmDeal) => acc + (d.dealValueUsd || 0), 0);

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Bilateral Deal Operations
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Bilateral CRM & Deal Pipeline
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Active cross-border transactions under active negotiation between Argentine project
            sponsors and Middle Eastern institutional syndicates.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-right">
          <div className="text-[10px] uppercase font-mono text-slate-400">Total Active Pipeline</div>
          <div className="text-xl font-bold font-mono text-ambc-gold mt-0.5">
            USD ${(totalValue / 1000000).toFixed(0)} Million
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-[1200px]">
          {stages.map((stage) => {
            const dealsInStage = (crmDeals || []).filter((d: CrmDeal) => d.stage === stage);
            const stageValue = dealsInStage.reduce((acc: number, d: CrmDeal) => acc + (d.dealValueUsd || 0), 0);

            return (
              <div
                key={stage}
                className="w-72 bg-[#091120] border border-slate-800 rounded-2xl flex flex-col shrink-0 overflow-hidden"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-800 bg-[#070D18] flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white">{stage.replace('_', ' ')}</span>
                    <div className="text-[10px] font-mono text-ambc-gold">
                      ${(stageValue / 1000000).toFixed(0)}M ({dealsInStage.length})
                    </div>
                  </div>
                </div>

                {/* Cards in column */}
                <div className="p-3 flex-1 space-y-3 min-h-[350px]">
                  {dealsInStage.map((deal: CrmDeal) => (
                    <div
                      key={deal.id}
                      className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-amber-500/40 transition-all text-xs space-y-2.5 shadow-md"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-bold text-white leading-tight">{deal.title}</span>
                        <span className="text-[10px] font-mono text-ambc-gold font-bold shrink-0">
                          ${((deal.dealValueUsd || 0) / 1000000).toFixed(0)}M
                        </span>
                      </div>

                      <div className="text-[11px] text-slate-400">
                        {deal.companyName} · {deal.country}
                      </div>

                      <div className="p-2 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                        <span className="text-ambc-gold font-semibold">Next: </span>
                        {deal.nextAction}
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1">
                        {(deal.tags || []).map((tag: string, tIdx: number) => (
                          <span
                            key={tIdx}
                            className="px-1.5 py-0.5 rounded bg-slate-800 text-[9px] text-slate-400"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Advance Stage Control */}
                      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                        <span className="text-slate-500">{deal.owner}</span>
                        <button
                          onClick={() => {
                            const nextIndex = stages.indexOf(stage) + 1;
                            if (nextIndex < stages.length) {
                              updateCrmStage(deal.id, stages[nextIndex]);
                            }
                          }}
                          className="text-ambc-gold hover:underline flex items-center gap-0.5 font-semibold"
                        >
                          <span>Advance</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}

                  {dealsInStage.length === 0 && (
                    <div className="h-28 border border-dashed border-slate-800 rounded-xl flex items-center justify-center text-[11px] text-slate-600">
                      No active deals
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CrmView;
