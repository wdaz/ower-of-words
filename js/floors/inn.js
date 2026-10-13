// The Inn ("The Sleepy Lantern"). A warm timber hall halfway up the tower: a fireplace on the left,
// the tea shelf, the cook's counter with the soup pot, the innkeeper's desk with the key board,
// a menu board, a guest at his table, a musician on a little stage, and the guests' stairs going up.
// Spot ids (must match content/inn.js): girl, shelf, cook, pot, host, keys, menu, guest, bard, stairs
export default {
  sky: { top: "#140d18", bottom: "#3a2028" },
  fog: { color: "#3a2218", near: 24, far: 56 },
  groundColor: "#5a3520",
  light: { sky: "#ffe2b8", ground: "#4a2614", hemi: 1.05, sun: "#ffd9a0", sunIntensity: 1.2, sunPos: [-6, 15, 10] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-2, 3];
    const PLASTER = "#d8b083", TIMBER = "#4a2a18", TIMBER_L = "#7a4a2a", WOOD = "#8a5530", WOOD_D = "#3a2012", RED = "#a8382a", GOLD = "#e8b44a";
    const glowMat = c => new THREE.MeshBasicMaterial({ color: c });

    // ---- the hall: plaster back wall with dark timber framing, side walls, floorboards ----
    const STX = 9.8; // the stairs
    const wall = k.archWall(30, 9, 1.2, PLASTER, 2.6, 5.4); k.at(wall, STX, 0, -6.2); api.add(wall);
    const wallL = k.box(14, 9, 1.2, PLASTER); k.at(wallL, -12.2, 0, -6.2); api.add(wallL);
    const skirt = k.box(40, 0.9, 0.2, TIMBER); k.at(skirt, 0, 0, -5.55); api.add(skirt);
    const top = k.box(40, 0.6, 1.4, TIMBER); k.at(top, 0, 8.6, -6.0); api.add(top);
    const mid = k.box(40, 0.3, 0.2, TIMBER); k.at(mid, 0, 4.8, -5.55); api.add(mid);
    [-12.5, -7.6, -2.0, 3.6, 7.6, 12.2].forEach(x => { const p = k.box(0.45, 9, 0.3, TIMBER); k.at(p, x, 0, -5.5); api.add(p); });
    // diagonal braces in the upper panels
    [[-10.05, 1], [-4.8, -1], [5.6, 1]].forEach(([x, s]) => { const b = k.box(0.25, 4.4, 0.18, TIMBER); k.at(b, x, 4.9, -5.5); b.rotation.z = s * 0.85; b.position.y = 6.7; api.add(b); });
    [-13.6, 13.6].forEach(x => { const s = k.box(1, 9, 14, PLASTER); k.at(s, x, 0, 0); api.add(s); const t = k.box(0.3, 9, 0.5, TIMBER); k.at(t, x - Math.sign(x) * 0.6, 0, -2); api.add(t); });
    // ceiling beams running front to back
    [-9, -3, 3, 9].forEach(x => { const b = k.box(0.4, 0.4, 8, TIMBER); k.at(b, x, 8.1, -2); api.add(b); });
    // floorboards and a long red rug
    for (let i = 0; i < 9; i++) { const b = k.box(27, 0.02, 0.05, WOOD_D); k.at(b, 0, 0, -5 + i * 1.3); api.add(b); }
    const rug = k.box(9, 0.03, 2.6, RED); k.at(rug, 0, 0, 1.4); api.add(rug);
    const rugIn = k.box(8.2, 0.035, 1.9, "#c86a3a"); k.at(rugIn, 0, 0, 1.4); api.add(rugIn);

    // ---- night windows with a moon ----
    [-4.8, 5.6].forEach((x, i) => {
      const fr = k.box(2.0, 2.4, 0.15, TIMBER); k.at(fr, x, 2.0, -5.5); api.add(fr);
      const gl = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 2.1), glowMat("#22305a")); k.at(gl, x, 3.2, -5.4); api.add(gl);
      const mv = k.box(0.08, 2.1, 0.06, TIMBER); k.at(mv, x, 2.15, -5.36); api.add(mv);
      const mh = k.box(1.7, 0.08, 0.06, TIMBER); k.at(mh, x, 3.2, -5.36); api.add(mh);
      if (i === 1) { const moon = k.emoji("🌙", 0.5); k.at(moon, x + 0.45, 3.7, -5.33); api.add(moon); }
      else { const st = k.emoji("⭐", 0.3); k.at(st, x - 0.4, 3.8, -5.33); api.add(st); }
    });

    // the inn's name over the desk
    const name = k.sign("THE SLEEPY LANTERN", { bg: "#2e1a10", ink: GOLD, height: 0.6 }); k.at(name, 0.4, 5.6, -5.35); api.add(name);

    // hanging lanterns and warm light
    // one warm light for the hall (few point lights keep slow GPUs fast)
    const warm = new THREE.PointLight("#ffb860", 16, 16, 1.4); k.at(warm, 0.4, 4.6, -1.0); api.add(warm);
    [[-6, -2.4], [3.4, -1.6], [7.4, -2.2]].forEach(([x, z]) => {
      const cord = k.box(0.04, 2.6, 0.04, "#1a1008"); k.at(cord, x, 6.0, z); api.add(cord);
      const cap = k.cone(0.3, 0.25, TIMBER, 6); k.at(cap, x, 5.85, z); api.add(cap);
      const lamp = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.45, 6), glowMat("#ffc870")); k.at(lamp, x, 5.6, z); api.add(lamp);
    });

    // ---- the fireplace, left ----
    const fp = k.group();
    const stone = k.box(3.2, 3.4, 1.0, "#8a7a6a"); fp.add(stone);
    const mouth = k.box(1.9, 1.5, 0.3, "#1e120c"); k.at(mouth, 0, 0, 0.4); fp.add(mouth);
    const mantel = k.box(3.6, 0.25, 1.3, TIMBER); k.at(mantel, 0, 3.4, 0); fp.add(mantel);
    const chimney = k.box(2.2, 5, 0.9, "#7a6a5a"); k.at(chimney, 0, 3.6, -0.05); fp.add(chimney);
    [-0.35, 0.35].forEach(x => { const log = k.cylinder(0.12, 0.12, 1.1, "#5a3218", 6); log.rotation.z = Math.PI / 2; k.at(log, x * 0.3, 0.15, 0.55); log.rotation.y = x; fp.add(log); });
    const flame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 6), glowMat("#ff9a3a")); k.at(flame, 0, 0.6, 0.6); fp.add(flame);
    const flame2 = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.6, 6), glowMat("#ffe08a")); k.at(flame2, 0.1, 0.5, 0.7); fp.add(flame2);
    const fire = new THREE.PointLight("#ff8a3a", 14, 8, 1.6); k.at(fire, 0, 1, 1.4); fp.add(fire);
    const cup = k.emoji("🫖", 0.45); k.at(cup, -1.1, 3.85, 0.2); fp.add(cup);
    k.at(fp, -9.6, 0, -5.0); api.add(fp);
    api.flames = [flame, flame2]; api.fire = fire;
    // a pile of firewood and a stool by the fire
    for (let i = 0; i < 4; i++) { const l = k.cylinder(0.13, 0.13, 0.9, "#6a3c1c", 6); l.rotation.x = Math.PI / 2; k.at(l, -7.3 + (i % 2) * 0.28, 0.13 + Math.floor(i / 2) * 0.24, -4.2); api.add(l); }

    // ---- Lili, the innkeeper's daughter, by the fire ----
    const girl = k.figure({ model: "Rogue", scale: 0.78, robe: "#e3a23d", trim: RED, hat: "hood" });
    k.at(girl, -8.2, 0, -2.7, 0.35); api.spot("girl", girl, { walkTo: [-7.7, -1.2] });

    // ---- the tea shelf (honey jar next to the tea) ----
    const shelf = k.group();
    const sback = k.box(2.4, 3.0, 0.12, WOOD_D); k.at(sback, 0, 0, -0.25); shelf.add(sback);
    [-1.2, 1.2].forEach(x => { const s = k.box(0.12, 3.0, 0.6, WOOD); k.at(s, x, 0, 0); shelf.add(s); });
    [0.05, 1.0, 1.95, 2.9].forEach(y => { const b = k.box(2.4, 0.08, 0.6, WOOD); k.at(b, 0, y, 0); shelf.add(b); });
    [["🍵", -0.7, 2.25], ["🍵", -0.1, 2.25], ["☕", 0.6, 1.3], ["🫖", -0.6, 1.32], ["🧺", 0.4, 0.4]].forEach(([ch, x, y]) => { const e = k.emoji(ch, 0.45); k.at(e, x, y, 0.1); shelf.add(e); });
    const honey = k.emoji("🍯", 0.5); k.at(honey, 0.55, 2.28, 0.12); shelf.add(honey);
    const ssign = k.sign("TEA", { height: 0.26 }); k.at(ssign, 0, 2.65, 0.32); shelf.add(ssign);
    k.at(shelf, -5.8, 0, -4.9); shelf.userData.height = 3.2;
    api.spot("shelf", shelf, { walkTo: [-5.8, -3.3], height: 3.2 });
    api.honey = honey;

    // ---- the cook's counter, the soup pot, the cook ----
    const kc = k.group();
    const kfront = k.box(2.8, 0.9, 0.9, WOOD); kc.add(kfront);
    const ktop = k.box(3.0, 0.08, 1.05, "#c8a070"); k.at(ktop, 0, 0.9, 0); kc.add(ktop);
    [["🥕", 0.55], ["🧅", 0.95], ["🥔", 1.25]].forEach(([ch, x]) => { const e = k.emoji(ch, 0.3); k.at(e, x, 1.12, 0.1); kc.add(e); });
    k.at(kc, -3.2, 0, -3.0); api.add(kc);
    const pot = k.group();
    const cauldron = k.cylinder(0.42, 0.34, 0.55, "#2a2a2e", 10); pot.add(cauldron);
    const soup = new THREE.Mesh(new THREE.CircleGeometry(0.38, 12), k.mat("#c87a2a")); soup.rotation.x = -Math.PI / 2; soup.position.y = 0.53; pot.add(soup);
    const ladle = k.box(0.05, 0.7, 0.05, "#8a8a8a"); k.at(ladle, 0.15, 0.35, 0); ladle.rotation.z = -0.4; pot.add(ladle);
    api.steam = [];
    [0, 1].forEach(i => { const s = k.emoji("♨️", 0.35); k.at(s, -0.1 + i * 0.2, 0.95 + i * 0.2, 0); pot.add(s); api.steam.push(s); });
    const psign = k.sign("SOUP", { height: 0.22 }); k.at(psign, 0, -0.5, 0.56); pot.add(psign);
    k.at(pot, -4.25, 0.94, -3.05); pot.userData.height = 1.9;
    api.spot("pot", pot, { walkTo: [-4.4, -1.8], height: 1.9 });
    const cook = k.figure({ model: "Knight", hideHat: true, robe: "#f2ece0", trim: RED });
    k.at(cook, -2.7, 0, -4.0); api.spot("cook", cook, { walkTo: [-2.6, -1.8] });
    // hanging pans on the wall behind the cook
    [-3.9, -3.3, -2.7].forEach((x, i) => { const pan = k.cylinder(0.25 - i * 0.03, 0.25 - i * 0.03, 0.06, "#3a3a40", 10); pan.rotation.x = Math.PI / 2; k.at(pan, x, 3.6 - i * 0.15, -5.35); api.add(pan); });

    // ---- the innkeeper's desk, the key board, the innkeeper ----
    const desk = k.group();
    const dfront = k.box(3.0, 1.0, 0.9, TIMBER_L); desk.add(dfront);
    const dtop = k.box(3.2, 0.1, 1.1, WOOD_D); k.at(dtop, 0, 1.0, 0); desk.add(dtop);
    [-0.9, 0.9].forEach(x => { const p = k.box(0.6, 0.6, 0.06, TIMBER); k.at(p, x, 0.2, 0.46); desk.add(p); });
    const book = k.box(0.55, 0.06, 0.4, "#6a2a3a"); k.at(book, -0.8, 1.05, 0); book.rotation.y = 0.2; desk.add(book);
    const bell = k.emoji("🛎️", 0.35); k.at(bell, 0.9, 1.3, 0.1); desk.add(bell);
    const candle = k.cylinder(0.06, 0.06, 0.28, "#f2e6c8", 6); k.at(candle, 0.3, 1.05, -0.1); desk.add(candle);
    const cfl = new THREE.Mesh(new THREE.ConeGeometry(0.05, 0.13, 6), glowMat("#ffcf6a")); k.at(cfl, 0.3, 1.42, -0.1); desk.add(cfl);
    k.at(desk, 0.4, 0, -3.0); api.add(desk);
    const host = k.figure({ model: "Barbarian", hideHat: true, robe: "#8a3b5a", trim: GOLD });
    k.at(host, 0.4, 0, -4.0); api.spot("host", host, { walkTo: [0.4, -1.8] });
    // barrels behind the desk
    [[-1.4, -4.7], [2.2, -4.7]].forEach(([x, z]) => { const b = k.cylinder(0.45, 0.45, 1.1, "#7a4a24", 10); k.at(b, x, 0, z); api.add(b);
      [0.2, 0.9].forEach(y => { const h = k.cylinder(0.47, 0.47, 0.06, "#2a2a2a", 10); k.at(h, x, y, z); api.add(h); }); });

    const keys = k.group();
    const kb = k.box(1.6, 1.1, 0.1, TIMBER_L); keys.add(kb);
    for (let i = 0; i < 9; i++) {
      const x = -0.55 + (i % 3) * 0.55, y = 0.85 - Math.floor(i / 3) * 0.32;
      const hook = k.box(0.05, 0.05, 0.12, "#2a2a2a"); k.at(hook, x, y + 0.08, 0.08); keys.add(hook);
      if (i !== 6) { const kk = k.box(0.08, 0.2, 0.04, GOLD); k.at(kk, x, y - 0.14, 0.1); keys.add(kk); }
    }
    const key7 = k.emoji("🔑", 0.34); k.at(key7, -0.55, 0.15, 0.14); keys.add(key7);
    const ksign = k.sign("KEYS", { height: 0.22 }); k.at(ksign, 0, 1.25, 0.08); keys.add(ksign);
    k.at(keys, 2.4, 2.3, -5.35); keys.userData.height = 3.8;
    api.spot("keys", keys, { walkTo: [2.4, -3.3], height: 3.8 });
    api.key7 = key7;

    // ---- the menu board on an easel ----
    const menu = k.group();
    [-0.45, 0.45].forEach(x => { const l = k.box(0.08, 1.9, 0.08, TIMBER); k.at(l, x, 0, 0); l.rotation.z = -x * 0.12; menu.add(l); });
    const back = k.box(0.08, 1.8, 0.08, TIMBER); k.at(back, 0, 0, -0.45); back.rotation.x = 0.25; menu.add(back);
    const board = k.box(1.1, 0.9, 0.06, "#23302a"); k.at(board, 0, 0.9, 0.06); menu.add(board);
    const frame = k.box(1.2, 1.0, 0.04, TIMBER_L); k.at(frame, 0, 0.85, 0.02); menu.add(frame);
    const mtxt = k.sign("MENU", { bg: "#23302a", ink: "#f2ead8", height: 0.24 }); k.at(mtxt, 0, 1.6, 0.11); menu.add(mtxt);
    [["🍲", -0.25, 1.32], ["🍵", 0.25, 1.32], ["🍳", 0, 1.06]].forEach(([ch, x, y]) => { const e = k.emoji(ch, 0.24); k.at(e, x, y, 0.12); menu.add(e); });
    k.at(menu, 3.1, 0, -2.6, -0.2); menu.userData.height = 2.1;
    api.spot("menu", menu, { walkTo: [3.0, -1.4], height: 2.1 });

    // ---- Oskar's table ----
    const table = k.group();
    const ttop = k.box(1.8, 0.1, 1.0, WOOD); k.at(ttop, 0, 0.72, 0); table.add(ttop);
    [[-0.8, -0.4], [0.8, -0.4], [-0.8, 0.4], [0.8, 0.4]].forEach(([x, z]) => { const l = k.box(0.1, 0.72, 0.1, WOOD_D); k.at(l, x, 0, z); table.add(l); });
    const mug = k.emoji("🍺", 0.32); k.at(mug, 0.5, 1.0, 0.1); table.add(mug);
    const bag = k.emoji("🧳", 0.5); k.at(bag, -1.25, 0.3, 0.15); table.add(bag);
    k.at(table, 5.2, 0, -0.9); api.add(table);
    const stool = k.cylinder(0.3, 0.34, 0.45, TIMBER_L, 8); k.at(stool, 5.2, 0, -1.75); api.add(stool);
    const guest = k.figure({ model: "Mage", sit: true, robe: "#3d5a80", trim: GOLD });
    k.at(guest, 5.2, 0.45, -1.75); api.spot("guest", guest, { walkTo: [4.0, 0.6] });

    // ---- Pip's little stage ----
    const stage = k.box(2.6, 0.3, 1.8, TIMBER_L); k.at(stage, 7.8, 0, -3.9); api.add(stage);
    const stEdge = k.box(2.7, 0.08, 0.1, GOLD); k.at(stEdge, 7.8, 0.3, -3.0); api.add(stEdge);
    const bard = k.figure({ model: "Rogue_Hooded", robe: "#3f7a4a", trim: GOLD });
    k.at(bard, 7.8, 0.3, -4.0, -0.25); api.spot("bard", bard, { walkTo: [7.4, -2.2] });
    api.notes = [];
    [0, 1, 2].forEach(i => { const n = k.emoji(i % 2 ? "🎶" : "🎵", 0.35); k.at(n, 7.3 + i * 0.5, 2.6 + i * 0.25, -3.6); api.add(n); api.notes.push(n); });
    const bowl = k.emoji("🍲", 0.4); k.at(bowl, 8.75, 0.55, -3.4); api.add(bowl); api.bowl = bowl;
    const lute = k.emoji("🪕", 0.5); k.at(lute, 6.85, 0.6, -3.5); api.add(lute);

    // ---- the guests' stairs, right, climbing into the opening ----
    const st = k.group();
    const steps = k.stairs(8, 2.2, 0.36, 0.5, WOOD); st.add(steps);
    const landing = k.box(2.4, 2.88, 1.4, TIMBER_L); k.at(landing, 0, 0, -4.6); st.add(landing);
    [-1.2, 1.2].forEach(x => { const side = k.box(0.2, 1.0, 4.4, TIMBER); k.at(side, x, 0, -1.9); st.add(side);
      for (let i = 0; i < 5; i++) { const b = k.box(0.08, 1.0, 0.08, TIMBER); k.at(b, x, 1 + i * 0.36 * 1.6, -i * 0.8); st.add(b); } });
    const rail = k.box(0.12, 0.12, 5.0, TIMBER); [-1.2, 1.2].forEach(x => { const r = rail.clone(); k.at(r, x, 2.3, -2.0); r.rotation.x = 0.6; st.add(r); });
    const dark = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 3.0), k.mat("#1a0e08")); k.at(dark, 0, 4.4, -5.3); st.add(dark);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 2.9), glowMat("#ffe3a0")); k.at(glow, 0, 4.4, -5.28); glow.visible = false; st.add(glow);
    const spark = k.emoji("✨", 0.9); k.at(spark, 0, 3.6, -4.2); spark.visible = false; st.add(spark);
    const slight = new THREE.PointLight("#ffd890", 0, 9); k.at(slight, 0, 3.4, -3.2); st.add(slight);
    // closed: a red rope between two posts and a GUESTS ONLY plaque
    const posts = [-0.95, 0.95].map(x => { const p = k.cylinder(0.07, 0.09, 1.1, TIMBER, 6); k.at(p, x, 0, 0.55); st.add(p); return p; });
    const knobs = [-0.95, 0.95].map(x => { const kn = k.sphere(0.1, GOLD, 6); k.at(kn, x, 1.15, 0.55); st.add(kn); return kn; });
    const rope = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 1.9, 6), k.mat(RED)); rope.rotation.z = Math.PI / 2; k.at(rope, 0, 0.95, 0.55); st.add(rope);
    const closed = k.sign("GUESTS ONLY", { height: 0.26 }); k.at(closed, 0, 0.62, 0.62); st.add(closed);
    k.at(st, STX, 0, -1.5);
    api.spot("stairs", st, { walkTo: [STX - 0.6, 0.0], height: 3 });
    api.stairsClosed = [...posts, ...knobs, rope, closed];
    api.stairsOpen = [glow, spark];
    api.stairsLight = slight;
  },

  update(api, st) {
    if (api.honey) api.honey.visible = !st.has("gotHoney");
    if (api.key7) api.key7.visible = !st.has("tookKey");
    if (api.bowl) api.bowl.visible = st.has("fed");
    api.quiet = st.has("fed");
    const open = !!st.open;
    (api.stairsClosed || []).forEach(o => { o.visible = !open; });
    (api.stairsOpen || []).forEach(o => { o.visible = open; });
    if (api.stairsLight) api.stairsLight.intensity = open ? 6 : 0;
  },

  tick(api, t) {
    if (api.fire) api.fire.intensity = 12 + Math.sin(t * 7) * 1.5 + Math.sin(t * 13) * 1;
    (api.flames || []).forEach((f, i) => { f.scale.y = 1 + Math.sin(t * 9 + i * 2) * 0.15; });
    (api.notes || []).forEach((n, i) => {
      // loud music before Pip has eaten; small, slow notes after
      const s = api.quiet ? 0.5 : 1;
      n.position.y = (api.quiet ? 2.4 : 2.6) + ((t * (api.quiet ? 0.2 : 0.5) + i * 0.33) % 1) * 1.2 * s;
      n.scale.setScalar(s);
    });
    (api.steam || []).forEach((s, i) => { s.position.y = 0.95 + ((t * 0.4 + i * 0.5) % 1) * 0.6; });
    if (api.stairsLight && api.stairsLight.intensity > 0) api.stairsLight.intensity = 5 + Math.sin(t * 2) * 1.2;
  },
};
