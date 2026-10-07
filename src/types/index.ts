export type UserRole =
  | 'CHAIRMAN'
  | 'SUPER_ADMIN'
  | 'EXECUTIVE_SECRETARY'
  | 'DEAL_DESK_MANAGER'
  | 'DEAL_DESK_ANALYST'
  | 'PROFESSIONAL_SERVICES_MANAGER'
  | 'KRESTON_PROFESSIONAL'
  | 'COMPANY_ADMIN'
  | 'COMPANY_USER'
  | 'MEMBER'
  | 'COMPLIANCE_ADMIN'
  | 'INVESTOR'
  | 'FAMILY_OFFICE'
  | 'COMPANY'
  | 'PROJECT_OWNER'
  | 'STRATEGIC_PARTNER'
  | 'PROFESSIONAL_SERVICES'
  | 'INSTITUTIONAL_MEMBER'
  | 'ADMIN';

export type VerificationStatus =
  | 'UNVERIFIED'
  | 'IDENTITY_VERIFIED'
  | 'COMPANY_VERIFIED'
  | 'PROFESSIONALLY_VERIFIED'
  | 'AGBIC_VERIFIED'
  | 'REGULATORY_VERIFIED'
  | 'VERIFIED';

export type Sector =
  | 'Energy & Cleantech'
  | 'Oil & Gas Midstream'
  | 'Mining & Critical Minerals'
  | 'Lithium & Battery Value Chain'
  | 'Agribusiness & Commodities'
  | 'Food & Halal Logistics'
  | 'Infrastructure & Logistics'
  | 'Ports & Maritime Trade'
  | 'Technology & Software'
  | 'Fintech & Cross-Border Payments'
  | 'Manufacturing & Industrial'
  | 'Real Estate & Hospitality'
  | 'Healthcare & Biotech'
  | 'Mining'
  | 'Lithium'
  | 'Copper'
  | 'Gold'
  | 'Energy'
  | 'Oil & Gas'
  | 'Agribusiness'
  | 'Food'
  | 'Food & Beverages'
  | 'Infrastructure'
  | 'Real Estate'
  | 'Tourism'
  | 'Technology'
  | 'Technology & AI'
  | 'AI'
  | 'Fintech'
  | 'Logistics'
  | 'Logistics & Ports'
  | 'Renewable Energy'
  | 'Manufacturing';

export type RelationshipType =
  | 'Strategic Partnership'
  | 'Joint Venture'
  | 'Distribution & Representation'
  | 'Commercial Agreement'
  | 'Supplier Relationship'
  | 'Export / Import'
  | 'Manufacturing Partnership'
  | 'Licensing & Franchising'
  | 'Market Entry & Soft-Landing'
  | 'M&A / Corporate Transaction'
  | 'Technology Partnership'
  | 'Infrastructure Partnership'
  | 'Professional Services'
  | 'Other Strategic Opportunity';

export type InvestmentStructure =
  | 'Equity'
  | 'Joint Venture'
  | 'Project Finance'
  | 'Debt'
  | 'Debt / Credit'
  | 'Strategic Partnership'
  | 'Acquisition'
  | 'Distribution'
  | 'Commercial Agreement'
  | 'Offtake Agreement'
  | 'Other';

export type ProfessionalServiceType =
  | 'Market Entry'
  | 'Company Incorporation'
  | 'Tax Advisory'
  | 'Accounting & Outsourcing'
  | 'Payroll & HR'
  | 'Due Diligence'
  | 'Corporate Structuring'
  | 'Contract Structuring'
  | 'KYC & Compliance'
  | 'Financial Analysis'
  | 'Business Valuation'
  | 'M&A Advisory'
  | 'Legal Coordination'
  | 'Statutory Audit'
  | 'International Tax Structuring'
  | 'Transfer Pricing';

export type RegulatoryReviewStatus =
  | 'STANDARD_BUSINESS_OPPORTUNITY'
  | 'LEGAL_REVIEW_REQUIRED'
  | 'REGULATORY_REVIEW_REQUIRED'
  | 'RESTRICTED';

export type Country =
  | 'Argentina'
  | 'United Arab Emirates'
  | 'Saudi Arabia'
  | 'Qatar'
  | 'Kuwait'
  | 'Bahrain'
  | 'Oman';

export type ConfidentialityLevel = 'Standard' | 'Restricted' | 'Strictly Confidential' | 'Chairman Eyes Only';

export type PriorityLevel = 'Standard' | 'Medium' | 'High' | 'Executive Urgent';

export type IntroductionWorkflowStatus =
  | 'NEW'
  | 'SCREENING'
  | 'QUALIFICATION'
  | 'CHAIRMAN_REVIEW'
  | 'APPROVED'
  | 'INTRODUCTION_PREPARATION'
  | 'INTRODUCTION'
  | 'NDA'
  | 'BUSINESS_ROOM'
  | 'NEGOTIATION'
  | 'CLOSED_WON'
  | 'CLOSED_LOST';

