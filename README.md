# Tower of Words

A browser game in the spirit of *Chants of Sennaar* for moving English from A2 to B1.
Climb a tower of five peoples (Gate, Market, Library, Observatory, Summit). Each floor speaks
English at a higher level: you hear characters talk, collect unknown words, decipher them in your
journal from pictures, solve tasks by understanding what people ask, build answers and say them aloud.

- Single file: `index.html`. No build step.
- Speech: Web Speech API (text-to-speech for characters, speech recognition for your answers).
  Microphone needs HTTPS and Chrome or Edge.
- Progress is saved in the browser (localStorage).

## Run locally

Open `index.html` in Chrome, or serve the folder: `npx serve .`

## Deploy

- **GitHub Pages:** the workflow in `.github/workflows/pages.yml` deploys on every push to `main`.
  If the first run fails, set *Settings → Pages → Source* to **GitHub Actions** and re-run it.
- **Vercel:** import the repository; no framework preset or build command is needed.
