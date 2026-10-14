// The Workshop: story, words and tasks. Spot ids must match js/floors/workshop.js.
// Spots: smith, carpenter, clockmaker, pip, hammer, wood, rope, oil, gears, tools, lift (exit)
export default {
 "name": "The Workshop", "people": "Ustalar", "cefr": "B1-B2",
 "story": "Tüstülü emalatxanada dəmirçi, dülgər, saatsaz və gənc şagird hər şeyi düzəldir. Dünən gecə dəhşətli bir səs eşidildi və yuxarı qalxan lift qırıldı. İndi hamı bir-birini, ən çox da şagirdi günahlandırır. Nə baş verdiyini öyrən və lifti təmir etməyə kömək et.",
 "words": [
  {"w": "apprentice", "p": "🧑‍🔧", "az": "usta şagirdi"},
  {"w": "repair", "p": "🔧", "az": "təmir etmək, təmir"},
  {"w": "crash", "p": "💥", "az": "gurultu ilə yıxılmaq, çırpılmaq"},
  {"w": "accuse", "p": "👉", "az": "ittiham etmək, günahlandırmaq"},
  {"w": "innocent", "p": "😇", "az": "günahsız"},
  {"w": "evidence", "p": "🔍", "az": "sübut, dəlil"},
  {"w": "footprint", "p": "👣", "az": "ayaq izi"},
  {"w": "chew", "p": "🐀", "az": "gəmirmək, çeynəmək"},
  {"w": "grumpy", "p": "😠", "az": "deyingən, qaraqabaq"},
  {"w": "patient", "p": "⏳", "az": "səbirli"},
  {"w": "spark", "p": "🎇", "az": "qığılcım"},
  {"w": "sharp", "p": "🔪", "az": "iti, kəskin"},
  {"w": "replace", "p": "🔄", "az": "əvəz etmək, dəyişdirmək"},
  {"w": "weight", "p": "⚖️", "az": "çəki, ağırlıq"},
  {"w": "safety", "p": "🦺", "az": "təhlükəsizlik"},
  {"w": "forgive", "p": "🤗", "az": "bağışlamaq"}
 ],
 "forms": {
  "apprentices": "apprentice", "repaired": "repair", "repairing": "repair", "repairs": "repair",
  "crashed": "crash", "crashing": "crash", "crashes": "crash",
  "accused": "accuse", "accusing": "accuse", "accuses": "accuse",
  "footprints": "footprint", "chewed": "chew", "chewing": "chew", "chews": "chew",
  "patiently": "patient", "sparks": "spark", "sharpest": "sharp", "sharper": "sharp",
  "replaced": "replace", "replacing": "replace", "weights": "weight",
  "forgave": "forgive", "forgiven": "forgive", "forgiving": "forgive"
 },
 "spots": [
  {"id": "smith", "npc": "Smith Tarn", "idle": [
   "Iron is like people. It's hard, but you can shape it if you're patient.",
   "First you heat it, then you hit it, then you cool it. That's the whole secret.",
   "Keep your sleeves away from the fire. The sparks bite."
  ]},
  {"id": "carpenter", "npc": "Carpenter Mila", "idle": [
   "Measure twice, cut once. My grandmother taught me that.",
   "A blunt saw is more dangerous than a sharp one. You push too hard and it slips.",
   "Mind the sawdust. It gets everywhere, even in your tea."
  ]},
  {"id": "clockmaker", "npc": "Clockmaker Ozan", "idle": [
   "Tick, tock. Small parts, small steps, traveler.",
   "People call me grumpy. I'm not grumpy. I just don't like people.",
   "Every clock in this tower has been on my bench for repairs at some point."
  ]},
  {"id": "pip", "npc": "Pip", "idle": [
   "I want to be a master one day. Master Tarn says apprentices should listen more and talk less.",
   "Have you ever tried to oil a chain in the dark? Don't.",
   "I was dreaming about cheese when Master Tarn woke me up this morning."
  ]},
  {"id": "hammer", "label": "HAMMER"},
  {"id": "wood", "label": "WOOD · DRY"},
  {"id": "rope", "label": "OLD ROPE"},
  {"id": "oil", "label": "OIL"},
  {"id": "gears", "label": "GEARS · DO NOT TOUCH"},
  {"id": "tools", "label": "TOOLS · PUT THEM BACK!"},
  {"id": "lift", "exit": true, "locked": "The lift is out of order. Nobody can go up until it has been repaired."}
 ],
 "tasks": [
  {
   "npc": "smith", "type": "talk", "hint": "Ocağın yanındakı dəmirçi ilə danış.",
   "say": ["Mind the sparks, stranger! Welcome to the Workshop. We make and repair everything in this tower."],
   "turns": [
    {"q": ["Hm. You don't look like a smith. What brings you down here, into all this smoke?"],
     "opts": ["I'm a traveler. I'm trying to get to the top of the tower.", "I'd like to buy a new hammer, please.", "Nothing. I'm just looking for somewhere warm to sleep."],
     "a": 0, "wrong": "Ha! I don't believe you. Your boots are covered in dust from the stairs. You're climbing, aren't you?",
     "then": "The top! Then you need the lift. And I'm afraid I've got bad news about the lift."},
    {"q": ["Last night we heard a terrible crash, and this morning the lift was out of order.", "The rope is in pieces and the cage is lying on the floor. Nobody can go up or down."],
     "opts": ["Oh no! Was anybody hurt?", "Great. So I can stay here forever.", "Why haven't you repaired it yet?"],
     "a": 0, "wrong": "Hmm. That's not very kind. People here are worried, you know.",
     "then": "No, thank the fire, nobody was inside. But everybody is upset, and everybody is accusing somebody else."},
    {"q": ["The carpenter blames the rope, the clockmaker blames the floor, and they all accuse poor Pip, my apprentice.", "I need someone with fresh eyes. Will you help us find some real evidence?"],
     "opts": ["Of course. I'll talk to everybody and look for evidence.", "Sorry, I'm too busy. I'll find another way up.", "Yes. Pip broke it, so let's punish him."],
     "a": 0, "speak": true, "wrong": "There is no other way up, friend. And let's not accuse anybody before we know the facts.",
     "then": "Good. A patient listener is worth more than a strong arm."}
   ],
   "done": "Then let's get to work."
  },
  {
   "npc": "smith", "type": "fetch", "hint": "Dəmirçi yenə nəsə istəyir.",
   "say": ["First things first. I can't think without my hammer in my hand.", "I was working at the fire when the crash came, and I put it down somewhere. I think it's on the anvil, next to the fire, where the sparks fly."],
   "target": "hammer", "doHint": "Dəmirçiyə nə lazımdır? Ocağın yanında axtar.",
   "done": "That's the one, thank you! Now go and talk to the carpenter. She was here last night too."
  },
  {
   "npc": "carpenter", "type": "listen", "hint": "Dülgər nə baş verdiyini bilir. Onu dinlə.",
   "say": [
    "Oh, hello. Sorry, I'm a bit busy. I'm measuring the floor of the lift cage.",
    "Let me tell you what happened. Last night I was working late. I was sharpening my saw when I heard the crash. It was about midnight.",
    "I ran to the lift and saw the cage on the floor. The rope wasn't there any more, only two short pieces of it.",
    "The cage is strong, but when it crashed, two boards in the floor cracked. I measured them this morning: each one is two metres long.",
    "So first I need to cut two new boards to replace the broken ones, and then I can repair the floor. That will take me about an hour."
   ],
   "qs": [
    {"q": "What was the carpenter doing when she heard the crash?", "az": "O nə edirdi?", "opts": ["She was making her saw sharp.", "She was sleeping in her room.", "She was measuring the lift.", "She was oiling the chain."], "a": 0},
    {"q": "What time did she hear it?", "az": "Saat neçədə?", "opts": ["At about midnight.", "Early in the morning.", "At about ten in the evening."], "a": 0},
    {"q": "How many boards does she have to replace?", "az": "Neçə taxta?", "opts": ["One", "Two", "Three", "Four"], "a": 1},
    {"q": "What does she need to do first?", "az": "Əvvəlcə nə etməlidir?", "opts": ["Repair the rope.", "Talk to the clockmaker.", "Cut two new boards."], "a": 2}
   ],
   "done": "You're very patient. Not many people listen like that around here."
  },
  {
   "npc": "carpenter", "type": "fetch", "hint": "Dülgərin köməyə ehtiyacı var.",
   "say": ["Could you do me a favour? My back hurts after last night.", "Bring me some wood from the pile by the wall. The long, dry pieces, please. I can't replace good boards with wet ones."],
   "target": "wood", "doHint": "Dülgərə nə lazımdır? Divarın yanına bax.",
   "done": "Perfect, nice and dry. By the way, Pip is hiding behind the big gears over there. Be gentle with him. Everyone has been accusing him all morning."
  },
  {
   "npc": "pip", "type": "talk", "hint": "Şagird Pip gizlənib. Onunla danış.",
   "say": ["Oh! Are you here to accuse me too? Everybody thinks I broke the lift."],
   "turns": [
    {"q": ["I'm innocent! Well... I think I'm innocent."],
     "opts": ["Nobody is accusing you. I just want to hear your side of the story.", "Then who did it? Tell me now!", "Don't worry. The lift isn't important."],
     "a": 0, "wrong": "Please don't be angry with me... And the lift IS important. It's the only way up!",
     "then": "Really? Okay. Okay, I'll tell you."},
    {"q": ["Last night I was oiling the big chain by the lift. Master Tarn asked me to do it before bed.", "I was singing a little song, because the workshop is scary at night."],
     "opts": ["And what happened while you were oiling it?", "Why were you singing? That's silly.", "So you broke the chain with the oil?"],
     "a": 0, "wrong": "Hey! Singing isn't a crime. And oil doesn't break chains, everybody knows that."},
    {"q": ["I was standing right next to it when I heard it. A loud crack, like a tree falling. Then the cage crashed to the floor.", "I dropped the oil can and ran. I hid behind the gears all night."],
     "opts": ["That sounds really frightening. I'm glad you're okay.", "You should pay more attention to safety next time.", "Ha! You ran away like a little mouse."],
     "a": 0, "speak": true, "wrong": "Please... I feel bad enough already.",
     "then": "Thanks. You're the first person who has said something kind to me today."},
    {"q": ["Do you think the clockmaker can help? He knows everything about wheels and gears. But he's terribly grumpy."],
     "opts": ["Grumpy or not, let's ask him. I'll tell him exactly what you told me.", "No. Clockmakers only know about clocks.", "Let's wait until everybody forgets about it."],
     "a": 0, "wrong": "Hmm, I don't think that will get the lift working again..."}
   ],
   "done": "Thank you! He's at his bench, the one covered in tiny gears. Good luck, and don't mind if he's grumpy!"
  },
  {
   "npc": "clockmaker", "type": "talk", "hint": "Pipin dediklərini saatsaza danış.",
   "say": ["Tick, tock. Don't touch anything on my bench, please. Some of those gears are smaller than a fingernail. And no, I'm not grumpy. I'm busy."],
   "turns": [
    {"q": ["So, you talked to the apprentice. Everybody accuses him of breaking the lift. Well? What was he doing at the time?"],
     "opts": ["He was oiling the chain near the lift.", "He was sleeping behind the gears.", "He was cutting wood with a saw."],
     "a": 0, "speak": true, "wrong": "Are you sure? Think again. Who was doing what last night?",
     "then": "Oiling the chain. Hm. Oil makes a chain run smoothly. It doesn't break it."},
    {"q": ["And what did he hear? Tell me exactly. In my job, details are everything."],
     "opts": ["A loud crack, like a falling tree, and then a crash.", "Nothing at all. He was singing too loudly.", "A bell. It rang three times."],
     "a": 0, "wrong": "No, no. That doesn't sound right. Think about what the boy told you.",
     "then": "A crack before the crash. Interesting. So something broke first, and then the cage fell."},
    {"q": ["The carpenter says the floor cracked when the cage hit the ground. And I checked the big wheel this morning: not one tooth is broken.", "So, traveler, according to the evidence, what broke first?"],
     "opts": ["Then it must be the rope. The rope broke first.", "The floor broke first, and then the rope.", "Pip broke the wheel, after all."],
     "a": 0, "wrong": "No. Remember: first the crack, then the crash. What holds a cage up in the air?",
     "then": "Exactly what I was thinking. You have a good head on your shoulders."}
   ],
   "done": "Now, come back to me. I have something strange to tell you about my clock."
  },
  {
   "npc": "clockmaker", "type": "listen", "hint": "Saatsaz saat haqqında nəsə danışmaq istəyir.",
   "say": [
    "Here is something strange. The old clock above the lift stopped last night. It stopped at ten past twelve.",
    "That clock is connected to the big wheel of the lift. When the cage crashed, the wheel jumped and the clock stopped. So the lift fell at ten past twelve.",
    "Now, a rope doesn't break by itself. A sharp knife cuts it, sparks from a fire burn it, or it simply gets old.",
    "But our rope was new. We replaced the old one only three weeks ago. And nobody was using fire near the lift.",
    "There's a piece of the rope on the floor next to the lift. I'm too old to bend down; my knees hate me. Please bring it to me, and we'll look at the evidence together."
   ],
   "qs": [
    {"q": "When did the lift crash?", "az": "Nə vaxt?", "opts": ["At half past eleven.", "At ten past twelve.", "At twelve o'clock exactly.", "At ten in the morning."], "a": 1},
    {"q": "How does the clockmaker know the time?", "az": "Vaxtı haradan bilir?", "opts": ["Pip told him.", "He was looking at his watch.", "The clock stopped when the lift fell."], "a": 2},
    {"q": "When did they replace the old rope?", "az": "İpi nə vaxt dəyişiblər?", "opts": ["Only three weeks ago.", "Three years ago.", "Last night."], "a": 0},
    {"q": "Why can't he get the rope himself?", "az": "Niyə özü götürmür?", "opts": ["He is too busy with his clock.", "His knees hurt when he bends down.", "He is afraid of the lift."], "a": 1}
   ],
   "done": "Off you go, then. I'll wait here. Patiently, of course."
  },
  {
   "npc": "clockmaker", "type": "fetch", "hint": "Saatsaz bir şey gətirməyini gözləyir.",
   "say": ["The piece of rope is on the floor by the lift. You can't miss it. It looks like a dead snake."],
   "target": "rope", "flag": "gotRope", "doHint": "Saatsazın istədiyini liftin yanında tap.",
   "done": "Let me see... Aha! Look at the end of it."
  },
  {
   "npc": "clockmaker", "type": "choice", "hint": "İpin ucuna saatsazla birlikdə bax.",
   "say": ["Look closely. The end isn't cut with anything sharp and it isn't burnt. There are hundreds of tiny teeth marks on it. Something chewed it.", "And look at the floor here: tiny footprints and some cheese crumbs. Whose footprints are these? Who was having dinner on our rope?"],
   "opts": ["Mice! The mice were chewing the rope.", "Pip! He was eating cheese near the lift.", "Sparks from the fire were burning the rope."],
   "a": 0,
   "done": "Mice! Hundreds of hungry mice. That's all the evidence we need: the boy is innocent. Go and tell him. He'll be so happy."
  },
  {
   "npc": "pip", "type": "build", "hint": "Pipə xoş xəbəri çatdır.",
   "say": ["Did the clockmaker find any evidence? Please tell me. Was it my fault?"],
   "answer": "You are innocent because mice chewed the rope",
   "extra": ["broke", "guilty", "chain", "so"],
   "done": "Mice?! So I'm really innocent! Oh, thank you, thank you! Please tell Master Tarn. He'll believe you."
  },
  {
   "npc": "smith", "type": "listen", "hint": "Dəmirçiyə hər şeyi danış və təmir planını dinlə.",
   "say": [
    "Mice! So that's why my cheese keeps disappearing. And I accused the boy... I'll have to ask him to forgive me. But first, let's repair this lift.",
    "Listen carefully, because I'll only say it once. First, Pip oils the big gear, so it turns smoothly.",
    "Then we replace the rope with a new chain. Mice can't chew a metal chain! I made it this morning at the fire.",
    "After that, Mila repairs the floor of the cage with her new boards.",
    "Finally, for safety, before anybody gets in, we test the lift with some weight: three heavy bags of sand. If it goes up and comes down safely, it's ready."
   ],
   "qs": [
    {"q": "What do they do first?", "az": "Birinci addım", "opts": ["They put on the new chain.", "Pip oils the big gear.", "They test the lift."], "a": 1},
    {"q": "Why do they replace the rope with a chain?", "az": "Niyə zəncir?", "opts": ["It's cheaper.", "It's lighter.", "Mice can't chew it."], "a": 2},
    {"q": "What happens after they put on the chain?", "az": "Zəncirdən sonra", "opts": ["The carpenter repairs the floor.", "Pip oils the gear.", "They buy a cat."], "a": 0},
    {"q": "What weight will they test the lift with?", "az": "Nə ilə yoxlayacaqlar?", "opts": ["The traveler.", "Pip and the carpenter.", "Three bags of sand."], "a": 2}
   ],
   "done": "Good. Now go and help Pip. He has the first job. And tell him I'm sorry."
  },
  {
   "npc": "pip", "type": "fetch", "hint": "Pip birinci işə başlamalıdır.",
   "say": ["Master Tarn says sorry? And he wants me to oil the gear first? Of course I forgive him!", "But I dropped the oil can last night when I ran away... I think it rolled over to the tool shelf. Can you find it for me? My hands are still shaking a bit."],
   "target": "oil", "flag": "gotOil", "doHint": "Pipə nə lazımdır? Alət rəfinin yanında axtar.",
   "done": "That's it! A little oil on every tooth... There. Listen to that gear. It's turning like a dream.",
   "flagAfter": "oiled"
  },
  {
   "npc": "smith", "type": "talk", "hint": "Lift hazırdır? Dəmirçinin yanına qayıt.",
   "say": ["The gear is oiled, the new chain is on, and Mila has replaced the broken boards. Now, the safety test."],
   "turns": [
    {"q": ["Before anybody gets in, what do we put in the cage?"],
     "opts": ["Some weight, like the three bags of sand.", "You, of course. You're the oldest.", "Nothing. It's probably fine."],
     "a": 0, "wrong": "Ha! Very funny. No, nobody goes in before the safety test. What did I tell you?",
     "then": "Right. In go the sandbags. Pip, pull the lever... slowly! Be patient!"},
    {"q": ["Look at it go! Up... up... and down again. Not a single noise, and no crash.", "So, what do you think? Is it safe now?"],
     "opts": ["Yes. It carried all that weight up and down safely, so it's ready.", "No. It made a terrible noise.", "I don't know. I wasn't looking."],
     "a": 0, "wrong": "Weren't you watching? Open your eyes, traveler!",
     "then": "Agreed. A good test is better than a good guess."},
    {"q": ["You helped us a lot today. You found the evidence, Pip has forgiven me, and even Ozan isn't grumpy any more.", "How can we thank you?"],
     "opts": ["Could you take me up in the lift, please?", "Give me all your hammers.", "You can't. Next time, repair it yourselves."],
     "a": 0, "speak": true, "wrong": "Ha! You're a strange one. Ask for something useful.",
     "then": "With pleasure! Step in and hold on to the rail."}
   ],
   "done": "The lift is repaired! Up you go, traveler. And if you see any mice upstairs, send them back down. We'll have a cat waiting."
  }
 ]
};