export type IntroductionStatus = IntroductionWorkflowStatus | string;

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  title: string;
  companyName: string;
  country: Country | string;
  city: string;
  verificationStatus: VerificationStatus | string;
  bio?: string;
  sectorsOfInterest?: Sector[];
  membershipTier?: 'NETWORK' | 'BUSINESS' | 'CORPORATE' | 'GCC_DESK' | 'ENTERPRISE';
  phoneProtected?: boolean;
  websiteCategory?: string;
  onboardingCompleted: boolean;
  investmentTicketMax?: number;
  investmentStructures?: InvestmentStructure[];
  investmentTicket?: string;
  preferredCountries?: string[];
  preferredSectors?: string[];
  lookingFor?: string;
  offering?: string;
  languages?: string[];
  linkedin?: string;
  website?: string;
}

export interface BusinessOpportunity {
  id: string;
  title: string;
  name?: string;
  companyName: string;
  country: Country | string;
  location: string;
  region?: string;
  sector: Sector | string;
  relationshipType?: RelationshipType;
  investmentStructure?: InvestmentStructure | string;
  structure?: string;
  description: string;
  executiveSummary?: string;
  investmentThesis?: string;
  businessObjective?: string;
  requiredPartner?: string;
  preferredGeography?: (Country | string)[];
  estimatedScale?: string;
  investmentRequired?: string;
  investmentAmount?: string;
  timeline?: string;
  stage?: string;
  riskProfile?: string;
  expectedReturn?: string;
  rigiEligible?: boolean;
  useOfFunds?: string[];
  confidentiality?: ConfidentialityLevel | string;
  verificationStatus: VerificationStatus | string;
  regulatoryStatus?: RegulatoryReviewStatus | string;
  ndaRequired: boolean;
  publishedDate?: string;
  imageUrl: string;
  dealRoomId?: string;
  aiMatchScore?: number;
  matchScore?: number;
  matchReasons?: string[];
  recommendedServices?: ProfessionalServiceType[];
  metrics?: {
    label: string;
    value: string;
  }[];
  financials?: {
    irr?: string;
    payback?: string;
    ebitda?: string;
    revenue?: string;
  };
  keyRisks?: string[];
  questionsForManagement?: string[];
  expectedIrr?: string;
  summary?: string;
}

export type Opportunity = BusinessOpportunity;

export interface CompanyProfile {
  id: string;
  name: string;
  country: Country | string;
  city: string;
  sector: Sector | string;
  industry?: string;
  description: string;
  websiteCategory?: string;
  products?: string[];
  services?: string[];
  marketsServed?: string[];
  capabilities?: string[];
  lookingFor?: string;
  geographicInterests?: (Country | string)[];
  strategicObjectives?: string;
  companySize?: 'Small Enterprise' | 'Mid-Market' | 'Large Corporation' | 'Conglomerate' | 'Family Group' | string;
  revenueRange?: string;
  employees?: string;
  certifications?: string[];
  languages?: string[];
  businessNeeds?: string[];
  verificationStatus: VerificationStatus | string;
  logoUrl?: string;
}

export type Company = CompanyProfile;

export interface Investor {
  id: string;
  name: string;
  organization: string;
  city: string;
  country: Country | string;
  type: string;
  verificationStatus: string;
  statusText: string;
  ticketRange: string;
  aum: string;
  dealsCount: number;
  currentMandate: string;
  preferredSectors: string[];
}

export interface IntroductionRequest {
  id: string;
  opportunityId?: string;
  opportunityTitle?: string;
  requesterId: string;
  requesterName: string;
  requesterCompany: string;
  fromUserName?: string;
  fromCompany?: string;
  requesterCountry: Country | string;
  targetCompanyId?: string;
  targetCompanyName?: string;
  targetName?: string;
  targetCompany?: string;
  targetCountry: Country | string;
  sector: Sector | string;
  relationshipType?: RelationshipType;
  businessObjective?: string;
  purpose?: string;
  estimatedBusinessSize?: string;
  investmentTicketExpected?: string;
  timeframe?: string;
  requiredServices?: ProfessionalServiceType[];
  additionalComments?: string;
  message?: string;
  adminNotes?: string;
  ndaRequired?: boolean;
  confidentiality?: ConfidentialityLevel | string;
  priority?: PriorityLevel | string;
  status: IntroductionWorkflowStatus | string;
  chairmanStatus: 'PENDING' | 'APPROVED' | 'REJECTED' | 'INFO_REQUESTED' | 'ON_HOLD' | string;
  assignedExecutive?: string;
  chairmanNotes?: string;
  createdAt: string;
  updatedAt?: string;
  auditTrail?: {
    stage: IntroductionWorkflowStatus | string;
    timestamp: string;
    actor: string;
    note: string;
  }[];
}

