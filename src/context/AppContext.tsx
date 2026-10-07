import React, { createContext, useContext, useState } from 'react';
import {
  BusinessOpportunity,
  CompanyProfile,
  IntroductionRequest,
  ProfessionalServicesLead,
  BusinessRoom,
  ControlledMessage,
  PlatformEvent,
  MarketIntelligenceReport,
  AuditLogEntry,
  MembershipPlan,
  IntroductionWorkflowStatus,
  ProfessionalServiceType,
  Investor,
  MessageThread,
  CrmDeal,
} from '../types';
import {
  INITIAL_OPPORTUNITIES,
  INITIAL_COMPANIES,
  INITIAL_INTRODUCTIONS,
  INITIAL_KRESTON_LEADS,
  INITIAL_BUSINESS_ROOMS,
  INITIAL_CONTROLLED_MESSAGES,
  INITIAL_AUDIT_LOGS,
  MEMBERSHIP_PLANS,
  INITIAL_EVENTS,
  INITIAL_MARKET_REPORTS,
  INITIAL_INVESTORS,
  INITIAL_MESSAGE_THREADS,
  INITIAL_CRM_DEALS,
} from '../data/mockData';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'chairman_gate' | 'deal_desk' | 'business_room' | 'kreston' | 'compliance';
}

interface AppContextType {
  opportunities: BusinessOpportunity[];
  companies: CompanyProfile[];
  investors: Investor[];
  introductions: IntroductionRequest[];
  krestonLeads: ProfessionalServicesLead[];
  businessRooms: BusinessRoom[];
  messages: any[];
  controlledMessages: ControlledMessage[];
  messageThreads: MessageThread[];
  auditLogs: AuditLogEntry[];
  events: PlatformEvent[];
  reports: MarketIntelligenceReport[];
  membershipPlans: MembershipPlan[];
  notifications: NotificationItem[];
  savedOpportunityIds: string[];

  // Interactive Actions
  toggleSaveOpportunity: (id: string) => void;
  toggleEventRegistration: (id: string) => void;
  updateIntroductionStatus: (id: string, status: any, notes?: string) => void;
  sendMessage: (threadId: string, text: string) => void;
  submitIntroductionRequest: (data: Omit<IntroductionRequest, 'id' | 'createdAt' | 'updatedAt' | 'auditTrail' | 'status' | 'chairmanStatus' | 'assignedExecutive'>) => string;
  chairmanDecision: (introId: string, decision: 'APPROVE' | 'REJECT' | 'REQUEST_MORE_INFO' | 'HOLD', notes?: string) => void;
  advanceIntroductionStage: (introId: string, nextStage: IntroductionWorkflowStatus, note?: string) => void;
  createProfessionalServicesLead: (lead: Omit<ProfessionalServicesLead, 'id' | 'createdAt' | 'updatedAt' | 'source'>) => string;
  updateKrestonLeadStage: (leadId: string, stage: ProfessionalServicesLead['stage']) => void;
  executeBusinessRoomNda: (roomId: string) => void;
  addBusinessRoomDocument: (roomId: string, title: string, category: any) => void;
  addBusinessRoomMeeting: (roomId: string, title: string, type: any, dateTime: string, agenda: string) => void;
  sendControlledMessage: (contextId: string, text: string, senderName: string, senderCompany: string) => boolean;
  markNotificationsAsRead: () => void;

