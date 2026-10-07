# AMBC CONNECT — Argentina & Middle East Business & Investment Platform

> **“Connecting Capital, Opportunities & People”**  
> **“Opportunities Without Borders” · فرص بلا حدود**

AMBC Connect is a private institutional SaaS web platform connecting Argentine companies, natural resource projects, and industrial leaders with sovereign wealth funds, family offices, and corporate investors across the United Arab Emirates (Dubai, Abu Dhabi), the Kingdom of Saudi Arabia (Riyadh), Qatar (Doha), and Kuwait.

---

## 1. Visual Identity & Brand Constitution

AMBC Connect is designed around an institutional aesthetic reflecting high-level sovereign capital, DIFC/KAFD financial ecosystems, and Argentine resource basins:
- **Emblem:** 8-pointed geometric gold compass rosette / star representing bilateral direction and global opportunities.
- **Palette:** Deep Navy (`#070D18`), Midnight Blue (`#091120`), Refined Gold (`#C5A059`, `#DFBA73`), Crisp White, with subtle desert tones and emerald verification accents.
- **Typography:** *Cinzel* for majestic institutional titles, *Plus Jakarta Sans* for clean financial data grids, and *Tajawal* for high-legibility Arabic RTL typography.
- **Zero-Pill Restraint:** Clean unboxed metadata, crisp borders, and subtle typographic separators.

---

## 2. Core Functional Modules

1. **Multilingual Architecture:**
   - English (Default)
   - Spanish (Español)
   - Arabic (العربية with native RTL layout support)
   - Dynamic real-time switching without page reload.

2. **Investment Opportunities Marketplace:**
   - Screened projects in Lithium, Copper, Oil & Gas (Vaca Muerta), Agribusiness (Paraná River), Renewable Energy, and Technology.
   - Comprehensive filters (Sector, Country, Stage, Structure, RIGI eligibility, Verification status).
   - Detailed Investment Dossier with Executive Summary, Financial Models, Capital Allocation, Risk Mitigations, and Argentine RIGI statutory incentives.

3. **Middle East & Global Investor Directory:**
   - GCC Single & Multi-Family Offices, Sovereign Wealth Funds, and Corporate PE.
   - Mandate definitions, ticket brackets (USD 10M–100M+), and direct introduction requests.

4. **Enterprise & Corporate Directory:**
   - Export-ready Argentine enterprises and GCC trading conglomerates.

5. **AI Mandate Match Engine:**
   - Bilateral algorithmic scoring (0–100%) correlating investment size, ticket fit, sector synergy, and RIGI tax criteria with instant explanation.

6. **AMBC AI Assistant:**
   - Conversational institutional assistant powered by `@google/genai` (Gemini 2.5 Flash) and local platform intelligence.
   - Summarizes dossiers, explains RIGI legal stability, and prepares executive meeting questions.

7. **AI Investor Brief Generator:**
   - One-click synthesis of clean, printable/PDF investment briefs with executive thesis, risks, and questions for management.

8. **Bilateral Introduction Engine:**
   - Formal diplomatic workflow (Requested → Under Review → Approved → Introduction Made → Meeting Scheduled → Negotiation → Closed).

9. **Confidential Virtual Data Rooms (VDR):**
   - Tiered document security (Public, NDA Required, Qualified Investor, Private).
   - Digital cryptographic NDA signing flow.
   - Immutable audit logs tracking document access.

10. **Bilateral Summits & Events:**
    - High-level roundtables in Dubai DIFC, Riyadh KAFD, and Buenos Aires.

11. **Strategic Market Intelligence:**
    - Institutional research dossiers covering Argentina's RIGI legal regime, lithium supercycles, and halal food security corridors.

12. **Bilateral CRM Pipeline:**
    - Visual Kanban workflow tracking deal value ($1.8B+ pipeline), follow-up actions, and next steps.

13. **Admin Console:**
    - Platform KPIs, introduction moderation, and KYC accreditation queue.

---

## 3. Demo Personas for Evaluation

You can switch personas at any time from the top-right profile dropdown:
- **Ahmed Al-Mansoor** — Principal, *Al-Mansoor Family Office* (Dubai, UAE) — Investor Persona.
- **Valeria Rossi** — CEO, *Catamarca Lithium Resources S.A.* (Buenos Aires, Argentina) — Company / Sponsor Persona.
- **Carlos De La Torre** — Managing Director, *AMBC Connect Secretariat* — Root Admin Persona.

---

## 4. Firestore Database Structure

Normalized collections defined in `firestore.rules`:
- `/users/{userId}`: Profiles, roles, verification status, membership tier.
- `/opportunities/{oppId}`: Investment dossiers, capital requirements, IRR, RIGI status.
- `/investors/{invId}`: Allocator profiles, AUM, ticket brackets, mandates.
- `/companies/{compId}`: Corporate entities, turnover, export certifications.
- `/introductions/{introId}`: Bilateral introduction requests and statuses.
- `/dealRooms/{roomId}`: Data room configurations and NDA memberships.
  - `/dealRooms/{roomId}/documents/{docId}`: Confidential files and tiers.
  - `/dealRooms/{roomId}/auditLogs/{logId}`: Forensic inspection logs.
- `/conversations/{convId}/messages/{msgId}`: Secure private messages.
- `/events/{eventId}`: Bilateral summits, venues, speakers, registrations.
- `/reports/{reportId}`: Institutional research briefings.
- `/crmDeals/{dealId}`: Cross-border transaction pipeline stages.

---

## 5. Security & Deployment

- **Firestore Rules:** Included in `/firestore.rules` with strict RBAC.
- **Environment Variables:**
  - `GEMINI_API_KEY`: Google Gemini API key for AMBC AI Assistant.
  - `APP_URL`: Canonical application URL.
- **Build & Verification:**
  ```bash
  npm run build
  ```
