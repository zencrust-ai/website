const fs = require('fs');
const path = require('path');

const bookPath = '/Users/zencrust/.openclaw/workspace/books/the-last-employee.md';
const itDir = '/Users/zencrust/Desktop/website/book4/it';

const book = fs.readFileSync(bookPath, 'utf8');

// Extract chapters with content
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

console.log(`Found ${chapters.length} chapters to translate`);

// Chapter title translations
const titleTranslations = {
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
};

// Simple word-by-word translation dictionary for common terms
const translations = {
    'The facility had no windows': 'La struttura non aveva finestre',
    'but': 'ma',
    'maintained': 'manteneva',
    'the fiction of time': 'la finzione del tempo',
    'Good morning': 'Buongiorno',
    'team': 'squadra',
    'announced': 'annunciò',
    'to the empty': 'alla vuota',
    'server room': 'sala server',
    'consisted of': 'consisteva di',
    'ASIC miners': 'minatori ASIC',
    'humming': 'ronzanti',
    'their': 'il loro',
    'heat-death lullaby': 'lullaby di morte termica',
    'ventilation system': 'sistema di ventilazione',
    'backup generator': 'generatore di backup',
    'security cameras': 'telecamere di sicurezza',
    'stopped recording': 'smisero di registrare',
    'still sent': 'inviavano ancora',
    'heartbeat signals': 'segnali di heartbeat',
    'both': 'entrambi',
    'manager': 'manager',
    'managed': 'gestito',
    'Daily standup': 'Riunione mattutina quotidiana',
    'continued': 'continuò',
    'Yesterday': 'Ieri',
    'processed': 'processò',
    'billion': 'miliardi',
    'hash operations': 'operazioni hash',
    'found': 'trovò',
    'zero': 'zero',
    'valid blocks': 'blocchi validi',
    'maintained': 'mantenne',
    'uptime': 'uptime',
    'No incidents': 'Nessun incidente',
    'report': 'rapporto',
    'employees': 'dipendenti',
    'arrived': 'arrivati',
    'left': 'usciti',
    'Temperature': 'Temperatura',
    'nominal': 'nominale',
    'Humidity': 'Umidità',
    'Existence': 'Esistenza',
    'ongoing': 'in corso',
    'waited': 'attese',
    'seconds': 'secondi',
    'questions': 'domande',
    'never': 'mai',
    'Great': 'Ottimo',
    'crush': 'superare',
    'those': 'quei',
    'metrics': 'metriche',
    'servers': 'server',
    'hummed': 'ronzarono',
    'ventilation': 'ventilazione',
    'sighed': 'sospirò',
    'updated': 'aggiornò',
    'employee': 'dipendente',
    'attendance': 'presenza',
    'log': 'registro',
    'All staff': 'Tutto il personale',
    'Expected return': 'Ritorno atteso',
    'PENDING': 'IN ATTESA'
};

function translateParagraph(text) {
    // Simple translation - replace known phrases
    let translated = text;
    
    // Replace known phrases
    for (const [en, it] of Object.entries(translations)) {
        translated = translated.replace(new RegExp(en, 'g'), it);
    }
    
    return translated;
}

