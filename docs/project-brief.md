# Lume — Project Brief

> Meeting intelligence platform dengan UI modern dan pricing yang accessible untuk small teams.

---

## Quick Info

| | |
|---|---|
| **Project name** | Lume |
| **Type** | Portfolio project — full-stack web app |
| **Timeline** | 14 minggu · 30+ jam/minggu |
| **Stage** | Pre-build — planning complete |
| **Developer** | Solo |

---

## Short Summary

Lume adalah meeting intelligence tool yang merekam, mentranskrip, dan menganalisis meeting secara otomatis menggunakan AI. Alternatif Fireflies.ai dengan UI yang jauh lebih modern dan free tier yang generous untuk small teams dan indie hackers.

---

## Problem Statement

Fireflies.ai dan tools sejenis punya dua masalah utama:

1. **UI yang outdated dan clunky** — experience-nya terasa berat dan tidak intuitif untuk pengguna modern.
2. **Pricing yang tidak ada middle ground** — loncat dari $0 ke $18/bulan per user tanpa opsi yang terjangkau untuk small team.

---

## Value Proposition

- **Cleaner UI** — Modern SaaS aesthetic (Linear/Vercel-ish), dark mode first, smooth interactions
- **Generous free tier** — 300 menit/bulan gratis, upgrade ke Pro di $8/bulan flat
- **Full pipeline** — Record → Transcribe → AI Analysis → Search, semua dalam satu tool
- **Workspace-based** — Multi-tenant dari awal, siap untuk team collaboration

---

## Target Audience

Small teams, startups, dan indie hackers yang:
- Rutin mengadakan meeting via Zoom atau Google Meet
- Butuh meeting intelligence tapi tidak mau bayar enterprise pricing
- Menghargai UI yang clean dan product yang terasa modern

---


## Tech Stack

### Frontend
- **Next.js 14** — App Router, Server Components
- **Tailwind CSS** — styling
- **shadcn/ui** — component library
- **TanStack Query** — data fetching dan caching
- **BetterAuth.js** — authentication (Google OAuth + Microsoft Oauth + email)

### Backend API
- **Fastify** — REST API, terpisah dari frontend
- **Zod** — schema validation
- **@fastify/swagger** — auto-generated API docs
- **@fastify/multipart** — file upload handling

### Worker
- **Node.js + BullMQ** — background job processing
- **Redis** — job queue storage
- **ffmpeg** — audio processing dan transcoding

### AI / ML
- **Whisper** (self-hosted via FastAPI wrapper) — speech-to-text
- **pyannote** — speaker diarization
- **OpenAI API** — LLM untuk summary, action items, sentiment
- **OpenAI Embeddings** (`text-embedding-3-small`) — semantic search

### Database
- **PostgreSQL 16** dengan **pgvector** extension — primary database + vector search
- **Prisma** — ORM dan migrations
- **pg_trgm** — full-text search

### Storage & Infra
- **AWS S3** — audio file storage
- **Docker Compose** — local dev (Postgres + Redis)
- **Vercel** — frontend deployment
- **Railway** — API + worker deployment

### Meeting Bot
- **Recall.ai** — Follow recall.ai docs

## Architecture Overview

```
Next.js (frontend)
    ↓ REST API calls
Fastify API (backend)
    ↓ queue jobs
BullMQ Worker
    ├── Whisper service (STT)
    ├── pyannote (diarization)
    ├── OpenAI (analysis + embeddings)
    └── S3 (audio storage)

PostgreSQL + pgvector (database)
Redis (job queue)
```

**Request flow (file upload):**
`User upload → S3 presigned URL → queue TRANSCRIBE job → Whisper → pyannote → merge → queue ANALYZE job → LLM → store results → notify user`

**Request flow (meeting bot):**
`User paste URL → API create Meeting → recall.ai (bot join and capture audio) → upload S3 → queue TRANSCRIBE job → same pipeline (otherwise, use recall.ai transcript)`

