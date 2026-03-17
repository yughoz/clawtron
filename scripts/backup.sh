#!/bin/bash
# DevForge Backup Script
# Backup workspace ke GitHub repository

set -e

WORKSPACE_DIR="/root/.openclaw/workspaces/devforge"
REPO_URL="https://github.com/yughoz/clawtron"
BRANCH="main"
COMMIT_MSG="Backup: $(date '+%Y-%m-%d %H:%M:%S UTC')"

echo "🔨 DevForge Backup Started"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"

cd "$WORKSPACE_DIR"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not initialized"
    exit 1
fi

# Check if remote exists, add if not
if ! git remote | grep -q "origin"; then
    echo "➕ Adding remote origin..."
    git remote add origin "$REPO_URL"
fi

# Check for changes
if git diff-index --quiet HEAD -- 2>/dev/null; then
    echo "ℹ️  No changes to backup"
    exit 0
fi

# Stage all changes
echo "📦 Staging changes..."
git add -A

# Commit changes
echo "💾 Creating commit..."
git commit -m "$COMMIT_MSG"

# Push to remote
echo "🚀 Pushing to GitHub..."
git push -u origin "$BRANCH" 2>&1 || {
    echo "⚠️  Push failed. Trying to pull first..."
    git pull origin "$BRANCH" --rebase
    git push -u origin "$BRANCH"
}

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Backup completed successfully!"
echo "📍 Repository: $REPO_URL"
