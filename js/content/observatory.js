// (The Observatory): story, words and tasks. Spot ids must match js/floors/observatory.js.
export default {
 "name": "The Observatory",
 "people": "Ulduzçular",
 "cefr": "B1-B2",
 "story": "Qüllənin yuxarısında gecə düşür. Bu gecə yetmiş altı ildə bir dəfə gələn kometa səmadan keçəcək, amma səma buludludur və teleskopun linzası yoxa çıxıb. Ulduzçulara kömək et: linzanı tap, havanın necə olacağını öyrən və kometanı birlikdə gözləyin.",
 "words": [
  { "w": "forecast", "p": "🌦️", "az": "hava proqnozu" },
  { "w": "predict", "p": "🔮", "az": "qabaqcadan demək" },
  { "w": "horizon", "p": "🌅", "az": "üfüq" },
  { "w": "faint", "p": "🔅", "az": "zəif, solğun (işıq)" },
  { "w": "visible", "p": "👁️", "az": "görünən" },
  { "w": "magnify", "p": "🔍", "az": "böyütmək (şüşə ilə)" },
  { "w": "fragile", "p": "🥚", "az": "kövrək" },
  { "w": "rare", "p": "💎", "az": "nadir" },
  { "w": "nervous", "p": "😬", "az": "həyəcanlı, narahat" },
  { "w": "freezing", "p": "🥶", "az": "şaxtalı, buz kimi soyuq" },
  { "w": "direction", "p": "🧭", "az": "istiqamət" },
  { "w": "glimpse", "p": "👀", "az": "bir anlıq görmək / ötəri baxış" },
  { "w": "accurate", "p": "🎯", "az": "dəqiq" },
  { "w": "thrilled", "p": "🤩", "az": "çox sevinmiş, vəcdə gəlmiş" },
  { "w": "relieved", "p": "😮‍💨", "az": "rahatlamış, ürəyi yerinə düşmüş" },
  { "w": "position", "p": "📍", "az": "mövqe, yer" }
 ],
 "forms": {
  "forecasts": "forecast",
  "predicted": "predict",
  "predicts": "predict",
  "prediction": "predict",
  "magnifies": "magnify",
  "magnified": "magnify",
  "glimpses": "glimpse",
  "positions": "position",
  "accurately": "accurate",
  "directions": "direction",
  "fainter": "faint",
  "nervously": "nervous"
 },
 "spots": [
  { "id": "map", "label": "STAR MAP: the old map of the sky, with 270 stars" },
  {
   "id": "apprentice",
   "npc": "Apprentice",
   "idle": [
    "To be honest, I've never actually used the telescope. One day I'm going to be a great astronomer!",
    "Some stars are so faint that you can only see them if you look a little to the side of them. Strange, isn't it?",
    "I get so nervous near the telescope. What if I break something?"
   ]
  },
  { "id": "telescope", "label": "TELESCOPE" },
  {
   "id": "astronomer",
   "npc": "Astronomer",
   "idle": [
    "If the clouds don't go away, we won't even catch a glimpse of the comet.",
    "A comet like this is very rare. Most people only see one in their whole life, if they're lucky.",
    "Astronomy is mostly waiting. You need accurate clocks and warm socks."
   ]
  },
  {
   "id": "mapmaker",
   "npc": "Mapmaker",
   "idle": [
    "My new map is going to be bigger and more exact than the old one.",
    "The faint stars are the hardest to draw. Without a lens I can hardly see them.",
    "A map is only useful if it's accurate. Every star must be in the right position."
   ]
  },
  {
   "id": "weather",
   "npc": "Weather Keeper",
   "idle": [
    "I've predicted the weather on this tower for forty years. I was wrong only twice.",
    "It's freezing up here after sunset. Keep your hands in your pockets, traveler.",
    "If the birds fly low, it will rain. That's an old forecast, but it still works."
   ]
  },
  { "id": "lens", "label": "a round glass lens, next to the ink pot" },
  { "id": "vane", "label": "WEATHER VANE: the wind is coming from the NORTH" },
  { "id": "small", "label": "a faint little star" },
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
    "Welcome to the Observatory, traveler. You've come on a very rare night."
   ],
   "turns": [
    {
     "q": [
      "Tonight a comet is going to cross the sky, a little after midnight.",
      "It only comes once every seventy-six years. That's how rare it is."
     ],
     "opts": [
      "Wow! Will it be visible from here?",
      "Wow! Did you see it last night?",
      "Great. Then I'll come back and watch it next year."
     ],
     "a": 0,
     "wrong": "No, no! It comes tonight, and then not again for seventy-six years.",
     "then": "It will be visible from here, but only if the sky is clear."
    },
    {
     "q": [
      "So look up, my friend. What do you see?"
     ],
     "opts": [
      "It's cloudy. I can't see a single star.",
      "The sky is clear and full of stars.",
      "I can see the comet already, next to the moon."
     ],
     "a": 0,
     "wrong": "Look again. Those grey things are clouds, not stars.",
     "speak": true,
     "then": "Exactly. And I'm afraid the clouds aren't my only problem."
    },
    {
     "q": [
      "The lens of my telescope has gone. It isn't in its position.",
      "The lens is what magnifies the sky. Without it, the telescope is just a long brass tube.",
      "Could you help me find it before midnight?"
     ],
     "opts": [
      "Of course. Who was the last person to use the telescope?",
      "No problem. I'll buy you a new one at the market.",
      "Sorry, it's freezing up here. I'm going to bed."
     ],
     "a": 0,
     "wrong": "Hmm. The market is closed at night, and nobody sells a lens like mine.",
     "then": "Good question! My apprentice was cleaning it this afternoon."
    }
   ],
   "done": "Ask my apprentice, please. But be gentle with him: he gets nervous. And hurry, the comet won't wait for us."
  },
  {
   "npc": "apprentice",
   "type": "talk",
   "hint": "Şagird nəsə gizlədir. Onunla danış.",
   "say": [
    "Shh! Is the astronomer angry with me? I'm so nervous!"
   ],
   "turns": [
    {
     "q": [
      "He asked you about the lens, didn't he?",
      "OK, it was me. I took it out of the telescope this afternoon, because I wanted to clean it."
     ],
     "opts": [
      "Yes, he did. Do you know where it is now?",
      "No, he never talks about the lens.",
      "Yes, and he's going to send you home tomorrow."
     ],
     "a": 0,
     "wrong": "Oh no... Please, just tell me the truth. Did he ask about it?",
     "then": "I put it down on a table... and when I came back, it wasn't in the same position!"
    },
    {
     "q": [
      "I only remember one thing: the mapmaker was sitting at that table, drawing stars.",
      "Did she take it? I'm nervous to ask her. She's always been so nice to me."
     ],
     "opts": [
      "Don't be nervous. I'll ask her. Maybe she has seen it.",
      "Then she stole it. Let's tell the astronomer right now.",
      "Then the lens is lost forever. Let's forget the comet."
     ],
     "a": 0,
     "wrong": "Wait, wait! We don't know that. Let's not accuse her so quickly.",
     "speak": true
    },
    {
     "q": [
      "Thank you. I was so thrilled to clean the real lens, and now look what happened."
     ],
     "opts": [
      "Don't worry. Mistakes happen. He'll be thrilled when he gets it back.",
      "I'm going to tell him it was all your fault.",
      "It's not my problem. You lost it."
     ],
     "a": 0,
     "wrong": "Oh... I thought you were kinder than that.",
     "then": "Phew. I feel a bit more relieved now."
    }
   ],
   "done": "You're very kind. The mapmaker's desk is over there, near the lamp."
  },
  {
   "npc": "mapmaker",
   "type": "listen",
   "hint": "Xəritəçi masasının arxasında oturub. Onu dinlə.",
   "say": [
    "The lens? Oh dear. Yes, that was me. I'm so sorry!",
    "I'm drawing a new map of the sky. It's going to be much bigger than the old one, with three hundred and twelve stars.",
    "Some of the stars are so faint that I couldn't see them on the paper, so I picked up the lens from the table. It magnifies everything.",
    "I worked all afternoon and stopped at sunset, when it got too dark to draw.",
    "Then I put the lens on my desk, next to the ink pot, so nobody would sit on it. It's very fragile, you know."
   ],
   "qs": [
    {
     "q": "How many stars will the new map have?",
     "az": "neçə ulduz?",
     "opts": ["Three hundred and twelve", "Three hundred and twenty", "Two hundred and twelve", "Two hundred and seventy"],
     "a": 0
    },
    {
     "q": "Why did the mapmaker need the lens?",
     "az": "niyə?",
     "opts": ["To magnify the faint stars she was drawing", "To look at the comet before the others", "Because the apprentice gave it to her"],
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
   "done": "And please tell the apprentice I'm sorry. I didn't mean to make him nervous."
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
   "done": "Got it? Good. Now walk slowly, please! Fragile things don't like stairs."
  },
  {
   "npc": "astronomer",
   "type": "build",
   "hint": "Linzanı astronoma apar.",
   "say": [
    "My lens! You found it! I'm so relieved. Where was it?",
    "Come on, tell me. Why wasn't it in its position?"
   ],
   "answer": "The mapmaker used it to magnify faint stars",
   "extra": ["visible", "telescope", "never", "fragile"],
   "done": "Ha! Of course. I'm thrilled! The telescope is ready again. Now only the clouds are in our way. Go and ask the weather keeper for a forecast."
  },
  {
   "npc": "weather",
   "type": "fetch",
   "hint": "Havaçı ilə danış.",
   "say": [
    "Ah, the traveler! The astronomer wants a forecast, I suppose. He always does on special nights.",
    "My eyes aren't as good as they used to be. Go to the weather vane on the wall.",
    "Find out which direction the wind is coming from, and then come back to me."
   ],
   "target": "vane",
   "doHint": "Küləyin istiqamətini yoxla.",
   "flag": "vane",
   "done": "Back already? Good. Your hands look freezing!"
  },
  {
   "npc": "weather",
   "type": "choice",
   "hint": "Havaçıya gördüyünü de.",
   "say": [
    "So? Which direction is the wind coming from?"
   ],
   "opts": [
    "It's coming from the north.",
    "It's coming from the south.",
    "There's no wind at all tonight."
   ],
   "a": 0,
   "done": "From the north! That's a cold direction, but it's exactly the news I was hoping for."
  },
  {
   "npc": "weather",
   "type": "listen",
   "hint": "Havaçı proqnoz verir. Diqqətlə dinlə.",
   "say": [
    "Then here is my forecast. Listen carefully, and tell the astronomer exactly what I predict.",
    "At ten o'clock it's going to rain a little, so he should cover the telescope with a cloth.",
    "After eleven, the north wind will get stronger and push the clouds to the south.",
    "By midnight the clouds will be gone, and it will be freezing, but the sky will be clearer than it's been all week.",
    "The comet will become visible at a quarter past twelve, low on the horizon in the east, just under the red star."
   ],
   "qs": [
    {
     "q": "What should the astronomer do at ten o'clock?",
     "az": "saat onda",
     "opts": ["Cover the telescope", "Open the ladder", "Wake up the apprentice"],
     "a": 0
    },
    {
     "q": "In which direction will the wind push the clouds?",
     "az": "buludlar hara gedəcək?",
     "opts": ["To the south", "To the north", "To the east"],
     "a": 0
    },
    {
     "q": "When will the comet become visible?",
     "az": "nə vaxt?",
     "opts": ["At a quarter past twelve", "At a quarter to twelve", "At ten o'clock", "At eleven o'clock"],
     "a": 0
    },
    {
     "q": "Where should we look for the comet?",
     "az": "harada?",
     "opts": ["Low on the eastern horizon, under the red star", "High in the west, next to the moon", "Right above the ladder"],
     "a": 0
    }
   ],
   "done": "Good. You listen better than the apprentice! Now go, before you start freezing too."
  },
  {
   "npc": "astronomer",
   "type": "talk",
   "hint": "Proqnozu astronoma çatdır.",
   "say": [
    "Well? What does the forecast say? Is there any hope?"
   ],
   "turns": [
    {
     "q": [
      "Tell me everything. Is her forecast accurate? Will the clouds go away?"
     ],
     "opts": [
      "It's going to rain at ten, but the sky will be clear by midnight.",
      "It's going to rain all night, so we'll never see the comet.",
      "The sky is clear now, so we can start at once."
     ],
     "a": 0,
     "wrong": "Hmm, that doesn't sound like her forecast. Are you sure? Think again.",
     "speak": true,
     "then": "Rain at ten? Then I'll cover the telescope. Thank you for the warning."
    },
    {
     "q": [
      "And in which direction should we look?"
     ],
     "opts": [
      "East, low on the horizon, just under the red star.",
      "North, high above us, next to the moon.",
      "Right next to the brightest star."
     ],
     "a": 0,
     "wrong": "Are you sure? She has never predicted the sky wrong in her life."
    },
    {
     "q": [
      "Wonderful. Will you stay and watch it with us? It's going to be a long, freezing wait."
     ],
     "opts": [
      "I'd love to. I'd be thrilled to catch a glimpse of a comet.",
      "No, thanks. Comets are boring. I'm going to sleep.",
      "Only if you pay me. Waiting is expensive."
     ],
     "a": 0,
     "wrong": "Oh! That's not a very nice thing to say on such a rare night."
    }
   ],
   "flagAfter": "clear",
   "done": "Look! The wind is taking the clouds away, just as she predicted. The sky is clear!"
  },
  {
   "npc": "apprentice",
   "type": "fetch",
   "hint": "Şagird ulduzları öyrənmək istəyir.",
   "say": [
    "The clouds are gone! Look at all those stars!",
    "The astronomer says I must learn the stars before I can use the telescope. Some are bright, some are so faint I can hardly see them.",
    "Which one is the brightest? Show me, please."
   ],
   "target": "bright",
   "doHint": "Səmaya bax.",
   "done": "That one? Yes, it's much brighter than the faint ones around it. I'll never forget it now."
  },
  {
   "npc": "mapmaker",
   "type": "fetch",
   "hint": "Xəritəçi xəritəsi üçün kömək istəyir.",
   "say": [
    "Traveler, help me with my map.",
    "There's a red light in the sky tonight, but it isn't on my old map. I need its position for my map.",
    "If it isn't a star, what is it? Show it to me first."
   ],
   "target": "red",
   "doHint": "Səmada bir işıq axtar.",
   "done": "Yes, that one! It changes its position a little every night, so it can't be a star. It's a planet! And with the lens, I could magnify it and see its colour clearly."
  },
  {
   "npc": "apprentice",
   "type": "build",
   "hint": "Şagirdin yanına qayıt. Kometa yaxınlaşır.",
   "say": [
    "It's almost a quarter past twelve! Look at the horizon! I'm so nervous! I want to catch the first glimpse!",
    "What are you going to tell your friends about tonight?"
   ],
   "answer": "I will never forget this rare night",
   "extra": ["freezing", "horizon", "faint", "if"],
   "flagAfter": "comet",
   "done": "Me neither! Look, look! It's visible now! There it is!"
  },
  {
   "npc": "astronomer",
   "type": "line",
   "hint": "Astronomla son dəfə danış.",
   "say": [
    "There it is! Low on the horizon, just under the red planet, exactly as the weather keeper predicted.",
    "Seventy-six years I've waited for this. And tonight I caught more than a glimpse of it.",
    "Thank you, traveler. You found the lens, you brought the forecast, and your forecast was perfectly accurate.",
    "When your journal is ready, the ladder to the summit will open for you. The elders are waiting."
   ],
   "done": "Go, and tell them what you saw on this rare night."
  }
 ]
};
