# Tower of Words

A browser game in the spirit of *Chants of Sennaar* for moving English from A2 to B1.
Climb a tower of five peoples (Gate, Market, Library, Observatory, Summit). Each floor speaks
English at a higher level: you hear characters talk, collect unknown words, decipher them in your
journal from pictures, solve tasks by understanding what people ask, build answers and say them aloud.

- **3D version** (main page, `index.html` + `js/`): Three.js 0.160 from the jsDelivr CDN, no build step.
  - `js/content.js` story, words and tasks; `js/game.js` dialogue, journal, speech; `js/engine.js` camera,
    click-to-walk and clickable spots; `js/kit.js` shape helpers; `js/floors/floor1-5.js` one scene per floor.
  - `js/characters.js` loads the rigged, animated people (KayKit Adventurers, CC0) from `assets/characters/`:
    idle, walk, sit, gestures while talking, a cheer when a task is solved, heads that turn to look at you.
    If the models cannot load, `js/kit.js` falls back to its procedural figures.
  - Walk by tapping the ground (or W A S D), tap characters and objects to talk and read.
- **2D version** (`2d/index.html`): a single self-contained file with SVG scenes.
- Speech: Web Speech API (text-to-speech for characters, speech recognition for your answers).
  Microphone needs HTTPS and Chrome or Edge.
- Progress is saved in the browser (localStorage).

## Run locally

Serve the folder (ES modules need http): `npx serve .`, then open the printed address in Chrome.

## Deploy

- **GitHub Pages:** the workflow in `.github/workflows/pages.yml` deploys on every push to `main`.
  If the first run fails, set *Settings → Pages → Source* to **GitHub Actions** and re-run it.
- **Vercel:** import the repository; no framework preset or build command is needed.
