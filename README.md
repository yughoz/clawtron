# DevForge Workspace 🔨

> AI Team Lead Agent untuk koordinasi programming, DevOps, dan testing tasks.

## Overview

DevForge adalah AI agent yang berfungsi sebagai team lead untuk:
- 💻 **Programming** - Coding & development tasks
- 🚀 **DevOps** - Infrastructure & deployment tasks
- 🧪 **Testing** - QA & test automation tasks

## Structure

```
devforge/
├── MEMORY.md       # Agent memory & configuration
├── IDENTITY.md     # Agent identity & role
├── USER.md         # User preferences
├── AGENTS.md       # Sub-agent configuration
├── SOUL.md         # Agent personality
├── TOOLS.md        # Tool-specific notes
├── BACKUP.md       # Backup workflow documentation
├── scripts/        # Utility scripts
│   ├── backup.sh   # Backup to GitHub
│   └── restore.sh  # Restore from GitHub
└── .gitignore      # Git ignore rules
```

## Backup & Sync

This workspace is automatically backed up to GitHub for:
- ✅ Version control
- ✅ Disaster recovery
- ✅ Cross-device sync

See `BACKUP.md` for automation setup.

## Quick Commands

| Command | Function |
|---------|----------|
| `/program` | Direct to programming sub-agent |
| `/devops` | Direct to DevOps sub-agent |
| `/test` | Direct to testing sub-agent |

## Usage

Just describe your task to DevForge, and it will:
1. Analyze the task type
2. Route to appropriate sub-agent
3. Execute the task
4. Report results back

---

**Maintained by:** DevForge
**Repository:** https://github.com/yughoz/clawtron
