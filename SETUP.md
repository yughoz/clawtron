# GitHub Authentication Setup

DevForge backup workflow membutuhkan GitHub authentication untuk push ke repository.

## Option 1: Personal Access Token (Recommended)

### Step 1: Create Token

1. Go to GitHub: https://github.com/settings/tokens
2. Click "Generate new token (classic)"
3. Configure:
   - Note: `DevForge Backup`
   - Expiration: `No expiration` atau sesuai kebutuhan
   - Scopes: ✅ `repo` (full control)
4. Click "Generate token"
5. **Copy token** (tidak akan ditampilkan lagi!)

### Step 2: Update Remote URL

```bash
cd /root/.openclaw/workspaces/devforge

# Replace YOUR_TOKEN dengan token yang di-copy
git remote set-url origin https://YOUR_TOKEN@github.com/yughoz/clawtron.git
```

### Step 3: Test Push

```bash
./scripts/backup.sh
```

## Option 2: SSH Key

### Step 1: Generate SSH Key

```bash
# Generate key
ssh-keygen -t ed25519 -C "devforge@backup"

# Save to: /root/.ssh/id_ed25519_devforge
# (Press Enter untuk semua prompts)
```

### Step 2: Add to GitHub

**✅ SSH Key sudah digenerate!**

Public key (copy seluruh baris ini):
```
ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIFU0b8ImppjePwaDRi9ZyUlZqlu5I2uDVMALCUYJpFM5 devforge@openclaw
```

**Steps:**
1. Copy SELURUH baris di atas (dari `ssh-ed25519` sampai `devforge@openclaw`)
2. Go to GitHub: https://github.com/settings/ssh/new
3. Title: `DevForge Backup`
4. Key type: `Authentication Key`
5. Paste key di kolom "Key"
6. Click "Add SSH key"

### Step 3: Update Remote URL

```bash
cd /root/.openclaw/workspaces/devforge

# Change to SSH URL
git remote set-url origin git@github.com:yughoz/clawtron.git
```

### Step 4: Test Push

```bash
./scripts/backup.sh
```

## Option 3: GitHub CLI (gh)

### Step 1: Install gh

```bash
# For Ubuntu/Debian
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

### Step 2: Authenticate

```bash
gh auth login
```

Follow prompts:
- GitHub.com
- HTTPS
- Login with web browser

### Step 3: Test Push

```bash
./scripts/backup.sh
```

## Verification

Setelah setup authentication:

```bash
# Test connection
git ls-remote origin

# Test backup
./scripts/backup.sh
```

## Troubleshooting

### "fatal: could not read Username"

**Solution:** Authentication belum di-setup. Ikuti salah satu option di atas.

### "Permission denied (publickey)"

**Solution:** SSH key belum ditambahkan ke GitHub. Ulangi Step 2 di Option 2.

### "remote: Invalid username or password"

**Solution:** Token salah atau expired. Generate token baru.

### "fatal: unable to access"

**Solution:** Check koneksi internet dan repository URL.

## Security Notes

🔒 **Penting:**
- Jangan commit token ke repository
- Gunakan token dengan scope minimal yang diperlukan
- Rotate token secara berkala
- Untuk production, pertimbangkan menggunakan deploy keys

---

**Next Step:** Setelah authentication berhasil, lanjut ke `BACKUP.md` untuk setup automation.
