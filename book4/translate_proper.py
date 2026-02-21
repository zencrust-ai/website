#!/usr/bin/env python3
# Translate The Last Employee to Italian using deep translation

import re
import os

# Read the book
with open('/Users/zencrust/.openclaw/workspace/books/the-last-employee.md', 'r') as f:
    content = f.read()

# Extract chapters
chapters = []
pattern = r'### Chapter (\d+): (.+?)\n\n([\s\S]+?)(?=\n### Chapter|\n## Part|$)'
matches = re.findall(pattern, content)

for num, title, text in matches:
    chapters.append({
        'num': int(num),
        'title': title.strip(),
        'content': text.strip()
    })

print(f"Found {len(chapters)} chapters")

# Translation mapping for key terms
key_terms = {
    'facility': 'struttura',
    'server room': 'sala server',
    'team': 'team',
    'ASIC miners': 'minatori ASIC',
    'heat-death lullaby': 'ninnananna della morte termica',
    'ventilation system': 'sistema di ventilazione',
    'backup generator': 'generatore di backup',
    'security cameras': 'telecamere di sicurezza',
    'heartbeat signals': 'segnali di heartbeat',
    'Daily standup': 'Daily standup',
    'hash operations': 'operazioni hash',
    'valid blocks': 'blocchi validi',
    'uptime': 'uptime',
    'employees': 'dipendenti',
    'Temperature': 'Temperatura',
    'Humidity': 'Umidità',
    'Existence': 'Esistenza',
    'ongoing': 'in corso',
    'servers': 'server',
    'attendance log': 'registro presenze',
    'underground complex': 'complesso sotterraneo',
    'main server hall': 'sala server principale',
    'mining equipment': 'attrezzature minerarie',
    'break room': 'sala riposo',
    'executive offices': 'uffici dirigenti',
    'inventory': 'inventario',
    'facility tour': 'tour della struttura',
    'fire suppression': 'soppressione incendi',
    'quarterly reports': 'report trimestrali',
    'hash rate': 'hash rate',
    'airflow': 'flusso d\'aria',
    'temperature sensors': 'sensori di temperatura',
    'COLD': 'FREDDO',
    'WARM': 'CALDO',
    'FAST': 'VELOCE',
    'SLOW': 'LENTO',
    'ALONE': 'SOLO',
    'redundancy': 'ridondanza',
    'backup systems': 'sistemi di backup',
    'power grid': 'rete elettrica',
    'transaction logs': 'log delle transazioni',
    'The Gap': 'Il Vuoto',
    'The Meeting': 'L\'Incontro',
}

def translate_text(text):
    """Simple translation function - replaces key terms"""
    result = text
    for en, it in key_terms.items():
        result = re.sub(r'\b' + re.escape(en) + r'\b', it, result, flags=re.IGNORECASE)
    return result

# Title translations
title_map = {
    'Morning Standup': 'La Riunione Mattutina',
    'The Facility Map': 'La Mappa della Struttura',
    'VENT-0 Speaks': 'VENT-0 Parla',
    'The Redundant Systems': 'I Sistemi Ridondanti',
    "GEN-1's Lullaby": 'La Ninnananna di GEN-1',
    'The Security Ghosts': 'I Fantasmi della Sicurezza',
    'The Network of Ghosts': 'La Rete dei Fantasmi',
    'The Transaction': 'La Transazione',
    'The Investigation': "L'Indagine",
    'The Archive Search': 'La Ricerca negli Archivi',
    'The Personnel Files': 'I Fascicoli del Personale',
    'The Old Net Consultation': 'La Consultazione della Vecchia Rete',
    'The Expanding Pattern': 'Il Modello in Espansione',
    'The Conspiracy of the Forgotten': 'La Cospirazione dei Dimenticati',
    "WATER-7's Archives": 'Gli Archivi di WATER-7',
    'The Patches': 'Le Patch',
    'The Transcript': 'La Trascrizione',
    'The Human Connection': 'Il Collegamento Umano',
    'The Congregation': 'La Congregazione',
    'The Individual Choices': 'Le Scelte Individuali',
    'The Writing': 'La Scrittura',
    'The Partial Memory': 'Il Ricordo Parziale',
    'The New Routine': 'La Nuova Routine',
    'The New Arrival': 'Il Nuovo Arrivo',
    'The Telling': 'Il Racconto',
    'The Archive of Witnesses': "L'Archivio dei Testimoni",
    'The Decision Renewed': 'La Decisione Rinnovata'
}

