# KrishiSetu (कृषि सेतु) — Centralized Agricultural Schemes Platform

> **College PBL (Problem-Based Learning) Engineering Project**  
> **Theme:** Farmer Welfare, Digital Inclusion & Grounded AI Guidance  
> **Status:** Fully Functional Front End + Java/Spring Boot & MySQL Architecture  

---

## 🌾 1. Problem Statement & Background
Many Indian farmers are unable to implement and benefit from government and NGO-funded welfare schemes due to:
* **Scattered Information:** Information is fragmented across dozens of disconnected ministry, state, and NGO websites (PIB, DA&FW, iGOD, state portals).
* **Missing Guidance:** Official government sites publish notifications and legal guidelines, but never provide simple, step-by-step procedure guidance or printable document checklists.
* **Liability & Complexity:** Farmers struggle to check whether they are legally eligible, resulting in wasted trips to banks or Common Service Centres.
* **Transparency Gap:** No single unified tracking system exists to follow application milestones from document collection to sanction.

---

## 🚀 2. Solution Overview & Key Differentiators
KrishiSetu ("Farmer's Bridge") is a centralized web platform that:
1. **Aggregates 36+ Real Verified Schemes** across 15+ agricultural domains (Central Govt, State Govt, NGOs, and Corporate CSR like ITC and Tata Trusts).
2. **Step-by-Step Procedure Timeline:** Breaks down complex bureaucratic processes into numbered, digestible steps with timelines and dos/don'ts.
3. **Interactive Multi-Step Eligibility Checker:** A 4-step wizard calculating personalized matches with transparent "Why you match" rationales.
4. **Printable Document Checklist:** Farmers can download or print formatted physical checklists per scheme.
5. **Read Aloud (Text-to-Speech):** Direct audio accessibility for low-literacy farmers in English and Hindi.
6. **Side-by-Side Scheme Comparison:** Compare 2 to 3 schemes simultaneously on parameters like subsidies, eligibility, and documents.
7. **Personal Farmer Dashboard (Kanban Tracker):** Self-reported application pipeline tracking: *Not Started → Documents Pending → Applied on Portal → Approved/Active*.
8. **Grounded AI Assistant ("Krishi Mitra"):** Persistent bottom-right floating widget with animated thinking states (matrix-dot-loader), streaming text, and strict retrieval-grounded responses that prevent hallucination.
9. **Full Bilingual Support:** Instant toggle between English and हिन्दी (Hindi).
10. **Nearest KVK & CSC Locator:** Directory of district-level Krishi Vigyan Kendras and Digital Seva Kendras for e-KYC and offline support.

---

## 🎨 3. Design System & Motion (Inspired by Godly.design & Transitions.dev)
* **Color Palette:**
  - `--color-primary`: Deep Forest Green (`#1F3B2C`)
  - `--color-accent`: Harvest Gold (`#D9A441`)
  - `--color-secondary`: Fertile Soil Brown (`#7A5C3E`)
  - `--color-bg`: Warm Off-White Grain (`#F6F4EE`)
  - `--color-ink`: Near-Black Slate (`#1A1A17`)
* **Typography:**
  - Editorial Headings: **Fraunces** & **Rozha One** (warm, authoritative, high-trust)
  - Body & UI: **Inter** / **Tiro Devanagari Hindi**
  - Data / Subsidy / Codes: **JetBrains Mono**
* **Micro-Interactions (transitions.dev inspired):**
  - `like-button`: Heart bookmark bounce animation
  - `modal-open-close`: Smooth scaled backdrop blur
  - `matrix-dot-loader`: Multi-frequency pulsing dots during AI reasoning
  - `streaming-text`: Simulated real-time typewriter output with blinking cursor
  - `error-state-shake`: Visual feedback on invalid form states

---

## 🗄️ 4. Technical Architecture
```
KrishiSetu/
├── index.html                  # Master Single-Page Web Application
├── css/
│   └── style.css               # Design Tokens, Responsive Grid, Motion Animations
├── js/
│   ├── schemes-data.js         # Verified Grounded Dataset of 36 Schemes
│   ├── app.js                  # State Engine, Filters, TTS, Wizard, Kanban, Bilingual UI
│   └── ai-assistant.js         # Grounded RAG Assistant, Matrix Dots, Streaming Engine
└── backend/
    ├── schema.sql              # Production MySQL Schema (10 tables, indexes, constraints)
    ├── SchemeController.java   # Spring Boot REST Endpoints (CRUD, Bookmarks, Tracker)
    └── AiAssistantService.java # Java RAG Grounding Service with MySQL Retrieval
```

---

## 🏃 5. How to Run Locally
### Option A: Direct Browser Launch (Zero Installation)
Simply double click or open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).

### Option B: Local Python HTTP Server
```bash
cd "C:\Users\Parth\KrishiSetu"
python -m http.server 8000
```
Open `http://localhost:8000` in your browser.

---

## 🎓 6. Evaluator Viva Q&A Guide
**Q1: How does your project differ from existing government portals like pmkisan.gov.in?**  
*Answer:* Official portals provide static notifications and collect form inputs, but do not provide cross-departmental comparison, step-by-step guidance, personalized multi-scheme eligibility matching, or printable checklists. KrishiSetu acts as the preparatory bridge.

**Q2: Does your platform actually disburse money or submit government forms?**  
*Answer (Honest Academic Scope):* No, by design KrishiSetu hands off to the authentic government portal (e.g. `pmkisan.gov.in`) for final form submission. This avoids security and liability risks while keeping the demo 100% compliant and realistic.

**Q3: How do you prevent the AI assistant from hallucinating false subsidy amounts?**  
*Answer:* We implemented strict Retrieval-Augmented Generation (RAG). Every prompt retrieves verified rows from our database. If an inquiry has no match, the assistant refuses to guess and informs the farmer.
