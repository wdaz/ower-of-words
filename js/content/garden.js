// (The Garden): story, words and tasks. Spot ids must match js/floors/garden.js.
export default {
 "name": "The Garden",
 "people": "Şəfaçılar",
 "cefr": "B1-B2",
 "story": "Qüllənin yuxarısında, buludların üstündə asma bağ var: dərman otları, gölməçə və şüşə istixana. Burada şəfaçılar yaşayır. Kiçik Mila xəstələnib, anası çox narahatdır, qoca şəfaçı isə yaxşı eşitmir. Kömək et: dinlə, məsləhət ver və Milanın əslində niyə xəstə olduğunu öyrən.",
 "words": [
  { "w": "remedy", "p": "🌿", "az": "çarə, müalicə vasitəsi" },
  { "w": "pill", "p": "💊", "az": "həb" },
  { "w": "sting", "p": "🐝", "az": "sancmaq" },
  { "w": "sour", "p": "🍋", "az": "turş" },
  { "w": "shiver", "p": "🥶", "az": "titrəmək (soyuqdan, qızdırmadan)" },
  { "w": "dizzy", "p": "😵‍💫", "az": "başı gicəllənən" },
  { "w": "tongue", "p": "👅", "az": "dil (ağızdakı)" },
  { "w": "poisonous", "p": "☠️", "az": "zəhərli" },
  { "w": "recover", "p": "❤️‍🩹", "az": "sağalmaq" },
  { "w": "anxious", "p": "😰", "az": "həyəcanlı, çox narahat" },
  { "w": "calm", "p": "😌", "az": "sakit" },
  { "w": "greedy", "p": "🐷", "az": "acgöz, tamahkar" },
  { "w": "furious", "p": "😡", "az": "qəzəbdən özündən çıxmış" },
  { "w": "embarrassed", "p": "😳", "az": "utanmış, pərt" },
  { "w": "confess", "p": "🗣️", "az": "(günahını) boynuna almaq, etiraf etmək" },
  { "w": "upset", "p": "😞", "az": "pərişan, kefi pozulmuş" }
 ],
 "forms": {
  "remedies": "remedy", "pills": "pill", "stung": "sting", "stings": "sting", "stinging": "sting",
  "shivering": "shiver", "shivered": "shiver", "shivers": "shiver", "dizziness": "dizzy",
  "tongues": "tongue", "recovered": "recover", "recovering": "recover", "recovers": "recover",
  "calmer": "calm", "calmly": "calm", "greedier": "greedy", "greediest": "greedy", "greedily": "greedy", "greed": "greedy",
  "confessed": "confess", "confesses": "confess", "confessing": "confess", "confession": "confess"
 },
 "spots": [
  { "id": "hives", "label": "BEES · PLEASE WALK SLOWLY" },
  { "id": "honey", "label": "HONEY · FRESH TODAY" },
  { "id": "beekeeper", "npc": "Beekeeper", "idle": [
    "Bees are like people: if you stay calm, they stay calm. Panic, and they'll sting you.",
    "A spoon of honey in warm water is the best remedy for a sore throat. Not for babies, though!",
    "Shh. Can you hear them? They're happy today. Happy bees make sweet honey, never sour."
  ] },
  { "id": "herbs", "label": "HERBS · LAVENDER · SAGE · THYME" },
  { "id": "gardener", "npc": "Gardener Bo", "idle": [
    "Plants are easy. Water them in the morning, not at noon, because the sun burns the wet leaves.",
    "Don't touch the moonberries. They aren't poisonous, but I'm serious.",
    "You look a bit dizzy. You should sit in the shade for a minute."
  ] },
  { "id": "healer", "npc": "Old Healer", "idle": [
    "Eh? Speak up, child. My ears are older than this tower.",
    "Most people don't need pills. They need sleep, water and a kind word. That's the oldest remedy there is.",
    "If you feel dizzy, drink some water first. Nine times out of ten, you'll recover in an hour."
  ] },
  { "id": "mint", "label": "MINT" },
  { "id": "berries", "label": "MOONBERRIES · DO NOT EAT!" },
  { "id": "lemon", "label": "LEMON TREE" },
  { "id": "child", "npc": "Mila", "idle": [
    "My head feels hot and heavy, and I keep shivering...",
    "I don't want to stay in bed. It's so boring!",
    "Do you think the bees are scared of me? I'm not scared of them. They only sting grown-ups."
  ] },
  { "id": "mother", "npc": "Mila's mother", "idle": [
    "I didn't sleep all night. I kept checking her forehead. I'm so anxious.",
    "She was perfectly healthy yesterday. She ran around the pond all day!",
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
    "My daughter Mila is ill. She's had a fever since last night, and now she's shivering under three blankets."
   ],
   "turns": [
    {
     "q": ["She says she feels dizzy, her stomach hurts, and she couldn't sleep at all.", "I'm so anxious I can't think straight. What should I do?"],
     "opts": [
      "I'm sorry to hear that. Have you talked to the healer?",
      "Don't worry, it's only a cold. She'll be fine tomorrow.",
      "Why didn't you give her a pill last night?"
     ],
     "a": 0,
     "wrong": "Please don't say that. I'm really frightened. Isn't there anyone in this garden who can help?",
     "then": "The healer? Yes, of course! But she's very old and hard of hearing, and I was embarrassed to wake her so early."
    },
    {
     "q": ["Could you go to her for me? I shouldn't leave Mila alone while she's so dizzy."],
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
     "q": ["Please tell her everything: the fever, the shivering, and that she feels dizzy.", "And ask her for a remedy. Strong pills, the strongest she's got!"],
     "opts": [
      "I will. Try to stay calm. Mila needs you.",
      "You're right, strong pills are always the best remedy.",
      "I'll tell her that Mila has a broken arm."
     ],
     "a": 0,
     "wrong": "No, no, please listen to me carefully."
    }
   ],
   "done": "Thank you. Hurry, but walk carefully. The stones by the pond are wet, and you don't want to fall in."
  },
  {
   "npc": "healer", "type": "choice",
   "hint": "Gölməçənin arxasındakı qoca şəfaçıya get.",
   "say": [
    "Hm? Speak up, child, my ears are old.",
    "Someone is ill? Tell me slowly. What's wrong with the little one?"
   ],
   "opts": [
    "She has a fever, she's shivering, and she feels dizzy.",
    "She has a cough and a sore throat, and she can't eat.",
    "She fell down and hurt her leg, and she can't walk."
   ],
   "a": 0,
   "done": "A fever, shivering and a dizzy head. Hm. And her mother wants strong pills, I suppose? They always do."
  },
  {
   "npc": "healer", "type": "listen",
   "hint": "Şəfaçının məsləhətlərini diqqətlə dinlə.",
   "say": [
    "Listen carefully, because I'll only say this once, and my memory isn't what it used to be.",
    "Pills are not the answer. Her body can recover on its own, as long as she rests and drinks plenty of water.",
    "She shouldn't run around or eat heavy food today, so no cakes and no fried meat.",
    "My remedy is a tea: two lavender flowers, one spoon of honey and half a lemon. Lavender helps you sleep, and the lemon makes it nice and sour.",
    "Give it to her warm, not hot, and she should drink it twice: now, and again before bed.",
    "Oh, and remember this too: mint is for the stomach, and it grows best by the water, at the edge of the pond. Sage is for a sore throat."
   ],
   "qs": [
    { "q": "Why doesn't Mila need pills?", "az": "Niyə həb lazım deyil?", "opts": [
      "Because her body can recover if she rests.",
      "Because pills are too expensive.",
      "Because the healer has no pills left."
     ], "a": 0 },
    { "q": "How many lavender flowers go into the remedy?", "az": "Neçə çiçək?", "opts": ["One", "Two", "Three", "Half of one"], "a": 1 },
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
   "done": "Lovely, they smell like summer. But my honey jar is empty. Go and ask the beekeeper by the hives, and stay calm, or the bees will sting you."
  },
  {
   "npc": "beekeeper", "type": "talk",
   "hint": "Arıçıdan bal istə.",
   "say": [
    "Careful! Don't come any closer, the bees are nervous today.",
    "If you stay calm and move slowly, they won't sting you."
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
     "then": "A sick child? Oh no. Is it little Mila? I saw her this morning, and she looked pale and anxious."
    },
    {
     "q": ["What's wrong with her? Is it a fever?"],
     "opts": [
      "Yes, a fever, and she feels dizzy. The healer is making her a remedy.",
      "No, she's very well. She's just bored.",
      "I don't know. I haven't asked anyone."
     ],
     "a": 0,
     "wrong": "Then why do you need my honey? Don't play games with me.",
     "then": "Honey and lemon tea, the healer's favourite remedy. Sweet and sour, and it always works."
    },
    {
     "q": ["You know, Mila is a funny girl. She was in the greenhouse very early this morning, before anyone was awake.", "When I asked her what she was doing there, she went red, looked really embarrassed and ran away."],
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
   "done": "Off you go. Walk slowly and don't wave your hands. Bees only sting when they're frightened."
  },
  {
   "npc": "beekeeper", "type": "fetch",
   "hint": "Arıçı balı harada saxlayır?",
   "say": ["The small jar, on the shelf next to the hives. Go on, nice and calm!"],
   "target": "honey",
   "doHint": "Kiçik bal bankası haradadır?",
   "flag": "honey",
   "done": "Not stung once! Well done. The healer will want a lemon too, I'm sure. Ask the gardener, Bo."
  },
  {
   "npc": "gardener", "type": "talk",
   "hint": "Bağban Bodan limon istə.",
   "say": ["Not now, traveler, I'm busy. Something terrible has happened in my greenhouse. Some greedy little animal has been in there!"],
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
     "then": "This morning, when I came to water the plants. They were perfect yesterday! I'm absolutely furious."
    },
    {
     "q": ["They're beautiful, but you shouldn't eat them. They aren't poisonous, but they make you feel awful.", "You feel dizzy, you get hot and start shivering, and your tongue goes blue for a whole day!"],
     "opts": [
      "So if someone ate them, they would feel dizzy and have a blue tongue?",
      "So the berries make you strong and happy?",
      "So they're poisonous, and whoever ate them could die?"
     ],
     "a": 0,
     "wrong": "No, no, no. Were you listening to me at all?",
     "then": "Exactly. Not poisonous, just horrible. Whoever was so greedy is feeling very sorry now, I'm sure."
    },
    {
     "q": ["Anyway, what did you want from me?"],
     "opts": [
      "The healer needs a lemon for a sick girl's remedy. May I take one?",
      "I'd like some moonberries, please.",
      "Nothing. I was just looking at the flowers."
     ],
     "a": 0, "speak": true,
     "wrong": "Then please let me work. I have a greedy berry-eater to find.",
     "then": "A sick girl? Then of course you can."
    }
   ],
   "done": "And if you see anyone with a blue tongue, come and tell me!"
  },
  {
   "npc": "gardener", "type": "fetch",
   "hint": "Bağban limonu harada göstərdi?",
   "say": [
    "The lemon tree is in the greenhouse, in a big red pot.",
    "Pick a yellow one. The green ones are far too sour, even for tea."
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
    "Lavender, honey and a lemon. You've done well, child.",
    "Here, I've made the tea. It's warm, not hot.",
    "Take it to Mila. She's lying on the little bed in front of the greenhouse.",
    "And watch her carefully. A good healer listens with her eyes, too: look at her face, her hands, even her tongue."
   ],
   "done": "Go on. And be gentle with her. I think she's scared of me and my bitter pills."
  },
  {
   "npc": "child", "type": "talk",
   "hint": "Çayı Milaya apar.",
   "say": [
    "Who are you? Is that a pill? I'm not taking any pills!",
    "They're bitter and horrible, and they get stuck in my throat!"
   ],
   "turns": [
    {
     "q": ["I always cry when I have to take medicine."],
     "opts": [
      "Don't worry, it isn't a pill. It's warm tea with honey and lemon.",
      "Stop crying. Big girls should be brave.",
      "If you don't drink it, you'll get much worse."
     ],
     "a": 0, "speak": true,
     "wrong": "Now I'm even more scared!",
     "then": "Honey? Really? ...Okay. Just a little bit."
    },
    {
     "q": ["Mmm. It's a bit sour, but it's nice. I feel less dizzy already.", "But my stomach still hurts a lot. Mum thinks it's because of the fever."],
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
     "then": "Oh no... Yes. I ate them. Lots of them. They looked so pretty, and I was hungry. I was so greedy... I'm really upset with myself."
    },
    {
     "q": ["I didn't tell Mum because I was too embarrassed. She'll be furious with me!", "Please, what should I do?"],
     "opts": [
      "You should confess and tell her the truth. She's more anxious than angry.",
      "You shouldn't tell anyone. It's our secret.",
      "You should hide in the greenhouse until tomorrow."
     ],
     "a": 0,
     "wrong": "But then the healer will give me the wrong remedy..."
    }
   ],
   "done": "Okay... but can you tell her first? Please? I'm too scared."
  },
  {
   "npc": "mother", "type": "build",
   "hint": "Anaya həqiqəti de.",
   "say": [
    "How is she? Did she drink the tea?",
    "Why does her stomach hurt so much? And why is she still shivering? Tell me!"
   ],
   "answer": "She feels dizzy because she ate the moonberries",
   "extra": ["fever", "pills", "so", "honey", "poisonous"],
   "done": "The moonberries?! The gardener's berries? Oh, that silly girl! So she's the greedy one! I'm so upset."
  },
  {
   "npc": "mother", "type": "talk",
   "hint": "Anaya məsləhət ver.",
   "say": ["I've told her a hundred times: don't touch the gardener's plants! I'm furious!"],
   "turns": [
    {
     "q": ["I'm going to go and shout at her right now!"],
     "opts": [
      "Please wait. She was embarrassed and scared, so she said nothing.",
      "Yes, you should punish her. She deserves it.",
      "Shout at the gardener instead. It's his fault."
     ],
     "a": 0,
     "wrong": "That doesn't sound right... I don't want to make things worse.",
     "then": "Embarrassed? Scared of me? Oh... my poor girl."
    },
    {
     "q": ["So what should I do? I'm her mother, and now I feel terrible."],
     "opts": [
      "You should give her a hug and tell her you aren't upset any more.",
      "You should give her some strong pills.",
      "You shouldn't talk to her until tomorrow."
     ],
     "a": 0, "speak": true,
     "wrong": "No... I don't think that's what she needs right now.",
     "then": "You're right. I'm not upset with her, just worried. She needs a hug more than a lecture."
    },
    {
     "q": ["And the gardener? He's been looking for the greedy berry-eater all morning, and he's very upset."],
     "opts": [
      "Mila should confess and say sorry to him when she feels better.",
      "He shouldn't grow dangerous berries.",
      "We shouldn't tell him anything."
     ],
     "a": 0,
     "wrong": "Hmm, I don't think that's fair to him.",
     "then": "Yes. She'll say sorry, and I'm sure he won't stay upset for long, especially if she helps him in the greenhouse for a week."
    }
   ],
   "done": "Thank you, traveler. Now please tell the healer about the berries. She'll know which remedy to use."
  },
  {
   "npc": "healer", "type": "choice",
   "hint": "Şəfaçıya giləmeyvələrdən danış.",
   "say": [
    "Moonberries! Ha! So the little one finally confessed? That explains everything: the fever, the dizziness, the blue tongue.",
    "The lavender tea will help her sleep, but her stomach needs a different remedy.",
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
   "done": "Fresh mint, perfect. Mila will feel better by tonight, and she'll recover completely in two days. You have a healer's heart, traveler. Here is the key: the garden gate is open for you."
  }
 ]
};
