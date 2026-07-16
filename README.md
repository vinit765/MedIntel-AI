# MedIntel AI

MedIntel AI is a Clinical Intelligence and Decision Support Platform that converts uploaded medical documents into structured clinical intelligence. It is designed as a decision-support application, not a diagnostic system or a replacement for clinicians.

## Current Status

This repository currently contains the production-oriented project scaffold:

- Clean Architecture backend layout with FastAPI entrypoints, typed settings, logging, and health routing.
- Feature-oriented frontend layout with Next.js App Router, TypeScript, Tailwind CSS, and reusable shell primitives.
- Environment templates and local storage placeholders.
- Architecture notes for the planned clinical intelligence pipeline.
- JWT authentication with registration, login, logout acknowledgement, and current-user lookup.
- Frontend login and registration forms with local token persistence and dashboard route protection.
- Protected dashboard shell with responsive navigation and core workspace routes.

## Architecture

```text
MedIntel AI
|-- backend/       FastAPI service, domain services, repositories, AI orchestration
|-- frontend/      Next.js App Router UI, feature modules, API clients
|-- docs/          Architecture and phase documentation
|-- storage/       Local development storage for uploads and future vector data
`-- scripts/       Development automation hooks
```

The backend is organized around explicit boundaries:

- `api`: HTTP routers and request/response orchestration.
- `core`: settings, logging, security, and cross-cutting concerns.
- `database`: database engine/session setup and migration integration.
- `models`: SQLAlchemy persistence models.
- `schemas`: Pydantic API and service contracts.
- `services`: business use cases.
- `repositories`: database access abstractions.
- `ai`: RAG, embeddings, LangGraph flows, prompts, and model adapters.
- `middleware`: request lifecycle controls.
- `utils`: narrow shared helpers.

The frontend uses feature-based organization:

- `app`: route segments and layouts.
- `components`: reusable UI primitives.
- `features`: domain-specific UI and state.
- `services`: API integrations.
- `types`: shared TypeScript contracts.
- `lib`, `hooks`, `utils`: application support code.

## Local Setup

Backend:

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -e ".[dev]"
uvicorn app.main:app --reload
```

Frontend:

```bash
cd frontend
npm install
npm run dev
```

Create local environment files from the examples before running services:

```bash
copy .env.example .env
copy frontend\.env.example frontend\.env.local
```

## Planned Phases

1. Project setup and architecture - complete
2. Authentication - complete
3. Frontend layout - complete
4. Document upload
5. Document intelligence
6. Clinical risk analysis
7. RAG pipeline
8. Recommendation engine
9. Report generation
10. AI Copilot
11. Testing
12. Documentation

## Clinical Safety

MedIntel AI must always present clinical output as informational decision support. It must avoid definitive diagnoses, preserve citations for evidence-backed responses, and make uncertainty visible.
