// The Gate. A wide desert courtyard before the tower's great door:
// a caravan camp (west), the well square, the market stalls (east of the road), the shrine garden (far east)
// and the gate itself (north, in the tower wall). The camera follows the traveler across it.
// Spot ids (must match content.js): well, bread, bucket, lamp, camel, key, luggage, shrine, door,
//   pilgrim, carrier, boy, master, baker, spice, rugs, gardener, keeper, scribe
export default {
  sky: { top: "#f6c27a", bottom: "#e88a55" },
  fog: { color: "#eaa06a", near: 26, far: 70 },
  groundColor: "#c9774f",
  light: { sky: "#fff1d6", ground: "#7a3a22", hemi: 1.15, sun: "#fff0d0", sunIntensity: 1.7, sunPos: [-20, 32, 16] },
  bounds: { minX: -32, maxX: 32, minZ: -10, maxZ: 12 },
  camera: [0, 6, 10.5],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-10, 2.5];

    // the courtyard is wider than the default shadow box: widen the sun's shadow camera
    api.scene.traverse(o => {
      if (o.isDirectionalLight) {
        Object.assign(o.shadow.camera, { left: -48, right: 48, top: 40, bottom: -40, near: 1, far: 120 });
        o.shadow.camera.updateProjectionMatrix();
      }
    });

    // ---------- helpers
    function palm(x, z, h) {
      const g = k.group();
      for (let i = 0; i < 4; i++) { const t = k.cylinder(0.16 - i * 0.02, 0.2 - i * 0.02, h / 4, "#7a5034", 6); k.at(t, i * 0.1, i * h / 4, 0); g.add(t); }
      for (let i = 0; i < 6; i++) {
        const leaf = k.box(1.8, 0.05, 0.4, i % 2 ? "#4d7a3a" : "#5e8f45"); leaf.geometry.translate(0.9, 0, 0);
        leaf.position.set(0.3, h, 0); leaf.rotation.set(0, i * Math.PI / 3, -0.45); g.add(leaf);
      }
      g.position.set(x, 0, z); api.add(g); return g;
    }
    function stone(x, z, r = 0.3) { const s = k.sphere(r, "#8a6a55", 6); s.scale.y = 0.5; s.position.set(x, r * 0.3, z); api.add(s); }
    function plate(text, x, y, z, h = 0.3) { const s = k.sign(text, { height: h }); s.position.set(x, y, z); api.add(s); return s; }
    // a market stall: four posts, a striped awning, a low counter (low, so the seller's face stays visible)
    function stall(x, z, a, b, counter = "#6b4026") {
      const g = k.group();
      [[-1.3, 0.5], [1.3, 0.5], [-1.3, -1.9], [1.3, -1.9]].forEach(([px, pz]) => { const p = k.box(0.1, pz > 0 ? 2.8 : 3.2, 0.1, "#4d2a1a"); k.at(p, px, 0, pz); g.add(p); });
      for (let i = 0; i < 6; i++) { const s = k.box(0.46, 0.05, 2.7, i % 2 ? a : b); k.at(s, -1.15 + i * 0.46, 2.95, -0.7); s.rotation.x = 0.16; g.add(s); }
      const c = k.box(2.4, 0.8, 0.7, counter); k.at(c, 0, 0, 0.2); g.add(c);
      g.position.set(x, 0, z); api.add(g); return g;
    }
    function camelObj(lying) {
      const g = k.group();
      const cc = "#c99a5e", cd = "#a87a44";
      const dy = lying ? -1.0 : 0;
      const body = k.sphere(0.9, cc, 10); body.scale.set(1.35, 0.75, 0.7); body.position.y = 1.55 + dy; g.add(body);
      const hump = k.sphere(0.55, cc, 9); hump.scale.set(1, 0.85, 0.85); hump.position.set(0, 2.2 + dy, 0); g.add(hump);
      const blanket = k.box(1.2, 0.08, 1.3, lying ? "#2f6f86" : "#9a2f22"); k.at(blanket, 0, 2.05 + dy, 0); g.add(blanket);
      if (!lying) [[-0.75, 0.3], [-0.75, -0.3], [0.75, 0.3], [0.75, -0.3]].forEach(([x, z]) => { const leg = k.cylinder(0.11, 0.09, 1.25, cd, 6); k.at(leg, x, 0, z); g.add(leg); });
      const neck = k.cylinder(0.18, 0.26, 1.2, cc, 7); neck.position.set(-1.25, 2.1 + dy, 0); neck.rotation.z = -0.55; g.add(neck);
      const head = k.group();
      const skull = k.sphere(0.32, cc, 9); skull.scale.set(1.35, 0.85, 0.85); head.add(skull);
      const snout = k.sphere(0.22, cd, 8); snout.position.set(-0.38, -0.08, 0); head.add(snout);
      [-1, 1].forEach(sd => {
        const eye = k.sphere(0.06, "#2a1a12", 6); eye.position.set(-0.12, 0.1, sd * 0.25); head.add(eye);
        const ear = k.cone(0.06, 0.18, cd, 5); ear.position.set(0.2, 0.3, sd * 0.15); head.add(ear);
      });
      head.position.set(-1.65, 2.75 + dy, 0); g.add(head); g.userData.head = head; g.userData.headY = 2.75 + dy;
      const tail = k.cylinder(0.04, 0.03, 0.5, cd, 5); tail.position.set(1.25, 1.4 + dy, 0); tail.rotation.z = 0.3; g.add(tail);
      return g;
    }
    function tent(x, z, color, trim, r = 2.2, rotY = 0) {
      const g = k.group();
      const c = k.cone(r, 2.8, color, 6); g.add(c);
      const band = k.cylinder(r * 0.82, r * 0.86, 0.25, trim, 6); k.at(band, 0, 0.6, 0); g.add(band);
      const flap = k.archSlab(0.9, 1.4, 0.1, "#3a2116"); flap.position.set(0, 0, r * 0.62); flap.rotation.x = -0.25; g.add(flap);
      const pole = k.cylinder(0.04, 0.04, 0.8, "#4d2a1a", 5); k.at(pole, 0, 2.6, 0); g.add(pole);
      const flag = k.box(0.5, 0.3, 0.03, trim); k.at(flag, 0.27, 3.05, 0); g.add(flag);
      g.position.set(x, 0, z); g.rotation.y = rotY; api.add(g); return g;
    }

    // ---------- the tower wall along the north, with the gate opening in the middle
    const wall = k.archWall(84, 12, 1.2, "#b85a3a", 3.4, 6);
    wall.position.set(0, 0, -13); api.add(wall);
    const cap = k.box(84.4, 0.8, 1.6, "#8e3f28"); cap.position.set(0, 12, -13); api.add(cap);
    [-26, -18, -10, 10, 18, 26].forEach(x => { const w = k.archSlab(1.4, 2.6, 0.2, "#7a3220"); w.position.set(x, 6.5, -12.35); api.add(w); });
    // banners and two pillars flanking the door
    [-5.5, 5.5].forEach(x => {
      const ban = k.box(1.1, 3.6, 0.06, "#9a2f22"); k.at(ban, x, 6.2, -12.3); api.add(ban);
      const hem = k.box(1.1, 0.25, 0.08, "#e2b04a"); k.at(hem, x, 6.2, -12.27); api.add(hem);
      const pil = k.cylinder(0.55, 0.65, 4.2, "#a64e32", 8); k.at(pil, x * 0.62, 0, -11.9); api.add(pil);
      const top = k.box(1.4, 0.35, 1.4, "#8e3f28"); k.at(top, x * 0.62, 4.2, -11.9); api.add(top);
      // braziers: glowing bowls, no extra lights
      const bowl = k.cylinder(0.45, 0.25, 0.35, "#3a2116", 8); k.at(bowl, x * 0.62, 4.55, -11.9); api.add(bowl);
      const fire = new THREE.Mesh(new THREE.ConeGeometry(0.3, 0.6, 6), new THREE.MeshBasicMaterial({ color: "#ffb340" }));
      fire.position.set(x * 0.62, 5.15, -11.9); api.add(fire); (api.flames ||= []).push(fire);
    });
    // a far tower silhouette and dunes beyond the courtyard
    for (let i = 0; i < 8; i++) { const d = k.sphere(9 + (i % 3) * 2, "#d98a5a", 8); d.scale.y = 0.25; d.position.set(-70 + i * 20, 0, -34 - (i % 2) * 8); api.add(d); }
    const far = k.cylinder(3.5, 5, 40, "#c46c45", 8); far.position.set(0, 0, -48); api.add(far);
    // low mud-brick walls closing the courtyard on the east and west
    [-36, 36].forEach(x => { const w = k.box(1, 2.6, 26, "#b0603f"); k.at(w, x, 0, -1); api.add(w); const c2 = k.box(1.3, 0.3, 26.2, "#8e3f28"); k.at(c2, x, 2.6, -1); api.add(c2); });

    // ---------- paving: the road to the gate, the cross road, the gate plaza
    const road = k.box(3.2, 0.04, 22, "#b56a48"); k.at(road, 0, 0, 1); api.add(road);
    const cross = k.box(64, 0.04, 2.4, "#bb7050"); k.at(cross, 0, 0, 0.6); api.add(cross);
    const plaza = k.box(18, 0.05, 4.6, "#a85f3e"); k.at(plaza, 0, 0, -10); api.add(plaza);
    for (let i = 0; i < 8; i++) { const s = k.box(1.4, 0.06, 1, i % 2 ? "#a85f3e" : "#9c563a"); k.at(s, -0.7 + (i % 2) * 1.4, 0, 9 - i * 2.4); api.add(s); }
    plate("TOWER GATE", 0, 7.6, -12.3, 0.7);
    // signposts at the crossroads, so the big courtyard is easy to read
    const post = k.box(0.14, 2.6, 0.14, "#4d2a1a"); k.at(post, 2.2, 0, 2.4); api.add(post);
    plate("◀ WELL · CAMP", 1.6, 2.2, 2.5, 0.28); plate("MARKET · SHRINE ▶", 2.8, 1.75, 2.5, 0.28); plate("▲ GATE", 2.2, 1.3, 2.5, 0.28);
    // an empty cart and a few dry bushes on the open sand in front
    const cart = k.group(k.box(2.2, 0.5, 1.2, "#7a5034"));
    cart.children[0].position.y = 0.75;
    [-0.62, 0.62].forEach(z => { const w = k.cylinder(0.5, 0.5, 0.12, "#4d2a1a", 10); w.rotation.x = Math.PI / 2; w.position.set(0, 0.5, z); cart.add(w); });
    const shaft = k.box(1.6, 0.08, 0.08, "#5a3320"); k.at(shaft, -1.8, 0.55, 0); shaft.rotation.z = 0.2; cart.add(shaft);
    cart.position.set(9.5, 0, 6.5); cart.rotation.y = 0.4; api.add(cart);
    [[-9, 7], [-20, 9], [16, 9], [27, 10], [-31, 9]].forEach(([x, z]) => { const b = k.sphere(0.5, "#8a8a4a", 5); b.scale.y = 0.6; b.position.set(x, 0.25, z); api.add(b); });

    // ===================== THE GATE (north, middle) =====================
    // the key's hook on the wall, left of the door: empty (the camel took the key); the key comes back when the door opens
    const hook = k.group(k.box(0.5, 0.12, 0.3, "#3a2116"));
    hook.children[0].position.y = 0;
    const peg = k.box(0.06, 0.25, 0.06, "#2a1a12"); k.at(peg, 0, -0.3, 0.12); hook.add(peg);
    const hookKey = k.emoji("🔑", 0.6); hookKey.position.set(0, -0.35, 0.2); hookKey.visible = false; hook.add(hookKey);
    const ksign = k.sign("KEY", { height: 0.24 }); ksign.position.set(0, -0.85, 0.16); hook.add(ksign);
    hook.position.set(-2.6, 2.6, -12.3); api.add(hook);
    api.hookKey = hookKey;

    // the keeper with a spear, right of the door
    const keeper = k.figure({ scale: 1.25, robe: "#9a2f22", trim: "#e2b04a", mask: "#f4e8d2", hat: "tall", prop: "spear" });
    keeper.position.set(3.0, 0, -11.0); keeper.rotation.y = -0.15; api.spot("keeper", keeper, { walkTo: [2.6, -9.0] });

    // the scribe at his low desk, writing down every stranger who arrives
    const desk = k.group(k.box(1.5, 0.65, 0.7, "#5a3320"));
    const ink = k.cylinder(0.06, 0.07, 0.12, "#1a1a2a", 6); k.at(ink, 0.5, 0.65, 0); desk.add(ink);
    const book = k.box(0.6, 0.06, 0.45, "#efe2c4"); k.at(book, -0.15, 0.65, 0); desk.add(book);
    k.at(desk, -5.4, 0, -9.9); api.add(desk);
    const scribe = k.figure({ model: "Knight", hideHat: true, robe: "#3f5a8a", trim: "#e2b04a", prop: "book" });
    k.at(scribe, -5.4, 0, -11.0); scribe.rotation.y = 0.15; api.spot("scribe", scribe, { walkTo: [-5.4, -8.4] });
    plate("NAMES OF STRANGERS", -5.4, 0.4, -9.53, 0.2);

    // the great door, set into the gate opening
    const door = k.group();
    const left = k.archSlab(3.4, 6, 0.3, "#7a4126"); door.add(left);
    const seam = k.box(0.08, 5.9, 0.34, "#4a2414"); door.add(seam);
    const knob = k.sphere(0.12, "#e2b04a"); knob.position.set(0.45, 2.8, 0.2); door.add(knob);
    const dsign = k.sign("DOOR", { height: 0.4 }); dsign.position.set(0, 4.6, 0.17); door.add(dsign);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 5.6), new THREE.MeshBasicMaterial({ color: "#fff3c4" }));
    glow.position.set(0, 2.8, -0.4); glow.visible = false; door.add(glow);
    door.position.set(0, 0, -13); api.spot("door", door, { walkTo: [0, -9.6], height: 6 });
    api.doorLeaf = left; api.doorSeam = seam; api.doorKnob = knob; api.doorSign = dsign; api.doorGlow = glow;

    // ===================== THE WELL SQUARE (west of the road) =====================
    const well = k.group(k.cylinder(0.9, 1, 1, "#9a8b7a", 12));
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.8, 16), k.mat("#3b6c90")); water.rotation.x = -Math.PI / 2; water.position.y = 1.01; well.add(water);
    [-0.85, 0.85].forEach(x => { const p = k.box(0.12, 2.2, 0.12, "#4d2a1a"); p.position.x = x; well.add(p); });
    const beam = k.box(2, 0.16, 0.16, "#4d2a1a"); beam.position.y = 2.2; well.add(beam);
    const wplate = k.sign("WATER", { height: 0.32 }); wplate.position.set(0, 0.55, 1.02); well.add(wplate);
    well.position.set(-11, 0, -3.6); api.spot("well", well, { walkTo: [-11, -1.8], height: 2.6 });
    // a round paved square around the well
    const sq = new THREE.Mesh(new THREE.CircleGeometry(5, 20), k.mat("#b8714f")); sq.rotation.x = -Math.PI / 2; sq.position.set(-11, 0.03, -3); sq.receiveShadow = true; api.add(sq);
    plate("NO DRINKING FROM THE BUCKET", -11, 2.75, -3.55, 0.22);

    // the bucket: first by the camel, then on the rim of the well
    function bucketObj() {
      const g = k.group(k.cylinder(0.24, 0.19, 0.38, "#7a7f86", 9));
      const rim = k.cylinder(0.26, 0.26, 0.04, "#4a4f56", 9); rim.position.y = 0.38; g.add(rim);
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.02, 4, 12, Math.PI), k.mat("#4a4f56")); handle.position.y = 0.4; g.add(handle);
      return g;
    }
    const wellBucket = bucketObj(); wellBucket.position.set(-10.5, 1.0, -3.3); wellBucket.visible = false; api.add(wellBucket);

    // the pilgrim, resting in the shade of an awning on a rock
    const shade = k.group();
    [[-1.3, -1.1], [1.3, -1.1], [-1.3, 1.1], [1.3, 1.1]].forEach(([x, z]) => { const p = k.box(0.1, 2.9, 0.1, "#4d2a1a"); k.at(p, x, 0, z); shade.add(p); });
    const cloth = k.box(3, 0.06, 2.6, "#e9dcc0"); k.at(cloth, 0, 2.9, 0); shade.add(cloth);
    const hang = k.box(3, 0.4, 0.04, "#7a6a8c"); k.at(hang, 0, 2.55, 1.3); shade.add(hang);
    k.at(shade, -16, 0, -3.8); api.add(shade);
    const rock = k.sphere(0.7, "#8a6a55", 7); rock.scale.y = 0.5; rock.position.set(-16, 0.25, -4.0); api.add(rock);
    const pilgrim = k.figure({ model: "Rogue", sit: true, sitOn: "floor", robe: "#7a6a8c", trim: "#d9b44a", mask: "#d8c8b0", hat: "hood", prop: "staff" });
    pilgrim.position.set(-16, 0.45, -4.0); pilgrim.rotation.y = 0.25; api.spot("pilgrim", pilgrim, { walkTo: [-15.4, -2.2] });

    // the water carrier with her jars
    [[-7.2, -5.0], [-6.6, -4.4], [-7.6, -4.3]].forEach(([x, z], i) => { const j = k.cylinder(0.22, 0.34, 0.85 - i * 0.1, i ? "#c46c45" : "#a85a3a", 8); k.at(j, x, 0, z); api.add(j); });
    const carrier = k.figure({ model: "Rogue_Hooded", robe: "#2f6f86", trim: "#e9dcc0" });
    k.at(carrier, -8.4, 0, -5.0); carrier.rotation.y = 0.1; api.spot("carrier", carrier, { walkTo: [-8.4, -3.2] });
    palm(-19.5, -7.5, 4.6); palm(-13.5, -9, 5);
    [[-13.5, 1.8], [-8, 2.6], [-17, 0.8]].forEach(([x, z]) => stone(x, z));

    // ===================== THE CARAVAN CAMP (far west) =====================
    tent(-29.5, -8.5, "#e9dcc0", "#9a2f22", 2.4, 0.3);
    tent(-23.5, -10.5, "#d9b48a", "#2f6f86", 2.0, 0);
    tent(-17.5, -10.5, "#e2c79a", "#7a6a8c", 1.7, -0.2);
    // the camp fire, with a real flickering light
    const fireG = k.group();
    for (let i = 0; i < 4; i++) { const l = k.box(1.1, 0.14, 0.14, "#4a2a18"); l.rotation.y = i * Math.PI / 4; l.position.y = 0.1; fireG.add(l); }
    for (let i = 0; i < 6; i++) { const s = k.sphere(0.2, "#6a5a4c", 5); s.position.set(Math.cos(i) * 0.75, 0.1, Math.sin(i) * 0.75); fireG.add(s); }
    const campFlame = new THREE.Mesh(new THREE.ConeGeometry(0.35, 0.9, 6), new THREE.MeshBasicMaterial({ color: "#ffb340" }));
    campFlame.position.y = 0.55; fireG.add(campFlame);
    const campLight = new THREE.PointLight("#ffa040", 6, 9); campLight.position.y = 1.3; fireG.add(campLight);
    fireG.position.set(-21.5, 0, -1.5); api.add(fireG);
    api.campFlame = campFlame; api.campLight = campLight;
    // logs to sit on around the fire
    [[-23, -2.6, 0.4], [-20, -2.8, -0.5]].forEach(([x, z, r]) => { const l = k.cylinder(0.22, 0.22, 1.4, "#6b4026", 7); l.rotation.set(0, r, Math.PI / 2); l.position.set(x, 0.22, z); api.add(l); });

    // Pasha the camel, standing, chewing
    const pasha = camelObj(false);
    pasha.position.set(-28, 0, -5.4); pasha.rotation.y = Math.PI - 0.4; pasha.userData.height = 3.2;
    api.spot("camel", pasha, { walkTo: [-27.5, -3.2], height: 3.2 });
    api.camels = [pasha];
    // two more caravan camels: one lying down, one tied by the tents
    const lying = camelObj(true); lying.position.set(-31, 0, -1.2); lying.rotation.y = Math.PI * 0.75; api.add(lying); api.camels.push(lying);
    const third = camelObj(false); third.position.set(-25.5, 0, -8.6); third.rotation.y = 0.5; third.scale.setScalar(0.9); api.add(third); api.camels.push(third);

    const bucket = bucketObj();
    const bsign2 = k.sign("BUCKET", { height: 0.2 }); bsign2.position.set(0, 0.2, 0.25); bucket.add(bsign2);
    bucket.position.set(-29.6, 0, -2.6); bucket.userData.height = 0.8; api.spot("bucket", bucket, { walkTo: [-29.3, -1.4], height: 0.8 });
    api.bucket = bucket; api.wellBucket = wellBucket;

    // the saddlebag on the sand, with the shiny key in it
    const bag = k.group();
    const sack = k.sphere(0.38, "#6b4a2e", 8); sack.scale.set(1.3, 0.8, 1); sack.position.y = 0.3; bag.add(sack);
    const flap = k.box(0.75, 0.06, 0.5, "#4d2a1a"); k.at(flap, 0, 0.52, 0.05); flap.rotation.x = -0.3; bag.add(flap);
    const bagKey = k.emoji("🔑", 0.45); bagKey.position.set(0.1, 0.8, 0.15); bag.add(bagKey);
    bag.position.set(-26.4, 0, -2.6); bag.userData.height = 1.1; api.spot("key", bag, { walkTo: [-26.2, -1.4], height: 1.1 });
    api.keySprite = bagKey;

    // the camel boy, small, next to his camel
    const boy = k.figure({ model: "Rogue_Hooded", scale: 0.8, robe: "#2f7f86", trim: "#f0b43c" });
    k.at(boy, -24.6, 0, -4.6); boy.rotation.y = 0.2; api.spot("boy", boy, { walkTo: [-24.6, -3.0] });

    // the caravan master and the caravan's luggage
    const lug = k.group();
    [[0, 0, 1.0, 0.8, 0.8, "#7a5034"], [1.1, 0, 0.8, 0.6, 0.7, "#8a5a32"], [0.4, 0.8, 0.8, 0.5, 0.6, "#6b4026"]].forEach(([x, y, w, h, d, c]) => { const b = k.box(w, h, d, c); k.at(b, x, y, 0); lug.add(b); });
    [[-0.9, 0.2], [-1.4, -0.3]].forEach(([x, z]) => { const s = k.sphere(0.4, "#e9dcc0", 7); s.scale.y = 1.1; s.position.set(x, 0.42, z); lug.add(s); });
    const rope = k.box(1.02, 0.06, 0.82, "#c9a46a"); k.at(rope, 0, 0.45, 0); lug.add(rope);
    lug.position.set(-20.4, 0, -8.0); lug.userData.height = 1.6; api.spot("luggage", lug, { walkTo: [-20.4, -6.2], height: 1.6 });
    const master = k.figure({ model: "Barbarian", robe: "#7a4a2a", trim: "#d9b44a" });
    k.at(master, -22.4, 0, -7.2); master.rotation.y = 0.2; api.spot("master", master, { walkTo: [-22.4, -5.4] });
    palm(-33, 4, 4.4); palm(-33.5, -6, 4.6);
    [[-30, 3.5], [-22, 4.5], [-25, 8], [-18, 7]].forEach(([x, z]) => stone(x, z, 0.35));

    // ===================== THE MARKET (east of the road) =====================
    // the baker's corner: striped awning, oven, flour sacks, the bread table in front
    const bakerTent = k.group();
    [[-1.2, 0.4], [-1.2, -2.2], [1.2, -2.2]].forEach(([x, z]) => { const p = k.box(0.1, z > 0 ? 2.9 : 3.3, 0.1, "#4d2a1a"); k.at(p, x, 0, z); bakerTent.add(p); });
    for (let i = 0; i < 6; i++) { const s = k.box(0.42, 0.06, 2.8, i % 2 ? "#f2e3c4" : "#d9822b"); k.at(s, -1.05 + i * 0.42, 3.05, -0.9); s.rotation.x = 0.18; bakerTent.add(s); }
    const oven = k.sphere(0.75, "#9a5a3a", 9); oven.scale.y = 0.8; oven.position.set(-1.6, 0.45, -2.6); bakerTent.add(oven);
    const mouth = k.archSlab(0.5, 0.45, 0.1, "#2a1410"); k.at(mouth, -1.6, 0.05, -1.95); bakerTent.add(mouth);
    [[1.6, -2.4], [1.95, -1.8]].forEach(([x, z]) => { const s = k.sphere(0.35, "#e9dcc0", 7); s.scale.y = 1.2; s.position.set(x, 0.38, z); bakerTent.add(s); });
    k.at(bakerTent, 9, 0, -4.4); api.add(bakerTent);

    const table = k.group(k.box(1.8, 0.1, 0.9, "#5a3320"));
    table.children[0].position.y = 0.85;
    [[-0.8, -0.35], [0.8, -0.35], [-0.8, 0.35], [0.8, 0.35]].forEach(([x, z]) => { const l = k.box(0.1, 0.85, 0.1, "#5a3320"); k.at(l, x, 0, z); table.add(l); });
    [-0.4, 0.35].forEach(x => { const b = k.emoji("🍞", 0.55); b.position.set(x, 1.15, 0); table.add(b); });
    const bsign = k.sign("BREAD", { height: 0.26 }); bsign.position.set(0, 0.6, 0.47); table.add(bsign);
    table.position.set(9, 0, -4.4); api.spot("bread", table, { walkTo: [9, -2.8], height: 1.6 });

    const baker = k.figure({ model: "Mage", hideHat: true, robe: "#d9822b", trim: "#f2e3c4" });
    k.at(baker, 8.7, 0, -5.9); baker.rotation.y = -0.15; api.spot("baker", baker, { walkTo: [7.4, -3.0] });

    // the spice stall: little coloured hills of spice on the counter
    stall(15, -4.6, "#c43a2a", "#f2c14a", "#6b4026");
    ["#c43a2a", "#e0a020", "#7a4a1a", "#d9822b", "#5e8f45"].forEach((c, i) => { const s = k.cone(0.2, 0.28, c, 7); k.at(s, 14.1 + i * 0.45, 0.8, -4.4); api.add(s); });
    plate("SPICES", 15, 2.45, -4.05, 0.3);
    const spice = k.figure({ model: "Mage", robe: "#8a2a4a", trim: "#f2c14a" });
    k.at(spice, 15, 0, -6.0); spice.rotation.y = -0.05; api.spot("spice", spice, { walkTo: [15, -2.8] });

    // the rug stall: rugs hanging on a line, rolled rugs on the sand
    stall(21, -4.6, "#2f6f86", "#e9dcc0", "#5a3320");
    ["#9a2f22", "#2f6f86", "#d9822b"].forEach((c, i) => { const r = k.box(0.75, 1.5, 0.04, c); k.at(r, 20.15 + i * 0.85, 0.95, -6.6); api.add(r); const b = k.box(0.75, 0.12, 0.05, "#f2e3c4"); k.at(b, 20.15 + i * 0.85, 1.4, -6.57); api.add(b); });
    [[23, -3.4, "#9a2f22"], [23.2, -2.8, "#7a6a8c"]].forEach(([x, z, c]) => { const r = k.cylinder(0.2, 0.2, 1.6, c, 8); r.rotation.z = Math.PI / 2; r.position.set(x, 0.2, z); api.add(r); });
    plate("RUGS", 21, 2.45, -4.05, 0.3);
    const rugs = k.figure({ model: "Knight", hideHat: true, robe: "#4d6a3a", trim: "#d9b44a" });
    k.at(rugs, 21, 0, -6.0); rugs.rotation.y = 0.05; api.spot("rugs", rugs, { walkTo: [21, -2.8] });
    palm(12, -8.5, 5.2); palm(6.5, -10, 4.4);
    const jar = k.cylinder(0.25, 0.38, 0.9, "#c46c45", 8); k.at(jar, 11.8, 0, -3.3); api.add(jar);

    // ===================== THE SHRINE GARDEN (far east) =====================
    const shrine = k.group();
    const base = k.cylinder(2.4, 2.6, 3.2, "#e9dcc0", 10); shrine.add(base);
    const dome = new THREE.Mesh(new THREE.SphereGeometry(2.4, 12, 6, 0, Math.PI * 2, 0, Math.PI / 2), k.mat("#2f7f86")); dome.position.y = 3.2; dome.castShadow = true; shrine.add(dome);
    const spire = k.cone(0.2, 1.2, "#e2b04a", 6); k.at(spire, 0, 5.5, 0); shrine.add(spire);
    const sdoor = k.archSlab(1.1, 2, 0.1, "#3a2116"); sdoor.position.set(0, 0, 2.55); shrine.add(sdoor);
    const steps = k.box(2, 0.2, 0.8, "#cdbf9f"); k.at(steps, 0, 0, 2.9); shrine.add(steps);
    const ssign = k.sign("SHRINE", { height: 0.3 }); ssign.position.set(0, 2.45, 2.58); shrine.add(ssign);
    shrine.position.set(28, 0, -8.2); shrine.userData.height = 5.8; api.spot("shrine", shrine, { walkTo: [28, -4.6], height: 5.8 });

    // the gardener, who guarded the shrine all night with the baker's lamp
    const gardener = k.figure({ model: "Mage", robe: "#e9dcc0", trim: "#5e8f45", prop: "staff" });
    k.at(gardener, 24.6, 0, -5.4); gardener.rotation.y = 0.25; api.spot("gardener", gardener, { walkTo: [24.6, -3.6] });

    // a stone bench; the baker's lamp sits on it until you take it
    const bench = k.box(1.8, 0.45, 0.6, "#cdbf9f"); k.at(bench, 30.5, 0, -4.2); api.add(bench);

    function lampObj(lit) {
      const g = k.group(k.cylinder(0.22, 0.28, 0.12, "#6b3e22", 8));
      const body = k.sphere(0.2, "#8a5a32", 8); body.scale.set(1.3, 0.6, 0.9); body.position.y = 0.22; g.add(body);
      const spout = k.cylinder(0.04, 0.07, 0.25, "#8a5a32", 6); spout.rotation.z = -1.1; spout.position.set(0.3, 0.27, 0); g.add(spout);
      if (lit) {
        const flame = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.24, 6), new THREE.MeshBasicMaterial({ color: "#ffd25a" }));
        flame.position.set(0.42, 0.45, 0); g.add(flame); g.userData.flame = flame;
        const l = new THREE.PointLight("#ffbf5a", 4, 6); l.position.set(0.4, 0.8, 0.2); g.add(l); g.userData.light = l;
      }
      return g;
    }
    const lamp = lampObj(false);
    const lsign = k.sign("LAMP", { height: 0.22 }); lsign.position.set(0, 0.1, 0.32); lamp.add(lsign);
    lamp.position.set(30.5, 0.45, -4.1); lamp.userData.height = 1.2; api.spot("lamp", lamp, { walkTo: [30.4, -2.6], height: 1.2 });
    const litLamp = lampObj(true); litLamp.scale.setScalar(0.9); litLamp.position.set(8.25, 0.9, -4.45); litLamp.visible = false; api.add(litLamp);
    api.lamp = lamp; api.litLamp = litLamp;

    // a pool and flower beds
    const rim = k.cylinder(2.3, 2.3, 0.3, "#cdbf9f", 16); k.at(rim, 27, 0, 3); api.add(rim);
    const pool = new THREE.Mesh(new THREE.CircleGeometry(2.05, 16), k.mat("#3b7c9a")); pool.rotation.x = -Math.PI / 2; pool.position.set(27, 0.31, 3); api.add(pool);
    const fl = ["#e05a7a", "#f2c14a", "#f2f2f2", "#c43a2a"];
    [[22.5, -1.5], [32, -1.5], [23, 6.5], [31, 6.5]].forEach(([x, z], j) => {
      const bed = k.box(2.4, 0.25, 1.2, "#6b4a2e"); k.at(bed, x, 0, z); api.add(bed);
      for (let i = 0; i < 5; i++) { const b = k.sphere(0.16, fl[(i + j) % 4], 5); b.position.set(x - 0.9 + i * 0.45, 0.42, z + (i % 2 ? 0.25 : -0.25)); api.add(b); const lf = k.sphere(0.2, "#4d7a3a", 5); lf.scale.y = 0.6; lf.position.set(x - 0.9 + i * 0.45, 0.3, z + (i % 2 ? -0.2 : 0.2)); api.add(lf); }
    });
    palm(33, -9, 5); palm(24, -10, 4.8); palm(33.5, 2.5, 4.4); palm(21, 9, 4);
  },

  update(api, st) {
    if (api.keySprite) api.keySprite.visible = !st.has("tookKey");
    if (api.hookKey) api.hookKey.visible = !!st.open;
    const b = st.has("gotBucket");
    if (api.bucket) api.bucket.visible = !b;
    if (api.wellBucket) api.wellBucket.visible = b;
    const l = st.has("gotLamp");
    if (api.lamp) api.lamp.visible = !l;
    if (api.litLamp) api.litLamp.visible = l;
    const open = !!st.open;
    [api.doorLeaf, api.doorSeam, api.doorKnob, api.doorSign].forEach(o => { if (o) o.visible = !open; });
    if (api.doorGlow) api.doorGlow.visible = open;
  },

  tick(api, t) {
    // the camels chew and look around; flames flicker
    (api.camels || []).forEach((c, i) => { const h = c.userData.head; h.rotation.z = Math.sin(t * 0.7 + i * 2) * 0.12; h.position.y = c.userData.headY + Math.sin(t * 6 + i) * 0.015; });
    const f = api.litLamp?.userData; if (f?.light && api.litLamp.visible) { f.light.intensity = 3.5 + Math.sin(t * 9) * 0.6 + Math.sin(t * 23) * 0.3; f.flame.scale.y = 1 + Math.sin(t * 13) * 0.15; }
    if (api.campLight) { api.campLight.intensity = 5.5 + Math.sin(t * 8) * 0.8 + Math.sin(t * 19) * 0.4; api.campFlame.scale.y = 1 + Math.sin(t * 11) * 0.12; }
    (api.flames || []).forEach((m, i) => { m.scale.y = 1 + Math.sin(t * 10 + i * 3) * 0.12; });
  },
};
