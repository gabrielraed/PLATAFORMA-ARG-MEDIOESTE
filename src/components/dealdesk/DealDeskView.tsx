import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { IntroductionWorkflowStatus, IntroductionRequest } from '../../types';
import {
  Briefcase,
  Layers,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  DollarSign,
  Building,
  CheckCircle2,
  Lock,
  FolderLock,
  Plus,
  Filter,
} from 'lucide-react';

export const DealDeskView: React.FC<{ setCurrentView: (view: string) => void }> = ({
  setCurrentView,
}) => {
  const {
    introductions,
    advanceIntroductionStage,
    krestonLeads,
    businessRooms,
    setActiveBusinessRoom,
  } = useApp();

  const stages: IntroductionWorkflowStatus[] = [
    'NEW',
    'SCREENING',
    'QUALIFICATION',
    'CHAIRMAN_REVIEW',
    'APPROVED',
    'INTRODUCTION_PREPARATION',
    'INTRODUCTION',
    'NDA',
    'BUSINESS_ROOM',
    'NEGOTIATION',
    'CLOSED_WON',
  ];

  const [selectedRecord, setSelectedRecord] = useState<IntroductionRequest | null>(null);

  const krestonPipelineTotal = krestonLeads.reduce((acc, l) => acc + l.estimatedFeeUsd, 0);
  const krestonWonTotal = krestonLeads.reduce((acc, l) => acc + (l.revenueGenerated || 0), 0);

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              AGBIC Operations Engine
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
              CENTRAL CRM DEAL DESK
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            AGBIC Executive Deal Desk
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Centralized intake, screening, and end-to-end qualification of bilateral partnerships
            operating under Chairman Gate™ protocols.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setCurrentView('chairman-dashboard')}
            className="px-4 py-2 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-ambc-gold border border-amber-500/30 text-xs font-semibold flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-ambc-gold" />
            <span>Chairman Review Queue</span>
          </button>
          <button
            onClick={() => setCurrentView('kreston-crm')}
            className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow"
          >
            <span>Kreston Advisory CRM</span>
          </button>
        </div>
      </div>

      {/* Operations Dashboard Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Total Active Inquiries</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {introductions.length} Inquiries
          </div>
          <div className="text-[10px] text-ambc-gold">100% Screened</div>
        </div>

        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Active Business Rooms</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            {businessRooms.length} Active
          </div>
          <div className="text-[10px] text-emerald-400">Under Bilateral NDA</div>
        </div>

        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Avg. Time to Intro</div>
          <div className="text-xl font-bold font-mono text-ambc-gold mt-0.5">3.8 Days</div>
          <div className="text-[10px] text-slate-400">SLA: &lt; 5 Days</div>
        </div>

        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Kreston Pipeline Fee</div>
          <div className="text-xl font-bold font-mono text-emerald-400 mt-0.5">
            USD ${(krestonPipelineTotal / 1000).toFixed(0)}K
          </div>
          <div className="text-[10px] text-slate-400">{krestonLeads.length} Service Leads</div>
        </div>

        <div className="p-4 rounded-xl bg-[#091120] border border-slate-800">
          <div className="text-[10px] uppercase font-mono text-slate-400">Realized Fee Revenue</div>
          <div className="text-xl font-bold font-mono text-white mt-0.5">
            USD ${(krestonWonTotal / 1000).toFixed(0)}K
          </div>
          <div className="text-[10px] text-emerald-400">Source: AGBIC Connect</div>
        </div>
      </div>

      {/* Horizontal Workflow Kanban Board */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="font-semibold text-white">
            End-to-End Strategic Introduction Board (11 Gate Stages)
          </span>
          <span className="text-[11px] font-mono">Scroll horizontally →</span>
        </div>

        <div className="overflow-x-auto pb-4">
          <div className="flex gap-3 min-w-[2100px]">
            {stages.map((stage) => {
              const items = introductions.filter((i) => i.status === stage);
              return (
                <div
                  key={stage}
                  className="w-56 bg-[#091120] border border-slate-800 rounded-xl flex flex-col shrink-0 overflow-hidden"
                >
                  {/* Column Header */}
                  <div className="p-3 border-b border-slate-800 bg-[#070D18] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white uppercase tracking-wider font-mono truncate">
                      {stage.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-ambc-gold font-mono">
                      {items.length}
                    </span>
                  </div>

                  {/* Cards in column */}
                  <div className="p-2.5 flex-1 space-y-2 min-h-[300px]">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => setSelectedRecord(item)}
                        className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all text-xs space-y-2"
                      >
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-ambc-gold font-bold">{item.id}</span>
                          <span className="text-slate-400">{item.priority}</span>
                        </div>

                        <div className="font-semibold text-white truncate leading-snug">
                          {item.requesterCompany}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">
                          ↔ {item.targetCompanyName}
                        </div>

                        <div className="text-[10px] text-ambc-gold font-mono truncate">
                          Scale: {item.estimatedBusinessSize}
                        </div>

                        {/* Quick Advance Button */}
                        <div className="pt-1.5 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                          <span className="text-slate-500 font-mono">
                            {item.chairmanStatus === 'APPROVED' ? 'Cleared' : 'Pending'}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              const nextIdx = stages.indexOf(stage) + 1;
                              if (nextIdx < stages.length) {
                                advanceIntroductionStage(item.id, stages[nextIdx]);
                              }
                            }}
                            className="text-ambc-gold hover:underline flex items-center gap-0.5 font-bold"
                          >
                            <span>Advance</span>
                            <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}

                    {items.length === 0 && (
                      <div className="h-20 border border-dashed border-slate-800/80 rounded-lg flex items-center justify-center text-[10px] text-slate-600 font-mono">
                        No active records
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Record Inspection Modal / Drawer */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl bg-[#091120] border border-amber-500/40 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-5 text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-ambc-gold uppercase font-bold">
                  AGBIC Executive Deal Desk Dossier
                </span>
                <h3 className="text-lg font-serif font-bold text-white mt-0.5">
                  Record ID: {selectedRecord.id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="text-slate-400 hover:text-white text-xs p-1"
              >
                ✕
              </button>
            </div>

            {/* Counterparty Overview */}
            <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">Requester</div>
                <div className="font-bold text-white mt-0.5">{selectedRecord.requesterCompany}</div>
                <div className="text-[11px] text-slate-400">
                  {selectedRecord.requesterName} ({selectedRecord.requesterCountry})
                </div>
              </div>
              <div>
                <div className="text-[10px] uppercase font-mono text-slate-400">Target</div>
                <div className="font-bold text-white mt-0.5">{selectedRecord.targetCompanyName}</div>
                <div className="text-[11px] text-slate-400">{selectedRecord.targetCountry}</div>
              </div>
            </div>

            {/* Business Objective */}
            <div className="space-y-1 text-xs">
              <div className="font-semibold text-slate-300">Objective & Scope:</div>
              <p className="text-slate-200 bg-slate-950 p-3 rounded-lg border border-slate-800 leading-relaxed font-sans">
                {selectedRecord.businessObjective}
              </p>
            </div>

            {/* Audit Trail */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Immutable Audit Trail:</div>
              <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1 text-[11px]">
                {(selectedRecord.auditTrail || []).map((log, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300 flex items-start justify-between"
                  >
                    <div>
                      <strong className="text-ambc-gold font-mono">{log.stage}: </strong>
                      <span>{log.note}</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono shrink-0 ml-2">
                      {log.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Advance Controls */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="text-slate-400">
                Assigned: <strong className="text-white">{selectedRecord.assignedExecutive}</strong>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const nextIdx = stages.indexOf(selectedRecord.status as IntroductionWorkflowStatus) + 1;
                    if (nextIdx > 0 && nextIdx < stages.length) {
                      advanceIntroductionStage(selectedRecord.id, stages[nextIdx]);
                      setSelectedRecord(null);
                    }
                  }}
                  className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase"
                >
                  Advance to Next Stage
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DealDeskView;
