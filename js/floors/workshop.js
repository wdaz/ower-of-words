// The Workshop. A smoky brick hall of craftspeople: the smith's forge and anvil on the left, the carpenter's bench
// and woodpile, the broken lift in the middle under its great gear wheel and clock, the clockmaker's bench,
// the tool shelf and Pip hiding by the spare gears on the right.
// Spot ids (must match js/content/workshop.js): smith, carpenter, clockmaker, pip, hammer, wood, rope, oil, gears, tools, lift
export default {
  sky: { top: "#1e1512", bottom: "#4a2c1e" },
  fog: { color: "#3e2a20", near: 18, far: 48 },
  groundColor: "#4e3e33",
  light: { sky: "#ffd6aa", ground: "#2a1a12", hemi: 0.95, sun: "#ffc890", sunIntensity: 1.25, sunPos: [-7, 15, 9] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-6, 1.8];
    const BRICK = "#6e3b2b", BRICK_D = "#4f2a1f", SOOT = "#2b2220", WOOD = "#6a4428", WOOD_D = "#3e2716", WOOD_L = "#9a6a40",
      IRON = "#3d3b3e", IRON_L = "#6a6870", BRASS = "#c8963a", COPPER = "#b5653a";
    const glowMat = c => new THREE.MeshBasicMaterial({ color: c });

    // ---- the hall: brick back wall with mortar bands, side walls, soot-black beams ----
    const wall = k.box(30, 11, 1.2, BRICK); k.at(wall, 0, 0, -6.2); api.add(wall);
    for (let y = 0.6; y < 11; y += 0.6) { const b = k.box(30, 0.05, 0.05, BRICK_D); k.at(b, 0, y, -5.58); api.add(b); }
    for (let i = 0; i < 40; i++) { // a few bricks a shade different, here and there
      const b = k.box(0.9, 0.5, 0.06, i % 3 ? "#7d4634" : "#5c3022");
      k.at(b, -14 + ((i * 7.3) % 28), 0.05 + ((i * 5) % 17) * 0.6, -5.56); api.add(b);
    }
    const base = k.box(30, 0.8, 0.3, SOOT); k.at(base, 0, 0, -5.5); api.add(base);
    [-13.5, 13.5].forEach(x => { const s = k.box(1, 11, 14, BRICK_D); k.at(s, x, 0, -0.5); api.add(s); });
    [-9.8, -5.0, 5.4, 9.0].forEach(x => { const p = k.box(0.5, 9, 0.5, WOOD_D); k.at(p, x, 0, -5.4); api.add(p); });
    const beam = k.box(30, 0.5, 0.6, WOOD_D); k.at(beam, 0, 8.2, -5.3); api.add(beam);
    [-8, -2, 4, 10].forEach(x => { const b = k.box(0.45, 0.45, 10, WOOD_D); k.at(b, x, 8.6, -1); api.add(b); });
    // stone floor slabs and soot stains
    for (let i = 0; i < 11; i++) for (let j = 0; j < 3; j++) {
      const s = k.box(1.9, 0.03, 1.5, (i + j) % 2 ? "#5a483b" : "#46372d"); k.at(s, -10 + i * 2, 0, -3.6 + j * 1.6); api.add(s);
    }
    // hanging chains and hooks from the beams
    [[-3.4, -1.2], [7.6, -0.8], [-10.2, -2]].forEach(([x, z]) => {
      for (let i = 0; i < 7; i++) {
        const l = new THREE.Mesh(new THREE.TorusGeometry(0.09, 0.025, 4, 8), k.mat(IRON_L));
        l.position.set(x, 8.3 - i * 0.16, z); l.rotation.y = i % 2 ? Math.PI / 2 : 0; api.add(l);
      }
      const hook = k.cone(0.07, 0.25, IRON, 5); hook.rotation.x = Math.PI; k.at(hook, x, 7.0, z); api.add(hook);
    });
    // hanging lanterns with warm light
    [-5.5, 6.5].forEach(x => {
      const cord = k.box(0.04, 2.2, 0.04, SOOT); k.at(cord, x, 6.0, -2.2); api.add(cord);
      const cap = k.cone(0.32, 0.3, IRON, 4); k.at(cap, x, 6.05, -2.2); api.add(cap);
      const plate = k.box(0.4, 0.06, 0.4, IRON); k.at(plate, x, 5.5, -2.2); api.add(plate);
      const flame = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.45, 0.26), glowMat("#ffc56a")); flame.position.set(x, 5.8, -2.2); api.add(flame);
    });
    const lampL = new THREE.PointLight("#ffbf7a", 10, 12, 1.6); lampL.position.set(4, 4.5, -1); api.add(lampL);

    // ---- the forge: brick hearth, glowing coals, a hood and a chimney; smoke drifts up ----
    const forge = k.group();
    const hearth = k.box(2.8, 1.1, 1.8, BRICK_D); forge.add(hearth);
    const rim = k.box(3.0, 0.15, 2.0, SOOT); rim.position.y = 1.1; forge.add(rim);
    const coals = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.12, 1.3), glowMat("#ff7a2a")); coals.position.y = 1.2; forge.add(coals);
    for (let i = 0; i < 9; i++) { const c = k.sphere(0.13, i % 2 ? "#ffb04a" : "#d84a1a", 5); c.material = glowMat(i % 2 ? "#ffb04a" : "#e85a20"); c.position.set(-0.9 + i * 0.22, 1.28, ((i * 37) % 7) / 7 - 0.5); forge.add(c); }
    const hood = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 1.8, 1.6, 4, 1), k.mat(SOOT, { flatShading: true }));
    hood.rotation.y = Math.PI / 4; hood.position.y = 3.6; forge.add(hood);
    const chimney = k.box(1.1, 5, 1.1, BRICK_D); chimney.position.y = 6.9; forge.add(chimney);
    const bellows = k.box(0.9, 0.3, 0.6, "#6a3f2a"); bellows.position.set(1.85, 0.6, 0.3); bellows.rotation.z = 0.25; forge.add(bellows);
    k.at(forge, -9.1, 0, -4.4); api.add(forge);
    api.coals = coals;
    api.fireLight = new THREE.PointLight("#ff8a3a", 22, 11, 1.4); api.fireLight.position.set(-8.6, 2.2, -2.8); api.add(api.fireLight);
    api.smoke = [];
    for (let i = 0; i < 7; i++) {
      const p = new THREE.Mesh(new THREE.IcosahedronGeometry(0.5, 0), new THREE.MeshLambertMaterial({ color: "#6a5e58", transparent: true, opacity: 0.25, depthWrite: false, flatShading: true }));
      p.userData.phase = i / 7; api.add(p); api.smoke.push(p);
    }
    // a water barrel and tongs by the forge
    const barrel = k.cylinder(0.45, 0.4, 0.9, "#5a3a22", 10); k.at(barrel, -10.6, 0, -2.6); api.add(barrel);
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.4, 12), k.mat("#2e4a58")); water.rotation.x = -Math.PI / 2; water.position.set(-10.6, 0.88, -2.6); api.add(water);
    [-0.5, 0.5].forEach(x => { const h = new THREE.Mesh(new THREE.TorusGeometry(0.43, 0.03, 4, 14), k.mat(IRON)); h.rotation.x = Math.PI / 2; h.position.set(-10.6, 0.45 + x * 0.6, -2.6); api.add(h); });

    // ---- the anvil with the smith's hammer on it ----
    const anvil = k.group();
    const stump = k.cylinder(0.42, 0.48, 0.5, "#5a3a22", 9); anvil.add(stump);
    const waist = k.box(0.35, 0.25, 0.3, IRON); waist.position.y = 0.6; anvil.add(waist);
    const face = k.box(0.95, 0.2, 0.4, IRON_L); face.position.y = 0.82; anvil.add(face);
    const horn = k.cone(0.16, 0.45, IRON_L, 6); horn.rotation.z = Math.PI / 2; horn.position.set(-0.68, 0.92, 0); anvil.add(horn);
    const hammer = k.group();
    const handle = k.box(0.7, 0.07, 0.07, WOOD_L); handle.position.set(0.12, 0, 0); hammer.add(handle);
    const head = k.box(0.14, 0.18, 0.26, IRON); head.position.set(-0.22, 0, 0); hammer.add(head);
    hammer.position.set(0.05, 1.0, 0.05); hammer.rotation.y = 0.5; anvil.add(hammer);
    const hsign = k.sign("HAMMER", { height: 0.2 }); hsign.position.set(0, 0.28, 0.5); anvil.add(hsign);
    k.at(anvil, -6.3, 0, -1.9); anvil.userData.height = 1.3;
    api.spot("hammer", anvil, { walkTo: [-5.6, -0.6], height: 1.3 });
    api.sparks = [];
    for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), glowMat("#ffd27a")); s.userData.phase = i / 6; api.add(s); api.sparks.push(s); }

    // the smith: a big Barbarian in a leather apron, between the forge and the anvil
    const smith = k.figure({ model: "Barbarian", robe: "#7a4a30", scale: 1.05 });
    k.at(smith, -7.6, 0, -3.0, 0.1); api.spot("smith", smith, { walkTo: [-8.6, -1.4] });

    // ---- the carpenter's corner: a woodpile and her low workbench ----
    const pile = k.group();
    for (let r = 0; r < 3; r++) for (let i = 0; i < 4 - r; i++) {
      const log = k.cylinder(0.22, 0.22, 2.0, i % 2 ? "#8a5a34" : "#7a4e2c", 8);
      log.rotation.x = Math.PI / 2; log.position.set(-0.75 + i * 0.47 + r * 0.24, 0.22 + r * 0.4, 0); pile.add(log);
      const end = new THREE.Mesh(new THREE.CircleGeometry(0.19, 8), k.mat("#c8945a")); end.position.set(log.position.x, log.position.y, 1.01); pile.add(end);
    }
    [-1.4, -1.1].forEach((x, i) => { const pl = k.box(0.3, 2.6, 0.06, WOOD_L); pl.position.set(x - 0.2, 0, -0.6); pl.rotation.z = 0.12 + i * 0.05; pile.add(pl); });
    const wsign = k.sign("WOOD · DRY", { height: 0.26 }); wsign.position.set(0, 1.55, 0.3); pile.add(wsign);
    k.at(pile, -3.6, 0, -4.5); pile.userData.height = 1.9;
    api.spot("wood", pile, { walkTo: [-3.8, -3.2], height: 1.9 });

    const bench = k.group();
    const btop = k.box(2.4, 0.1, 0.9, WOOD_L); btop.position.y = 0.78; bench.add(btop);
    [[-1.05, -0.35], [1.05, -0.35], [-1.05, 0.35], [1.05, 0.35]].forEach(([x, z]) => { const l = k.box(0.12, 0.78, 0.12, WOOD); l.position.set(x, 0, z); bench.add(l); });
    const plank = k.box(1.8, 0.06, 0.32, "#b88654"); plank.position.set(-0.1, 0.86, 0.05); bench.add(plank);
    const saw = k.group();
    const blade = k.box(0.8, 0.22, 0.02, "#b9bcc2"); saw.add(blade); blade.position.y = 0;
    const grip = k.box(0.22, 0.22, 0.08, "#7a3a22"); grip.position.set(0.5, 0, 0); saw.add(grip);
    saw.rotation.x = -Math.PI / 2; saw.position.set(0.3, 0.9, -0.2); saw.rotation.z = 0.3; bench.add(saw);
    const ruler = k.box(0.9, 0.02, 0.06, "#e8c86a"); ruler.position.set(-0.4, 0.9, 0.3); bench.add(ruler);
    for (let i = 0; i < 5; i++) { const sd = k.box(0.3, 0.02, 0.2, "#d8b07a"); sd.position.set(-1.6 + i * 0.6, 0, 0.6 + (i % 2) * 0.3); sd.rotation.y = i; bench.add(sd); }
    k.at(bench, -1.6, 0, -2.2); api.add(bench);
    const carpenter = k.figure({ model: "Rogue", robe: "#4f7a4a" });
    k.at(carpenter, -1.6, 0, -3.3); api.spot("carpenter", carpenter, { walkTo: [-0.4, -1.4] });

    // ---- the lift: a timber shaft, the great gear wheel and the clock above ----
    const LX = 2.6;
    const lift = k.group();
    [-1.45, 1.45].forEach(x => { const p = k.box(0.3, 6.1, 0.3, WOOD_D); p.position.set(x, 0, 0); lift.add(p); });
    const header = k.box(3.4, 0.4, 0.5, WOOD_D); header.position.y = 6.1; lift.add(header);
    const gear = new THREE.Group();
    const disc = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.2, 16), k.mat(BRASS)); disc.rotation.x = Math.PI / 2; gear.add(disc);
    for (let i = 0; i < 14; i++) { const t = k.box(0.18, 0.24, 0.2, BRASS); const a = i / 14 * Math.PI * 2; t.position.set(Math.cos(a) * 0.95, Math.sin(a) * 0.95 - 0.12, 0); t.rotation.z = a - Math.PI / 2; gear.add(t); }
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.3, 8), k.mat(IRON)); hub.rotation.x = Math.PI / 2; gear.add(hub);
    for (let i = 0; i < 4; i++) { const sp = k.box(1.4, 0.1, 0.12, "#a77a2c"); sp.position.y = -0.05; sp.rotation.z = i * Math.PI / 4; gear.add(sp); }
    gear.position.set(0, 5.1, 0.35); lift.add(gear);
    // the cage
    const cage = k.group();
    const floor = k.box(2.2, 0.2, 1.7, WOOD); cage.add(floor);
    const roof = k.box(2.2, 0.15, 1.7, WOOD); roof.position.y = 2.25; cage.add(roof);
    [[-1, -0.75], [1, -0.75], [-1, 0.75], [1, 0.75]].forEach(([x, z]) => { const c = k.box(0.12, 2.3, 0.12, WOOD_D); c.position.set(x, 0, z); cage.add(c); });
    for (let i = 0; i < 5; i++) { const bar = k.box(0.05, 2.0, 0.05, IRON_L); bar.position.set(-0.8 + i * 0.4, 0.2, 0.78); cage.add(bar); }
    const rail = k.box(2.1, 0.08, 0.08, BRASS); rail.position.set(0, 1.1, 0.8); cage.add(rail);
    const crack = k.box(0.9, 0.03, 0.08, "#1a1008"); crack.position.set(0.2, 0.21, 0.4); crack.rotation.y = 0.5; cage.add(crack);
    cage.position.set(0, 0, 0.2); lift.add(cage);
    // closed: broken rope ends, a red BROKEN plaque; open: a chain from the cage to the gear and a warm glow
    const ropeEnd = k.cylinder(0.05, 0.05, 1.3, "#b8925a", 6); ropeEnd.position.set(0, 3.8, 0.35); lift.add(ropeEnd);
    const fray = k.cone(0.12, 0.25, "#d8b07a", 6); fray.rotation.x = Math.PI; fray.position.set(0, 3.15, 0.35); lift.add(fray);
    const broken = k.sign("BROKEN", { height: 0.36, bg: "#c84a32", ink: "#fff2dc" }); broken.position.set(0, 2.75, 1.15); lift.add(broken);
    const chain = new THREE.Group();
    for (let i = 0; i < 16; i++) {
      const l = new THREE.Mesh(new THREE.TorusGeometry(0.08, 0.025, 4, 8), k.mat(IRON_L));
      l.position.set(0, 2.45 + i * 0.16, 0.35); l.rotation.y = i % 2 ? Math.PI / 2 : 0; chain.add(l);
    }
    lift.add(chain);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.6, 6.2), new THREE.MeshBasicMaterial({ color: "#ffe3a8", transparent: true, opacity: 0.3, depthWrite: false, blending: THREE.AdditiveBlending }));
    glow.position.set(0, 3.2, -0.5); lift.add(glow);
    const spark = k.emoji("✨", 0.9); spark.position.set(0, 2.9, 1.1); lift.add(spark);
    const liftLight = new THREE.PointLight("#ffe0a0", 0, 9); liftLight.position.set(0, 2.5, 1.2); lift.add(liftLight);
    k.at(lift, LX, 0, -4.6); lift.userData.height = 3;
    api.spot("lift", lift, { walkTo: [LX, -3.0], height: 3.2 });
    // the clock above the lift (stopped at ten past twelve)
    const clock = k.group();
    const cface = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 0.12, 20), k.mat("#efe2c4")); cface.rotation.x = Math.PI / 2; clock.add(cface);
    const cring = new THREE.Mesh(new THREE.TorusGeometry(0.78, 0.08, 6, 20), k.mat(BRASS)); clock.add(cring);
    const hourH = k.box(0.06, 0.42, 0.03, SOOT); hourH.position.set(0, 0.21, 0.08); clock.add(hourH);
    const minH = k.box(0.04, 0.6, 0.03, SOOT); 
    const minPivot = new THREE.Group(); minPivot.position.z = 0.1; minH.position.y = 0.3; minPivot.add(minH); minPivot.rotation.z = -Math.PI / 3; clock.add(minPivot);
    k.at(clock, LX, 7.1, -5.5); api.add(clock);
    api.cage = cage; api.ropeEnd = [ropeEnd, fray]; api.broken = broken; api.chain = chain; api.liftGlow = glow; api.liftSpark = spark; api.liftLight = liftLight; api.gear = gear;

    // the old rope piece on the floor beside the lift
    const rope = k.group();
    const coil = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.06, 5, 14), k.mat("#b8925a")); coil.rotation.x = Math.PI / 2; coil.position.y = 0.07; rope.add(coil);
    const tail = k.cylinder(0.055, 0.055, 1.1, "#b8925a", 6); tail.rotation.z = Math.PI / 2; tail.rotation.y = 0.4; tail.position.set(0.7, 0.06, 0.2); rope.add(tail);
    const rsign = k.sign("OLD ROPE", { height: 0.2 }); rsign.position.set(0.1, 0.45, 0.25); rsign.rotation.x = -0.3; rope.add(rsign);
    k.at(rope, 4.7, 0, -2.6); rope.userData.height = 0.8;
    api.spot("rope", rope, { walkTo: [4.6, -1.4], height: 0.8 });
    api.rope = rope;
    // sandbags waiting for the test
    [[0.6, -2.4], [0.3, -2.0], [0.75, -1.9]].forEach(([x, z], i) => { const s = k.sphere(0.3, "#b8a07a", 6); s.scale.y = 0.65; s.position.set(x, 0.2 + (i === 2 ? 0.0 : 0), z); api.add(s); });

    // ---- the clockmaker's bench, and the gear board on the wall behind it ----
    const cbench = k.group();
    const ctop = k.box(2.2, 0.1, 0.85, WOOD_L); ctop.position.y = 0.76; cbench.add(ctop);
    const cfront = k.box(2.1, 0.62, 0.05, WOOD); cfront.position.set(0, 0.1, 0.4); cbench.add(cfront);
    for (let i = 0; i < 7; i++) {
      const g = new THREE.Mesh(new THREE.CylinderGeometry(0.06 + (i % 3) * 0.04, 0.06 + (i % 3) * 0.04, 0.03, 10), k.mat(i % 2 ? BRASS : COPPER));
      g.position.set(-0.8 + i * 0.25, 0.83, (i % 2) * 0.2 - 0.1); cbench.add(g);
    }
    const clockBody = k.box(0.5, 0.6, 0.3, WOOD_D); clockBody.position.set(0.75, 0.81, -0.1); cbench.add(clockBody);
    const lens = new THREE.Mesh(new THREE.TorusGeometry(0.16, 0.03, 5, 12), k.mat(BRASS)); lens.position.set(-0.5, 1.25, 0.1); cbench.add(lens);
    const lensArm = k.box(0.04, 0.5, 0.04, IRON); lensArm.position.set(-0.7, 0.81, 0.1); cbench.add(lensArm);
    const candle = k.cylinder(0.05, 0.05, 0.22, "#efe2c4", 6); candle.position.set(-0.95, 0.81, -0.2); cbench.add(candle);
    const cfl = new THREE.Mesh(new THREE.ConeGeometry(0.04, 0.12, 6), glowMat("#ffcf6a")); cfl.position.set(-0.95, 1.1, -0.2); cbench.add(cfl);
    k.at(cbench, 6.8, 0, -2.2); api.add(cbench);
    const clockmaker = k.figure({ model: "Mage", robe: "#3f4f86", hideHat: true });
    k.at(clockmaker, 6.8, 0, -3.3); api.spot("clockmaker", clockmaker, { walkTo: [5.6, -1.2] });

    const board = k.group();
    const panel = k.box(2.2, 1.5, 0.1, WOOD_D); board.add(panel);
    [[-0.7, 0.45, 0.28], [0.1, 0.5, 0.2], [0.75, 0.4, 0.32], [-0.4, 1.0, 0.22], [0.5, 1.05, 0.18]].forEach(([x, y, r], i) => {
      const g = new THREE.Group();
      const d = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.06, 12), k.mat(i % 2 ? COPPER : BRASS)); d.rotation.x = Math.PI / 2; g.add(d);
      for (let j = 0; j < 8; j++) { const t = k.box(0.07, 0.09, 0.06, i % 2 ? COPPER : BRASS); const a = j / 8 * Math.PI * 2; t.position.set(Math.cos(a) * (r + 0.04), Math.sin(a) * (r + 0.04) - 0.045, 0); t.rotation.z = a - Math.PI / 2; g.add(t); }
      g.position.set(x, y, 0.1); board.add(g);
    });
    const gsign = k.sign("GEARS · DO NOT TOUCH", { height: 0.2 }); gsign.position.set(0, 1.6, 0.08); board.add(gsign);
    k.at(board, 8.4, 1.9, -5.5); board.userData.height = 3.8;
    api.spot("gears", board, { walkTo: [8.4, -3.3], height: 3.8 });

    // ---- the tool shelf, the oil can on the floor beside it, and Pip by the spare gear wheels ----
    const shelf = k.group();
    [-0.8, 0.8].forEach(x => { const s = k.box(0.1, 2.4, 0.6, WOOD); s.position.x = x; shelf.add(s); });
    [0.4, 1.2, 2.0].forEach(y => { const b = k.box(1.7, 0.08, 0.6, WOOD); b.position.y = y; shelf.add(b); });
    const tb = k.box(0.8, 0.35, 0.4, "#9a3a2a"); tb.position.set(-0.3, 0.44, 0); shelf.add(tb);
    const tbh = k.box(0.4, 0.06, 0.06, IRON); tbh.position.set(-0.3, 0.86, 0); shelf.add(tbh);
    [["🔧", -0.4, 1.5], ["🪛", 0.3, 1.5], ["🪓", 0.4, 2.35], ["🔩", -0.4, 2.3]].forEach(([e, x, y]) => { const s = k.emoji(e, 0.42); s.position.set(x, y, 0.2); shelf.add(s); });
    const tsign = k.sign("TOOLS · PUT THEM BACK!", { height: 0.2 }); tsign.position.set(0, 2.62, 0.32); shelf.add(tsign);
    k.at(shelf, 10.6, 0, -4.6); shelf.userData.height = 2.8;
    api.spot("tools", shelf, { walkTo: [10.2, -3.3], height: 2.8 });

    const oil = k.group();
    const can = k.cylinder(0.2, 0.24, 0.42, "#3a6a4a", 8); can.rotation.z = Math.PI / 2; can.position.set(0, 0.2, 0); oil.add(can);
    const spout = k.cylinder(0.03, 0.05, 0.4, "#3a6a4a", 6); spout.rotation.z = -0.6; spout.position.set(0.32, 0.32, 0); oil.add(spout);
    const puddle = new THREE.Mesh(new THREE.CircleGeometry(0.35, 10), k.mat("#1e1a14")); puddle.rotation.x = -Math.PI / 2; puddle.position.set(0.5, 0.02, 0.1); oil.add(puddle);
    const osign = k.sign("OIL", { height: 0.2 }); osign.position.set(0, 0.6, 0.2); oil.add(osign);
    k.at(oil, 9.4, 0, -3.3); oil.userData.height = 0.9;
    api.spot("oil", oil, { walkTo: [9.0, -2.2], height: 0.9 });
    api.oil = oil;

    // big spare gear wheels leaning against each other: Pip's hiding place
    [[10.9, -2.0, 0.9, -0.3], [10.4, -1.2, 0.65, 0.2]].forEach(([x, z, r, ry]) => {
      const g = new THREE.Group();
      const d = new THREE.Mesh(new THREE.CylinderGeometry(r, r, 0.16, 14), k.mat(IRON_L)); d.rotation.x = Math.PI / 2; g.add(d);
      for (let j = 0; j < 12; j++) { const t = k.box(0.16, 0.2, 0.16, IRON_L); const a = j / 12 * Math.PI * 2; t.position.set(Math.cos(a) * (r + 0.08), Math.sin(a) * (r + 0.08) - 0.1, 0); t.rotation.z = a - Math.PI / 2; g.add(t); }
      const h = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.2, 8), k.mat(IRON)); h.rotation.x = Math.PI / 2; g.add(h);
      g.position.set(x, r + 0.1, z); g.rotation.y = Math.PI / 2 + ry; g.rotation.x = 0.12; api.add(g);
    });
    const pip = k.figure({ model: "Rogue_Hooded", robe: "#c8873a", scale: 0.85 });
    k.at(pip, 9.3, 0, -1.3, -0.35); api.spot("pip", pip, { walkTo: [8.4, 0.2] });
  },

  update(api, st) {
    const open = !!st.open;
    if (api.rope) api.rope.visible = !st.has("gotRope");
    if (api.oil) api.oil.visible = !st.has("gotOil");
    api.spinGear = st.has("oiled") || open;
    if (api.cage) { api.cage.rotation.z = open ? 0 : 0.16; api.cage.rotation.y = open ? 0 : -0.12; api.cage.position.y = open ? 0 : -0.02; }
    (api.ropeEnd || []).forEach(o => { o.visible = !open; });
    if (api.broken) api.broken.visible = !open;
    if (api.chain) api.chain.visible = open;
    if (api.liftGlow) api.liftGlow.visible = open;
    if (api.liftSpark) api.liftSpark.visible = open;
    if (api.liftLight) api.liftLight.intensity = open ? 6 : 0;
  },

  tick(api, t, dt = 0.016) {
    if (api.fireLight) api.fireLight.intensity = 20 + Math.sin(t * 7) * 3 + Math.sin(t * 13.3) * 2;
    if (api.coals) api.coals.material.color.setHSL(0.06 + Math.sin(t * 3) * 0.01, 1, 0.55 + Math.sin(t * 5) * 0.05);
    (api.smoke || []).forEach(p => {
      const f = (t * 0.12 + p.userData.phase) % 1;
      p.position.set(-9.1 + Math.sin(f * 6 + p.userData.phase * 9) * 0.5, 8.6 + f * 4, -4.4 + f * 0.8);
      p.scale.setScalar(0.6 + f * 1.6); p.material.opacity = 0.28 * (1 - f);
    });
    (api.sparks || []).forEach(s => {
      const f = (t * 0.8 + s.userData.phase) % 1, a = s.userData.phase * 3.0 - 0.6;
      s.position.set(-6.1 + Math.cos(a) * f * 0.6, 1.05 + Math.sin(f * Math.PI) * 0.45, -1.8 + Math.abs(Math.sin(a)) * f * 0.5);
      s.visible = f < 0.7;
    });
    if (api.gear && api.spinGear) api.gear.rotation.z -= dt * 0.8;
    if (api.liftLight && api.liftLight.intensity > 0) api.liftLight.intensity = 5 + Math.sin(t * 2) * 1.2;
    if (api.liftSpark && api.liftSpark.visible) api.liftSpark.material.rotation = Math.sin(t) * 0.3;
  },
};
