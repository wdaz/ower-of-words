// (The Gate): story, words and tasks. Spot ids must match js/floors/gate.js.
export default {
 "name": "The Gate",
 "people": "Gözətçilər",
 "cefr": "B1-B2",
 "story": "Səhra boyunca uzun yol gəldin. Qarşında Sözlər Qülləsi yüksəlir; deyirlər, zirvəyə çatan hər xalqın dilini anlayır. Günəş batır və gözətçi gecə darvazanı yalnız etibar etdiyi adam üçün açır. Darvazanın qarşısındakı geniş həyətdə karvan düşərgəsi, quyu meydanı, bazar və kiçik bir ziyarətgah bağı var. İnsanlara kömək et, bəlkə onlar da sənə kömək edərlər.",
 "words": [
  { "w": "exhausted", "p": "😫", "az": "əldən düşmüş, çox yorğun" },
  { "w": "shade", "p": "⛱️", "az": "kölgə" },
  { "w": "stranger", "p": "👤", "az": "yad (tanınmayan) adam" },
  { "w": "pour", "p": "🫗", "az": "tökmək, süzmək" },
  { "w": "forbidden", "p": "🚫", "az": "qadağan olunmuş" },
  { "w": "luggage", "p": "🧳", "az": "baqaj, yol yükü" },
  { "w": "fortunately", "p": "🍀", "az": "xoşbəxtlikdən" },
  { "w": "polite", "p": "🙇", "az": "nəzakətli" },
  { "w": "guard", "p": "💂", "az": "keşik çəkmək, qorumaq; keşikçi" },
  { "w": "thief", "p": "🦹", "az": "oğru" },
  { "w": "shiny", "p": "✨", "az": "parıldayan" },
  { "w": "trust", "p": "🤝", "az": "etibar etmək, güvənmək" },
  { "w": "dawn", "p": "🌅", "az": "sübh, dan yeri" },
  { "w": "lock", "p": "🔒", "az": "kilidləmək; kilid" },
  { "w": "rumour", "p": "🗣️", "az": "şayiə" },
  { "w": "hide", "p": "🫣", "az": "gizlətmək, gizlənmək" }
 ],
 "forms": {
  "strangers": "stranger",
  "poured": "pour",
  "pouring": "pour",
  "pours": "pour",
  "politely": "polite",
  "guards": "guard",
  "guarded": "guard",
  "guarding": "guard",
  "thieves": "thief",
  "trusts": "trust",
  "trusted": "trust",
  "locks": "lock",
  "locked": "lock",
  "rumours": "rumour",
  "hid": "hide",
  "hidden": "hide",
  "hides": "hide",
  "hiding": "hide"
 },
 "spots": [
  { "id": "well", "label": "WATER · POUR, DON'T DRINK FROM THE BUCKET" },
  { "id": "bread", "label": "BREAD" },
  { "id": "bucket", "label": "BUCKET" },
  { "id": "lamp", "label": "LAMP" },
  { "id": "camel", "label": "CAMEL · DO NOT TOUCH" },
  { "id": "key", "label": "SADDLEBAG" },
  { "id": "luggage", "label": "CARAVAN LUGGAGE · DO NOT OPEN" },
  { "id": "shrine", "label": "SHRINE · SHOES OFF · SPEAK QUIETLY" },
  {
   "id": "pilgrim",
   "npc": "Pilgrim",
   "idle": [
    "I carried my luggage across the desert for nine days. No wonder I'm exhausted.",
    "Always rest in the shade in the afternoon. The sun here is dangerous.",
    "Bram looks fierce, but if he trusts you, he's the kindest man in the desert."
   ]
  },
  {
   "id": "carrier",
   "npc": "Water carrier",
   "idle": [
    "I pour water for everybody: pilgrims, traders, even strangers.",
    "Drinking straight from the bucket is forbidden. Use a cup, please!",
    "Rumours travel faster than camels in this courtyard, believe me."
   ]
  },
  {
   "id": "boy",
   "npc": "Camel boy",
   "idle": [
    "This is my camel, Pasha. He loves anything shiny.",
    "Once Pasha hid my uncle's ring in the sand. We found it three days later.",
    "We leave at dawn, when the sand is still cool."
   ]
  },
  {
   "id": "master",
   "npc": "Caravan master",
   "idle": [
    "Don't touch the luggage, stranger. Forty bags, and I count them every hour.",
    "We crossed the desert in twelve days. Fortunately, nobody got lost this time.",
    "My men guard the camp at night. There are thieves on the road from the south."
   ]
  },
  {
   "id": "baker",
   "npc": "Baker",
   "idle": [
    "Fresh bread! Warm bread! Bread for exhausted travelers!",
    "I start baking long before dawn. That's why I'm in bed so early.",
    "Be polite to old people, dear. They know everything."
   ]
  },
  {
   "id": "spice",
   "npc": "Spice seller",
   "idle": [
    "Pepper, saffron, cinnamon... and the latest rumours, free of charge!",
    "Never trust a trader who hides his scales.",
    "Some say the gardener talks to his flowers. Don't tell him I told you."
   ]
  },
  {
   "id": "rugs",
   "npc": "Rug seller",
   "idle": [
    "A good rug keeps you cool in the shade and warm at night.",
    "Don't listen to the spice seller. Half of her rumours aren't true.",
    "If you're polite, I'll give you a good price. If you're rude, I'll double it!"
   ]
  },
  {
   "id": "gardener",
   "npc": "Gardener",
   "idle": [
    "Shh. Speak quietly, please. This is a shrine.",
    "Picking the flowers is forbidden. Smelling them is free.",
    "I sit in the shade and listen to the water. It's better than any rumour."
   ]
  },
  {
   "id": "keeper",
   "npc": "Keeper",
   "idle": [
    "Stop! At night this door stays locked.",
    "I only open it for somebody I trust.",
    "I've guarded this door for thirty years. I never sleep at night."
   ]
  },
  {
   "id": "scribe",
   "npc": "Scribe",
   "idle": [
    "I write down the name of every stranger who arrives. Rules are rules.",
    "Tonight: two traders, one caravan with forty bags of luggage, and you.",
    "The keeper locks the door at nine and opens it at dawn. Not a minute earlier."
   ]
  },
  { "id": "door", "exit": true, "locked": "The door is locked. You need the key." }
 ],
 "tasks": [
  {
   "npc": "pilgrim",
   "type": "talk",
   "hint": "Kölgədə oturan yorğun zəvvarla danış.",
   "say": [
    "Oh, hello, traveler. Come and sit with me here in the shade.",
    "I've been walking since dawn with all my luggage, and I'm completely exhausted."
   ],
   "turns": [
    {
     "q": ["I'm Oren. I don't think we've met. You're a stranger here, aren't you?"],
     "opts": ["Yes, I've just arrived. My name is Ruslan.", "No, you're the stranger here.", "Yes, my name is Oren."],
     "a": 0,
     "wrong": "Hm? I only mean that nobody here knows you yet. What's your name?",
     "then": "Ruslan! Well, now you're not a stranger to me.",
     "speak": true
    },
    {
     "q": ["Where have you come from, Ruslan?"],
     "opts": ["I've come to the tower.", "From the east, from a town near the sea.", "From the shade over there."],
     "a": 1,
     "wrong": "No, no, I mean where your journey started. Where's your home?",
     "then": "The sea! I'd love to see it one day. Here we only have sand."
    },
    {
     "q": ["Ruslan, could you do me a favour? I'm so exhausted that I can't stand up, and I'm terribly thirsty."],
     "opts": ["Of course. Shall I get you some water from the well?", "No. You should do me a favour.", "Yes, you can stand up."],
     "a": 0,
     "wrong": "Oh... please, my friend. I really can't walk any more.",
     "speak": true
    }
   ],
   "done": "You're very kind. But the bucket isn't at the well today. Ask the water carrier, she's standing near the well."
  },
  {
   "npc": "carrier",
   "type": "talk",
   "hint": "Quyunun yanındakı su daşıyan qadınla danış.",
   "say": [
    "Careful, stranger! Don't knock over my jars, they're full.",
    "Are you looking for something?"
   ],
   "turns": [
    {
     "q": ["I'm the water carrier here. I pour water for everyone in the square. What do you need?"],
     "opts": ["Excuse me, where's the bucket for the well? The old pilgrim needs water.", "Pour all your water on the ground, please.", "Give me your jars. I need them."],
     "a": 0,
     "wrong": "Excuse me? That's not a very polite way to ask.",
     "then": "The bucket? Ah, that's a long story."
    },
    {
     "q": ["A caravan arrived this morning with a mountain of luggage and a lot of thirsty camels.", "The camel boy took the bucket for his camel, Pasha. Fortunately, I know where he is: in the caravan camp, on the west side of the courtyard."],
     "opts": ["So the boy is in the market, on the east side?", "So the bucket is in the caravan camp, in the west?", "So the camel took the bucket to the tower?"],
     "a": 1,
     "wrong": "No, no. West. Where the tents and the camels are.",
     "then": "Exactly. Just follow the smell of camels!"
    },
    {
     "q": ["One more thing. Here it's forbidden to drink straight from the bucket. You have to pour the water into a cup first.", "Don't ask me why. The keeper's rules!"],
     "opts": ["All right. I'll pour the water into a cup for him.", "Then I'll drink straight from the well.", "Is it forbidden to talk here too?"],
     "a": 0,
     "wrong": "Ha! Please don't. The keeper doesn't like strangers who break the rules.",
     "speak": true
    }
   ],
   "done": "Good luck with the boy. He's sweet, but he hides things. Just like his camel."
  },
  {
   "npc": "boy",
   "type": "talk",
   "hint": "Vedrə haradadır? Dəvəli oğlandan soruş.",
   "say": [
    "Hi! Do you like my camel? His name is Pasha.",
    "He's huge and always hungry. And he loves anything shiny: coins, rings, spoons..."
   ],
   "turns": [
    {
     "q": ["Do you want something?"],
     "opts": ["Give me your camel.", "Excuse me, have you got the bucket from the well?", "Your camel is ugly."],
     "a": 1,
     "wrong": "Hey! That's not very polite. What do you want?",
     "then": "The bucket? Yes, I've got it. Pasha drinks from it."
    },
    {
     "q": ["Why do you need it?"],
     "opts": ["Because I want a camel.", "Because the pilgrim is exhausted and he needs water.", "Because I can't swim."],
     "a": 1,
     "wrong": "Hm? That's strange. Why do you really need it?",
     "then": "Oh, old Oren. He's nice. He always gives Pasha bread."
    },
    {
     "q": ["OK, you can take it. But please bring it back. Pasha drinks again at dawn."],
     "opts": ["No, it's my bucket now.", "Thanks! I'll bring it back before dawn.", "Pasha can drink later. Bye!"],
     "a": 1,
     "wrong": "No, no! He needs it too. You'll bring it back, OK?",
     "speak": true
    }
   ],
   "done": "The bucket is next to Pasha, on the sand. Take it!"
  },
  {
   "npc": "boy",
   "type": "fetch",
   "hint": "Oğlan nəyi götürməyə icazə verdi?",
   "say": ["Go on, take the bucket. It's next to my camel. Don't worry, he only bites strangers. Just joking!"],
   "target": "bucket",
   "flag": "gotBucket",
   "doHint": "Dəvənin yanında nə var?",
   "done": "Good. Now take it to the well. Don't drop it!"
  },
  {
   "npc": "pilgrim",
   "type": "fetch",
   "hint": "Vedrə səndədir. Zəvvarın yanına qayıt.",
   "say": [
    "You've got the bucket! Wonderful.",
    "Please, go to the well and pour me some water. Into my cup, of course. Drinking from the bucket is forbidden."
   ],
   "target": "well",
   "flag": "gaveWater",
   "doHint": "Su haradan gəlir?",
   "done": "Ahh! Thank you, my friend. I feel alive again. But now I'm hungry too. Could you talk to the baker? Her stall is in the market, on the other side of the road."
  },
  {
   "npc": "baker",
   "type": "talk",
   "hint": "Bazardakı çörəkçi qadınla danış.",
   "say": [
    "Good evening, dear! Look, the sun is going down.",
    "Would you like some bread? It's still warm."
   ],
   "turns": [
    {
     "q": ["What can I get you?"],
     "opts": ["Give me all the bread. Now!", "Two pieces of bread, please. One is for the old pilgrim.", "I want water, please."],
     "a": 1,
     "wrong": "Oh! Be polite, dear. Say please. What would you like?",
     "then": "Two pieces? Of course.",
     "speak": true
    },
    {
     "q": ["Hmm. You haven't got any money, have you?"],
     "opts": ["No, I haven't. But I could help you with something.", "Yes, I've got lots of money.", "Money isn't important. Give me bread."],
     "a": 0,
     "wrong": "Really? I can see your purse, dear. It's empty.",
     "then": "You'd help me? Lovely!"
    },
    {
     "q": ["When it gets dark, I can't see my bread. I need my lamp.", "I lent it to the old gardener at the shrine, at the far east end, past the rug stall. Could you get it back for me?"],
     "opts": ["Sorry, I can't see in the dark.", "Yes. The gardener at the shrine has got your lamp. I'll get it.", "Your bread is at the shrine."],
     "a": 1,
     "wrong": "No, dear. The LAMP. The gardener at the shrine has got it."
    }
   ],
   "done": "Thank you, dear. And be polite to him. He's old, and he hates noise."
  },
  {
   "npc": "gardener",
   "type": "talk",
   "hint": "Ziyarətgah bağındakı qoca bağbanla danış.",
   "say": [
    "Shh... Welcome to the shrine garden, stranger. Please speak quietly here.",
    "People come here to rest in the shade and to think."
   ],
   "turns": [
    {
     "q": ["You look like you're in a hurry. How can I help you?"],
     "opts": ["Hey, old man! Give me the lamp!", "Excuse me, sir. Sorry to disturb you. The baker needs her lamp back.", "I'm in a hurry. Where's the tower?"],
     "a": 1,
     "wrong": "Shh! Not so loud. In this garden we're polite to each other.",
     "then": "Ah, you're very polite. Not many young people are these days.",
     "speak": true
    },
    {
     "q": ["Her lamp, yes. She lent it to me last night, because I was guarding the shrine until dawn.", "There are thieves in the desert, you know. They come at night and take anything shiny."],
     "opts": ["So you guarded the shrine all night with her lamp?", "So you're a thief and you took her lamp?", "So the baker sleeps in the shrine?"],
     "a": 0,
     "wrong": "A thief? Me? Ha! I'm far too old to run, my friend.",
     "then": "Exactly. And fortunately, nobody came."
    },
    {
     "q": ["Tell me, why should I trust you? I don't know you. You're a stranger."],
     "opts": ["You don't have to trust me. Ask the baker, she sent me.", "Because I'm a thief.", "Because I'm faster than you."],
     "a": 0,
     "wrong": "Hmm. That doesn't really help me trust you, my friend.",
     "then": "Fair enough. An honest answer."
    }
   ],
   "done": "The lamp is on the stone bench. Take it, and say hello to her from me."
  },
  {
   "npc": "gardener",
   "type": "fetch",
   "hint": "Bağban lampanın harada olduğunu dedi.",
   "say": ["The lamp is on the bench, next to the shrine. Mind the flowers!"],
   "target": "lamp",
   "flag": "gotLamp",
   "doHint": "Daş skamyaya bax.",
   "done": "Thank you. Now hurry back to the baker before it gets dark."
  },
  {
   "npc": "baker",
   "type": "fetch",
   "hint": "Lampa çörəkçiyə çatdı. İndi onun yanına qayıt.",
   "say": [
    "My lamp! Light at last. Thank you, dear.",
    "Now take two pieces of bread from my table. One for you and one for poor Oren."
   ],
   "target": "bread",
   "flag": "gaveBread",
   "doHint": "Çörəkçinin masasına bax.",
   "done": "Fortunately, there's always enough bread for kind people. Go on, he's waiting in the shade."
  },
  {
   "npc": "pilgrim",
   "type": "listen",
   "hint": "Zəvvar gözətçi haqqında danışır. Diqqətlə dinlə.",
   "say": [
    "Bread! Thank you, Ruslan. Sit down for a minute and listen.",
    "The keeper is my old friend. His name is Bram. He has guarded this door for thirty years.",
    "Every night at nine o'clock, Bram locks the door, and he opens it again at dawn.",
    "At night he only opens it for somebody he trusts.",
    "He'll ask you three questions: your name, your home and why you're here.",
    "Answer politely, and tell him that Oren is your friend. Bram trusts me.",
    "Oh, and he never sleeps at night. He drinks coffee and watches the strangers."
   ],
   "qs": [
    { "q": "What is the keeper's name?", "az": "gözətçinin adı", "opts": ["Oren", "Bram", "Pasha", "Ruslan"], "a": 1 },
    { "q": "When does Bram lock the door?", "az": "saat neçədə?", "opts": ["At seven o'clock", "At dawn", "At nine o'clock", "He never locks it"], "a": 2 },
    { "q": "How long has Bram guarded the door?", "az": "neçə ildir?", "opts": ["For three years", "For nine years", "For thirteen years", "For thirty years"], "a": 3 },
    { "q": "Why should you say Oren's name?", "az": "niyə?", "opts": ["Because Bram trusts Oren.", "Because Oren is the keeper.", "Because Oren has got the key.", "Because Bram is exhausted."], "a": 0 }
   ],
   "done": "Good. Now go to Bram, at the gate. And don't be afraid of his spear!"
  },
  {
   "npc": "keeper",
   "type": "talk",
   "hint": "Gözətçiyə yaxınlaş. Onun üç sualı var.",
   "say": [
    "Stop! It's night. The door is locked.",
    "I don't open it for strangers. I have three questions for you."
   ],
   "turns": [
    {
     "q": ["First question. What's your name?"],
     "opts": ["What's your name?", "My name is Ruslan, sir.", "My name is Bram."],
     "a": 1,
     "wrong": "No! I ask the questions here. Your name!",
     "speak": true
    },
    {
     "q": ["Second question. Where's your home?"],
     "opts": ["My home is in the east, near the sea.", "My home is this tower.", "I don't know. Open the door!"],
     "a": 0,
     "wrong": "Hm. That's not a good answer, traveler."
    },
    {
     "q": ["Third question. Why are you here?"],
     "opts": ["I want to sleep in the desert.", "I want to climb the tower and learn its words.", "I want your spear."],
     "a": 1,
     "wrong": "Ha! No. Tell me the truth.",
     "then": "Many people want that. But at night I only open the door for somebody I trust."
    },
    {
     "q": ["Is there anybody here who can say you're not a thief?"],
     "opts": ["No, I don't know anybody.", "Yes. Oren is my friend. He'll tell you.", "Yes. Pasha the camel trusts me."],
     "a": 1,
     "wrong": "A camel? Ha! A camel can't speak for you.",
     "speak": true
    }
   ],
   "done": "Oren? Old Oren! If Oren trusts you, I trust you too."
  },
  {
   "npc": "keeper",
   "type": "build",
   "hint": "Gözətçidən nəzakətlə xahiş et.",
   "say": [
    "So. A friend of Oren is my friend.",
    "What would you like, friend?"
   ],
   "answer": "Could you please open the door for me",
   "extra": ["lock", "hide", "trust", "dawn"],
   "done": "Of course. The key hangs on its hook, next to the door. Wait..."
  },
  {
   "npc": "keeper",
   "type": "line",
   "hint": "Gözətçiyə nə oldu?",
   "say": [
    "Oh no! Look at the wall. The hook is empty!",
    "My key has gone. Somebody has stolen it!",
    "Without the key I can't open the door until dawn, and at dawn the tower guards will ask me where it is.",
    "Please, help me find it. Ask the people in the courtyard. Somebody must have seen something."
   ],
   "done": "Hurry, friend. And keep your eyes open for anything shiny."
  },
  {
   "npc": "spice",
   "type": "talk",
   "hint": "Bazarda bütün xəbərləri bilən biri var. Ədviyyat satan qadınla danış.",
   "say": [
    "Psst! Stranger! Come here. Have you heard the rumour?",
    "The keeper's key has gone! Everybody in the market is talking about it."
   ],
   "turns": [
    {
     "q": ["Some people say a stranger took it. A stranger who arrived tonight without any luggage...", "That's you, isn't it? Are you the thief?"],
     "opts": ["Of course not! I'm trying to help the keeper find it.", "Yes, I'm the thief. Here's the key.", "Maybe. What's a thief?"],
     "a": 0,
     "wrong": "Hmm! I don't trust you at all, stranger.",
     "then": "Help him? Well, you don't look like a thief. Thieves don't usually ask so many questions.",
     "speak": true
    },
    {
     "q": ["Rumours, rumours. Half of them aren't true, you know.", "But I did see something strange this afternoon. While the keeper was drinking his coffee, Pasha the camel was standing next to the gate."],
     "opts": ["Pasha was near the gate? What was he doing there?", "The keeper drinks too much coffee.", "Camels can't drink coffee."],
     "a": 0,
     "wrong": "Never mind his coffee! Listen to the important part.",
     "then": "That's the question!"
    },
    {
     "q": ["He had something shiny in his mouth. Then the boy came running, and they both hurried back to the camp.", "If I were you, I'd talk to that boy. Politely, of course."],
     "opts": ["So the boy might be hiding the key? I'll go and ask him.", "So you hid the key in your spices?", "So I should tell everybody the rumour?"],
     "a": 0,
     "wrong": "Me? Hide a key in my spices? Never! Go and ask the boy."
    }
   ],
   "done": "Go on. And if you find the key, tell the keeper it wasn't me!"
  },
  {
   "npc": "boy",
   "type": "talk",
   "hint": "Açar haradadır? Bəlkə oğlan nəsə bilir.",
   "say": [
    "Oh. Hello again. Is the bucket at the well? Thanks, I'll get it later.",
    "Why are you looking at me like that?"
   ],
   "turns": [
    {
     "q": ["Is something wrong?"],
     "opts": ["Yes. The keeper's key has gone. Have you seen it?", "Yes. Your camel is too big.", "No. Everything's fine. Good night!"],
     "a": 0,
     "wrong": "Oh... OK. Then why are you looking at me?"
    },
    {
     "q": ["The key... Well... You know Pasha loves shiny things.", "This afternoon he took it from the hook. I was scared, so I hid it in his saddlebag."],
     "opts": ["So Pasha took it and you hid it. Don't worry. Could I have it, please?", "You're a bad boy. Give it to me!", "Bad camel! I want a new camel."],
     "a": 0,
     "wrong": "Please don't shout. I'm only a boy, and Pasha is only a camel.",
     "then": "You're not angry? Thank you!",
     "speak": true
    },
    {
     "q": ["Please don't tell the keeper. He's so scary, and he'll think I'm a thief."],
     "opts": ["Don't worry. If you tell him the truth, he'll understand.", "I'm going to tell everybody now!", "Yes, he's very scary. Run and hide!"],
     "a": 0,
     "wrong": "Oh no, oh no..."
    }
   ],
   "done": "OK. The saddlebag is on the sand, near Pasha. The key is inside."
  },
  {
   "npc": "boy",
   "type": "fetch",
   "hint": "Oğlan açarın harada olduğunu dedi.",
   "say": ["Take the key from the saddlebag. Pasha, don't you dare eat it again!"],
   "target": "key",
   "flag": "tookKey",
   "doHint": "Dəvənin yanında çanta var.",
   "done": "Sorry, Pasha. No more shiny things for you."
  },
  {
   "npc": "keeper",
   "type": "choice",
   "hint": "Açarı gözətçiyə qaytar.",
   "say": [
    "You've got my key! Where was it?"
   ],
   "opts": [
    "Pasha the camel took it from the hook, and the boy hid it in a saddlebag.",
    "The spice seller stole it. She's a thief.",
    "It was at the bottom of the well."
   ],
   "a": 0,
   "done": "The camel! Ha! I've guarded this door for thirty years, and a camel steals my key. Fortunately, you're an honest stranger. Go now, friend. The door is open, and the tower is waiting."
  }
 ]
};
