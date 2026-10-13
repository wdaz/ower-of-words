// Story, words and tasks for the five floors. Shared by the 2D and 3D versions.
// Spot ids here must match the ids each floor's 3D scene registers.
export const FLOORS = [
 {
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
 },
 {
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
 },
 {
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
 },
 {
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
 },
 {
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
 }
];
