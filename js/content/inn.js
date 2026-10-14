// The Inn: story, words and tasks. Spot ids must match js/floors/inn.js.
export default {
 "name": "The Inn",
 "people": "Mehmanxanaçılar",
 "cefr": "B1-B2",
 "story": "Qüllənin yarısında yolçuların dincəldiyi isti, taxta bir mehmanxana var: \"Yuxulu Fənər\". Burada otaq tutmaq, yemək sifariş etmək, şikayət etmək və nəzakətlə üzr istəmək lazımdır. Amma bu gecə mehmanxanada hər şey qarışıqdır: açar yanlış adamdadır, musiqiçi qonaqları narahat edir, aşpazın isə şorbası üçün bir tərkib hissəsi çatmır.",
 "words": [
  { "w": "reservation", "p": "📅", "az": "bron, rezervasiya" },
  { "w": "available", "p": "✅", "az": "boş, mövcud (istifadəyə hazır)" },
  { "w": "spare", "p": "🔑", "az": "ehtiyat, artıq (ehtiyat açar)" },
  { "w": "starving", "p": "🤤", "az": "çox ac, acından ölən" },
  { "w": "swap", "p": "🔄", "az": "dəyişmək (bir-biri ilə yer dəyişmək)" },
  { "w": "complain", "p": "😤", "az": "şikayət etmək" },
  { "w": "rude", "p": "😠", "az": "kobud, nəzakətsiz" },
  { "w": "disturb", "p": "🔕", "az": "narahat etmək" },
  { "w": "fault", "p": "🤦", "az": "günah, təqsir (\"mənim günahımdır\")" },
  { "w": "delay", "p": "⏳", "az": "gecikmə; gecikdirmək" },
  { "w": "snore", "p": "😴", "az": "xoruldamaq" },
  { "w": "serve", "p": "🍽️", "az": "(yemək) vermək, süfrəyə vermək" },
  { "w": "ingredient", "p": "🥕", "az": "tərkib hissəsi, inqrediyent" },
  { "w": "jar", "p": "🫙", "az": "banka" },
  { "w": "include", "p": "➕", "az": "daxil etmək (qiymətə daxil)" },
  { "w": "charge", "p": "💰", "az": "haqq almaq, pul tutmaq" }
 ],
 "forms": {
  "reservations": "reservation",
  "swapped": "swap",
  "swapping": "swap",
  "complained": "complain",
  "complains": "complain",
  "complaining": "complain",
  "disturbed": "disturb",
  "disturbing": "disturb",
  "disturbs": "disturb",
  "delayed": "delay",
  "delays": "delay",
  "snoring": "snore",
  "snored": "snore",
  "snores": "snore",
  "faults": "fault",
  "served": "serve",
  "serves": "serve",
  "serving": "serve",
  "ingredients": "ingredient",
  "jars": "jar",
  "included": "include",
  "includes": "include",
  "charged": "charge",
  "charges": "charge"
 },
 "spots": [
  { "id": "host", "npc": "Marta, the innkeeper", "idle": [
   "Welcome to the Sleepy Lantern! Without a reservation it's harder, but I'll always find you a bed.",
   "Sorry, I'm run off my feet tonight. Hardly any rooms are available, not even a spare bed.",
   "The keys hang on the board behind me. If one is missing, it's usually my fault."
  ] },
  { "id": "cook", "npc": "Bako, the cook", "idle": [
   "I serve dinner to thirty guests every night. Thirty! And they all complain if it's delayed.",
   "Don't touch the pot, please. It's boiling.",
   "A good soup needs fresh ingredients and a patient cook. I'm only one of those."
  ] },
  { "id": "girl", "npc": "Lili", "idle": [
   "I help my mother. I serve tea, I clean rooms and I carry the guests' luggage upstairs.",
   "Tired? Me? Well... maybe a little. But the guests are always starving, so I keep busy.",
   "Would you like some tea? It's included in the price of the room, so we don't charge for it."
  ] },
  { "id": "guest", "npc": "Oskar, a guest", "idle": [
   "I'm a merchant. I sell carpets. Big ones. I always carry a spare one, just in case.",
   "All I want is eight hours of sleep without anyone disturbing me. Is that too much to ask?",
   "Shh. Listen. Can you hear that lute? I'm not complaining. Well, I am."
  ] },
  { "id": "bard", "npc": "Pip, the musician", "idle": [
   "La la laaa! Do you know this song? Everybody knows this song!",
   "One song for a coin, two songs for a bowl of soup. I don't charge for the bad ones.",
   "My lute is old, but it's very loud. Louder than Oskar's snoring, and that's saying something."
  ] },
  { "id": "shelf", "label": "TEA · HONEY · CUPS" },
  { "id": "pot", "label": "SOUP OF THE DAY" },
  { "id": "menu", "label": "MENU · SOUP 2 COINS · TEA 1 COIN · BREAKFAST 7–9, INCLUDED FOR GUESTS" },
  { "id": "keys", "label": "ROOM KEYS · 1–9" },
  { "id": "stairs", "exit": true, "locked": "I'm afraid these stairs are for guests only. Please check in at the desk first." }
 ],
 "tasks": [
  {
   "npc": "host", "type": "talk",
   "hint": "Mehmanxanaçı qadın səni gözləyir. Otaq lazımdır.",
   "say": ["Good evening, and welcome to the Sleepy Lantern!", "Oh dear, you look worn out. Come in and sit by the fire."],
   "turns": [
    {
     "q": ["Now, how can I help you? Do you have a reservation?"],
     "opts": ["I'm afraid I don't. Do you have a room available for tonight?", "No. Just give me a room, and be quick about it.", "Yes, I'd like to make a complaint about your stairs."],
     "a": 0, "speak": true,
     "wrong": "Goodness. Let's try that again, dear. I only asked if you've booked a room.",
     "then": "No reservation? Let me check my book. We're nearly full tonight."
    },
    {
     "q": ["Is it just for one night, or are you staying longer?"],
     "opts": ["At about one o'clock, I think.", "Just for one night, please.", "I'm not hungry, thanks."],
     "a": 1,
     "wrong": "Sorry? I asked how many nights you're staying."
    },
    {
     "q": ["You're lucky. Room seven is still available. We charge twelve coins a night, and breakfast is included in the price."],
     "opts": ["So breakfast costs extra, then?", "I won't eat breakfast, so you can charge me less.", "That's fine. Can I pay when I leave in the morning?"],
     "a": 2,
     "wrong": "No, no. Breakfast is included, so it doesn't change the price at all.",
     "then": "Of course. You can pay the bill tomorrow before you leave."
    },
    {
     "q": ["Now, the key for room seven... That's strange. It isn't on the board!", "Oh no, it's my fault. I think I gave it to the gentleman at the table by mistake. Oskar. Now he has his own key and a spare one.", "Could you have a word with him, please? I'm run off my feet tonight."],
     "opts": ["Sure. I'll ask him politely for the key.", "Why should I? It was your mistake.", "Sure. I'll take both of his keys."],
     "a": 0,
     "wrong": "Please don't make things worse. Just ask him nicely for the key."
    }
   ],
   "done": "Thank you, dear! He's the man at the table with the big hat. Tell him it was my fault, not his."
  },
  {
   "npc": "guest", "type": "talk",
   "hint": "Masa arxasındakı qonaqla danış. Açar ondadır.",
   "say": ["Hm? Sorry, I was nearly asleep. Who are you?"],
   "turns": [
    {
     "q": ["Do you want something from me?"],
     "opts": ["Give me that key. It's mine.", "Sorry to disturb you, but I think you've got the key for room seven by mistake.", "Sorry to disturb you, but could I have your soup?"],
     "a": 1, "speak": true,
     "wrong": "Excuse me? That's rather rude. Try asking nicely."
    },
    {
     "q": ["Room seven? Yes, I've got a spare key here. But I'm in room three, right next to the stage.", "That musician plays until one in the morning. I complained to him yesterday. Maybe I was a bit rude, because today he's playing even louder!", "Room seven is at the end of the corridor, nice and quiet. Shall we swap? I take room seven, and you take room three."],
     "opts": ["That sounds awful. But maybe the musician would stop if someone asked him nicely.", "Great idea. I love sleeping next to a stage.", "Then complain again, and louder this time."],
     "a": 0,
     "wrong": "Very funny. I need sleep, not jokes."
    },
    {
     "q": ["Ask him nicely? He never listens to me. I'm just a tired old merchant.", "But maybe he'll listen to you. If the music stops at ten, I won't need to swap. You can have the key."],
     "opts": ["Then let's swap right now. I'll sleep in room three.", "Sorry, I can't hear you. The music is too loud.", "All right. I'll have a word with the musician."],
     "a": 2,
     "wrong": "No, no. Please, just talk to that musician first."
    }
   ],
   "done": "Thank you. He's on the little stage. You can't miss him. You can certainly hear him!"
  },
  {
   "npc": "bard", "type": "talk",
   "hint": "Musiqiçini tap. Nəzakətlə xahiş et.",
   "say": ["La la laaa! Ah, a new face! Welcome, welcome!"],
   "turns": [
    {
     "q": ["Would you like a song? I know a hundred songs!"],
     "opts": ["No. Stop that terrible noise.", "Maybe later, thanks. Could I ask you something first?", "Yes, please. Play until two in the morning!"],
     "a": 1,
     "wrong": "Oh! That wasn't very kind. Or very helpful.",
     "then": "Of course. Ask me anything!"
    },
    {
     "q": ["What is it?"],
     "opts": ["Could you play more quietly after ten, please? You're disturbing the guests.", "Could you play louder, please? I can't hear you.", "Why is your soup cold?"],
     "a": 0, "speak": true,
     "wrong": "Hmm? I don't follow. What's the problem?"
    },
    {
     "q": ["Disturbing them? Oh dear. I'm sorry, nobody told me. Well, Oskar complained, but he was so rude about it that I played louder.", "The truth is, I'm starving. Dinner has been delayed for two hours, and when I'm hungry, I play loudly. It helps me forget my stomach."],
     "opts": ["I'm not hungry either, thanks.", "I see. I'll find out why dinner is delayed and bring you something.", "Then sell your lute and buy some soup."],
     "a": 1,
     "wrong": "Hmm, no. I just need some dinner, my friend."
    }
   ],
   "done": "Wonderful! Bring me a bowl of hot soup, and I'll play so quietly that Oskar can snore in peace."
  },
  {
   "npc": "cook", "type": "listen",
   "hint": "Aşpazın yanına get. Diqqətlə dinlə.",
   "say": [
    "Dinner for the musician? Ha! Everyone is starving, and everything is delayed tonight!",
    "Usually we serve dinner at seven o'clock. It's nine now, and the soup still isn't ready.",
    "Here's how I make it. First I fry onions and carrots. Then I add water and potatoes and let it cook for half an hour.",
    "The last ingredient is one big spoon of honey. That's my secret, so keep it to yourself.",
    "But the honey jar was empty, so I sent Lili, the innkeeper's daughter, down to the cellar to fetch another jar.",
    "That was an hour ago! Without that last ingredient, I can't serve anything."
   ],
   "qs": [
    { "q": "What time does the cook usually serve dinner?", "az": "Adətən", "opts": ["At seven o'clock", "At nine o'clock", "At ten o'clock"], "a": 0 },
    { "q": "What is the last ingredient in the soup?", "az": "Sonuncu", "opts": ["Carrots", "Honey", "Water", "Tea"], "a": 1 },
    { "q": "Why can't the cook serve the soup yet?", "az": "Niyə?", "opts": ["He's too tired.", "The pot is broken.", "There's no honey in the kitchen."], "a": 2 },
    { "q": "Who went to fetch a jar of honey?", "az": "Kim getdi?", "opts": ["The musician", "The innkeeper's daughter", "The guest at the table"], "a": 1 }
   ],
   "done": "Yes, Lili. Please find her for me. She's usually by the fire."
  },
  {
   "npc": "girl", "type": "fetch",
   "hint": "Lilini tap. O, ocağın yanındadır.",
   "say": [
    "The honey? Oh no! I brought a jar up from the cellar an hour ago.",
    "But then a guest asked for tea, so I made tea, and then another guest wanted tea, and I completely forgot.",
    "I left the jar next to the tea cups. It's all my fault! Please tell the cook I'm sorry, and take it to him!"
   ],
   "target": "shelf",
   "doHint": "Lili balı harada qoyub? Onun sözlərini xatırla.",
   "flag": "gotHoney",
   "done": "Yes, that's the one! The jar next to the tea cups. Thank you!"
  },
  {
   "npc": "cook", "type": "build",
   "hint": "Balı aşpaza apar və musiqiçi üçün yemək istə.",
   "say": ["My honey! You found the jar! One big spoon... and... perfect. Dinner is no longer delayed.", "Lili says it was her fault? Ha, she's a good girl. Now, what can I do for you?"],
   "answer": "Could you serve the musician a bowl of soup",
   "extra": ["charge", "swap", "rude", "jar"],
   "done": "Here you are. Hot soup with honey. Careful, it's very hot! I'll put it on your bill."
  },
  {
   "npc": "bard", "type": "choice",
   "hint": "Şorbanı musiqiçiyə apar.",
   "say": ["Is that for me? Soup with honey! You're my best friend.", "Mmm. So, tell me honestly. Until what time can I play tonight?"],
   "opts": ["Play all night. Nobody ever complains about music.", "Please never play here again. Never.", "Until ten o'clock. After that, play quietly so you don't disturb anyone."],
   "a": 2,
   "flagAfter": "fed",
   "done": "Ten o'clock. It's a deal! And after ten, only sleepy songs. Quiet enough for snoring."
  },
  {
   "npc": "guest", "type": "fetch",
   "hint": "Qonağa xəbəri çatdır.",
   "say": [
    "Is it true? The music stops at ten? Oh, thank you!",
    "Then I don't need to swap rooms. I'll stay in room three. And I'm sorry about the key. It was partly my fault, I didn't check the number.",
    "I've put it back on the board behind the innkeeper. It's the key with the number seven. Go and take it."
   ],
   "target": "keys",
   "doHint": "Açar haradadır? Qonaq dedi: mehmanxanaçının arxasında.",
   "flag": "tookKey",
   "done": "That's the one. Good night, and I hope nobody disturbs you!"
  },
  {
   "npc": "host", "type": "listen",
   "hint": "Açarı mehmanxanaçıya göstər. O, qaydaları danışacaq.",
   "say": [
    "You've got the key! Wonderful. Now, before you go up, here are the house rules.",
    "Your room is on the second floor, at the end of the corridor, next to the big window. If you lose your key, I keep a spare one, but I charge two coins for it.",
    "We serve breakfast in this hall from seven to nine. After nine, nothing. The cook is very strict.",
    "Please keep quiet after ten, and don't disturb the other guests. Most of them are tired travellers.",
    "The front door is locked at midnight. If you come back later than that, knock three times.",
    "And tomorrow morning, before you leave, you pay at this desk."
   ],
   "qs": [
    { "q": "Where is your room?", "az": "Otaq harada?", "opts": ["Next to the kitchen", "At the end of the corridor, next to the window", "Next to the stage"], "a": 1 },
    { "q": "Can you have breakfast at half past nine?", "az": "Saat 9:30-da?", "opts": ["Yes, they serve it until ten.", "No, they stop serving at nine.", "Yes, but they charge extra for it."], "a": 1 },
    { "q": "What should you do if you come back after midnight?", "az": "Gecə yarısından sonra", "opts": ["Knock three times", "Ring a bell", "Wait until the morning"], "a": 0 },
    { "q": "What happens if you lose your key?", "az": "Açarı itirsən", "opts": ["You sleep downstairs.", "You get a spare key for two coins.", "Lili finds it for free."], "a": 1 }
   ],
   "done": "Perfect. Good night! Sleep well."
  },
  {
   "npc": "girl", "type": "talk",
   "hint": "Səhər açıldı. Lili səhər yeməyi verir.",
   "say": ["Good morning! It's eight o'clock. Did you sleep well?"],
   "turns": [
    {
     "q": ["Pip was really quiet last night. The only noise was Oskar snoring! Nobody complained at all."],
     "opts": ["Yes, really well, thanks. It was so peaceful.", "No. I slept in the kitchen.", "Yes, the music kept me awake all night, thanks."],
     "a": 0,
     "wrong": "Really? Hmm, everyone else says it was quiet."
    },
    {
     "q": ["Here's the breakfast menu. We serve eggs, bread with honey, or porridge. To drink, there's tea or milk."],
     "opts": ["I'd like fish and a glass of wine, please.", "I'd like eggs and a cup of tea, please.", "I'd like the soup of the day and the bill."],
     "a": 1, "speak": true,
     "wrong": "Sorry, we don't serve that at breakfast. Have another look."
    },
    {
     "q": ["And don't worry, we don't charge for the tea. Drinks are included too. Black, or with milk?"],
     "opts": ["Yes.", "With milk, please. And no sugar.", "Cold, please, with ice."],
     "a": 1,
     "wrong": "Hmm? Black or with milk? Just choose one."
    },
    {
     "q": ["Anything else? Bread with honey? It's from the same jar as the soup!"],
     "opts": ["No, thank you. That's plenty.", "Bring me everything you've got.", "Yes, the whole jar, please. All of it."],
     "a": 0,
     "wrong": "Ha ha. Sorry, the cook needs that jar for tonight's soup."
    }
   ],
   "done": "Eggs and tea with milk, coming right up!"
  },
  {
   "npc": "host", "type": "choice",
   "hint": "Ayrılmaq vaxtıdır. Hesabı ödə.",
   "say": [
    "Good morning! Here's your bill.",
    "Room seven, one night: twelve coins. Breakfast is included, so we don't charge for that. The soup for the musician: two coins.",
    "So, how much do you owe me?"
   ],
   "opts": ["Twelve coins", "Fourteen coins", "Sixteen coins"],
   "a": 1,
   "done": "Fourteen coins. Thank you very much!"
  },
  {
   "npc": "host", "type": "build",
   "hint": "Qonaq kitabına bir cümlə yaz.",
   "say": ["Before you go, would you write a line in our guest book?", "What did you like about the Sleepy Lantern?"],
   "answer": "The room was quiet and nobody disturbed my sleep",
   "extra": ["noisy", "rude", "delayed", "complained"],
   "done": "How kind! Come back any time, with or without a reservation. The stairs on the right go up the tower. They're open for you now!"
  }
 ]
};
