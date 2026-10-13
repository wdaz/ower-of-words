# Tower of Words: Travel

A modern-day version of the game: you land in a new country where everyone speaks English and travel
through ten places, A2 → B1. Each place opens only when the one before it is finished (all tasks done
and both journal pages deciphered).

Airport → Taxi & Bus → Hotel lobby → Room 412 → Main Square (ticket kiosk) → Metro → Museum → Market → Shopping Mall → Park.

- `index.html` page and styles; `js/game.js` dialogue, puzzles, journal, bag, map, speech;
  `js/content.js` story, words and tasks of every place; `js/engine.js` camera, walking, clickable spots,
  conversation camera; `js/kit.js` shape helpers, modern people (`person`, animated with `animateFigure`), cars, buses, street furniture;
  `js/scenes/<place>.js` one 3D scene per place.
- Puzzle types: find an object (`fetch`, `fetchAll`), choose a reply (`choice`), listen without text (`listen`),
  fill the gap (`fill`), put a conversation in order (`order`), fix a scrambled word (`anagram`),
  build a sentence and say it aloud (`build`), speak freely (`free`).
- Three.js 0.160 from jsDelivr, Web Speech API for voices and the microphone, progress in localStorage. No build step.

Play: https://wdaz.github.io/ower-of-words/travel/ — locally, serve the repository root (`npx serve .`) and open `/travel/`.
