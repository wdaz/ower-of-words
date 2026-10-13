// The Gate. A desert courtyard before the tower's great door.
// Spot ids (must match content.js): well, bread, bucket, lamp, camel, key, pilgrim, baker, boy, keeper, door
export default {
  sky: { top: "#f6c27a", bottom: "#e88a55" },
  fog: { color: "#eaa06a", near: 22, far: 55 },
  groundColor: "#c9774f",
  light: { sky: "#fff1d6", ground: "#7a3a22", hemi: 1.15, sun: "#fff0d0", sunIntensity: 1.7, sunPos: [-10, 16, 8] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-5.8, 1.2];

    // the tower wall behind everything, with two dark windows and a gate opening
    const wall = k.archWall(30, 12, 1.2, "#b85a3a", 3.4, 6);
    wall.position.set(4, 0, -6); api.add(wall);
    const cap = k.box(30.4, 0.8, 1.6, "#8e3f28"); cap.position.set(4, 12, -6); api.add(cap);
    [-6, -2, 10, 14].forEach(x => { const w = k.archSlab(1.4, 2.6, 0.2, "#7a3220"); w.position.set(x, 6.5, -5.35); api.add(w); });
    // distant dunes and a far tower silhouette
    for (let i = 0; i < 6; i++) { const d = k.sphere(8 + i, "#d98a5a", 8); d.scale.y = 0.25; d.position.set(-40 + i * 16, 0, -30 - (i % 2) * 8); api.add(d); }
    const far = k.cylinder(2.5, 3.5, 30, "#c46c45", 8); far.position.set(-22, 0, -40); api.add(far);
    // flagstones path to the gate
    for (let i = 0; i < 9; i++) { const s = k.box(1.6, 0.06, 1.2, i % 2 ? "#a85f3e" : "#b56a48"); k.at(s, -8 + i * 2.1, 0, 1.2); api.add(s); }

    // well with a WATER plaque
    const well = k.group(k.cylinder(0.9, 1, 1, "#9a8b7a", 12));
    const water = new THREE.Mesh(new THREE.CircleGeometry(0.8, 16), k.mat("#3b6c90")); water.rotation.x = -Math.PI / 2; water.position.y = 1.01; well.add(water);
    [-0.85, 0.85].forEach(x => { const p = k.box(0.12, 2.2, 0.12, "#4d2a1a"); p.position.x = x; well.add(p); });
    const beam = k.box(2, 0.16, 0.16, "#4d2a1a"); beam.position.y = 2.2; well.add(beam);
    const plate = k.sign("WATER", { height: 0.32 }); plate.position.set(0, 0.55, 1.02); well.add(plate);
    well.position.set(-2.2, 0, -1.6); api.spot("well", well, { height: 2.6 });

    // table with bread
    const table = k.group(k.box(1.8, 0.1, 0.9, "#5a3320"));
    table.children[0].position.y = 0.85;
    [[-0.8, -0.35], [0.8, -0.35], [-0.8, 0.35], [0.8, 0.35]].forEach(([x, z]) => { const l = k.box(0.1, 0.85, 0.1, "#5a3320"); k.at(l, x, 0, z); table.add(l); });
    [-0.4, 0.35].forEach(x => { const b = k.emoji("🍞", 0.55); b.position.set(x, 1.15, 0); table.add(b); });
    const bsign = k.sign("BREAD", { height: 0.26 }); bsign.position.set(0, 0.6, 0.47); table.add(bsign);
    table.position.set(8, 0, -0.5); api.spot("bread", table, { height: 1.6 });

    // tired pilgrim, sitting on a rock
    const rock = k.sphere(0.7, "#8a6a55", 7); rock.scale.y = 0.5; rock.position.set(-4.8, 0.25, -1.4); api.add(rock);
    const pilgrim = k.figure({ model: "Rogue", sit: true, sitOn: "floor", robe: "#7a6a8c", trim: "#d9b44a", mask: "#d8c8b0", hat: "hood", prop: "staff" });
    pilgrim.position.set(-4.8, 0.45, -1.4); pilgrim.rotation.y = 0.2; api.spot("pilgrim", pilgrim, { walkTo: [-5.9, -0.2] });

    // the key's hook on the wall, by the door: empty (the camel took the key); the key comes back when the door opens
    const hook = k.group(k.box(0.5, 0.12, 0.3, "#3a2116"));
    hook.children[0].position.y = 0;
    const peg = k.box(0.06, 0.25, 0.06, "#2a1a12"); k.at(peg, 0, -0.3, 0.12); hook.add(peg);
    const hookKey = k.emoji("🔑", 0.6); hookKey.position.set(0, -0.35, 0.2); hookKey.visible = false; hook.add(hookKey);
    const ksign = k.sign("KEY", { height: 0.24 }); ksign.position.set(0, -0.85, 0.16); hook.add(ksign);
    hook.position.set(6.4, 2.6, -5.3); api.add(hook);
    api.hookKey = hookKey;

    // ---- the baker's corner: a little striped awning over the bread table, sacks of flour
    const tent = k.group();
    [[-1.2, 0.4], [-1.2, -2.2], [1.2, -2.2]].forEach(([x, z]) => { const p = k.box(0.1, z > 0 ? 2.9 : 3.3, 0.1, "#4d2a1a"); k.at(p, x, 0, z); tent.add(p); });
    for (let i = 0; i < 6; i++) { const s = k.box(0.42, 0.06, 2.8, i % 2 ? "#f2e3c4" : "#d9822b"); k.at(s, -1.05 + i * 0.42, 3.05, -0.9); s.rotation.x = 0.18; tent.add(s); }
    const oven = k.sphere(0.75, "#9a5a3a", 9); oven.scale.y = 0.8; oven.position.set(-1.6, 0.45, -2.6); tent.add(oven);
    const mouth = k.archSlab(0.5, 0.45, 0.1, "#2a1410"); k.at(mouth, -1.6, 0.05, -1.95); tent.add(mouth);
    [[1.6, -2.4], [1.95, -1.8]].forEach(([x, z]) => { const sack = k.sphere(0.35, "#e9dcc0", 7); sack.scale.y = 1.2; sack.position.set(x, 0.38, z); tent.add(sack); });
    k.at(tent, 8, 0, -0.5); api.add(tent);

    const baker = k.figure({ model: "Mage", hideHat: true, robe: "#d9822b", trim: "#f2e3c4" });
    k.at(baker, 7.7, 0, -2.0); baker.rotation.y = -0.15; api.spot("baker", baker, { walkTo: [6.5, 0.5] });

    // the baker's lamp, on the sand next to the well (moves to her table, lit, once you bring it)
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
    lamp.position.set(-0.6, 0, -0.5); lamp.userData.height = 0.8; api.spot("lamp", lamp, { walkTo: [-0.6, 0.8], height: 0.8 });
    const litLamp = lampObj(true); litLamp.scale.setScalar(0.9); litLamp.position.set(7.25, 0.9, -0.55); litLamp.visible = false; api.add(litLamp);
    api.lamp = lamp; api.litLamp = litLamp;

    // the bucket: first by the camel, then on the rim of the well
    function bucketObj() {
      const g = k.group(k.cylinder(0.24, 0.19, 0.38, "#7a7f86", 9));
      const rim = k.cylinder(0.26, 0.26, 0.04, "#4a4f56", 9); rim.position.y = 0.38; g.add(rim);
      const handle = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.02, 4, 12, Math.PI), k.mat("#4a4f56")); handle.position.y = 0.4; g.add(handle);
      return g;
    }
    const bucket = bucketObj();
    const bsign2 = k.sign("BUCKET", { height: 0.2 }); bsign2.position.set(0, 0.2, 0.25); bucket.add(bsign2);
    bucket.position.set(-10.6, 0, -1.3); bucket.userData.height = 0.8; api.spot("bucket", bucket, { walkTo: [-10.3, 0.0], height: 0.8 });
    const wellBucket = bucketObj(); wellBucket.position.set(-1.7, 1.0, -1.3); wellBucket.visible = false; api.add(wellBucket);
    api.bucket = bucket; api.wellBucket = wellBucket;

    // ---- the camel, Pasha: sandy, humped, chewing, with its saddlebag on the sand
    const camel = k.group();
    const cc = "#c99a5e", cd = "#a87a44";
    const body = k.sphere(0.9, cc, 10); body.scale.set(1.35, 0.75, 0.7); body.position.y = 1.55; camel.add(body);
    const hump = k.sphere(0.55, cc, 9); hump.scale.set(1, 0.85, 0.85); hump.position.set(0, 2.2, 0); camel.add(hump);
    const blanket = k.box(1.2, 0.08, 1.3, "#9a2f22"); k.at(blanket, 0, 2.05, 0); blanket.rotation.z = 0.04; camel.add(blanket);
    [[-0.75, 0.3], [-0.75, -0.3], [0.75, 0.3], [0.75, -0.3]].forEach(([x, z]) => { const leg = k.cylinder(0.11, 0.09, 1.25, cd, 6); k.at(leg, x, 0, z); camel.add(leg); });
    const neck = k.cylinder(0.18, 0.26, 1.2, cc, 7); neck.position.set(-1.25, 2.1, 0); neck.rotation.z = -0.55; camel.add(neck);
    const head = k.group();
    const skull = k.sphere(0.32, cc, 9); skull.scale.set(1.35, 0.85, 0.85); head.add(skull);
    const snout = k.sphere(0.22, cd, 8); snout.position.set(-0.38, -0.08, 0); head.add(snout);
    [-1, 1].forEach(sd => {
      const eye = k.sphere(0.06, "#2a1a12", 6); eye.position.set(-0.12, 0.1, sd * 0.25); head.add(eye);
      const ear = k.cone(0.06, 0.18, cd, 5); ear.position.set(0.2, 0.3, sd * 0.15); head.add(ear);
    });
    head.position.set(-1.65, 2.75, 0); camel.add(head);
    const tail = k.cylinder(0.04, 0.03, 0.5, cd, 5); tail.position.set(1.25, 1.4, 0); tail.rotation.z = 0.3; camel.add(tail);
    camel.position.set(-10.2, 0, -3.3); camel.rotation.y = Math.PI - 0.4; camel.userData.height = 3.2;
    api.spot("camel", camel, { walkTo: [-9.6, -1.5], height: 3.2 });
    api.camelHead = head;

    // the saddlebag on the sand, with the shiny key in it
    const bag = k.group();
    const sack = k.sphere(0.38, "#6b4a2e", 8); sack.scale.set(1.3, 0.8, 1); sack.position.y = 0.3; bag.add(sack);
    const flap = k.box(0.75, 0.06, 0.5, "#4d2a1a"); k.at(flap, 0, 0.52, 0.05); flap.rotation.x = -0.3; bag.add(flap);
    const bagKey = k.emoji("🔑", 0.45); bagKey.position.set(0.1, 0.8, 0.15); bag.add(bagKey);
    bag.position.set(-9.0, 0, -0.9); bag.userData.height = 1.1; api.spot("key", bag, { walkTo: [-8.8, 0.4], height: 1.1 });
    api.keySprite = bagKey;

    // the camel boy, small, next to his camel
    const boy = k.figure({ model: "Rogue_Hooded", scale: 0.8, robe: "#2f7f86", trim: "#f0b43c" });
    k.at(boy, -7.5, 0, -2.2); boy.rotation.y = 0.25; api.spot("boy", boy, { walkTo: [-7.9, -0.8] });

    // palms, a water jar and a few stones for a busier courtyard
    function palm(x, z, h) {
      const g = k.group();
      for (let i = 0; i < 5; i++) { const t = k.cylinder(0.16 - i * 0.015, 0.2 - i * 0.015, h / 5, "#7a5034", 6); k.at(t, i * 0.08, i * h / 5, 0); g.add(t); }
      for (let i = 0; i < 6; i++) {
        const leaf = k.box(1.8, 0.05, 0.4, i % 2 ? "#4d7a3a" : "#5e8f45"); leaf.geometry.translate(0.9, 0, 0);
        leaf.position.set(0.4, h, 0); leaf.rotation.set(0, i * Math.PI / 3, -0.45); g.add(leaf);
      }
      g.position.set(x, 0, z); api.add(g);
    }
    palm(-12.6, -4.4, 4.6); palm(11.8, -4.4, 5.2); palm(-14, 1, 4);
    const jar = k.cylinder(0.25, 0.38, 0.9, "#c46c45", 8); k.at(jar, 10.6, 0, -3.4); api.add(jar);
    [[1.2, 2.4], [-6, 3.6], [6.2, 3]].forEach(([x, z]) => { const s = k.sphere(0.3, "#8a6a55", 6); s.scale.y = 0.5; s.position.set(x, 0.1, z); api.add(s); });

    // the keeper with a spear
    const keeper = k.figure({ scale: 1.25, robe: "#9a2f22", trim: "#e2b04a", mask: "#f4e8d2", hat: "tall", prop: "spear" });
    keeper.position.set(2, 0, -3.6); keeper.rotation.y = 0.2; api.spot("keeper", keeper, { walkTo: [2, -1.8] });

    // the great door, set into the gate opening
    const door = k.group();
    const left = k.archSlab(3.4, 6, 0.3, "#7a4126"); door.add(left);
    const seam = k.box(0.08, 5.9, 0.34, "#4a2414"); door.add(seam);
    const knob = k.sphere(0.12, "#e2b04a"); knob.position.set(0.45, 2.8, 0.2); door.add(knob);
    const dsign = k.sign("DOOR", { height: 0.4 }); dsign.position.set(0, 4.6, 0.17); door.add(dsign);
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(3.2, 5.6), new THREE.MeshBasicMaterial({ color: "#fff3c4" }));
    glow.position.set(0, 2.8, -0.4); glow.visible = false; door.add(glow);
    door.position.set(4, 0, -6); api.spot("door", door, { walkTo: [4, -3.4], height: 6 });
    api.doorLeaf = left; api.doorSeam = seam; api.doorKnob = knob; api.doorSign = dsign; api.doorGlow = glow;
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
    // Pasha chews and looks around; the baker's flame flickers
    if (api.camelHead) { api.camelHead.rotation.z = Math.sin(t * 0.7) * 0.12; api.camelHead.position.y = 2.75 + Math.sin(t * 6) * 0.015; }
    const f = api.litLamp?.userData; if (f?.light && api.litLamp.visible) { f.light.intensity = 3.5 + Math.sin(t * 9) * 0.6 + Math.sin(t * 23) * 0.3; f.flame.scale.y = 1 + Math.sin(t * 13) * 0.15; }
  },
};
