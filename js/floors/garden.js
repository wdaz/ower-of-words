// The Garden. A hanging healers' garden high on the tower, above the clouds: herb beds, beehives,
// a lily pond, a glass greenhouse and a garden gate with stairs going up.
// Spot ids (must match js/content/garden.js): hives, honey, beekeeper, herbs, gardener, healer, mint,
// berries, lemon, child, mother, gate
const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// hide/show an object and every mesh in it (the engine's picker checks each hit mesh's own visibility)
function setVis(obj, v) { if (obj) obj.traverse(o => { o.visible = v; }); }
// decorative meshes that should never catch a click (glass, vines in front of things)
function noPick(obj) { obj.traverse(o => { o.raycast = () => {}; }); return obj; }

export default {
  sky: { top: "#7cc3e0", bottom: "#fbe8c8" },
  fog: { color: "#e4efdc", near: 26, far: 75 },
  groundColor: "#6f9a4e",
  light: { sky: "#fffbe8", ground: "#3f5e34", hemi: 1.15, sun: "#fff3d6", sunIntensity: 1.6, sunPos: [-9, 16, 9] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-2, 3.4];
    // we are high on the tower: hide the engine's endless ground so the clouds show below the terrace
    api.scene.children.forEach(o => { if (o.isMesh && o.geometry?.parameters?.width === 200) o.visible = false; });

    const GRASS = "#78a653", GRASS2 = "#6c9a4a", STONE = "#d8cbb0", STONE2 = "#bfae8e", TERRA = "#c46a3c",
      WOOD = "#7a5232", LEAF = "#3f7a3a", LEAF2 = "#5c9a45", LAV = "#9a7ad0";

    // ---- the terrace: a thick block of earth and stone, a lawn on top, a stone rim
    const mass = k.box(28, 6, 17, "#8a7458"); k.at(mass, 0, -6, 1.2); api.add(mass);
    const lawn = k.box(28, 0.1, 17, GRASS); k.at(lawn, 0, -0.1, 1.2); api.add(lawn);
    // darker grass patches for texture
    for (let i = 0; i < 22; i++) {
      const p = k.box(1 + (i * 37 % 10) / 10, 0.02, 0.7 + (i * 53 % 8) / 10, GRASS2);
      k.at(p, -12 + (i * 71 % 24), 0, -4 + (i * 29 % 9)); p.rotation.y = i; api.add(noPick(p));
    }
    // a stone path winding from the front to the gate
    [[-6, 2.2], [-4, 1.8], [-2, 1.6], [0, 1.9], [2, 2.0], [4, 1.6], [6, 1.0], [7.8, 0.6], [9.2, -0.6], [10, -2.0], [10.3, -3.2]].forEach(([x, z], i) => {
      const s = k.cylinder(0.55, 0.6, 0.05, i % 2 ? STONE : STONE2, 7); k.at(s, x, 0, z); s.rotation.y = i; api.add(noPick(s));
    });
    // stone rim on the left, right and front edges
    const rimL = k.box(0.6, 0.5, 17, STONE2); k.at(rimL, -13.7, 0, 1.2); api.add(rimL);
    const rimR = k.box(0.6, 0.5, 17, STONE2); k.at(rimR, 13.7, 0, 1.2); api.add(rimR);

    // ---- the balustrade at the back, with pots and ivy hanging over the edge
    const bal = k.box(23, 0.95, 0.5, STONE); k.at(bal, -2.3, 0, -6); api.add(bal);
    const balTop = k.box(23.4, 0.14, 0.7, STONE2); k.at(balTop, -2.3, 0.95, -6); api.add(balTop);
    for (let x = -13.5; x <= 8.5; x += 1.1) { const b = k.cylinder(0.12, 0.16, 0.8, "#cdbf9f", 6); k.at(b, x, 0, -5.72); api.add(noPick(b)); }
    [-12, -6.2, -2.5, 8].forEach((x, i) => {
      const pot = k.cylinder(0.32, 0.22, 0.45, TERRA, 8); k.at(pot, x, 1.02, -6); api.add(pot);
      const bush = k.sphere(0.42, i % 2 ? LEAF : LEAF2, 7); bush.position.set(x, 1.75, -6); api.add(bush);
      const fl = k.emoji(["🌺", "🌼", "🌷", "🌸"][i], 0.38); fl.position.set(x + 0.15, 1.95, -5.6); api.add(fl);
      // ivy trailing down over the edge in front
      for (let j = 0; j < 3; j++) { const v = k.box(0.08, 0.9 + j * 0.25, 0.05, LEAF); k.at(v, x - 0.25 + j * 0.25, 0.1, -5.68); api.add(noPick(v)); }
    });

    // ---- clouds far below and around: we are above them
    const cloudMat = new THREE.MeshLambertMaterial({ color: "#ffffff", emissive: "#5a6a7a", flatShading: true, fog: true });
    api.clouds = [];
    [[-22, -3, -18], [-8, -4, -24], [6, -3.5, -20], [20, -2.5, -17], [-30, 1, -34], [28, 0.5, -32], [0, -1, -40], [-16, 2.5, -45], [15, 3, -48]].forEach(([x, y, z], i) => {
      const cl = new THREE.Group();
      [[0, 0, 3.4], [-2.6, -0.3, 2.4], [2.6, -0.2, 2.6], [0.9, 0.7, 2.0]].forEach(([dx, dy, r]) => {
        const b = new THREE.Mesh(new THREE.SphereGeometry(r, 9, 6), cloudMat); b.scale.y = 0.42; b.position.set(dx, dy, 0); cl.add(b);
      });
      cl.position.set(x, y, z); cl.userData.baseX = x; cl.userData.phase = i * 1.3;
      api.add(noPick(cl)); api.clouds.push(cl);
    });
    // the tower keeps going up behind the garden
    const tower = k.cylinder(5, 5.6, 40, "#cbbd9e", 10); k.at(tower, -4, -10, -30); api.add(noPick(tower));
    [-8, 0, 4].forEach((x, i) => { const w = k.archSlab(1.4, 2.8, 0.3, "#8a7a62"); k.at(w, x * 0.5 - 4, 8 + i * 5, -25); api.add(noPick(w)); });

    // ---- a pergola over the left side, with vines and hanging flower baskets
    [-11, -6.5].forEach(x => [-4.8].forEach(z => { const p = k.box(0.22, 3.6, 0.22, WOOD); k.at(p, x, 0, z); api.add(p); }));
    const beam = k.box(5.2, 0.2, 0.25, WOOD); k.at(beam, -8.75, 3.6, -4.8); api.add(beam);
    for (let i = 0; i < 6; i++) { const r = k.box(0.14, 0.14, 1.4, WOOD); k.at(r, -11 + i * 0.9, 3.75, -5.2); api.add(r); }
    for (let i = 0; i < 9; i++) { const v = k.box(0.07, 0.5 + (i * 7 % 5) * 0.15, 0.05, i % 2 ? LEAF : LEAF2); k.at(v, -11.2 + i * 0.6, 3.1 - (i * 7 % 5) * 0.15, -4.65); api.add(noPick(v)); }
    [-10, -7.5].forEach((x, i) => {
      const rope = k.box(0.03, 0.6, 0.03, "#5a3a22"); k.at(rope, x, 3.0, -4.7); api.add(noPick(rope));
      const bas = k.cylinder(0.3, 0.2, 0.3, "#b08440", 8); k.at(bas, x, 2.7, -4.7); api.add(noPick(bas));
      const fl = k.emoji(i ? "🌼" : "🌺", 0.4); fl.position.set(x, 3.15, -4.6); api.add(fl);
    });

    // ---- BEEHIVES: three straw skeps on a low stand, with bees buzzing around
    const hives = k.group();
    const stand = k.box(2.6, 0.4, 0.9, WOOD); hives.add(stand);
    [-0.85, 0, 0.85].forEach((x, i) => {
      for (let j = 0; j < 4; j++) {
        const ring = k.cylinder(0.42 - j * 0.09, 0.46 - j * 0.09, 0.22, j % 2 ? "#d9a63a" : "#e8bb52", 12);
        k.at(ring, x, 0.4 + j * 0.2, 0); hives.add(ring);
      }
      const hole = new THREE.Mesh(new THREE.CircleGeometry(0.08, 8), k.mat("#2a1a12")); hole.position.set(x, 0.55, 0.45); hives.add(hole);
    });
    const hsign = k.sign("BEES", { height: 0.22, bg: "#f6e3a8" }); hsign.position.set(0, 0.2, 0.46); hives.add(hsign);
    api.bees = [];
    for (let i = 0; i < 6; i++) { const b = k.emoji("🐝", 0.28); b.userData.phase = i * 1.1; hives.add(b); api.bees.push(b); }
    k.at(hives, -9.6, 0, -3.9);
    api.spot("hives", hives, { walkTo: [-9.6, -2.3], height: 1.9 });

    // honey shelf on the left, in front of the hives
    const honey = k.group();
    [-0.6, 0.6].forEach(x => { const l = k.box(0.1, 0.9, 0.5, WOOD); k.at(l, x, 0, 0); honey.add(l); });
    [0.35, 0.85].forEach(y => { const s = k.box(1.4, 0.07, 0.55, "#8e6440"); k.at(s, 0, y, 0); honey.add(s); });
    [[-0.38, 0.42, 0.22], [0.05, 0.42, 0.18], [0.42, 0.42, 0.2], [-0.3, 0.92, 0.2], [0.3, 0.92, 0.16]].forEach(([x, y, r]) => {
      const j = k.cylinder(r * 0.9, r, r * 1.6, "#e09a2a", 8); k.at(j, x, y, 0); honey.add(j);
      const lid = k.cylinder(r * 0.8, r * 0.8, 0.05, "#f6ead2", 8); k.at(lid, x, y + r * 1.6, 0); honey.add(lid);
    });
    const smallJar = k.emoji("🍯", 0.42); smallJar.position.set(0.32, 1.32, 0.05); honey.add(smallJar); api.smallJar = smallJar;
    const hpl = k.sign("HONEY", { height: 0.2, bg: "#f6e3a8" }); hpl.position.set(0, 0.18, 0.3); honey.add(hpl);
    k.at(honey, -10.4, 0, -1.3);
    api.spot("honey", honey, { walkTo: [-9.9, -0.2], height: 1.7 });

    // the beekeeper: hooded, in a sunny yellow, standing between the hives and the herb bed
    const beekeeper = k.figure({ model: "Rogue_Hooded", robe: "#e2b23c", trim: "#5a3a22", hat: "hood" });
    k.at(beekeeper, -7.5, 0, -3.2, 0.25);
    api.spot("beekeeper", beekeeper, { walkTo: [-7.3, -1.6] });

    // ---- HERB BED: a raised wooden planter with rows of lavender, sage and thyme
    const herbs = k.group();
    const bed = k.box(3.2, 0.5, 1.2, WOOD); herbs.add(bed);
    const soil = k.box(3.0, 0.04, 1.0, "#4a3020"); k.at(soil, 0, 0.5, 0); herbs.add(soil);
    for (let i = 0; i < 6; i++) { // lavender: purple spikes on the left
      const st = k.cylinder(0.02, 0.02, 0.4, LEAF, 4); k.at(st, -1.35 + (i % 3) * 0.3, 0.5, -0.25 + Math.floor(i / 3) * 0.45); herbs.add(st);
      const fl = k.cone(0.07, 0.28, LAV, 6); k.at(fl, -1.35 + (i % 3) * 0.3, 0.86, -0.25 + Math.floor(i / 3) * 0.45); herbs.add(fl);
    }
    for (let i = 0; i < 4; i++) { const s = k.sphere(0.2, "#9aae8a", 6); s.position.set(-0.05 + (i % 2) * 0.4, 0.68, -0.22 + Math.floor(i / 2) * 0.44); herbs.add(s); } // sage
    for (let i = 0; i < 4; i++) { const s = k.sphere(0.16, "#4f8a3c", 6); s.scale.y = 0.6; s.position.set(0.95 + (i % 2) * 0.35, 0.62, -0.22 + Math.floor(i / 2) * 0.44); herbs.add(s); } // thyme
    // little wooden labels stuck in the soil
    [["LAVENDER", -1.05], ["SAGE", 0.15], ["THYME", 1.12]].forEach(([t, x]) => {
      const peg = k.box(0.04, 0.3, 0.04, "#5a3a22"); k.at(peg, x, 0.45, 0.62); herbs.add(peg);
      const s = k.sign(t, { height: 0.13, bg: "#e8d8b4" }); s.position.set(x, 0.8, 0.64); herbs.add(s);
    });
    const herbSign = k.sign("HERBS", { height: 0.22, bg: "#e8d8b4" }); herbSign.position.set(0, 0.25, 0.61); herbs.add(herbSign);
    k.at(herbs, -4.4, 0, -0.6);
    api.spot("herbs", herbs, { walkTo: [-4.4, 0.6], height: 1.3 });

    // the gardener, behind the herb bed, with a watering can at his feet
    const gardener = k.figure({ model: "Barbarian", robe: "#6f8a3a", trim: "#c9a24a", hat: "turban", scale: 1.05 });
    k.at(gardener, -3.6, 0, -2.9, -0.1);
    api.spot("gardener", gardener, { walkTo: [-2.6, -1.9] });
    const can = k.group(k.cylinder(0.22, 0.25, 0.42, "#6a8ea0", 8));
    const spout = k.cylinder(0.03, 0.04, 0.5, "#6a8ea0", 6); spout.rotation.z = -0.9; spout.position.set(0.3, 0.38, 0); can.add(spout);
    k.at(can, -2.6, 0, -3.2); api.add(can);

    // ---- the healer's stone bench behind the pond, under a little fig tree
    const bench = k.group();
    const seat = k.box(2.0, 0.12, 0.7, STONE); k.at(seat, 0, 0.45, 0); bench.add(seat);
    [-0.75, 0.75].forEach(x => { const l = k.box(0.25, 0.45, 0.6, STONE2); k.at(l, x, 0, 0); bench.add(l); });
    k.at(bench, -0.6, 0, -3.6); api.add(bench);
    const trunk = k.cylinder(0.14, 0.2, 2.4, "#6a4a30", 7); k.at(trunk, -2.0, 0, -4.6); api.add(trunk);
    [[0, 2.7, 0, 1.0], [-0.6, 2.4, 0.2, 0.7], [0.6, 2.5, -0.1, 0.75]].forEach(([dx, y, dz, r]) => { const c = k.sphere(r, LEAF, 8); c.position.set(-2.0 + dx, y, -4.6 + dz); api.add(noPick(c)); });
    // herb bundles hanging to dry from the tree, and a basket of remedies by the bench
    const basket = k.cylinder(0.3, 0.24, 0.32, "#b08440", 8); k.at(basket, 0.9, 0, -3.1); api.add(basket);
    const pot = k.emoji("🫖", 0.4); pot.position.set(0.9, 0.55, -3.0); api.add(pot);
    const healer = k.figure({ model: "Mage", sit: true, robe: "#4f7a5c", trim: "#e6d7a8", hat: "tall", prop: "staff", scale: 1.05 });
    k.at(healer, -0.6, 0.55, -3.55);
    api.spot("healer", healer, { walkTo: [-0.6, -2.0] });

    // ---- POND in the middle, with a stone ring, lily pads, a lotus and a frog
    const PX = 2.1, PZ = -0.8;
    const water = new THREE.Mesh(new THREE.CircleGeometry(1.7, 24), k.mat("#4e9ab8")); water.rotation.x = -Math.PI / 2; water.position.set(PX, 0.05, PZ); api.add(noPick(water));
    const deep = new THREE.Mesh(new THREE.CircleGeometry(1.0, 20), k.mat("#3d84a3")); deep.rotation.x = -Math.PI / 2; deep.position.set(PX - 0.2, 0.055, PZ - 0.1); api.add(noPick(deep));
    for (let i = 0; i < 18; i++) {
      const a = i / 18 * Math.PI * 2, s = k.sphere(0.24 + (i % 3) * 0.04, i % 2 ? "#a99b82" : "#c2b496", 6); s.scale.y = 0.55;
      s.position.set(PX + Math.cos(a) * 1.85, 0.08, PZ + Math.sin(a) * 1.85); api.add(noPick(s));
    }
    [[0.6, 0.3], [-0.7, -0.4], [0.2, -0.8]].forEach(([dx, dz], i) => {
      const pad = new THREE.Mesh(new THREE.CircleGeometry(0.28, 10, 0.3, Math.PI * 1.8), k.mat("#4f8f3a")); pad.rotation.x = -Math.PI / 2; pad.position.set(PX + dx, 0.07, PZ + dz); api.add(noPick(pad));
      if (i === 0) { const lo = k.emoji("🪷", 0.38); lo.position.set(PX + dx, 0.25, PZ + dz); api.add(lo); }
      if (i === 1) { const fr = k.emoji("🐸", 0.34); fr.position.set(PX + dx, 0.22, PZ + dz); api.add(fr); api.frog = fr; }
    });
    // MINT: a clump of bright leaves at the front edge of the pond, by the water
    const mint = k.group();
    for (let i = 0; i < 7; i++) { const l = k.sphere(0.17, i % 2 ? "#5fc46a" : "#48b058", 6); l.scale.y = 0.7; l.position.set(-0.35 + (i % 4) * 0.23, 0.18 + Math.floor(i / 4) * 0.16, (i % 3) * 0.12 - 0.1); mint.add(l); }
    const mpeg = k.box(0.04, 0.35, 0.04, "#5a3a22"); k.at(mpeg, 0.45, 0, 0.25); mint.add(mpeg);
    const msign = k.sign("MINT", { height: 0.13, bg: "#e8d8b4" }); msign.position.set(0.45, 0.42, 0.27); mint.add(msign);
    k.at(mint, PX + 1.6, 0, PZ + 1.35);
    api.spot("mint", mint, { walkTo: [PX + 1.6, PZ + 2.5], height: 0.8 });

    // ---- GREENHOUSE: white frame, pale glass, a lemon tree and the moonberry bush inside
    const GX = 5.2, GZ = -4.3, GW = 4.6, GH = 2.9, GD = 2.6;
    const gh = k.group();
    const glass = new THREE.MeshLambertMaterial({ color: "#d8f0f0", transparent: true, opacity: 0.22, depthWrite: false });
    const pane = (w, h) => new THREE.Mesh(new THREE.PlaneGeometry(w, h), glass);
    const back = pane(GW, GH); back.position.set(0, GH / 2, -GD / 2); gh.add(back);
    [-1, 1].forEach(sd => { const p = pane(GD, GH); p.rotation.y = Math.PI / 2; p.position.set(sd * GW / 2, GH / 2, 0); gh.add(p); });
    // front glass only above the door height, so the plants inside stay clear
    const front = pane(GW, 0.7); front.position.set(0, GH - 0.35, GD / 2); gh.add(front);
    [-1, 1].forEach(sd => { const r = pane(GW, GD * 0.62); r.position.set(0, GH + 0.5, sd * GD * 0.25); r.rotation.x = -Math.PI / 2 + sd * 0.65; gh.add(r); });
    // frame
    const FR = "#f4f1e8";
    [[-GW / 2, -GD / 2], [GW / 2, -GD / 2], [-GW / 2, GD / 2], [GW / 2, GD / 2], [0, GD / 2], [0, -GD / 2]].forEach(([x, z]) => { const p = k.box(0.09, GH, 0.09, FR); k.at(p, x, 0, z); gh.add(p); });
    [GD / 2, -GD / 2].forEach(z => { const r = k.box(GW, 0.09, 0.09, FR); k.at(r, 0, GH, z); gh.add(r); });
    [-GW / 2, GW / 2].forEach(x => { const r = k.box(0.09, 0.09, GD, FR); k.at(r, x, GH, 0); gh.add(r); });
    const ridge = k.box(GW + 0.1, 0.1, 0.1, FR); k.at(ridge, 0, GH + 0.95, 0); gh.add(ridge);
    [-GW / 2, 0, GW / 2].forEach(x => [-1, 1].forEach(sd => { const r = k.box(0.07, 0.07, GD * 0.66, FR); r.rotation.x = sd * 0.65; k.at(r, x, GH + 0.5, sd * GD * 0.25); gh.add(r); }));
    const gsign = k.sign("GREENHOUSE", { height: 0.22, bg: "#f4f1e8" }); gsign.position.set(0, GH - 0.35, GD / 2 + 0.02); gh.add(gsign);
    // planting tables along the back wall
    const tbl = k.box(GW - 0.3, 0.6, 0.5, WOOD); k.at(tbl, 0, 0, -GD / 2 + 0.3); gh.add(tbl);
    [-1.6, -0.8, 0.8, 1.6].forEach((x, i) => { const p = k.cylinder(0.14, 0.1, 0.2, TERRA, 7); k.at(p, x, 0.6, -GD / 2 + 0.3); gh.add(p); const s = k.sphere(0.16, i % 2 ? LEAF2 : "#7cba5a", 6); s.position.set(x, 0.95, -GD / 2 + 0.3); gh.add(s); });
    k.at(gh, GX, 0, GZ); api.add(noPick(gh));

    // the lemon tree in a big red pot, inside on the left
    const lemon = k.group();
    const lpot = k.cylinder(0.42, 0.32, 0.6, "#b8402c", 10); lemon.add(lpot);
    const ltr = k.cylinder(0.07, 0.09, 1.0, "#6a4a30", 6); k.at(ltr, 0, 0.6, 0); lemon.add(ltr);
    const crown = k.sphere(0.65, "#4a8a3a", 9); crown.position.y = 1.85; lemon.add(crown);
    api.lemons = [];
    [[-0.4, 1.7, 0.45], [0.35, 2.05, 0.45], [0.1, 1.5, 0.6], [-0.15, 2.25, 0.4]].forEach(([x, y, z]) => { const l = k.emoji("🍋", 0.3); l.position.set(x, y, z); lemon.add(l); api.lemons.push(l); });
    const lsign = k.sign("LEMON", { height: 0.17, bg: "#f6e3a8" }); lsign.position.set(0, 0.3, 0.43); lemon.add(lsign);
    k.at(lemon, GX - 1.3, 0, GZ + 0.3);
    api.spot("lemon", lemon, { walkTo: [GX - 1.3, -2.0], height: 2.7 });

    // the moonberry bush, inside on the right: dark leaves, blue glowing berries, a warning sign
    const berries = k.group();
    const bpot = k.cylinder(0.36, 0.28, 0.45, "#5a4a6a", 8); berries.add(bpot);
    const bb = k.sphere(0.55, "#2f5a4a", 8); bb.position.y = 0.95; bb.scale.y = 0.85; berries.add(bb);
    const bmat = new THREE.MeshBasicMaterial({ color: "#6fa8ff" });
    [[0.3, 1.1, 0.45], [-0.25, 0.9, 0.48]].forEach(([x, y, z]) => { const b = new THREE.Mesh(new THREE.SphereGeometry(0.06, 6, 4), bmat); b.position.set(x, y, z); berries.add(b); });
    const warn = k.sign("DO NOT EAT!", { height: 0.16, bg: "#f4d4c8", ink: "#7a1a12" }); warn.position.set(0, 0.25, 0.37); berries.add(warn);
    k.at(berries, GX + 1.2, 0, GZ + 0.3);
    api.spot("berries", berries, { walkTo: [GX + 1.2, -2.0], height: 1.8 });

    // ---- Mila's little bed in front of the greenhouse, on the right, with her mother beside it
    const CX = 8.0, CZ = -2.3;
    const cot = k.group();
    const frame = k.box(1.0, 0.4, 1.7, WOOD); cot.add(frame);
    const mattress = k.box(0.95, 0.1, 1.6, "#f2ead8"); k.at(mattress, 0, 0.4, 0); cot.add(mattress);
    const blanket = k.box(0.97, 0.06, 0.9, "#8fb8d8"); k.at(blanket, 0, 0.5, 0.35); cot.add(blanket);
    const pillow = k.box(0.7, 0.16, 0.35, "#ffffff"); k.at(pillow, 0, 0.5, -0.6); cot.add(pillow);
    const head = k.box(1.0, 0.9, 0.08, WOOD); k.at(head, 0, 0, -0.85); cot.add(head);
    k.at(cot, CX, 0, CZ); api.add(cot);
    const cup = k.emoji("🍵", 0.32); cup.position.set(CX - 0.85, 0.75, CZ + 0.3); api.add(cup); api.teaCup = cup;
    const stool = k.cylinder(0.25, 0.25, 0.5, WOOD, 8); k.at(stool, CX - 0.85, 0, CZ + 0.3); api.add(stool);
    const child = k.figure({ model: "Mage", hideHat: true, sit: true, robe: "#e88aa0", trim: "#f6ead2", scale: 0.68 });
    k.at(child, CX, 0.5, CZ + 0.3);
    api.spot("child", child, { walkTo: [CX - 0.3, CZ + 1.9] });

    const mother = k.figure({ model: "Rogue", robe: "#8a4a7a", trim: "#e6c88a", scale: 1.0 });
    k.at(mother, CX + 1.6, 0, CZ - 0.4, -0.35);
    api.spot("mother", mother, { walkTo: [CX + 1.7, CZ + 1.4] });

    // ---- the GARDEN GATE at the back right: a hedge arch with an iron gate, stairs going up behind it
    const gate = k.group();
    const hedgeL = k.box(1.2, 2.6, 0.9, LEAF); k.at(hedgeL, -1.5, 0, 0); gate.add(hedgeL);
    const hedgeR = k.box(1.2, 2.6, 0.9, LEAF); k.at(hedgeR, 1.5, 0, 0); gate.add(hedgeR);
    const arch = new THREE.Mesh(new THREE.TorusGeometry(1.5, 0.35, 6, 14, Math.PI), k.mat(LEAF2)); arch.position.set(0, 2.6, 0); arch.castShadow = true; gate.add(arch);
    [[-1.1, 3.6], [0, 4.15], [1.1, 3.6], [-1.6, 2.4], [1.6, 2.4]].forEach(([x, y], i) => { const f = k.emoji(i % 2 ? "🌹" : "🌼", 0.32); f.position.set(x, y, 0.4); gate.add(f); });
    // steps going up behind the opening
    const steps = k.stairs(6, 1.8, 0.4, 0.5, STONE); k.at(steps, 0, 0, -0.7); gate.add(steps);
    const landing = k.box(1.8, 2.4, 1.2, STONE2); k.at(landing, 0, 0, -3.8); gate.add(landing);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 3.0), new THREE.MeshBasicMaterial({ color: "#fff3c4", transparent: true, opacity: 0.6 }));
    glow.position.set(0, 3.9, -3.2); gate.add(glow);
    const spark = k.emoji("✨", 0.8); spark.position.set(0, 3.2, -0.5); gate.add(spark);
    const gLight = new THREE.PointLight("#ffe9a8", 0, 9); gLight.position.set(0, 2.5, 1); gate.add(gLight);
    // closed: two iron gate leaves with bars and a lock
    const leaves = k.group();
    [-0.68, 0.68].forEach(x => {
      for (let i = 0; i < 5; i++) { const b = k.box(0.05, 2.1, 0.05, "#2f3a34"); k.at(b, x - 0.5 + i * 0.25, 0, 0.3); leaves.add(b); }
      [0.4, 1.9].forEach(y => { const r = k.box(1.3, 0.07, 0.06, "#2f3a34"); k.at(r, x, y, 0.3); leaves.add(r); });
      [0.5, -0.5].forEach(dx => { const sp = k.cone(0.06, 0.18, "#2f3a34", 4); k.at(sp, x + dx * 0.9, 2.1, 0.3); leaves.add(sp); });
    });
    const lock = k.emoji("🔒", 0.36); lock.position.set(0, 1.15, 0.45); leaves.add(lock);
    gate.add(leaves);
    const gsg = k.sign("GARDEN GATE", { height: 0.24, bg: "#e8d8b4" }); gsg.position.set(0, 3.0, 0.48); gate.add(gsg);
    k.at(gate, 10.3, 0, -5.4);
    api.spot("gate", gate, { walkTo: [10.3, -3.3], height: 3.4 });
    api.gateClosed = [leaves]; api.gateOpen = [glow, spark]; api.gateLight = gLight;

    // ---- small dressing: flower pots along the front edge and butterflies
    [[-12, 3.6, "🌷"], [-8.5, 4.4, "🌻"], [7, 4.2, "🌻"], [12, 3.4, "🌷"], [12.2, -1.5, "🌿"], [-12.5, 0.5, "🌿"]].forEach(([x, z, e]) => {
      const p = k.cylinder(0.32, 0.24, 0.5, TERRA, 8); k.at(p, x, 0, z); api.add(p);
      const f = k.emoji(e, 0.62); f.position.set(x, 0.85, z); api.add(f);
    });
    api.butterflies = [[-5, 1.6, 0.5], [3, 2.2, 1.5], [6.5, 1.8, -1.2]].map(([x, y, z], i) => {
      const b = k.emoji("🦋", 0.3); b.position.set(x, y, z); b.userData.base = [x, y, z]; b.userData.phase = i * 2.1; api.add(b); return b;
    });
  },

  update(api, st) {
    if (api.smallJar) api.smallJar.visible = !st.has("honey");
    if (api.lemons?.[0]) api.lemons[0].visible = !st.has("lemon");
    const open = !!st.open;
    (api.gateClosed || []).forEach(o => setVis(o, !open));
    (api.gateOpen || []).forEach(o => setVis(o, open));
    if (api.gateLight) api.gateLight.intensity = open ? 6 : 0;
  },

  tick(api, t) {
    if (reduceMotion) return;
    (api.bees || []).forEach(b => {
      const p = b.userData.phase;
      b.position.set(Math.sin(t * 1.3 + p) * 1.3, 1.4 + Math.sin(t * 2.1 + p * 2) * 0.35, 0.3 + Math.cos(t * 1.1 + p) * 0.6);
    });
    (api.butterflies || []).forEach(b => {
      const [x, y, z] = b.userData.base, p = b.userData.phase;
      b.position.set(x + Math.sin(t * 0.4 + p) * 1.5, y + Math.sin(t * 2.4 + p) * 0.25, z + Math.cos(t * 0.3 + p) * 0.8);
    });
    (api.clouds || []).forEach(c => { c.position.x = c.userData.baseX + Math.sin(t * 0.08 + c.userData.phase) * 1.5; });
    if (api.gateLight && api.gateLight.intensity > 0) api.gateLight.intensity = 5 + Math.sin(t * 2) * 1.2;
  },
};
