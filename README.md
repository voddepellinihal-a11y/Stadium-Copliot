# Stadium Copilot 2026

> GenAI-powered stadium assistant for the FIFA World Cup 2026 — covering navigation, crowd management, accessibility, transportation, sustainability, multilingual support, and real-time operational intelligence.

## Live Demo

**Public URL:** https://catnap-lethargic-relative.ngrok-free.dev

## Problem Statement Coverage

| Requirement | Implementation |
|---|---|
| **Smart Navigation** | Multilingual RAG-based chat with gate, restroom, food, parking info for all 13 venues |
| **Crowd Management** | Real-time live heatmap simulation with density tracking and hotspot alerts |
| **Accessibility** | WCAG-compliant: high contrast mode, text size slider, step-free routes, screen reader support, skip-to-content link |
| **Transportation** | Shuttle, train, metro, SkyTrain, SeaBus, parking info per city |
| **Sustainability** | Green score tracker with actionable checklist (transit, biking, recycling, refillable, digital tickets) |
| **Multilingual** | Full EN/ES/FR translations across entire UI with language selector modal |
| **Operational Intelligence** | Ops dashboard with KPIs, incident reporting, active alerts, live zone monitoring |
| **Real-time Decision Support** | Emergency keyword detection, volunteer scripted response hub, incident escalation |

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (Next.js)                     │
│  6 Modes: Fan Chat │ Volunteer │ Ops │ Analytics │ Green │ Access │
│  3 Languages: EN │ ES │ FR     13 Cities across USA │ Mexico │ Canada │
└─────────────────────┬───────────────────────────────────┘
                      │ REST API
┌─────────────────────▼───────────────────────────────────┐
│                  Backend (FastAPI)                       │
│  RAG Service (Gemini Pro) │ Crowd Sim │ Analytics │     │
│  Auth (JWT) │ Incidents │ Notifications │ Sustainability │
│  ChromaDB (vector store) │ Redis (caching)               │
└─────────────────────────────────────────────────────────┘
```

## 6 UI Modes

1. **Fan Chat** — AI-powered Q&A for stadium navigation, amenities, schedules
2. **Volunteer Hub** — Scripted response library for common fan queries
3. **Operations Dashboard** — Live crowd heatmap, incident reporting, alert management
4. **Analytics** — Query stats, language breakdown, system performance KPIs
5. **Sustainability** — Green score tracker, eco-action checklist, sustainability tips
6. **Accessibility** — High contrast, text size, step-free routes, emergency escalation

## Tech Stack

- **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend:** Python FastAPI, Gemini Pro API, ChromaDB, Redis
- **Testing:** Jest, React Testing Library (59 tests across 6 suites)
- **Security:** CSP headers, XSS prevention, rate limiting, input sanitization, JWT auth, env-based secrets
- **Accessibility:** ARIA labels, role attributes, high contrast, screen reader support

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Run linter
npm run lint

# Build for production
npm run build
```

## Project Structure

```
stadium-copilot/
├── src/app/
│   ├── page.tsx                    # Main entry with mode routing
│   ├── layout.tsx                  # Root layout with metadata
│   ├── globals.css                 # Tailwind + custom styles
│   ├── middleware.ts               # Security headers
│   ├── components/
│   │   ├── shared/
│   │   │   ├── AppContext.tsx       # Global state (mode, language, city, auth)
│   │   │   ├── GlobalHeader.tsx     # Header with mode tabs, city/language selectors
│   │   │   └── ErrorBoundary.tsx    # React error boundary
│   │   ├── chat/
│   │   │   └── ChatMain.tsx         # Fan chat with RAG + security
│   │   └── modes/
│   │       ├── VolunteerContent.tsx  # Scripted response hub
│   │       ├── OpsContent.tsx        # Live heatmap + alerts
│   │       ├── AnalyticsContent.tsx  # KPIs + analytics tabs
│   │       ├── SustainabilityContent.tsx # Green score tracker
│   │       └── AccessibilityContent.tsx  # A11y companion
│   ├── data/
│   │   ├── translations.ts          # 100+ keys × 3 languages
│   │   ├── city_knowledge.json      # Stadium knowledge base (4 cities)
│   │   ├── __tests__/
│   │   │   ├── translations.test.ts      # 14 tests: completeness, fallbacks
│   │   │   └── cityKnowledge.test.ts     # 12 tests: structure, cities, services
│   └── lib/
│       ├── security.ts              # Rate limiting, sanitization, XSS
│       └── __tests__/
│           └── security.test.ts
├── backend/app/
│   ├── main.py                      # FastAPI entry
│   ├── core/
│   │   ├── config.py                # Settings + env vars
│   │   └── security.py              # JWT auth + password hashing
│   ├── api/                         # API routers
│   ├── services/                    # RAG, crowd, analytics
│   └── models/                      # Data models
├── next.config.mjs
├── tailwind.config.ts
├── jest.config.ts
└── package.json
```

## Security Features

- Content Security Policy (CSP) headers via middleware.ts
- X-Content-Type-Options, X-Frame-Options, X-XSS-Protection
- Referrer-Policy, Permissions-Policy headers
- Rate limiting (30 requests/minute per user)
- Input sanitization (XSS prevention, length validation, event handler stripping)
- Spam detection (repeated characters, URL detection)
- Emergency keyword detection (EN/ES/FR) with immediate escalation
- JWT authentication with bcrypt password hashing
- Environment variables for all secrets (SECRET_KEY, passwords, API keys)
- .env files excluded from version control
- No hardcoded credentials in source code
- `serve.json` security headers for static hosting

## Accessibility Features

- WCAG 2.1 AA compliant ARIA labels on all interactive elements
- `role="tablist"`, `role="tab"`, `role="tabpanel"` for mode navigation
- `role="log"` for chat messages with `aria-live="polite"`
- `role="checkbox"` for sustainability tracker
- `role="progressbar"` with aria-valuenow/min/max
- Skip-to-content link for keyboard navigation
- High contrast mode toggle
- Text size slider (75%-150%)
- Screen reader-only labels via `sr-only`
- Focus-visible outlines on all interactive elements

## FIFA Data Integration

This prototype uses simulated data for demonstration. Production integration points:

- **Live Scores:** FIFA API or sports data providers (Opta, Sportradar) for real match data
- **Ticketing:** Integration with FIFA ticketing platform for seat info and digital tickets
- **Transport:** Real-time transit APIs (Google Transit, NJ Transit, SEPTA, DART, MARTA, etc.)
- **Weather:** Weather API (OpenWeatherMap) for match-day conditions at each venue
- **Emergency Services:** Integration with venue emergency systems and 911 dispatch
- **Analytics:** Real-time query logging, NLP pipeline, and Gemini Pro for intelligent responses
- **Crowd Management:** IoT sensor integration for real-time density monitoring
- **Sustainability:** Carbon footprint tracking per attendee and venue-wide metrics

## Testing

```bash
npm test              # Run all tests
npm test -- --coverage  # Run with coverage report
```

Test coverage:
- Security functions: rate limiting, sanitization, XSS, spam detection, emergency detection (23 tests)
- Translations: completeness, fallback behavior, city names (14 tests)
- City knowledge: structure validation, 13 cities, services, accessibility (12 tests)
- AppContext: state management, mode/language switching, auth (7 tests)
- ErrorBoundary: error handling, fallback rendering (3 tests)
- Integration: mode switching with language preservation (3 tests)

## Deployment

### Frontend (Static Export)
```bash
npm run build
# Output in dist/ directory - deploy to any static host
```

### Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

### Public URL via ngrok
```bash
ngrok http 3000
```

## License

MIT
