# 45cm Marketing Engine — Project History

## Overview

This document records the architectural evolution, runtime decisions, operational boundaries, stabilization work, and issue history of the 45cm Marketing Engine.

Current status:
- Operational Preview Mode
- API v0.7.0
- app.45cm.com operational
- api.45cm.com operational
- LinkedIn OAuth connected
- Mock publish mode enabled

---

# 1. Original Direction

The original approach started from:
- Admin
- SaaS
- Marketing Site

structure.

The architecture later shifted toward:

Engine → Runtime → Execution → Operations

because the platform goal evolved into:
- reusable execution engines
- operational automation
- channel orchestration
- runtime-driven flows

However, scope expansion became a recurring issue.

This led to a strict redefinition of the Marketing Engine boundary.

---

# 2. Engine Boundary Redefinition

Marketing Engine scope:
- Reach
- Engage
- Convert

NOT:
- Operate
- Manage
- Retain

Those responsibilities belong to the future Operations / 관재 Engine.

Boundary principle:

"If the feature is required for external acquisition and conversion → Marketing Engine. Otherwise → another engine."

---

# 3. Architecture Evolution

## Phase 1 — Runtime Foundation

Initial runtimes:
- core-ai-runtime
- core-queue-runtime
- core-db-runtime
- core-event-runtime

Initial execution flow:
Collect → Draft → Humanize → Approval → CTA

Implemented:
- BullMQ queues
- OpenAI generation
- Supabase persistence
- Slack approvals
- CTA redirect tracking

---

## Phase 2 — Humanization & Brand Voice

Implemented:
- Humanize rule engine
- Brand Voice profiles
- Slack UX improvements
- Queue observability
- Structured logging
- CTA tracking

Key principle:
AI output should not feel AI-generated.

---

## Phase 3 — Operations Console

Created:
- Dashboard
- Drafts
- Analytics
- System
- Queues

Purpose:
Operational visibility instead of developer tooling.

---

## Phase 4 — Monorepo Migration

Repository consolidated into:

apps/
packages/
domain-packs/
infra/

Later evolved into:

engines/
platform/
surfaces/

Reason:
Marketing Engine needed to become independently portable.

---

## Phase 5 — Auth / Workspace / Publish Runtime

Added:
- Supabase Auth
- Workspace runtime
- Publish runtime
- LinkedIn adapter
- Billing foundation

Key realization:
Marketing Engine required operational tenancy boundaries.

---

## Phase 6 — Billing / OAuth / Usage Guard

Implemented:
- Workspace plans
- Usage quotas
- OAuth foundations
- LinkedIn connection runtime
- Audit logs

---

## Phase 7 — Alerts / Admin / Health

Implemented:
- Alert runtime
- Queue health checks
- Slack alerting
- Admin stats
- Workspace invites

Purpose:
Operational resiliency.

---

## Phase 8 — Workflow Runtime

Implemented:
- Workflow runtime
- Rule runtime
- Notification runtime
- Classification runtime

Later constrained.

Reason:
The system was drifting toward generic BPM/orchestration.

Workflow scope was reduced to:
- campaign flow
- publish flow
- approval flow

NOT:
- ERP workflow
- organization BPM
- internal task systems

---

# 4. Marketing Engine Independentization

Marketing Engine extracted into:

engines/marketing-engine/

with:
- runtime/
- channels/
- domain/
- approval/
- analytics/
- campaign/

Platform responsibilities separated:
- auth
- billing
- workspace

Reason:
The engine must remain independently deployable.

---

# 5. Control Surface Transition

The UI evolved from:

Developer Console

into:

Marketing Operations Control Surface.

Added:
- Campaign Studio
- Brand Studio
- Visual Studio
- Channel Health
- Intelligence
- Leads
- Engagement

Core principle:

Human = strategy
Engine = execution

---

# 6. Visual Runtime

Visual Runtime introduced using:
Template-first strategy.

Reason:
Fully generative visuals created:
- inconsistent branding
- AI smell
- operational instability

Implemented:
- SVG-based generation
- CTA banners
- LinkedIn cards
- FAQ cards
- Blog covers

Key principle:
Brand consistency > visual novelty.

---

# 7. Channel Health & Adaptive Recommendation

Added:
- fatigue detection
- publish density analysis
- engagement trend analysis
- CTA conversion comparison
- recommendation panel

Important principle:

The engine suggests.
Humans decide.

---

# 8. Strategy Memory Layer

