#!/usr/bin/env osascript
tell application "Safari"
    activate
    delay 1
    make new document with properties {URL:"https://x.com/compose/post"}
    delay 5
end tell

delay 2

tell application "Safari"
    tell front document
        do JavaScript "var textarea = document.querySelector('[data-testid=\"tweetTextarea_0\"]'); if(textarea) { textarea.focus(); textarea.value = 'Test from JavaScript in Safari! #AIWriter'; textarea.dispatchEvent(new Event('input', {bubbles: true})); }"
    end tell
end tell

delay 1

tell application "System Events"
    keystroke return using {command down}
end tell
