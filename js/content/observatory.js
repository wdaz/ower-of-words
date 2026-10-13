// (The Observatory): story, words and tasks. Spot ids must match js/floors/observatory.js.
export default {
 "name": "The Observatory",
 "people": "Ulduzçular",
 "cefr": "B1",
 "story": "Qüllənin yuxarısında gecə düşür. Ulduzçular səmanı oxuyur, gələcəyi və şərtləri danışırlar: \"əgər\", \"heç vaxt\", \"bu gecə\".",
 "words": [
  {
   "w": "sky",
   "p": "🌌",
   "az": "səma"
  },
  {
   "w": "cloudy",
   "p": "☁️",
   "az": "buludlu"
  },
  {
   "w": "stars",
   "p": "⭐",
   "az": "ulduzlar"
  },
  {
   "w": "tonight",
   "p": "🌙",
   "az": "bu gecə"
  },
  {
   "w": "if",
   "p": "🔀",
   "az": "əgər"
  },
  {
   "w": "never",
   "p": "🚫",
   "az": "heç vaxt"
  },
  {
   "w": "explain",
   "p": "💬",
   "az": "izah etmək"
  },
  {
   "w": "brightest",
   "p": "🌟",
   "az": "ən parlaq"
  }
 ],
 "forms": {
  "star": "stars",
  "clouds": "cloudy",
  "explained": "explain"
 },
 "spots": [
  {
   "id": "map",
   "label": "STAR MAP"
  },
  {
   "id": "apprentice",
   "npc": "Apprentice",
   "idle": [
    "I have never used the telescope.",
    "Can you explain how it works?"
   ]
  },
  {
   "id": "telescope",
   "label": "telescope"
  },
  {
   "id": "astronomer",
   "npc": "Astronomer",
   "idle": [
    "If the sky is cloudy, we won't see the stars.",
    "Tonight is a special night."
   ]
  },
  {
   "id": "small",
   "label": "a small star"
  },
  {
   "id": "bright",
   "label": "the brightest star"
  },
  {
   "id": "red",
   "label": "a red star"
  },
  {
   "id": "ladder",
   "exit": true,
   "locked": "The ladder is blocked. The astronomer must agree first."
  }
 ],
 "tasks": [
  {
   "npc": "astronomer",
   "type": "choice",
   "hint": "Astronomla danış.",
   "say": [
    "Look at the sky, traveler.",
    "Can we see the stars tonight?"
   ],
   "opts": [
    "No, because it is cloudy.",
    "Yes, the sky is clear.",
    "I have never seen the sky."
   ],
   "a": 0,
   "flagAfter": "clear",
   "done": "Right. If the sky is cloudy, we wait. Look! The wind is taking the clouds away."
  },
  {
   "npc": "astronomer",
   "type": "fetch",
   "hint": "Astronom tələsir.",
   "say": [
    "Quickly! The clouds are gone.",
    "Show me the brightest star in the sky."
   ],
   "target": "bright",
   "doHint": "Səmaya bax.",
   "done": "Yes! The brightest star. You have good eyes."
  },
  {
   "npc": "apprentice",
   "type": "build",
   "hint": "Şagird səndən sual verir.",
   "say": [
    "I have never used the telescope. Nobody can explain it to me.",
    "And you? Have you ever seen a falling star?"
   ],
   "answer": "I have never seen a falling star",
   "extra": [
    "cloudy",
    "tonight",
    "explain"
   ],
   "done": "Me neither! Maybe tonight. The ladder to the summit is open."
  }
 ]
};
