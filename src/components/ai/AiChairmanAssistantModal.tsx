import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Bot,
  Send,
  Sparkles,
  ShieldCheck,
  FileText,
  Briefcase,
  CheckCircle,
  HelpCircle,
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface AssistantMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
}

export const AiChairmanAssistantModal: React.FC = () => {
  const {
    isAiChairmanAssistantOpen,
    setIsAiChairmanAssistantOpen,
    opportunities,
    companies,
    introductions,
    krestonLeads,
  } = useApp();
  const { currentUser } = useAuth();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Greetings ${
        currentUser?.name || 'Council Officer'
      }. I am the AGBIC Deal Desk & Chairman Gate™ AI Assistant. I have indexed all accredited Argentine and GCC company profiles, active introductions, and Castillo & Asociados – Kreston advisory scopes. How can I prepare your strategic briefing today?`,
      timestamp: 'Just now',
    },
  ]);

  if (!isAiChairmanAssistantOpen) return null;

  const quickPrompts = [
    'Generate Chairman Briefing for Lithium JV (AGBIC-REQ-000001)',
    'Prepare Due Diligence Checklist for Argentine Agribusiness',
    'Scope Kreston Market-Entry Services for Gulf Conglomerate',
    'Draft Bilateral Meeting Agenda for Dubai Executive Session',
    'Verify CNV Regulatory Compliance on Vaca Muerta Gas Offtake',
  ];

  const handleSend = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: AssistantMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const lower = promptText.toLowerCase();
    let reply = '';

    if (lower.includes('lithium') || lower.includes('briefing') || lower.includes('req-000001')) {
      reply = `**CHAIRMAN GATE™ EXECUTIVE BRIEFING: AGBIC-REQ-000001**\n\n• **Parties:** Catamarca Lithium Resources S.A. (Argentina) ↔ Gulf Industrial & Energy Holdings (UAE).\n• **Transaction:** Strategic Joint Venture for Direct Lithium Extraction (DLE) facility ($180M scale).\n• **Bilateral Strategic Value:** Direct critical mineral offtake for UAE battery manufacturing clusters.\n• **RIGI Qualification:** Approved Tier 1 (30-year fiscal stability, 0% export withholdings after Year 3, 100% offshore forex availability).\n• **Kreston Advisory Scope:** Lead partner Dr. Gabriel Raed assigned for UAE-Argentina double taxation structuring and DIFC joint venture holding formulation.\n• **Recommendation:** Cleared for Chairman Approval and Business Room activation.`;
    } else if (lower.includes('checklist') || lower.includes('due diligence')) {
      reply = `**AGBIC STRATEGIC DUE DILIGENCE CHECKLIST (ARGENTINE MARKET ENTRY):**\n\n1. **Corporate Standing:** Certificate of good standing from Argentine IGJ / Provincial Registry.\n2. **Concession & Title:** Verification of provincial subsoil rights, mining leases, or river port concessions.\n3. **Environmental Compliance:** Review of ESIA permits and closed-loop water reinjection hydrologic modeling.\n4. **RIGI Status:** Ministry of Economy preliminary approval decree and provincial tax adhesion.\n5. **Offtake & Commercial Contracts:** Take-or-pay shipper agreements under international arbitration.\n6. **Kreston Tax Due Diligence:** Transfer pricing risk audit, payroll withholding, and dividend tax modeling.`;
    } else if (lower.includes('kreston') || lower.includes('market entry') || lower.includes('scope')) {
      reply = `**CASTILLO & ASOCIADOS – KRESTON ARGENTINA SERVICE SCOPING MEMO:**\n\nFor Gulf companies entering Argentina, the recommended service suite comprises:\n• **Phase 1 (Incorporation):** S.A. / S.R.L. company formation, local legal representative appointment, and CUIT tax registration.\n• **Phase 2 (Tax & RIGI):** International holding structuring (UAE DIFC ↔ Argentine operating co) to optimize the bilateral tax treaty and secure 30-year RIGI stability.\n• **Phase 3 (Ongoing Compliance):** Statutory financial audit, outsourced accounting, and local payroll processing.`;
    } else {
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are the AI Deal Desk Assistant for the Argentina–GCC Business & Investment Council (AGBIC).
Answer concisely and authoritatively from an executive relationship management perspective: "${promptText}".
Do NOT provide regulated securities advice or investment solicitation. Focus on strategic partnerships, market entry, and professional services coordination (Castillo & Asociados – Kreston Argentina).`,
          });
          reply = response.text || 'Briefing generated.';
        } else {
          reply = `AGBIC Council analysis confirms strong bilateral synergy between Argentine resource operators and Gulf industrial conglomerates under Chairman Gate governance.`;
        }
      } catch (err) {
        reply = `AGBIC Deal Desk analysis confirms strategic commercial fit. All bilateral engagements must proceed through the controlled Business Room environment under bilateral NDA.`;
      }
    }

    const assistantMsg: AssistantMessage = {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: reply,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, assistantMsg]);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#091120] border border-amber-500/40 rounded-2xl shadow-2xl overflow-hidden my-4 max-h-[92vh] flex flex-col text-left">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 bg-[#070D18] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-ambc-gold text-ambc-gold flex items-center justify-center shadow">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ambc-gold font-bold">
                  AGBIC Executive Operations
                </span>
                <span className="text-[10px] bg-amber-500/20 text-ambc-gold px-1.5 py-0.5 rounded font-mono">
                  CHAIRMAN GATE AI
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white mt-0.5">
                AI Deal Desk & Chairman Assistant
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAiChairmanAssistantOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-slate-400">
                <span>{msg.sender === 'user' ? 'You' : 'Deal Desk AI'}</span>
                <span>·</span>
                <span>{msg.timestamp}</span>
              </div>
              <div
                className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed ${
                  msg.sender === 'user'
                    ? 'bg-amber-500/15 text-white border border-ambc-gold/40'
                    : 'bg-slate-900/90 text-slate-200 border border-slate-800'
                }`}
              >
                <div className="whitespace-pre-line font-sans">{msg.text}</div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-ambc-gold italic p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>Synthesizing bilateral relationship intelligence...</span>
            </div>
          )}
        </div>

        {/* Suggested Queries */}
        <div className="px-6 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
            Quick Briefings:
          </span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-[11px] text-slate-300 hover:text-white shrink-0 transition-colors whitespace-nowrap"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-[#070D18] border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for an executive briefing, due diligence checklist, or Kreston advisory scope..."
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-ambc-gold"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold hover:opacity-95 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AiChairmanAssistantModal;