  // Active Modals & View States
  selectedOpportunity: BusinessOpportunity | null;
  setSelectedOpportunity: (opp: BusinessOpportunity | null) => void;
  briefModalOpportunity: BusinessOpportunity | null;
  setBriefModalOpportunity: (opp: BusinessOpportunity | null) => void;
  introModalTarget: { id: string; name: string; country: any; sector: any; opportunityId?: string } | null;
  setIntroModalTarget: (target: any) => void;
  activeBusinessRoom: BusinessRoom | null;
  setActiveBusinessRoom: (room: BusinessRoom | null) => void;
  isAiChairmanAssistantOpen: boolean;
  setIsAiChairmanAssistantOpen: (open: boolean) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  krestonLeadModalTarget: BusinessOpportunity | null;
  setKrestonLeadModalTarget: (opp: BusinessOpportunity | null) => void;
  crmDeals: CrmDeal[];
  updateCrmStage: (dealId: string, nextStage: any) => void;
  dealRooms: BusinessRoom[];
  activeDealRoom: BusinessRoom | null;
  setActiveDealRoom: (room: BusinessRoom | null) => void;
  signDealRoomNda: (roomId: string) => void;
  isAiModalOpen: boolean;
  setIsAiModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [opportunities] = useState<BusinessOpportunity[]>(INITIAL_OPPORTUNITIES);
  const [companies] = useState<CompanyProfile[]>(INITIAL_COMPANIES);
  const [investors, setInvestors] = useState<Investor[]>(INITIAL_INVESTORS);
  const [introductions, setIntroductions] = useState<IntroductionRequest[]>(INITIAL_INTRODUCTIONS);
  const [krestonLeads, setKrestonLeads] = useState<ProfessionalServicesLead[]>(INITIAL_KRESTON_LEADS);
  const [businessRooms, setBusinessRooms] = useState<BusinessRoom[]>(INITIAL_BUSINESS_ROOMS);
  const [controlledMessages, setControlledMessages] = useState<ControlledMessage[]>(INITIAL_CONTROLLED_MESSAGES);
  const [threads, setThreads] = useState<MessageThread[]>(INITIAL_MESSAGE_THREADS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [events, setEvents] = useState<PlatformEvent[]>(INITIAL_EVENTS);
  const [reports] = useState<MarketIntelligenceReport[]>(INITIAL_MARKET_REPORTS);
  const [membershipPlans] = useState<MembershipPlan[]>(MEMBERSHIP_PLANS);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState<string[]>(['AGBIC-OPP-000001']);
  const [crmDeals, setCrmDeals] = useState<CrmDeal[]>(INITIAL_CRM_DEALS);

  const updateCrmStage = (dealId: string, nextStage: any) => {
    setCrmDeals((prev) =>
      prev.map((deal) => (deal.id === dealId ? { ...deal, stage: nextStage } : deal))
    );
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'notif-1',
      title: 'Chairman Gate™ Approval Required',
      message: 'New $75M Lithium JV request from Gulf Industrial awaiting Chairman Gabriel Raed review.',
      time: '12m ago',
      read: false,
      type: 'chairman_gate',
    },
    {
      id: 'notif-2',
      title: 'Kreston Advisory Lead Created',
      message: 'Market-entry proposal PSL-000001 dispatched to Gulf Industrial Holdings.',
      time: '1h ago',
      read: false,
      type: 'kreston',
    },
    {
      id: 'notif-3',
      title: 'Business Room Provisioned',
      message: 'Room BR-000001 activated with bilateral NDA execution.',
      time: '1d ago',
      read: true,
      type: 'business_room',
    },
  ]);

  // Modal States
  const [selectedOpportunity, setSelectedOpportunity] = useState<BusinessOpportunity | null>(null);
  const [briefModalOpportunity, setBriefModalOpportunity] = useState<BusinessOpportunity | null>(null);
  const [introModalTarget, setIntroModalTarget] = useState<any | null>(null);
  const [activeBusinessRoom, setActiveBusinessRoom] = useState<BusinessRoom | null>(null);
  const [isAiChairmanAssistantOpen, setIsAiChairmanAssistantOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [krestonLeadModalTarget, setKrestonLeadModalTarget] = useState<BusinessOpportunity | null>(null);

  const toggleSaveOpportunity = (id: string) => {
    setSavedOpportunityIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleEventRegistration = (eventId: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === eventId ? { ...e, registered: !e.registered } : e))
    );
  };

  const updateIntroductionStatus = (introId: string, status: any, notes?: string) => {
    setIntroductions((prev) =>
      prev.map((intro) =>
        intro.id === introId
          ? {
              ...intro,
              status,
              chairmanNotes: notes || intro.chairmanNotes,
              adminNotes: notes || intro.adminNotes,
            }
          : intro
      )
    );
  };

  const sendMessage = (threadId: string, text: string) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      senderId: 'user_ahmed',
      senderName: 'Ahmed Al-Mansoor',
      text,
      timestamp: 'Just now',
    };
    setThreads((prev) =>
      prev.map((th) => {
        if (th.id === threadId) {
          return {
            ...th,
            lastMessage: text,
            lastMessageTime: 'Just now',
            messages: [...th.messages, newMsg],
          };
        }
        return th;
      })
    );
  };

  const addAuditLog = (action: string, target: string, prevVal?: string, newVal?: string) => {
    const newEntry: AuditLogEntry = {
      id: `AUD-${Date.now().toString().slice(-4)}`,
      timestamp: `${new Date().toISOString().replace('T', ' ').slice(0, 19)} ART`,
      user: 'Current User [Session Verified]',
      role: 'DEAL_DESK_OPERATIONS',
      action,
      targetObject: target,
      previousValue: prevVal,
      newValue: newVal,
      ipSession: '181.47.12.90 [E-Gov Verified Gateway]',
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const submitIntroductionRequest = (
    data: Omit<IntroductionRequest, 'id' | 'createdAt' | 'updatedAt' | 'auditTrail' | 'status' | 'chairmanStatus' | 'assignedExecutive'>
  ) => {
    const id = `AGBIC-REQ-${(introductions.length + 1).toString().padStart(6, '0')}`;
    const newReq: IntroductionRequest = {
      ...data,
      id,
      status: 'NEW',
      chairmanStatus: 'PENDING',
      assignedExecutive: 'Sofia Al-Rashid (Deal Desk Manager)',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      auditTrail: [
        {
          stage: 'NEW',
          timestamp: `${new Date().toLocaleTimeString()} ART`,
          actor: data.requesterName,
          note: 'Submitted via Chairman Gate portal.',
        },
      ],
    };

    setIntroductions((prev) => [newReq, ...prev]);
    addAuditLog('SUBMIT_INTRODUCTION_REQUEST', id, 'NONE', 'NEW');

    // Auto-create Kreston Advisory Lead if services requested!
    if (data.requiredServices && data.requiredServices.length > 0) {
      createProfessionalServicesLead({
        clientName: data.requesterName,
        clientCompany: data.requesterCompany,
        clientCountry: data.requesterCountry,
        service: data.requiredServices[0],
        opportunityId: data.opportunityId,
        introductionId: id,
        estimatedFeeUsd: 45000,
        probability: 70,
        assignedProfessional: 'Dr. Gabriel Raed (Castillo & Asociados – Kreston Argentina)',
        stage: 'QUALIFIED',
        nextAction: 'Prepare comprehensive market-entry & tax structuring engagement memorandum.',
      });
    }

    setNotifications((prev) => [
      {
        id: `notif-${Date.now()}`,
        title: 'Introduction Dispatched to Deal Desk',
        message: `Request for ${data.targetCompanyName} entered Chairman Gate screening.`,
        time: 'Just now',
        read: false,
        type: 'deal_desk',
      },
      ...prev,
    ]);

    return id;
  };

  const chairmanDecision = (
    introId: string,
    decision: 'APPROVE' | 'REJECT' | 'REQUEST_MORE_INFO' | 'HOLD',
    notes?: string
  ) => {
    setIntroductions((prev) =>
      prev.map((req) => {
        if (req.id === introId) {
          const nextWorkflowStatus: IntroductionWorkflowStatus =
            decision === 'APPROVE'
              ? 'APPROVED'
              : decision === 'REJECT'
              ? 'CLOSED_LOST'
              : 'CHAIRMAN_REVIEW';

          const nextChairmanStatus =
            decision === 'APPROVE'
              ? 'APPROVED'
              : decision === 'REJECT'
              ? 'REJECTED'
              : decision === 'REQUEST_MORE_INFO'
              ? 'INFO_REQUESTED'
              : 'ON_HOLD';

          addAuditLog(
            `CHAIRMAN_GATE_${decision}`,
            introId,
            req.chairmanStatus,
            nextChairmanStatus
          );

          return {
            ...req,
            status: nextWorkflowStatus,
            chairmanStatus: nextChairmanStatus,
            chairmanNotes: notes || req.chairmanNotes,
            updatedAt: new Date().toISOString().split('T')[0],
            auditTrail: [
              ...(req.auditTrail || []),
              {
                stage: nextWorkflowStatus,
                timestamp: `${new Date().toLocaleTimeString()} ART`,
                actor: 'Gabriel Raed (Chairman)',
                note: notes || `Chairman decision: ${decision}`,
              },
            ],
          };
        }
        return req;
      })
    );
  };

  const advanceIntroductionStage = (
    introId: string,
    nextStage: IntroductionWorkflowStatus,
    note?: string
  ) => {
    setIntroductions((prev) =>
      prev.map((req) => {
        if (req.id === introId) {
          addAuditLog('ADVANCE_WORKFLOW_STAGE', introId, req.status, nextStage);

          // If stage moved to BUSINESS_ROOM, auto-provision Business Room if none exists!
          if (nextStage === 'BUSINESS_ROOM') {
            const existingRoom = businessRooms.find((br) => br.introductionId === introId);
            if (!existingRoom) {
              const newRoomId = `BR-${(businessRooms.length + 1).toString().padStart(6, '0')}`;
              const targetName = req.targetCompanyName || req.targetCompany || req.targetName || 'Target Entity';
              const reqName = req.requesterCompany || 'Requester Entity';
              const newRoom: BusinessRoom = {
                id: newRoomId,
                opportunityId: req.opportunityId || 'AGBIC-OPP-GEN',
                introductionId: req.id,
                title: `${reqName} ↔ ${targetName} Strategic Room`,
                leadParticipantA: targetName,
                leadParticipantB: reqName,
                assignedAgbicCoordinator: 'Sofia Al-Rashid (Executive Deal Desk)',
                ndaExecuted: true,
                status: 'ACTIVE',
                documents: [],
                meetings: [],
                tasks: [],
                qna: [],
                auditLogs: [
                  {
                    id: `LOG-${Date.now()}`,
                    user: 'Sofia Al-Rashid',
                    action: 'Provisioned Business Room following workflow clearance.',
                    timestamp: `${new Date().toLocaleDateString()}`,
                  },
                ],
              };
              setBusinessRooms((rooms) => [newRoom, ...rooms]);
            }
          }

          return {
            ...req,
            status: nextStage,
            updatedAt: new Date().toISOString().split('T')[0],
            auditTrail: [
              ...(req.auditTrail || []),
              {
                stage: nextStage,
                timestamp: `${new Date().toLocaleTimeString()} ART`,
                actor: 'Sofia Al-Rashid (Deal Desk Manager)',
                note: note || `Stage updated to ${nextStage}`,
              },
            ],
          };
        }
        return req;
      })
    );
  };

  const createProfessionalServicesLead = (
    lead: Omit<ProfessionalServicesLead, 'id' | 'createdAt' | 'updatedAt' | 'source'>
  ) => {
    const id = `PSL-${(krestonLeads.length + 1).toString().padStart(6, '0')}`;
    const newLead: ProfessionalServicesLead = {
      ...lead,
      id,
      source: 'AGBIC CONNECT',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    setKrestonLeads((prev) => [newLead, ...prev]);
    addAuditLog('CREATE_KRESTON_ADVISORY_LEAD', id, 'NONE', lead.service);
    return id;
  };

  const updateKrestonLeadStage = (
    leadId: string,
    stage: ProfessionalServicesLead['stage']
  ) => {
    setKrestonLeads((prev) =>
      prev.map((lead) => {
        if (lead.id === leadId) {
          const rev = stage === 'WON' ? lead.estimatedFeeUsd : lead.revenueGenerated;
          addAuditLog('UPDATE_KRESTON_LEAD_STAGE', leadId, lead.stage, stage);
          return {
            ...lead,
            stage,
            revenueGenerated: rev,
            updatedAt: new Date().toISOString().split('T')[0],
          };
        }
        return lead;
      })
    );
  };

  const executeBusinessRoomNda = (roomId: string) => {
    setBusinessRooms((prev) =>
      prev.map((br) => {
        if (br.id === roomId) {
          addAuditLog('EXECUTE_BUSINESS_ROOM_NDA', roomId, 'FALSE', 'TRUE');
          return {
            ...br,
            ndaExecuted: true,
            auditLogs: [
              {
                id: `LOG-${Date.now()}`,
                user: 'Accredited Signatory (Digital Cryptographic Seal)',
                action: 'Bilateral NDA executed under DIFC arbitration jurisdiction.',
                timestamp: `${new Date().toLocaleString()}`,
              },
              ...br.auditLogs,
            ],
          };
        }
        return br;
      })
    );

    if (activeBusinessRoom && activeBusinessRoom.id === roomId) {
      setActiveBusinessRoom((prev) => (prev ? { ...prev, ndaExecuted: true } : null));
    }
  };

  const addBusinessRoomDocument = (roomId: string, title: string, category: any) => {
    setBusinessRooms((prev) =>
      prev.map((br) => {
        if (br.id === roomId) {
          const newDoc = {
            id: `DOC-${Date.now().toString().slice(-4)}`,
            title,
            category,
            fileSize: '14.2 MB',
            uploadedBy: 'Castillo & Asociados – Kreston Argentina',
            uploadedAt: new Date().toISOString().split('T')[0],
            securityLevel: 'Participants Only' as const,
          };
          return {
            ...br,
            documents: [newDoc, ...br.documents],
            auditLogs: [
              {
                id: `LOG-${Date.now()}`,
                user: 'Castillo & Asociados – Kreston',
                action: `Uploaded ${title} to Business Room repository.`,
                timestamp: `${new Date().toLocaleString()}`,
              },
              ...br.auditLogs,
            ],
          };
        }
        return br;
      })
    );
  };

  const addBusinessRoomMeeting = (
    roomId: string,
    title: string,
    type: any,
    dateTime: string,
    agenda: string
  ) => {
    setBusinessRooms((prev) =>
      prev.map((br) => {
        if (br.id === roomId) {
          const newMtg = {
            id: `MTG-${Date.now().toString().slice(-4)}`,
            title,
            type,
            dateTime,
            agenda,
            status: 'Scheduled' as const,
          };
          return {
            ...br,
            meetings: [newMtg, ...br.meetings],
            auditLogs: [
              {
                id: `LOG-${Date.now()}`,
                user: 'AGBIC Executive Deal Desk',
                action: `Scheduled meeting: ${title}`,
                timestamp: `${new Date().toLocaleString()}`,
              },
              ...br.auditLogs,
            ],
          };
        }
        return br;
      })
    );
  };

  const sendControlledMessage = (
    contextId: string,
    text: string,
    senderName: string,
    senderCompany: string
  ) => {
    // ANTI-BYPASS FILTER: Detect attempts to exchange raw phone numbers, WhatsApp, or email addresses
    const bypassRegex = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})|(\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})|whatsapp|phone|cell|call me at/i;
    const hasBypassAttempt = bypassRegex.test(text);

    const newMsg: ControlledMessage = {
      id: `MSG-${Date.now()}`,
      contextType: 'BUSINESS_ROOM',
      contextId,
      senderId: 'current_user',
      senderName,
      senderCompany,
      recipientCompany: 'Business Room Counterpart',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      flaggedForModeration: hasBypassAttempt,
      moderationReason: hasBypassAttempt
        ? 'Flagged by Chairman Gate: direct contact exchange detected. All introductions must proceed through the AGBIC Deal Desk.'
        : undefined,
    };

    setControlledMessages((prev) => [...prev, newMsg]);

    if (hasBypassAttempt) {
      addAuditLog(
        'ANTI_BYPASS_VIOLATION_FLAGGED',
        contextId,
        'NORMAL',
        'CONTACT_EXCHANGE_ATTEMPT'
      );
    }

    return !hasBypassAttempt;
  };

  const markNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  return (
    <AppContext.Provider
      value={{
        opportunities,
        companies,
        investors,
        introductions,
        krestonLeads,
        businessRooms,
        messages: threads as any,
        controlledMessages,
        messageThreads: threads,
        auditLogs,
        events,
        reports,
        membershipPlans,
        notifications,
        savedOpportunityIds,
        toggleSaveOpportunity,
        toggleEventRegistration,
        updateIntroductionStatus,
        sendMessage,
        submitIntroductionRequest,
        chairmanDecision,
        advanceIntroductionStage,
        createProfessionalServicesLead,
        updateKrestonLeadStage,
        executeBusinessRoomNda,
        addBusinessRoomDocument,
        addBusinessRoomMeeting,
        sendControlledMessage,
        markNotificationsAsRead,
        selectedOpportunity,
        setSelectedOpportunity,
        briefModalOpportunity,
        setBriefModalOpportunity,
        introModalTarget,
        setIntroModalTarget,
        activeBusinessRoom,
        setActiveBusinessRoom,
        isAiChairmanAssistantOpen,
        setIsAiChairmanAssistantOpen,
        isSearchModalOpen,
        setIsSearchModalOpen,
        krestonLeadModalTarget,
        setKrestonLeadModalTarget,
        crmDeals,
        updateCrmStage,
        dealRooms: businessRooms,
        activeDealRoom: activeBusinessRoom,
        setActiveDealRoom: setActiveBusinessRoom,
        signDealRoomNda: executeBusinessRoomNda,
        isAiModalOpen: isAiChairmanAssistantOpen,
        setIsAiModalOpen: setIsAiChairmanAssistantOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