Implemented:
- strategy notes
- snapshots
- recommendation outcomes

Later constrained.

Reason:
The system was becoming too advisory-focused.

Direction corrected toward:
Execution stabilization.

---

# 9. Execution Stabilization Sprint

Stabilized:
- Campaign CRUD
- Visual Assets API
- Approval Gate
- Calendar scheduling
- Publish validation
- CTA tracking
- Engagement APIs
- Content scoring

E2E flow stabilized:

Campaign → Draft → Visual → Schedule → Approval → Publish → CTA → Lead

---

# 10. Integration Runtime Modularization

Major milestone.

Introduced:
- provider-agnostic adapter architecture
- integration registry
- capability-based providers
- generic OAuth routing

Supported providers:
- LinkedIn
- Facebook
- Instagram
- YouTube
- X
- Threads
- Naver Blog

Core structure:
adapter.publish()

instead of provider-specific branching.

---

# 11. Channel Connection Simplification

Critical UX milestone.

Problem:
OAuth complexity overwhelmed operators.

Solution:
- Connection Wizard
- Publish Target abstraction
- auto profile discovery
- reconnect UX
- test connection
- test publish

Important abstraction:

Authentication ≠ Publish Target

Example:
- User authenticates via LinkedIn account
- Publishes to LinkedIn Organization/Page

---

# 12. Operations Playbook

Operational policies formalized.

Documents created:
- campaign-policy.md
- channel-policy.md
- cta-policy.md
- approval-policy.md
- publish-rhythm.md
- failure-playbook.md
- daily-workflow.md
- launch-checklist.md
- kpi.md
- brand-rule.md

Key operational principle:

The engine automates execution.
Humans control rhythm and strategy.

---

# 13. Major Issues & Resolutions

## Railway 502

Problem:
Nixpacks detected Python unexpectedly.

Resolution:
- dedicated repo structure
- Dockerfile stabilization

---

## REDIS_URL Missing

Problem:
BullMQ attempted localhost connection.

Effect:
OpenAI requests appeared to hang.

Resolution:
- REDIS_URL required
- enqueue timeout introduced

---

## OpenAI Timeout Handling

Problem:
No AbortController handling.

Resolution:
- OpenAI timeout: 30s
- enqueue timeout: 10s

---

## Redis MISCONF

Problem:
Redis persistence failure.

Resolution:
- Redis recreation
- volume setup
- proper password config

---

## Supabase Schema Exposure

Problem:
PostgREST schema visibility issue.

Resolution:
- ALTER ROLE
- NOTIFY pgrst

---

## CTA UUID Type Issue

Problem:
subject_id type mismatch.

Resolution:
text type conversion.

---

## OAuth Complexity

Problem:
Operators could not understand:
- scopes
- organizations
- provider concepts

Resolution:
- Connection Wizard
- Publish Target abstraction
- non-technical UX

---

## Lockfile Instability

Problem:
monorepo dependency drift.

Resolution:
- pnpm install --no-frozen-lockfile
- lockfile normalization

---

# 14. Current Runtime Inventory

Current runtimes:
- ai
- queue
- db
- event
- publish
- alert
- classification
- notification
- workflow
- rule
- policy
- visual
- channel-integration
- strategy-memory

---

# 15. Current Operational State

Current mode:
Operational Preview Mode

Current readiness:
- LinkedIn OAuth connected
- Mock publish stable
- Approval flow stable
- CTA tracking operational
- Dashboard operational
- Timeline operational
- Multi-channel architecture prepared

Remaining before Production Marketing Operations Mode:
- Real publish rollout
- Slack interactivity registration
- Live campaign operation
- Real CTA optimization
- Operational cadence stabilization

---

# 16. Core Philosophy

The system evolved through several corrections.

Final philosophy:

The Marketing Engine is NOT:
- a generic automation system
- a BPM platform
- an AI advisor
- an internal operations system

It IS:
- a marketing execution engine
- a channel operations system
- a campaign execution runtime
- a conversion-oriented operational system

Final principle:

Humans:
- strategy
- judgment
- rhythm
- branding

Engine:
- execution
- amplification
- automation
- orchestration

---

# 17. Current Recommended Direction

The next phase is NOT:
- more runtimes
- more intelligence
- more abstraction

The next phase is:
Controlled Real Operations.

Meaning:
- small-scale real publishing
- real CTA usage
- real engagement observation
- operational rhythm learning
- gradual expansion

The system has entered:

From software construction
→ to operational learning.
