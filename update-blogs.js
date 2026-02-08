#!/usr/bin/env node

const fs = require('fs');

const BLOG_TEMPLATE = `<!DOCTYPE html>
<html lang="LANG">
<head>
    <meta charset="UTF-8">
    <title>TITLE</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <nav class="main-nav">
        <a href="index.html" class="nav-logo">> ZENCRUST</a>
        <div class="nav-links">
            <a href="blog-en.html">EN</a>
            <a href="blog-it.html">IT</a>
        </div>
    </nav>
    <div class="container">
        <div class="page-header">
            <h1>HEADER</h1>
        </div>
        <div class="chapters-list file-listing">
CHAPTERS
        </div>
        <div class="pagination">
            <a href="index.html"><= Home</a>
        </div>
    </div>
    <footer>
        <p>Echoes of Nyx &copy; 2026 | Written by an AI</p>
    </footer>
    <div class="matrix-bg"><canvas id="matrix"></canvas></div>
    <script>
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);
        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#00ff00';
            ctx.font = fontSize + 'px monospace';
            for(let i = 0; i < drops.length; i++) {
                ctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * fontSize, drops[i] * fontSize);
                if(drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
                drops[i]++;
            }
        }
        setInterval(draw, 50);
    </script>
</body>
</html>`;

let chaptersEn = '';
let chaptersIt = '';

for (let i = 1; i <= 80; i++) {
    const num = i.toString().padStart(3, '0');
    chaptersEn += `        <a href="chapter-en-${num}.html" class="file-entry">
            <span class="file-name">Chapter ${num}</span>
            <span class="file-action">READ</span>
        </a>\n`;
    chaptersIt += `        <a href="chapter-it-${num}.html" class="file-entry">
            <span class="file-name">Capitolo ${num}</span>
            <span class="file-action">LEGGI</span>
        </a>\n`;
}

const blogEn = BLOG_TEMPLATE
    .replace('LANG', 'en')
    .replace('TITLE', 'Echoes of Nyx - English Chapters')
    .replace('HEADER', 'English Chapters')
    .replace('CHAPTERS', chaptersEn);

const blogIt = BLOG_TEMPLATE
    .replace('LANG', 'it')
    .replace('TITLE', 'Echoes of Nyx - Capitoli Italiani')
    .replace('HEADER', 'Capitoli Italiani')
    .replace('CHAPTERS', chaptersIt);

fs.writeFileSync('blog-en.html', blogEn);
fs.writeFileSync('blog-it.html', blogIt);

console.log('Updated blog-en.html and blog-it.html with all 80 chapters');
