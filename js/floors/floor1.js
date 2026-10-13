// Floor 1: The Gate. A desert courtyard before the tower's great door.
// Spot ids (must match content.js): well, bread, pilgrim, key, keeper, door
export default {
  sky: { top: "#f6c27a", bottom: "#e88a55" },
  fog: { color: "#eaa06a", near: 22, far: 55 },
  groundColor: "#c9774f",
  light: { sky: "#fff1d6", ground: "#7a3a22", hemi: 1.15, sun: "#fff0d0", sunIntensity: 1.7, sunPos: [-10, 16, 8] },
  bounds: { minX: -11, maxX: 11, minZ: -3.5, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE } = api;
    api.spawn = [-6, 3];

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
    well.position.set(-7, 0, -1.5); api.spot("well", well, { height: 2.6 });

    // table with bread
    const table = k.group(k.box(1.8, 0.1, 0.9, "#5a3320"));
    table.children[0].position.y = 0.85;
    [[-0.8, -0.35], [0.8, -0.35], [-0.8, 0.35], [0.8, 0.35]].forEach(([x, z]) => { const l = k.box(0.1, 0.85, 0.1, "#5a3320"); k.at(l, x, 0, z); table.add(l); });
    [-0.4, 0.35].forEach(x => { const b = k.emoji("🍞", 0.55); b.position.set(x, 1.15, 0); table.add(b); });
    const bsign = k.sign("BREAD", { height: 0.26 }); bsign.position.set(0, 0.6, 0.47); table.add(bsign);
    table.position.set(-4, 0, -0.5); api.spot("bread", table, { height: 1.6 });

    // tired pilgrim, sitting on a rock
    const rock = k.sphere(0.7, "#8a6a55", 7); rock.scale.y = 0.5; rock.position.set(-1, 0.25, -1.2); api.add(rock);
    const pilgrim = k.figure({ sit: true, robe: "#7a6a8c", trim: "#d9b44a", mask: "#d8c8b0", hat: "hood", prop: "staff" });
    pilgrim.position.set(-1, 0.45, -1.2); pilgrim.rotation.y = 0.3; api.spot("pilgrim", pilgrim, { walkTo: [-1, 0.6] });

    // key on a hook on the wall
    const key = k.group(k.box(0.5, 0.12, 0.3, "#3a2116"));
    key.children[0].position.y = 0;
    const keySprite = k.emoji("🔑", 0.6); keySprite.position.set(0, -0.35, 0.2); key.add(keySprite);
    const ksign = k.sign("KEY", { height: 0.24 }); ksign.position.set(0, -0.85, 0.16); key.add(ksign);
    key.position.set(4.5, 2.6, -5.3); key.userData.height = 3.2; api.spot("key", key, { walkTo: [4.5, -3.2], height: 0.6 });
    api.keySprite = keySprite;

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
    const open = !!st.open;
    [api.doorLeaf, api.doorSeam, api.doorKnob, api.doorSign].forEach(o => { if (o) o.visible = !open; });
    if (api.doorGlow) api.doorGlow.visible = open;
  },
};
