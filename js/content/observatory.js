// (The Observatory): story, words and tasks. Spot ids must match js/floors/observatory.js.
export default {
 "name": "The Observatory",
 "people": "Ulduzçular",
 "cefr": "B1",
 "story": "Qüllənin yuxarısında gecə düşür. Bu gecə yetmiş altı ildə bir dəfə gələn kometa səmadan keçəcək, amma səma buludludur və teleskopun linzası yoxa çıxıb. Ulduzçulara kömək et: linzanı tap, havanın necə olacağını öyrən və kometanı birlikdə gözləyin.",
 "words": [
  { "w": "sky", "p": "🌌", "az": "səma" },
  { "w": "cloudy", "p": "☁️", "az": "buludlu" },
  { "w": "stars", "p": "⭐", "az": "ulduzlar" },
  { "w": "tonight", "p": "🌙", "az": "bu gecə" },
  { "w": "if", "p": "🔀", "az": "əgər" },
  { "w": "never", "p": "🚫", "az": "heç vaxt" },
  { "w": "explain", "p": "💬", "az": "izah etmək" },
  { "w": "brightest", "p": "🌟", "az": "ən parlaq" },
  { "w": "comet", "p": "☄️", "az": "kometa" },
  { "w": "telescope", "p": "🔭", "az": "teleskop" },
  { "w": "lens", "p": "🔍", "az": "linza" },
  { "w": "wind", "p": "🌬️", "az": "külək" },
  { "w": "north", "p": "🧭", "az": "şimal" },
  { "w": "rain", "p": "🌧️", "az": "yağış" },
  { "w": "midnight", "p": "🕛", "az": "gecə yarısı" },
  { "w": "planet", "p": "🪐", "az": "planet" }
 ],
 "forms": {
  "star": "stars",
  "clouds": "cloudy",
  "cloud": "cloudy",
  "explained": "explain",
  "explains": "explain",
  "comets": "comet",
  "telescopes": "telescope",
  "lenses": "lens",
  "windy": "wind",
  "windier": "wind",
  "rainy": "rain",
  "raining": "rain",
  "planets": "planet"
 },
 "spots": [
  { "id": "map", "label": "STAR MAP: the old map of the sky, with 270 stars" },
  {
   "id": "apprentice",
   "npc": "Apprentice",
   "idle": [
    "I have never used the telescope. One day I'm going to be a great astronomer!",
    "Can you explain how a telescope works? Nobody tells me anything.",
    "The astronomer is stricter than my mother, but kinder than my old teacher."
   ]
  },
  { "id": "telescope", "label": "TELESCOPE" },
  {
   "id": "astronomer",
   "npc": "Astronomer",
   "idle": [
    "If the sky is cloudy, we won't see the stars.",
    "Tonight is the most special night of the year. Maybe of the century!",
    "A comet is brighter than most stars, but it never stays long."
   ]
  },
  {
   "id": "mapmaker",
   "npc": "Mapmaker",
   "idle": [
    "My new map is going to be bigger and better than the old one.",
    "Every star has a name. Some of them have two!",
    "I draw slowly, but my maps are more exact than anyone's."
   ]
  },
  {
   "id": "weather",
   "npc": "Weather Keeper",
   "idle": [
    "The wind never lies, but the clouds sometimes do.",
    "Tomorrow is going to be windier than today. I can feel it in my knees.",
    "If the birds fly low, it will rain. Remember that, traveler."
   ]
  },
  { "id": "lens", "label": "a round glass lens, next to the ink pot" },
  { "id": "vane", "label": "WEATHER VANE: the wind is coming from the NORTH" },
  { "id": "small", "label": "a small star" },
  { "id": "bright", "label": "the brightest star" },
  { "id": "red", "label": "a red light: a planet, not a star" },
  {
   "id": "ladder",
   "exit": true,
   "locked": "The ladder is blocked. Nobody climbs before the comet comes."
  }
 ],
 "tasks": [
  {
   "npc": "astronomer",
   "type": "talk",
   "hint": "Astronom səni gözləyir. Onunla danış.",
   "say": [
    "Welcome to the Observatory, traveler. You came on the right night."
   ],
   "turns": [
    {
     "q": [
      "Tonight a comet will cross the sky, a little after midnight.",
      "It comes only once every seventy-six years."
     ],
     "opts": [
      "Wow! Will we be able to see it from here?",
      "Wow! Did you see it last night?",
      "Great. Then I'll come back and watch it next year."
     ],
     "a": 0,
     "wrong": "No, no! It comes tonight, and then not again for seventy-six years.",
     "then": "We will, but only if the sky is clear."
    },
    {
     "q": [
      "So look up, my friend. What do you see?"
     ],
     "opts": [
      "The sky is cloudy. I can't see any stars.",
      "The sky is clear and full of stars.",
      "I can see the comet already, next to the moon."
     ],
     "a": 0,
     "wrong": "Look again. Those grey things are clouds, not stars.",
     "speak": true,
     "then": "Exactly. And that is not my only problem."
    },
    {
     "q": [
      "The lens of my telescope is missing.",
      "Without the lens, the telescope is just a long brass tube.",
      "Could you help me find it before midnight?"
     ],
     "opts": [
      "Of course. Who used the telescope last?",
      "No problem. I'll buy you a new one at the market.",
      "Sorry, I'm too tired. I'm going to bed."
     ],
     "a": 0,
     "wrong": "Hmm. The market is closed at night, and nobody sells a lens like mine.",
     "then": "Good question! My apprentice was cleaning it this afternoon."
    }
   ],
   "done": "Ask my apprentice, please. And hurry: the comet won't wait for us."
  },
  {
   "npc": "apprentice",
   "type": "talk",
   "hint": "Şagird nəsə gizlədir. Onunla danış.",
   "say": [
    "Shh! Is the astronomer angry with me?"
   ],
   "turns": [
    {
     "q": [
      "He asked you about the lens, didn't he?",
      "I took it out of the telescope this afternoon, because I wanted to clean it."
     ],
     "opts": [
      "Yes, he did. Do you know where it is now?",
      "No, he never talks about the lens.",
      "Yes, and he's going to send you home tomorrow."
     ],
     "a": 0,
     "wrong": "Oh no... Please, just tell me the truth. Did he ask about it?",
     "then": "I put it down on a table... but which table?"
    },
    {
     "q": [
      "I have never used the telescope myself. Nobody explains anything to me!",
      "I only remember one thing: the mapmaker was sitting at that table, drawing stars."
     ],
     "opts": [
      "Then I'll ask the mapmaker. Maybe she has seen it.",
      "Then the mapmaker stole it. Let's tell the astronomer.",
      "Then the lens is lost forever. Let's forget the comet."
     ],
     "a": 0,
     "wrong": "Wait, wait! We don't know that. Let's not be so quick.",
     "speak": true
    },
    {
     "q": [
      "Thank you. And please, don't tell him it was my fault."
     ],
     "opts": [
      "Don't worry. Mistakes happen. We'll fix it together.",
      "I'm going to tell him everything right now.",
      "It's not my problem. You lost it."
     ],
     "a": 0,
     "wrong": "Oh... I thought you were kinder than that."
    }
   ],
   "done": "You're very kind. The mapmaker's desk is over there, near the lamp."
  },
  {
   "npc": "mapmaker",
   "type": "listen",
   "hint": "Xəritəçi masasının arxasında oturub. Onu dinlə.",
   "say": [
    "The lens? Oh dear, yes, that was me. I'm so sorry!",
    "I'm drawing a new map of the sky. It's going to be much bigger than the old one, with three hundred and twelve stars.",
    "Some stars are so small that I can't see them on the paper, so I borrowed the lens from the table. It makes everything bigger.",
    "I worked all afternoon and stopped at sunset, when it got too dark to draw.",
    "Then I put the lens on my desk, next to the ink pot, so nobody would sit on it."
   ],
   "qs": [
    {
     "q": "How many stars will the new map have?",
     "az": "neçə ulduz?",
     "opts": ["Three hundred and twelve", "Three hundred and twenty", "Two hundred and twelve", "Two hundred and seventy"],
     "a": 0
    },
    {
     "q": "Why did the mapmaker borrow the lens?",
     "az": "niyə?",
     "opts": ["To see the very small stars she was drawing", "To look at the comet before the others", "Because the apprentice gave it to her"],
     "a": 0
    },
    {
     "q": "When did she stop working?",
     "az": "nə vaxt?",
     "opts": ["At sunset", "At midnight", "After lunch"],
     "a": 0
    },
    {
     "q": "Where is the lens now?",
     "az": "harada?",
     "opts": ["On her desk, next to the ink pot", "Inside the telescope", "In the apprentice's pocket"],
     "a": 0
    }
   ],
   "done": "And please tell the apprentice I'm sorry I scared him."
  },
  {
   "npc": "mapmaker",
   "type": "fetch",
   "hint": "Xəritəçi səndən nəsə xahiş edir.",
   "say": [
    "Would you take the lens back for me? My knees are older than these stars.",
    "Be careful with it. It's more fragile than an egg."
   ],
   "target": "lens",
   "doHint": "Onun dediyi yerə bax.",
   "flag": "lens",
   "done": "Got it? Good. Now walk slowly, please!"
  },
  {
   "npc": "astronomer",
   "type": "build",
   "hint": "Linzanı astronoma apar.",
   "say": [
    "My lens! You found it! Where was it?",
    "Come on, tell me. What happened to it?"
   ],
   "answer": "The mapmaker was using it for her new map",
   "extra": ["will", "telescope", "never", "brighter"],
   "done": "Ha! Of course. The telescope is ready again. Now only the clouds are in our way. Go and ask the weather keeper about the wind."
  },
  {
   "npc": "weather",
   "type": "fetch",
   "hint": "Havaçı ilə danış.",
   "say": [
    "Ah, the traveler! The astronomer wants a forecast, I suppose.",
    "My eyes are not as good as they were. Go to the weather vane on the wall.",
    "Find out where the wind is coming from, and then come back to me."
   ],
   "target": "vane",
   "doHint": "Küləyin istiqamətini yoxla.",
   "flag": "vane",
   "done": "Back already? Good."
  },
  {
   "npc": "weather",
   "type": "choice",
   "hint": "Havaçıya gördüyünü de.",
   "say": [
    "So? Where is the wind coming from?"
   ],
   "opts": [
    "It's coming from the north.",
    "It's coming from the south.",
    "There is no wind tonight."
   ],
   "a": 0,
   "done": "From the north! That's exactly the news I was hoping for."
  },
  {
   "npc": "weather",
   "type": "listen",
   "hint": "Havaçı proqnoz verir. Diqqətlə dinlə.",
   "say": [
    "Then listen carefully, and tell the astronomer exactly what I say.",
    "At ten o'clock it's going to rain a little, so cover the telescope with a cloth.",
    "After eleven, the north wind will get stronger and push the clouds to the south.",
    "By midnight the sky will be clearer than it was all week.",
    "The comet will appear at a quarter past twelve, low in the east, just under the red star."
   ],
   "qs": [
    {
     "q": "What should you do at ten o'clock?",
     "az": "saat onda",
     "opts": ["Cover the telescope", "Open the ladder", "Wake up the apprentice"],
     "a": 0
    },
    {
     "q": "Which way will the wind push the clouds?",
     "az": "buludlar hara gedəcək?",
     "opts": ["To the south", "To the north", "To the east"],
     "a": 0
    },
    {
     "q": "When will the comet appear?",
     "az": "nə vaxt?",
     "opts": ["At a quarter past twelve", "At a quarter to twelve", "At ten o'clock", "At eleven o'clock"],
     "a": 0
    },
    {
     "q": "Where should we look for the comet?",
     "az": "harada?",
     "opts": ["Low in the east, under the red star", "High in the west, next to the moon", "Right above the ladder"],
     "a": 0
    }
   ],
   "done": "Good. You have better ears than the apprentice! Now go."
  },
  {
   "npc": "astronomer",
   "type": "talk",
   "hint": "Proqnozu astronoma çatdır.",
   "say": [
    "Well? What did the weather keeper say? Is there any hope?"
   ],
   "turns": [
    {
     "q": [
      "Tell me everything. Will the clouds go away?"
     ],
     "opts": [
      "It's going to rain at ten, but the sky will be clear by midnight.",
      "It will rain all night, so we'll never see the comet.",
      "The sky is clear now, so we can start at once."
     ],
     "a": 0,
     "wrong": "Hmm, that's not what she usually says. Are you sure? Think again.",
     "speak": true,
     "then": "Rain at ten? Then I'll cover the telescope. Thank you for the warning."
    },
    {
     "q": [
      "And where should we look for the comet?"
     ],
     "opts": [
      "Low in the east, just under the red star.",
      "High in the north, next to the moon.",
      "Right next to the brightest star."
     ],
     "a": 0,
     "wrong": "Are you sure? The weather keeper is never wrong about the sky."
    },
    {
     "q": [
      "Wonderful. Will you stay and watch it with us?"
     ],
     "opts": [
      "I'd love to. I've never seen a comet before.",
      "No, thanks. Comets are boring. I'm going to sleep.",
      "Only if you pay me. Is it more expensive than the stars?"
     ],
     "a": 0,
     "wrong": "Oh! That's not a very nice thing to say on a night like this."
    }
   ],
   "flagAfter": "clear",
   "done": "Look! The wind is taking the clouds away, just as she said. The sky is clear!"
  },
  {
   "npc": "apprentice",
   "type": "fetch",
   "hint": "Şagird ulduzları öyrənmək istəyir.",
   "say": [
    "The clouds are gone! Look at all those stars!",
    "The astronomer says I must learn the stars before I can use the telescope.",
    "Which one is the brightest? Show me, please."
   ],
   "target": "bright",
   "doHint": "Səmaya bax.",
   "done": "That one? Yes, it's much brighter than the others. I'll never forget it now."
  },
  {
   "npc": "mapmaker",
   "type": "fetch",
   "hint": "Xəritəçi xəritəsi üçün kömək istəyir.",
   "say": [
    "Traveler, help me with my map.",
    "There's a red light in the sky tonight, but it isn't on my old map.",
    "If it isn't a star, what is it? Show it to me first."
   ],
   "target": "red",
   "doHint": "Səmada bir işıq axtar.",
   "done": "Yes, that one! It moves a little every night, so it can't be a star. It's a planet! Planets are much closer to us than stars."
  },
  {
   "npc": "apprentice",
   "type": "build",
   "hint": "Şagirdin yanına qayıt. Kometa yaxınlaşır.",
   "say": [
    "It's almost a quarter past twelve! The comet is coming!",
    "What are you going to tell your friends about tonight?"
   ],
   "answer": "I will never forget this night",
   "extra": ["cloudy", "tonight", "brightest", "if"],
   "flagAfter": "comet",
   "done": "Me neither! Look, look! There it is!"
  },
  {
   "npc": "astronomer",
   "type": "line",
   "hint": "Astronomla son dəfə danış.",
   "say": [
    "There it is! Low in the east, just under the red planet, exactly as the weather keeper said.",
    "Seventy-six years I waited, and tonight I saw it with my own eyes.",
    "Thank you, traveler. You found the lens, you brought the forecast, and you were kind to my apprentice.",
    "When your journal is ready, the ladder to the summit will open for you. The elders are waiting."
   ],
   "done": "Go, and tell them what you saw tonight."
  }
 ]
};
