# Story Test Plan: EX-104 - Price Comparison Across External Marketplaces

> **Application:** RawExerMart  
> **Story ID:** EX-104  
> **Epic:** Marketplace Intelligence & Equipment Showcase  
> **Author:** Saikojin & AI Engineering Pair  
> **Methodology:** Based on Michael Leonard's *"Story Test Plan Template: Develop test automation as you go"* (Medium, 2023)  

---

## 1. Story Overview

### User Story Statement
```text
As a shopper looking for gym and exercise equipment,
I want to view price comparisons from external marketplaces alongside the ExerMart listing,
So that I can immediately evaluate market rates, find the best deal, and buy or sell with confidence.
```

### Business Context
Gym equipment (power racks, barbells, bumper plates, commercial selectorized machines, treadmills, smart rowers) represents high-ticket investments with significant price disparity across new and secondary markets. Shoppers need transparency into whether buying New on ExerMart or choosing a Verified Pre-Owned/Used unit beats external retail (Rogue, Rep Fitness, Titan) or marketplace listings (eBay, Facebook Marketplace).

---

## 2. In-Scope & Out-of-Scope Test Boundary

| Testing Type / Layer | In-Scope Focus | Out-of-Scope |
|---|---|---|
| **Unit Testing** | - Price difference calculations<br>- Percentage savings vs MSRP<br>- Lowest price identification logic<br>- Equipment condition grading validator<br>- External vendor URL sanitizer | - Third-party network latency simulation |
| **Integration Testing** | - `/api/equipment` search and filter endpoints<br>- `/api/marketplaces/compare/:id` aggregator<br>- Simulated vendor timeouts (>2000ms)<br>- Resilience and fallback to internal pricing | - Production payment gateway transactions |
| **Journey / UI Testing** | - Equipment browse & filter by New vs Used<br>- Opening product showcase modal<br>- Price comparison table rendering with lowest price highlight<br>- Toggle simulate failure scenario to verify graceful banner alert<br>- Submission of new equipment listing with real-time feedback | - Cross-browser testing on legacy Internet Explorer |

---

## 3. Acceptance Criteria (Given-When-Then BDD Scenarios)

### Scenario 1: Successful Price Comparison Display
```gherkin
Given a buyer is viewing the equipment showcase modal for "Rogue RML-390F Flat Foot Monster Lite Rack" on RawExerMart
And the external marketplace aggregator service connects to Rogue, Rep Fitness, and Titan Fitness
When the equipment details and pricing component load
Then the comparison matrix should display the ExerMart price alongside external vendor listings
And the lowest price offer should display an active "Best Price / Lowest Offer" highlight badge
And the difference in savings compared to retail MSRP should be accurately computed and shown
```

### Scenario 2: External Marketplace Timeout / Outage Graceful Fallback
```gherkin
Given a buyer is viewing the equipment showcase for any equipment item
And the external marketplace API is experiencing network latency exceeding 2000ms or returns an HTTP 503 error
When the comparison matrix queries external vendor pricing
Then the RawExerMart UI must gracefully fall back without crashing or breaking layout
And display the verified internal RawExerMart equipment price
And render a non-intrusive warning notice: "External prices currently unavailable - displaying verified RawExerMart listing."
```

### Scenario 3: Equipment Condition Differentiation (New vs Used)
```gherkin
Given a seller or buyer is filtering the catalog or submitting a listing
When the item condition is specified as "New", "Used - Like New", "Used - Good", or "Refurbished"
Then the item card must display the appropriate high-contrast visual badge
And used equipment must show the estimated depreciation discount compared to original retail MSRP
```

---

## 4. Multi-Tier Test Plan Breakdown (Leonard's Pyramid)

```
        ▲
       / \
      /   \      Journey / E2E Tests (Cypress / React Testing Library)
     / JRN \     - User browse, search, filter, modal view, listing submission
    /-------\
   /   INT   \   Integration Tests (Supertest + Express API)
  /           \  - REST API contracts, persistence, mock external vendor resilience
 /-------------\
/     UNIT      \ Unit Tests (Vitest)
/                 \ - Sorting algorithms, price math, validators, data sanitizers
-------------------
```

### Tier 1: Unit Tests
- `tests/unit/priceComparison.test.ts`:
  - `findLowestPrice()`: Correctly identifies lowest price among internal and external prices.
  - `calculateSavings()`: Computes dollar and percentage savings against highest or original MSRP.
  - `formatCurrency()`: Ensures consistent USD currency formatting.
- `tests/unit/conditionHelper.test.ts`:
  - Badge color schemes and labels for `NEW`, `LIKE_NEW`, `GOOD`, `REFURBISHED`, `FAIR`.
- `tests/unit/equipmentValidation.test.ts`:
  - Enforces mandatory title, category, price > 0, valid condition enum, seller location.

### Tier 2: Integration Tests
- `tests/integration/equipmentApi.test.ts`:
  - `GET /api/equipment`: Returns all equipment with pagination, category filter, and condition filter.
  - `GET /api/equipment/:id`: Returns single equipment with detailed specs.
  - `POST /api/equipment`: Creates a new equipment listing and validates input rejection.
- `tests/integration/marketplaceComparisonApi.test.ts`:
  - `GET /api/marketplaces/compare/:id`: Successfully fetches external vendor comparisons (Scenario 1).
  - `GET /api/marketplaces/compare/:id?simulateFailure=true`: Simulates vendor timeout and verifies graceful fallback payload (Scenario 2).

### Tier 3: Journey / Component Tests
- `tests/journey/browseAndFilterJourney.test.ts`:
  - User loads homepage, filters by "Used", verifies only pre-owned items render with appropriate badges.
- `tests/journey/priceComparisonJourney.test.ts`:
  - User clicks on an item, observes comparison matrix, verifies lowest price badge.
  - User triggers failure mode, verifies warning notice and fallback.
- `tests/journey/sellListingJourney.test.ts`:
  - User opens "Sell Equipment" modal, completes form, submits, verifies new item appears in catalog.
