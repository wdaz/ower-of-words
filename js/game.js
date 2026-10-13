// Game logic for the 3D tower: state, dialogue, tasks, journal, speech.
// The 3D world lives in engine.js and floors/floorN.js; this file never touches Three.js directly.
import { FLOORS, SCENES } from "./content.js";
import { createEngine } from "./engine.js";
import { loadCharacters } from "./characters.js";

/* ======================= STATE ======================= */
const KEY="tower-of-words-3d-v2"; // v2: longer floors (more tasks, 4 journal pages)
const fresh=()=>({started:false,floor:0,rate:.9,f:FLOORS.map(()=>({task:0,talked:false,seen:[],guess:{},sealed:[],flags:[],free:""})),ended:false});
let S=fresh();
function load(d){if(d&&Array.isArray(d.f)&&d.f.length===FLOORS.length)S=Object.assign(fresh(),d);}
try{load(JSON.parse(localStorage.getItem(KEY)||"null"));}catch(e){}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}};
const F=()=>FLOORS[S.floor], FS=()=>S.f[S.floor];
const flags=()=>{const s=new Set(FS().flags);return s;};
const tasksDone=fi=>S.f[fi].task>=FLOORS[fi].tasks.length;
// the journal has one page per four words
const pagesOf=fi=>{const w=FLOORS[fi].words,p=[];for(let i=0;i<w.length;i+=4)p.push(w.slice(i,i+4));return p;};
const journalDone=fi=>S.f[fi].sealed.length===pagesOf(fi).length;
const exitOpen=fi=>tasksDone(fi)&&journalDone(fi);
const knownWord=(fi,w)=>pagesOf(fi).some((p,i)=>S.f[fi].sealed.includes(i)&&p.some(x=>x.w===w));

/* ======================= VOICE OUT ======================= */
let voice=null;
function pickVoice(){const vs=(window.speechSynthesis&&speechSynthesis.getVoices())||[];voice=vs.find(v=>/en[-_](US|GB)/i.test(v.lang)&&/Google|Natural|Samantha|Daniel|Aria|Jenny/i.test(v.name))||vs.find(v=>/^en/i.test(v.lang))||null;}
if(window.speechSynthesis){pickVoice();speechSynthesis.onvoiceschanged=pickVoice;}
// who is speaking right now, so their character can move its mouth and gesture
let talkTimer=null;
function talking(id,ms){engineRef&&engineRef.setTalking(id);clearTimeout(talkTimer);if(id&&ms)talkTimer=setTimeout(()=>engineRef&&engineRef.setTalking(null),ms);}
let engineRef=null;
function speak(text,rate,who){
  const est=Math.max(900,text.split(/\s+/).length*420/(rate||S.rate));
  talking(who||null,who?est:0);
  if(!window.speechSynthesis)return;
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-US";if(voice)u.voice=voice;u.rate=rate||S.rate;
  if(who){u.onstart=()=>talking(who,est*1.5);u.onend=()=>talking(null);}
  speechSynthesis.speak(u);
}

