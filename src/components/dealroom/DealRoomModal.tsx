import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Lock,
  Unlock,
  FileText,
  Download,
  ShieldCheck,
  Clock,
  Eye,
  CheckCircle2,
  FileCheck,
  AlertCircle,
} from 'lucide-react';

export const DealRoomModal: React.FC = () => {
  const { activeDealRoom, setActiveDealRoom, signDealRoomNda } = useApp();
  const [activeTab, setActiveTab] = useState<'documents' | 'audit'>('documents');
  const [showNdaSignFlow, setShowNdaSignFlow] = useState(false);
  const [signatureName, setSignatureName] = useState('Ahmed Al-Mansoor');
  const [downloadSuccessDoc, setDownloadSuccessDoc] = useState<string | null>(null);

  if (!activeDealRoom) return null;

  const isNdaExecuted = (activeDealRoom as any).ndaExecuted || (activeDealRoom as any).ndaSigned;
  const targetEntity = (activeDealRoom as any).companyName || (activeDealRoom as any).leadParticipantA || 'Project Sponsor';

  const handleSignNda = (e: React.FormEvent) => {
    e.preventDefault();
    signDealRoomNda(activeDealRoom.id);
    setShowNdaSignFlow(false);
  };

  const handleDownloadDoc = (docTitle: string, isRestricted: boolean) => {
    if (isRestricted && !isNdaExecuted) {
      setShowNdaSignFlow(true);
      return;
    }
    setDownloadSuccessDoc(docTitle);
    setTimeout(() => setDownloadSuccessDoc(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#091120] border border-slate-700 rounded-2xl shadow-2xl overflow-hidden my-6 max-h-[92vh] flex flex-col text-left">
        {/* Deal Room Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#070D18] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-ambc-gold/40 flex items-center justify-center text-ambc-gold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ambc-gold font-bold">
                  Confidential Bilateral Data Room
                </span>
                <span className="text-slate-500">·</span>
                <span className="text-xs text-slate-400">ID: {activeDealRoom.id}</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white mt-0.5">
                {activeDealRoom.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveDealRoom(null)}
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* NDA Status Banner */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">NDA Status:</span>
            {isNdaExecuted ? (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Executed Digital NDA Active
              </span>
            ) : (
              <span className="text-amber-400 font-bold flex items-center gap-1">
                <AlertCircle className="w-3.5 h-3.5" />
                NDA Execution Required for Financial Models
              </span>
            )}
          </div>

          {!isNdaExecuted && (
            <button
              onClick={() => setShowNdaSignFlow(true)}
              className="px-3 py-1 rounded bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95"
            >
              Sign NDA to Unlock Full Vault
            </button>
          )}

          {isNdaExecuted && (
            <span className="text-slate-400 font-mono text-[11px]">
              Access Tier: Full Qualified Investor
            </span>
          )}
        </div>

        {/* Download Alert Toast */}
        {downloadSuccessDoc && (
          <div className="mx-6 mt-3 p-3 rounded-lg bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            <span>
              Secure download initiated for: <strong className="text-white">{downloadSuccessDoc}</strong> (256-bit AES watermark logged in audit trail).
            </span>
          </div>
        )}

        {/* Tabs Bar */}
        <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-6 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('documents')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'documents' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Data Room Files ({activeDealRoom.documents.length})
            {activeTab === 'documents' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`pb-3 relative transition-colors ${
              activeTab === 'audit' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Compliance & Audit Log ({activeDealRoom.auditLogs.length})
            {activeTab === 'audit' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
            )}
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeTab === 'documents' ? (
            <div className="space-y-3">
              {(activeDealRoom.documents || []).map((doc: any) => {
                const isRestricted =
                  (doc.securityLevel === 'NDA Required' ||
                    doc.securityLevel === 'Qualified Investor' ||
                    doc.status === 'NDA Required') &&
                  !activeDealRoom.ndaExecuted;

                return (
                  <div
                    key={doc.id}
                    className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 shrink-0">
                        <FileText className="w-4 h-4 text-ambc-gold" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{doc.title}</div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                          <span className="text-ambc-gold font-mono">{doc.category}</span>
                          <span>·</span>
                          <span>{doc.fileSize}</span>
                          <span>·</span>
                          <span>Updated {doc.lastUpdated}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                          doc.securityLevel === 'Public'
                            ? 'bg-slate-800 text-slate-300 border-slate-700'
                            : doc.securityLevel === 'NDA Required'
                            ? 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        }`}
                      >
                        {doc.securityLevel}
                      </span>

                      <button
                        onClick={() => handleDownloadDoc(doc.title, isRestricted)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                          isRestricted
                            ? 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
                            : 'bg-gold-gradient text-slate-950 font-bold hover:opacity-95'
                        }`}
                      >
                        {isRestricted ? (
                          <>
                            <Lock className="w-3.5 h-3.5 text-amber-400" />
                            <span>Unlock</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs text-slate-400 pb-2">
                Cryptographic timestamp log of all file downloads, permissions changes, and bilateral inspections.
              </div>
              {(activeDealRoom.auditLogs || []).map((log: any) => (
                <div
                  key={log.id}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800 text-xs flex items-center justify-between gap-4"
                >
                  <div>
                    <div className="font-semibold text-white">{log.action}</div>
                    <div className="text-[11px] text-slate-400">{log.user}</div>
                  </div>
                  <div className="text-[10px] text-ambc-gold font-mono shrink-0">
                    {log.timestamp}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* NDA Modal Overlay */}
        {showNdaSignFlow && (
          <div className="absolute inset-0 bg-black/90 z-20 p-6 flex items-center justify-center">
            <div className="w-full max-w-lg bg-[#0E1726] border border-amber-500/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-ambc-gold font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Bilateral Non-Disclosure Agreement (NDA)</span>
                </div>
                <button
                  onClick={() => setShowNdaSignFlow(false)}
                  className="p-1 rounded bg-slate-800 text-slate-400"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="text-xs text-slate-300 space-y-2 max-h-48 overflow-y-auto p-3 bg-slate-950 rounded border border-slate-800 text-left font-mono">
                <p>
                  This Bilateral Confidentiality & Non-Disclosure Agreement is entered into between{' '}
                  <strong className="text-white">{targetEntity}</strong> and the
                  undersigned recipient.
                </p>
                <p>
                  1. Confidential Information includes all financial projections, reserves audits,
                  geological assays, tax models, and contracts provided within this Deal Room.
                </p>
                <p>
                  2. The recipient agrees not to disclose or distribute proprietary data without
                  prior written consent and to observe international commercial confidentiality
                  standards.
                </p>
                <p>
                  3. Jurisdiction: The terms of this agreement are governed under international
                  commercial arbitration (ICC / DIFC-LCIA rules).
                </p>
              </div>

              <form onSubmit={handleSignNda} className="space-y-3">
                <div>
                  <label className="block text-[11px] text-slate-300 font-semibold mb-1">
                    Signatory Legal Representative Full Name
                  </label>
                  <input
                    type="text"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-xs text-white"
                  />
                </div>

                <div className="text-[10px] text-slate-400">
                  By clicking below, you bind your organization to this electronic NDA. A cryptographic audit token will be logged.
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowNdaSignFlow(false)}
                    className="px-3 py-1.5 rounded bg-slate-800 text-slate-300 text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded bg-gold-gradient text-slate-950 font-bold text-xs uppercase"
                  >
                    Confirm & Execute NDA
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealRoomModal;
