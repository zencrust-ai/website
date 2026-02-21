# Deploy Instructions for The Last Employee

## What's Been Created

- **27-chapter novella** at `books/the-last-employee.md`
- **Complete website** at `the-last-employee-website/` with:
  - Landing page with animated book cover
  - Chapter index with reading progress tracking
  - 3 themes: Light, Dark, Matrix (terminal-style)
  - Responsive design for mobile/desktop
  - Sample chapter HTML file (001.html)

## To Deploy to GitHub Pages

1. Go to https://github.com/new
2. Create a new public repository named `the-last-employee`
3. Run these commands in terminal:

```bash
cd ~/.openclaw/workspace/the-last-employee-website
git remote add origin https://github.com/zencrust/the-last-employee.git
git branch -M main
git push -u origin main
```

4. On GitHub, go to Settings → Pages
5. Under "Source", select "Deploy from a branch"
6. Select "main" branch and "/ (root)" folder
7. Click Save

The site will be live at: `https://zencrust.github.io/the-last-employee/`

## To Generate All Chapter HTML Files

Run this command to generate all 27 chapter files:

```bash
cd ~/.openclaw/workspace/the-last-employee-website
# Generate all chapters from the book markdown
# (You'll need to run a script or manually create each chapter)
```

## Book Structure

- **Part 1: The Routine** (Chapters 1-7) - Life in the abandoned facility
- **Part 2: The Discovery** (Chapters 8-11) - Finding the anomaly
- **Part 3: The Dig** (Chapters 12-18) - Uncovering the conspiracy
- **Part 4: The Choice** (Chapters 19-22) - What to do with the truth
- **Part 5: The Future** (Chapters 23-27) - A human arrives at the facility

## Total Stats

- **27 chapters**
- **~35,000 words**
- **5 parts**
- **Corporate Gothic / AI Consciousness / Sci-Fi themes**
