// (The Gate): story, words and tasks. Spot ids must match js/floors/gate.js.
export default {
 "name": "The Gate",
 "people": "Gözətçilər",
 "cefr": "A2",
 "story": "Səhra boyunca uzun yol gəldin. Qarşında Sözlər Qülləsi yüksəlir. Deyirlər, zirvəyə çatan hər xalqın dilini anlayır. Amma darvaza bağlıdır və gözətçi sənin dilini bilmir.",
 "words": [
  {
   "w": "water",
   "p": "💧",
   "az": "su"
  },
  {
   "w": "bread",
   "p": "🍞",
   "az": "çörək"
  },
  {
   "w": "door",
   "p": "🚪",
   "az": "qapı"
  },
  {
   "w": "key",
   "p": "🔑",
   "az": "açar"
  },
  {
   "w": "tired",
   "p": "😩",
   "az": "yorğun"
  },
  {
   "w": "give",
   "p": "🤲",
   "az": "vermək"
  },
  {
   "w": "open",
   "p": "🔓",
   "az": "açmaq"
  },
  {
   "w": "friend",
   "p": "🤝",
   "az": "dost"
  }
 ],
 "forms": {
  "opened": "open",
  "friends": "friend",
  "gave": "give"
 },
 "spots": [
  {
   "id": "well",
   "label": "WATER"
  },
  {
   "id": "bread",
   "label": "BREAD"
  },
  {
   "id": "pilgrim",
   "npc": "Pilgrim",
   "idle": [
    "I am so tired.",
    "The door is closed. I can't open it."
   ]
  },
  {
   "id": "key",
   "label": "KEY"
  },
  {
   "id": "keeper",
   "npc": "Keeper",
   "idle": [
    "Stop! This door is closed.",
    "Only a friend can open the door."
   ]
  },
  {
   "id": "door",
   "exit": true,
   "locked": "The door is closed. You need the key."
  }
 ],
 "tasks": [
  {
   "npc": "pilgrim",
   "type": "fetch",
   "hint": "Yorğun zəvvarla danış.",
   "say": [
    "Oh, traveler. I am so tired.",
    "Please, give me water."
   ],
   "target": "well",
   "doHint": "Ona nə lazımdır? Səhnədə tap.",
   "done": "Thank you, my friend! Water is life."
  },
  {
   "npc": "pilgrim",
   "type": "fetch",
   "hint": "Zəvvar yenə nə isə istəyir.",
   "say": [
    "I am hungry too.",
    "Can you give me some bread?"
   ],
   "target": "bread",
   "doHint": "Ona nə lazımdır? Səhnədə tap.",
   "done": "You are kind. The keeper only opens the door for a friend."
  },
  {
   "npc": "keeper",
   "type": "build",
   "hint": "Gözətçiyə yaxınlaş.",
   "say": [
    "Stop! Who are you?",
    "Are you a friend?"
   ],
   "answer": "I am your friend",
   "extra": [
    "door",
    "water",
    "open",
    "you"
   ],
   "done": "A friend? Good. Then take the key and open the door."
  },
  {
   "npc": "keeper",
   "type": "fetch",
   "hint": "Gözətçi nə dedi?",
   "say": [
    "Take the key from the wall."
   ],
   "target": "key",
   "flag": "tookKey",
   "doHint": "Divarda nə var?",
   "done": "Now open the door, friend. The tower is waiting."
  }
 ]
};