export interface ProfessionalServicesLead {
  id: string;
  clientName: string;
  clientCompany: string;
  clientCountry: Country | string;
  service: ProfessionalServiceType;
  opportunityId?: string;
  introductionId?: string;
  estimatedFeeUsd: number;
  probability: number;
  assignedProfessional: string;
  stage: 'LEAD' | 'QUALIFIED' | 'PROPOSAL' | 'NEGOTIATION' | 'WON' | 'LOST';
  source: 'AGBIC CONNECT' | 'AMBC CONNECT';
  nextAction: string;
  proposalDraft?: string;
  createdAt: string;
  updatedAt: string;
  revenueGenerated?: number;
}

export interface BusinessRoom {
  id: string;
  opportunityId: string;
  introductionId: string;
  title: string;
  leadParticipantA: string;
  leadParticipantB: string;
  assignedAgbicCoordinator: string;
  ndaExecuted: boolean;
  status: 'ACTIVE' | 'REVIEW' | 'TERM_SHEET' | 'CLOSED';
  documents: {
    id: string;
    title: string;
    category: 'Corporate' | 'Legal' | 'Tax' | 'Financial' | 'Commercial' | 'Technical' | 'Due Diligence';
    fileSize: string;
    uploadedBy: string;
    uploadedAt: string;
    securityLevel: 'Participants Only' | 'NDA Required' | 'Deal Desk Restricted';
  }[];
  meetings: {
    id: string;
    title: string;
    type: 'Introductory' | 'Executive Deal Desk' | 'Due Diligence' | 'Kreston Tax/Legal Structuring';
    dateTime: string;
    agenda: string;
    status: 'Scheduled' | 'Completed' | 'Pending Confirmation';
  }[];
  tasks: {
    id: string;
    title: string;
    assignedTo: string;
    dueDate: string;
    completed: boolean;
  }[];
  qna: {
    id: string;
    question: string;
    askedBy: string;
    answer?: string;
    answeredBy?: string;
    timestamp: string;
  }[];
  auditLogs: {
    id: string;
    user: string;
    action: string;
    timestamp: string;
  }[];
}

export interface ControlledMessage {
  id: string;
  contextType: 'BUSINESS_ROOM' | 'INTRODUCTION' | 'DEAL_DESK';
  contextId: string;
  senderId: string;
  senderName: string;
  senderCompany: string;
  recipientCompany: string;
  text: string;
  timestamp: string;
  hasAttachment?: boolean;
  attachmentName?: string;
  flaggedForModeration?: boolean;
  moderationReason?: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
}

export interface MessageThread {
  id: string;
  partnerName: string;
  partnerRole: string;
  partnerCompany: string;
  partnerCountry: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount?: number;
  messages: MessageItem[];
}

export interface PlatformEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  city: string;
  country: Country | string;
  venue: string;
  format: 'In-Person Summit' | 'Bilateral Roundtable' | 'Virtual Business Mission' | string;
  delegationTier?: string;
  registered: boolean;
  isVipOnly?: boolean;
  speakers?: {
    name: string;
    title: string;
    org: string;
  }[];
  description: string;
  attendeesCount: number;
}

export interface MarketIntelligenceReport {
  id: string;
  title: string;
  country: Country | string;
  sector: Sector | string;
  readTime: string;
  date: string;
  summary: string;
  highlights?: string[];
  keyFigures?: { label: string; value: string }[];
  strategicTakeaways?: string[];
  krestonAdvisoryInsight?: string;
  content?: string;
}

export type MarketReport = MarketIntelligenceReport;

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  role: string;
  action: string;
  targetObject: string;
  previousValue?: string;
  newValue?: string;
  ipSession: string;
}

export interface MembershipPlan {
  id: 'NETWORK' | 'BUSINESS' | 'CORPORATE' | 'GCC_DESK' | 'ENTERPRISE';
  name: string;
  priceUsdAnnual: number;
  priceUsdQuarterly: number;
  tagline: string;
  description: string;
  features: string[];
  maxIntroductionRequestsPerMonth: number;
  businessRoomsAllowed: number;
  dealDeskSupportTier: string;
  krestonAdvisoryHoursIncluded: number;
}

export interface CrmDeal {
  id: string;
  title: string;
  dealValueUsd: number;
  companyName: string;
  country: string;
  stage: 'QUALIFIED' | 'MEETING' | 'INTRODUCTION' | 'NEGOTIATION' | 'DUE_DILIGENCE' | 'DEAL' | string;
  nextAction: string;
  tags: string[];
  owner: string;
  company?: string;
  targetInvestor?: string;
  sector?: string;
  value?: string;
  probability?: number;
  lastActivity?: string;
}

export interface DealRoom {
  id: string;
  opportunityId: string;
  title: string;
  status: 'ACTIVE' | 'ARCHIVED' | 'PENDING';
  leadInvestor: string;
  dealSize: string;
  ndaExecuted: boolean;
  members: { name: string; role: string; organization: string }[];
  documents: { id: string; name: string; category: string; size: string; status: string }[];
}
