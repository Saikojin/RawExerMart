# RawExerMart - Development & Engineering Decision Log

> **Project:** RawExerMart (Gym & Fitness Equipment Buying, Selling & Showcasing Platform)  
> **Repository:** https://github.com/Saikojin/RawExerMart  
> **Reference Architecture & QA Blueprint:** Michael Leonard's *"Story Test Plan Template: Develop test automation as you go"* (Medium, 2023)  
> **Author / Lead Engineer:** AI Pair Programmer & Saikojin  
> **Started:** October 24, 2026  

---

## Table of Contents
1. [Executive Summary & Requirements Analysis](#1-executive-summary--requirements-analysis)
2. [Architectural Decisions & Technology Stack Selection](#2-architectural-decisions--technology-stack-selection)
3. [Story Test Plan Alignment (EX-104 & Leonard's Framework)](#3-story-test-plan-alignment-ex-104--leonards-framework)
4. [Iterative Development Logs](#4-iterative-development-logs)
   - [Phase 1: Project Scaffolding & Tooling Setup](#phase-1-project-scaffolding--tooling-setup)
   - [Phase 2: Domain Modeling & Rich Dummy Data Generation](#phase-2-domain-modeling--rich-dummy-data-generation)
   - [Phase 3: Backend REST Services & Marketplace Price Aggregator](#phase-3-backend-rest-services--marketplace-price-aggregator)
   - [Phase 4: Responsive Frontend Showcase & Marketplace UI](#phase-4-responsive-frontend-showcase--marketplace-ui)
   - [Phase 5: Multi-Tier Test Suite Implementation (Unit, Integration, Journey)](#phase-5-multi-tier-test-suite-implementation-unit-integration-journey)
   - [Phase 6: Verification, Interactive QA View & Final Delivery](#phase-6-verification-interactive-qa-view--final-delivery)
5. [Workflow Evaluation & Areas for Improvement](#5-workflow-evaluation--areas-for-improvement)

---

## 1. Executive Summary & Requirements Analysis

### User Goal
Build a modern, robust sample web application called **RawExerMart** for buying, selling, and showcasing new and used gym equipment. The application must reflect the practical implementation of the QA and architecture philosophies presented in Michael Leonard's published article *"Story Test Plan Template: Develop test automation as you go"*, in which the sample application **ExerMart** is featured.

### Key Constraints & Mandates
1. **Zero User-Built Skills/Tools:** Execute strictly using standard development tools, git, node, npm, tests, and bash/powershell scripts.
2. **Explicit PHP Ban:** Avoid PHP completely due to widespread remote code execution and live vulnerabilities; use a modern, secure, type-safe stack.
3. **Rich Dummy Data:** Seed realistic, high-substance gym equipment inventory (commercial machines, free weights, power racks, cardio equipment, Olympic plates) with detailed condition gradings (Brand New, Like New, Good, Refurbished, Fair).
4. **Price Comparison Across External Marketplaces (Story EX-104):** Showcase prices compared against major gym gear vendors (e.g. Rogue Fitness, Rep Fitness, Titan Fitness, eBay, Facebook Marketplace) with lowest-price highlighting and graceful timeout/failure fallbacks.
5. **Multi-Tier Test Coverage:** Implement test coverage structured directly after Michael Leonard's test plan levels:
   - **Unit:** Pricing sorting algorithms, condition formatting, listing validation.
   - **Integration:** API endpoints, persistence layer, and external marketplace aggregator with fallback logic (Scenario 1 & 2).
   - **Journey / UI:** End-to-end user workflows (browsing/filtering new vs used, checking comparison matrix, posting a new listing, graceful error recovery).
6. **Continuous Thought & Action Logging:** Maintain this detailed log (`DEV_LOG.md`) to record engineering decisions, trade-offs, and retrospectives.

---

## 2. Architectural Decisions & Technology Stack Selection

### Stack Evaluation
| Layer | Option Evaluated | Selected? | Rationale |
|---|---|---|---|
| **Backend Runtime** | Node.js (v20) + Express + TypeScript | **YES** | Fast, lightweight, type-safe, native JSON handling, no PHP vulnerabilities, easy mocking of external vendor latencies. |
| **Frontend Framework** | React 18 + Vite + TypeScript | **YES** | Instant HMR, component isolation, strong typing, clean UI componentization for the showcase and comparison matrix. |
| **Styling** | Tailwind CSS + Lucide Icons | **YES** | Modern design, responsive layout, clear visual badges for New vs Used and Lowest Price tags. |
| **Testing Harness** | Vitest + Supertest + Testing Library | **YES** | Unified test runner for unit, API integration, and component journey tests with fast execution and native ESM support. |
| **Persistence** | In-Memory / File-backed JSON Store | **YES** | Zero external DB dependency for hassle-free local clone-and-run, deterministic seed reset for automated test runs. |

---

## 3. Story Test Plan Alignment (EX-104 & Leonard's Framework)

In Michael Leonard's article, the core story used to illustrate the Story Test Plan Template is **EX-104: Price Comparison Across External Marketplaces**.

### User Story Statement:
> *As a shopper looking for fitness equipment,  
> I want to view price comparisons from external marketplaces alongside ExerMart listings,  
> So that I can find the best deal without leaving the site.*

### Acceptance Criteria (Given-When-Then):
- **Scenario 1: Successful Price Comparison Display**
  - **Given** the user is viewing a product details page for equipment (e.g., "Adjustable Dumbbells") on ExerMart,
  - **And** the external marketplace service successfully fetches data from connected vendors,
  - **When** the page/modal loads,
  - **Then** the UI displays external marketplace prices alongside the ExerMart listing,
  - **And** the lowest price option is visually highlighted.

- **Scenario 2: External Marketplace API Timeout / Failure**
  - **Given** the user is viewing a product details page,
  - **And** the external marketplace API is down, fails, or times out (> 2000ms),
  - **When** the component requests external pricing data,
  - **Then** the UI gracefully falls back to showing only internal inventory pricing,
  - **And** a clear notification stating *"External prices currently unavailable - showing verified ExerMart listing"* appears without breaking layout.

---

## 4. Iterative Development Logs

### Phase 1: Project Scaffolding & Tooling Setup
- **Decision:** Establish a clean, organized root workspace containing `server/`, `client/`, `tests/`, and `docs/` with npm scripts at root to run, build, and test seamlessly.
- **Git Branch:** `feature/ex-101-project-scaffold`
- **Actions Taken:**
  - Initialized git branch.
  - Formulated architecture plan and test specifications.
  - Drafted comprehensive DEV_LOG.
  - Configured Vitest test runner and verified execution pipeline.

### Phase 2: Domain Modeling & Rich Dummy Data Generation
- **Decision:** Model the equipment domain with strong TypeScript types differentiating condition nuances (`new`, `used_like_new`, `used_good`, `used_fair`, `refurbished`) and categories (free weights, power racks/benches, cardio machines, selectorized units, accessories).
- **Git Branch:** `feature/ex-102-domain-dummy-data`
- **Actions Taken:**
  - Designed `server/src/models/types.ts` with complete domain schemas for items, DTOs, external price records, and price comparison summaries.
  - Generated rich seed inventory in `server/src/data/dummyEquipment.ts` with 10 detailed pieces of commercial and garage gym equipment across top brands (Rogue, Rep Fitness, Concept2, Eleiko, Woodway, Hammer Strength, Nuobell, Titan).
  - Implemented `EquipmentDataStore` in `server/src/models/dataStore.ts` with in-memory persistence, filtering by category and condition, search indexing, sorting, and state reset capabilities for automated testing.
- **Verification:** Data store successfully clones seed data and satisfies type contracts.

### Phase 3: Backend REST Services & Marketplace Price Aggregator
- **Decision:** Architect the backend with decoupled services, pure calculation engines, and full simulation switches to prove Michael Leonard's Story Test Plan scenarios (EX-104 Scenario 1 & 2).
- **Git Branch:** `feature/ex-103-backend-api-services`
- **Actions Taken:**
  - Implemented `calculateComparisonMetrics` pure function in `server/src/services/marketplaceComparisonService.ts` to compute lowest price flags, savings vs MSRP, and savings vs highest competitor.
  - Built `MarketplaceComparisonService` with support for `simulateFailure` and `simulatedDelayMs` options.
  - Created input validator `validateCreateEquipment` in `server/src/services/equipmentValidation.ts` to strictly sanitize user listings.
  - Implemented controllers & routes for `/api/equipment` (CRUD + reset) and `/api/marketplaces/compare/:id`.
  - Configured Express app with CORS and health-check endpoints.
- **Verification:** Passed `npx tsc --noEmit` with zero errors and validated REST interface signatures.

### Phase 4: Responsive Frontend Showcase & Marketplace UI
- **Decision:** Build a responsive, dark-mode, high-craft React 18 interface with Tailwind CSS that makes the gym equipment catalog tactile and transparent.
- **Git Branch:** `feature/ex-104-frontend-showcase-marketplace`
- **Actions Taken:**
  - Implemented `Header` with branding, inventory badge, Story EX-104 test plan button, and database reset trigger.
  - Built `Hero` section explaining real-time price intelligence and gym equipment liquidation transparency.
  - Implemented `FilterBar` enabling multi-dimensional slicing: Category (Free weights, Racks & Benches, Cardio, Functional machines, Accessories), Condition (New, Like New, Good, Fair, Refurbished), and Sort ordering.
  - Built `EquipmentCard` with condition badges, MSRP discount tags, and multi-vendor tracking count.
  - Created `EquipmentDetailModal` showcasing full high-res imagery, technical specs table, and seller verification credentials.
  - Implemented `PriceComparisonWidget` directly delivering Story EX-104:
    - Side-by-side comparison across ExerMart, Rogue, Rep, Titan, eBay.
    - Prominent "Lowest Price" best deal highlight.
    - Integrated "Simulate Vendor Failure" toggle to verify Scenario 2 graceful fallback in real-time.
  - Created `SellEquipmentModal` with live client validation to post new or used equipment.
  - Implemented `StoryTestPlanDashboard` providing an interactive in-app view of Michael Leonard's test plan template and BDD acceptance criteria.
- **Verification:** Production bundle built via `vite build client` in 1.74s with zero errors.

### Phase 5: Multi-Tier Test Suite Implementation (Unit, Integration, Journey)
- **Decision:** Faithfully implement Michael Leonard's three-tier agile test plan structure across unit, integration, and journey/component layers, covering all acceptance criteria of Story EX-104 (Price Comparison Across External Marketplaces).
- **Git Branch:** `feature/ex-105-story-test-plan-coverage`
- **Actions Taken:**
  - **Tier 1 (Unit):**
    - `tests/unit/priceComparison.test.ts`: Verified price sorting, lowest offer identification (both ExerMart internal and external competitor winners), MSRP difference calculations, and zero-listing safety.
    - `tests/unit/conditionHelper.test.ts`: Verified badge styling and descriptions across all 5 conditions (`new`, `used_like_new`, `used_good`, `used_fair`, `refurbished`) plus USD currency formatters.
    - `tests/unit/equipmentValidation.test.ts`: Enforced mandatory field boundaries (title, brand, valid condition, valid category, positive price, description length).
  - **Tier 2 (Integration):**
    - `tests/integration/equipmentApi.test.ts`: Tested Express REST routes with Supertest (`GET /api/equipment`, category filters, condition filters, search query, single item `GET /:id`, 404 handler, and `POST /api/equipment` listing creation).
    - `tests/integration/marketplaceComparisonApi.test.ts`: Tested Story EX-104 Scenario 1 (live vendor aggregation) and Scenario 2 (graceful fallback mode with non-intrusive warning).
  - **Tier 3 (Journey / Component):**
    - `tests/journey/browseAndFilterJourney.test.tsx`: Tested user catalog navigation, condition badge checks, and card selection.
    - `tests/journey/priceComparisonJourney.test.tsx`: Verified live comparison matrix rendering, lowest price badge, and interactive toggling of the Scenario 2 vendor failure simulation.
    - `tests/journey/sellListingJourney.test.tsx`: Tested full listing submission workflow with real-time validation error handling.
- **Verification:** All 40 tests across 8 test suites passed in 1.29s (`npm test`).

### Phase 6: Documentation, Integration & Main Branch Merge
- **Decision:** Consolidate the entire project history, author comprehensive developer documentation (`README.md`, `docs/STORY_TEST_PLAN_EX104.md`), merge all feature branches back into `main`, and push the release to GitHub.
- **Git Branch:** `feature/ex-106-docs-and-final-integration`
- **Actions Taken:**
  - Authored production-grade `README.md` with complete architectural diagram, feature walkthrough, running guide, and test commands.
  - Completed `DEV_LOG.md` retrospectives and workflow evaluations.
  - Merged feature branches (`feature/ex-101-project-scaffold`, `feature/ex-102-domain-dummy-data`, `feature/ex-103-backend-api-services`, `feature/ex-104-frontend-showcase-marketplace`, `feature/ex-105-story-test-plan-coverage`, and `feature/ex-106-docs-and-final-integration`) into `main`.
  - Pushed all branches and `main` to GitHub repository: `https://github.com/Saikojin/RawExerMart`.
- **Verification:** Clean git log history, 100% test pass rate, and full bundle build verification.

---

## 5. Workflow Evaluation & Areas for Improvement

### What Worked Exceptionally Well
1. **Incremental Feature Branching:** Structuring each phase as an isolated git branch (`ex-101` through `ex-106`) allowed atomic commits, clear code reviews, and reproducible verification milestones.
2. **Developing Tests As You Go:** Adopting Michael Leonard's philosophy from the outset eliminated ambiguity. Defining acceptance criteria (Scenario 1 & Scenario 2) before writing the frontend widget meant the UI components and backend fallbacks were purpose-built to pass tests without requiring speculative rework.
3. **Pure Function Segregation:** Extracting the pricing math and condition logic into pure functions allowed fast, zero-dependency unit tests running in under 20ms, while integration and journey tests verified full-system behavior.
4. **Zero-PHP Mandate Adherence:** Using TypeScript and Node.js provided modern end-to-end type safety, fast Vite HMR, and eliminated the critical RCE vulnerabilities commonly plaguing PHP installations.
5. **Interactive QA Simulator:** Adding the "Simulate Vendor Failure" switch directly inside the UI gives QA engineers and product managers immediate, tactile confirmation of Scenario 2 behavior without needing to mock network traffic via DevTools or Charles Proxy.

### Areas for Future Improvement
1. **Real Marketplace Scraping / Official Vendor APIs:** Currently, external vendor prices are simulated through the aggregator engine. In a production environment, connecting real-time affiliate APIs (Rogue Affiliate API, eBay Buy API) with Redis caching (5-minute TTL) would minimize rate-limiting while maintaining fresh pricing.
2. **Image CDN Integration:** Currently, listings use Unsplash fitness equipment URLs. Implementing direct S3 / Cloudflare R2 image uploads with automatic thumbnail resizing (WebP/AVIF) would enhance image loading speeds.
3. **User Authentication & Saved Searches:** Adding Auth0 or Clerk authentication would allow home gym enthusiasts to set "Price Drop Alerts" when a specific power rack or bumper plate set falls below their target price.
4. **CI/CD GitHub Actions Pipeline:** Adding a `.github/workflows/ci.yml` workflow that automatically runs `npm test` and `npm run build` on every pull request will ensure long-term regression prevention.





