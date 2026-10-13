// (The Garden): story, words and tasks. Spot ids must match js/floors/garden.js.
export default {
 "name": "The Garden",
 "people": "Şəfaçılar",
 "cefr": "B1",
 "story": "Qüllənin yuxarısında, buludların üstündə asma bağ var: dərman otları, gölməçə və şüşə istixana. Burada şəfaçılar yaşayır. Kiçik Mila xəstələnib, anası çox narahatdır, qoca şəfaçı isə yaxşı eşitmir. Kömək et: dinlə, məsləhət ver və Milanın əslində niyə xəstə olduğunu öyrən.",
 "words": [
  { "w": "herb", "p": "🌿", "az": "dərman otu" },
  { "w": "flower", "p": "🌸", "az": "çiçək" },
  { "w": "bee", "p": "🐝", "az": "arı" },
  { "w": "honey", "p": "🍯", "az": "bal" },
  { "w": "lemon", "p": "🍋", "az": "limon" },
  { "w": "fever", "p": "🤒", "az": "qızdırma" },
  { "w": "headache", "p": "🤕", "az": "baş ağrısı" },
  { "w": "sick", "p": "🤢", "az": "xəstə; ürəyi bulanan" },
  { "w": "medicine", "p": "💊", "az": "dərman" },
  { "w": "rest", "p": "🛌", "az": "dincəlmək" },
  { "w": "sleep", "p": "😴", "az": "yatmaq" },
  { "w": "heal", "p": "❤️‍🩹", "az": "sağaltmaq, sağalmaq" },
  { "w": "worried", "p": "😟", "az": "narahat" },
  { "w": "scared", "p": "😨", "az": "qorxmuş" },
  { "w": "cry", "p": "😢", "az": "ağlamaq" },
  { "w": "healthy", "p": "💪", "az": "sağlam" }
 ],
 "forms": {
  "herbs": "herb", "flowers": "flower", "bees": "bee", "lemons": "lemon", "fevers": "fever", "headaches": "headache",
  "sicker": "sick", "medicines": "medicine", "rested": "rest", "resting": "rest", "rests": "rest",
  "slept": "sleep", "sleeping": "sleep", "sleeps": "sleep", "healed": "heal", "heals": "heal", "healing": "heal",
  "cried": "cry", "crying": "cry", "cries": "cry"
 },
 "spots": [
  { "id": "hives", "label": "BEES · PLEASE WALK SLOWLY" },
  { "id": "honey", "label": "HONEY · FRESH TODAY" },
  { "id": "beekeeper", "npc": "Beekeeper", "idle": [
    "Bees are like people: if you are calm, they are calm.",
    "A spoon of honey in warm water helps a sore throat. Not for babies, though!",
    "Shh. Can you hear them? They're happy today. Happy bees make sweet honey."
  ] },
  { "id": "herbs", "label": "HERBS · LAVENDER · SAGE · THYME" },
  { "id": "gardener", "npc": "Gardener Bo", "idle": [
    "Plants are easy. Water in the morning, not at noon, because the sun burns the wet leaves.",
    "Don't touch the moonberries. I'm serious.",
    "You look tired. You should sit in the shade for a minute."
  ] },
  { "id": "healer", "npc": "Old Healer", "idle": [
    "Eh? Speak up, child. My ears are older than this tower.",
    "Most people don't need strong medicine. They need sleep, water and a kind word.",
    "If you have a headache, you should drink water first. Nine times out of ten, that's enough."
  ] },
  { "id": "mint", "label": "MINT" },
  { "id": "berries", "label": "MOONBERRIES · DO NOT EAT!" },
  { "id": "lemon", "label": "LEMON TREE" },
  { "id": "child", "npc": "Mila", "idle": [
    "My head feels hot and heavy...",
    "I don't want to stay in bed. It's so boring!",
    "Do you think the bees are scared of me? I'm not scared of them."
  ] },
  { "id": "mother", "npc": "Mila's mother", "idle": [
    "I didn't sleep all night. I kept checking her forehead.",
    "She was healthy yesterday. She ran around the pond all day!",
    "Please go to the healer. She sits by the pond."
  ] },
  { "id": "gate", "exit": true, "locked": "The garden gate is locked. The healer keeps the key, and she is busy with a sick child." }
 ],
 "tasks": [
  {
   "npc": "mother", "type": "talk",
   "hint": "Narahat qadınla danış.",
   "say": [
    "Oh, thank goodness, a traveler! Please, can you help me?",
    "My daughter Mila is sick. She has had a fever since last night."
   ],
   "turns": [
    {
     "q": ["She says she has a terrible headache, and she couldn't sleep at all.", "I'm so worried. What should I do?"],
     "opts": [
      "I'm sorry to hear that. Have you talked to the healer?",
      "Don't worry, it's only a cold. She'll be fine tomorrow.",
      "Why didn't you give her medicine last night?"
     ],
     "a": 0,
     "wrong": "Please don't say that. I'm really frightened. Isn't there anyone in this garden who can help?",
     "then": "The healer? Yes, of course! But she is very old and she doesn't hear well, so I was scared to bother her."
    },
    {
     "q": ["Could you go to her for me? I shouldn't leave Mila alone."],
     "opts": [
      "Of course. I'll go right now. Where can I find her?",
      "Sorry, I'm busy. I have to climb the tower.",
      "Why can't you go yourself?"
     ],
     "a": 0, "speak": true,
     "wrong": "Oh... I see. But I can't leave her. She keeps crying.",
     "then": "Thank you! She always sits on the stone bench behind the pond, in the middle of the garden."
    },
    {
     "q": ["Please tell her everything: the fever, the headache, and that she can't sleep.", "And ask her for medicine. Strong medicine!"],
     "opts": [
      "I will. Try to stay calm. Mila needs you.",
      "You're right, strong medicine is always the best.",
      "I'll tell her that Mila has a broken arm."
     ],
     "a": 0,
     "wrong": "No, no, please listen to me carefully."
    }
   ],
   "done": "Thank you. Hurry, please, but walk carefully. The stones by the pond are wet."
  },
  {
   "npc": "healer", "type": "choice",
   "hint": "Gölməçənin arxasındakı qoca şəfaçıya get.",
   "say": [
    "Hm? Speak up, child, my ears are old.",
    "Someone is ill? Tell me slowly. What is wrong with the little one?"
   ],
   "opts": [
    "She has a fever and a headache, and she can't sleep.",
    "She has a cough and a sore throat, and she can't eat.",
    "She fell down and hurt her leg, and she can't walk."
   ],
   "a": 0,
   "done": "A fever, a headache and no sleep. Hm. And her mother wants strong medicine, I suppose? They always do."
  },
  {
   "npc": "healer", "type": "listen",
   "hint": "Şəfaçının məsləhətlərini diqqətlə dinlə.",
   "say": [
    "Listen carefully, because I will say this only once, and my memory is not what it was.",
    "Strong medicine is not the answer. Her body can heal itself, but she should rest and drink a lot of water.",
    "She shouldn't run around or eat heavy food today, so no cakes and no fried meat.",
    "Make her a tea: two lavender flowers, one spoon of honey and half a lemon. Lavender helps you sleep.",
    "Give it to her warm, not hot, and she should drink it twice: now, and again before bed.",
    "Oh, and remember this too: mint is for the stomach, and it grows best by the water, at the edge of the pond. Sage is for a sore throat."
   ],
   "qs": [
    { "q": "Why shouldn't Mila take strong medicine?", "az": "Niyə güclü dərman lazım deyil?", "opts": [
      "Because her body can heal itself if she rests.",
      "Because the medicine is too expensive.",
      "Because the healer has no medicine left."
     ], "a": 0 },
    { "q": "How many lavender flowers go in the tea?", "az": "Neçə çiçək?", "opts": ["One", "Two", "Three", "Half of one"], "a": 1 },
    { "q": "When should she drink the tea?", "az": "Nə vaxt?", "opts": [
      "Only in the morning", "Now, and again before bed", "After every meal", "Three times a day"
     ], "a": 1 },
    { "q": "Where does the mint grow best?", "az": "Nanə harada bitir?", "opts": [
      "In the greenhouse", "Next to the beehives", "At the edge of the pond", "In the herb bed"
     ], "a": 2 }
   ],
   "done": "Good. You listen better than my apprentices ever did. Now, let's start with the lavender."
  },
  {
   "npc": "healer", "type": "fetch",
   "hint": "Şəfaçı nə istəyir?",
   "say": [
    "The herb bed is over there, on the left, with the little wooden labels.",
    "Bring me two lavender flowers. The purple ones, not the white ones!"
   ],
   "target": "herbs",
   "doHint": "Bənövşəyi çiçəklər haradadır? Səhnədə tap.",
   "flag": "lavender",
   "done": "Lovely, they smell like summer. But my honey jar is empty, child. Go and ask the beekeeper, next to the hives."
  },
  {
   "npc": "beekeeper", "type": "talk",
   "hint": "Arıçıdan bal istə.",
   "say": [
    "Careful! Don't come any closer, the bees are nervous today.",
    "If you move slowly, they won't sting you."
   ],
   "turns": [
    {
     "q": ["So, what brings you to my hives?"],
     "opts": [
      "Excuse me, could I have some honey for a sick child?",
      "Give me your honey, quickly.",
      "I'd like to buy all your bees, please."
     ],
     "a": 0, "speak": true,
     "wrong": "Hey! The bees don't like rude people, and neither do I.",
     "then": "A sick child? Oh no. Is it little Mila? I saw her this morning, and she looked pale."
    },
    {
     "q": ["What's wrong with her? Is it a fever?"],
     "opts": [
      "Yes, a fever and a headache. The healer is making her a tea.",
      "No, she's very well. She's just bored.",
      "I don't know. I haven't asked anyone."
     ],
     "a": 0,
     "wrong": "Then why do you need my honey? Don't play games with me.",
     "then": "Honey and lemon tea. The healer's favourite. It always works."
    },
    {
     "q": ["You know, Mila is a funny girl. She was in the greenhouse very early this morning, before anyone was awake.", "I asked her what she was doing there, but she just ran away."],
     "opts": [
      "That's strange. Maybe I should tell the gardener.",
      "That's not important. Where is the honey?",
      "Children should never go into a greenhouse."
     ],
     "a": 0,
     "wrong": "Hm, maybe. But something wasn't right, I'm sure of it.",
     "then": "Yes, maybe you should. Bo looks after the greenhouse."
    },
    {
     "q": ["Now, the honey. The jars are on the shelf next to the hives. Take the small one, it's the freshest."],
     "opts": [
      "Thank you so much. I'll be careful with the bees.",
      "Only a small one? I wanted a big one.",
      "Can you bring it to the healer for me?"
     ],
     "a": 0,
     "wrong": "Be happy with what you get, traveler. I'm working."
    }
   ],
   "done": "Off you go. Walk slowly, and don't wave your hands, because bees hate that."
  },
  {
   "npc": "beekeeper", "type": "fetch",
   "hint": "Arıçı balı harada saxlayır?",
   "say": ["The small jar, on the shelf next to the hives. Go on!"],
   "target": "honey",
   "doHint": "Kiçik bal bankası haradadır?",
   "flag": "honey",
   "done": "Not a single sting! Well done. The healer will want a lemon too, I'm sure. Ask the gardener, Bo."
  },
  {
   "npc": "gardener", "type": "talk",
   "hint": "Bağban Bodan limon istə.",
   "say": ["Not now, traveler, I'm busy. Something terrible has happened in my greenhouse."],
   "turns": [
    {
     "q": ["Somebody has eaten my moonberries! The whole bush is almost empty."],
     "opts": [
      "Oh no! When did you notice?",
      "What a delicious name. Can I try one?",
      "Who cares about berries? I need a lemon."
     ],
     "a": 0,
     "wrong": "Hmph. You don't understand how special they are.",
     "then": "This morning, when I came to water the plants. They were so healthy yesterday!"
    },
    {
     "q": ["They're beautiful, but you shouldn't eat them. They aren't poison, but they make you feel sick.", "Your stomach hurts, you get hot, and your tongue goes blue for a whole day!"],
     "opts": [
      "So if someone ate them, they would have a stomachache and a blue tongue?",
      "So the berries make you strong and happy?",
      "So you should eat them before you go to bed?"
     ],
     "a": 0,
     "wrong": "No, no, no. Were you listening to me at all?",
     "then": "Exactly. And whoever ate them is feeling very sorry now, I'm sure."
    },
    {
     "q": ["Anyway, what did you want from me?"],
     "opts": [
      "The healer needs a lemon for a sick girl's tea. May I take one?",
      "I'd like some moonberries, please.",
      "Nothing. I was just looking at the flowers."
     ],
     "a": 0, "speak": true,
     "wrong": "Then please let me work. I have a thief to find.",
     "then": "A sick girl? Then of course you can."
    }
   ],
   "done": "And if you see a child with a blue tongue, come and tell me!"
  },
  {
   "npc": "gardener", "type": "fetch",
   "hint": "Bağban limonu harada göstərdi?",
   "say": [
    "The lemon tree is in the greenhouse, in a big red pot.",
    "Pick a yellow one. The green ones are too sour, even for tea."
   ],
   "target": "lemon",
   "doHint": "Limon ağacı haradadır?",
   "flag": "lemon",
   "done": "Perfect. Now go, the healer is waiting, and that tea won't make itself."
  },
  {
   "npc": "healer", "type": "line",
   "hint": "Hər şeyi şəfaçıya apar.",
   "say": [
    "Lavender, honey and a lemon. You have done well, child.",
    "Here, I've made the tea. It's warm, not hot.",
    "Take it to Mila. She is lying on the little bed in front of the greenhouse.",
    "And watch her carefully. A good healer listens with her eyes, too."
   ],
   "done": "Go on. And be gentle with her. I think she's scared of me and my bitter medicine."
  },
  {
   "npc": "child", "type": "talk",
   "hint": "Çayı Milaya apar.",
   "say": [
    "Who are you? Is that medicine? I don't want any medicine!",
    "It's bitter and horrible!"
   ],
   "turns": [
    {
     "q": ["I always cry when I have to take medicine."],
     "opts": [
      "Don't worry, it isn't medicine. It's warm tea with honey and lemon.",
      "Stop crying. Big girls should be brave.",
      "If you don't drink it, you'll get much worse."
     ],
     "a": 0, "speak": true,
     "wrong": "Now I'm even more scared!",
     "then": "Honey? Really? ...Okay. Just a little bit."
    },
    {
     "q": ["Mmm. It's actually nice. My head hurts a bit less already.", "But my stomach still hurts a lot. Mum thinks it's because of the fever."],
     "opts": [
      "Can I see your tongue for a moment?",
      "Your mum is right, it's the fever.",
      "Maybe you should eat some cake."
     ],
     "a": 0,
     "wrong": "Hmm. But that doesn't explain why my tummy hurts so much.",
     "then": "Ahh. Like this?"
    },
    {
     "q": ["Why are you looking at me like that? Is something wrong with my tongue?"],
     "opts": [
      "It's blue, Mila. Did you eat the moonberries in the greenhouse?",
      "No, it's perfectly fine. Go back to sleep.",
      "It's red, so you should see a doctor."
     ],
     "a": 0,
     "wrong": "Hmm... are you sure? You looked very surprised.",
     "then": "Oh no... Yes. I ate them. Lots of them. They looked so pretty, and I was hungry."
    },
    {
     "q": ["I didn't tell Mum because I was scared. She'll be so angry with me!", "Please, what should I do?"],
     "opts": [
      "You should tell her the truth. She's more worried than angry.",
      "You shouldn't tell anyone. It's our secret.",
      "You should hide in the greenhouse until tomorrow."
     ],
     "a": 0,
     "wrong": "But then the healer will give me the wrong medicine..."
    }
   ],
   "done": "Okay... but can you tell her first? Please? I'm too scared."
  },
  {
   "npc": "mother", "type": "build",
   "hint": "Anaya həqiqəti de.",
   "say": [
    "How is she? Did she drink the tea?",
    "Why does her stomach hurt so much? Tell me!"
   ],
   "answer": "She feels sick because she ate the moonberries",
   "extra": ["fever", "medicine", "so", "honey", "lemon"],
   "done": "The moonberries?! The gardener's berries? Oh, that silly girl!"
  },
  {
   "npc": "mother", "type": "talk",
   "hint": "Anaya məsləhət ver.",
   "say": ["I've told her a hundred times: don't touch the gardener's plants!"],
   "turns": [
    {
     "q": ["I'm going to go and shout at her right now!"],
     "opts": [
      "Please wait. She was scared of you, so she said nothing.",
      "Yes, you should punish her. She deserves it.",
      "Shout at the gardener instead. It's his fault."
     ],
     "a": 0,
     "wrong": "That doesn't sound right... I don't want to make things worse.",
     "then": "Scared? Of me? Oh... my poor girl."
    },
    {
     "q": ["So what should I do? I'm her mother, and now I feel terrible."],
     "opts": [
      "You should give her a hug and tell her you aren't angry.",
      "You should give her some strong medicine.",
      "You shouldn't talk to her until tomorrow."
     ],
     "a": 0, "speak": true,
     "wrong": "No... I don't think that's what she needs right now.",
     "then": "You're right. She needs a hug more than a lecture."
    },
    {
     "q": ["And the gardener? He loves those berries more than anything in the world."],
     "opts": [
      "Mila should say sorry to him when she feels better.",
      "He shouldn't grow dangerous berries.",
      "We shouldn't tell him anything."
     ],
     "a": 0,
     "wrong": "Hmm, I don't think that's fair to him.",
     "then": "Yes. She'll say sorry, and she can help him in the greenhouse for a week."
    }
   ],
   "done": "Thank you, traveler. Now please tell the healer about the berries. She'll know what to do."
  },
  {
   "npc": "healer", "type": "choice",
   "hint": "Şəfaçıya giləmeyvələrdən danış.",
   "say": [
    "Moonberries! Ha! That explains everything: the fever, the stomach, the blue tongue.",
    "The lavender tea will help her sleep, but her stomach needs something else.",
    "Do you remember what I told you? Which herb is for the stomach?"
   ],
   "opts": ["Mint", "Lavender", "Sage"],
   "a": 0,
   "done": "Yes! You were listening. My memory may be old, but yours is fresh."
  },
  {
   "npc": "healer", "type": "fetch",
   "hint": "Şəfaçıya son ot lazımdır.",
   "say": [
    "Then bring me some mint, please. My knees are too old for those wet stones.",
    "You remember where it grows, don't you?"
   ],
   "target": "mint",
   "doHint": "Nanə harada bitir? Xatırla.",
   "flag": "mint",
   "done": "Fresh mint, perfect. Mila will feel better by tonight, and healthy again in two days. You have a healer's heart, traveler. Here is the key: the garden gate is open for you."
  }
 ]
};
