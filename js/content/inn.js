// The Inn: story, words and tasks. Spot ids must match js/floors/inn.js.
export default {
 "name": "The Inn",
 "people": "Mehmanxanaçılar",
 "cefr": "A2+",
 "story": "Qüllənin yarısında yolçuların dincəldiyi isti, taxta bir mehmanxana var: \"Yuxulu Fənər\". Burada otaq tutmaq, yemək sifariş etmək və nəzakətlə xahiş etmək lazımdır. Amma bu gecə mehmanxanada hər şey qarışıqdır: açar yanlış adamdadır, musiqiçi çox səs-küy salır, aşpazın isə nəyisə çatmır.",
 "words": [
  { "w": "room", "p": "🛏️", "az": "otaq" },
  { "w": "tea", "p": "🍵", "az": "çay" },
  { "w": "soup", "p": "🍲", "az": "şorba" },
  { "w": "guest", "p": "🧳", "az": "qonaq" },
  { "w": "night", "p": "🌃", "az": "gecə" },
  { "w": "free", "p": "🆓", "az": "boş, pulsuz" },
  { "w": "breakfast", "p": "🍳", "az": "səhər yeməyi" },
  { "w": "pay", "p": "💵", "az": "ödəmək" },
  { "w": "noisy", "p": "🔊", "az": "səs-küylü" },
  { "w": "late", "p": "⏰", "az": "gec" },
  { "w": "please", "p": "🙏", "az": "zəhmət olmasa" },
  { "w": "hungry", "p": "🤤", "az": "ac" },
  { "w": "cook", "p": "🧑‍🍳", "az": "aşpaz; bişirmək" },
  { "w": "honey", "p": "🍯", "az": "bal" },
  { "w": "menu", "p": "📋", "az": "menyu" },
  { "w": "bill", "p": "🧾", "az": "hesab" }
 ],
 "forms": {
  "rooms": "room",
  "soups": "soup",
  "guests": "guest",
  "nights": "night",
  "paid": "pay",
  "pays": "pay",
  "cooks": "cook",
  "cooking": "cook",
  "cooked": "cook",
  "later": "late"
 },
 "spots": [
  { "id": "host", "npc": "Marta, the innkeeper", "idle": [
   "Welcome to the Sleepy Lantern! Tea, soup, a warm bed. What more do you need?",
   "Sorry, I'm very busy tonight. Every room is full, nearly.",
   "The keys hang on the board behind me. Each room has a number."
  ] },
  { "id": "cook", "npc": "Bako, the cook", "idle": [
   "I cook for thirty guests every night. Thirty!",
   "Don't touch the pot, please. It's hot.",
   "Soup is two coins. With bread, three coins."
  ] },
  { "id": "girl", "npc": "Lili", "idle": [
   "I help my mother. I carry tea, I clean rooms, I bring wood for the fire.",
   "I'm not tired. Well... a little.",
   "Do you want some tea? We have black tea and mint tea."
  ] },
  { "id": "guest", "npc": "Oskar, a guest", "idle": [
   "I'm a merchant. I sell carpets. Big ones.",
   "I need sleep. Just eight hours of sleep. Is that too much?",
   "Shh. Listen. Can you hear that music?"
  ] },
  { "id": "bard", "npc": "Pip, the musician", "idle": [
   "La la laaa! Do you know this song? Everybody knows this song!",
   "A song for a coin, two songs for a bowl of soup.",
   "My lute is old, but it's very loud."
  ] },
  { "id": "shelf", "label": "TEA · HONEY · CUPS" },
  { "id": "pot", "label": "SOUP OF THE DAY" },
  { "id": "menu", "label": "MENU · SOUP 2 COINS · TEA 1 COIN · BREAKFAST 7–9, FREE FOR GUESTS" },
  { "id": "keys", "label": "ROOM KEYS · 1–9" },
  { "id": "stairs", "exit": true, "locked": "These stairs are for guests only. Please ask at the desk." }
 ],
 "tasks": [
  {
   "npc": "host", "type": "talk",
   "hint": "Mehmanxanaçı qadın səni gözləyir. Otaq lazımdır.",
   "say": ["Hello and welcome to the Sleepy Lantern!", "Oh, you look tired. Come in, come in."],
   "turns": [
    {
     "q": ["How can I help you?"],
     "opts": ["Good evening. I'd like a room for tonight, please.", "Give me a room. Now.", "Good evening. I'd like to sell a room, please."],
     "a": 0, "speak": true,
     "wrong": "Hmm. Nobody sells rooms here, and we always say please at the Sleepy Lantern.",
     "then": "Of course! Let me look at my book."
    },
    {
     "q": ["Just for one night, or longer?"],
     "opts": ["At one o'clock, please.", "Just for one night, please.", "I'm not hungry, thank you."],
     "a": 1,
     "wrong": "Sorry? I asked how many nights you want to stay."
    },
    {
     "q": ["Good. Room seven is free. It's twelve coins a night, and breakfast is free for our guests."],
     "opts": ["Twelve coins? That's free!", "No, thank you. I don't eat in the morning, so I don't pay.", "That's fine. Can I pay in the morning?"],
     "a": 2,
     "wrong": "Oh, no, no. The room is twelve coins. Only the breakfast is free.",
     "then": "Yes, of course. You can pay the bill when you leave."
    },
    {
     "q": ["Now, the key for room seven... Where is it? It isn't on the board!", "Oh no. I think I gave it to the guest at the table. Oskar. He has two keys now.", "Could you speak to him, please? I'm so busy tonight."],
     "opts": ["Sure. I'll ask him for the key.", "No. You speak to him.", "Sure. I'll take his key and his room."],
     "a": 0,
     "wrong": "Please, be kind. Just ask him for the key, nothing more."
    }
   ],
   "done": "Thank you! He's the man at the table with the big hat."
  },
  {
   "npc": "guest", "type": "talk",
   "hint": "Masa arxasındakı qonaqla danış. Açar ondadır.",
   "say": ["Hm? Who are you?"],
   "turns": [
    {
     "q": ["Do you want something from me?"],
     "opts": ["Give me that key!", "Excuse me. Could I have the key for room seven, please?", "Excuse me. Could I have your soup, please?"],
     "a": 1, "speak": true,
     "wrong": "Excuse me? That is not a nice way to ask."
    },
    {
     "q": ["Room seven? Yes, I have it. But my room is room three, and it's next to the music.", "That musician plays every night until late. Midnight! One o'clock! It's so noisy!", "Room seven is quiet. I want room seven."],
     "opts": ["That sounds terrible. Did you speak to the musician?", "Good. I love noisy rooms.", "Then go to bed late, like the musician."],
     "a": 0,
     "wrong": "Very funny. I need sleep, not jokes."
    },
    {
     "q": ["Speak to him? He never listens to me. I'm just a tired old guest.", "Maybe he listens to you. If the music stops at ten o'clock, you can have the key."],
     "opts": ["Then I'll sleep in your room, thank you.", "I'm sorry, I can't hear you. The music is too noisy.", "All right. I'll talk to the musician."],
     "a": 2,
     "wrong": "No, no. Please, just talk to that musician."
    }
   ],
   "done": "Thank you. He's on the little stage. You can't miss him. You can hear him!"
  },
  {
   "npc": "bard", "type": "talk",
   "hint": "Musiqiçini tap. Nəzakətlə xahiş et.",
   "say": ["La la laaa! Ah, a new face! Welcome, welcome!"],
   "turns": [
    {
     "q": ["Would you like a song? I know a hundred songs!"],
     "opts": ["No. Stop that noise.", "Maybe later, thank you. Can I ask you something?", "Yes, please. Play until two o'clock!"],
     "a": 1,
     "wrong": "Oh! That's not very kind. Or very helpful.",
     "then": "Of course. Ask me anything!"
    },
    {
     "q": ["What is it?"],
     "opts": ["Could you play more quietly at night, please? The guests can't sleep.", "Could you play louder, please? I can't hear you.", "Why is your soup cold?"],
     "a": 0, "speak": true,
     "wrong": "Hmm? I don't understand. What's the problem?"
    },
    {
     "q": ["Quietly? But I'm hungry! The cook didn't give me dinner tonight.", "When I'm hungry, I play loudly. It helps me forget my stomach."],
     "opts": ["I'm not hungry either, thank you.", "I see. I'll get you some dinner from the cook.", "Then sell your lute and buy some soup."],
     "a": 1,
     "wrong": "Hmm, no. I just need some dinner, my friend."
    }
   ],
   "done": "Wonderful! Bring me a bowl of hot soup, and I'll play as quietly as a mouse."
  },
  {
   "npc": "cook", "type": "listen",
   "hint": "Aşpazın yanına get. Diqqətlə dinlə.",
   "say": [
    "Dinner for the musician? Ha! Dinner is late tonight. Everything is late tonight!",
    "Usually I serve dinner at seven o'clock. Now it's nine, and the soup isn't ready.",
    "Listen. First I cook onions and carrots. Then I add water and potatoes, and I wait half an hour.",
    "At the end, I put in one big spoon of honey. That's my secret. Nobody knows. Well, now you know.",
    "But the honey jar was empty, so I sent Lili, the innkeeper's daughter, to the cellar for more honey.",
    "That was an hour ago! Where is that girl? Without honey, there's no soup."
   ],
   "qs": [
    { "q": "What time does the cook usually serve dinner?", "az": "Adətən", "opts": ["At seven o'clock", "At nine o'clock", "At ten o'clock"], "a": 0 },
    { "q": "What does the cook put in the soup at the end?", "az": "Sonda", "opts": ["Carrots", "Honey", "Water", "Tea"], "a": 1 },
    { "q": "Why isn't the soup ready?", "az": "Niyə?", "opts": ["The cook is tired.", "The pot is broken.", "There is no honey in the kitchen."], "a": 2 },
    { "q": "Who went to get the honey?", "az": "Kim getdi?", "opts": ["The musician", "The innkeeper's daughter", "The guest at the table"], "a": 1 }
   ],
   "done": "Yes, Lili. Please find her for me. She's usually by the fire."
  },
  {
   "npc": "girl", "type": "fetch",
   "hint": "Lilini tap. O, ocağın yanındadır.",
   "say": [
    "Honey? Oh no! I brought the honey from the cellar an hour ago.",
    "But then a guest asked for tea, and I made tea, and then another guest wanted tea...",
    "I put the honey jar next to the tea. I'm sorry! Can you take it to the cook, please?"
   ],
   "target": "shelf",
   "doHint": "Lili balı harada qoyub? Onun sözlərini xatırla.",
   "flag": "gotHoney",
   "done": "Yes, that's it! The honey jar next to the tea cups. Thank you!"
  },
  {
   "npc": "cook", "type": "build",
   "hint": "Balı aşpaza apar və musiqiçi üçün yemək istə.",
   "say": ["My honey! You found it! One big spoon... and... perfect. The soup is ready.", "Now, what can I get you?"],
   "answer": "Could I have a bowl of soup for the musician please",
   "extra": ["pay", "tea", "noisy", "bill", "give"],
   "done": "Here you are. Hot soup with honey. Be careful, it's very hot!"
  },
  {
   "npc": "bard", "type": "choice",
   "hint": "Şorbanı musiqiçiyə apar.",
   "say": ["Is that for me? Soup with honey! Oh, you're my best friend.", "Mmm. So, tell me. Until what time can I play tonight?"],
   "opts": ["You can play all night. Nobody is sleeping.", "Please never play again. Never.", "You can play until ten o'clock. After that, please play quietly."],
   "a": 2,
   "flagAfter": "fed",
   "done": "Ten o'clock. It's a deal! And after ten, only quiet songs. Sleepy songs."
  },
  {
   "npc": "guest", "type": "fetch",
   "hint": "Qonağa xəbəri çatdır.",
   "say": [
    "Is it true? The music stops at ten? Oh, thank you!",
    "I can go back to room three. I'm sorry about the key.",
    "I put it back on the board, behind the innkeeper. It's the key with the number seven. Take it, please."
   ],
   "target": "keys",
   "doHint": "Açar haradadır? Qonaq dedi: mehmanxanaçının arxasında.",
   "flag": "tookKey",
   "done": "That's the one. Good night, and sleep well!"
  },
  {
   "npc": "host", "type": "listen",
   "hint": "Açarı mehmanxanaçıya göstər. O, qaydaları danışacaq.",
   "say": [
    "You have the key! Wonderful. Now listen, please. Here are the rules of the house.",
    "Your room is upstairs, on the second floor, at the end of the corridor, next to the big window.",
    "Breakfast is in this hall from seven to nine. After nine o'clock, no breakfast. The cook is very strict.",
    "Please be quiet after ten. Our guests are tired travelers.",
    "The front door closes at midnight. If you come back late, knock three times.",
    "And in the morning, before you leave, you pay the bill here at the desk."
   ],
   "qs": [
    { "q": "Where is your room?", "az": "Otaq harada?", "opts": ["Next to the kitchen", "At the end of the corridor, next to the window", "Next to the music room"], "a": 1 },
    { "q": "Can you have breakfast at half past nine?", "az": "Saat 9:30-da?", "opts": ["Yes, breakfast is until ten.", "No, breakfast finishes at nine.", "Yes, but you pay for it."], "a": 1 },
    { "q": "What do you do if you come back after midnight?", "az": "Gecə yarısından sonra", "opts": ["Knock three times", "Ring a bell", "Wait until the morning"], "a": 0 },
    { "q": "When and where do you pay the bill?", "az": "Nə vaxt və harada?", "opts": ["Now, in the kitchen", "In the morning, at the desk", "At night, in your room"], "a": 1 }
   ],
   "done": "Perfect. Good night! Sleep well."
  },
  {
   "npc": "girl", "type": "talk",
   "hint": "Səhər açıldı. Lili səhər yeməyi verir.",
   "say": ["Good morning! It's eight o'clock. Did you sleep well?"],
   "turns": [
    {
     "q": ["The musician was very quiet last night. Everyone is happy today!"],
     "opts": ["Yes, very well, thank you. It was so quiet.", "No. I slept in the kitchen.", "Yes, the music was very noisy, thank you."],
     "a": 0,
     "wrong": "Really? Hmm, everyone else says it was quiet."
    },
    {
     "q": ["Here's the menu. For breakfast we have eggs, bread with honey, or porridge. To drink, tea or milk."],
     "opts": ["I'd like fish and a glass of wine, please.", "I'd like eggs and a cup of tea, please.", "I'd like the soup of the day and the bill."],
     "a": 1, "speak": true,
     "wrong": "Sorry, that isn't on the breakfast menu. Look again."
    },
    {
     "q": ["Black tea or tea with milk?"],
     "opts": ["Yes.", "With milk, please. And no sugar.", "Cold, please, with ice."],
     "a": 1,
     "wrong": "Hmm? Black tea or tea with milk? Choose one, please."
    },
    {
     "q": ["Anything else? Bread with honey? It's the cook's honey!"],
     "opts": ["No, thank you. That's all.", "Bring me everything.", "Yes, the honey jar, please. All of it."],
     "a": 0,
     "wrong": "Ha ha. Sorry, we need that honey for the soup tonight."
    }
   ],
   "done": "Eggs and tea with milk, coming right up!"
  },
  {
   "npc": "host", "type": "choice",
   "hint": "Ayrılmaq vaxtıdır. Hesabı ödə.",
   "say": [
    "Good morning! Here's your bill.",
    "Room seven, one night: twelve coins. Breakfast: free. The soup for the musician: two coins.",
    "So, how much do you pay?"
   ],
   "opts": ["Twelve coins", "Fourteen coins", "Sixteen coins"],
   "a": 1,
   "done": "Fourteen coins. Thank you very much!"
  },
  {
   "npc": "host", "type": "build",
   "hint": "Qonaq kitabına bir cümlə yaz.",
   "say": ["Before you go, please write a line in our guest book.", "What did you like at the Sleepy Lantern?"],
   "answer": "The room was quiet and the soup was delicious",
   "extra": ["noisy", "cold", "late", "hungry"],
   "done": "How kind! Come back any time. The stairs on the right go up the tower. Now they're open for you!"
  }
 ]
};
