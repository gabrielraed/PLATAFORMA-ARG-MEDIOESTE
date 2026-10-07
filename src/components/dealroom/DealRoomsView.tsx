import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useApp } from '../../context/AppContext';
import {
  FolderLock,
  Lock,
  Unlock,
  FileText,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Clock,
} from 'lucide-react';

interface DealRoomsViewProps {
  setCurrentView: (view: string) => void;
}

export const DealRoomsView: React.FC<DealRoomsViewProps> = ({ setCurrentView }) => {
  const { dealRooms, setActiveDealRoom } = useApp();

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
            Virtual Data Room (VDR)
          </span>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Confidential Deal Rooms
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Bank-grade institutional repository with cryptographic watermarks, bilateral NDAs, and
            tiered due diligence documentation for approved syndicates.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Active Vaults: <strong className="text-white">{dealRooms.length}</strong> Deal Rooms
        </div>
      </div>

      {/* Grid of Deal Rooms */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dealRooms.map((dr: any) => (
          <div
            key={dr.id}
            className="p-6 rounded-2xl border border-slate-800 bg-[#091120] hover:border-amber-500/40 transition-all shadow-xl space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold font-bold">
                    <FolderLock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-serif font-bold text-white">{dr.title}</h3>
                    <div className="text-xs text-slate-400 mt-0.5">{dr.companyName}</div>
                  </div>
                </div>

                {dr.ndaSigned ? (
                  <span className="px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    NDA Executed
                  </span>
                ) : (
                  <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    NDA Required
                  </span>
                )}
              </div>

              {/* Financial Profile Matrix */}
              <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Target Raise</div>
                  <div className="text-sm font-bold text-white font-mono mt-0.5">
                    {dr.targetRaise}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Vault Files</div>
                  <div className="text-sm font-bold text-ambc-gold font-mono mt-0.5">
                    {dr.documents.length} Verified Documents
                  </div>
                </div>
              </div>

              {/* Document List Peek */}
              <div className="space-y-1.5 text-xs">
                <div className="text-[10px] uppercase font-mono text-slate-400 font-semibold">
                  Vault Contents:
                </div>
                <div className="space-y-1">
                  {(dr.documents || []).slice(0, 3).map((doc: any) => (
                    <div
                      key={doc.id}
                      className="p-2 rounded bg-slate-900/60 border border-slate-800 text-[11px] text-slate-300 flex items-center justify-between"
                    >
                      <span className="truncate">{doc.title}</span>
                      <span className="text-[9px] text-slate-500 shrink-0">{doc.category}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-2 border-t border-slate-800/80">
              <button
                onClick={() => setActiveDealRoom(dr)}
                className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow-md flex items-center justify-center gap-2"
              >
                <FolderLock className="w-4 h-4" />
                <span>Enter Confidential Deal Room</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealRoomsView;