/* ======================= VOICE IN ======================= */
const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
let micBroken=!SR;
function listenOnce(onText,onEnd){
  const r=new SR();r.lang="en-US";r.interimResults=true;r.continuous=false;let fin="";
  r.onresult=e=>{let t="";for(const res of e.results)t+=res[0].transcript;fin=t;onText(t);};
  r.onerror=e=>{if(["not-allowed","service-not-allowed","audio-capture"].includes(e.error))micBroken=true;onEnd(e.error,fin);};
  r.onend=()=>onEnd(null,fin);
  try{r.start();}catch(e){micBroken=true;onEnd("start","");}
  return r;
}
const norm=s=>s.toLowerCase().replace(/[’']/g,"'").replace(/\bi'm\b/g,"i am").replace(/\bit's\b/g,"it is").replace(/\bwon't\b/g,"will not").replace(/\bcan't\b/g,"cannot").replace(/\bi've\b/g,"i have").replace(/\bi'll\b/g,"i will").replace(/[^a-z' ]+/g," ").trim().split(/\s+/).filter(Boolean);
/* Word-level longest common subsequence: order matters, small slips are forgiven. */
function scoreSpeech(target,heard){
  const a=norm(target),b=norm(heard);
  const L=Array.from({length:a.length+1},()=>new Array(b.length+1).fill(0));
  for(let i=a.length-1;i>=0;i--)for(let j=b.length-1;j>=0;j--)L[i][j]=a[i]===b[j]?1+L[i+1][j+1]:Math.max(L[i+1][j],L[i][j+1]);
  const hit=new Array(a.length).fill(false);
  for(let i=0,j=0;i<a.length&&j<b.length;){if(a[i]===b[j]){hit[i]=true;i++;j++;}else if(L[i+1][j]>=L[i][j+1])i++;else j++;}
  return {score:a.length?L[0][0]/a.length:0,words:a,hit};
}
const PASS=.75;

/* ======================= DOM HELPERS ======================= */
const $=h=>{const t=document.createElement("template");t.innerHTML=h.trim();return t.content.firstElementChild;};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const stage=document.getElementById("stage"),dialog=document.getElementById("dialog"),quest=document.getElementById("quest"),layer=document.getElementById("layer");

/* words in a line: key words are underlined; seeing them notes them in the journal */
function lineEl(text){
  const fl=F(),fi=S.floor,keys=new Map(fl.words.map(x=>[x.w,x]));
  const p=document.createElement("p");p.className="line";
  text.split(/(\s+)/).forEach(tok=>{
    if(/^\s+$/.test(tok)||!tok){p.append(tok);return;}
    const m=tok.match(/^([A-Za-z']+)(.*)$/);if(!m){p.append(tok);return;}
    const lw=m[1].toLowerCase(),base=keys.has(lw)?lw:(fl.forms&&fl.forms[lw]);
    if(base&&keys.has(base)){
      if(!FS().seen.includes(base)){FS().seen.push(base);save();updateCount();}
      const b=$(`<button class="k${knownWord(fi,base)?" known":""}" title="Dəftərə yazıldı">${esc(m[1])}</button>`);
      b.onclick=()=>speak(m[1]);p.append(b);
      if(knownWord(fi,base))p.append($(`<span class="g">${esc(keys.get(base).az)}</span>`));
    }else{const b=$(`<button class="k" style="border-bottom-color:transparent">${esc(m[1])}</button>`);b.onclick=()=>speak(m[1]);p.append(b);}
    p.append(m[2]);
  });
  return p;
}

/* ======================= SCENE ======================= */
await loadCharacters(); // rigged people; falls back to the procedural ones if this fails
const engine=createEngine(stage,{onSpot:id=>clickSpot(id)});engineRef=engine;
const floorMods={};
async function floorModule(i){
  if(floorMods[i])return floorMods[i];
  try{floorMods[i]=(await import(`./floors/${SCENES[i]}.js`)).default;}
  catch(e){console.warn("floor",i+1,"not built yet, using placeholder",e);floorMods[i]=placeholderFloor(i);}
  return floorMods[i];
}
// Stand-in scene so the game stays playable while a floor's art is being made.
function placeholderFloor(i){
  return {sky:{top:"#9aa",bottom:"#ccd"},groundColor:"#556",build(k,api){
    FLOORS[i].spots.forEach((s,n)=>{const x=-10+n*(20/Math.max(1,FLOORS[i].spots.length-1));
      const o=s.npc?k.figure({robe:"#88a"}):k.box(1,1,1,s.exit?"#c84":"#aa8");o.position.x=x;o.position.z=-2;api.spot(s.id,o);});}};
}
function sceneState(){const st=flags();st.open=exitOpen(S.floor);return st;}
let loadedFloor=-1;
async function renderScene(){
  if(loadedFloor!==S.floor){const fi=S.floor,mod=await floorModule(fi);if(fi!==S.floor)return;engine.loadFloor(mod,sceneState());loadedFloor=fi;}
  else engine.refresh(sceneState());
  const t=F().tasks[FS().task],ids=[];
  if(t&&!FS().talked)ids.push(t.npc);
  if(exitOpen(S.floor))ids.push(F().spots.find(s=>s.exit).id);
  engine.setMarkers(ids);
}

/* ======================= QUEST BAR ======================= */
function renderQuest(){
  const fl=F(),fs=FS(),t=fl.tasks[fs.task];
  let text;
  if(t) text=fs.talked&&t.doHint?t.doHint:t.hint;
  else if(!journalDone(S.floor)) text=`Dəftəri aç: ${pagesOf(S.floor).length-fs.sealed.length} səhifəni deşifrə et. Sözləri personajların danışığından topladın.`;
  else text=S.floor===FLOORS.length-1?"Zəngi çal.":"Yol açıqdır. Yuxarı qalx.";
  quest.innerHTML=`<span class="label">${esc(fl.people)} · ${fl.cefr}</span><span class="place">${esc(fl.name)}</span><span class="text">${esc(text)}</span>`;
  const fb=document.getElementById("floors");fb.innerHTML="";
  FLOORS.forEach((_,i)=>fb.appendChild($(`<span class="${i===S.floor?"on":exitOpen(i)?"done":""}" style="height:${10+i*5}px" title="${esc(FLOORS[i].name)}"></span>`)));
}
function updateCount(){const fs=FS();document.getElementById("jcount").textContent=fs.seen.length+"/"+F().words.length;}

/* ======================= DIALOGUE ======================= */
function speakerHead(name,lines,who){
  const h=$(`<div class="who"><b>${esc(name)}</b><span class="tools"><button class="icon" aria-label="Dinlə">▶</button><button class="icon" aria-label="Yavaş dinlə">🐢</button></span></div>`);
  const all=lines.join(" ");
  const [p1,p2]=h.querySelectorAll("button");p1.onclick=()=>speak(all,0,who);p2.onclick=()=>speak(all,.65,who);
  return h;
}
function showLines(name,lines,after,who){
  who=who||(F().spots.find(s=>s.npc&&s.npc===name)||{}).id;
  dialog.innerHTML="";dialog.appendChild(speakerHead(name,lines,who));
  lines.forEach(l=>dialog.appendChild(lineEl(l)));
  speak(lines.join(" "),0,who);
  if(after)after(dialog);
}
function say(text){dialog.innerHTML="";dialog.appendChild($(`<p class="hint">${esc(text)}</p>`));}

function clickSpot(id){
  const fl=F(),fs=FS(),sp=fl.spots.find(s=>s.id===id),t=fl.tasks[fs.task];
  if(sp.exit){
    if(exitOpen(S.floor)){ return S.floor===FLOORS.length-1?ending():climb(); }
    const why=!tasksDone(S.floor)?sp.locked:"Yol hələ bağlıdır: dəftərdə deşifrə olunmamış səhifələr var.";
    return showLines(sp.npc||"",[why].filter(x=>/^[A-Z]/.test(x)&&!/[əğış]/.test(x)),d=>{if(/[əğış]/.test(why))d.appendChild($(`<p class="hint">${esc(why)}</p>`));});
  }
  // active fetch task: was this the thing they asked for?
  if(t&&fs.talked&&t.type==="fetch"&&!sp.npc){
    if(id===t.target){ if(t.flag)fs.flags.push(t.flag); completeTask(t); return; }
  }
  if(sp.npc){
    if(t&&t.npc===id){ fs.talked=true; save(); renderQuest(); renderScene(); return runTask(t,sp); }
    const idle=sp.idle||["…"]; return showLines(sp.npc,[idle[Math.floor(Math.random()*idle.length)]]);
  }
  // plain object: read its sign / label
  dialog.innerHTML="";
  dialog.appendChild(speakerHead("",[sp.label]));
  dialog.firstElementChild.querySelector("b").textContent="";
  const p=lineEl(sp.label);p.classList.add("sign");dialog.appendChild(p);
  speak(sp.label.replace("·",","));
  if(t&&fs.talked&&t.type==="fetch") dialog.appendChild($(`<p class="hint">Bu deyil. Onun nə istədiyini yenidən dinlə.</p>`));
}

function runTask(t,sp){
  const lines=t.type==="talk"?[...(t.say||[]),...(t.turns[0].q||[])]:t.say;
  showLines(sp.npc,lines,d=>{
    if(t.type==="fetch") d.appendChild($(`<p class="hint">${esc(t.doHint)}</p>`));
    if(t.type==="line"){const b=$(`<button class="btn primary">Anladım</button>`);b.onclick=()=>completeTask(t);d.appendChild($(`<div class="row"></div>`)).appendChild(b);}
    if(t.type==="choice") choiceUI(t,d);
    if(t.type==="build") buildUI(t,d);
    if(t.type==="free") freeUI(t,d);
    if(t.type==="talk") talkUI(t,sp,d,0);
    if(t.type==="listen") listenUI(t,d);
  });
}

// A conversation of several turns: the character says something, you pick what to answer.
// turn: {q:[lines], opts:[...], a:index, wrong:"their reply to a wrong answer", speak:true to say it aloud}
// t.say opens the talk; each turn's q follows on screen. After the last turn the task is done.
function talkUI(t,sp,d,k){
  const turn=t.turns[k];
  if(k>0){(turn.q||[]).forEach(l=>d.appendChild(lineEl(l)));speak((turn.q||[]).join(" "),0,sp.id);} // turn 0 is shown by runTask
  d.appendChild($(`<p class="hint">Cavabını seç (${k+1}/${t.turns.length}).</p>`));
  const box=$(`<div class="opts"></div>`),msg=$(`<div class="msg"></div>`);
  const next=()=>{
    if(k+1>=t.turns.length)return completeTask(t);
    dialog.innerHTML="";dialog.appendChild(speakerHead(sp.npc,t.turns[k+1].q||[],sp.id));
    if(turn.then){dialog.appendChild(lineEl(turn.then));}
    if(turn.then)speak(turn.then,0,sp.id);
    setTimeout(()=>talkUI(t,sp,dialog,k+1),turn.then?Math.max(900,turn.then.split(/\s+/).length*420/S.rate):0);
  };
  turn.opts.map((o,i)=>[o,i]).sort(()=>Math.random()-.5).forEach(([o,i])=>{
    const b=$(`<button class="opt">${esc(o)}</button>`);
    b.onclick=()=>{
      speak(o);
      if(i!==turn.a){b.classList.add("wrong");msg.className="msg bad";msg.innerHTML="";
        if(turn.wrong){msg.appendChild(lineEl(turn.wrong));setTimeout(()=>speak(turn.wrong,0,sp.id),900);}
        msg.appendChild($(`<span class="hint">Bu cavab uyğun gəlmir. Yenə seç.</span>`));return;}
      box.remove();msg.remove();
      if(turn.speak){speakUI(o,d,next);return;}
      setTimeout(next,900);
    };
    box.appendChild(b);
  });
  d.append(box,msg);
}

// Listening: a longer speech, then questions about what you heard.
// t.qs: [{q:"question (English)", az:"optional hint in Azerbaijani", opts:[...], a:index}]
function listenUI(t,d){
  let k=0;
  const area=$(`<div class="stack" style="display:flex;flex-direction:column;gap:8px"></div>`);d.appendChild(area);
  const ask=()=>{
    if(k>=t.qs.length)return completeTask(t);
    const q=t.qs[k];area.innerHTML="";
    area.appendChild($(`<p class="hint">Sual ${k+1}/${t.qs.length}${q.az?` · ${esc(q.az)}`:""}</p>`));
    area.appendChild(lineEl(q.q));
    const box=$(`<div class="opts"></div>`),msg=$(`<p class="msg"></p>`);
    q.opts.map((o,i)=>[o,i]).sort(()=>Math.random()-.5).forEach(([o,i])=>{
      const b=$(`<button class="opt">${esc(o)}</button>`);
      b.onclick=()=>{if(i===q.a){k++;setTimeout(ask,500);}else{b.classList.add("wrong");msg.className="msg bad";msg.textContent="Yox. ▶ ilə yenidən dinlə.";}};
      box.appendChild(b);
    });
    area.append(box,msg);
  };
  ask();
}
function completeTask(t){
  const fs=FS(),fl=F();
  if(t.flagAfter)fs.flags.push(t.flagAfter);
  fs.task++;fs.talked=false;save();
  renderScene();renderQuest();engine.cheer(t.npc);
  const sp=fl.spots.find(s=>s.id===t.npc);
  if(t.done) showLines(sp.npc,[t.done],d=>{
    if(tasksDone(S.floor)&&!journalDone(S.floor)){const b=$(`<button class="btn primary">Dəftəri aç</button>`);b.onclick=openJournal;d.appendChild($(`<div class="row"></div>`)).appendChild(b);}
  });
}

function choiceUI(t,d){
  const box=$(`<div class="opts"></div>`),msg=$(`<p class="msg"></p>`);
  t.opts.map((o,i)=>[o,i]).sort(()=>Math.random()-.5).forEach(([o,i])=>{
    const b=$(`<button class="opt">${esc(o)}</button>`);
    b.onclick=()=>{speak(o);if(i===t.a)setTimeout(()=>completeTask(t),900);else{b.classList.add("wrong");msg.className="msg bad";msg.textContent="Yox, bir daha dinlə.";}};
    box.appendChild(b);
  });
  d.append(box,msg);
}

function buildUI(t,d){
  const target=t.answer.split(" ");
  const pool=[...target,...t.extra].map((w,i)=>({w,i})).sort(()=>Math.random()-.5);
  let built=[];
  d.appendChild($(`<p class="hint">Cavabı sözlərdən qur, sonra ucadan de.</p>`));
  const area=$(`<div class="built" aria-label="Sənin cümlən"></div>`),tiles=$(`<div class="tiles"></div>`),msg=$(`<p class="msg"></p>`);
  const row=$(`<div class="row"><button class="btn">Təmizlə</button><button class="btn primary">Yoxla</button></div>`);
  const draw=()=>{
    area.innerHTML="";built.forEach((x,k)=>{const b=$(`<button class="tile">${esc(x.w)}</button>`);b.onclick=()=>{built.splice(k,1);draw();};area.appendChild(b);});
    tiles.innerHTML="";pool.forEach(x=>{const b=$(`<button class="tile${built.includes(x)?" used":""}">${esc(x.w)}</button>`);b.onclick=()=>{built.push(x);speak(x.w);draw();};tiles.appendChild(b);});
  };
  const [clr,chk]=row.querySelectorAll("button");
  clr.onclick=()=>{built=[];draw();};
  chk.onclick=()=>{
    const s=built.map(x=>x.w).join(" ");
    if(norm(s).join(" ")===norm(t.answer).join(" ")){ msg.className="msg ok";msg.textContent="Doğrudur! İndi bunu ucadan de.";area.remove();tiles.remove();row.remove();speakUI(t.answer,d,()=>completeTask(t)); }
    else{msg.className="msg bad";msg.textContent=built.length<target.length?"Cümlə tam deyil.":"Söz sırası və ya sözlər səhvdir.";}
  };
  draw();d.append(area,tiles,row,msg);
}

function speakUI(target,d,onPass){
  const box=$(`<div class="stack" style="display:flex;flex-direction:column;gap:10px"><p class="line" style="font-size:1.4rem">“${esc(target)}”</p><div class="row act"></div><p class="heard"></p><div class="meter"><i></i></div><p class="msg"></p></div>`);
  const act=box.querySelector(".act"),heard=box.querySelector(".heard"),bar=box.querySelector(".meter i"),msg=box.querySelector(".msg");
  const play=$(`<button class="icon" aria-label="Nümunəni dinlə">▶</button>`);play.onclick=()=>speak(target);
  const judge=text=>{
    const r=scoreSpeech(target,text);
    heard.innerHTML=r.words.map((w,k)=>`<span class="${r.hit[k]?"hit":"miss"}">${esc(w)}</span>`).join(" ");
    bar.style.width=Math.round(r.score*100)+"%";
    if(r.score>=PASS){msg.className="msg ok";msg.textContent=`Səni anladılar (${Math.round(r.score*100)}%).`;setTimeout(onPass,1100);}
    else{msg.className="msg bad";msg.textContent=`${Math.round(r.score*100)}%. Qırmızı sözlərə diqqət et və yenə de.`;}
  };
  const build=()=>{
    act.innerHTML="";
    if(!micBroken){
      const mic=$(`<button class="mic" aria-label="Danış">🎙</button>`);let rec=null;
      mic.onclick=()=>{
        if(rec){rec.stop();return;}
        window.speechSynthesis&&speechSynthesis.cancel();mic.classList.add("live");heard.textContent="Dinləyirəm…";
        rec=listenOnce(t=>heard.textContent=t,(err,fin)=>{
          mic.classList.remove("live");rec=null;
          if(micBroken){build();return;}
          if(fin)judge(fin);else{msg.className="msg bad";msg.textContent=err&&err!=="no-speech"?"Səs alınmadı: "+err:"Heç nə eşidilmədi. Bas və danış.";}
        });
      };
      act.append(mic,play,$(`<span class="hint">Mikrofona bas və cümləni de.</span>`));
    }else{
      const inp=$(`<input type="text" id="say-${S.floor}-${FS().task}" placeholder="Ucadan de, sonra dediyini yaz…" autocomplete="off">`);inp.classList.add("flex1");
      const ok=$(`<button class="btn primary">Yoxla</button>`);ok.onclick=()=>judge(inp.value);inp.onkeydown=e=>{if(e.key==="Enter")judge(inp.value);};
      act.append(play,inp,ok);
      act.after($(`<p class="note">Bu pəncərə mikrofona icazə vermir. Cümləni ucadan de və yaz. Mikrofon oyunun öz saytında (GitHub Pages / Vercel) işləyəcək.</p>`));
    }
  };
  build();d.appendChild(box);
}

function freeUI(t,d){
  const fs=FS();
  const box=$(`<div style="display:flex;flex-direction:column;gap:10px"><p class="hint">Ən azı ${t.min} söz. Səhvlərdən qorxma: məqsəd axıcılıqdır. Fikir: “My name is… I work as… I am learning English because… Next year I want to…”</p><div class="row act"></div><textarea id="free-talk" placeholder="Danışdıqların burada görünəcək…"></textarea><div class="row"><span class="msg flex1"></span><button class="btn primary">Şuraya təqdim et</button></div></div>`);
  const ta=box.querySelector("textarea"),msg=box.querySelector(".msg"),send=box.querySelector(".btn.primary"),act=box.querySelector(".act");
  ta.value=fs.free;
  const upd=()=>{fs.free=ta.value;save();const n=ta.value.trim()?ta.value.trim().split(/\s+/).length:0;msg.textContent=`${n} söz`+(n>=t.min?" ✓":"");msg.className="msg flex1"+(n>=t.min?" ok":"");send.disabled=n<t.min;};
  ta.oninput=upd;upd();
  if(!micBroken){
    const mic=$(`<button class="mic" aria-label="Danış">🎙</button>`);let rec=null;
    mic.onclick=()=>{if(rec){rec.stop();return;}mic.classList.add("live");const base=ta.value.trim();rec=listenOnce(x=>{ta.value=(base?base+" ":"")+x;},()=>{mic.classList.remove("live");rec=null;upd();});};
    act.append(mic,$(`<span class="hint">Bas, danış, dayan. Yenidən basıb davam et.</span>`));
  }
  const rd=$(`<button class="btn">▶ Mətnimi oxu</button>`);rd.onclick=()=>speak(ta.value);act.append(rd);
  send.onclick=()=>completeTask(t);
  d.appendChild(box);
}

/* ======================= JOURNAL ======================= */
let jTab=null,picking=null;
function openJournal(){jTab=S.floor;picking=null;drawJournal();}
function drawJournal(){
  layer.innerHTML="";
  const ov=$(`<div class="overlay" role="dialog" aria-modal="true" aria-label="Dəftər"></div>`),sh=$(`<div class="sheet"></div>`);ov.appendChild(sh);
  ov.onclick=e=>{if(e.target===ov)closeLayer();};
  sh.appendChild($(`<div class="row"><h2 class="flex1">Səyyahın dəftəri</h2><button class="btn" id="jclose">Bağla</button></div>`));
  sh.querySelector("#jclose").onclick=closeLayer;
  const tabs=$(`<div class="tabs" role="tablist"></div>`);
  FLOORS.forEach((fl,i)=>{if(i>S.floor)return;const b=$(`<button role="tab" aria-selected="${i===jTab}">${esc(fl.name)}</button>`);b.onclick=()=>{jTab=i;picking=null;drawJournal();};tabs.appendChild(b);});
  sh.appendChild(tabs);
  const fi=jTab,fs=S.f[fi],words=FLOORS[fi].words;
  sh.appendChild($(`<p class="hint">Personajların danışığında altından xətt çəkilmiş sözlər bura yazılır. Hər sözün xanasına toxun və mənasına uyğun şəkli seç. Səhifənin 4 sözü də doğru olanda səhifə möhürlənir və tərcümə açılır.</p>`));
  const pages=$(`<div class="pages"></div>`);
  pagesOf(fi).forEach((pg,pi)=>{
    const sealed=fs.sealed.includes(pi);
    const el=$(`<div class="page${sealed?" sealed":""}"><h3>Səhifə ${pi+1}${sealed?"<small>Deşifrə edildi</small>":""}</h3></div>`);
    pg.forEach(x=>{
      const seen=fs.seen.includes(x.w),g=sealed?x.p:fs.guess[x.w];
      const e=$(`<div class="entry"><button class="slot${g?" filled":""}${picking===x.w?" picking":""}">${g||""}</button><div class="w${seen?"":" unknown"}">${seen?esc(x.w):"· · ·"}${sealed?`<span class="az">${esc(x.az)}</span>`:""}</div></div>`);
      const slot=e.querySelector(".slot");
      slot.setAttribute("aria-label",seen?`${x.w}: şəkil seç`:"Hələ tapılmayıb");
      if(sealed||!seen)slot.disabled=true;else slot.onclick=()=>{picking=picking===x.w?null:x.w;speak(x.w);drawJournal();};
      if(seen){e.querySelector(".w").style.cursor="pointer";e.querySelector(".w").onclick=()=>speak(x.w);}
      el.appendChild(e);
    });
    if(!sealed){
      const allSeen=pg.every(x=>fs.seen.includes(x.w)),allSet=pg.every(x=>fs.guess[x.w]);
      const msg=$(`<p class="msg"></p>`),chk=$(`<button class="btn primary">Səhifəni yoxla</button>`);
      chk.disabled=!(allSeen&&allSet);
      if(!allSeen){msg.className="msg";msg.innerHTML=`<span class="hint">Bu səhifənin bütün sözlərini hələ eşitməmisən.</span>`;}
      chk.onclick=()=>{
        const wrong=pg.filter(x=>fs.guess[x.w]!==x.p).length;
        if(!wrong){fs.sealed.push(pi);save();pg.forEach((x,i)=>setTimeout(()=>speak(x.w),i*800));drawJournal();renderQuest();renderScene();return;}
        msg.className="msg bad";msg.textContent=wrong===1?"Az qaldı: yalnız bir söz səhvdir.":"Hələ deyil. Bəzi mənalar səhvdir.";
      };
      el.append(chk,msg);
    }
    pages.appendChild(el);
  });
  sh.appendChild(pages);
  if(fs.sealed.length<pagesOf(fi).length){
    const used=new Set(Object.values(fs.guess));
    const pal=$(`<div class="page"><p class="hint">${picking?`<b>${esc(picking)}</b> üçün şəkil seç:`:"Şəkillər. Əvvəlcə bir sözün xanasına toxun."}</p><div class="palette"></div></div>`);
    [...words].sort((a,b)=>a.p<b.p?-1:1).forEach(x=>{
      const b=$(`<button class="pict${used.has(x.p)?" used":""}">${x.p}</button>`);b.disabled=!picking;
      b.onclick=()=>{for(const k in fs.guess)if(fs.guess[k]===x.p)delete fs.guess[k];fs.guess[picking]=x.p;picking=null;save();drawJournal();};
      pal.querySelector(".palette").appendChild(b);
    });
    sh.appendChild(pal);
  }else if(fi===S.floor&&exitOpen(fi)){
    sh.appendChild($(`<p class="msg ok">Bu mərtəbənin dili deşifrə edildi. Çıxış açıqdır.</p>`));
  }
  layer.appendChild(ov);
}
function closeLayer(){layer.innerHTML="";}

/* ======================= FLOW ======================= */
function story(){
  const fl=F();
  layer.innerHTML="";
  const ov=$(`<div class="overlay"><div class="sheet center"><p class="hint" style="letter-spacing:.14em;text-transform:uppercase">Mərtəbə ${S.floor+1} · ${fl.cefr}</p><h2>${esc(fl.name)}</h2><p>${esc(fl.story)}</p><button class="btn primary">Daxil ol</button></div></div>`);
  ov.querySelector("button").onclick=()=>{closeLayer();S.started=true;save();say("Yerə toxunaraq gəz, personajlara və əşyalara toxunaraq danış. Parlayan almaz kiminlə danışmalı olduğunu göstərir. Klaviaturada W A S D da işləyir.");};
  layer.appendChild(ov);
}
function climb(){S.floor++;save();renderAll();story();}
function ending(){
  S.ended=true;save();speak("Thank you, traveler. Now every people of the tower will learn.");
  const learned=S.f.reduce((n,f,i)=>n+pagesOf(i).filter((_,k)=>f.sealed.includes(k)).flat().length,0);
  layer.innerHTML="";
  const ov=$(`<div class="overlay"><div class="sheet center"><h2>Qüllə danışır</h2><p>Zəng çaldı və bütün xalqlar bir-birini eşitdi. Sən ${learned} söz deşifrə etdin, ${FLOORS.length} xalqla danışdın və Şuraya öz hekayəni danışdın. A2-dən B1-ə yol belə keçir: hər gün bir az dinlə, bir az danış.</p><div class="row" style="justify-content:center"><button class="btn" id="again">Yenidən başla</button><button class="btn primary" id="stay">Qüllədə qal</button></div></div></div>`);
  ov.querySelector("#again").onclick=()=>{S=fresh();save();renderAll();story();};
  ov.querySelector("#stay").onclick=closeLayer;
  layer.appendChild(ov);
}
function menu(){
  layer.innerHTML="";
  const ov=$(`<div class="overlay"><div class="sheet"><div class="row"><h2 class="flex1">Menyu</h2><button class="btn" id="mclose">Bağla</button></div>
    <label class="row" for="rate">Danışıq sürəti <input id="rate" class="flex1" type="range" min="0.6" max="1.1" step="0.05" value="${S.rate}"></label>
    <p class="hint">Mərtəbələr (keçdiyin mərtəbələrə qayıda bilərsən):</p><div class="tabs" id="mfloors"></div>
    <div class="row"><button class="btn" id="mreset">Oyunu sıfırla</button></div></div></div>`);
  ov.onclick=e=>{if(e.target===ov)closeLayer();};
  ov.querySelector("#mclose").onclick=closeLayer;
  ov.querySelector("#rate").oninput=e=>{S.rate=+e.target.value;save();};
  const mf=ov.querySelector("#mfloors");
  FLOORS.forEach((fl,i)=>{const b=$(`<button aria-selected="${i===S.floor}">${i+1}. ${esc(fl.name)}</button>`);b.disabled=!(i===0||exitOpen(i-1));b.onclick=()=>{S.floor=i;save();closeLayer();renderAll();say("Səhnədəki personajlara toxun.");};mf.appendChild(b);});
  let armed=false;ov.querySelector("#mreset").onclick=e=>{if(!armed){armed=true;e.target.textContent="Əminsən? Yenidən bas";return;}S=fresh();save();renderAll();story();};
  layer.appendChild(ov);
}
function renderAll(){document.body.dataset.floor=S.floor+1;document.body.dataset.scene=SCENES[S.floor];renderScene();renderQuest();updateCount();say("Yerə toxunaraq gəz, personajlara və əşyalara toxunaraq danış. Parlayan almaz kiminlə danışmalı olduğunu göstərir. Klaviaturada W A S D da işləyir.");}
document.getElementById("journalBtn").onclick=openJournal;
// the dialogue sits over the scene; it can be hidden to look around, and comes back when someone speaks
const dlgToggle=document.getElementById("dlgToggle");
const setDialogHidden=h=>{dialog.classList.toggle("hidden",h);dlgToggle.textContent=h?"Mətni göstər":"Mətni gizlət";dlgToggle.setAttribute("aria-expanded",String(!h));};
dlgToggle.onclick=()=>setDialogHidden(!dialog.classList.contains("hidden"));
new MutationObserver(()=>setDialogHidden(false)).observe(dialog,{childList:true});
document.getElementById("menuBtn").onclick=menu;

window.claude?.hot?.snapshot?.(()=>S);
// handle for tests and debugging
window.TOWER={get S(){return S;},FLOORS,F,FS,tasksDone,exitOpen,openJournal,engine,setMicBroken(v){micBroken=v;},clickSpot,save,renderAll};
function start(d){if(d&&d.f)load(d);renderAll();if(!S.started)story();}
window.claude?.hot?.ready?window.claude.hot.ready(start):start(window.claude?.hot?.data??{});
