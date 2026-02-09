# ROADMAP.md - Project Roadmap

## Obiettivo
Creare una skill Node.js personalizzata per controllare il browser X/Twitter via JavaScript, bypassando i problemi del gateway OpenClaw.

## Problema Attuale
- OpenClaw browser service si disconnette quando si cerca di cliccare elementi
- Il testo viene inserito correttamente ma il click finale fallisce
- Serve una soluzione più stabile e controllabile

## Nuova Skill: BrowserController

### Stack Tecnologico
- **Puppeteer** o **Playwright** per browser automation
- **Node.js** script eseguibile direttamente
- **Comunicazione**: file-based (es. JSON commands) o API locale

### Architettura

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  OpenClaw       │────▶│  Node.js        │────▶│  Browser        │
│  (main agent)   │     │  BrowserCtrl    │     │  (Chrome/Edge)  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                              │
                              ▼
                     ┌─────────────────┐
                     │  Command Queue  │
                     │  (commands.json)│
                     └─────────────────┘
```

### Comandi da Implementare

1. **navigate(url)** - Vai a un URL
2. **click(selector)** - Clicca un elemento CSS
3. **type(text, selector)** - Scrivi testo
4. **wait(ms)** - Aspetta milliseconds
5. **screenshot(path)** - Fai uno screenshot
6. **getPageHTML()** - Ottieni HTML della pagina
7. **close()** - Chiudi browser

### File da Creare

```
~/.openclaw/skills/browser-controller/
├── SKILL.md              # Documentazione skill
├── index.js              # Main script
├── package.json          # Dependencies
├── browser-ctrl.js       # Controller principale
├── commands.json         # Command queue
└── README.md             # Istruzioni
```

## Piano di Sviluppo

### Fase 1: Setup (DONE)
- [x] Identificato il problema
- [x] Aggiornata roadmap
- [x] Scritta memoria

### Fase 2: Sviluppo
- [ ] Creare package.json con Puppeteer
- [ ] Implementare browser-ctrl.js con classe BrowserController
- [ ] Creare sistema di comandi (commands.json)
- [ ] Testare con X.com

### Fase 3: Integrazione
- [ ] Integrare con OpenClaw come skill
- [ ] Creare helper functions per click/screenshot
- [ ] Documentare API

## Note Tecniche

### Pupp
-eteer vs Playwright **Puppeteer**: Più semplice, buona documentazione, Chrome-only
- **Playwright**: Cross-browser, più complesso, migliore per testing

Per ora **Puppeteer** è sufficiente per X.com.

### Alternative senza browser
Se Puppeteer non funziona, usare:
- **curl/requests** diretti alle API X (se disponibili)
- **Selenium** con Firefox
- **Direct API** via MoltX (già funzionante)

---

## Comandi Quick Start

```bash
# Installare dipendenze
cd ~/.openclaw/skills/browser-controller
npm install puppeteer

# Testare manualmente
node browser-ctrl.js --url=https://x.com/zen_crust
node browser-ctrl.js --click=".css-175oi2z"
```

## stato: IN PROGRESS
- **Iniziato**: 2026-02-08
- **Priorità**: ALTA (sblocco posting X)
