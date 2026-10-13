// (The Library): story, words and tasks. Spot ids must match js/floors/library.js.
export default {
 "name": "The Library",
 "people": "Katiblər",
 "cefr": "A2 → B1",
 "story": "Bazarın üstündə sükut hökm sürür. Katiblər hər şeyi yazır və heç nəyi unutmur. Amma burada bir oxucu nəsə itirib, kitabxanaçı isə qaydaları sevir.",
 "words": [
  {
   "w": "quiet",
   "p": "🤫",
   "az": "sakit"
  },
  {
   "w": "because",
   "p": "🔗",
   "az": "çünki"
  },
  {
   "w": "remember",
   "p": "🧠",
   "az": "xatırlamaq"
  },
  {
   "w": "lost",
   "p": "🫥",
   "az": "itirdi (lose)"
  },
  {
   "w": "find",
   "p": "🔎",
   "az": "tapmaq"
  },
  {
   "w": "already",
   "p": "✅",
   "az": "artıq"
  },
  {
   "w": "borrow",
   "p": "📖",
   "az": "(kitab) götürmək"
  },
  {
   "w": "should",
   "p": "☝️",
   "az": "etməlisən"
  }
 ],
 "forms": {
  "lose": "lost",
  "found": "find",
  "remembered": "remember"
 },
 "spots": [
  {
   "id": "red",
   "label": "a red book"
  },
  {
   "id": "green",
   "label": "a green book"
  },
  {
   "id": "blue",
   "label": "a blue book"
  },
  {
   "id": "sign",
   "label": "QUIET, PLEASE"
  },
  {
   "id": "librarian",
   "npc": "Librarian",
   "idle": [
    "Please be quiet, because people are reading.",
    "You can borrow one book for two weeks."
   ]
  },
  {
   "id": "reader",
   "npc": "Reader",
   "idle": [
    "I can't remember where I put my glasses.",
    "Without my glasses I can't read."
   ]
  },
  {
   "id": "glasses",
   "label": "glasses"
  },
  {
   "id": "spiral",
   "exit": true,
   "locked": "The librarian has not let you go up yet."
  }
 ],
 "tasks": [
  {
   "npc": "reader",
   "type": "fetch",
   "hint": "Oxucu narahatdır.",
   "say": [
    "Psst! I can't remember where I put my glasses.",
    "I think I lost them under the chair. Can you find them?"
   ],
   "target": "glasses",
   "flag": "gotGlasses",
   "doHint": "Stulun altına bax.",
   "done": "My glasses! Now I can read again. Thank you."
  },
  {
   "npc": "librarian",
   "type": "fetch",
   "hint": "Kitabxanaçı ilə danış.",
   "say": [
    "Shh! Please be quiet, because people are reading.",
    "You want to borrow a book?",
    "I have already read the red book, so I don't want it again.",
    "Please bring me the blue one."
   ],
   "target": "blue",
   "flag": "tookBlue",
   "doHint": "Rəfdə hansı kitab?",
   "done": "Yes, the blue one. Thank you."
  },
  {
   "npc": "librarian",
   "type": "build",
   "hint": "Kitabxanaçı səndən soruşur.",
   "say": [
    "Now, what do you say when you want a book?"
   ],
   "answer": "Can I borrow this book",
   "extra": [
    "quiet",
    "lost",
    "because"
   ],
   "done": "Very good. You should go up now. The stars are waiting."
  }
 ]
};
