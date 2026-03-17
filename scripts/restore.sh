#!/bin/bash
# DevForge Restore Script
# Restore workspace dari GitHub repository

set -e

WORKSPACE_DIR="/root/.openclaw/workspaces/devforge"
REPO_URL="https://github.com/yughoz/clawtron"
BRANCH="main"

echo "🔨 DevForge Restore Started"
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

# Fetch from remote
echo "📥 Fetching from GitHub..."
git fetch origin "$BRANCH"

# Reset to remote branch
echo "🔄 Resetting to remote branch..."
git reset --hard "origin/$BRANCH"

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Restore completed successfully!"
