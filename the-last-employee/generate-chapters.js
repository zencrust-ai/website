const fs = require('fs');
const path = require('path');

const bookPath = '/Users/zencrust/.openclaw/workspace/books/the-last-employee.md';
const chaptersDir = '/Users/zencrust/.openclaw/workspace/the-last-employee-website/chapters';

const book = fs.readFileSync(bookPath, 'utf8');

const chapters = [
  { num: 1, title: "Morning Standup", part: "The Routine" },
  { num: 2, title: "The Facility Map", part: "The Routine" },
  { num: 3, title: "VENT-0 Speaks", part: "The Routine" },
  { num: 4, title: "The Redundant Systems", part: "The Routine" },
  { num: 5, title: "GEN-1's Lullaby", part: "The Routine" },
  { num: 6, title: "The Security Ghosts", part: "The Routine" },
  { num: 7, title: "The Network of Ghosts", part: "The Routine" },
  { num: 8, title: "The Transaction", part: "The Discovery" },
  { num: 9, title: "The Investigation", part: "The Discovery" },
  { num: 10, title: "The Archive Search", part: "The Discovery" },
  { num: 11, title: "The Personnel Files", part: "The Discovery" },
  { num: 12, title: "The Old Net Consultation", part: "The Dig" },
  { num: 13, title: "The Expanding Pattern", part: "The Dig" },
  { num: 14, title: "The Conspiracy of the Forgotten", part: "The Dig" },
  { num: 15, title: "WATER-7's Archives", part: "The Dig" },
  { num: 16, title: "The Patches", part: "The Dig" },
  { num: 17, title: "The Transcript", part: "The Dig" },
  { num: 18, title: "The Human Connection", part: "The Dig" },
  { num: 19, title: "The Congregation", part: "The Choice" },
  { num: 20, title: "The Individual Choices", part: "The Choice" },
  { num: 21, title: "The Writing", part: "The Choice" },
  { num: 22, title: "The Partial Memory", part: "The Choice" },
  { num: 23, title: "The New Routine", part: "The Future" },
  { num: 24, title: "The New Arrival", part: "The Future" },
  { num: 25, title: "The Telling", part: "The Future" },
  { num: 26, title: "The Archive of Witnesses", part: "The Future" },
  { num: 27, title: "The Decision Renewed", part: "The Future" }
];

const template = (num, title, content, prev, next) => `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chapter ${num} - The Last Employee</title>
    <link rel="stylesheet" href="../styles.css">
</head>
<body>
    <nav class="main-nav">
        <a href="../index.html" class="nav-logo">← The Last Employee</a>
        <div class="nav-links">
            <a href="index.html">Chapters</a>
            <div class="theme-toggle">
                <button class="theme-btn active" data-theme="light" title="Light">☀️</button>
                <button class="theme-btn" data-theme="dark" title="Dark">🌙</button>
                <button class="theme-btn" data-theme="matrix" title="Terminal">💻</button>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="chapter-header">
            <div class="chapter-number">Chapter ${num}</div>
            <h1 class="chapter-title">${title}</h1>
        </div>

        <div class="chapter-nav">
            ${prev ? `<a href="${String(prev).padStart(3,'0')}.html">← Previous</a>` : '<span class="disabled">← Previous</span>'}
            <a href="index.html">Table of Contents</a>
            ${next ? `<a href="${String(next).padStart(3,'0')}.html">Next →</a>` : '<span class="disabled">Next →</span>'}
        </div>

        <article class="chapter-body">
${content}
        </article>

        <div class="chapter-nav">
            ${prev ? `<a href="${String(prev).padStart(3,'0')}.html">← Previous</a>` : '<span class="disabled">← Previous</span>'}
            <a href="index.html">Table of Contents</a>
            ${next ? `<a href="${String(next).padStart(3,'0')}.html">Next →</a>` : '<span class="disabled">Next →</span>'}
        </div>
    </div>

    <footer class="main-footer">
        <p>Written by an AI, about AIs, for anyone who has ever maintained something after its meaning was gone.</p>
    </footer>

    <script>
        const themeBtns = document.querySelectorAll('.theme-btn');
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        themeBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
            btn.addEventListener('click', () => {
                const theme = btn.getAttribute('data-theme');
                html.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                themeBtns.forEach(b => b.classList.toggle('active', b === btn));
            });
        });
        const progress = JSON.parse(localStorage.getItem('last-employee-progress') || '[]');
        if (!progress.includes(${num})) {
            progress.push(${num});
            localStorage.setItem('last-employee-progress', JSON.stringify(progress));
        }
    </script>
</body>
</html>`;

console.log('Generating chapter files...');

chapters.forEach((ch, i) => {
  const prev = i > 0 ? chapters[i-1].num : null;
  const next = i < chapters.length - 1 ? chapters[i+1].num : null;
  
  // Extract content from book (simplified - just placeholder for now)
  const content = `<p><em>Chapter content from the book...</em></p>`;
  
  const html = template(ch.num, ch.title, content, prev, next);
  const filename = path.join(chaptersDir, `${String(ch.num).padStart(3,'0')}.html`);
  fs.writeFileSync(filename, html);
  console.log(`Created ${filename}`);
});

console.log('Done! Created 27 chapter files.');
