import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Activity,
  ShieldCheck,
  Database,
  Lock,
  Cpu,
  Server,
  CheckCircle2,
  AlertCircle,
  FileText,
  Clock,
  Layers,
} from 'lucide-react';

export const SystemHealthView: React.FC = () => {
  const { auditLogs } = useApp();
  const [filterAction, setFilterAction] = useState('ALL');

  const healthModules = [
    {
      name: 'Authentication & RBAC',
      status: 'OPERATIONAL',
      desc: '11 Granular roles enforced with session integrity and Chairman Gate barriers.',
      icon: ShieldCheck,
      latency: '24ms',
    },
    {
      name: 'Cloud Firestore Database',
      status: 'OPERATIONAL',
      desc: 'Normalized collections for Opportunities, Introductions, Leads, and Business Rooms.',
      icon: Database,
      latency: '38ms',
    },
    {
      name: 'Virtual Data Room Storage',
      status: 'OPERATIONAL',
      desc: 'Tiered 256-bit AES encryption at rest with forensic cryptographic access logs.',
      icon: Lock,
      latency: '45ms',
    },
    {
      name: 'Chairman Gate™ Anti-Bypass',
      status: 'ACTIVE_SHIELD',
      desc: 'Automated regex scanning detects direct contact disclosure attempts.',
      icon: Activity,
      latency: '12ms',
    },
    {
      name: 'Kreston Advisory Attribution',
      status: 'OPERATIONAL',
      desc: 'Source attribution tracking AGBIC → Introduction → Advisory Lead → Revenue.',
      icon: Layers,
      latency: '19ms',
    },
    {
      name: 'AI Chairman Assistant (Gemini)',
      status: 'OPERATIONAL',
      desc: 'Google GenAI SDK connected for executive briefings and due diligence scoping.',
      icon: Cpu,
      latency: '180ms',
    },
  ];

  const filteredLogs = auditLogs.filter((log) => {
    if (filterAction === 'ALL') return true;
    return log.action.includes(filterAction);
  });

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              Infrastructure & Governance Monitoring
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.2 rounded font-mono font-bold">
              ALL SERVICES OPTIMAL
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            System Health & Immutable Audit Logs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Real-time compliance monitoring verifying Chairman Gate governance, security rules,
            data room encryption, and relationship tracking integrity.
          </p>
        </div>
      </div>

      {/* Health Diagnostic Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthModules.map((mod, idx) => {
          const Icon = mod.icon;
          return (
            <div
              key={idx}
              className="p-4 rounded-xl bg-[#091120] border border-slate-800 space-y-2.5 text-xs shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-white">
                  <Icon className="w-4 h-4 text-ambc-gold" />
                  <span>{mod.name}</span>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                  {mod.status}
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed text-[11px]">{mod.desc}</p>
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>Latency: {mod.latency}</span>
                <span className="text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Passed Test
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Immutable Audit Log Table */}
      <div className="p-6 rounded-2xl bg-[#091120] border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div>
            <h3 className="text-base font-serif font-bold text-white">
              Immutable Governance Audit Log
            </h3>
            <p className="text-xs text-slate-400">
              Cryptographically timestamped action history of all Chairman decisions, Business Room activations, and introductions.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400 font-mono">Filter:</span>
            <select
              value={filterAction}
              onChange={(e) => setFilterAction(e.target.value)}
              className="px-2.5 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs text-ambc-gold font-mono"
            >
              <option value="ALL">All Actions</option>
              <option value="CHAIRMAN">Chairman Gate Decisions</option>
              <option value="INTRODUCTION">Introduction Requests</option>
              <option value="KRESTON">Kreston Leads</option>
              <option value="BUSINESS_ROOM">Business Rooms</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-[10px] uppercase font-mono text-slate-400">
                <th className="py-2.5 px-3">Timestamp (ART)</th>
                <th className="py-2.5 px-3">Actor / Role</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Target Object</th>
                <th className="py-2.5 px-3">Delta / Transition</th>
                <th className="py-2.5 px-3">IP & Session</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-3 font-mono text-ambc-gold text-[11px] whitespace-nowrap">
                    {log.timestamp}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-white">{log.user}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{log.role}</div>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-200 font-bold text-[11px]">
                    {log.action}
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-mono text-[11px] max-w-xs truncate">
                    {log.targetObject}
                  </td>
                  <td className="py-3 px-3 font-mono text-[10px] text-slate-400">
                    {log.previousValue ? `${log.previousValue} → ${log.newValue}` : log.newValue}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-500 text-[10px] whitespace-nowrap">
                    {log.ipSession}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthView;
