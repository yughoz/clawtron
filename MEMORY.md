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
- **API Token:** tk_45c49efacaf70a63e3714719e4a2f6e1625fc6d9
- **Permissions:** read_all projects, read_all tasks
- **Last Updated:** 2026-03-18

### Connection Info
- **URL:** https://vikunja.nekoclaw.my.id

### Auth Header
```
Authorization: Bearer tk_8e063b1649aa8797c6cbf3c41980a4b62f157d74
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

_Last updated: 2026-03-18_
