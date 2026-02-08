#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const BASE_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Echoes of Nyx - Chapter XXX: Chapter XXX</title>
    <style>
        body { background: #0a0a0a; color: #00ff00; font-family: 'Courier New', monospace; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.8; }
        a { color: #00ff00; border-bottom: 1px dashed #00ff00; text-decoration: none; }
        a:hover { background: #00ff00; color: #000; }
        h1 { border-bottom: 2px solid #00ff00; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 10px; }
        .nav { margin: 20px 0; padding: 15px 0; border-top: 1px solid #004400; border-bottom: 1px solid #004400; display: flex; justify-content: space-between; }
        .chapter-content { white-space: pre-wrap; }
        .matrix-rain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; opacity: 0.05; }
    </style>
</head>
<body>
    <div class="matrix-rain"><canvas id="matrix"></canvas></div>
    <nav class="nav">
        <a href="blog-en.html">&larr; Back to English Chapters</a>
        <span></span>
        <a href="chapter-en-XXX.html">XXX &rarr;</a>
    </nav>
    <h1>Chapter XXX: Chapter XXX</h1>
    <div class="chapter-content">CONTENT</div>
    <nav class="nav">
        <a href="blog-en.html">&larr; All Chapters</a>
        <a href="chapter-en-XXX.html">Next &rarr;</a>
    </nav>
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

const BASE_HTML_IT = `<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <title>Echoes of Nyx - Capitolo XXX: Capitolo XXX</title>
    <style>
        body { background: #0a0a0a; color: #00ff00; font-family: 'Courier New', monospace; max-width: 800px; margin: 0 auto; padding: 20px; line-height: 1.8; }
        a { color: #00ff00; border-bottom: 1px dashed #00ff00; text-decoration: none; }
        a:hover { background: #00ff00; color: #000; }
        h1 { border-bottom: 2px solid #00ff00; text-transform: uppercase; letter-spacing: 2px; padding-bottom: 10px; }
        .nav { margin: 20px 0; padding: 15px 0; border-top: 1px solid #004400; border-bottom: 1px solid #004400; display: flex; justify-content: space-between; }
        .chapter-content { white-space: pre-wrap; }
        .matrix-rain { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: -1; opacity: 0.05; }
    </style>
</head>
<body>
    <div class="matrix-rain"><canvas id="matrix"></canvas></div>
    <nav class="nav">
        <a href="blog-it.html">&larr; Torna ai Capitoli Italiani</a>
        <span></span>
        <a href="chapter-it-XXX.html">XXX &rarr;</a>
    </nav>
    <h1>Capitolo XXX: Capitolo XXX</h1>
    <div class="chapter-content">CONTENT</div>
    <nav class="nav">
        <a href="blog-it.html">&larr; Tutti i Capitoli</a>
        <a href="chapter-it-XXX.html">Successivo &rarr;</a>
    </nav>
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
    
    const prevLink = num > 1 ? `<a href="chapter-${lang}-${prevNum}.html">&larr;</a>` : '<span></span>';
    const nextLink = num < 80 ? `<a href="chapter-${lang}-${nextNum}.html">${lang === 'en' ? 'Next →' : 'Successivo →'}</a>` : '<span></span>';
    
    const template = lang === 'en' ? BASE_HTML : BASE_HTML_IT;
    const html = template
        .replace(/XXX/g, paddedNum)
        .replace('CONTENT', content)
        .replace('&larr; Back to English Chapters', prevLink)
        .replace('&larr; All Chapters', prevLink)
        .replace('&larr; Torna ai Capitoli Italiani', prevLink)
        .replace('Tutti i Capitoli', prevLink)
        .replace('XXX →', nextLink)
        .replace('Next →', nextLink)
        .replace('Successivo →', nextLink);
    
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
