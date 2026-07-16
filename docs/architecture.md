# Architecture Overview

MedIntel AI is structured as a modular clinical intelligence platform. Phase 1 establishes the boundaries that later phases will fill with authentication, document processing, risk analysis, retrieval, reporting, and copilot workflows.

## Backend Layers

`api` exposes REST endpoints and maps transport concerns to application schemas.

`services` contains use cases such as document ingestion, entity extraction, risk scoring, report generation, and chat constraints.

`repositories` isolates database persistence from business logic.

`ai` owns model-facing workflows, including embeddings, retrieval, LangGraph orchestration, prompt templates, and evidence citation handling.

`core` centralizes configuration, logging, security primitives, and application constants.

## Frontend Layers

`app` owns route-level composition through the Next.js App Router.

`features` groups domain UI and client behavior by capability.

`services` contains API clients and request adapters.

`components` contains reusable presentation primitives that stay domain-agnostic.

## Phase 1 Design Decisions

- Keep backend and frontend as separate applications to support independent deployment.
- Use environment-driven configuration from the beginning.
- Create AI-specific folders now so later RAG and LangGraph work has a defined home.
- Keep local file storage behind configuration so cloud storage can be introduced later.
- Add only a health endpoint in Phase 1 to verify service wiring without pretending feature work is complete.

## Phase 2 Design Decisions

- Store users in the `users` table with UUID primary keys, unique normalized emails, bcrypt password hashes, and active status.
- Keep JWTs stateless for now; logout is handled by client-side token removal and a server acknowledgement endpoint.
- Use dependency-based authentication so future document, report, and copilot routes can require the current user consistently.
- Create tables automatically only in development and test environments; production should use Alembic migrations.
- Keep frontend token storage simple for Phase 2, with the expectation that refresh tokens or secure cookie sessions can be added later if required.

## Phase 3 Design Decisions

- Introduce a protected app shell so dashboard, upload, analysis, reports, copilot, settings, and profile pages share consistent navigation.
- Keep route pages as polished workflow surfaces without implementing upload, analysis, or AI behavior ahead of their phases.
- Use compact cards, restrained color, and dense information grouping to fit a professional healthcare SaaS workflow.
- Preserve mobile access with a collapsible sidebar while keeping desktop navigation persistent.
