# 🏋️ RawExerMart

> **Live Gym Equipment Marketplace & Price Intelligence Platform**  
> *Buy, Sell, and Showcase New & Used Fitness Equipment with Story Test Automation*  
> Repository: [https://github.com/Saikojin/RawExerMart](https://github.com/Saikojin/RawExerMart)  
> QA Methodology Blueprint: [Michael Leonard's "Story Test Plan Template: Develop test automation as you go" (Medium)](https://medium.com/@michael.leonard/story-test-plan-template-a4202531e741)

---

## 📖 Background & Problem Statement

Gym equipment represents high-ticket investments with significant price disparity across retail channels and the pre-owned secondary market. Finding fair market value for commercial power racks, calibrated plates, Olympic barbells, and cardio machines often requires checking half a dozen vendor stores and classifieds.

In his published quality engineering guide, **Michael Leonard** uses **ExerMart** as the foundational reference application to illustrate how agile teams eliminate rework and flesh out technical details by authoring a **Story Test Plan Template** during backlog refinement.

**RawExerMart** is the concrete implementation of that vision: a high-craft marketplace and equipment showcase that aggregates real-time price comparisons across major gym vendors (Rogue Fitness, Rep Fitness, Titan Fitness, eBay) and implements multi-tier test automation adhering to Leonard's test pyramid.

> **Note on Technology Stack (Zero PHP Policy):**  
> In accordance with project security requirements, PHP is strictly excluded from this codebase to eliminate systemic remote code execution vulnerabilities. The platform is built entirely on modern, type-safe Node.js / TypeScript, Express, and React 18.

---

## ⚡ Key Features

- **New & Used Equipment Inventory:**
  - Full catalog covering 5 fitness categories: Free Weights & Dumbbells, Power Racks & Benches, Cardio & Conditioning, Selectorized & Functional Cable Machines, and Plates & Accessories.
  - Transparent 5-tier condition grading: `Brand New`, `Used - Like New`, `Used - Good`, `Used - Fair`, and `Factory Refurbished`.
  - Detailed equipment specifications (steel gauge, dimensions, footprint, weight capacity, and seller inspection notes).

- **Story EX-104: Price Comparison Across External Marketplaces:**
  - Embedded comparison matrix contrasting the RawExerMart listing against Rogue Fitness, Rep Fitness, Titan, and eBay.
  - Automatic identification and visual highlighting of the **Lowest Price / Best Value** offer.
  - Exact calculation of dollar and percentage depreciation savings versus original manufacturer MSRP.
  - **Graceful Fallback Mode (Scenario 2):** Resilient handling when external vendor APIs experience latency or outages (>2000ms), keeping the verified internal listing accessible with a non-intrusive warning notice.

- **Interactive Scenario Simulator:**
  - Built-in simulator toggle in the equipment showcase modal allowing QA engineers, testers, and stakeholders to test Scenario 2 (vendor failure fallback) live in the browser with one click.

- **Sell & List Equipment Portal:**
  - Interactive listing submission modal with client-side and server-side validation.
  - Real-time discount calculation against original MSRP and instant catalog indexing.

- **In-App Story Test Plan Dashboard:**
  - Integrated modal surfacing the complete Agile Story Test Plan (Story EX-104), BDD acceptance criteria (Given/When/Then), and test pyramid status directly inside the web interface.

---

## 🏗️ Architecture & Three-Tier Test Pyramid

```
                       ▲
                      / \
                     /   \      Journey / E2E Tests (React Testing Library)
                    / JRN \     - User browse, search, filter, detail modal,
                   /-------\      price comparison widget, and listing submission
                  /   INT   \   Integration Tests (Supertest + Express API)
                 /           \  - REST API contracts, in-memory store persistence,
                /-------------\   Scenario 1 aggregator & Scenario 2 fallback
               /     UNIT      \ Unit Tests (Vitest)
              /                 \ - Lowest price algorithm, savings math,
             ---------------------  condition styling, and input validators
```

### 1. Unit Tests (`tests/unit/`)
- `priceComparison.test.ts`: Verifies lowest price identification (internal vs competitor winners), MSRP savings math, and zero-listing safety.
- `conditionHelper.test.ts`: Verifies badge color schemes, labels, descriptions, and currency formatters.
- `equipmentValidation.test.ts`: Tests mandatory boundary validation for listing creation.

### 2. Integration Tests (`tests/integration/`)
- `equipmentApi.test.ts`: Full REST API tests with Supertest against Express endpoints (`GET /api/equipment`, filters, search, `GET /:id`, 404s, and `POST /api/equipment`).
- `marketplaceComparisonApi.test.ts`: Directly tests **Story EX-104 Scenario 1** (successful price comparison) and **Scenario 2** (simulated timeout/outage graceful fallback).

### 3. Journey / Component Tests (`tests/journey/`)
- `browseAndFilterJourney.test.tsx`: Tests catalog filtering by New vs Used, category pills, and card selection.
- `priceComparisonJourney.test.tsx`: Tests rendering of the comparison matrix, lowest price badge, and interactive toggling of the Scenario 2 vendor failure simulation.
- `sellListingJourney.test.tsx`: Tests listing submission form with client validation feedback.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v20.x or higher
- **npm**: v9.x or higher

### Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/Saikojin/RawExerMart.git
cd RawExerMart
npm install
```

### Running Locally
To launch both the backend API server (`http://localhost:5000`) and the Vite React frontend (`http://localhost:3000`) concurrently:
```bash
npm run dev
```

You can also run client or server independently:
```bash
# Start backend API (port 5000)
npm run dev:server

# Start Vite frontend (port 3000)
npm run dev:client
```

---

## 🧪 Running Automated Tests

Run the complete test suite (Unit, Integration, Journey):
```bash
npm test
```

Run specific test tiers:
```bash
# Run Unit tests only
npm run test:unit

# Run Integration tests only (API contracts & Scenario 1/2)
npm run test:integration

# Run Journey / Component tests only
npm run test:journey
```

---

## 📋 Story Test Plan: EX-104 Reference

| Scenario | Given | When | Then |
|---|---|---|---|
| **Scenario 1: Successful Price Comparison** | User views equipment details and external vendor APIs respond | Page loads | Comparison matrix displays external prices; lowest price is visibly highlighted |
| **Scenario 2: Marketplace Timeout / Outage** | External vendor API times out (>2000ms) or is down | Component requests comparison data | UI gracefully falls back to internal listing with warning notice: *"External prices currently unavailable - displaying verified RawExerMart listing."* |

For the complete formal test plan document, see [docs/STORY_TEST_PLAN_EX104.md](docs/STORY_TEST_PLAN_EX104.md).  
For the detailed engineering decision and workflow log, see [DEV_LOG.md](DEV_LOG.md).

---

## 📄 License
MIT License. Created by Saikojin & AI Engineering Pair.
