import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  MessageSquare,
  Search,
  Send,
  Paperclip,
  ShieldCheck,
  FileText,
  Lock,
  CheckCheck,
} from 'lucide-react';

export const MessagingView: React.FC = () => {
  const { messages, sendMessage } = useApp();
  const { currentUser } = useAuth();

  const [activeThreadId, setActiveThreadId] = useState(messages[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const [search, setSearch] = useState('');

  const activeThread = messages.find((t) => t.id === activeThreadId) || messages[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeThread) return;
    sendMessage(activeThread.id, inputText);
    setInputText('');
  };

  return (
    <div className="h-[calc(100vh-180px)] min-h-[580px] rounded-2xl border border-slate-800 bg-[#091120] overflow-hidden flex flex-col md:flex-row text-left shadow-2xl animate-in fade-in duration-300">
      {/* Threads Sidebar */}
      <div className="w-full md:w-80 border-r border-slate-800 flex flex-col bg-[#070D18]">
        {/* Search Threads */}
        <div className="p-3 border-b border-slate-800">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-lg text-xs text-white focus:outline-none focus:border-ambc-gold"
            />
          </div>
        </div>

        {/* Threads List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
          {messages.map((thread) => {
            const isActive = thread.id === activeThreadId;
            return (
              <button
                key={thread.id}
                onClick={() => setActiveThreadId(thread.id)}
                className={`w-full p-4 text-left transition-colors flex items-start gap-3 ${
                  isActive ? 'bg-amber-500/10 border-l-2 border-ambc-gold' : 'hover:bg-slate-900'
                }`}
              >
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-ambc-gold/30 flex items-center justify-center text-ambc-gold font-bold text-xs shrink-0">
                  {thread.partnerName.charAt(0)}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">
                      {thread.partnerName}
                    </span>
                    <span className="text-[10px] text-slate-400">{thread.lastMessageTime}</span>
                  </div>

                  <div className="text-[11px] text-ambc-gold truncate mt-0.5">
                    {thread.partnerCompany}
                  </div>

                  <div className="text-[11px] text-slate-400 truncate mt-1">
                    {thread.lastMessage}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Privacy Note */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-[10px] text-slate-500 flex items-center gap-1.5">
          <Lock className="w-3.5 h-3.5 text-ambc-gold shrink-0" />
          <span>Private institutional channel protected by bilateral confidentiality protocols.</span>
        </div>
      </div>

      {/* Active Conversation Pane */}
      {activeThread ? (
        <div className="flex-1 flex flex-col bg-[#091120]">
          {/* Thread Header */}
          <div className="px-6 py-3.5 border-b border-slate-800 bg-[#070D18] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-amber-500/15 border border-ambc-gold/40 flex items-center justify-center text-ambc-gold font-bold text-xs">
                {activeThread.partnerName.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{activeThread.partnerName}</div>
                <div className="text-[11px] text-slate-400">
                  {activeThread.partnerRole} · {activeThread.partnerCompany} ({activeThread.partnerCountry})
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Identity Verified</span>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {(activeThread.messages || []).map((msg: any) => {
              const isMe = msg.senderId === 'user_ahmed';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-lg p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                      isMe
                        ? 'bg-amber-500/20 text-white border border-ambc-gold/40'
                        : 'bg-slate-900 text-slate-200 border border-slate-800'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {msg.attachmentName && (
                      <div className="p-2 rounded bg-black/40 border border-slate-700 text-[11px] flex items-center gap-2 text-ambc-gold">
                        <FileText className="w-3.5 h-3.5" />
                        <span className="truncate">{msg.attachmentName}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-end gap-1 text-[9px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3 h-3 text-ambc-gold" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <div className="p-4 border-t border-slate-800 bg-[#070D18]">
            <form onSubmit={handleSend} className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white"
                title="Attach Document"
              >
                <Paperclip className="w-4 h-4" />
              </button>

              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your confidential response..."
                className="flex-1 px-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-ambc-gold"
              />

              <button
                type="submit"
                disabled={!inputText.trim()}
                className="px-4 py-2 rounded-xl bg-gold-gradient text-slate-950 font-bold text-xs uppercase tracking-wider hover:opacity-95 disabled:opacity-50 flex items-center gap-1.5 shadow"
              >
                <Send className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-xs text-slate-500">
          Select a conversation from the sidebar to inspect bilateral communications.
        </div>
      )}
    </div>
  );
};

export default MessagingView;
