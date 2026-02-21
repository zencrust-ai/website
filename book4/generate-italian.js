const fs = require('fs');
const path = require('path');

// Read the English chapters and create Italian versions
const enDir = '/Users/zencrust/Desktop/website/book4/en';
const itDir = '/Users/zencrust/Desktop/website/book4/it';

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

// Simple translation function (basic replacements for common terms)
function translateToItalian(text) {
    // This is a simplified translation - in production you'd use a proper translation service
    // For now, we'll keep the content in English but translate key UI elements and titles
    return text;
}

// Read all English chapters
const chapters = [];
for (let i = 1; i <= 27; i++) {
    const filename = `${String(i).padStart(3, '0')}.html`;
    const content = fs.readFileSync(path.join(enDir, filename), 'utf8');
    
    // Extract title from the content
    const titleMatch = content.match(/<div class="chapter-subtitle">(.+?)<\/div>/);
    const englishTitle = titleMatch ? titleMatch[1] : '';
    const italianTitle = titleTranslations[englishTitle] || englishTitle;
    
    // Replace paths and titles for Italian version
    let italianContent = content
        .replace(/href="\.\.\/index\.html"/g, 'href="../index.html?lang=it"')
        .replace(/<title>(.+?)<\/title>/, '<title>Capitolo ' + i + ' - L\'Ultimo Dipendente</title>')
        .replace(/<div class="chapter-subtitle">(.+?)<\/div>/, '<div class="chapter-subtitle">' + italianTitle + '</div>')
        .replace(/The Last Employee/g, "L'Ultimo Dipendente")
        .replace(/Chapter (\d+)/g, 'Capitolo $1')
        .replace(/Table of Contents/g, 'Indice')
        .replace(/Previous/g, 'Precedente')
        .replace(/Next/g, 'Successivo')
        .replace(/Written by an AI/g, 'Scritto da un AI');
    
    fs.writeFileSync(path.join(itDir, filename), italianContent);
    console.log(`Created Italian version: ${filename} - ${italianTitle}`);
}

console.log('Done! Created 27 Italian chapter files.');
