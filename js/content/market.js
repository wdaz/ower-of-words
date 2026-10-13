// (The Market): story, words and tasks. Spot ids must match js/floors/market.js.
export default {
 "name": "The Market",
 "people": "Tacirlər",
 "cefr": "A2+",
 "story": "Darvazanın arxasında səs-küylü bir bazar var. Tacirlər qışqırır, qiymətlər divarlara yazılıb. Pilləkənə yalnız alıcılar buraxılır. Kiçik Lila anasının siyahısı ilə bazara gəlib, amma oxuya bilmir: ona kömək et.",
 "words": [
  { "w": "buy", "p": "🛒", "az": "almaq" },
  { "w": "sell", "p": "🏷️", "az": "satmaq" },
  { "w": "fruit", "p": "🍎", "az": "meyvə" },
  { "w": "fish", "p": "🐟", "az": "balıq" },
  { "w": "cheap", "p": "🪙", "az": "ucuz" },
  { "w": "expensive", "p": "💰", "az": "bahalı" },
  { "w": "need", "p": "❗", "az": "ehtiyac duymaq" },
  { "w": "coins", "p": "⚪", "az": "sikkələr" },
  { "w": "honey", "p": "🍯", "az": "bal" },
  { "w": "basket", "p": "🧺", "az": "səbət" },
  { "w": "list", "p": "📝", "az": "siyahı" },
  { "w": "price", "p": "💲", "az": "qiymət" },
  { "w": "pay", "p": "💵", "az": "ödəmək" },
  { "w": "purse", "p": "👛", "az": "pul kisəsi" },
  { "w": "free", "p": "🎁", "az": "pulsuz" },
  { "w": "cake", "p": "🎂", "az": "tort" }
 ],
 "forms": {
  "sells": "sell", "selling": "sell", "sold": "sell",
  "buys": "buy", "buying": "buy", "bought": "buy", "buyer": "buy", "buyers": "buy",
  "needs": "need", "needed": "need",
  "coin": "coins",
  "fruits": "fruit",
  "prices": "price",
  "pays": "pay", "paid": "pay", "paying": "pay",
  "baskets": "basket",
  "lists": "list",
  "purses": "purse",
  "cakes": "cake"
 },
 "spots": [
  {
   "id": "master",
   "npc": "Market master",
   "idle": [
    "Only buyers can go up these stairs.",
    "Read the price on the wall before you pay.",
    "The market closes at six. Be quick!"
   ]
  },
  {
   "id": "child",
   "npc": "Lila",
   "idle": [
    "My mother needs fruit, fish and honey.",
    "I have a list, but I can't read it.",
    "Ten coins is a lot of money, I think!"
   ]
  },
  {
   "id": "fseller",
   "npc": "Fruit seller",
   "idle": [
    "Fruit! Cheap fruit! Apples, pears, oranges!",
    "Apples are two coins each. Pears are three.",
    "My oranges are sweet, but today they are expensive."
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
    "Fish! Fresh fish! Caught this morning!",
    "My fish is not cheap, but it is fresh.",
    "Why is everybody afraid of me? I just talk loudly!"
   ]
  },
  {
   "id": "fish",
   "label": "FISH · 5 COINS"
  },
  {
   "id": "purse",
   "label": "A PINK PURSE"
  },
  {
   "id": "jeweler",
   "npc": "Jeweler",
   "idle": [
    "This ring is very expensive. One hundred coins.",
    "Only rich people buy here.",
    "Don't touch the ring, please. Just look."
   ]
  },
  {
   "id": "ring",
   "label": "RING · 100 COINS"
  },
  {
   "id": "honey",
   "npc": "Honey seller",
   "idle": [
    "Honey from my own bees! Small pots and big pots.",
    "A small pot is three coins. A big pot is six.",
    "Honey is good for cakes and for colds."
   ]
  },
  {
   "id": "jars",
   "label": "HONEY · SMALL 3 · BIG 6"
  },
  {
   "id": "stairs",
   "exit": true,
   "locked": "The stairs are closed. Only buyers can go up."
  }
 ],
 "tasks": [
  {
   "npc": "master",
   "type": "talk",
   "hint": "Pilləkənin yanındakı adamla danış.",
   "say": [
    "Welcome to the market, traveler!",
    "I am the market master. I watch the stairs and the prices."
   ],
   "turns": [
    {
     "q": ["So, what would you like to do here?"],
     "opts": [
      "I would like to go up the stairs, please.",
      "Open the stairs. Now.",
      "I would like to sell the stairs."
     ],
     "a": 0,
     "wrong": "Hm. In this market we say please, and we don't sell the stairs.",
     "speak": true
    },
    {
     "q": ["Sorry, the stairs are only for buyers.", "Did you buy anything today?"],
     "opts": [
      "No, I didn't. I don't have any coins.",
      "Yes, I bought the market.",
      "No, I don't need anything."
     ],
     "a": 0,
     "wrong": "Then you are not a buyer, friend. Think again."
    },
    {
     "q": ["No coins? Hmm. Look at the girl over there. That's Lila.", "She has coins and a shopping list, but she can't read.", "How can you help her?"],
     "opts": [
      "I can read her list and buy things for her.",
      "I can take her coins.",
      "I can sell her a fish."
     ],
     "a": 0,
     "wrong": "Take her coins? No, no! That is a thief's idea.",
     "then": "Good. Help her, and you can be a buyer too."
    }
   ],
   "done": "Go and talk to Lila. She is by the baskets."
  },
  {
   "npc": "child",
   "type": "listen",
   "hint": "Lila nə almalıdır? Diqqətlə dinlə.",
   "say": [
    "Hello! The market master sent you? Great!",
    "My mother gave me ten coins and this list.",
    "She would like two apples for my little brother.",
    "Then one fish, for dinner tonight.",
    "And a small pot of honey, because Grandma is making a cake.",
    "But I can't read the prices, and the fish man is very loud. I'm a bit scared of him!"
   ],
   "qs": [
    { "q": "How many coins does Lila have?", "az": "neçə sikkə", "opts": ["Ten", "Two", "Five", "One hundred"], "a": 0 },
    { "q": "Who are the apples for?", "az": "almalar kimin üçün", "opts": ["Her little brother", "Her grandma", "Her mother", "The market master"], "a": 0 },
    { "q": "Why does Lila need honey?", "az": "bal nə üçün", "opts": ["Grandma is making a cake.", "Her brother is ill.", "It is for dinner.", "The fish man likes it."], "a": 0 },
    { "q": "Why is Lila scared of the fish seller?", "az": "niyə qorxur", "opts": ["He is very loud.", "His fish is expensive.", "He can't read.", "He has no coins."], "a": 0 }
   ],
   "done": "Here is the list and here are my ten coins. Please help me!"
  },
  {
   "npc": "child",
   "type": "fetch",
   "hint": "Lila ilk növbədə nə istəyir?",
   "say": [
    "First the apples. Apples are fruit, right?",
    "Which stall sells fruit? Show me, please!"
   ],
   "target": "fruit",
   "doHint": "Divardakı yazılara bax.",
   "done": "Yes! That's the fruit stall. Let's buy the apples."
  },
  {
   "npc": "fseller",
   "type": "talk",
   "hint": "Meyvə satıcısından alma al.",
   "say": [
    "Good morning! Fresh fruit, cheap fruit!",
    "Hello, little Lila! Who is your friend?"
   ],
   "turns": [
    {
     "q": ["So, what would you like?"],
     "opts": [
      "I would like two apples, please.",
      "I would like to sell two apples.",
      "Give me all your fruit."
     ],
     "a": 0,
     "wrong": "Sell? No, no! I sell, and you buy.",
     "speak": true
    },
    {
     "q": ["Two apples. The price is two coins each.", "So how much is that?"],
     "opts": [
      "That's four coins.",
      "That's two coins.",
      "That's twenty coins."
     ],
     "a": 0,
     "wrong": "Ha! Two apples, two coins each. Count again, friend.",
     "then": "Right, four coins. Thank you!"
    },
    {
     "q": ["And how will you carry them? Would you like a basket?"],
     "opts": [
      "Yes, please. How much is the basket?",
      "No, I would like the ring.",
      "Yes. Pay me for it."
     ],
     "a": 0,
     "wrong": "The ring? That's not my stall, friend.",
     "then": "For Lila's friend, the basket is free!"
    }
   ],
   "done": "Here are your apples and a free basket. Good luck with the fish man!"
  },
  {
   "npc": "fishman",
   "type": "talk",
   "hint": "Balıqçı ilə danış. Divardakı qiyməti yadda saxla.",
   "say": [
    "FISH! FRESH FISH! Oh, hello there!",
    "You need a fish? Good choice. Today it's seven coins."
   ],
   "turns": [
    {
     "q": ["Seven coins, please. Pay here."],
     "opts": [
      "Excuse me, but the price on the wall is five coins.",
      "Seven? Great, that is very cheap!",
      "No fish for me. Goodbye."
     ],
     "a": 0,
     "wrong": "Hmm, really? Look at the wall first, friend.",
     "speak": true
    },
    {
     "q": ["The wall? Oh! Ha ha! My eyes are bad. You are right, it's five.", "How many fish would you like?"],
     "opts": [
      "Just one, please. It's for dinner.",
      "Five fish, please.",
      "All of them, they are free."
     ],
     "a": 0,
     "wrong": "That's a lot of fish for one little girl!"
    },
    {
     "q": ["One big fish for dinner. Here you are.", "Little girl, why are you hiding? I don't bite!"],
     "opts": [
      "She is a bit scared. You talk very loudly.",
      "She would like to buy your hat.",
      "She is hiding because your fish is expensive."
     ],
     "a": 0,
     "wrong": "No, I think it's something about me...",
     "then": "Oh! Sorry, sorry. I'm quiet now. Very quiet."
    }
   ],
   "done": "Here is your fish, little one. Five coins. Come again!"
  },
  {
   "npc": "child",
   "type": "choice",
   "hint": "Lila pulunu saymaq istəyir.",
   "say": [
    "He is not scary. He is funny!",
    "Now, let's count. We had ten coins.",
    "The apples were four coins and the fish was five.",
    "How many coins do we have now?"
   ],
   "opts": [
    "Only one coin.",
    "Six coins.",
    "Nine coins."
   ],
   "a": 0,
   "done": "Only one coin? Oh no! And we still need honey for the cake."
  },
  {
   "npc": "honey",
   "type": "talk",
   "hint": "Bal satan qadına yaxınlaş.",
   "say": [
    "Hello, dears! Honey from my own bees!",
    "A small pot is three coins, and a big pot is six."
   ],
   "turns": [
    {
     "q": ["What would you like?"],
     "opts": [
      "We would like a small pot, but we only have one coin.",
      "A big pot, please. Here is one coin.",
      "Your honey is too expensive. Give it to us."
     ],
     "a": 0,
     "wrong": "Hm, that is not very polite, dear.",
     "speak": true
    },
    {
     "q": ["One coin? Hmm. Let me think.", "Do you know the jeweler? The man with the expensive ring?"],
     "opts": [
      "Yes, his stall is over there.",
      "No, I don't like rings.",
      "Yes, he sells fish."
     ],
     "a": 0,
     "wrong": "No, no, dear. The jeweler sells rings, not fish."
    },
    {
     "q": ["Every week he buys honey from me.", "Last week he didn't pay. He owes me two coins.", "What can you do?"],
     "opts": [
      "We can ask him for the two coins.",
      "We can buy his ring.",
      "We can sell him our fish."
     ],
     "a": 0,
     "wrong": "With one coin? I don't think so, dear.",
     "then": "Yes! Two coins from him and one from you. Three coins: one small pot."
    }
   ],
   "done": "Go and ask him. Be polite: he is a proud man."
  },
  {
   "npc": "jeweler",
   "type": "listen",
   "hint": "Zərgərdən iki sikkəni soruş.",
   "say": [
    "Two coins for the honey? Yes, yes, I know. I need to pay her.",
    "But I have a problem. I can't find my purse.",
    "This morning I bought a fish for my lunch. I paid five coins.",
    "Then I put my purse on the barrel next to the fish stall, and I picked up my fish.",
    "It's a pink purse, with twelve coins in it.",
    "I can't leave my stall. This ring is very expensive, you see."
   ],
   "qs": [
    { "q": "What did the jeweler buy this morning?", "az": "səhər nə alıb", "opts": ["A fish", "Some honey", "A basket", "Two apples"], "a": 0 },
    { "q": "Where did he put his purse?", "az": "kisəni harada qoyub", "opts": ["On the barrel next to the fish stall", "On the fruit stall", "In his chest", "Under the stairs"], "a": 0 },
    { "q": "What colour is the purse?", "az": "rəngi", "opts": ["Pink", "Red", "Blue", "Yellow"], "a": 0 },
    { "q": "How many coins are in the purse?", "az": "neçə sikkə", "opts": ["Twelve", "Two", "Five", "One hundred"], "a": 0 }
   ],
   "done": "Yes, you listened well. You are a clever one."
  },
  {
   "npc": "jeweler",
   "type": "fetch",
   "hint": "Zərgər yenə nə isə istəyir.",
   "say": [
    "Could you find my purse for me, please?",
    "Remember: pink, next to the fish."
   ],
   "target": "purse",
   "flag": "purse",
   "doHint": "O, kisəni səhər harada qoyub?",
   "done": "My purse! All twelve coins! Here are two coins for the honey. Tell her I'm sorry."
  },
  {
   "npc": "honey",
   "type": "build",
   "hint": "Bal satana qayıt.",
   "say": [
    "You have three coins now? Wonderful!",
    "Tell me again, dear. What would you like?"
   ],
   "answer": "I would like a small pot of honey",
   "extra": ["big", "sell", "expensive", "fish"],
   "done": "Here you are: one small pot. Say hello to Grandma, Lila!"
  },
  {
   "npc": "child",
   "type": "talk",
   "hint": "Lila siyahını yoxlayır.",
   "say": [
    "Let's check the list before I go home!"
   ],
   "turns": [
    {
     "q": ["Two apples for my brother?"],
     "opts": [
      "Yes, they are in the basket.",
      "No, the apples were too expensive.",
      "Yes, and we sold them."
     ],
     "a": 0,
     "wrong": "But I can see the apples. They are right here!"
    },
    {
     "q": ["One fish for dinner?"],
     "opts": [
      "Yes, one big fish for five coins.",
      "No, the fish seller was too loud.",
      "Yes, we bought seven fish."
     ],
     "a": 0,
     "wrong": "Hmm, no. I remember: one fish, five coins."
    },
    {
     "q": ["And honey for Grandma's cake?", "Oh, wait. Who paid for the honey?"],
     "opts": [
      "You paid one coin, and the jeweler paid two.",
      "The fish seller paid for it.",
      "Nobody. The honey was free."
     ],
     "a": 0,
     "wrong": "No, that's not right. Think again!",
     "then": "The jeweler? Ha! Do you know, he is my grandpa! The cake is for his birthday."
    }
   ],
   "done": "Thank you, friend! Go and see the market master now."
  },
  {
   "npc": "master",
   "type": "build",
   "hint": "Bazar rəisinə nə etdiyini de.",
   "say": [
    "Back again! Lila is smiling, so I think you did something good.",
    "Tell me, are you a buyer now?"
   ],
   "answer": "I bought everything on Lila's list",
   "extra": ["sold", "need", "expensive", "ring"],
   "done": "Everything on the list, and no coins wasted! You are a real buyer. The stairs are open!"
  }
 ]
};
