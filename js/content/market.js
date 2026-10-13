// (The Market): story, words and tasks. Spot ids must match js/floors/market.js.
export default {
 "name": "The Market",
 "people": "Tacirlər",
 "cefr": "A2+",
 "story": "Darvazanın arxasında səs-küylü bir bazar var. Tacirlər öz dillərində qışqırır, qiymətlər divarlara yazılıb. Yuxarı qalxmaq üçün bazarın qaydalarını anlamalısan.",
 "words": [
  {
   "w": "buy",
   "p": "🛒",
   "az": "almaq"
  },
  {
   "w": "sell",
   "p": "🏷️",
   "az": "satmaq"
  },
  {
   "w": "fruit",
   "p": "🍎",
   "az": "meyvə"
  },
  {
   "w": "fish",
   "p": "🐟",
   "az": "balıq"
  },
  {
   "w": "cheap",
   "p": "🪙",
   "az": "ucuz"
  },
  {
   "w": "expensive",
   "p": "💰",
   "az": "bahalı"
  },
  {
   "w": "need",
   "p": "❗",
   "az": "ehtiyac duymaq"
  },
  {
   "w": "coins",
   "p": "⚪",
   "az": "sikkələr"
  }
 ],
 "forms": {
  "sells": "sell",
  "bought": "buy",
  "sold": "sell",
  "needs": "need",
  "coin": "coins"
 },
 "spots": [
  {
   "id": "child",
   "npc": "Child",
   "idle": [
    "My mother needs fruit.",
    "I have no coins."
   ]
  },
  {
   "id": "fseller",
   "npc": "Fruit seller",
   "idle": [
    "Fruit! Cheap fruit!",
    "I sell apples for two coins."
   ]
  },
  {
   "id": "fruit",
   "label": "FRUIT · 2 COINS"
  },
  {
   "id": "fishman",
   "npc": "Fish seller",
   "idle": [
    "My fish is not cheap, but it is fresh.",
    "Fish! Fresh fish!"
   ]
  },
  {
   "id": "fish",
   "label": "FISH · 5 COINS"
  },
  {
   "id": "jeweler",
   "npc": "Jeweler",
   "idle": [
    "This ring is very expensive.",
    "Only rich people buy here."
   ]
  },
  {
   "id": "ring",
   "label": "RING · 100 COINS"
  },
  {
   "id": "stairs",
   "exit": true,
   "locked": "The stairs are closed. Only buyers can go up."
  }
 ],
 "tasks": [
  {
   "npc": "child",
   "type": "fetch",
   "hint": "Kiçik uşaq kömək istəyir.",
   "say": [
    "Excuse me! My mother needs fruit.",
    "I can't read. Which stall sells fruit?"
   ],
   "target": "fruit",
   "doHint": "Divardakı yazılara bax.",
   "done": "Thank you! That is the fruit stall."
  },
  {
   "npc": "fishman",
   "type": "choice",
   "hint": "Balıqçı ilə danış.",
   "say": [
    "You have three coins.",
    "My fish is five coins. Can you buy it?"
   ],
   "opts": [
    "No, I can't. It is too expensive.",
    "Yes, it is very cheap.",
    "I sell fish too."
   ],
   "a": 0,
   "done": "Ha! You are right. My fish is expensive. Go and buy something cheap."
  },
  {
   "npc": "fseller",
   "type": "build",
   "hint": "Meyvə satıcısına yaxınlaş.",
   "say": [
    "Hello! What do you need?"
   ],
   "answer": "I want to buy some fruit",
   "extra": [
    "sell",
    "fish",
    "expensive"
   ],
   "done": "Here you are, two apples for two coins. Now you are a buyer. The stairs are open!"
  }
 ]
};
