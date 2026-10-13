// The Observatory. An open-air terrace at the top of the tower, under the night sky.
// Spot ids (must match content.js): map, apprentice, telescope, astronomer, small, bright, red, ladder
const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// hide/show an object and every mesh in it (the engine's picker checks each hit mesh's own visibility)
function setVis(obj, v) { if (obj) obj.traverse(o => { o.visible = v; }); }

let glowTexCache = null;
function glowTexture(THREE) {
  if (glowTexCache) return glowTexCache;
  const c = document.createElement("canvas"); c.width = c.height = 64;
  const g = c.getContext("2d"), grd = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grd.addColorStop(0, "rgba(255,255,255,1)"); grd.addColorStop(0.25, "rgba(255,255,255,0.55)");
  grd.addColorStop(1, "rgba(255,255,255,0)");
  g.fillStyle = grd; g.fillRect(0, 0, 64, 64);
  glowTexCache = new THREE.CanvasTexture(c); glowTexCache.colorSpace = THREE.SRGBColorSpace;
  return glowTexCache;
}
function glow(THREE, color, size, opacity = 1) {
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTexture(THREE), color, transparent: true, opacity, depthWrite: false, blending: THREE.AdditiveBlending, fog: false }));
  sp.scale.set(size, size, size);
  return sp;
}
const skyMat = (THREE, color) => new THREE.MeshBasicMaterial({ color, fog: false });

