# KrishiSetu (कृषि सेतु) — Centralized Agricultural Schemes Platform

> **College PBL (Problem-Based Learning) Engineering Project**  
> **Theme:** Farmer Welfare, Digital Inclusion & Grounded AI Guidance  
> **Tech Stack:** Spring Boot 3.3.4, Java 17+, MySQL 8.0, Spring Security (JWT + BCrypt), Vanilla HTML5/CSS3/JavaScript  
> **Live Demo (Static Frontend):** [krishi-setu-pbl-project.vercel.app](https://krishi-setu-pbl-project.vercel.app/)  
> **Repository:** [github.com/Perry-code03/KrishiSetu-PBL-Project](https://github.com/Perry-code03/KrishiSetu-PBL-Project)

---

## 🌾 1. Problem Statement & Background
Many Indian farmers are unable to implement and benefit from government and NGO-funded welfare schemes due to:
* **Scattered Information:** Information is fragmented across dozens of disconnected ministry, state, and NGO websites (PIB, DA&FW, iGOD, state portals).
* **Missing Guidance:** Official government sites publish notifications and legal guidelines, but rarely provide simple step-by-step guidance or printable document checklists.
* **Liability & Complexity:** Farmers struggle to check whether they are legally eligible, resulting in wasted trips to banks or Common Service Centres.
* **Transparency Gap:** No single unified tracking system exists to follow application milestones from document collection to sanction.

---

## 🚀 2. Solution Overview & Key Features
KrishiSetu ("Farmer's Bridge") is a full-stack digital welfare access platform:
1. **Aggregates 36 Verified Schemes** across 16 agricultural domains (Central Government, State Governments, NGOs, and Corporate CSR such as ITC and Tata Trusts).
2. **Collapsible Hamburger Navigation Drawer:** Smooth off-canvas drawer navigation with backdrop blur, focus trap, and Escape key dismissal.
3. **Authentication & Farmer Profiles:** JWT-based stateless authentication with secure BCrypt password hashing and guest-to-account bookmark synchronization.
4. **Step-by-Step Procedure Guidance:** Breaks down complex bureaucratic processes into numbered steps with verification checkpoints and dos/don'ts.
5. **Direct Application Links & CSC Guidance:** Every scheme features a direct authenticated portal registration link (`applyUrl`) or official CSC offline guidance.
6. **Official Proof Documents:** Direct links to authentic government guideline PDFs, gazette notifications, and scheme operational guidelines.
7. **Interactive Multi-Step Eligibility Checker:** A 4-step wizard calculating personalized matches with transparent "Why you match" rationales.
8. **Printable Document Checklist:** Farmers can download or print physical verification checklists.
9. **Read Aloud (Text-to-Speech):** Audio accessibility for low-literacy farmers in English and Hindi.
10. **Side-by-Side Scheme Comparison:** Compare up to 3 schemes simultaneously on parameters like subsidies, eligibility, and paperwork.
11. **Application Pipeline (Kanban Tracker):** Milestone tracking (*Not Started → Documents Pending → Applied on Portal → Approved/Active*).
12. **Nearest KVK & CSC Locator:** Directory of district-level Krishi Vigyan Kendras and Digital Seva Centres with direct **Google Search** and **Google Maps** integration.
13. **Grounded AI Assistant ("Krishi Mitra"):** Persistent AI chatbot with intent detection, domain keyword clusters, session context retention, and strict retrieval over verified database records.
14. **Full Bilingual Support:** Instant toggle between English and हिन्दी (Hindi).

---

## 🎨 3. Design System & Motion
* **Color Palette:**
  - `--color-primary`: Deep Forest Green (`#1F3B2C`)
  - `--color-accent`: Harvest Gold (`#D9A441`)
  - `--color-secondary`: Fertile Soil Brown (`#7A5C3E`)
  - `--color-bg`: Warm Off-White Grain (`#F6F4EE`)
  - `--color-ink`: Near-Black Slate (`#1A1A17`)
* **Typography:**
  - Editorial Headings: **Fraunces** & **Rozha One**
  - Body & UI: **Inter** / **Tiro Devanagari Hindi**
  - Data / Subsidy / Codes: **JetBrains Mono**
* **Micro-Interactions (transitions.dev inspired):**
  - `hamburger-drawer`: 60fps sliding off-canvas drawer with backdrop filter
  - `like-button`: Heart bookmark bounce animation
  - `modal-open-close`: Smooth scaled backdrop blur
  - `matrix-dot-loader`: Multi-frequency pulsing dots during AI reasoning
  - `streaming-text`: Simulated typewriter output with cursor
  - `error-state-shake`: Visual feedback on invalid form states

---

## 🗄️ 4. Technical Architecture & File Structure

```
KrishiSetu-PBL_Project/
├── index.html                  # Landing Page: Hero, Instant Matcher, Featured Schemes
├── schemes.html                # Dedicated Scheme Catalog: 36+ Schemes, Domain Chips & Search
├── eligibility.html            # Dedicated Eligibility Engine: 4-Step Rules-Based Matcher
├── compare.html                # Dedicated Comparison Matrix: Side-by-Side Scheme Comparison
├── dashboard.html              # Dedicated Farmer Dashboard: Application Pipeline Kanban
├── locator.html                # Dedicated KVK & CSC Directory: Google Search & Maps Integration
├── login.html                  # Dedicated Login Page: Mobile/Email Login, Remember Me, Guest Merge
├── signup.html                 # Dedicated Farmer Registration: Password Strength Meter, State Selector
├── css/
│   └── style.css               # Design Tokens, Drawer, Auth Styles, Cards, Animations
├── js/
│   ├── config.js               # Global Configuration (API endpoints, LocalStorage keys)
│   ├── api.js                  # Centralized API Service Wrapper (JWT, Offline Fallback)
│   ├── schemes-data.js         # Grounded Dataset of 36 Real Schemes, Apply URLs, Proof Docs
│   ├── app.js                  # State Engine, Drawer Nav, Auth UI, TTS, Wizard, Kanban, Bilingual UI
│   └── ai-assistant.js         # Grounded AI Assistant (Intent Classifier, Keyword Clusters, RAG)
├── docs/
│   └── ai-assistant-test-queries.md  # 45 Verified Test Queries Suite & Evaluation Report
└── backend/
    ├── pom.xml                 # Maven Configuration (Spring Boot 3.3.4, JJWT, MySQL Connector)
    ├── .env.example            # Environment Variable Template (No secrets committed)
    ├── schema.sql              # Production MySQL Schema (13 tables, indexes, constraints)
    ├── db/
    │   ├── schema.sql          # 13 Normalized MySQL Tables
    │   ├── seed.sql            # Seed Data: 16 Categories, 36 Schemes, 37 Proof Docs, 2 Demo Users
    │   └── README.md           # Database Setup Instructions
    ├── tools/
    │   ├── db-setup.js         # Automated MySQL Database & User Provisioner
    │   ├── apply-schema.js     # Schema Migration Tool
    │   ├── seed-db.js          # Database Seeder Tool
    │   └── verify-db.js        # Health Check & Integrity Verifier
    └── src/
        ├── main/
        │   ├── java/com/krishisetu/
        │   │   ├── KrishiSetuApplication.java
        │   │   ├── config/       # SecurityConfig, JwtTokenProvider, JwtAuthFilter, EnvInitializer
        │   │   ├── controller/   # AuthController, SchemeController, UserController, AssistantController
        │   │   ├── dto/          # Request & Response Data Transfer Objects
        │   │   ├── model/        # 13 JPA Entities (User, Scheme, SavedScheme, ApplicationProgress, etc.)
        │   │   ├── repository/   # 13 Spring Data JPA Repositories
        │   │   └── service/      # AuthService, SchemeService, UserService, AiAssistantService
        │   └── resources/
        │       └── application.properties # Environment Variable Interpolation
        └── test/java/com/krishisetu/
            ├── AuthServiceTest.java       # Unit & Integration Tests for Auth & Rate Limiting
            └── SchemeControllerTest.java  # Controller Tests for Catalog & Search APIs
```

---

## 🏃 5. How to Run Locally

### Option A: Static Frontend Mode (Zero Installation)
Double-click `index.html` (or any `.html` page) to open directly in any modern web browser. When the backend server is offline, the frontend automatically falls back to `js/schemes-data.js` and `localStorage`, enabling full exploration, filtering, bookmarking, and AI assistant interaction.

Or run via a local HTTP server:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

### Option B: Full-Stack Mode with Spring Boot & MySQL

#### 1. Configure Database Credentials
Create a `.env` file in the `backend/` directory (see `backend/.env.example`):
```env
DB_URL=jdbc:mysql://localhost:3306/krishisetu?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=UTC
DB_USERNAME=krishisetu_app
DB_PASSWORD=<your_app_password>
JWT_SECRET=<your_64_byte_base64_secret>
PORT=8080
```

#### 2. Run Database Seeding
```bash
node backend/tools/seed-db.js
```

#### 3. Run Spring Boot Backend
```bash
cd backend
mvn spring-boot:run
```
The REST API will start on `http://localhost:8080/api`.

#### 4. Demo Accounts
* **Registered Farmer:** `farmer@krishisetu.in` or `9876543211` / Password: `Farmer@123`
* **Administrator:** `admin@krishisetu.in` or `9876543210`

---

## 🧪 6. Testing & Quality Verification

Run the automated backend test suite:
```bash
cd backend
mvn test
```
**Test Results:** 9 passed, 0 failed, 0 errors.
* `AuthServiceTest`: Successful registration, duplicate mobile rejection, login success, bad password lockout, IP rate limiting (5 attempts per 15 minutes).
* `SchemeControllerTest`: Catalog retrieval, slug lookup with `applyUrl` and `officialDocuments`, category filtering, and keyword search.

AI Assistant test suite:
* View `docs/ai-assistant-test-queries.md` for 45 verified evaluation queries covering irrigation, solar, crop insurance, credit, mechanization, and Hindi natural language queries.

---

## 🎓 7. Things To Remember (Evaluator Viva Guide):-

**Q1: How does my project differ from existing government portals like pmkisan.gov.in?**  
*Answer:* Official government portals provide static notifications and collect form inputs for a single department, but do not provide cross-departmental comparison, step-by-step guidance, personalized multi-scheme eligibility matching, or printable checklists. KrishiSetu acts as the preparatory bridge.

**Q2: Does my platform actually disburse money or submit government forms?**  
*Answer (Honest Academic Scope):* No, by design KrishiSetu hands off to authentic government portals (e.g. `pmkisan.gov.in`, `pmfby.gov.in`) via direct authenticated links (`applyUrl`) for final submission. This eliminates security and liability risks while maintaining 100% compliance.

**Q3: How do I prevent the AI assistant from hallucinating false subsidy amounts?**  
*Answer:* We implemented strict Retrieval-Augmented Generation (RAG). Every prompt retrieves verified rows from our database. If an inquiry has no match, the assistant refuses to guess and informs the farmer.

**Q4: How does the KVK/CSC locator help offline farmers?**  
*Answer:* Many farmers require in-person assistance for biometric Aadhaar e-KYC or soil testing. The locator provides verified district centers; clicking any center queries Google for operational hours and reviews, while the address pin links directly to Google Maps navigation.
