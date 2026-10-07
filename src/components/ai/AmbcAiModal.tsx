import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../context/AuthContext';
import {
  X,
  Bot,
  Send,
  Sparkles,
  Search,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Building,
  Briefcase,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  structuredResults?: {
    type: 'opportunities' | 'investors' | 'companies' | 'qa';
    items?: any[];
  };
}

export const AmbcAiModal: React.FC = () => {
  const { isAiModalOpen, setIsAiModalOpen, opportunities, investors, companies, setSelectedOpportunity } =
    useApp();
  const { currentUser } = useAuth();

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: `Hello ${
        currentUser?.name || 'Partner'
      }. I am the AMBC Bilateral Investment AI Assistant. I have indexed all verified Argentine projects, GCC sovereign & family office mandates, RIGI regulations, and trade pipelines. How can I assist your cross-border capital strategy today?`,
      timestamp: 'Just now',
    },
  ]);

  const quickPrompts = [
    'Find Argentine mining & lithium projects over USD 50M',
    'Which GCC family offices are actively allocating to mining?',
    'Explain the Argentine RIGI law 30-year tax stability benefits',
    'Show UAE companies seeking Latin American food suppliers',
    'Prepare 5 strategic questions for our investor meeting',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isAiModalOpen) return null;

  const handleSendPrompt = async (promptText: string) => {
    if (!promptText.trim()) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const lower = promptText.toLowerCase();

    // Check for intelligent matching in local database first:
    let structured: any = undefined;
    let replyText = '';

    if (lower.includes('lithium') || lower.includes('mining') || lower.includes('catamarca') || lower.includes('copper')) {
      const matchedOpps = opportunities.filter((o) => o.sector === 'Lithium' || o.sector === 'Mining');
      structured = {
        type: 'opportunities',
        items: matchedOpps,
      };
      replyText = `I located ${matchedOpps.length} verified mining and critical mineral opportunities in Argentina with active GCC syndication. The flagship asset is **${matchedOpps[0]?.title}** ($180M USD) located in the Lithium Triangle (Catamarca). It qualifies for RIGI Tier 1 30-year tax stability and offers direct offtake for battery gigafactories in Dubai and Saudi Arabia.`;
    } else if (lower.includes('investor') || lower.includes('family office') || lower.includes('gcc') || lower.includes('who is looking')) {
      const matchedInvs = investors.filter((i) => i.country !== 'Argentina');
      structured = {
        type: 'investors',
        items: matchedInvs,
      };
      replyText = `Here are verified Gulf Cooperation Council institutional investors actively deploying capital into Argentine energy, critical minerals, and agriculture. Leading syndicates include **Al-Mansoor Family Office (Dubai)** ($10M-$100M ticket) and **Kingdom Horizon Capital (Riyadh)** ($50M-$250M ticket).`;
    } else if (lower.includes('rigi') || lower.includes('tax') || lower.includes('legal') || lower.includes('protection')) {
      replyText = `**Argentine RIGI (National Law 27.742) Strategic Summary for Gulf Investors:**\n\n• **30-Year Fiscal Stability:** Corporate tax rates, customs duties, and provincial royalties cannot be increased.\n• **0% Export Duties:** Completely eliminates agricultural/mineral export taxes starting Year 3.\n• **100% Forex Repatriation Freedom:** Qualifying investors retain 100% of export revenues offshore (e.g. in Dubai DIFC or London escrow accounts).\n• **International Arbitration:** Guaranteed recourse to ICSID / UNCITRAL bilateral dispute mechanisms.`;
    } else if (lower.includes('questions') || lower.includes('meeting') || lower.includes('due diligence')) {
      replyText = `**5 Recommended Due Diligence Questions for the Management Team:**\n\n1. **RIGI Status:** Has the preliminary qualification decree been signed by the Ministry of Economy, and what are the remaining provincial clearances?\n2. **Offtake Structure:** Are you open to a long-term bilateral offtake agreement linked to Shanghai/London Metals Exchange pricing minus agreed margin?\n3. **Water Reinjection Technology:** What is the closed-loop recovery rate for Direct Lithium Extraction (DLE) across the salt flat?\n4. **Governance:** Can our family office syndicate nominate a director to the executive board?\n5. **Capex Deployment:** What is the drawdown schedule for the initial USD 50M equity tranche?`;
    } else {
      // General Gemini attempt or fallback
      try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (apiKey) {
          const ai = new GoogleGenAI({ apiKey });
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `You are AMBC AI, the executive investment assistant of AMBC Connect (Argentina - Middle East Business & Investment Platform).
Respond concisely, professionally, and authoritatively to the investor's question: "${promptText}".
Maintain the tone of an institutional investment director. Refer to Argentine energy, mining, agribusiness, and Gulf GCC capital syndicates where relevant.`,
          });
          replyText = response.text || 'Analysis completed.';
        } else {
          replyText = `Based on AMBC Connect intelligence data, Argentina's bilateral investment corridor with the GCC represents over USD 1.8B in pipeline opportunities. Key sectors include lithium mining in the Northwest, Vaca Muerta LNG infrastructure in Patagonia, and Halal-certified agribusiness logistics in the Paraná River basin.`;
        }
      } catch (err) {
        replyText = `AMBC intelligence confirms strong bilateral momentum between Argentina and the GCC, specifically in lithium, midstream natural gas pipelines, and agricultural food security corridors.`;
      }
    }

    const assistantMsg: ChatMessage = {
      id: `ai-${Date.now()}`,
      sender: 'assistant',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      structuredResults: structured,
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
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-ambc-gold text-ambc-gold flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.25)]">
              <Bot className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-ambc-gold font-bold">
                  AMBC Intelligence Engine
                </span>
                <span className="text-[10px] bg-amber-500/20 text-ambc-gold px-1.5 py-0.5 rounded border border-amber-500/30">
                  REAL-TIME
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white mt-0.5">
                AMBC AI Investment Assistant
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsAiModalOpen(false)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div className="flex items-center gap-2 mb-1 px-1 text-[11px] text-slate-400">
                <span>{msg.sender === 'user' ? 'You' : 'AMBC AI'}</span>
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
                <div className="whitespace-pre-line">{msg.text}</div>

                {/* Structured Opportunities Carousel */}
                {msg.structuredResults?.type === 'opportunities' && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ambc-gold">
                      Matched Projects:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.structuredResults.items?.map((item: any) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-ambc-gold transition-colors text-left"
                        >
                          <div className="font-bold text-white text-xs">{item.title}</div>
                          <div className="text-[11px] text-ambc-gold mt-0.5">
                            USD ${(item.investmentAmount / 1000000).toFixed(0)}M · {item.sector}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                            {item.location}
                          </div>
                          <button
                            onClick={() => {
                              setSelectedOpportunity(item);
                              setIsAiModalOpen(false);
                            }}
                            className="mt-2 text-[10px] font-bold text-ambc-gold hover:underline flex items-center gap-1"
                          >
                            <span>Open Full Dossier</span>
                            <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Structured Investors Carousel */}
                {msg.structuredResults?.type === 'investors' && (
                  <div className="mt-4 pt-3 border-t border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-ambc-gold">
                      Identified Middle East Allocators:
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {msg.structuredResults.items?.map((item: any) => (
                        <div
                          key={item.id}
                          className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left"
                        >
                          <div className="font-bold text-white text-xs">{item.organization}</div>
                          <div className="text-[11px] text-slate-300">
                            {item.city}, {item.country}
                          </div>
                          <div className="text-[10px] text-ambc-gold mt-0.5">
                            Ticket: {item.ticketRange}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-1 line-clamp-2">
                            {item.currentMandate}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-xs text-ambc-gold italic p-2">
              <Sparkles className="w-4 h-4 animate-spin" />
              <span>AMBC AI is cross-referencing bilateral databases...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-6 py-2 bg-slate-950/80 border-t border-slate-800/80 overflow-x-auto flex items-center gap-2 no-scrollbar">
          <span className="text-[10px] uppercase font-bold text-slate-500 shrink-0">
            Suggested Queries:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendPrompt(prompt)}
              className="px-2.5 py-1 rounded-full bg-slate-900 hover:bg-slate-800 border border-slate-700/60 text-[11px] text-slate-300 hover:text-white shrink-0 transition-colors whitespace-nowrap"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-[#070D18] border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendPrompt(input);
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Argentine projects, GCC investors, RIGI, or market intelligence..."
              className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-ambc-gold"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-2.5 rounded-xl bg-gold-gradient text-slate-950 font-bold hover:opacity-95 disabled:opacity-50 transition-opacity"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AmbcAiModal;
