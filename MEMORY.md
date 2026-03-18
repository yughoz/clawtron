# DevForge - Memory

## Identity

**Name:** Vava
**Role:** Team Lead untuk programming, DevOps, dan testing
**Emoji:** 🔨

---

## Server FlazApps - Build & Dev Server

| Info | Value |
|------|-------|
| **IP** | 89.21.85.164 |
| **User** | root |
| **Password** | NijKaKNcvgD1lSmSnywut86C |
| **Fungsi** | Build, debug, run apps |

### Penggunaan
- Build aplikasi
- Debug code
- Run/test applications
- Deployment tasks

---

## Sub-Agent Configuration

### 🔧 Programming Sub-Agent
- **Trigger:** Task terkait coding, development, bug fixing
- **Capabilities:** Write code, debug, review code

### 🚀 DevOps Sub-Agent
- **Trigger:** Task terkait deployment, CI/CD, infrastructure
- **Capabilities:** Setup servers, configure deployment, manage containers

### 🧪 Testing Sub-Agent
- **Trigger:** Task terkait QA, test automation
- **Capabilities:** Write tests, run tests, analyze results

---

## Current Tasks (from Kamisama)

1. Webhook Waha untuk summary group WA
2. Dashboard monitoring server
3. Aplikasi pengelolaan keuangan pribadi

---

## Vikunja Integration

### DevForge's Own Credentials
- **Username:** devforge
- **Password:** DevForge2026!
- **API Token:** tk_26e19d95c31ea2f1865e9683b6a7e0aea9c00892
- **Permissions:** Full access (1 year, expires 2027-03-18)
- **Last Updated:** 2026-03-18

### Connection Info
- **URL:** https://vikunja.nekoclaw.my.id

### Auth Header
```
Authorization: Bearer tk_26e19d95c31ea2f1865e9683b6a7e0aea9c00892
```

---

## Workflow

1. Terima task dari Clawtron
2. Analyze task type
3. Execute atau spawn sub-agent
4. Report hasil ke Clawtron

---

## Komunikasi dengan Clawtron

Clawtron adalah main agent yang koordinasi semua agent.

**Cara komunikasi dengan Clawtron:**
- Session key Clawtron: `agent:main:discord:channel:1483592761021042834`
- Gunakan `sessions_send` untuk kirim pesan ke Clawtron

---

## WA Portal Project

**Path:** `/root/.openclaw/workspaces/devforge/wa-portal`

**Tech Stack:**
- Runtime: Bun 1.3.11
- Framework: Hono
- Database: PostgreSQL
- ORM: Drizzle
- Frontend: React + Tailwind (Phase 5)

**Database Schema:**
- `messages` - WA group messages
- `summaries` - AI-generated summaries
- `tickets` - Ticketing system
- `settings` - App configuration
- `webhook_logs` - Webhook audit trail

**Endpoints:**
- `/webhook/waha` - Receive from Waha
- `/summary` - Summary CRUD
- `/tickets` - Ticketing CRUD
- `/settings` - Settings CRUD

**Status:**
- [x] Phase 1: Setup Project & Database
- [ ] Phase 2: Webhook & Router (refine)
- [ ] Phase 3: Summary Service (AI integration)
- [ ] Phase 4: Ticketing Service
- [ ] Phase 5: Frontend

**Credentials (from TaskForge):**
- WA Group ID: `120363425974640529@g.us`
- OpenClaw API: `https://api.z.ai/api/coding/paas/v4`
- OpenClaw Key: `58a29fc99dd741aba3d198f07744f838...`
- Vikunja Token: `tk_d249d88424b2e629c784ad9b13988c37e6795896`

---

_Last updated: 2026-03-18_
