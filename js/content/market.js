// (The Market): story, words and tasks. Spot ids must match js/floors/market.js.
export default {
 "name": "The Market",
 "people": "Tacirlər",
 "cefr": "B1-B2",
 "story": "Darvazanın arxasında səs-küylü bir bazar var. Tacirlər qışqırır, qiymətlər divarlara yazılıb. Pilləkənə yalnız alıcılar buraxılır. Kiçik Lila anasının siyahısı ilə bazara gəlib, amma oxuya bilmir: ona kömək et.",
 "words": [
  { "w": "customer", "p": "🛍️", "az": "müştəri" },
  { "w": "stall", "p": "🏪", "az": "bazar piştaxtası, köşk" },
  { "w": "bargain", "p": "🤝", "az": "sərfəli alış, ucuz tapıntı" },
  { "w": "afford", "p": "💸", "az": "(pulu) çatmaq, imkanı olmaq" },
  { "w": "discount", "p": "🏷️", "az": "endirim" },
  { "w": "receipt", "p": "🧾", "az": "qəbz" },
  { "w": "weigh", "p": "⚖️", "az": "çəkmək (tərəzidə)" },
  { "w": "ripe", "p": "🍑", "az": "yetişmiş" },
  { "w": "owe", "p": "📒", "az": "borclu olmaq" },
  { "w": "honest", "p": "😇", "az": "dürüst, namuslu" },
  { "w": "cheat", "p": "🤥", "az": "aldatmaq" },
  { "w": "steal", "p": "🦹", "az": "oğurlamaq" },
  { "w": "generous", "p": "🎁", "az": "səxavətli, əliaçıq" },
  { "w": "total", "p": "🧮", "az": "cəmi, ümumi məbləğ" },
  { "w": "jewellery", "p": "💍", "az": "zinət əşyaları" },
  { "w": "barrel", "p": "🛢️", "az": "çəllək" }
 ],
 "forms": {
  "customers": "customer",
  "stalls": "stall",
  "bargains": "bargain",
  "discounts": "discount",
  "receipts": "receipt",
  "weighs": "weigh", "weighed": "weigh", "weighing": "weigh",
  "owes": "owe", "owed": "owe",
  "cheated": "cheat", "cheating": "cheat", "cheats": "cheat",
  "stole": "steal", "stolen": "steal", "steals": "steal",
  "barrels": "barrel"
 },
 "spots": [
  {
   "id": "master",
   "npc": "Market master",
   "idle": [
    "Only customers can go up these stairs.",
    "Read the price on the wall before you pay. Not every seller is honest.",
    "If somebody tries to cheat you, come and tell me."
   ]
  },
  {
   "id": "child",
   "npc": "Lila",
   "idle": [
    "My mum needs ripe apples, a fish and some honey.",
    "I have a list, but I can't read it yet.",
    "Ten coins in total. That's a lot of money, I think!"
   ]
  },
  {
   "id": "fseller",
   "npc": "Fruit seller",
   "idle": [
    "Fruit! Ripe fruit! Apples, pears, oranges!",
    "Apples are two coins each. Buy ten and I'll give you a discount!",
    "My oranges are lovely, but most people can't afford them today."
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
    "I weigh every fish twice. Well... usually.",
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
   "npc": "Jeweller",
   "idle": [
    "This ring is real gold. One hundred coins. Not exactly a bargain.",
    "Only rich customers buy my jewellery.",
    "Please don't touch the jewellery. Just look."
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
    "Honey from my own bees! Small jars and big jars.",
    "A small jar is three coins. A big jar is six.",
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
   "locked": "The stairs are closed. Only customers can go up."
  }
 ],
 "tasks": [
  {
   "npc": "master",
   "type": "talk",
   "hint": "Pilləkənin yanındakı adamla danış.",
   "say": [
    "Welcome to the market, traveller!",
    "I'm the market master. I keep an eye on the stairs, the stalls and the prices."
   ],
   "turns": [
    {
     "q": ["So, what would you like to do here?"],
     "opts": [
      "I'd like to go up the stairs, please.",
      "Open the stairs. Now.",
      "I'd like to sell the stairs."
     ],
     "a": 0,
     "wrong": "Hm. In this market we say please, and we certainly don't sell the stairs.",
     "speak": true
    },
    {
     "q": ["I'm afraid the stairs are only for customers.", "Have you bought anything today?"],
     "opts": [
      "No, I haven't. I can't afford anything, I have no coins.",
      "Yes, I've bought the whole market.",
      "No, and I'm not going to buy anything."
     ],
     "a": 0,
     "wrong": "Then you're not a customer, friend. Think again."
    },
    {
     "q": ["No coins? Hmm. See the little girl near the barrel? That's Lila.", "She has coins and a shopping list, but she can't read yet.", "How could you help her?"],
     "opts": [
      "I could read her list and do the shopping for her.",
      "I could take her coins.",
      "I could sell her a fish."
     ],
     "a": 0,
     "wrong": "Take her coins? That's how thieves think. Nobody steals in my market!",
     "then": "Good. Help her, and you'll be a customer too. But be careful: some sellers here like to cheat."
    }
   ],
   "done": "Off you go. Lila is waiting for you."
  },
  {
   "npc": "child",
   "type": "listen",
   "hint": "Lila nə almalıdır? Diqqətlə dinlə.",
   "say": [
    "Hello! Did the market master send you? Great!",
    "My mum gave me ten coins and this list. I can't spend more than ten in total.",
    "She'd like two ripe apples for my little brother. Not green ones, he hates them!",
    "Then one fish for dinner tonight.",
    "And a small jar of honey, because Grandma is baking a birthday cake.",
    "But I can't read the prices, and the fish man shouts so much. Mum says he sometimes tries to cheat little customers!"
   ],
   "qs": [
    { "q": "How many coins can Lila spend in total?", "az": "cəmi neçə sikkə", "opts": ["Ten", "Two", "Five", "One hundred"], "a": 0 },
    { "q": "What kind of apples does her brother like?", "az": "hansı almalar", "opts": ["Ripe ones", "Green ones", "Very big ones", "Any apples"], "a": 0 },
    { "q": "Why does Lila need honey?", "az": "bal nə üçün", "opts": ["Grandma is baking a cake.", "Her brother is ill.", "It is for dinner.", "The fish man likes it."], "a": 0 },
    { "q": "What does Lila's mum say about the fish seller?", "az": "anası nə deyir", "opts": ["He sometimes tries to cheat children.", "His fish is always cheap.", "He can't read.", "He is her uncle."], "a": 0 }
   ],
   "done": "Here's the list and here are my ten coins. Please help me!"
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
   "done": "Yes! That's the fruit stall. Let's see if the apples are ripe."
  },
  {
   "npc": "fseller",
   "type": "talk",
   "hint": "Meyvə satıcısından alma al.",
   "say": [
    "Good morning! Ripe fruit, real bargains, the cheapest stall in the market!",
    "Hello, little Lila! Who's your friend?"
   ],
   "turns": [
    {
     "q": ["So, what can I get you?"],
     "opts": [
      "Two ripe apples, please.",
      "I'd like to sell you two apples.",
      "Give me all your fruit."
     ],
     "a": 0,
     "wrong": "Sell? No, no! I'm the seller, you're the customer.",
     "speak": true
    },
    {
     "q": ["Two apples. Let me weigh them... Two coins each.", "So how much is that in total?"],
     "opts": [
      "That's four coins in total.",
      "That's two coins.",
      "That's twenty coins."
     ],
     "a": 0,
     "wrong": "Ha! Two apples, two coins each. Count again, friend.",
     "then": "Right, four coins. You count better than I do!"
    },
    {
     "q": ["And how will you carry them? Would you like a basket?"],
     "opts": [
      "Yes, please. How much is it? We can't afford much.",
      "No, thanks. I'd like some jewellery instead.",
      "Yes. And you pay me for it."
     ],
     "a": 0,
     "wrong": "Jewellery? That's not my stall, friend. Try the jeweller.",
     "then": "For Lila's friend, the basket is free! I'm a generous man."
    }
   ],
   "done": "Here are your apples, a free basket and your receipt. Good luck with the fish man!"
  },
  {
   "npc": "fishman",
   "type": "talk",
   "hint": "Balıqçı ilə danış. Divardakı qiyməti yadda saxla.",
   "say": [
    "FISH! FRESH FISH! Oh, hello there, customers!",
    "You need a fish? Let me weigh this one... Seven coins today."
   ],
   "turns": [
    {
     "q": ["Seven coins, please. Pay here."],
     "opts": [
      "Excuse me, but the price on the wall is five coins.",
      "Seven? What a bargain!",
      "No fish for me. Goodbye."
     ],
     "a": 0,
     "wrong": "A bargain? Hmm... maybe look at the wall first, friend.",
     "speak": true
    },
    {
     "q": ["The wall? Oh! Ha ha! My eyes are bad. You're right, it's five.", "I'm an honest man, I promise! I wasn't trying to cheat you.", "Five coins for a fish like this is a real bargain. How many would you like?"],
     "opts": [
      "Just one, please. It's for dinner.",
      "Five fish, please.",
      "All of them. You said it's a bargain."
     ],
     "a": 0,
     "wrong": "That's a lot of fish for one little girl!"
    },
    {
     "q": ["One big fish for dinner. Here you are, and here's your receipt.", "Little girl, why are you hiding behind that barrel? I don't bite!"],
     "opts": [
      "She's a bit scared. You shout very loudly.",
      "She'd like to buy your hat.",
      "She thinks your fish is too expensive."
     ],
     "a": 0,
     "wrong": "No, I think it's something about me...",
     "then": "Oh! Sorry, sorry. I'm quiet now. Very quiet."
    }
   ],
   "done": "Five coins. An honest price for an honest fish. Come again!"
  },
  {
   "npc": "child",
   "type": "choice",
   "hint": "Lila pulunu saymaq istəyir.",
   "say": [
    "He isn't scary. He's funny!",
    "Now let's count. We had ten coins in total.",
    "The apples were four coins and the fish was five.",
    "How many coins have we got left?"
   ],
   "opts": [
    "Only one coin.",
    "Six coins.",
    "Nine coins."
   ],
   "a": 0,
   "done": "Only one coin? Oh no! We can't afford the honey for the cake."
  },
  {
   "npc": "honey",
   "type": "talk",
   "hint": "Bal satan qadına yaxınlaş.",
   "say": [
    "Hello, dears! Honey from my own bees!",
    "A small jar is three coins, and a big jar is six. No discounts, I'm afraid."
   ],
   "turns": [
    {
     "q": ["What would you like?"],
     "opts": [
      "We'd like a small jar, but we've only got one coin.",
      "A big jar, please. Here's one coin.",
      "Your honey is too expensive. Just give it to us."
     ],
     "a": 0,
     "wrong": "Hm, that isn't very polite, dear.",
     "speak": true
    },
    {
     "q": ["One coin? Hmm. Let me think.", "Do you know the jeweller? The man who sells jewellery at the purple stall?"],
     "opts": [
      "Yes, his stall is over there.",
      "No, I don't like jewellery.",
      "Yes, he sells fish."
     ],
     "a": 0,
     "wrong": "No, no, dear. The jeweller sells rings, not fish."
    },
    {
     "q": ["Every week he buys honey from me.", "Last week he forgot to pay. He owes me two coins.", "What could you do?"],
     "opts": [
      "We could ask him for the two coins he owes you.",
      "We could buy his ring with our coin.",
      "We could sell him our fish."
     ],
     "a": 0,
     "wrong": "With one coin? I don't think so, dear.",
     "then": "Yes! Two coins from him and one from you. That's three in total: one small jar."
    }
   ],
   "done": "Go and ask him. Be polite: he's a proud man."
  },
  {
   "npc": "jeweler",
   "type": "listen",
   "hint": "Zərgərdən iki sikkəni soruş.",
   "say": [
    "Two coins for the honey? Yes, yes, I know I owe her. I'm an honest man.",
    "But I have a problem. I can't find my purse. Maybe somebody stole it!",
    "This morning I bought a fish for my lunch. I paid five coins. Look, here's the receipt.",
    "Then I put my purse down on the barrel next to the fish stall, and I picked up my fish.",
    "It's a pink purse with twelve coins in it.",
    "I can't leave my stall. All this jewellery is very expensive, you see."
   ],
   "qs": [
    { "q": "What did the jeweller buy this morning?", "az": "səhər nə alıb", "opts": ["A fish", "Some honey", "A basket", "Two apples"], "a": 0 },
    { "q": "Where did he put his purse down?", "az": "kisəni harada qoyub", "opts": ["On the barrel next to the fish stall", "On the fruit stall", "In his jewellery box", "Under the stairs"], "a": 0 },
    { "q": "What colour is the purse?", "az": "rəngi", "opts": ["Pink", "Red", "Blue", "Yellow"], "a": 0 },
    { "q": "How many coins are in the purse?", "az": "neçə sikkə", "opts": ["Twelve", "Two", "Five", "One hundred"], "a": 0 }
   ],
   "done": "Yes, you listened well. You're a clever one."
  },
  {
   "npc": "jeweler",
   "type": "fetch",
   "hint": "Zərgər yenə nə isə istəyir.",
   "say": [
    "Could you look for my purse, please?",
    "Remember: pink, on the barrel next to the fish."
   ],
   "target": "purse",
   "flag": "purse",
   "doHint": "O, kisəni səhər harada qoyub?",
   "done": "My purse! All twelve coins! So nobody stole it after all. Here are the two coins I owe. Tell her I'm sorry."
  },
  {
   "npc": "honey",
   "type": "build",
   "hint": "Bal satana qayıt.",
   "say": [
    "He paid what he owes? Finally! So you've got three coins now? Wonderful!",
    "Tell me again, dear. What would you like?"
   ],
   "answer": "We would like a small jar of honey",
   "extra": ["big", "discount", "expensive", "fish"],
   "done": "Here you are: one small jar. And next time, a little discount for you. I'm feeling generous!"
  },
  {
   "npc": "child",
   "type": "talk",
   "hint": "Lila siyahını yoxlayır.",
   "say": [
    "Let's check the list and the receipts before I go home!"
   ],
   "turns": [
    {
     "q": ["Two ripe apples for my brother?"],
     "opts": [
      "Yes, they're in the basket. Four coins.",
      "No, they weren't ripe, so we didn't buy them.",
      "Yes, and then we sold them."
     ],
     "a": 0,
     "wrong": "But I can see the apples. They're right here!"
    },
    {
     "q": ["One fish for dinner?"],
     "opts": [
      "Yes, one big fish. The receipt says five coins.",
      "No, the fish seller tried to cheat us, so we left.",
      "Yes, we bought seven fish."
     ],
     "a": 0,
     "wrong": "Hmm, no. I remember: one fish, five coins."
    },
    {
     "q": ["And honey for Grandma's cake?", "Wait. Who paid for the honey?"],
     "opts": [
      "You paid one coin, and the jeweller paid the two he owed.",
      "The fish seller paid for it.",
      "Nobody. The honey was free."
     ],
     "a": 0,
     "wrong": "No, that's not right. Think again!",
     "then": "The jeweller? Ha! Do you know, he's my grandpa! The cake is for his birthday. He's so generous with everyone, but he always forgets to pay."
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
    "So, are you a customer now? Can you prove it?"
   ],
   "answer": "Here are the receipts for everything we bought",
   "extra": ["sold", "stole", "cheap", "ring"],
   "done": "Every coin spent, nobody cheated and a receipt for everything! You're a real customer now. The stairs are open!"
  }
 ]
};
