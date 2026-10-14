// (The Library): story, words and tasks. Spot ids must match js/floors/library.js.
export default {
 "name": "The Library",
 "people": "Katiblər",
 "cefr": "B1-B2",
 "story": "Bazarın üstündə sükut hökm sürür. Katiblər hər şeyi yazır, amma dünən Qüllə Kitabı (hər səyyahın adı yazılan qırmızı kitab) yoxa çıxıb. Adın kitaba yazılmasa, kitabxanaçı səni yuxarı buraxmayacaq. Şahidləri dinlə, ipuclarını topla və dünən nə baş verdiyini öyrən.",
 "words": [
  { "w": "disappear", "p": "💨", "az": "yoxa çıxmaq, itmək" },
  { "w": "witness", "p": "👁️", "az": "şahid" },
  { "w": "suspicious", "p": "🤨", "az": "şübhəli" },
  { "w": "clue", "p": "🔍", "az": "ipucu" },
  { "w": "describe", "p": "🗣️", "az": "təsvir etmək" },
  { "w": "hurry", "p": "🏃", "az": "tələsmək; tələsik" },
  { "w": "blame", "p": "👉", "az": "günahlandırmaq" },
  { "w": "apologise", "p": "🙏", "az": "üzr istəmək" },
  { "w": "spectacles", "p": "👓", "az": "eynək" },
  { "w": "climb", "p": "🧗", "az": "dırmaşmaq" },
  { "w": "loose", "p": "🔩", "az": "boş, laxlamış" },
  { "w": "terrified", "p": "😱", "az": "dəhşətə gəlmiş, çox qorxmuş" },
  { "w": "whisper", "p": "🤫", "az": "pıçıldamaq" },
  { "w": "overdue", "p": "⏰", "az": "vaxtı keçmiş (gecikmiş)" },
  { "w": "careless", "p": "🫣", "az": "diqqətsiz, ehtiyatsız" },
  { "w": "reward", "p": "🏆", "az": "mükafat" }
 ],
 "forms": {
  "disappeared": "disappear",
  "disappears": "disappear",
  "witnesses": "witness",
  "clues": "clue",
  "described": "describe",
  "hurried": "hurry",
  "hurrying": "hurry",
  "blamed": "blame",
  "blaming": "blame",
  "apologised": "apologise",
  "apologize": "apologise",
  "climbed": "climb",
  "climbing": "climb",
  "whispered": "whisper",
  "whispering": "whisper",
  "rewards": "reward"
 },
 "spots": [
  { "id": "red", "label": "THE BOOK OF THE TOWER" },
  { "id": "green", "label": "a green book: Old Songs of the Gate" },
  { "id": "blue", "label": "a blue book: A Hundred Soups · three weeks overdue" },
  { "id": "sign", "label": "QUIET, PLEASE · whisper, don't shout" },
  { "id": "cart", "label": "RETURNS · put borrowed books here" },
  { "id": "candle", "label": "fresh candles · take one, bring one back" },
  { "id": "ladder", "label": "a tall wooden ladder · the third step is loose" },
  {
   "id": "librarian",
   "npc": "Librarian",
   "idle": [
    "Please whisper. People are trying to read, and loud voices make the books nervous.",
    "If your book is overdue, you pay one coin a week. Nobody likes paying, so bring them back on time.",
    "I've written every traveller's name in that book. Hundreds of names, and not one careless line."
   ]
  },
  {
   "id": "reader",
   "npc": "Reader",
   "idle": [
    "I've come here every day at nine for twenty years. I'm the best witness in this building.",
    "Without my spectacles I can't read a single word. Everything just turns into soup.",
    "Last week I read a mystery about a stolen crown. The clues were everywhere, and I still guessed wrong."
   ]
  },
  {
   "id": "clerk",
   "npc": "Clerk",
   "idle": [
    "I sort the returned books. Well, I try to. Some of them are so overdue they've got grey hair.",
    "I'm always in a hurry. My mother says I'll be late for my own wedding.",
    "Don't climb that ladder without someone holding it. The third step is loose."
   ]
  },
  {
   "id": "scribe",
   "npc": "Old Scribe",
   "idle": [
    "I wrote my first book sixty years ago. My hand still remembers every letter.",
    "My candle went out last night. When it's dark, every little sound seems suspicious.",
    "Did you hear something small run past? No? Hmm. I was terrified of mice as a boy. I still am, a bit."
   ]
  },
  { "id": "glasses", "label": "spectacles, a bit dusty" },
  { "id": "spiral", "exit": true, "locked": "Nobody climbs these stairs before their name is in the Book of the Tower." }
 ],
 "tasks": [
  {
   "npc": "librarian",
   "type": "talk",
   "hint": "Kitabxanaçı ilə danış.",
   "say": [
    "Shh! Welcome to the Library. Please whisper in here. People are reading."
   ],
   "turns": [
    {
     "q": ["You've come up from the market, haven't you? How was the journey?"],
     "opts": ["It was long, but I enjoyed it.", "I'm going to the market tomorrow.", "Shh yourself! I'm reading."],
     "a": 0,
     "wrong": "Hmm. That isn't really an answer to my question, is it?",
     "then": "Good. Every traveller writes their name in the Book of the Tower before they climb any higher."
    },
    {
     "q": ["But I have a terrible problem. The Book of the Tower has disappeared.", "It was on its shelf yesterday morning. This morning the shelf was empty."],
     "opts": ["Oh no! Can you describe it to me?", "Never mind. I'll go up without it.", "Yes, I know. I took it yesterday."],
     "a": 0,
     "wrong": "No, no. Nobody goes up without the Book. And you weren't even here yesterday!",
     "then": "Let me describe it: a big, heavy red book with gold lines on the cover. You can't miss it."
    },
    {
     "q": ["Will you help me find it? I've looked everywhere already: under my desk, behind the shelves, even on the window.", "Books don't just disappear. Somebody must have taken it."],
     "opts": ["Of course. I'll ask the witnesses what they saw.", "Sorry, I'm in a hurry. Maybe next time.", "You must have lost it. That was careless."],
     "a": 0,
     "speak": true,
     "wrong": "Careless? Me? I can't open the stairs without that book, so please, help me instead of blaming me."
    }
   ],
   "done": "Thank you. Start with the reader at the table. He sits there every day, so he's our best witness."
  },
  {
   "npc": "reader",
   "type": "fetch",
   "hint": "Oxucu ilə danış.",
   "say": [
    "Psst! Over here. I'd love to help, but I can't see a thing right now.",
    "I've put my spectacles somewhere, and without them everything looks like a cloud.",
    "Yesterday evening I sat on the other chair for a while. Maybe they fell down there?"
   ],
   "target": "glasses",
   "flag": "gotGlasses",
   "doHint": "Oxucunun yaxınlığında axtar.",
   "done": "My spectacles! I can see again. How careless of me. Now, what did you want to ask?"
  },
  {
   "npc": "reader",
   "type": "listen",
   "hint": "Oxucudan qırmızı kitabı soruş.",
   "say": [
    "The red book? Yes! I remember it well, because something about it was rather suspicious.",
    "I came in at nine o'clock in the morning, as I always do.",
    "At about four in the afternoon, a young man in a long green coat came in.",
    "He took the heavy red book from the shelf and sat down by the window with it.",
    "He read for two hours. Then he wrote something on a small piece of paper. A note, maybe.",
    "At six the dinner bell rang. He jumped up and hurried out with the book under his arm. He didn't even say goodbye!"
   ],
   "qs": [
    { "q": "When did the young man come in?", "az": "Nə vaxt?", "opts": ["At nine in the morning", "At about four in the afternoon", "At six in the evening"], "a": 1 },
    { "q": "How does the reader describe him?", "az": "Onu necə təsvir edir?", "opts": ["A man in a short red coat", "A young man in a long green coat", "An old man in a big grey hat"], "a": 1 },
    { "q": "What did he do by the window?", "az": "Pəncərənin yanında", "opts": ["He slept in the sun", "He read and then wrote something", "He talked to the librarian", "He ate his lunch"], "a": 1 },
    { "q": "Why did he leave in such a hurry?", "az": "Niyə tələsdi?", "opts": ["Because the dinner bell rang", "Because the librarian was angry", "Because he lost his spectacles"], "a": 0 }
   ],
   "done": "That's everything I saw. It's a good clue, I think. Go and tell the librarian."
  },
  {
   "npc": "librarian",
   "type": "choice",
   "hint": "Oxucunun gördüyünü kitabxanaçıya danış.",
   "say": [
    "Did our witness see anything? Who took the book? Describe the person to me."
   ],
   "opts": [
    "A young man in a long green coat. He hurried out with it at six.",
    "An old woman in a red coat. She whispered something and left.",
    "Nobody took it. It fell behind the shelf."
   ],
   "a": 0,
   "done": "A young man in a green coat, always in a hurry... That's our clerk! He's over there, next to the returns cart."
  },
  {
   "npc": "clerk",
   "type": "talk",
   "hint": "Yaşıl paltolu gənclə danış.",
   "say": [
    "Hello! Can I help you? Are you returning something? Is it overdue?"
   ],
   "turns": [
    {
     "q": ["The red book? Yes, I borrowed it yesterday. I needed it for my work."],
     "opts": ["The librarian is looking for it. Where is it now?", "You're a thief! Give it back right now!", "Great. Can I borrow it after you?"],
     "a": 0,
     "wrong": "Whoa, wait! Please don't blame me before you hear the whole story.",
     "then": "Looking for it? But I brought it back last night!"
    },
    {
     "q": ["At six I heard the bell. I was late for dinner, so I hurried home with it. After dinner I came back.", "I didn't have time to put it on the shelf, so I left it on the returns cart."],
     "opts": ["So you didn't put it back on the shelf yourself?", "So you put it back on the shelf yourself?", "So you kept it at home all night?"],
     "a": 0,
     "wrong": "No, listen again. I left it on the cart, not on the shelf.",
     "then": "Exactly. That was careless of me, I know. I apologise."
    },
    {
     "q": ["Could you check the cart for me? My hands are full of overdue books."],
     "opts": ["Sure, I'll have a look.", "No. Check it yourself.", "I've already checked the whole library."],
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
   "done": "Only the blue book, three weeks overdue, and a note? It says: 'The red book was too heavy for the cart, so I took it. S.' That's a clue! S... the old scribe!"
  },
  {
   "npc": "scribe",
   "type": "talk",
   "hint": "Qeydi kim yazıb? Onunla danış.",
   "say": [
    "Eh? Who's there? Don't whisper, young one, speak up. My ears are older than this tower."
   ],
   "turns": [
    {
     "q": ["A note? Yes, yes, I wrote it. Last night I found the red book on the cart."],
     "opts": ["Do you remember where you put it?", "Why didn't you write a longer note?", "Did you read the whole book last night?"],
     "a": 0,
     "wrong": "Hmm? That isn't important now, is it? You're looking for the book.",
     "then": "Hmm... I remember that I carried it somewhere. It was very heavy."
    },
    {
     "q": ["But it was dark. My candle went out, and I couldn't see a thing.", "With a little light, I think I can remember."],
     "opts": ["Would you like me to bring you a candle?", "You shouldn't be so careless with candles.", "Can't you just try harder?"],
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
   "done": "Good. There are fresh candles on the stand near the librarian's desk. No need to hurry, I'm not going anywhere."
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
    "The cart was full, and the book was too heavy for it, so I picked it up and wrote a note for the clerk.",
    "I wanted to put the book back in its place, on the top shelf, next to the green book.",
    "So I carried it to the ladder and began to climb, step by step.",
    "Near the top, something small and grey ran over my hand! I was terrified, so I left the book on the top of the ladder and climbed down as fast as I could.",
    "Then I went to bed and forgot all about it. Oh dear. I must apologise to the librarian."
   ],
   "qs": [
    { "q": "What time did the scribe finish his work?", "az": "Saat neçədə?", "opts": ["At six", "At about ten", "At midnight"], "a": 1 },
    { "q": "Why did he take the book from the cart?", "az": "Niyə?", "opts": ["Because it was too heavy for the cart", "Because he wanted to read it in bed", "Because the clerk asked him to"], "a": 0 },
    { "q": "Where did he want to put the book?", "az": "Hara qoymaq istəyirdi?", "opts": ["On the bottom shelf, next to the blue book", "On the top shelf, next to the green book", "On the librarian's desk"], "a": 1 },
    { "q": "Why did he climb down without the book?", "az": "Niyə kitabsız düşdü?", "opts": ["Because the third step was loose", "Because he was terrified of something small and grey", "Because the clerk called him"], "a": 1 }
   ],
   "done": "Something small and grey... a mouse, I think! Go and tell the clerk. His legs are younger than mine, and he can climb."
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
   "done": "You found it! The Book of the Tower! And look, a little mouse is sleeping on the cover. Shh, whisper, don't wake him."
  },
  {
   "npc": "librarian",
   "type": "build",
   "hint": "Kitabı kitabxanaçıya göstər.",
   "say": [
    "You're back! And what's that under your arm? My book! Tell me, where did you find it?"
   ],
   "answer": "We found it on top of the ladder",
   "extra": ["disappeared", "under", "blamed", "shelf"],
   "done": "On the ladder! So the clerk borrowed it, the scribe moved it, and a mouse slept on it. I blamed a thief, and there was no thief at all. I apologise to everyone!"
  },
  {
   "npc": "librarian",
   "type": "talk",
   "hint": "Adını Qüllə Kitabına yazdır.",
   "say": [
    "You deserve a reward for this. The best reward I can give is your name in the Book of the Tower. But first I need to know a little about you."
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
     "opts": ["I bought fruit at the market and slept at the inn.", "I'll buy fruit at the market and sleep at the inn.", "I buy fruit every day and sleep at the market."],
     "a": 0,
     "speak": true,
     "wrong": "I asked what you did. Use the past, please. We're in a library: everything here is history!",
     "then": "Lovely. Fruit and a good bed. Very important."
    },
    {
     "q": ["You were a very good detective today. Which clue helped you most?"],
     "opts": ["The note on the cart. It led me to the scribe.", "I'll find a clue tomorrow, I think.", "I didn't need any clues. I just guessed."],
     "a": 0,
     "wrong": "Hmm, I don't believe that. Think about the note on the cart.",
     "then": "Yes, the note! Without that clue, the book would still be missing."
    },
    {
     "q": ["Last question. What should every visitor do in a library?"],
     "opts": ["They should whisper and never keep books overdue.", "They should sing loudly and run between the shelves.", "They should borrow books and never bring them back."],
     "a": 0,
     "wrong": "Shh! Absolutely not!"
    }
   ],
   "done": "Your name is in the Book now. That's your reward. You may climb the stairs. The stars are waiting for you."
  }
 ]
};
