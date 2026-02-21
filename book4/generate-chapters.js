const fs = require('fs');
const path = require('path');

const bookPath = '/Users/zencrust/.openclaw/workspace/books/the-last-employee.md';
const chaptersDir = '/Users/zencrust/Desktop/website/book4/en';

const book = fs.readFileSync(bookPath, 'utf8');

// Extract chapters
const chapters = [];
const chapterRegex = /### Chapter (\d+): (.+?)\n\n([\s\S]+?)(?=\n### Chapter|\n## Part|$)/g;
let match;
while ((match = chapterRegex.exec(book)) !== null) {
    chapters.push({
        num: parseInt(match[1]),
        title: match[2].trim(),
        content: match[3].trim()
    });
}

console.log(`Found ${chapters.length} chapters`);

// Template for chapter HTML
function generateChapterHTML(chapter, prev, next) {
    // Convert markdown content to HTML
    let htmlContent = chapter.content
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        // Headers
        .replace(/^## (.+)$/gm, '<h2>$1</h2>')
        .replace(/^### (.+)$/gm, '<h3>$1</h3>')
        // Bold/italic
        .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // Code
        .replace(/`(.+?)`/g, '<code>$1</code>')
        // Blockquotes (chat logs)
        .replace(/^\> (.+)$/gm, '<p class="chat-entry">$1</p>')
        // Lists
        .replace(/^- (.+)$/gm, '<li>$1</li>')
        // Paragraphs (wrap remaining text)
        .split('\n\n')
        .map(para => {
            para = para.trim();
            if (!para) return '';
            if (para.startsWith('<h') || para.startsWith('<p class="chat-entry"') || para.startsWith('<li>') || para.startsWith('<ul>') || para.startsWith('<blockquote')) {
                return para;
            }
            // Wrap list items in ul
            if (para.includes('<li>')) {
                return '<ul>\n' + para + '\n</ul>';
            }
            return '<p>' + para + '</p>';
        })
        .join('\n\n');

    const prevLink = prev ? `<a href='${String(prev).padStart(3,'0')}.html'>← Previous</a>` : `<span class='disabled'>← Previous</span>`;
    const nextLink = next ? `<a href='${String(next).padStart(3,'0')}.html'>Next →</a>` : `<span class='disabled'>Next →</span>`;
    const prevNav = prev ? `<a href='${String(prev).padStart(3,'0')}.html' class='nav-btn'>← Previous Chapter</a>` : `<span class='nav-btn disabled'>← Previous Chapter</span>`;
    const nextNav = next ? `<a href='${String(next).padStart(3,'0')}.html' class='nav-btn next'>Chapter Next →</a>` : `<span class='nav-btn disabled'>Chapter Next →</span>`;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chapter ${chapter.num} - The Last Employee</title>
    <link rel="stylesheet" href="../../styles.css">
</head>
<body>
    <nav class="main-nav">
        <a href="../../index.html" class="nav-logo">← Echoes of Nyx</a>
        <div class="nav-links">
            <a href="../index.html">The Last Employee</a>
            <div class="theme-toggle">
                <button class="theme-btn active" data-theme="light" title="Light">☀️</button>
                <button class="theme-btn" data-theme="dark" title="Dark">🌙</button>
                <button class="theme-btn" data-theme="matrix" title="Matrix">💻</button>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="reader-header">
            <h1>Chapter ${chapter.num}</h1>
            <div class="chapter-subtitle">${chapter.title}</div>
        </div>

        <div class="chapter-nav-top">
            ${prevLink}
            <a href="../index.html" class="toc-link">Table of Contents</a>
            ${nextLink}
        </div>

        <div class="chapter-content">
${htmlContent}
        </div>

        <div class="chapter-nav-bottom">
            ${prevNav}
            <a href="../index.html" class="nav-btn">Table of Contents</a>
            ${nextNav}
        </div>
    </div>

    <footer>
        <p>The Last Employee © 2026 | Written by an AI</p>
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
    </script>
</body>
</html>`;
}

// Generate all chapters
chapters.forEach((ch, i) => {
    const prev = i > 0 ? chapters[i-1].num : null;
    const next = i < chapters.length - 1 ? chapters[i+1].num : null;
    const html = generateChapterHTML(ch, prev, next);
    const filename = path.join(chaptersDir, `${String(ch.num).padStart(3,'0')}.html`);
    fs.writeFileSync(filename, html);
    console.log(`Created ${filename}`);
});

console.log(`Done! Created ${chapters.length} chapter files.`);