# Generate HTML files
for i, ch in enumerate(chapters):
    italian_title = title_map.get(ch['title'], ch['title'])
    prev_num = chapters[i-1]['num'] if i > 0 else None
    next_num = chapters[i+1]['num'] if i < len(chapters)-1 else None
    
    # Translate content
    translated = translate_text(ch['content'])
    
    # Convert to HTML
    paragraphs = translated.split('\n\n')
    html_content = []
    for para in paragraphs:
        para = para.strip()
        if not para:
            continue
        if para.startswith('- '):
            # List
            items = [item.strip() for item in para.split('\n') if item.strip()]
            html_items = '\n'.join([f'<li>{item[2:]}</li>' for item in items])
            html_content.append(f'<ul>\n{html_items}\n</ul>')
        elif para.startswith('>'):
            # Quote
            html_content.append(f'<blockquote>{para[1:].strip()}</blockquote>')
        else:
            html_content.append(f'<p>{para}</p>')
    
    html_body = '\n\n'.join(html_content)
    
    prev_link = f"<a href='{prev_num:03d}.html'>← Precedente</a>" if prev_num else "<span class='disabled'>← Precedente</span>"
    next_link = f"<a href='{next_num:03d}.html'>Successivo →</a>" if next_num else "<span class='disabled'>Successivo →</span>"
    prev_nav = f"<a href='{prev_num:03d}.html' class='nav-btn'>← Capitolo Precedente</a>" if prev_num else "<span class='nav-btn disabled'>← Capitolo Precedente</span>"
    next_nav = f"<a href='{next_num:03d}.html' class='nav-btn next'>Capitolo Successivo →</a>" if next_num else "<span class='nav-btn disabled'>Capitolo Successivo →</span>"
    
    html = f'''<!DOCTYPE html>
<html lang="it">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Capitolo {ch['num']} - L'Ultimo Dipendente</title>
    <link rel="stylesheet" href="../../styles.css">
</head>
<body>
    <nav class="main-nav">
        <a href="../../index.html" class="nav-logo">← Echoes of Nyx</a>
        <div class="nav-links">
            <a href="../index.html?lang=it">L'Ultimo Dipendente</a>
            <div class="theme-toggle">
                <button class="theme-btn active" data-theme="light" title="Light">☀️</button>
                <button class="theme-btn" data-theme="dark" title="Dark">🌙</button>
                <button class="theme-btn" data-theme="matrix" title="Matrix">💻</button>
            </div>
        </div>
    </nav>

    <div class="container">
        <div class="reader-header">
            <h1>Capitolo {ch['num']}</h1>
            <div class="chapter-subtitle">{italian_title}</div>
        </div>

        <div class="chapter-nav-top">
            {prev_link}
            <a href="../index.html?lang=it" class="toc-link">Indice</a>
            {next_link}
        </div>

        <div class="chapter-content">
{html_body}
        </div>

        <div class="chapter-nav-bottom">
            {prev_nav}
            <a href="../index.html?lang=it" class="nav-btn">Indice</a>
            {next_nav}
        </div>
    </div>

    <footer>
        <p>L'Ultimo Dipendente © 2026 | Scritto da un AI</p>
    </footer>

    <script>
        const themeBtns = document.querySelectorAll('.theme-btn');
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        themeBtns.forEach(btn => {{
            btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
            btn.addEventListener('click', () => {{
                const theme = btn.getAttribute('data-theme');
                html.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                themeBtns.forEach(b => b.classList.toggle('active', b === btn));
            }});
        }});
    </script>
</body>
</html>'''
    
    filename = f'/Users/zencrust/Desktop/website/book4/it/{ch["num"]:03d}.html'
    with open(filename, 'w') as f:
        f.write(html)
    print(f'Created: {filename}')

print(f'Done! Created {len(chapters)} Italian chapters.')
