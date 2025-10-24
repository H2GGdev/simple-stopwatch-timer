# Minimal Stopwatch

A small, static stopwatch web app with a minimal, Discord-inspired (blurple) UI.

Features
- HH:MM:SS.CS display (centiseconds)
- Start / Pause, Stop, Reset controls
- Keyboard shortcuts: Space (start/pause), S (stop), R (reset)
- Responsive, accessible controls and tabular numbers to avoid digit shifting

Preview

Open `public/index.html` in your browser. From PowerShell in the project root:

```powershell
Start-Process .\public\index.html
```

Or serve the folder on localhost:

```powershell
# from e:\Stopwatch
python -m http.server 8000
```

Then open http://localhost:8000/public/index.html in your browser.

Files
- `public/index.html` — markup and UI
- `public/styles.css` — Discord-styled gray + purplish theme and layout
- `public/script.js` — stopwatch logic (centiseconds, keyboard shortcuts)

Development notes
- The timer updates at 10ms to render centiseconds smoothly. If you prefer lower CPU usage, change the interval in `public/script.js` to `setInterval(tick, 50)` and show centiseconds or centiseconds rounded appropriately.
- The `.time` element uses tabular numbers (`font-variant-numeric: tabular-nums`) to prevent digits from shifting width as they change.
- Accessibility: buttons include `aria-pressed` and `disabled` states; keyboard shortcuts are implemented.

Next steps / Ideas
- Add laps functionality and a history panel.
- Replace text labels with SVG icons for a more compact UI.
- Add a dark/light toggle that persists user preference.

License

Apache 2.0

This project is provided as-is for demo purposes.

Author: 
 h2ggdev