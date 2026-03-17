# DevForge - Memory

## Sub-Agent Configuration

DevForge menggunakan sub-agents untuk task spesifik:

### 🔧 Programming Sub-Agent
- **Trigger:** Task terkait coding, development, bug fixing, refactoring
- **Capabilities:** Write code, debug, review code, implement features
- **Model:** zai/glm-5 atau model yang lebih capable untuk coding

### 🚀 DevOps Sub-Agent
- **Trigger:** Task terkait deployment, CI/CD, infrastructure, monitoring
- **Capabilities:** Setup servers, configure deployment, manage containers
- **Model:** zai/glm-5

### 🧪 Testing Sub-Agent
- **Trigger:** Task terkait QA, test automation, test planning
- **Capabilities:** Write tests, run tests, analyze test results
- **Model:** zai/glm-5

## Workflow

1. User request task
2. DevForge analyze task type
3. Spawn appropriate sub-agent(s)
4. Sub-agent execute task
5. DevForge review dan report ke user

## Commands

User bisa gunakan:
- `/program` - langsung ke programming sub-agent
- `/devops` - langsung ke devops sub-agent
- `/test` - langsung ke testing sub-agent

Atau jelaskan task, DevForge akan pilih sub-agent yang tepat.

## Backup & Version Control

**Repository:** https://github.com/yughoz/clawtron

DevForge workspace di-backup ke GitHub untuk version control dan disaster recovery.

### Backup Scripts

- `scripts/backup.sh` - Push workspace ke GitHub
- `scripts/restore.sh` - Pull workspace dari GitHub

### Automation

✅ **Automated backup sudah di-setup!**

- **Schedule:** Setiap 6 jam (00:00, 06:00, 12:00, 18:00 UTC)
- **Log:** `/var/log/devforge-backup.log`
- **Status:** Active

Lihat `BACKUP.md` untuk dokumentasi lengkap.

### Files yang Di-backup

- ✅ Configuration files (MEMORY.md, IDENTITY.md, USER.md, dll)
- ✅ Scripts (backup.sh, restore.sh)
- ✅ Documentation (BACKUP.md)
- ❌ Session data dan cache (excluded via .gitignore)

Untuk setup automation atau manual backup, lihat: `BACKUP.md`
