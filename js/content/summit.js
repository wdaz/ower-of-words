// (The Summit): story, words and tasks. Spot ids must match js/floors/summit.js.
export default {
 "name": "The Summit",
 "people": "Şura",
 "cefr": "B1-B2",
 "story": "Zirvədə bütün xalqların ağsaqqalları toplanıb və bir həftədir mübahisə edirlər: qüllədə hamı bir dildə danışmalıdır, yoxsa hər xalq başqasının dilini öyrənməlidir? Səslər bərabər bölünür. Aşağıdan gələn köhnə bir zərf hər şeyi dəyişə bilər. Son sınaq səndədir: dinlə, fikir bildir və sərbəst danış.",
 "words": [
  { "w": "argue", "p": "🗣️", "az": "mübahisə etmək" },
  { "w": "stubborn", "p": "🐂", "az": "inadkar" },
  { "w": "convince", "p": "🧲", "az": "inandırmaq" },
  { "w": "compromise", "p": "🤝", "az": "güzəşt, kompromis" },
  { "w": "admit", "p": "🙋", "az": "etiraf etmək" },
  { "w": "ashamed", "p": "😳", "az": "utanan, xəcalətli" },
  { "w": "wisdom", "p": "🦉", "az": "müdriklik" },
  { "w": "fair", "p": "⚖️", "az": "ədalətli" },
  { "w": "envelope", "p": "✉️", "az": "zərf" },
  { "w": "handwriting", "p": "✍️", "az": "əl yazısı" },
  { "w": "foreign", "p": "🌍", "az": "xarici" },
  { "w": "translate", "p": "🔤", "az": "tərcümə etmək" },
  { "w": "regret", "p": "😔", "az": "peşman olmaq" },
  { "w": "deserve", "p": "🏅", "az": "layiq olmaq" },
  { "w": "doubt", "p": "🤔", "az": "şübhə" },
  { "w": "ancient", "p": "🏛️", "az": "qədim" }
 ],
 "forms": {
  "argued": "argue",
  "argues": "argue",
  "arguing": "argue",
  "argument": "argue",
  "arguments": "argue",
  "convinced": "convince",
  "convinces": "convince",
  "convincing": "convince",
  "compromises": "compromise",
  "admits": "admit",
  "admitted": "admit",
  "admitting": "admit",
  "envelopes": "envelope",
  "translated": "translate",
  "translates": "translate",
  "translating": "translate",
  "translator": "translate",
  "regrets": "regret",
  "regretted": "regret",
  "deserves": "deserve",
  "deserved": "deserve",
  "doubts": "doubt",
  "doubted": "doubt"
 },
 "spots": [
  {
   "id": "elder1",
   "npc": "First elder",
   "idle": [
    "A knight never changes his word. Well... almost never.",
    "I'm not stubborn. I'm just always right. That's a different thing!",
    "In my opinion, young people talk too fast. But you listen well, I'll give you that."
   ]
  },
  {
   "id": "elder2",
   "npc": "Second elder",
   "idle": [
    "We argue almost every day, but I respect him deeply.",
    "Every language is a door. Somebody told me that a long time ago.",
    "Wisdom doesn't come with a long beard. It comes from listening."
   ]
  },
  {
   "id": "elder3",
   "npc": "Third elder",
   "idle": [
    "I suggest that you listen first and speak later.",
    "A good compromise leaves everyone a little unhappy. That's how you know it's fair.",
    "Agree or disagree, but always give a reason."
   ]
  },
  {
   "id": "scribe",
   "npc": "Scribe",
   "idle": [
    "Every word goes into the council book. Even the boring ones.",
    "Forty years of arguments! My hand is so tired.",
    "White stone means yes, black stone means no. Simple!"
   ]
  },
  {
   "id": "messenger",
   "npc": "Messenger",
   "idle": [
    "Five hundred steps! I can't feel my legs.",
    "The wind up here is crazy. It nearly blew my hat off!",
    "Everyone downstairs is waiting to hear the bell."
   ]
  },
  { "id": "table", "label": "THE COUNCIL TABLE" },
  { "id": "book", "label": "THE COUNCIL BOOK · FORTY YEARS OF WORDS" },
  { "id": "stones", "label": "VOTING STONES · WHITE = YES · BLACK = NO" },
  { "id": "letter", "label": "AN OLD ENVELOPE · FOR THE YOUNG KNIGHT IN THE RED CLOAK" },
  {
   "id": "bell",
   "exit": true,
   "locked": "The council has not decided yet. They are still arguing."
  }
 ],
 "tasks": [
  {
   "npc": "elder3",
   "type": "line",
   "hint": "Üçüncü ağsaqqal səni qarşılayır.",
   "say": [
    "Welcome to the top of the tower, traveler. Did you really climb all the floors on your own? You deserve a rest.",
    "But I'm afraid you have come at a difficult moment. The elders have been arguing for a whole week.",
    "Each of them is too stubborn to accept a compromise, so the council can't decide anything.",
    "Please listen to my two friends first. Then come back and tell me what you think."
   ],
   "done": "Start with the first elder, the knight in red. He's the most stubborn of us all, and the loudest."
  },
  {
   "npc": "elder1",
   "type": "listen",
   "hint": "Birinci ağsaqqalın fikrini dinlə.",
   "say": [
    "Listen carefully, young one. I'm going to tell you why I'm right, and I'm sure I'll convince you.",
    "When I was a boy, everyone in the tower spoke one language. It was an ancient tradition, older than these stones.",
    "Then the five peoples moved to different floors, and their words slowly changed.",
    "Today a farmer from the market and a reader from the library need a translator and half an hour to buy one apple!",
    "I have never learned a foreign language, and I'm not ashamed of it. One language for everybody: that is my opinion.",
    "And I suggest that we decide today, before the sun goes down. No compromise!"
   ],
   "qs": [
    { "q": "What does the first elder want?", "az": "Onun istəyi", "opts": ["One language for all the peoples", "Every people should learn three languages", "No languages at all, only pictures"], "a": 0 },
    { "q": "How old is the tradition of one language, according to him?", "az": "Ənənə nə qədər köhnədir?", "opts": ["Older than the stones of the tower", "About ten years old", "As old as the scribe"], "a": 0 },
    { "q": "How does he feel about not knowing a foreign language?", "az": "Onun hissi", "opts": ["He isn't ashamed of it", "He regrets it very much", "He wants to start learning today"], "a": 0 },
    { "q": "When does he want the council to decide?", "az": "Nə vaxt?", "opts": ["Before the sun goes down", "Next year", "After the bell rings"], "a": 0 }
   ],
   "done": "Now go and listen to that dreamer in the blue hat. He'll argue with me, of course. He always does."
  },
  {
   "npc": "elder2",
   "type": "talk",
   "hint": "İkinci ağsaqqal başqa cür düşünür.",
   "say": [
    "Ah, did he tell you the apple story again? He tells it every single week."
   ],
   "turns": [
    {
     "q": [
      "I'm afraid I can't agree with him. Although one language sounds easy, we would lose so much.",
      "Tell me honestly: have you ever learned a foreign language?"
     ],
     "opts": [
      "Yes, I'm learning English right now. It's hard, but I love it.",
      "Yes, and I think he's right. One language is enough.",
      "No, I have never been to the market."
     ],
     "a": 0,
     "wrong": "Hm, that doesn't really answer my question. Have you learned a language or not?",
     "then": "I knew it! I can hear it in your voice. You still translate in your head sometimes, don't you? We all do at first."
    },
    {
     "q": [
      "And what has it given you? Only grammar and tired eyes?"
     ],
     "opts": [
      "Not at all. Now I can understand people I couldn't understand before.",
      "Yes, mostly grammar. I wouldn't recommend it.",
      "Sorry, I'm too tired to talk about it."
     ],
     "a": 0,
     "speak": true,
     "wrong": "Oh dear. Then why did you climb a whole tower of words?",
     "then": "Exactly. Every language is a door to new people."
    },
    {
     "q": [
      "But he says that learning takes too much time. Is he wrong, in your opinion?"
     ],
     "opts": [
      "I see his point, but I think it's worth the time.",
      "He's completely stupid. Don't listen to him.",
      "Time? I think it's about half past four."
     ],
     "a": 0,
     "wrong": "Hmm. Please give me a real answer, and a kind one. He is old, but he isn't a fool.",
     "then": "Well said. You can argue with someone and still show respect. That is real wisdom."
    },
    {
     "q": [
      "So you're on my side? Wonderful! Then I suggest a fair compromise: every elder learns the language of one neighbour, starting tomorrow."
     ],
     "opts": [
      "I agree, although it won't be easy for everyone.",
      "I disagree. Nobody should have to learn anything.",
      "Tomorrow? No, I think we should never start."
     ],
     "a": 0,
     "wrong": "Really? Think about what you told me a minute ago."
    }
   ],
   "done": "Thank you. Now go back to the third elder. He has to decide, not me."
  },
  {
   "npc": "elder3",
   "type": "talk",
   "hint": "Üçüncü ağsaqqala qayıt.",
   "say": [
    "So, you have listened to both of them. I hope they didn't argue too loudly."
   ],
   "turns": [
    {
     "q": [
      "Tell me in a few words: what is the difference between their opinions?"
     ],
     "opts": [
      "The first wants one language for everybody. The second wants everyone to learn each other's languages.",
      "The first wants to learn every language. The second wants only one.",
      "They agree about everything, but they don't like each other."
     ],
     "a": 0,
     "wrong": "No, no. Listen to them again. That is not what I heard.",
     "then": "Exactly. Two wise men, two different opinions, and neither of them will admit that he could be wrong."
    },
    {
     "q": [
      "When the council can't agree, we vote. Every elder puts one stone in a bowl: white means yes, black means no.",
      "Do you think that's a fair way to decide?"
     ],
     "opts": [
      "Yes, I think it's fair, because everyone has one voice.",
      "No. The oldest elder should decide everything alone.",
      "I'm not sure. Who has the biggest stone?"
     ],
     "a": 0,
     "speak": true,
     "wrong": "Hmm. Then the loudest or the oldest always wins. That doesn't sound fair to me.",
     "then": "Good. I have no doubt about it either."
    },
    {
     "q": [
      "The voting stones are with our scribe, over there at the writing desk. She keeps everything: the stones, the ink and the council book.",
      "Could you ask her for them? My knees don't like walking any more."
     ],
     "opts": [
      "Of course. I'll go and ask her right now.",
      "Sorry, I'd rather not. Can't you ask her yourself?",
      "Of course. I'll go and ring the bell for you."
     ],
     "a": 0,
     "wrong": "Hm? I only asked you to go to the scribe, please. It isn't far."
    }
   ],
   "done": "Thank you. And be careful: she loves to talk."
  },
  {
   "npc": "scribe",
   "type": "talk",
   "hint": "Masa arxasındakı katiblə danış.",
   "say": [
    "Oh! A new face! Nobody new ever comes up here. Come closer, come closer."
   ],
   "turns": [
    {
     "q": [
      "I write down everything the council says, in my best handwriting. Every word, for forty years!",
      "So, who are you? Tell me a little about yourself."
     ],
     "opts": [
      "I'm a traveler. I've come from far away to learn the language of the tower.",
      "I'm the first elder. Don't you recognise me?",
      "I'm fine, thank you. And you?"
     ],
     "a": 0,
     "speak": true,
     "wrong": "Ha! That's not what I asked. I want to know who you are!",
     "then": "A traveler from a foreign land! How exciting. Let me write that down."
    },
    {
     "q": [
      "And what was the hardest part of your journey? I want a good story for the council book."
     ],
     "opts": [
      "Understanding people at the beginning. I didn't know a single word.",
      "Lunch. The soup at the inn was a bit too hot.",
      "I don't have any stories. Nothing happened to me."
     ],
     "a": 0,
     "wrong": "Really? That's not much of a story. Tell me something real!",
     "then": "Not a single word! And now listen to you. Nobody needs to translate for you any more."
    },
    {
     "q": [
      "Now, what can I do for you? The elders never send anyone here just to chat."
     ],
     "opts": [
      "The third elder sent me. He'd like the voting stones, please.",
      "The first elder sent me. He'd like a new red cloak, please.",
      "Nobody sent me. I'd like to buy some ink, please."
     ],
     "a": 0,
     "wrong": "Hmm, that doesn't sound like the council. Who sent you, and why?"
    }
   ],
   "done": "The stones! Of course. The council always forgets where they are. They're too busy arguing."
  },
  {
   "npc": "scribe",
   "type": "fetch",
   "hint": "Katib sənə nəyi göstərir?",
   "say": [
    "The stones are in the grey bowl on the little column, next to my desk.",
    "Take the whole bowl, please. And mind the black ones: they love to roll away!"
   ],
   "target": "stones",
   "flag": "stones",
   "doHint": "Katib nə dedi? Masanın yanında axtar.",
   "done": "Perfect. I'll put the bowl on the council table for the vote."
  },
  {
   "npc": "elder3",
   "type": "listen",
   "hint": "Səsverməni dinlə.",
   "say": [
    "Thank you, traveler. The vote is open. Each elder has one stone.",
    "The first elder has put in a black stone: he still refuses to learn a foreign language.",
    "The second elder has put in a white stone, of course.",
    "And I... I haven't voted yet. At the moment it is one against one.",
    "Honestly, I have my doubts about both sides, and the same old arguments won't convince anybody.",
    "Wait... who is that at the ladder, out of breath? A messenger from the floors below?"
   ],
   "qs": [
    { "q": "What colour was the first elder's stone?", "az": "Daşın rəngi", "opts": ["Black", "White", "Red"], "a": 0 },
    { "q": "Why hasn't the third elder voted yet?", "az": "Niyə hələ səs vermir?", "opts": ["The old arguments haven't convinced him", "He has lost his stone", "He agrees with the first elder"], "a": 0 },
    { "q": "What is the result of the vote at the moment?", "az": "İndiki nəticə", "opts": ["One against one", "Two against one", "Three against nobody"], "a": 0 },
    { "q": "Who has just arrived?", "az": "Kim gəldi?", "opts": ["A messenger from the floors below", "The scribe's daughter", "A farmer with apples"], "a": 0 }
   ],
   "flagAfter": "messenger",
   "done": "Go and see what the messenger wants, please. Maybe the messenger brings the new thing we need."
  },
  {
   "npc": "messenger",
   "type": "talk",
   "hint": "Pilləkəndən gələn qasidlə danış.",
   "say": [
    "Phew! Five hundred steps! Is this... is this the council?"
   ],
   "turns": [
    {
     "q": [
      "The librarian downstairs sent me. She found an envelope inside a very old book.",
      "On the front it says: 'For the young knight in the red cloak'. Do you know who that is?"
     ],
     "opts": [
      "I'm not sure, but the first elder wears red, and he's a knight.",
      "That's me! I'm wearing red. Give it to me.",
      "No idea. Maybe you should just throw it away."
     ],
     "a": 0,
     "wrong": "Hmm, I doubt it. This envelope is about sixty years old. Look around the council again.",
     "then": "The first elder? Of course! He's the only knight up here."
    },
    {
     "q": [
      "There's just one small problem, and I have to admit it was my fault.",
      "When I came up through the hatch, the wind blew the envelope right out of my hand!"
     ],
     "opts": [
      "Don't worry. Did you see where it landed?",
      "You lost it? What a stupid mistake!",
      "Oh well. Let's forget about it, then."
     ],
     "a": 0,
     "wrong": "Please don't be like that. I'm only the messenger, and the librarian said it's important!",
     "then": "Thank you! You are much kinder than the guards downstairs."
    }
   ],
   "done": "Yes, I saw it fly. Let me think where..."
  },
  {
   "npc": "messenger",
   "type": "fetch",
   "hint": "Qasid zərfin hara uçduğunu deyir.",
   "say": [
    "It flew over the bell and got stuck on a column at the back, between the purple banner and the blue one.",
    "Could you get it for me? I'm too afraid to go near the edge."
   ],
   "target": "letter",
   "flag": "gotLetter",
   "doHint": "Zərf haradadır? Qasidin sözlərini xatırla.",
   "done": "You've got it! Please take the envelope to the first elder. I'm too shy."
  },
  {
   "npc": "elder1",
   "type": "talk",
   "hint": "Zərfi sahibinə apar.",
   "say": [
    "What's that in your hand? An envelope for me? Let me see..."
   ],
   "turns": [
    {
     "q": [
      "This is my handwriting! I wrote this letter sixty years ago, when I was learning the language of the library.",
      "My teacher was a quiet boy from the library. We translated for each other and learned together. Today he wears a big blue hat."
     ],
     "opts": [
      "But you told me you had never learned a foreign language!",
      "So you have always spoken only one language.",
      "What a nice story about the market."
     ],
     "a": 0,
     "wrong": "Hm. Were you listening to me earlier? Think about what I told you.",
     "then": "Yes... I said that. I suppose I was too stubborn to remember."
    },
    {
     "q": [
      "And look at the last line: 'Every language is a door.' I wrote that! My friend in the blue hat kept my words.",
      "Oh dear. For a whole week I have argued against my own sentence. I'm so ashamed."
     ],
     "opts": [
      "Everyone makes mistakes. What matters is what you do now.",
      "Yes, you should be ashamed. Everybody will laugh at you.",
      "Then maybe you should stop talking at the council."
     ],
     "a": 0,
     "speak": true,
     "wrong": "Ouch. That may be honest, but it isn't very kind.",
     "then": "You have the wisdom of someone much older, young traveler."
    },
    {
     "q": [
      "So tell me honestly. Can a stubborn old knight still admit that he was wrong?"
     ],
     "opts": [
      "Of course. Admitting a mistake when you learn something new is a strength.",
      "No. At your age, it's too late to change.",
      "Only if the other elders pay you for it."
     ],
     "a": 0,
     "wrong": "Hmph. I hope you're wrong about that."
    }
   ],
   "done": "Then I admit it: I was wrong. I'll tell the council myself, and I won't regret it."
  },
  {
   "npc": "elder2",
   "type": "line",
   "hint": "İkinci ağsaqqal nə isə etiraf etmək istəyir.",
   "say": [
    "So the old knight finally admits it! Yes, it's all true.",
    "Sixty years ago he taught me the words of the market, and I taught him the words of the library.",
    "That sentence about the door was his. I only kept it safe for him, in that old envelope.",
    "I never told anyone, because I hoped he would remember it himself one day. I don't regret waiting."
   ],
   "done": "Now go to the third elder. I think it's time to vote again."
  },
  {
   "npc": "elder3",
   "type": "build",
   "hint": "Üçüncü ağsaqqal son dəfə fikrini soruşur.",
   "say": [
    "The first elder has changed his mind. Before the second vote, I want to hear you once more.",
    "Every elder learns the language of one neighbour. Is that compromise fair? Say it clearly, and be honest about the difficulty."
   ],
   "answer": "The compromise is fair although it will be hard",
   "extra": [
    "stubborn",
    "doubt",
    "never",
    "because"
   ],
   "done": "Clear and honest. Thank you. Now the scribe will count the stones."
  },
  {
   "npc": "scribe",
   "type": "choice",
   "hint": "Katib qərarı kitaba yazmalıdır.",
   "say": [
    "Three white stones! Not a single black one. I haven't seen that in forty years.",
    "Now I must write the decision in the council book, in my finest handwriting, for the future.",
    "Which sentence should I write?"
   ],
   "opts": [
    "Every people will learn a neighbour's language, and the tower will speak with many voices.",
    "From now on, the tower will speak only one language.",
    "The council could not agree, so it will argue again next year."
   ],
   "a": 0,
   "done": "Beautiful. Now the council wants to hear your own story. Go to the second elder."
  },
  {
   "npc": "elder2",
   "type": "free",
   "hint": "Şuraya öz hekayəni danış.",
   "min": 25,
   "say": [
    "Traveler, before we ring the bell, tell the council about yourself. After such a journey, you deserve to be heard.",
    "Who are you? Why are you learning a foreign language? What will you do next?"
   ],
   "done": "Thank you, traveler. The council has decided: every people will learn. Ring the bell!"
  }
 ]
};
