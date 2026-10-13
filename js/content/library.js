// (The Library): story, words and tasks. Spot ids must match js/floors/library.js.
export default {
 "name": "The Library",
 "people": "Katiblər",
 "cefr": "B1-",
 "story": "Bazarın üstündə sükut hökm sürür. Katiblər hər şeyi yazır, amma dünən Qüllə Kitabı (hər səyyahın adı yazılan qırmızı kitab) yoxa çıxıb. Adın kitaba yazılmasa, kitabxanaçı səni yuxarı buraxmayacaq. Şahidləri dinlə və dünən nə baş verdiyini öyrən.",
 "words": [
  { "w": "quiet", "p": "🤫", "az": "sakit" },
  { "w": "because", "p": "🔗", "az": "çünki" },
  { "w": "remember", "p": "🧠", "az": "xatırlamaq" },
  { "w": "lost", "p": "🫥", "az": "itmiş, itirdi (lose)" },
  { "w": "find", "p": "🔎", "az": "tapmaq" },
  { "w": "already", "p": "✅", "az": "artıq" },
  { "w": "borrow", "p": "📖", "az": "(kitab) götürmək, borc almaq" },
  { "w": "should", "p": "☝️", "az": "etməlisən, gərək" },
  { "w": "yesterday", "p": "📅", "az": "dünən" },
  { "w": "ago", "p": "⏳", "az": "əvvəl, öncə" },
  { "w": "heavy", "p": "🏋️", "az": "ağır" },
  { "w": "coat", "p": "🧥", "az": "palto" },
  { "w": "letter", "p": "✉️", "az": "məktub" },
  { "w": "candle", "p": "🕯️", "az": "şam" },
  { "w": "ladder", "p": "🪜", "az": "nərdivan" },
  { "w": "mouse", "p": "🐭", "az": "siçan" }
 ],
 "forms": {
  "lose": "lost",
  "found": "find",
  "remembered": "remember",
  "borrowed": "borrow",
  "coats": "coat",
  "letters": "letter",
  "candles": "candle",
  "ladders": "ladder",
  "mice": "mouse"
 },
 "spots": [
  { "id": "red", "label": "THE BOOK OF THE TOWER" },
  { "id": "green", "label": "a green book: Old Songs of the Gate" },
  { "id": "blue", "label": "a blue book: A Hundred Soups" },
  { "id": "sign", "label": "QUIET, PLEASE" },
  { "id": "cart", "label": "RETURNS · put borrowed books here" },
  { "id": "candle", "label": "fresh candles · take one, bring one back" },
  { "id": "ladder", "label": "a tall wooden ladder · the third step is loose" },
  {
   "id": "librarian",
   "npc": "Librarian",
   "idle": [
    "Please be quiet, because people are reading.",
    "You can borrow a book for two weeks. Late books make me sad.",
    "I wrote every traveller's name in that book. Hundreds and hundreds of names."
   ]
  },
  {
   "id": "reader",
   "npc": "Reader",
   "idle": [
    "I come here every day at nine. I never missed a day in twenty years.",
    "Without my glasses I can't read a single word.",
    "Last week I read a book about dragons. Very exciting, and very quiet."
   ]
  },
  {
   "id": "clerk",
   "npc": "Clerk",
   "idle": [
    "I sort the returned books. Well, I try to.",
    "Yesterday I was late for dinner again. My mother wasn't happy.",
    "Be careful with the ladder. The third step is loose."
   ]
  },
  {
   "id": "scribe",
   "npc": "Old Scribe",
   "idle": [
    "I wrote my first book sixty years ago. My hand still remembers every letter.",
    "My candle went out last night. Dark nights are long nights.",
    "Did you hear something small run past? No? Hmm."
   ]
  },
  { "id": "glasses", "label": "glasses" },
  { "id": "spiral", "exit": true, "locked": "Nobody goes up before their name is in the Book of the Tower." }
 ],
 "tasks": [
  {
   "npc": "librarian",
   "type": "talk",
   "hint": "Kitabxanaçı ilə danış.",
   "say": [
    "Shh! Welcome to the Library. Please keep your voice quiet, because people are reading."
   ],
   "turns": [
    {
     "q": ["You came up from the market, didn't you? How was your journey?"],
     "opts": ["It was long, but I enjoyed it.", "I will go to the market tomorrow.", "Shh yourself! I'm reading."],
     "a": 0,
     "wrong": "Hmm. That isn't really an answer to my question, is it?",
     "then": "Good. Every traveller writes their name in the Book of the Tower before going up."
    },
    {
     "q": ["But I have a terrible problem. The Book of the Tower is lost.", "It was on its shelf yesterday morning. This morning the shelf was empty."],
     "opts": ["Oh no! What does it look like?", "Never mind. I'll go up without it.", "Yes, I know. I took it yesterday."],
     "a": 0,
     "wrong": "No, no. Nobody goes up without the Book. And you weren't even here yesterday!",
     "then": "It's a big, heavy red book with gold lines on the cover."
    },
    {
     "q": ["Will you help me find it? I already looked everywhere: under my desk, behind the shelves, even on the window."],
     "opts": ["Of course. I'll ask the people here what they saw.", "Sorry, I'm in a hurry. Maybe next time.", "Why did you lose it? That was careless."],
     "a": 0,
     "speak": true,
     "wrong": "Please... I can't open the stair without it. And I didn't lose it. I think somebody took it."
    }
   ],
   "done": "Thank you. Start with the reader at the table. He sits there every day, so he sees everything."
  },
  {
   "npc": "reader",
   "type": "fetch",
   "hint": "Oxucu ilə danış.",
   "say": [
    "Psst! Over here. Sorry, I can't help you right now.",
    "I can't remember where I put my glasses. Without them everything looks like a cloud.",
    "Yesterday evening I sat on the other chair for a while. Maybe they fell down there?"
   ],
   "target": "glasses",
   "flag": "gotGlasses",
   "doHint": "Oxucunun yaxınlığında axtar.",
   "done": "My glasses! I can see again. Thank you. Now, what did you want to ask me?"
  },
  {
   "npc": "reader",
   "type": "listen",
   "hint": "Oxucudan qırmızı kitabı soruş.",
   "say": [
    "The red book? Yes! I remember it well, because I saw it yesterday.",
    "I came here at nine o'clock in the morning, like every day.",
    "At about four in the afternoon, a young man in a long green coat came in.",
    "He took the heavy red book from the shelf and sat down by the window with it.",
    "He read for two hours. Then he wrote something on a small piece of paper. A letter, maybe.",
    "At six the dinner bell rang. He jumped up and ran out with the book under his arm."
   ],
   "qs": [
    { "q": "When did the young man come in?", "az": "Nə vaxt?", "opts": ["At nine in the morning", "At about four in the afternoon", "At six in the evening"], "a": 1 },
    { "q": "What was he wearing?", "az": "Əynində nə vardı?", "opts": ["A short red coat", "A long green coat", "A big grey hat"], "a": 1 },
    { "q": "What did he do by the window?", "az": "Pəncərənin yanında", "opts": ["He slept in the sun", "He read and then wrote something", "He talked to the librarian", "He ate his lunch"], "a": 1 },
    { "q": "Why did he run out?", "az": "Niyə qaçdı?", "opts": ["Because the dinner bell rang", "Because the librarian was angry", "Because he lost his glasses"], "a": 0 }
   ],
   "done": "That's everything I saw. Go and tell the librarian."
  },
  {
   "npc": "librarian",
   "type": "choice",
   "hint": "Oxucunun gördüyünü kitabxanaçıya danış.",
   "say": [
    "Did the reader see anything? Who took the book? Describe the person to me."
   ],
   "opts": [
    "A young man in a long green coat took it.",
    "An old woman in a red coat borrowed it.",
    "Nobody took it. It fell behind the shelf."
   ],
   "a": 0,
   "done": "A young man in a green coat... Oh! That's our clerk! He's over there, next to the returns cart."
  },
  {
   "npc": "clerk",
   "type": "talk",
   "hint": "Yaşıl paltolu gənclə danış.",
   "say": [
    "Hello! Can I help you? Do you want to borrow something?"
   ],
   "turns": [
    {
     "q": ["The red book? Yes, I borrowed it yesterday. I needed it for my work."],
     "opts": ["The librarian is looking for it. Where is it now?", "You're a thief! Give it back right now!", "Great. Can I borrow it after you?"],
     "a": 0,
     "wrong": "Whoa, wait! Let me explain first, please.",
     "then": "Looking for it? But I brought it back last night!"
    },
    {
     "q": ["At six o'clock I heard the bell. I was late for dinner, so I ran home with it. After dinner I came back.", "I didn't have time to put it on the shelf, so I left it on the returns cart."],
     "opts": ["So you didn't put it back on the shelf yourself?", "So you put it back on the shelf yourself?", "So you kept it at home all night?"],
     "a": 0,
     "wrong": "No, listen again. I left it on the cart, not on the shelf.",
     "then": "Exactly. I'm sorry. I was in a hurry."
    },
    {
     "q": ["Could you check the cart for me? My hands are full of books."],
     "opts": ["Sure, I'll have a look.", "No. Check it yourself.", "I already checked the whole library."],
     "a": 0,
     "speak": true,
     "wrong": "Oh... all right. I thought you wanted to find the book."
    }
   ],
   "done": "Thanks! Come over here, next to me."
  },
  {
   "npc": "clerk",
   "type": "fetch",
   "hint": "Katib səni gözləyir.",
   "say": [
    "The returns cart is right next to me. Please look: is the red book on it?"
   ],
   "target": "cart",
   "flag": "readNote",
   "doHint": "Qaytarılan kitabların yerinə bax.",
   "done": "Only the blue book and a letter? Let me read it: 'The red book was too heavy for the cart, so I took it. S.' S... That's the old scribe!"
  },
  {
   "npc": "scribe",
   "type": "talk",
   "hint": "Məktubu kim yazıb? Onunla danış.",
   "say": [
    "Eh? Who's there? Speak up, young one. My ears are older than this tower."
   ],
   "turns": [
    {
     "q": ["A letter? Yes, yes, I wrote it. Last night I found the red book on the cart."],
     "opts": ["Do you remember where you put it?", "Why didn't you write a longer letter?", "Did you read the whole book last night?"],
     "a": 0,
     "wrong": "Hmm? That isn't important now, is it? You're looking for the book.",
     "then": "Hmm... I remember that I carried it somewhere. It was very heavy."
    },
    {
     "q": ["But it was dark. My candle went out, and I couldn't see a thing.", "With a little light, I think I can remember."],
     "opts": ["Would you like me to bring you a candle?", "You should go to bed earlier.", "Can't you just try harder?"],
     "a": 0,
     "speak": true,
     "wrong": "Hmm. Young people always have advice, but they never have candles.",
     "then": "Oh, that's kind of you. Light helps me think."
    },
    {
     "q": ["But a fresh one, please, not a short old one. The old ones smoke and make me cough."],
     "opts": ["All right, a fresh candle. I'll be back in a minute.", "A short old one, then. No problem.", "Can't you buy one at the market?"],
     "a": 0,
     "wrong": "No, no, a fresh one! Were you listening, young one?"
    }
   ],
   "done": "Good. There are fresh candles on the stand near the librarian's desk."
  },
  {
   "npc": "scribe",
   "type": "fetch",
   "hint": "Mirzə nəsə istədi.",
   "say": [
    "Back already? No? Then go and get the candle, please. My old eyes are waiting."
   ],
   "target": "candle",
   "flag": "lit",
   "doHint": "Kitabxanaçının masası yaxınlığında axtar.",
   "done": "Ah, light! Thank you. Now... let me close my eyes and remember."
  },
  {
   "npc": "scribe",
   "type": "listen",
   "hint": "Mirzənin xatirəsini dinlə.",
   "say": [
    "Yes. Now I remember. It was a long night.",
    "First, I finished my work at about ten o'clock. Then I saw the red book on the cart.",
    "The cart was full, and the book was too heavy for it, so I picked it up and wrote a letter for the clerk.",
    "I wanted to put the book back in its place, on the top shelf, next to the green book.",
    "So I carried it to the ladder and climbed up, step by step.",
    "But near the top, something small and grey ran over my hand! I got a terrible fright, so I left the book on the top of the ladder and climbed down.",
    "Then I went to bed and forgot all about it. Oh dear."
   ],
   "qs": [
    { "q": "What time did the scribe finish his work?", "az": "Saat neçədə?", "opts": ["At six", "At about ten", "At midnight"], "a": 1 },
    { "q": "Why did he take the book from the cart?", "az": "Niyə?", "opts": ["Because it was too heavy for the cart", "Because he wanted to read it in bed", "Because the clerk asked him to"], "a": 0 },
    { "q": "Where did he want to put the book?", "az": "Hara qoymaq istəyirdi?", "opts": ["On the bottom shelf, next to the blue book", "On the top shelf, next to the green book", "On the librarian's desk"], "a": 1 },
    { "q": "Where did he leave it in the end?", "az": "Sonda harada qoydu?", "opts": ["Under his bed", "On the returns cart", "On the top of the ladder"], "a": 2 }
   ],
   "done": "Something small and grey... a mouse, I think! Go and tell the clerk. His legs are younger than mine."
  },
  {
   "npc": "clerk",
   "type": "fetch",
   "hint": "Mirzənin xatırladığını katibə danış.",
   "say": [
    "The scribe left it on the ladder? Ha! I walked past that ladder three times this morning.",
    "I'll hold it, and you climb up and look. Be careful, the third step is loose."
   ],
   "target": "ladder",
   "flag": "redBack",
   "doHint": "Yuxarıya bax.",
   "done": "You found it! The Book of the Tower! And look, a little mouse is sleeping on the cover. Shh, don't wake him."
  },
  {
   "npc": "librarian",
   "type": "build",
   "hint": "Kitabı kitabxanaçıya göstər.",
   "say": [
    "You're back! And what's that under your arm? My book! Tell me, where did you find it?"
   ],
   "answer": "We found it on the ladder",
   "extra": ["lost", "under", "borrowed", "yesterday"],
   "done": "On the ladder! So the clerk borrowed it, the scribe moved it, and a mouse slept on it. What a library!"
  },
  {
   "npc": "librarian",
   "type": "talk",
   "hint": "Adını Qüllə Kitabına yazdır.",
   "say": [
    "Now, let's write your name in the Book of the Tower. First I need to know a little about you."
   ],
   "turns": [
    {
     "q": ["Where did you start your journey?"],
     "opts": ["At the gate, at the bottom of the tower.", "I'm going to start it tomorrow.", "At the top of the tower, of course."],
     "a": 0,
     "wrong": "Hmm, that's not right. Think again: where did you come in?",
     "then": "The gate. Good, I'm writing it down."
    },
    {
     "q": ["And what did you do on the floors below? Tell me one or two things."],
     "opts": ["I bought fruit at the market and slept at the inn.", "I will buy fruit at the market and sleep at the inn.", "I buy fruit every day and sleep at the market."],
     "a": 0,
     "speak": true,
     "wrong": "I asked what you did. Use the past, please. We're in a library: everything here is history!",
     "then": "Lovely. Fruit and a good bed. Very important."
    },
    {
     "q": ["How long ago did you arrive in the tower?"],
     "opts": ["A few days ago.", "In a few days.", "Every few days."],
     "a": 0,
     "wrong": "Hmm, that doesn't answer my question. How long ago?",
     "then": "Only a few days ago? And you're already on the fourth floor!"
    },
    {
     "q": ["Last question. What should every visitor do in a library?"],
     "opts": ["They should be quiet and bring books back on time.", "They should sing loudly and run between the shelves.", "They should borrow books and never bring them back."],
     "a": 0,
     "wrong": "Shh! Absolutely not!"
    }
   ],
   "done": "Your name is in the Book now. You should go up. The stars are waiting for you."
  }
 ]
};
