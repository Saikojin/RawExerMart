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
