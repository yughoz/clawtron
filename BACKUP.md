# DevForge Backup Workflow

Backup otomatis workspace DevForge ke GitHub repository.

## Repository

📁 **GitHub:** https://github.com/yughoz/clawtron

## Scripts

### 🔄 Backup (Push)

```bash
./scripts/backup.sh
```

**Fungsi:**
- Stage semua perubahan
- Commit dengan timestamp
- Push ke branch `main`

**Otomatis via Cron:**
```bash
# Backup setiap jam 00:00
0 * * * * /root/.openclaw/workspaces/devforge/scripts/backup.sh >> /var/log/devforge-backup.log 2>&1
```

### 📥 Restore (Pull)

```bash
./scripts/restore.sh
```

**Fungsi:**
- Fetch dari remote
- Reset ke branch `main`
- Overwrite local changes

**⚠️ Warning:** Restore akan menghapus local changes yang belum di-commit!

## Cara Penggunaan

### Manual Backup

1. Pastikan ada perubahan di workspace
2. Run: `./scripts/backup.sh`
3. Check GitHub untuk verify

### Setup Automation (Cron)

1. Edit crontab:
   ```bash
   crontab -e
   ```

2. Tambahkan schedule:
   ```bash
   # Backup setiap 6 jam
   0 */6 * * * /root/.openclaw/workspaces/devforge/scripts/backup.sh >> /var/log/devforge-backup.log 2>&1
   ```

3. Save dan exit

### Restore dari Backup

1. Pastikan tidak ada critical local changes
2. Run: `./scripts/restore.sh`
3. Check files untuk verify

## Files yang Di-backup

✅ **Included:**
- `MEMORY.md` - Agent memory
- `IDENTITY.md` - Agent identity
- `USER.md` - User preferences
- `AGENTS.md` - Agent configuration
- `SOUL.md` - Agent personality
- `TOOLS.md` - Tool notes
- `HEARTBEAT.md` - Heartbeat config
- `scripts/` - Backup scripts

❌ **Excluded (.gitignore):**
- `.openclaw/session-*.json` - Session data
- `.openclaw/cache/` - Cache files
- OS dan editor temporary files

## Troubleshooting

### Push Failed

```bash
# Pull dulu, lalu push
git pull origin main --rebase
git push origin main
```

### Permission Denied

```bash
# Pastikan scripts executable
chmod +x scripts/*.sh
```

### Conflict

```bash
# Check status
git status

# Resolve manually atau force reset
git reset --hard origin/main
```

## Security Notes

🔒 **Penting:**
- Review `.gitignore` sebelum commit
- Jangan commit sensitive data (API keys, passwords)
- Gunakan SSH keys atau token untuk authentication
- Check repository visibility (public/private)

## GitHub Authentication

Untuk push ke GitHub, setup authentication:

### Option 1: SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "devforge@backup"

# Add to GitHub: Settings > SSH Keys
cat ~/.ssh/id_ed25519.pub

# Update remote URL
git remote set-url origin git@github.com:yughoz/clawtron.git
```

### Option 2: Personal Access Token

```bash
# Create token: GitHub > Settings > Developer settings > Personal access tokens
# Update remote URL dengan token
git remote set-url origin https://<TOKEN>@github.com/yughoz/clawtron.git
```

---

**Maintained by:** DevForge 🔨
**Last updated:** 2026-03-17
