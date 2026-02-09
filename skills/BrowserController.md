# Direttive: BrowserController Skill

## ⚠️ IMPORTANTE: USA QUESTO PER POSTARE SU X

Il repo è: **https://github.com/zencrust-ai/browser-controller**

NON usare xtwitter - usa browser-controller!

## Come Postare su X (Twitter)

### Metodo 1: Script Pronto (Consigliato)
```bash
cd ~/.openclaw/skills/browser-controller
./x-post.sh "Il tuo messaggio qui"
```

### Metodo 2: AppleScript Diretto
```bash
# Naviga su X
osascript browser.scpt navigate "https://x.com/zen_crust"

# Aspetta che carichi (3 secondi)
osascript browser.scpt wait 3

# Clicca sulla textarea
osascript browser.scpt click "[data-testid='tweetTextarea_0']"

# Scrivi il messaggio
osascript browser.scpt type "Il tuo messaggio qui"

# Aspetta 1 secondo
osascript browser.scpt wait 1

# Pubblica
osascript browser.scpt post
```

### Metodo 3: Node.js Wrapper
```bash
node browser-safari.js type "Il tuo messaggio"
node browser-safari.js post
```

## File della Skill
- **Skill MD:** `/Users/zencrust/.openclaw/skills/browser-controller/SKILL.md`
- **Script AppleScript:** `browser.scpt`
- **Quick Post:** `./x-post.sh`
- **Wrapper Node.js:** `browser-safari.js`

## Prerequisiti
- macOS
- Safari (browser di default)
- Node.js (opzionale, per wrapper)

## Selettori CSS per X
| Elemento | Selettore |
|----------|-----------|
| Textarea post | `[data-testid='tweetTextarea_0']` |
| Pulsante Post | `[data-testid='tweetButtonInline']` |

## Troubleshooting

### Safari non risponde
```bash
osascript -e 'tell application "Safari" to activate'
```

### JavaScript disabilitato su Safari
- Safari → Preferenze → Avanzate → Mostra menu Sviluppo
- Sviluppo → Attiva JavaScript
