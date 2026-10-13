// Sanity checks for js/content/<scene>.js:  node tools/check-content.mjs [scene]
// Every journal word must be heard on the way through the floor's tasks, ids must exist, answers must be valid.
const { SCENES } = await import("../js/content.js");
const which = process.argv[2] ? [process.argv[2]] : SCENES;
let bad = 0;
const err = (n, m) => { bad++; console.log(`${n}: ${m}`); };
for (const n of which) {
  const f = (await import(`../js/content/${n}.js?${Date.now()}`)).default;
  const ids = new Set(f.spots.map(s => s.id)), npcs = new Set(f.spots.filter(s => s.npc).map(s => s.id));
  if (f.words.length % 4) err(n, `words: ${f.words.length} is not a multiple of 4`);
  const ps = f.words.map(w => w.p); if (new Set(ps).size !== ps.length) err(n, "two words share a picture");
  const ws = f.words.map(w => w.w); if (new Set(ws).size !== ws.length) err(n, "duplicate word");
  if (f.spots.filter(s => s.exit).length !== 1) err(n, "need exactly one exit spot");
  const lines = [];
  f.tasks.forEach((t, i) => {
    const at = `task ${i} (${t.type})`;
    if (!npcs.has(t.npc)) err(n, `${at}: npc "${t.npc}" is not an npc spot`);
    lines.push(...(t.say || []), t.done || "");
    if (t.type === "fetch" && !ids.has(t.target)) err(n, `${at}: target "${t.target}" missing`);
    if (t.type === "fetch" && npcs.has(t.target)) err(n, `${at}: fetch target must be an object, not an npc`);
    if (t.type === "choice" && !(t.opts?.[t.a])) err(n, `${at}: bad a`);
    if (t.type === "choice") lines.push(...t.opts);
    if (t.type === "build") { if (!t.answer || !Array.isArray(t.extra)) err(n, `${at}: needs answer and extra`); lines.push(t.answer); }
    if (t.type === "talk") (t.turns || []).forEach((u, k) => { if (!u.opts?.[u.a]) err(n, `${at} turn ${k}: bad a`); lines.push(...(u.q || []), u.then || "", u.opts[u.a]); if (!t.turns.length) err(n, `${at}: no turns`); });
    if (t.type === "talk" && !(t.turns || []).length) err(n, `${at}: no turns`);
    if (t.type === "listen") { (t.qs || []).forEach((q, k) => { if (!q.opts?.[q.a]) err(n, `${at} q ${k}: bad a`); lines.push(q.q); }); if (!(t.qs || []).length) err(n, `${at}: no questions`); }
    if (!t.hint) err(n, `${at}: no hint`);
  });
  const forms = f.forms || {}, heard = new Set();
  for (const l of lines) for (const tok of l.toLowerCase().match(/[a-z']+/g) || []) heard.add(tok), forms[tok] && heard.add(forms[tok]);
  for (const w of ws) if (!heard.has(w)) err(n, `word "${w}" is never said in the tasks (add it or a form to a line)`);
  console.log(`${n}: ${f.words.length} words, ${f.tasks.length} tasks [${f.tasks.map(t => t.type).join(" ")}], ${npcs.size} characters`);
}
process.exit(bad ? 1 : 0);