export default {
  sky: { top: "#2b3a7a", bottom: "#0b1030" },
  fog: { color: "#121840", near: 20, far: 60 },
  groundColor: "#0e122e",
  light: { sky: "#7f8fe0", ground: "#1a1030", hemi: 0.75, sun: "#b9c8ff", sunIntensity: 1.0, sunPos: [-10, 14, 7] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [0, 3];
    // we are at the top of the tower: hide the engine's endless ground so the night sky shows past the parapet
    api.scene.children.forEach(o => { if (o.isMesh && o.geometry?.parameters?.width === 200) o.visible = false; });
    const STONE = "#1a2148", DARK = "#11163a", GOLD = "#f4c95d", BRASS = "#c7a76a";

    // terrace floor: deep-blue flagstones in a checker of two tones
    const mass = k.box(27.4, 4, 16, "#141a3e"); mass.position.set(0, -4, 1.6); api.add(mass);
    for (let i = 0; i < 13; i++) for (let j = 0; j < 7; j++) {
      const s = k.box(1.95, 0.06, 1.95, (i + j) % 2 ? "#1d2550" : "#232c5c");
      s.position.set(-12 + i * 2, 0, -4.5 + j * 2); api.add(s);
    }
    // a gold inlaid ring in the middle of the terrace (a sundial / star circle)
    const ring = new THREE.Mesh(new THREE.RingGeometry(2.1, 2.25, 40), k.mat(GOLD));
    ring.rotation.x = -Math.PI / 2; ring.position.set(0.5, 0.07, 0.4); api.add(ring);

    // the parapet at the back, with crenels and slim pillars carrying lamps
    const para = k.box(28, 1.1, 0.7, STONE); para.position.set(0, 0, -5.4); api.add(para);
    const coping = k.box(28.4, 0.16, 0.9, DARK); coping.position.set(0, 1.1, -5.4); api.add(coping);
    for (let x = -13; x <= 13; x += 1.6) { const c = k.box(0.7, 0.45, 0.7, STONE); c.position.set(x, 1.26, -5.4); api.add(c); }
    // side parapets
    [-13, 13].forEach(x => { const s = k.box(0.7, 1.1, 12, STONE); s.position.set(x, 0, 0.6); api.add(s); });
    // pillars (as in the 2D scene) with small gold finials
    [-10.5, -6.5, 1.8, 6].forEach(x => {
      const p = k.box(0.6, 3.0, 0.6, "#2c3672"); p.position.set(x, 0, -5.3); api.add(p);
      const pc = k.box(0.8, 0.14, 0.8, "#3a4486"); pc.position.set(x, 3.0, -5.3); api.add(pc);
      const f = k.sphere(0.18, GOLD, 8); f.position.set(x, 3.3, -5.3); api.add(f);
    });

    // warm lamps on posts: little lanterns with a point light each
    [[-6.6, -3.8], [5.6, -3.8], [-9.5, 3.4]].forEach(([x, z]) => {
      const post = k.cylinder(0.06, 0.08, 1.9, "#3a2a1c", 6); post.position.set(x, 0, z); api.add(post);
      const lamp = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), new THREE.MeshBasicMaterial({ color: "#ffd68a" }));
      lamp.position.set(x, 2.05, z); api.add(lamp);
      const cap = k.cone(0.24, 0.22, DARK, 6); cap.position.set(x, 2.15, z); api.add(cap);
      const halo = glow(THREE, "#ffb050", 1.4, 0.7); halo.position.set(x, 2.05, z); api.add(halo);
      const pl = new THREE.PointLight("#ffb563", 9, 9, 1.6); pl.position.set(x, 2.1, z); api.add(pl);
    });

    // background star field (not clickable), on a far dome above the horizon
    const N = 420, pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      const az = (Math.random() - 0.5) * Math.PI * 1.3, el = -0.12 + Math.pow(Math.random(), 1.3) * 0.8, r = 85;
      pos[i * 3] = Math.sin(az) * Math.cos(el) * r; pos[i * 3 + 1] = Math.sin(el) * r; pos[i * 3 + 2] = -Math.cos(az) * Math.cos(el) * r;
    }
    const sg = new THREE.BufferGeometry(); sg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const starMat = new THREE.PointsMaterial({ color: "#dfe6ff", size: 2.2, sizeAttenuation: false, fog: false, transparent: true, opacity: 0.85 });
    api.add(new THREE.Points(sg, starMat)); api.starMat = starMat;
    // a crescent moon low on the left
    const moon = new THREE.Mesh(new THREE.CircleGeometry(1.4, 24), skyMat(THREE, "#f3ecd0"));
    const bite = new THREE.Mesh(new THREE.CircleGeometry(1.25, 24), skyMat(THREE, "#16205a"));
    bite.position.set(0.55, 0.3, 0.01); moon.add(bite);
    moon.position.set(-13, 6.4, -26); api.add(moon);
    const moonGlow = glow(THREE, "#c8d4ff", 6, 0.35); moonGlow.position.set(-13, 6.4, -26.2); api.add(moonGlow);

    // drifting clouds that cover the sky until the wind clears it
    const cloudMat = c => new THREE.MeshLambertMaterial({ color: c, emissive: "#262d5c", flatShading: true, fog: false });
    api.clouds = [];
    [[-6, 4.6, -10.5, "#4a5486"], [0.5, 5.3, -11, "#5a6496"], [6.5, 4.3, -10.2, "#4a5486"], [-11.5, 5.6, -12, "#525c8e"], [11.5, 5.4, -11.5, "#525c8e"], [-2.5, 3.3, -9.5, "#434c80"]].forEach(([x, y, z, c], i) => {
      const cl = new THREE.Group();
      [[0, 0, 3.0], [-2.1, -0.25, 2.0], [2.2, -0.2, 2.2], [0.8, 0.5, 1.7]].forEach(([dx, dy, r]) => {
        const b = new THREE.Mesh(new THREE.SphereGeometry(r, 9, 6), cloudMat(c)); b.scale.y = 0.38; b.position.set(dx, dy, 0); cl.add(b);
      });
      cl.position.set(x, y, z); cl.userData.baseX = x; cl.userData.phase = i * 1.7;
      api.add(cl); api.clouds.push(cl);
    });

    // --- the three clickable stars (only when the sky is clear) ---
    const small = new THREE.Group();
    small.add(new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 6), skyMat(THREE, "#ffffff")));
    small.add(glow(THREE, "#ffffff", 0.9, 0.8));
    small.position.set(-5.5, 4.9, -12); small.userData.height = 4.9;
    api.spot("small", small, { walkTo: [-4, -0.5], height: 5.0 });

    const bright = new THREE.Group();
    const sh = new THREE.Shape(), R = 0.95, r = 0.2;
    for (let i = 0; i < 8; i++) { const a = Math.PI / 2 + i * Math.PI / 4, rr = i % 2 ? r : R; i ? sh.lineTo(Math.cos(a) * rr, Math.sin(a) * rr) : sh.moveTo(Math.cos(a) * rr, Math.sin(a) * rr); }
    const spikes = new THREE.Mesh(new THREE.ShapeGeometry(sh), new THREE.MeshBasicMaterial({ color: "#fff6d0", fog: false, side: THREE.DoubleSide }));
    bright.add(spikes);
    bright.add(new THREE.Mesh(new THREE.SphereGeometry(0.3, 10, 8), skyMat(THREE, "#fffbea")));
    const bGlow = glow(THREE, GOLD, 3.4, 0.9); bright.add(bGlow);
    const bGlow2 = glow(THREE, "#fff1c0", 1.5, 1); bright.add(bGlow2);
    bright.position.set(1.5, 5.6, -12.5); bright.userData.height = 5.6;
    api.spot("bright", bright, { walkTo: [1.5, -0.5], height: 5.9 });
    api.brightGlow = bGlow; api.brightSpikes = spikes;

    const red = new THREE.Group();
    red.add(new THREE.Mesh(new THREE.SphereGeometry(0.17, 8, 6), skyMat(THREE, "#ff8a7a")));
    red.add(glow(THREE, "#ff5a48", 1.2, 0.85));
    red.position.set(7, 4.3, -11.5); red.userData.height = 4.3;
    api.spot("red", red, { walkTo: [6.5, -0.5], height: 4.4 });
    api.stars = [small, bright, red];

    // --- STAR MAP: a parchment board on an easel ---
    const map = k.group();
    [-0.55, 0.55].forEach(x => { const l = k.box(0.1, 2.0, 0.1, "#4a3020"); l.position.set(x, 0, 0); l.rotation.x = -0.08; map.add(l); });
    const back = k.box(0.1, 1.9, 0.1, "#4a3020"); back.position.set(0, 0, -0.45); back.rotation.x = 0.25; map.add(back);
    const board = k.box(1.6, 1.3, 0.08, "#e8e2c8"); board.position.set(0, 0.85, 0.08); map.add(board);
    const chart = new THREE.Mesh(new THREE.RingGeometry(0.42, 0.47, 28), k.mat("#1a2148"));
    chart.position.set(0, 1.55, 0.13); map.add(chart);
    [[-0.2, 0.15], [0.2, 0.25], [0, -0.15], [-0.28, -0.2], [0.3, -0.05], [0.05, 0.05]].forEach(([x, y]) => {
      const d = new THREE.Mesh(new THREE.CircleGeometry(0.04, 6), k.mat("#1a2148")); d.position.set(x, 1.55 + y, 0.131); map.add(d);
    });
    const lines = new THREE.Line(new THREE.BufferGeometry().setFromPoints([[-0.28, -0.2], [-0.2, 0.15], [0.05, 0.05], [0.2, 0.25], [0.3, -0.05], [0, -0.15]].map(([x, y]) => new THREE.Vector3(x, 1.55 + y, 0.132))), new THREE.LineBasicMaterial({ color: "#1a2148" }));
    map.add(lines);
    const msign = k.sign("STAR MAP", { height: 0.26, bg: "#e8e2c8", ink: "#1a2148" }); msign.position.set(0, 1.0, 0.13); map.add(msign);
    map.position.set(-8.5, 0, -3.2); map.rotation.y = 0.25;
    api.spot("map", map, { walkTo: [-8.2, -1.6], height: 2.3 });

    // --- apprentice: small, hooded, holding a scroll ---
    const apprentice = k.figure({ scale: 0.85, robe: "#2f7a8a", trim: GOLD, mask: "#e6f2f4", hat: "hood", prop: "scroll" });
    apprentice.position.set(-4.8, 0, -2.6); apprentice.rotation.y = 0.35;
    api.spot("apprentice", apprentice, { walkTo: [-4.6, -1.0] });

    // --- telescope: a brass tube on a wooden tripod, aimed at the sky ---
    const tel = k.group();
    [0, 2.1, 4.2].forEach(a => {
      const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 1.75, 6), k.mat("#5a3a22"));
      leg.position.set(Math.sin(a) * 0.38, 0.82, Math.cos(a) * 0.38); leg.rotation.set(Math.cos(a) * 0.25, 0, -Math.sin(a) * 0.25);
      leg.castShadow = true; tel.add(leg);
    });
    const head = k.sphere(0.12, BRASS, 8); head.position.y = 1.65; tel.add(head);
    const tube = new THREE.Group();
    const t1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.9, 12), k.mat(BRASS)); t1.castShadow = true; tube.add(t1);
    const t2 = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.14, 12), k.mat("#a0844a")); t2.position.y = 0.95; tube.add(t2);
    const eye = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 0.3, 8), k.mat("#8a6e3a")); eye.position.y = -1.05; tube.add(eye);
    const lens = new THREE.Mesh(new THREE.CircleGeometry(0.18, 12), new THREE.MeshBasicMaterial({ color: "#9fc4ff" })); lens.rotation.x = -Math.PI / 2; lens.position.y = 1.03; tube.add(lens);
    tube.position.y = 1.72; tube.rotation.x = -1.0; tube.rotation.z = -0.15; tel.add(tube);
    const tsign = k.sign("TELESCOPE", { height: 0.2, bg: "#e8e2c8", ink: "#1a2148" }); tsign.position.set(0, 0.55, 0.42); tel.add(tsign);
    tel.position.set(-0.8, 0, -2.6);
    api.spot("telescope", tel, { walkTo: [-0.8, -0.9], height: 2.6 });

    // --- astronomer: tall, deep-blue robe, gold tall hat, a staff ---
    const astro = k.figure({ scale: 1.2, robe: "#3a3f8f", trim: GOLD, mask: "#f2f0ff", hat: "tall", prop: "staff" });
    const orb = k.sphere(0.11, GOLD, 8); orb.position.set(0.6, 2.35, 0.12); astro.add(orb);
    astro.position.set(3.2, 0, -3.0); astro.rotation.y = -0.25;
    api.spot("astronomer", astro, { walkTo: [3.0, -1.2] });

    // --- ladder: up a stone turret on the right, to the summit ---
    const turret = k.cylinder(1.3, 1.45, 9, STONE, 10); turret.position.set(10.6, 0, -5); api.add(turret);
    const tcap = k.cylinder(1.55, 1.55, 0.35, DARK, 10); tcap.position.set(10.6, 9, -5); api.add(tcap);
    const ladder = k.group();
    [-0.45, 0.45].forEach(x => { const r = k.box(0.1, 7.2, 0.1, BRASS); r.position.x = x; ladder.add(r); });
    for (let i = 0; i < 12; i++) { const r = k.box(0.9, 0.07, 0.07, BRASS); r.position.y = 0.45 + i * 0.58; ladder.add(r); }
    const lglow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 7.4), new THREE.MeshBasicMaterial({ color: "#ffe9a8", transparent: true, opacity: 0.55 }));
    lglow.position.set(0, 3.7, -0.12); ladder.add(lglow);
    const spark = k.emoji("✨", 0.9); spark.position.set(0, 7.7, 0.1); ladder.add(spark);
    const lLight = new THREE.PointLight("#ffd27a", 10, 8, 1.5); lLight.position.set(0, 3, 0.8); ladder.add(lLight);
    const blockBoards = k.group();
    const b1 = k.box(1.6, 0.32, 0.12, "#3a2616"); b1.position.set(0, 1.4, 0.14); b1.rotation.z = 0.35; blockBoards.add(b1);
    const b2 = k.box(1.6, 0.32, 0.12, "#3a2616"); b2.position.set(0, 2.6, 0.14); b2.rotation.z = -0.35; blockBoards.add(b2);
    ladder.add(blockBoards);
    const lsign = k.sign("SUMMIT", { height: 0.26, bg: "#e8e2c8", ink: "#1a2148" }); lsign.position.set(0, 4.3, 0.12); ladder.add(lsign);
    ladder.position.set(9.6, 0, -3.95); ladder.rotation.y = -0.35;
    api.spot("ladder", ladder, { walkTo: [9.2, -2.4], height: 7.5 });
    api.ladderGlow = [lglow, spark, lLight]; api.ladderBlock = blockBoards;
  },

  update(api, st) {
    const clear = st.has("clear");
    (api.clouds || []).forEach(c => setVis(c, !clear));
    (api.stars || []).forEach(s => setVis(s, clear));
    if (api.starMat) api.starMat.opacity = clear ? 0.95 : 0.45;
    const open = !!st.open;
    (api.ladderGlow || []).forEach(o => setVis(o, open));
    setVis(api.ladderBlock, !open);
  },

  tick(api, t) {
    if (reduceMotion) return;
    (api.clouds || []).forEach(c => { c.position.x = c.userData.baseX + Math.sin(t * 0.12 + c.userData.phase) * 0.9; });
    if (api.brightGlow) { const s = 3.4 * (1 + Math.sin(t * 2.2) * 0.07); api.brightGlow.scale.set(s, s, s); }
    if (api.brightSpikes) api.brightSpikes.rotation.z = Math.sin(t * 0.6) * 0.08;
    if (api.starMat && api.starMat.opacity > 0.5) api.starMat.opacity = 0.85 + Math.sin(t * 1.7) * 0.1;
  },
};
