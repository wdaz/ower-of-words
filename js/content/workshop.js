// The Workshop: story, words and tasks. Spot ids must match js/floors/workshop.js.
// Spots: smith, carpenter, clockmaker, pip, hammer, wood, rope, oil, gears, tools, lift (exit)
export default {
 "name": "The Workshop", "people": "Ustalar", "cefr": "B1-",
 "story": "Tüstülü emalatxanada dəmirçi, dülgər, saatsaz və gənc şagird hər şeyi düzəldir. Dünən gecə dəhşətli bir səs eşidildi və yuxarı qalxan lift qırıldı. İndi hamı bir-birini, ən çox da şagirdi günahlandırır. Nə baş verdiyini öyrən və lifti təmir etməyə kömək et.",
 "words": [
  {"w": "hammer", "p": "🔨", "az": "çəkic"},
  {"w": "rope", "p": "🪢", "az": "ip, kəndir"},
  {"w": "oil", "p": "🛢️", "az": "yağ"},
  {"w": "gear", "p": "⚙️", "az": "dişli çarx"},
  {"w": "chain", "p": "⛓️", "az": "zəncir"},
  {"w": "wood", "p": "🪵", "az": "taxta, odun"},
  {"w": "tool", "p": "🛠️", "az": "alət"},
  {"w": "lift", "p": "🛗", "az": "lift"},
  {"w": "fix", "p": "🔧", "az": "təmir etmək"},
  {"w": "measure", "p": "📏", "az": "ölçmək"},
  {"w": "saw", "p": "🪚", "az": "mişar"},
  {"w": "clock", "p": "🕰️", "az": "saat"},
  {"w": "heavy", "p": "🏋️", "az": "ağır"},
  {"w": "careful", "p": "⚠️", "az": "ehtiyatlı"},
  {"w": "noise", "p": "🔊", "az": "səs-küy"},
  {"w": "fire", "p": "🔥", "az": "od, ocaq"}
 ],
 "forms": {
  "hammers": "hammer", "ropes": "rope", "oiled": "oil", "oiling": "oil", "oils": "oil",
  "gears": "gear", "chains": "chain", "tools": "tool", "lifts": "lift",
  "fixed": "fix", "fixing": "fix", "fixes": "fix", "measured": "measure", "measuring": "measure",
  "saws": "saw", "clocks": "clock", "carefully": "careful", "noises": "noise", "fires": "fire"
 },
 "spots": [
  {"id": "smith", "npc": "Smith Tarn", "idle": [
   "Iron is like people. It's hard, but you can shape it if you're patient.",
   "First you heat it, then you hit it, then you cool it. That's the whole secret.",
   "Keep your sleeves away from the fire. The sparks bite."
  ]},
  {"id": "carpenter", "npc": "Carpenter Mila", "idle": [
   "Measure twice, cut once. My grandmother taught me that.",
   "Wet wood is no good. It bends when it dries.",
   "Mind the sawdust. It gets everywhere, even in your tea."
  ]},
  {"id": "clockmaker", "npc": "Clockmaker Ozan", "idle": [
   "Tick, tock. Small parts, small steps, traveler.",
   "Don't blow on my gears! Dust is my worst enemy.",
   "Every clock in this tower was on my bench at some point."
  ]},
  {"id": "pip", "npc": "Pip", "idle": [
   "I want to be a master one day. Master Tarn says I talk too much.",
   "Have you ever tried to oil a chain in the dark? Don't.",
   "I was dreaming about cheese when Master Tarn woke me up this morning."
  ]},
  {"id": "hammer", "label": "HAMMER"},
  {"id": "wood", "label": "WOOD · DRY"},
  {"id": "rope", "label": "OLD ROPE"},
  {"id": "oil", "label": "OIL"},
  {"id": "gears", "label": "GEARS · DO NOT TOUCH"},
  {"id": "tools", "label": "TOOLS · PUT THEM BACK!"},
  {"id": "lift", "exit": true, "locked": "The lift is broken. Nobody can go up until it is fixed."}
 ],
 "tasks": [
  {
   "npc": "smith", "type": "talk", "hint": "Ocağın yanındakı dəmirçi ilə danış.",
   "say": ["Mind the sparks, stranger! Welcome to the Workshop. We make and fix everything in this tower."],
   "turns": [
    {"q": ["Hm. You don't look like a smith. What brings you down here, into all this smoke?"],
     "opts": ["I'm a traveler. I'm trying to get to the top of the tower.", "I'd like to buy a new hammer, please.", "Nothing. I'm just looking for somewhere warm to sleep."],
     "a": 0, "wrong": "Ha! I don't believe you. Your boots are full of dust from the stairs. You're climbing, aren't you?",
     "then": "The top! Then you need the lift. And I'm afraid I have bad news about the lift."},
    {"q": ["Last night we heard a terrible noise, and this morning the lift was broken.", "The rope is in pieces and the cage is lying on the floor. Nobody can go up or down."],
     "opts": ["Oh no! Was anybody hurt?", "Great. So I can stay here forever.", "Why don't you just fix it?"],
     "a": 0, "wrong": "Hmm. That's not very kind. People here are worried, you know.",
     "then": "No, thank the fire, nobody was inside. But everybody is upset, and everybody blames somebody else."},
    {"q": ["The carpenter blames the rope, the clockmaker blames the floor, and they all blame poor Pip, my apprentice.", "I need someone with fresh eyes. Will you help us find out what really happened?"],
     "opts": ["Of course. I'll talk to everybody and listen carefully.", "Sorry, I'm too busy. I'll find another way up.", "Yes. Pip broke it, so let's punish him."],
     "a": 0, "speak": true, "wrong": "There is no other way up, friend. And let's not judge anybody before we know the facts.",
     "then": "Good. A careful listener is worth more than a strong arm."}
   ],
   "done": "Then let's get to work."
  },
  {
   "npc": "smith", "type": "fetch", "hint": "Dəmirçi yenə nəsə istəyir.",
   "say": ["First things first. I can't think without my hammer in my hand.", "I was working at the fire when the noise came, and I put it down somewhere. I think it's on the anvil, next to the fire."],
   "target": "hammer", "doHint": "Dəmirçiyə nə lazımdır? Ocağın yanında axtar.",
   "done": "That's the one, thank you! Now go and talk to the carpenter. She was here last night too."
  },
  {
   "npc": "carpenter", "type": "listen", "hint": "Dülgər nə baş verdiyini bilir. Onu dinlə.",
   "say": [
    "Oh, hello. Sorry, I'm a bit busy. I'm measuring the floor of the lift cage.",
    "Let me tell you what happened. Last night I was working late. I was cutting planks with my saw when I heard the noise. It was about midnight.",
    "I ran to the lift and saw the cage on the floor. The rope wasn't there any more, only two short pieces of it.",
    "The cage is strong, but when it fell, two boards in the floor cracked. I measured them this morning: each one is two metres long.",
    "So first I need to cut two new boards, and then I can fix the floor. That will take me about an hour."
   ],
   "qs": [
    {"q": "What was the carpenter doing when she heard the noise?", "az": "O nə edirdi?", "opts": ["She was cutting planks with her saw.", "She was sleeping in her room.", "She was measuring the lift.", "She was oiling the chain."], "a": 0},
    {"q": "What time did she hear the noise?", "az": "Saat neçədə?", "opts": ["At about midnight.", "Early in the morning.", "At about ten in the evening."], "a": 0},
    {"q": "How many boards in the floor of the cage are broken?", "az": "Neçə taxta?", "opts": ["One", "Two", "Three", "Four"], "a": 1},
    {"q": "What does she need to do first?", "az": "Əvvəlcə nə etməlidir?", "opts": ["Fix the rope.", "Talk to the clockmaker.", "Cut two new boards."], "a": 2}
   ],
   "done": "You listen well. Not many people do that around here."
  },
  {
   "npc": "carpenter", "type": "fetch", "hint": "Dülgərin köməyə ehtiyacı var.",
   "say": ["Could you do me a favour? My back hurts after last night.", "Bring me some wood from the pile by the wall. The long, dry pieces, please. Wet wood is useless."],
   "target": "wood", "doHint": "Dülgərə nə lazımdır? Divarın yanına bax.",
   "done": "Perfect, nice and dry. By the way, Pip is hiding behind the big gears over there. Be gentle with him. He's very upset."
  },
  {
   "npc": "pip", "type": "talk", "hint": "Şagird Pip gizlənib. Onunla danış.",
   "say": ["Oh! Are you here to shout at me too? Everybody thinks I broke the lift."],
   "turns": [
    {"q": ["I didn't do it! Well... I don't think I did it."],
     "opts": ["Nobody is shouting. I just want to hear your side of the story.", "Then who did it? Tell me now!", "Don't worry. The lift isn't important."],
     "a": 0, "wrong": "Please don't be angry with me... And the lift IS important. It's the only way up!",
     "then": "Really? Okay. Okay, I'll tell you."},
    {"q": ["Last night I was oiling the big chain by the lift. Master Tarn asked me to do it before bed.", "I was singing a little song, because the workshop is scary at night."],
     "opts": ["And what happened while you were oiling it?", "Why were you singing? That's silly.", "So you broke the chain with the oil?"],
     "a": 0, "wrong": "Hey! Singing isn't a crime. And oil doesn't break chains, everybody knows that."},
    {"q": ["I was standing right next to it when I heard it. A loud crack, like a tree falling. Then the cage crashed to the floor.", "I dropped the oil can and ran. I hid behind the gears all night."],
     "opts": ["That sounds really frightening. I'm glad you're okay.", "You should be more careful next time.", "Ha! You ran away like a little mouse."],
     "a": 0, "speak": true, "wrong": "Please... I feel bad enough already.",
     "then": "Thanks. You're the first person who has said something kind to me today."},
    {"q": ["Do you think the clockmaker can help? He knows everything about wheels and gears. But he's very grumpy."],
     "opts": ["Let's ask him. I'll tell him exactly what you told me.", "No. Clockmakers only know about clocks.", "Let's wait until everybody forgets about it."],
     "a": 0, "wrong": "Hmm, I don't think that will get the lift working again..."}
   ],
   "done": "Thank you! He's at his bench, the one covered in tiny gears. Good luck!"
  },
  {
   "npc": "clockmaker", "type": "talk", "hint": "Pipin dediklərini saatsaza danış.",
   "say": ["Tick, tock. Don't touch anything on my bench, please. Some of those gears are smaller than a fingernail."],
   "turns": [
    {"q": ["So, you talked to the boy. Everybody says he broke the lift. Well? What was he doing at the time?"],
     "opts": ["He was oiling the chain near the lift.", "He was sleeping behind the gears.", "He was cutting wood with a saw."],
     "a": 0, "speak": true, "wrong": "Are you sure? Think again. Who was doing what last night?",
     "then": "Oiling the chain. Hm. Oil makes a chain run smoothly. It doesn't break it."},
    {"q": ["And what did he hear? Tell me exactly. In my job, details are everything."],
     "opts": ["A loud crack, like a falling tree, and then a crash.", "Nothing at all. He was singing too loudly.", "A bell. It rang three times."],
     "a": 0, "wrong": "No, no. That doesn't sound right. Think about what the boy told you.",
     "then": "A crack before the crash. Interesting. So something broke first, and then the cage fell."},
    {"q": ["The carpenter says the floor cracked when the cage hit the ground. And I checked the big wheel this morning: not one tooth is broken.", "So, traveler, what broke first?"],
     "opts": ["Then it must be the rope. The rope broke first.", "The floor broke first, and then the rope.", "Pip broke the wheel, after all."],
     "a": 0, "wrong": "No. Remember: first the crack, then the fall. What holds a cage up in the air?",
     "then": "Exactly what I was thinking. You have a good head on your shoulders."}
   ],
   "done": "Now, come back to me. I have something strange to tell you about my clock."
  },
  {
   "npc": "clockmaker", "type": "listen", "hint": "Saatsaz saat haqqında nəsə danışmaq istəyir.",
   "say": [
    "Here is something strange. The old clock above the lift stopped last night. It stopped at ten past twelve.",
    "That clock is connected to the big wheel of the lift. When the cage fell, the wheel jumped and the clock stopped. So the lift fell at ten past twelve.",
    "Now, a rope doesn't break by itself. A knife cuts it, or a fire burns it, or it gets old and tired.",
    "But our rope was new. We put it on only three weeks ago. And nobody was using fire near the lift.",
    "There's a piece of the old rope on the floor next to the lift. I'm too old to bend down; my knees hate me. Please bring it to me, and we'll look at it carefully."
   ],
   "qs": [
    {"q": "When did the lift fall?", "az": "Nə vaxt?", "opts": ["At half past eleven.", "At ten past twelve.", "At twelve o'clock exactly.", "At ten in the morning."], "a": 1},
    {"q": "How does the clockmaker know the time?", "az": "Vaxtı haradan bilir?", "opts": ["Pip told him.", "He was looking at his watch.", "The clock stopped when the lift fell."], "a": 2},
    {"q": "How old was the rope?", "az": "İp nə qədər köhnə idi?", "opts": ["Only three weeks old.", "Three years old.", "Very old and tired."], "a": 0},
    {"q": "Why can't he get the rope himself?", "az": "Niyə özü götürmür?", "opts": ["He is too busy with his clock.", "His knees hurt when he bends down.", "He is afraid of the lift."], "a": 1}
   ],
   "done": "Off you go, then. I'll wait here."
  },
  {
   "npc": "clockmaker", "type": "fetch", "hint": "Saatsaz bir şey gətirməyini gözləyir.",
   "say": ["The piece of rope is on the floor by the lift. You can't miss it. It looks like a dead snake."],
   "target": "rope", "flag": "gotRope", "doHint": "Saatsazın istədiyini liftin yanında tap.",
   "done": "Let me see... Aha! Look at the end of it."
  },
  {
   "npc": "clockmaker", "type": "choice", "hint": "İpin ucuna saatsazla birlikdə bax.",
   "say": ["Look closely. The end isn't cut and it isn't burnt. There are hundreds of tiny teeth marks on it.", "And look at the floor here: tiny footprints and some cheese crumbs. Who was having dinner on our rope?"],
   "opts": ["Mice! The mice were eating the rope.", "Pip! He was eating cheese near the lift.", "The fire was burning the rope."],
   "a": 0,
   "done": "Mice! Hundreds of hungry mice. The boy is innocent. Go and tell him. He'll be so happy."
  },
  {
   "npc": "pip", "type": "build", "hint": "Pipə xoş xəbəri çatdır.",
   "say": ["Did the clockmaker find something? Please tell me. Was it my fault?"],
   "answer": "The mice were eating the rope",
   "extra": ["was", "you", "broke", "chain"],
   "done": "Mice?! So it wasn't me! Oh, thank you, thank you! Please tell Master Tarn. He'll believe you."
  },
  {
   "npc": "smith", "type": "listen", "hint": "Dəmirçiyə hər şeyi danış və təmir planını dinlə.",
   "say": [
    "Mice! So that's why my cheese keeps disappearing. Right, we're getting a cat. But first, let's fix this lift.",
    "Listen carefully, because I'll only say it once. First, Pip oils the big gear, so it turns smoothly.",
    "Then we put a new chain on the wheel. No more rope: mice can't eat a metal chain! I made it this morning at the fire.",
    "After that, Mila fixes the floor of the cage with her new boards.",
    "Finally, before anybody gets in, we test the lift with something heavy: three bags of sand. If it goes up and comes down safely, it's ready."
   ],
   "qs": [
    {"q": "What do they do first?", "az": "Birinci addım", "opts": ["They put on the new chain.", "Pip oils the big gear.", "They test the lift."], "a": 1},
    {"q": "Why is a chain better than a rope?", "az": "Niyə zəncir?", "opts": ["It's cheaper.", "It's lighter.", "Mice can't eat it."], "a": 2},
    {"q": "What happens after they put on the chain?", "az": "Zəncirdən sonra", "opts": ["The carpenter fixes the floor.", "Pip oils the gear.", "They buy a cat."], "a": 0},
    {"q": "What will they test the lift with?", "az": "Nə ilə yoxlayacaqlar?", "opts": ["The traveler.", "Pip and the carpenter.", "Three bags of sand."], "a": 2}
   ],
   "done": "Good. Now go and help Pip. He has the first job."
  },
  {
   "npc": "pip", "type": "fetch", "hint": "Pip birinci işə başlamalıdır.",
   "say": ["Master Tarn wants me to oil the gear first, right? But I dropped the oil can last night when I ran away...", "I think it rolled over to the tool shelf. Can you find it for me? My hands are still shaking a bit."],
   "target": "oil", "flag": "gotOil", "doHint": "Pipə nə lazımdır? Alət rəfinin yanında axtar.",
   "done": "That's it! A little oil on every tooth... There. Listen to that gear. It's turning like a dream.",
   "flagAfter": "oiled"
  },
  {
   "npc": "smith", "type": "talk", "hint": "Lift hazırdır? Dəmirçinin yanına qayıt.",
   "say": ["The gear is oiled, the new chain is on, and Mila has fixed the floor. Now, the test."],
   "turns": [
    {"q": ["Before anybody gets in, what do we put in the cage?"],
     "opts": ["Something heavy, like the three bags of sand.", "You, of course. You're the oldest.", "Nothing. It's probably fine."],
     "a": 0, "wrong": "Ha! Very funny. No, nobody goes in before the test. What did I tell you?",
     "then": "Right. In go the sandbags. Pip, pull the lever... slowly!"},
    {"q": ["Look at it go! Up... up... and down again. Not a single noise.", "So, what do you think? Is it safe now?"],
     "opts": ["Yes. It went up and came down safely, so it's ready.", "No. It made a terrible noise.", "I don't know. I wasn't looking."],
     "a": 0, "wrong": "Weren't you watching? Open your eyes, traveler!",
     "then": "Agreed. A good test is better than a good guess."},
    {"q": ["You helped us a lot today. You found the truth, and Pip is smiling again.", "How can we thank you?"],
     "opts": ["Could you take me up in the lift, please?", "Give me all your hammers.", "You can't. Next time, fix it yourselves."],
     "a": 0, "speak": true, "wrong": "Ha! You're a strange one. Ask for something useful.",
     "then": "With pleasure! Step in and hold on to the rail."}
   ],
   "done": "The lift is fixed! Up you go, traveler. And if you see any mice upstairs, send them back down. We'll have a cat waiting."
  }
 ]
};
