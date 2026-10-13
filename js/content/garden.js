// The Garden: story, words and tasks. Spot ids must match js/floors/garden.js.
export default {
 "name": "The Garden", "people": "Şəfaçılar", "cefr": "B1",
 "story": "…",
 "words": [{"w":"hello","p":"👋","az":"salam"},{"w":"room","p":"🛏️","az":"otaq"},{"w":"tea","p":"🍵","az":"çay"},{"w":"tired","p":"😩","az":"yorğun"}],
 "forms": {},
 "spots": [{"id":"host","npc":"Host","idle":["Hello."]},{"id":"stairs","exit":true,"locked":"Not yet."}],
 "tasks": [{"npc":"host","type":"line","hint":"Danış.","say":["Hello, tired traveler. A room and some tea?"],"done":"Good."}]
};
