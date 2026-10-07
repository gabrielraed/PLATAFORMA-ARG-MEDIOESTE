import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import { BusinessRoom } from '../../types';
import {
  FolderLock,
  Lock,
  Unlock,
  FileText,
  Calendar,
  CheckCircle2,
  Clock,
  Send,
  MessageSquare,
  ShieldCheck,
  AlertTriangle,
  HelpCircle,
  Plus,
  X,
} from 'lucide-react';

export const BusinessRoomsView: React.FC = () => {
  const {
    businessRooms,
    activeBusinessRoom,
    setActiveBusinessRoom,
    executeBusinessRoomNda,
    addBusinessRoomDocument,
    addBusinessRoomMeeting,
    controlledMessages,
    sendControlledMessage,
  } = useApp();
  const { currentUser } = useAuth();

  const [activeTab, setActiveTab] = useState<'documents' | 'meetings' | 'tasks' | 'messages' | 'audit'>('documents');
  const [chatInput, setChatInput] = useState('');
  const [showNdaModal, setShowNdaModal] = useState(false);
  const [newDocTitle, setNewDocTitle] = useState('');
  const [showNewDocModal, setShowNewDocModal] = useState(false);
  const [bypassWarning, setBypassWarning] = useState<string | null>(null);

  const selectedRoom = activeBusinessRoom || businessRooms[0];

  const roomMessages = (controlledMessages || []).filter(
    (m) => m.contextType === 'BUSINESS_ROOM' && m.contextId === selectedRoom?.id
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !selectedRoom) return;

    const allowed = sendControlledMessage(
      selectedRoom.id,
      chatInput,
      currentUser?.name || 'Authorized Representative',
      currentUser?.companyName || 'Member Enterprise'
    );

    if (!allowed) {
      setBypassWarning(
        'Chairman Gate Notice: Direct contact details (email/phone/WhatsApp) cannot be shared directly. Strategic communications must remain inside the AGBIC ecosystem.'
      );
      setTimeout(() => setBypassWarning(null), 6000);
    } else {
      setBypassWarning(null);
    }

    setChatInput('');
  };

  const handleAddDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDocTitle.trim() || !selectedRoom) return;
    addBusinessRoomDocument(selectedRoom.id, newDocTitle, 'Legal');
    setNewDocTitle('');
    setShowNewDocModal(false);
  };

  return (
    <div className="space-y-6 text-left animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-ambc-gold font-bold">
              Controlled Business Ecosystem
            </span>
            <span className="text-slate-500">·</span>
            <span className="text-[10px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded font-mono">
              VIRTUAL DATA ROOM (VDR)
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-0.5">
            Confidential Business Rooms
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
            Secure bilateral collaboration vaults provisioned strictly following AGBIC Deal Desk &
            Chairman Gate™ authorization. Governed by bilateral NDAs and supervised by AGBIC liaisons.
          </p>
        </div>

        <div className="text-xs font-mono text-slate-400">
          Active Rooms: <strong className="text-white">{businessRooms.length}</strong>
        </div>
      </div>

      {/* Main Grid: Room Selector & Active Room Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Column: Business Rooms List */}
        <div className="space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
            Provisioned Rooms ({businessRooms.length})
          </div>

          {businessRooms.map((room) => {
            const isSelected = selectedRoom?.id === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveBusinessRoom(room)}
                className={`w-full p-4 rounded-xl text-left border transition-all space-y-2 ${
                  isSelected
                    ? 'bg-amber-500/10 border-ambc-gold shadow-lg'
                    : 'bg-[#091120] border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-ambc-gold font-bold">{room.id}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded font-semibold ${
                      room.ndaExecuted
                        ? 'bg-emerald-500/10 text-emerald-300'
                        : 'bg-amber-500/10 text-amber-300'
                    }`}
                  >
                    {room.ndaExecuted ? 'NDA Active' : 'NDA Required'}
                  </span>
                </div>

                <div className="text-xs font-bold text-white leading-snug truncate">
                  {room.title}
                </div>

                <div className="text-[11px] text-slate-400 truncate">
                  {room.leadParticipantA} ↔ {room.leadParticipantB}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right 3 Cols: Active Business Room Details */}
        {selectedRoom ? (
          <div className="lg:col-span-3 rounded-2xl border border-slate-800 bg-[#091120] overflow-hidden flex flex-col shadow-2xl">
            {/* Room Header */}
            <div className="p-6 border-b border-slate-800 bg-[#070D18] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-ambc-gold font-bold">
                    Room ID: {selectedRoom.id}
                  </span>
                  <span className="text-slate-500">·</span>
                  <span className="text-xs text-slate-400">
                    Coordinator: {selectedRoom.assignedAgbicCoordinator}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-serif font-bold text-white mt-1">
                  {selectedRoom.title}
                </h2>
                <div className="text-xs text-slate-300 mt-0.5">
                  Counterparties: <strong className="text-white">{selectedRoom.leadParticipantA}</strong>{' '}
                  and <strong className="text-white">{selectedRoom.leadParticipantB}</strong>
                </div>
              </div>

              {/* NDA Execution Status */}
              <div>
                {selectedRoom.ndaExecuted ? (
                  <div className="px-3 py-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Bilateral NDA Executed</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowNdaModal(true)}
                    className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 shadow"
                  >
                    Sign Bilateral NDA to Unlock
                  </button>
                )}
              </div>
            </div>

            {/* Anti-Bypass Alert Banner if triggered */}
            {bypassWarning && (
              <div className="p-3 bg-amber-500/20 border-b border-amber-500/40 text-amber-200 text-xs flex items-center gap-2 px-6">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{bypassWarning}</span>
              </div>
            )}

            {/* Navigation Tabs */}
            <div className="px-6 pt-3 border-b border-slate-800 flex items-center gap-6 text-xs font-semibold overflow-x-auto no-scrollbar">
              <button
                onClick={() => setActiveTab('documents')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'documents' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Vault Documents ({selectedRoom.documents.length})
                {activeTab === 'documents' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('meetings')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'meetings' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Bilateral Meetings ({selectedRoom.meetings.length})
                {activeTab === 'meetings' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('tasks')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'tasks' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Tasks & Milestones ({selectedRoom.tasks.length})
                {activeTab === 'tasks' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'messages' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Controlled Channel ({roomMessages.length})
                {activeTab === 'messages' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`pb-3 relative transition-colors ${
                  activeTab === 'audit' ? 'text-ambc-gold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Compliance Audit Trail ({selectedRoom.auditLogs.length})
                {activeTab === 'audit' && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-ambc-gold rounded-full" />
                )}
              </button>
            </div>

            {/* Tab Contents */}
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Tab: Documents */}
              {activeTab === 'documents' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Tiered data room files protected under bilateral non-disclosure agreement.
                    </span>
                    <button
                      onClick={() => setShowNewDocModal(true)}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs text-white border border-slate-700 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5 text-ambc-gold" />
                      <span>Upload Document</span>
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {selectedRoom.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-ambc-gold shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-bold text-white truncate">{doc.title}</div>
                            <div className="text-[10px] text-slate-400 mt-0.5">
                              {doc.category} · {doc.fileSize} · Uploaded by {doc.uploadedBy}
                            </div>
                          </div>
                        </div>

                        <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono text-slate-300 border border-slate-700 shrink-0">
                          {doc.securityLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Meetings */}
              {activeTab === 'meetings' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">
                      Bilateral sessions facilitated by AGBIC Deal Desk & Kreston advisors.
                    </span>
                  </div>

                  <div className="space-y-3">
                    {selectedRoom.meetings.map((mtg) => (
                      <div
                        key={mtg.id}
                        className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-white text-sm">{mtg.title}</span>
                          <span className="px-2 py-0.5 rounded bg-amber-500/10 border border-amber-500/30 text-ambc-gold font-mono text-[10px]">
                            {mtg.type}
                          </span>
                        </div>
                        <div className="text-emerald-400 font-mono text-xs flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{mtg.dateTime}</span>
                        </div>
                        <p className="text-slate-300 leading-relaxed bg-slate-950 p-2.5 rounded border border-slate-800">
                          {mtg.agenda}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tab: Tasks */}
              {activeTab === 'tasks' && (
                <div className="space-y-3 text-xs">
                  {selectedRoom.tasks.map((tsk) => (
                    <div
                      key={tsk.id}
                      className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-slate-300"
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="checkbox"
                          checked={tsk.completed}
                          readOnly
                          className="rounded text-ambc-gold"
                        />
                        <span className={tsk.completed ? 'line-through text-slate-500' : 'text-white'}>
                          {tsk.title}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        Due: {tsk.dueDate} · {tsk.assignedTo}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab: Controlled Channel */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-ambc-gold shrink-0" />
                    <span>
                      Moderated Business Room Channel. Protected under bilateral confidentiality.
                      Contact-sharing is monitored by Chairman Gate.
                    </span>
                  </div>

                  <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                    {roomMessages.map((msg) => (
                      <div key={msg.id} className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-1">
                        <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span className="font-bold text-white">{msg.senderName} ({msg.senderCompany})</span>
                          <span>{msg.timestamp}</span>
                        </div>
                        <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                        {msg.flaggedForModeration && (
                          <div className="text-[10px] text-amber-300 bg-amber-500/10 p-1.5 rounded border border-amber-500/30">
                            ⚠ {msg.moderationReason}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Type official message inside this Business Room..."
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-ambc-gold"
                    />
                    <button
                      type="submit"
                      disabled={!chatInput.trim()}
                      className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase"
                    >
                      Send
                    </button>
                  </form>
                </div>
              )}

              {/* Tab: Audit Log */}
              {activeTab === 'audit' && (
                <div className="space-y-2 text-xs">
                  {selectedRoom.auditLogs.map((log) => (
                    <div
                      key={log.id}
                      className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between"
                    >
                      <div>
                        <div className="font-semibold text-white">{log.action}</div>
                        <div className="text-[11px] text-slate-400">{log.user}</div>
                      </div>
                      <span className="text-[10px] font-mono text-ambc-gold">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="lg:col-span-3 p-12 text-center rounded-2xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            Select a provisioned Business Room to review files and scheduled sessions.
          </div>
        )}
      </div>

      {/* NDA Modal */}
      {showNdaModal && selectedRoom && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg bg-[#0E1726] border border-amber-500/50 rounded-2xl p-6 space-y-4 text-left">
            <h3 className="text-base font-bold text-white">Execute Digital Bilateral NDA</h3>
            <p className="text-xs text-slate-300 leading-relaxed font-mono bg-slate-950 p-3 rounded border border-slate-800">
              The undersigned accredited representatives of {selectedRoom.leadParticipantA} and{' '}
              {selectedRoom.leadParticipantB} execute this non-disclosure instrument under DIFC / ICC
              arbitration rules.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNdaModal(false)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  executeBusinessRoomNda(selectedRoom.id);
                  setShowNdaModal(false);
                }}
                className="px-4 py-1.5 rounded-lg bg-gold-gradient text-slate-950 font-bold text-xs uppercase"
              >
                Confirm & Seal Digitally
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Doc Modal */}
      {showNewDocModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative w-full max-w-md bg-[#091120] border border-amber-500/40 rounded-2xl p-6 space-y-4 text-left">
            <h3 className="text-base font-bold text-white">Upload to Confidential Vault</h3>
            <form onSubmit={handleAddDoc} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1">Document Title</label>
                <input
                  type="text"
                  required
                  value={newDocTitle}
                  onChange={(e) => setNewDocTitle(e.target.value)}
                  placeholder="e.g. Legal Concession Addendum 2026.pdf"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewDocModal(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-gold-gradient text-slate-950 font-bold uppercase"
                >
                  Upload File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessRoomsView;
