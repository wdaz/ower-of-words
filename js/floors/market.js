// The Market. A teal-walled bazaar with three striped stalls and stairs going up on the right.
// Spot ids (must match content.js): child, fseller, fruit, fishman, fish, jeweler, ring, stairs
export default {
  sky: { top: "#8fd0c2", bottom: "#cfe9d8" },
  fog: { color: "#bfe0d2", near: 24, far: 60 },
  groundColor: "#a3805c",
  light: { sky: "#f4fff8", ground: "#3a5a4e", hemi: 1.15, sun: "#fff2d8", sunIntensity: 1.6, sunPos: [-8, 16, 9] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-6, 3.2];

    // ---- the market wall: teal, with dark arches, a cap and an opening above the stairs (x = 9.5)
    const STX = 9.5;
    const wall = k.archWall(34, 7, 1.2, "#2f6d60", 2.4, 5.8);
    k.at(wall, STX, 0, -6.2); api.add(wall);
    // the wall only spans x -7.5..26.5 from STX; extend it to the left
    const wallL = k.box(12, 7, 1.2, "#2f6d60"); k.at(wallL, -13.5, 0, -6.2); api.add(wallL);
    const cap = k.box(42, 0.7, 1.6, "#22524a"); k.at(cap, 0, 7, -6.2); api.add(cap);
    [-8.5, -2.5, 2.5].forEach(x => { const a = k.archSlab(2.2, 4.2, 0.2, "#22524a"); k.at(a, x, 0.2, -5.55); api.add(a); });
    // crenellations along the top
    for (let x = -18; x <= 20; x += 2) { const c = k.box(1, 0.6, 1.2, "#22524a"); k.at(c, x, 7.7, -6.2); api.add(c); }
    // distant rooftops and the tower going on above
    const far = k.cylinder(3, 3.6, 34, "#6aa596", 8); k.at(far, -6, 0, -30); api.add(far);
    [[-24, 6], [-16, 9], [16, 8], [24, 5]].forEach(([x, h]) => { const r = k.box(6, h, 4, "#7fb3a4"); k.at(r, x, 0, -22); api.add(r); });

    // bunting along the wall
    const flagCols = ["#f0b43c", "#c3452c", "#f6ead2", "#a46bc0"];
    const rope = k.box(22, 0.04, 0.04, "#3a2a1c"); k.at(rope, -1, 5.7, -5.5); api.add(rope);
    for (let i = 0; i < 16; i++) {
      const f = k.cone(0.22, 0.45, flagCols[i % 4], 3); f.rotation.x = Math.PI; f.scale.z = 0.25;
      k.at(f, -11.5 + i * 1.4, 5.7, -5.45); api.add(f);
    }

    // flagstones along the walkway
    for (let i = 0; i < 10; i++) {
      const s = k.box(1.7, 0.05, 1.2, i % 2 ? "#8c6b4c" : "#b08c66");
      k.at(s, -9.5 + i * 2.1, 0, 0.6); api.add(s);
    }

    // ---- stalls
    function awning(cols, w = 3.2, d = 2) {
      const g = new THREE.Group();
      const n = 7, sw = w / n;
      for (let i = 0; i < n; i++) { const s = k.box(sw, 0.06, d, cols[i % 2]); k.at(s, -w / 2 + sw / 2 + i * sw, 0, 0); g.add(s); }
      // scalloped valance on the front edge
      for (let i = 0; i < n; i++) { const v = k.box(sw * 0.92, 0.22, 0.04, cols[i % 2]); k.at(v, -w / 2 + sw / 2 + i * sw, -0.22, d / 2); g.add(v); }
      g.rotation.x = 0.22; // front lower than back
      return g;
    }
    function stall(o) {
      // local origin at the front of the counter; seller stands at z = -1.2 behind it
      const g = new THREE.Group();
      const counter = k.box(2.6, 0.95, 0.9, o.wood); counter.position.z = -0.45; g.add(counter);
      const top = k.box(2.8, 0.08, 1.05, o.top); k.at(top, 0, 0.95, -0.45); g.add(top);
      [[-1.5, 0.05], [1.5, 0.05], [-1.5, -2.2], [1.5, -2.2]].forEach(([x, z]) => {
        const h = z > -1 ? 3.0 : 3.45;
        const p = k.box(0.12, h, 0.12, "#4a2e1c"); k.at(p, x, 0, z); g.add(p);
      });
      const aw = awning(o.awning); k.at(aw, 0, 3.22, -1.08); g.add(aw);
      const plate = k.sign(o.label, { height: 0.3 }); k.at(plate, 0, 0.5, 0.01); g.add(plate);
      // the same price, painted big on the wall above the stall
      const wsign = k.sign(o.label, { height: 0.5, bg: "#f6ead2" }); k.at(wsign, 0, 4.35, -3.1); g.add(wsign);
      o.goods.forEach(([ch, x, s]) => { const e = k.emoji(ch, s || 0.55); k.at(e, x, 1.28, -0.45); g.add(e); });
      k.at(g, o.x, 0, -2.0);
      g.userData.height = 1.6;
      return g;
    }

    const fruit = stall({ x: -5, label: "FRUIT · 2 COINS", wood: "#7a4a2a", top: "#5a3320", awning: ["#f0b43c", "#c3452c"],
      goods: [["🍎", -0.8], ["🍐", 0], ["🍊", 0.8]] });
    const crate = k.box(0.8, 0.5, 0.6, "#8a5a32"); k.at(crate, -1.9, 0, 0.2); fruit.add(crate);
    const ap = k.emoji("🍎", 0.4); k.at(ap, -1.9, 0.7, 0.2); fruit.add(ap);
    api.spot("fruit", fruit, { walkTo: [-5.6, -0.8], height: 1.7 });

    const fish = stall({ x: 0, label: "FISH · 5 COINS", wood: "#5a4a3a", top: "#cfe3ef", awning: ["#cfe3ef", "#3a6fa0"],
      goods: [["🐟", -0.6], ["🐟", 0.55]] });
    const bucket = k.cylinder(0.32, 0.26, 0.6, "#3a6fa0", 8); k.at(bucket, 1.9, 0, 0.2); fish.add(bucket);
    const hang = k.emoji("🐟", 0.4); k.at(hang, -1.1, 2.55, 0.02); fish.add(hang);
    api.spot("fish", fish, { walkTo: [-0.6, -0.8], height: 1.7 });

    const ring = stall({ x: 5, label: "RING · 100 COINS", wood: "#3a2a40", top: "#5b2d6e", awning: ["#a46bc0", "#f0b43c"],
      goods: [["💍", 0, 0.5]] });
    const cushion = k.box(0.6, 0.12, 0.45, "#c3452c"); k.at(cushion, 0, 0.99, -0.45); ring.add(cushion);
    const chest = k.box(0.7, 0.55, 0.5, "#6b4a20"); k.at(chest, 1.95, 0, 0.1); ring.add(chest);
    const lid = k.box(0.72, 0.08, 0.52, "#f0b43c"); k.at(lid, 1.95, 0.55, 0.1); ring.add(lid);
    api.spot("ring", ring, { walkTo: [4.4, -0.8], height: 1.7 });

    // ---- the merchants, behind their counters (under the awnings, well below them)
    const fseller = k.figure({ robe: "#c3452c", trim: "#f0b43c", mask: "#f6ead2", hat: "turban" });
    k.at(fseller, -4.6, 0, -3.3); api.spot("fseller", fseller, { walkTo: [-4.1, -0.8] });
    const fishman = k.figure({ robe: "#3a6fa0", trim: "#e6e6e6", mask: "#e8f0f4", hat: "round" });
    k.at(fishman, 0.4, 0, -3.3); api.spot("fishman", fishman, { walkTo: [0.9, -0.8] });
    const jeweler = k.figure({ robe: "#5b2d6e", trim: "#f0b43c", mask: "#f4e6f0", hat: "crown" });
    k.at(jeweler, 5.4, 0, -3.3); api.spot("jeweler", jeweler, { walkTo: [5.9, -0.8] });

    // ---- the child, on the left near a basket
    const child = k.figure({ scale: 0.7, robe: "#e3a23d", trim: "#2f6d60", mask: "#fff3dc", hat: "hood" });
    k.at(child, -9, 0, -1); child.rotation.y = 0.4; api.spot("child", child, { walkTo: [-8.6, 0.4] });
    const basket = k.cylinder(0.35, 0.28, 0.4, "#b08440", 8); k.at(basket, -10, 0, -1.6); api.add(basket);
    const pot = k.cylinder(0.25, 0.4, 0.8, "#c3452c", 8); k.at(pot, -10.4, 0, -3); api.add(pot);
    const pot2 = k.cylinder(0.2, 0.32, 0.6, "#f0b43c", 8); k.at(pot2, -9.6, 0, -3.4); api.add(pot2);

    // ---- the stairs up, on the right, leading into the opening in the wall
    const st = k.group();
    const steps = k.stairs(7, 2.2, 0.36, 0.55, "#b08c66"); st.add(steps);
    const landing = k.box(2.4, 2.52, 1.6, "#9c7b5a"); k.at(landing, 0, 0, -4.4); st.add(landing);
    [-1.25, 1.25].forEach(x => { const side = k.box(0.3, 2.6, 4.6, "#22524a"); k.at(side, x, 0, -2.0); side.scale.y = 1; st.add(side); });
    const dark = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 3.6), k.mat("#163a33")); k.at(dark, 0, 4.3, -5.0); st.add(dark);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 3.5), new THREE.MeshBasicMaterial({ color: "#fff3c4" }));
    k.at(glow, 0, 4.3, -4.98); glow.visible = false; st.add(glow);
    const spark = k.emoji("✨", 0.9); k.at(spark, 0, 3.4, -4.2); spark.visible = false; st.add(spark);
    const light = new THREE.PointLight("#ffe9a8", 0, 9); k.at(light, 0, 3.5, -3.5); st.add(light);
    // closed: two posts, a red bar and a CLOSED plaque
    const posts = [-1.0, 1.0].map(x => { const p = k.box(0.14, 1.2, 0.14, "#4a2e1c"); k.at(p, x, 0, 0.55); st.add(p); return p; });
    const bar = k.box(2.1, 0.12, 0.1, "#c3452c"); k.at(bar, 0, 0.95, 0.55); st.add(bar);
    const closed = k.sign("CLOSED", { height: 0.3 }); k.at(closed, 0, 0.62, 0.62); st.add(closed);
    k.at(st, STX, 0, -1.3);
    api.spot("stairs", st, { walkTo: [STX - 0.4, 0.2], height: 2.6 });
    api.stairsClosed = [...posts, bar, closed];
    api.stairsOpen = [glow, spark];
    api.stairsLight = light;
  },

  update(api, st) {
    const open = !!st.open;
    (api.stairsClosed || []).forEach(o => { o.visible = !open; });
    (api.stairsOpen || []).forEach(o => { o.visible = open; });
    if (api.stairsLight) api.stairsLight.intensity = open ? 6 : 0;
  },

  tick(api, t) {
    if (api.stairsLight && api.stairsLight.intensity > 0) api.stairsLight.intensity = 5 + Math.sin(t * 2) * 1.2;
  },
};
