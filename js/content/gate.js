// (The Gate): story, words and tasks. Spot ids must match js/floors/gate.js.
export default {
 "name": "The Gate",
 "people": "Gözətçilər",
 "cefr": "A2",
 "story": "Səhra boyunca uzun yol gəldin. Qarşında Sözlər Qülləsi yüksəlir; deyirlər, zirvəyə çatan hər xalqın dilini anlayır. Günəş batır və gözətçi gecə darvazanı yalnız dost üçün açır. Darvazanın qarşısında yorğun bir zəvvar, çörəkçi qadın və dəvəli bir oğlan var. Onlara kömək et, bəlkə onlar da sənə kömək edərlər.",
 "words": [
  { "w": "water", "p": "💧", "az": "su" },
  { "w": "bread", "p": "🍞", "az": "çörək" },
  { "w": "door", "p": "🚪", "az": "qapı" },
  { "w": "key", "p": "🔑", "az": "açar" },
  { "w": "tired", "p": "😩", "az": "yorğun" },
  { "w": "give", "p": "🤲", "az": "vermək" },
  { "w": "open", "p": "🔓", "az": "açmaq" },
  { "w": "friend", "p": "🤝", "az": "dost" },
  { "w": "bucket", "p": "🪣", "az": "vedrə" },
  { "w": "camel", "p": "🐫", "az": "dəvə" },
  { "w": "lamp", "p": "🪔", "az": "çıraq" },
  { "w": "sun", "p": "☀️", "az": "günəş" },
  { "w": "night", "p": "🌙", "az": "gecə" },
  { "w": "sleep", "p": "😴", "az": "yatmaq" },
  { "w": "name", "p": "📛", "az": "ad" },
  { "w": "help", "p": "🆘", "az": "kömək etmək" }
 ],
 "forms": {
  "opened": "open",
  "opens": "open",
  "friends": "friend",
  "gave": "give",
  "gives": "give",
  "camels": "camel",
  "buckets": "bucket",
  "lamps": "lamp",
  "nights": "night",
  "sleeps": "sleep",
  "sleeping": "sleep",
  "names": "name",
  "helps": "help",
  "helping": "help"
 },
 "spots": [
  { "id": "well", "label": "WATER" },
  { "id": "bread", "label": "BREAD" },
  { "id": "bucket", "label": "BUCKET" },
  { "id": "lamp", "label": "LAMP" },
  { "id": "camel", "label": "CAMEL · DO NOT TOUCH" },
  { "id": "key", "label": "KEY" },
  {
   "id": "pilgrim",
   "npc": "Pilgrim",
   "idle": [
    "I am so tired. My feet hurt.",
    "The sun is very hot today. I need water.",
    "Look at the keeper. He looks angry, but he is a good man."
   ]
  },
  {
   "id": "baker",
   "npc": "Baker",
   "idle": [
    "Fresh bread! Warm bread! Bread for friends!",
    "I make bread every morning. At night I sleep.",
    "My lamp is old, but it gives good light."
   ]
  },
  {
   "id": "boy",
   "npc": "Camel boy",
   "idle": [
    "This is my camel. His name is Pasha.",
    "Pasha eats everything. Bread, grass, my hat...",
    "Can you ride a camel? I can!"
   ]
  },
  {
   "id": "keeper",
   "npc": "Keeper",
   "idle": [
    "Stop! This door is closed at night.",
    "Only a friend can open the door.",
    "I don't sleep. I watch the door. Always."
   ]
  },
  { "id": "door", "exit": true, "locked": "The door is closed. You need the key." }
 ],
 "tasks": [
  {
   "npc": "pilgrim",
   "type": "talk",
   "hint": "Yorğun zəvvarla danış.",
   "say": [
    "Oh, hello, traveler. Come and sit with me.",
    "I am so tired. I walk all day, and the sun is very hot."
   ],
   "turns": [
    {
     "q": ["My name is Oren. What is your name?"],
     "opts": ["My name is Ruslan.", "Your name is Oren.", "I am fine, thank you."],
     "a": 0,
     "wrong": "No, no. Oren is MY name. What is YOUR name?",
     "then": "Ruslan! A good name.",
     "speak": true
    },
    {
     "q": ["Where do you come from, Ruslan?"],
     "opts": ["I come to the tower.", "I come from the east, from the sea.", "I am from tired."],
     "a": 1,
     "wrong": "Hm? I mean your home. Where is your home?",
     "then": "The sea! I love the sea. Here we have only sand."
    },
    {
     "q": ["Ruslan, can you help me? I have no water, and I can't walk now."],
     "opts": ["Yes, of course. I can help you.", "No. Help me, please.", "Yes, you can walk."],
     "a": 0,
     "wrong": "Oh... Please, friend. I am very tired.",
     "speak": true
    }
   ],
   "done": "Thank you! The well is there. But... where is the bucket? Ask the camel boy."
  },
  {
   "npc": "boy",
   "type": "talk",
   "hint": "Vedrə haradadır? Dəvəli oğlandan soruş.",
   "say": [
    "Hi! Do you like my camel? His name is Pasha.",
    "He is very big and very hungry. Every day he drinks a lot of water."
   ],
   "turns": [
    {
     "q": ["Do you want something?"],
     "opts": ["Give me your camel.", "Excuse me, do you have the bucket from the well?", "Your camel is ugly."],
     "a": 1,
     "wrong": "Hey! That is not nice. What do you want?",
     "then": "The bucket? Yes, I have it. Pasha drinks from it."
    },
    {
     "q": ["Why do you need it?"],
     "opts": ["Because I want a camel.", "Because the pilgrim is tired and he needs water.", "Because I can't swim."],
     "a": 1,
     "wrong": "Hm? That is strange. Why do you need the bucket?",
     "then": "Oh, the old pilgrim. He is nice. He always gives Pasha bread."
    },
    {
     "q": ["OK. You can take it. But please bring it back. Pasha drinks again at night."],
     "opts": ["No, it is my bucket now.", "Thank you! I can bring it back later.", "Pasha can drink later. Bye!"],
     "a": 1,
     "wrong": "No, no! He needs it too. Bring it back, OK?"
    }
   ],
   "done": "The bucket is next to Pasha. Take it!"
  },
  {
   "npc": "boy",
   "type": "fetch",
   "hint": "Oğlan nəyi götürməyə icazə verdi?",
   "say": ["Go on, take the bucket. It is next to my camel, on the sand."],
   "target": "bucket",
   "flag": "gotBucket",
   "doHint": "Dəvənin yanında nə var?",
   "done": "Good. Now go to the well. Don't drop it!"
  },
  {
   "npc": "pilgrim",
   "type": "fetch",
   "hint": "Vedrə səndədir. Zəvvarın yanına qayıt.",
   "say": [
    "You have the bucket! Wonderful.",
    "Please, go to the well and give me some water."
   ],
   "target": "well",
   "flag": "gaveWater",
   "doHint": "Su haradan gəlir?",
   "done": "Ahh! Thank you, my friend! Water is life. But now I am hungry too. Can you talk to the baker?"
  },
  {
   "npc": "baker",
   "type": "talk",
   "hint": "Çörəkçi qadınla danış.",
   "say": [
    "Good evening, dear! Look, the sun goes down.",
    "Do you want some bread?"
   ],
   "turns": [
    {
     "q": ["What can I give you?"],
     "opts": ["Give me all the bread. Now!", "Two pieces of bread, please. One is for the pilgrim.", "I want water, please."],
     "a": 1,
     "wrong": "Oh! Be polite, dear. What do you want?",
     "then": "Two pieces? Of course.",
     "speak": true
    },
    {
     "q": ["Hmm. You have no money, right?"],
     "opts": ["No, I don't. But I can help you.", "Yes, I have a lot of money.", "Money is not important. Give me bread."],
     "a": 0,
     "wrong": "Really? I can see your bag. It is empty, dear.",
     "then": "You can help me? Good!"
    },
    {
     "q": ["At night I can't see my bread. I need my lamp. It is next to the well. Can you bring it?"],
     "opts": ["Sorry, I can't see in the night.", "Yes. Your lamp is next to the well. I can bring it.", "Your bread is next to the well."],
     "a": 1,
     "wrong": "No, dear. The LAMP. It is next to the well."
    }
   ],
   "done": "Thank you, dear. The lamp is small and brown."
  },
  {
   "npc": "baker",
   "type": "fetch",
   "hint": "Çörəkçinin nəyə ehtiyacı var? Harada idi?",
   "say": ["The lamp, dear. Please bring it before the night."],
   "target": "lamp",
   "flag": "gotLamp",
   "doHint": "Quyunun yanına bax.",
   "done": "Oh, light! Now I can see. Take the bread, it is on my table. Two pieces, for you and your friend."
  },
  {
   "npc": "pilgrim",
   "type": "fetch",
   "hint": "Zəvvar ac qalıb.",
   "say": ["The baker is happy! Can you give me some bread?"],
   "target": "bread",
   "flag": "gaveBread",
   "doHint": "Çörəkçi nə dedi? Çörək haradadır?",
   "done": "You are kind. Sit down for a minute. I can tell you about the keeper."
  },
  {
   "npc": "pilgrim",
   "type": "listen",
   "hint": "Zəvvar gözətçi haqqında danışır. Diqqətlə dinlə.",
   "say": [
    "Listen, Ruslan. The keeper is my old friend. His name is Bram.",
    "Every night at nine o'clock, Bram closes the door.",
    "At night he opens the door only for a friend.",
    "He asks three questions: your name, your home and why you are here.",
    "Answer him politely. And tell him: Oren is my friend.",
    "Oh, and one more thing: Bram doesn't sleep at night. Never! He drinks coffee."
   ],
   "qs": [
    { "q": "What is the keeper's name?", "az": "gözətçinin adı", "opts": ["Oren", "Bram", "Pasha", "Ruslan"], "a": 1 },
    { "q": "When does the keeper close the door?", "az": "saat neçədə?", "opts": ["At seven o'clock", "In the morning", "At nine o'clock", "He never closes it"], "a": 2 },
    { "q": "How many questions does the keeper ask?", "az": "neçə sual?", "opts": ["One", "Two", "Three", "Nine"], "a": 2 },
    { "q": "What must you tell the keeper?", "az": "nə deməlisən?", "opts": ["Oren is my friend.", "I am very tired.", "Give me coffee.", "Pasha is my camel."], "a": 0 }
   ],
   "done": "Good. Now go to Bram. And don't be afraid of his spear!"
  },
  {
   "npc": "keeper",
   "type": "talk",
   "hint": "Gözətçiyə yaxınlaş. Onun üç sualı var.",
   "say": [
    "Stop! It is night. The door is closed.",
    "I have three questions for you."
   ],
   "turns": [
    {
     "q": ["First question. What is your name?"],
     "opts": ["What is your name?", "My name is Ruslan, sir.", "My name is Bram."],
     "a": 1,
     "wrong": "No! I ask the questions here. Your name!",
     "speak": true
    },
    {
     "q": ["Second question. Where is your home?"],
     "opts": ["My home is in the east, near the sea.", "My home is this tower.", "I don't know. Open the door!"],
     "a": 0,
     "wrong": "Hm. That is not a good answer, traveler."
    },
    {
     "q": ["Third question. Why are you here?"],
     "opts": ["I want to sleep in the desert.", "I want to climb the tower and learn the words.", "I want your spear."],
     "a": 1,
     "wrong": "Ha! No. Tell me the truth.",
     "then": "Many people want that. But at night I open the door only for a friend."
    },
    {
     "q": ["Do you have a friend here?"],
     "opts": ["No, I have no friends.", "Yes. Oren is my friend.", "Yes. Pasha the camel is my friend."],
     "a": 1,
     "wrong": "A camel? Ha! A camel can't speak for you.",
     "speak": true
    }
   ],
   "done": "Oren? Old Oren! He is my friend too."
  },
  {
   "npc": "keeper",
   "type": "build",
   "hint": "Gözətçidən nəzakətlə xahiş et.",
   "say": [
    "So. A friend of Oren is my friend.",
    "What do you want, friend?"
   ],
   "answer": "Can you open the door please",
   "extra": ["give", "close", "key", "sleep"],
   "done": "Yes, I can. The key is on the wall. Wait..."
  },
  {
   "npc": "keeper",
   "type": "line",
   "hint": "Gözətçiyə nə oldu?",
   "say": [
    "Oh no! Look at the wall. The hook is empty!",
    "My key is not there. Where is my key?",
    "Without the key I can't open the door. Please, help me!"
   ],
   "done": "Ask the people here. Somebody knows something."
  },
  {
   "npc": "boy",
   "type": "talk",
   "hint": "Açar haradadır? Bəlkə oğlan nəsə bilir.",
   "say": [
    "Oh. Hello again. Do you have Pasha's bucket? Thank you.",
    "Why do you look at me like that?"
   ],
   "turns": [
    {
     "q": ["Is something wrong?"],
     "opts": ["Yes. The keeper's key is not on the wall. Do you know where it is?", "Yes. Your camel is too big.", "No. Everything is fine. Good night!"],
     "a": 0,
     "wrong": "Oh... OK. Then why do you look at me?"
    },
    {
     "q": ["The key... Well... Pasha likes shiny things.", "In the afternoon he took the key from the wall. Now it is in his bag."],
     "opts": ["Your camel took the key? That is very funny! Can I have it, please?", "You are a bad boy. Give it to me!", "Bad camel! I want a new camel."],
     "a": 0,
     "wrong": "Please don't shout. I am only a boy, and Pasha is only a camel.",
     "then": "You are not angry? Thank you!",
     "speak": true
    },
    {
     "q": ["Please don't tell the keeper. He is scary."],
     "opts": ["Don't worry. The keeper is a good man.", "I tell him everything now!", "Yes, he is very scary. Run!"],
     "a": 0,
     "wrong": "Oh no, oh no..."
    }
   ],
   "done": "OK. The bag is on the sand, next to Pasha. The key is in it."
  },
  {
   "npc": "boy",
   "type": "fetch",
   "hint": "Oğlan açarın harada olduğunu dedi.",
   "say": ["Take the key from the bag. Pasha, don't eat it again!"],
   "target": "key",
   "flag": "tookKey",
   "doHint": "Dəvənin yanında çanta var.",
   "done": "Sorry, Pasha. No more keys for you."
  },
  {
   "npc": "keeper",
   "type": "choice",
   "hint": "Açarı gözətçiyə qaytar.",
   "say": [
    "You have my key! Where was it?"
   ],
   "opts": [
    "The boy's camel took it. He likes shiny things.",
    "The baker took it. She needs it for her lamp.",
    "It was in the well, in the water."
   ],
   "a": 0,
   "done": "The camel! Ha! Every night I watch the door, and a camel takes my key. Go now, friend. Open the door. The tower is waiting."
  }
 ]
};
