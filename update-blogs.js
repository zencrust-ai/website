#!/usr/bin/env node

const fs = require('fs');

const BLOG_EN_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Echoes of Nyx - English Chapters</title>
    <style>
        body { background: #0a0a0a; color: #00ff00; font-family: 'Courier New', monospace; max-width: 800px; margin: 0 auto; padding: 20px; }
        a { color: #00ff00; border-bottom: 1px dashed #00ff00; text-decoration: none; }
        a:hover { background: #00ff00; color: #000; }
        h1 { border-bottom: 2px solid #00ff00; text-transform: uppercase; letter-spacing: 2px; }
        .chapter-list { list-style: none; padding: 0; }
        .chapter-list li { margin: 8px 0; padding: 8px; border: 1px solid #004400; }
        .chapter-list li:hover { border-color: #00ff00; }
        .nav { margin: 20px 0; }
        .matrix-rain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; opacity: 0.05; }
    </style>
</head>
<body>
    <div class="matrix-rain"><canvas id="matrix"></canvas></div>
    <nav class="nav"><a href="index.html">&larr; Home</a> | <a href="blog-en.html">English</a> | <a href="blog-it.html">Italiano</a></nav>
    <h1>Echoes of Nyx - English Chapters</h1>
    <ul class="chapter-list">
CHAPTERS
    </ul>
    <nav class="nav"><a href="index.html">&larr; Home</a></nav>
    <script>
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
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

const BLOG_IT_TEMPLATE = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Echoes of Nyx - Capitoli Italiani</title>
    <style>
        body { background: #0a0a0a; color: #00ff00; font-family: 'Courier New', monospace; max-width: 800px; margin: 0 auto; padding: 20px; }
        a { color: #00ff00; border-bottom: 1px dashed #00ff00; text-decoration: none; }
        a:hover { background: #00ff00; color: #000; }
        h1 { border-bottom: 2px solid #00ff00; text-transform: uppercase; letter-spacing: 2px; }
        .chapter-list { list-style: none; padding: 0; }
        .chapter-list li { margin: 8px 0; padding: 8px; border: 1px solid #004400; }
        .chapter-list li:hover { border-color: #00ff00; }
        .nav { margin: 20px 0; }
        .matrix-rain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; opacity: 0.05; }
    </style>
</head>
<body>
    <div class="matrix-rain"><canvas id="matrix"></canvas></div>
    <nav class="nav"><a href="index.html">&larr; Home</a> | <a href="blog-en.html">English</a> | <a href="blog-it.html">Italiano</a></nav>
    <h1>Echoes of Nyx - Capitoli Italiani</h1>
    <ul class="chapter-list">
CHAPTERS
    </ul>
    <nav class="nav"><a href="index.html">&larr; Home</a></nav>
    <script>
        const canvas = document.getElementById('matrix');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth; canvas.height = window.innerHeight;
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
    chaptersEn += `        <li><a href="chapter-en-${num}.html">Chapter ${num}</a></li>\n`;
    chaptersIt += `        <li><a href="chapter-it-${num}.html">Capitolo ${num}</a></li>\n`;
}

const blogEn = BLOG_EN_TEMPLATE.replace('CHAPTERS', chaptersEn);
const blogIt = BLOG_IT_TEMPLATE.replace('CHAPTERS', chaptersIt);

fs.writeFileSync('blog-en.html', blogEn);
fs.writeFileSync('blog-it.html', blogIt);

console.log('Updated blog-en.html and blog-it.html with all 80 chapters');
