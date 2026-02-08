#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const CHAPTER_TEMPLATE = `<!DOCTYPE html>
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
            <a href="LINK_PREV" class="file-entry">
                <span class="file-name">&lt;= Previous</span>
            </a>
            <div class="chapter-content chapter-excerpt">
CONTENT
            </div>
            <a href="LINK_NEXT" class="file-entry">
                <span class="file-name">Next =&gt;</span>
            </a>
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

function generateChapter(lang, num) {
    const paddedNum = num.toString().padStart(3, '0');
    const txtFile = lang === 'en' ? `${paddedNum}.txt` : `IT/${paddedNum}.txt`;
    const htmlFile = `chapter-${lang}-${paddedNum}.html`;
    
    if (!fs.existsSync(txtFile)) {
        console.log(`Missing: ${txtFile}`);
        return;
    }
    
    const content = fs.readFileSync(txtFile, 'utf-8');
    const prevNum = num > 1 ? (num-1).toString().padStart(3, '0') : '001';
    const nextNum = num < 80 ? (num+1).toString().padStart(3, '0') : '080';
    
    const langAttr = lang === 'en' ? 'en' : 'it';
    const title = lang === 'en' 
        ? `Echoes of Nyx - Chapter ${paddedNum}`
        : `Echoes of Nyx - Capitolo ${paddedNum}`;
    const header = lang === 'en'
        ? `Chapter ${paddedNum}`
        : `Capitolo ${paddedNum}`;
    const prevLink = lang === 'en'
        ? `chapter-${lang}-${prevNum}.html`
        : `chapter-${lang}-${prevNum}.html`;
    const nextLink = lang === 'en'
        ? `chapter-${lang}-${nextNum}.html`
        : `chapter-${lang}-${nextNum}.html`;
    const prevText = lang === 'en' ? '<= Previous' : '<= Precedente';
    const nextText = lang === 'en' ? 'Next =>' : 'Successivo =>';
    
    const html = CHAPTER_TEMPLATE
        .replace('LANG', langAttr)
        .replace('TITLE', title)
        .replace('HEADER', header)
        .replace('LINK_PREV', prevLink)
        .replace('LINK_NEXT', nextLink)
        .replace('CONTENT', content)
        .replace('Previous', prevText)
        .replace('Next =>', nextText);
    
    fs.writeFileSync(htmlFile, html);
    console.log(`Generated: ${htmlFile}`);
}

console.log('Generating English chapters...');
for (let i = 1; i <= 80; i++) {
    generateChapter('en', i);
}

console.log('\nGenerating Italian chapters...');
for (let i = 1; i <= 80; i++) {
    generateChapter('it', i);
}

console.log('\nDone!');
