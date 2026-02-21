#!/bin/bash
# Deploy The Last Employee to GitHub Pages

REPO_NAME="the-last-employee"
GITHUB_USER="zencrust"

echo "Creating GitHub repository and deploying..."

# Initialize git repo
cd ~/.openclaw/workspace/the-last-employee-website
git init
git add .
git commit -m "Initial commit: The Last Employee - 27 chapter novella"

# Create GitHub repo and push
echo "Creating GitHub repo..."
gh repo create $GITHUB_USER/$REPO_NAME --public --source=. --remote=origin --push

# Enable GitHub Pages
echo "Enabling GitHub Pages..."
gh api repos/$GITHUB_USER/$REPO_NAME/pages \
  --method PUT \
  --input - <<EOF
{"source":{"branch":"main","path":"/"}}
EOF

echo "Done! Website will be available at: https://$GITHUB_USER.github.io/$REPO_NAME/"
