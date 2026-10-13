// (The Summit): story, words and tasks. Spot ids must match js/floors/summit.js.
export default {
 "name": "The Summit",
 "people": "Şura",
 "cefr": "B1",
 "story": "Zirvədə bütün xalqların ağsaqqalları oturur. Onlar mübahisə edir: qüllənin xalqları necə anlaşmalıdır? Son sınaq səndədir: dinlə, fikir bildir və sərbəst danış.",
 "words": [
  {
   "w": "opinion",
   "p": "💭",
   "az": "fikir"
  },
  {
   "w": "disagree",
   "p": "👎",
   "az": "razı olmamaq"
  },
  {
   "w": "although",
   "p": "↔️",
   "az": "baxmayaraq ki"
  },
  {
   "w": "learn",
   "p": "🎓",
   "az": "öyrənmək"
  },
  {
   "w": "suggest",
   "p": "💡",
   "az": "təklif etmək"
  },
  {
   "w": "experience",
   "p": "🎒",
   "az": "təcrübə"
  },
  {
   "w": "decide",
   "p": "⚖️",
   "az": "qərar vermək"
  },
  {
   "w": "agree",
   "p": "👍",
   "az": "razılaşmaq"
  }
 ],
 "forms": {
  "agrees": "agree",
  "learning": "learn",
  "decided": "decide"
 },
 "spots": [
  {
   "id": "elder1",
   "npc": "First elder",
   "idle": [
    "In my opinion, one language is enough."
   ]
  },
  {
   "id": "elder2",
   "npc": "Second elder",
   "idle": [
    "I disagree. We can learn each other's languages."
   ]
  },
  {
   "id": "elder3",
   "npc": "Third elder",
   "idle": [
    "I suggest that we listen to the traveler."
   ]
  },
  {
   "id": "table",
   "label": "the council table"
  },
  {
   "id": "bell",
   "exit": true,
   "locked": "The council has not decided yet."
  }
 ],
 "tasks": [
  {
   "npc": "elder1",
   "type": "line",
   "hint": "Birinci ağsaqqalı dinlə.",
   "say": [
    "In my opinion, the peoples of the tower should speak only one language.",
    "It is simple. It is fast."
   ]
  },
  {
   "npc": "elder2",
   "type": "line",
   "hint": "İkinci ağsaqqalı dinlə.",
   "say": [
    "I disagree.",
    "Although it is difficult, we can learn each other's languages.",
    "Every language is a door."
   ]
  },
  {
   "npc": "elder3",
   "type": "choice",
   "hint": "Üçüncü ağsaqqal səni sınayır.",
   "say": [
    "Traveler, you listened. What does the second elder think?"
   ],
   "opts": [
    "We can learn each other's languages.",
    "One language is enough for everybody.",
    "Learning languages is too difficult."
   ],
   "a": 0,
   "done": "Yes. You understand us. Now tell us your opinion."
  },
  {
   "npc": "elder3",
   "type": "build",
   "hint": "Fikrini bildir.",
   "say": [
    "Do you agree with the second elder?"
   ],
   "answer": "I agree with him although it is difficult",
   "extra": [
    "disagree",
    "opinion",
    "never"
   ],
   "done": "Good. I suggest that we hear more from you."
  },
  {
   "npc": "elder2",
   "type": "free",
   "hint": "Şuraya öz hekayəni danış.",
   "min": 25,
   "say": [
    "Tell the council about your experience.",
    "Who are you? Why are you learning English? What will you do next?"
   ],
   "done": "Thank you, traveler. The council has decided: every people will learn. Ring the bell!"
  }
 ]
};