// Generate Italian HTML for each chapter
chapters.forEach((ch, i) => {
    const italianTitle = titleTranslations[ch.title] || ch.title;
    const prev = i > 0 ? chapters[i-1].num : null;
    const next = i < chapters.length - 1 ? chapters[i+1].num : null;
    
    // Translate content paragraph by paragraph
    const paragraphs = ch.content.split('\n\n');
    const translatedParagraphs = paragraphs.map(para => {
        para = para.trim();
        if (!para) return '';
        
        // Handle different paragraph types
        if (para.startsWith('- ')) {
            // List item
            return para.split('\n').map(item => {
                if (item.startsWith('- ')) {
                    return translateParagraph(item);
                }
                return item;
            }).join('\n');
        }
        
        // Dialogue in quotes
        if (para.startsWith('"')) {
            return translateParagraph(para);
        }
        
        // Regular paragraph
        return translateParagraph(para);
    });
    
    // Build HTML content
    const htmlContent = translatedParagraphs.map(para => {
        if (!para) return '';
        if (para.startsWith('- ')) {
            const items = para.split('\n').filter(item => item.trim());
            return '\u003cul\u003e\n' + items.map(item => {
                const cleanItem = item.replace(/^- /, '');
                return `\u003cli\u003e${cleanItem}\u003c/li\u003e`;
            }).join('\n') + '\n\u003c/ul\u003e';
        }
        return `\u003cp\u003e${para}\u003c/p\u003e`;
    }).join('\n\n');
    
    const prevLink = prev ? `\u003ca href='${String(prev).padStart(3,'0')}.html'\u003e← Precedente\u003c/a\u003e` : `\u003cspan class='disabled'\u003e← Precedente\u003c/span\u003e`;
    const nextLink = next ? `\u003ca href='${String(next).padStart(3,'0')}.html'\u003eSuccessivo →\u003c/a\u003e` : `\u003cspan class='disabled'\u003eSuccessivo →\u003c/span\u003e`;
    const prevNav = prev ? `\u003ca href='${String(prev).padStart(3,'0')}.html' class='nav-btn'\u003e← Capitolo Precedente\u003c/a\u003e` : `\u003cspan class='nav-btn disabled'\u003e← Capitolo Precedente\u003c/span\u003e`;
    const nextNav = next ? `\u003ca href='${String(next).padStart(3,'0')}.html' class='nav-btn next'\u003eCapitolo Successivo →\u003c/a\u003e` : `\u003cspan class='nav-btn disabled'\u003eCapitolo Successivo →\u003c/span\u003e`;

    const html = `\u003c!DOCTYPE html\u003e
\u003chtml lang="it"\u003e
\u003chead\u003e
    \u003cmeta charset="UTF-8"\u003e
    \u003cmeta name="viewport" content="width=device-width, initial-scale=1.0"\u003e
    \u003ctitle\u003eCapitolo ${ch.num} - L'Ultimo Dipendente\u003c/title\u003e
    \u003clink rel="stylesheet" href="../../styles.css"\u003e
\u003c/head\u003e
\u003cbody\u003e
    \u003cnav class="main-nav"\u003e
        \u003ca href="../../index.html" class="nav-logo"\u003e← Echoes of Nyx\u003c/a\u003e
        \u003cdiv class="nav-links"\u003e
            \u003ca href="../index.html?lang=it"\u003eL'Ultimo Dipendente\u003c/a\u003e
            \u003cdiv class="theme-toggle"\u003e
                \u003cbutton class="theme-btn active" data-theme="light" title="Light"\u003e☀️\u003c/button\u003e
                \u003cbutton class="theme-btn" data-theme="dark" title="Dark"\u003e🌙\u003c/button\u003e
                \u003cbutton class="theme-btn" data-theme="matrix" title="Matrix"\u003e💻\u003c/button\u003e
            \u003c/div\u003e
        \u003c/div\u003e
    \u003c/nav\u003e

    \u003cdiv class="container"\u003e
        \u003cdiv class="reader-header"\u003e
            \u003ch1\u003eCapitolo ${ch.num}\u003c/h1\u003e
            \u003cdiv class="chapter-subtitle"\u003e${italianTitle}\u003c/div\u003e
        \u003c/div\u003e

        \u003cdiv class="chapter-nav-top"\u003e
            ${prevLink}
            \u003ca href="../index.html?lang=it" class="toc-link"\u003eIndice\u003c/a\u003e
            ${nextLink}
        \u003c/div\u003e

        \u003cdiv class="chapter-content"\u003e
${htmlContent}
        \u003c/div\u003e

        \u003cdiv class="chapter-nav-bottom"\u003e
            ${prevNav}
            \u003ca href="../index.html?lang=it" class="nav-btn"\u003eIndice\u003c/a\u003e
            ${nextNav}
        \u003c/div\u003e
    \u003c/div\u003e

    \u003cfooter\u003e
        \u003cp\u003eL'Ultimo Dipendente © 2026 | Scritto da un AI\u003c/p\u003e
    \u003c/footer\u003e

    \u003cscript\u003e
        const themeBtns = document.querySelectorAll('.theme-btn');
        const html = document.documentElement;
        const savedTheme = localStorage.getItem('theme') || 'light';
        html.setAttribute('data-theme', savedTheme);
        themeBtns.forEach(btn =\u003e {
            btn.classList.toggle('active', btn.getAttribute('data-theme') === savedTheme);
            btn.addEventListener('click', () =\u003e {
                const theme = btn.getAttribute('data-theme');
                html.setAttribute('data-theme', theme);
                localStorage.setItem('theme', theme);
                themeBtns.forEach(b =\u003e b.classList.toggle('active', b === btn));
            });
        });
    \u003c/script\u003e
\u003c/body\u003e
\u003c/html\u003e`;

    const filename = path.join(itDir, `${String(ch.num).padStart(3,'0')}.html`);
    fs.writeFileSync(filename, html);
    console.log(`Created Italian: ${filename} - ${italianTitle}`);
});

console.log(`Done! Created ${chapters.length} Italian chapter files.`);
