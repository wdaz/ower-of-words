// The Library. A hushed green hall of scribes: tall shelves, a great arched window,
// the librarian at her desk, a reader at his table, and a spiral stair climbing to the stars.
// Spot ids (must match content.js): red, green, blue, sign, librarian, reader, glasses, spiral
export default {
  sky: { top: "#16241b", bottom: "#2b4234" },
  fog: { color: "#22362a", near: 24, far: 52 },
  groundColor: "#3d2a1e",
  light: { sky: "#d6e8cc", ground: "#3d2a1e", hemi: 0.85, sun: "#e8f2d6", sunIntensity: 1.15, sunPos: [-6, 14, 9] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-2, 3];
    const WALL = "#33503f", WALL2 = "#4d7058", DARK = "#25392d", WOOD = "#4a3226", WOOD_D = "#2e1e15", WOOD_L = "#6e4a34", PINK = "#d27aa8";

    // ---- the room: back wall, wainscot, pilasters, cornice, side walls ----
    const wall = k.archWall(30, 11, 1.2, WALL); wall.position.set(0, 0, -6); api.add(wall);
    const wains = k.box(30, 1.1, 0.2, DARK); wains.position.set(0, 0, -5.35); api.add(wains);
    const cornice = k.box(30.4, 0.6, 1.6, DARK); cornice.position.set(0, 10.6, -6); api.add(cornice);
    [-11.6, -2.6, 3.6, 12.6].forEach(x => { const p = k.box(0.7, 10.6, 0.4, WALL2); p.position.set(x, 0, -5.3); api.add(p); });
    [-13.5, 13.5].forEach(x => {
      const s = k.box(1, 11, 12, WALL); s.position.set(x, 0, 0); api.add(s);
      const w2 = k.box(0.2, 1.1, 12, DARK); w2.position.set(x - Math.sign(x) * 0.55, 0, 0); api.add(w2);
    });
    // wooden floorboards and a magenta rug
    for (let i = 0; i < 7; i++) { const b = k.box(27, 0.02, 0.06, "#2e1e15"); b.position.set(0, 0, -4.5 + i * 1.6); api.add(b); }
    const rug = k.box(7.6, 0.03, 3.6, "#6b3a5e"); rug.position.set(0.5, 0, 0.8); api.add(rug);
    const rugIn = k.box(6.8, 0.035, 2.8, "#8a4d78"); rugIn.position.set(0.5, 0, 0.8); api.add(rugIn);

    // ---- the great arched window with light pouring in ----
    const frame = k.archSlab(4.6, 7.6, 0.14, WALL2); frame.position.set(0.5, 3, -5.36); api.add(frame);
    const glass = k.archSlab(3.9, 7.0, 0.1, "#c9dfc0"); glass.material = new THREE.MeshBasicMaterial({ color: "#d9ecc8" });
    glass.position.set(0.5, 3.3, -5.28); glass.castShadow = false; api.add(glass);
    const mv = k.box(0.14, 7.0, 0.16, WALL2); mv.position.set(0.5, 3.3, -5.2); api.add(mv);
    [5.6, 8.0].forEach(y => { const mh = k.box(3.9, 0.14, 0.16, WALL2); mh.position.set(0.5, y, -5.2); api.add(mh); });
    const sill = k.box(5, 0.25, 0.6, DARK); sill.position.set(0.5, 2.85, -5.2); api.add(sill);
    const shaftMat = new THREE.MeshBasicMaterial({ color: "#f4f8d8", transparent: true, opacity: 0.05, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide });
    api.shafts = [];
    [-0.9, 0.5, 1.9].forEach((x, i) => {
      const sh = new THREE.Mesh(new THREE.PlaneGeometry(0.8, 9), shaftMat.clone());
      sh.position.set(x + 1.2, 4.2, -2.6); sh.rotation.set(-0.95, 0, -0.32); api.add(sh); api.shafts.push(sh);
      sh.userData.phase = i * 1.7;
    });
    const patch = new THREE.Mesh(new THREE.PlaneGeometry(4, 3.4), new THREE.MeshBasicMaterial({ color: "#e8f2c8", transparent: true, opacity: 0.12, depthWrite: false }));
    patch.rotation.x = -Math.PI / 2; patch.position.set(2.3, 0.05, 1.2); api.add(patch);

    // hanging lamps
    [-6.8, 6.8].forEach(x => {
      const cord = k.box(0.04, 4, 0.04, "#1a1410"); cord.position.set(x, 6.3, -2.4); api.add(cord);
      const shade = k.cone(0.55, 0.5, "#8a6a3a", 8); shade.position.set(x, 5.8, -2.4); api.add(shade);
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.2, 8, 6), new THREE.MeshBasicMaterial({ color: "#ffd98a" }));
      bulb.position.set(x, 5.75, -2.4); api.add(bulb);
    });
    const warm = new THREE.PointLight("#ffcf8a", 18, 14, 1.6); warm.position.set(0.5, 3.2, -1.5); api.add(warm);

    // ---- bookcases full of books (one instanced mesh for all the filler books) ----
    const rows = [0.18, 1.28, 2.38, 3.48, 4.58]; // the top of each shelf board
    function bookcase(cx, w) {
      const g = k.group();
      const back = k.box(w, 5.5, 0.1, WOOD_D); back.position.z = -0.3; g.add(back);
      [-w / 2, w / 2].forEach(x => { const s = k.box(0.14, 5.6, 0.7, WOOD); s.position.x = x; g.add(s); });
      rows.forEach(y => { const b = k.box(w, 0.1, 0.7, WOOD); b.position.y = y - 0.1; g.add(b); });
      const top = k.box(w + 0.4, 0.25, 0.85, WOOD_D); top.position.y = 5.5; g.add(top);
      g.position.set(cx, 0, -5.0); api.add(g);
    }
    const cases = [{ x: -8.6, w: 3.4 }, { x: -4.9, w: 3.4 }, { x: 5.1, w: 3.0 }];
    cases.forEach(c => bookcase(c.x, c.w));

    // the three books that matter: [id, colour, case index, row, x offset in case]
    const special = [
      ["red", "#c0392b", 0, 2, -0.7],
      ["blue", "#2f6fc2", 1, 1, -0.5],
      ["green", "#3e9a5a", 1, 2, 0.8],
    ];
    const muted = ["#7d5a8c", "#c9a24a", "#5d7d6a", "#a3543c", "#3c5a7d", "#8a7a5a", "#6b4a3a", "#9a8a6a", "#4f6a5a"];
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const fill = [];
    cases.forEach((c, ci) => rows.forEach((y, ri) => {
      let x = c.x - c.w / 2 + 0.12;
      const end = c.x + c.w / 2 - 0.12;
      while (x < end - 0.12) {
        const sp = special.find(s => s[2] === ci && s[3] === ri && Math.abs(c.x + s[4] - x) < 0.25);
        if (sp) { x += 0.42; continue; }
        if (rnd() < 0.07) { x += 0.3; continue; } // a gap now and then
        const t = 0.12 + rnd() * 0.1, h = 0.62 + rnd() * 0.3, d = 0.42 + rnd() * 0.1;
        if (x + t > end) break;
        const lean = rnd() < 0.08 ? 0.18 : 0;
        fill.push({ x: x + t / 2, y: y + h / 2, z: -5.12 + d / 2 - 0.3, t, h, d, lean, col: muted[Math.floor(rnd() * muted.length)] });
        x += t + 0.015 + (lean ? 0.1 : 0);
      }
    }));
    const inst = new THREE.InstancedMesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: "#ffffff", flatShading: true }), fill.length);
    const m4 = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler(), col = new THREE.Color();
    fill.forEach((b, i) => {
      q.setFromEuler(e.set(0, 0, b.lean));
      m4.compose(new THREE.Vector3(b.x, b.y, b.z), q, new THREE.Vector3(b.t, b.h, b.d));
      inst.setMatrixAt(i, m4); inst.setColorAt(i, col.set(b.col));
    });
    inst.castShadow = true; inst.receiveShadow = true; api.add(inst);

    const hitMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false });
    api.books = {};
    special.forEach(([id, color, ci, ri, off]) => {
      const c = cases[ci], y = rows[ri];
      const g = k.group();
      const b = k.box(0.28, 0.92, 0.55, color); g.add(b);
      [0.2, 0.72].forEach(by => { const band = k.box(0.3, 0.06, 0.57, "#f2d48a"); band.position.y = by; g.add(band); });
      const hit = new THREE.Mesh(new THREE.BoxGeometry(0.7, 1.2, 0.8), hitMat); hit.position.y = 0.55; g.add(hit);
      g.rotation.z = -0.06;
      g.position.set(c.x + off, y, -4.95);
      g.userData.height = y + 1.2;
      api.spot(id, g, { walkTo: [c.x + off, -3.3], height: y + 1.2 });
      api.books[id] = g;
    });

    // ---- the librarian's desk, the QUIET plaque, the librarian ----
    const desk = k.group();
    const front = k.box(2.8, 1.0, 0.9, "#5a3b2a"); desk.add(front);
    const dtop = k.box(3.1, 0.12, 1.1, WOOD_L); dtop.position.y = 1.0; desk.add(dtop);
    const stack = [["#7d5a8c", 0.12], ["#c9a24a", 0.1], ["#3c5a7d", 0.14]];
    let sy = 1.12; stack.forEach(([c, h], i) => { const s = k.box(0.6 - i * 0.05, h, 0.42, c); s.position.set(-0.9, sy, 0); s.rotation.y = i * 0.2; desk.add(s); sy += h; });
    const candle = k.cylinder(0.06, 0.06, 0.3, "#efe2c4", 6); candle.position.set(1.05, 1.12, 0.1); desk.add(candle);
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.14, 6), new THREE.MeshBasicMaterial({ color: "#ffcf6a" }));
    flame.position.set(1.05, 1.5, 0.1); desk.add(flame);
    const ink = k.cylinder(0.08, 0.1, 0.14, "#1a1410", 6); ink.position.set(0.55, 1.12, 0.15); desk.add(ink);
    const quill = k.box(0.03, 0.45, 0.03, "#f2e6d0"); quill.position.set(0.58, 1.18, 0.15); quill.rotation.z = 0.35; desk.add(quill);
    desk.position.set(0.5, 0, -3.6); api.add(desk);

    const plaque = k.sign("QUIET, PLEASE", { bg: "#efe5cc", ink: "#1c2a22", height: 0.42 });
    plaque.position.set(0.5, 0.58, -3.12); plaque.userData.height = 1.0;
    api.spot("sign", plaque, { walkTo: [1.4, -2.3], height: 1.1 });

    const librarian = k.figure({ scale: 1.1, robe: "#6b3a5e", trim: PINK, mask: "#f3e8ee", hat: "tall", prop: "book" });
    librarian.position.set(0.5, 0, -4.45);
    api.spot("librarian", librarian, { walkTo: [-0.5, -2.5] });

    // ---- the reader at his table ----
    const table = k.group();
    const ttop = k.box(2.0, 0.1, 1.0, WOOD_L); ttop.position.y = 0.82; table.add(ttop);
    [[-0.9, -0.4], [0.9, -0.4], [-0.9, 0.4], [0.9, 0.4]].forEach(([x, z]) => { const l = k.box(0.1, 0.82, 0.1, WOOD_L); l.position.set(x, 0, z); table.add(l); });
    const open = k.group(k.box(0.36, 0.04, 0.5, "#efe2c4"), k.box(0.36, 0.04, 0.5, "#efe2c4"));
    open.children[0].position.x = -0.19; open.children[0].rotation.z = 0.08; open.children[1].position.x = 0.19; open.children[1].rotation.z = -0.08;
    open.position.set(-0.3, 0.92, 0.05); table.add(open);
    const tbook = k.box(0.5, 0.12, 0.36, "#a3543c"); tbook.position.set(0.6, 0.92, -0.1); tbook.rotation.y = 0.3; table.add(tbook);
    table.position.set(4.3, 0, -2.3); api.add(table);
    const stool = k.cylinder(0.32, 0.36, 0.45, WOOD, 8); stool.position.set(4.3, 0, -3.1); api.add(stool);
    const reader = k.figure({ sit: true, robe: "#3c5a7d", trim: "#c9a24a", mask: "#e9eef4", hat: "round" });
    reader.position.set(4.3, 0.45, -3.1);
    api.spot("reader", reader, { walkTo: [3.4, -1.2] });

    // ---- the empty chair, glasses beneath it ----
    const chair = k.group();
    const seat = k.box(0.75, 0.08, 0.7, WOOD_L); seat.position.y = 0.56; chair.add(seat);
    [[-0.32, -0.3], [0.32, -0.3], [-0.32, 0.3], [0.32, 0.3]].forEach(([x, z]) => { const l = k.box(0.07, 0.56, 0.07, WOOD_L); l.position.set(x, 0, z); chair.add(l); });
    [-0.32, 0.32].forEach(x => { const p = k.box(0.07, 0.75, 0.07, WOOD_L); p.position.set(x, 0.6, -0.3); chair.add(p); });
    const cback = k.box(0.72, 0.3, 0.06, WOOD); cback.position.set(0, 1.05, -0.3); chair.add(cback);
    const specs = k.emoji("👓", 0.62); specs.position.set(0, 0.26, 0.05); chair.add(specs);
    chair.position.set(6.6, 0, -2.2); chair.rotation.y = -0.5;
    api.spot("glasses", chair, { walkTo: [6.6, -0.9], height: 1.4 });
    api.specs = specs;

    // ---- the spiral stair up to the next floor ----
    const spiral = k.group();
    const pillar = k.cylinder(0.22, 0.26, 7.6, WOOD_D, 8); spiral.add(pillar);
    const N = 18;
    for (let i = 0; i < N; i++) {
      const a = Math.PI * 0.5 + i * 0.42, y = 0.35 + i * 0.38;
      const step = k.box(1.35, 0.1, 0.5, i % 2 ? WALL2 : "#5d8068");
      step.geometry.translate(0.7, 0, 0);
      step.position.y = y; step.rotation.y = a; spiral.add(step);
      const post = k.box(0.04, 0.9, 0.04, "#8a6a3a"); post.geometry.translate(1.3, 0, 0);
      post.position.y = y + 0.05; post.rotation.y = a; spiral.add(post);
    }
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.4, 0.05, 6, 24), k.mat("#8a6a3a"));
    ring.rotation.x = Math.PI / 2; ring.position.y = 7.4; spiral.add(ring);
    // barrier: two posts and a magenta rope across the foot of the stair
    const barrier = k.group();
    [-1.0, 1.0].forEach(x => {
      const p = k.cylinder(0.07, 0.1, 1.0, WOOD_D, 6); p.position.x = x; barrier.add(p);
      const knob = k.sphere(0.1, "#e2b04a", 6); knob.position.set(x, 1.05, 0); barrier.add(knob);
    });
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 2.0, 6), k.mat(PINK));
    rope.rotation.z = Math.PI / 2; rope.position.y = 0.9; barrier.add(rope);
    barrier.position.set(0, 0, 1.75); spiral.add(barrier);
    // glow and sparkle when open
    const glow = new THREE.Mesh(new THREE.CylinderGeometry(1.7, 1.7, 7.6, 20, 1, true),
      new THREE.MeshBasicMaterial({ color: "#fff3c4", transparent: true, opacity: 0.22, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide }));
    glow.position.y = 3.8; spiral.add(glow);
    const spark = k.emoji("✨", 1.0); spark.position.set(0, 6.4, 0.8); spiral.add(spark);
    spiral.position.set(9.6, 0, -3.9);
    api.spot("spiral", spiral, { walkTo: [9.6, -1.4], height: 7 });
    // the gallery the stair reaches
    const gallery = k.box(5.2, 0.4, 2.2, WOOD); gallery.position.set(11.4, 7.6, -5.0); api.add(gallery);
    for (let i = 0; i < 6; i++) { const b = k.box(0.08, 0.8, 0.08, "#8a6a3a"); b.position.set(9.2 + i * 0.85, 8.0, -3.95); api.add(b); }
    const grail = k.box(5.2, 0.08, 0.1, "#8a6a3a"); grail.position.set(11.4, 8.8, -3.95); api.add(grail);
    api.barrier = barrier; api.glow = glow; api.spark = spark;
  },

  update(api, st) {
    const hide = (obj, v) => obj && obj.traverse(o => { o.visible = v; });
    hide(api.books?.blue, !st.has("tookBlue"));
    hide(api.books?.red, !st.has("tookRed"));
    if (api.specs) api.specs.visible = !st.has("gotGlasses");
    const open = !!st.open;
    hide(api.barrier, !open);
    if (api.glow) api.glow.visible = open;
    if (api.spark) api.spark.visible = open;
  },

  tick(api, t) {
    if (api.glow && api.glow.visible) api.glow.material.opacity = 0.16 + Math.sin(t * 2) * 0.07;
    if (api.spark && api.spark.visible) api.spark.material.rotation = Math.sin(t) * 0.3;
    if (api.shafts) api.shafts.forEach(s => { s.material.opacity = 0.05 + Math.sin(t * 0.7 + s.userData.phase) * 0.02; });
  },
};
