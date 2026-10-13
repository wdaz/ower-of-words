// Floor 5: The Summit. The open top of the tower, above the clouds, where the elders of all peoples meet.
// Spot ids (must match content.js): elder1, elder2, elder3, table, bell
export default {
  sky: { top: "#bfa9e8", bottom: "#f3b3a0" },
  fog: { color: "#e9b3b4", near: 26, far: 75 },
  groundColor: "#d9b4d6", // the sea of clouds far below (the engine's ground is lowered in build)
  light: { sky: "#ece0ff", ground: "#3b2f60", hemi: 1.35, sun: "#ffd2a8", sunIntensity: 1.7, sunPos: [12, 11, 7] },
  bounds: { minX: -11, maxX: 11, minZ: -2.4, maxZ: 5 },
  camera: [0, 5.5, 10],

  build(k, api) {
    const { THREE, scene } = api;
    api.spawn = [-6, 3];
    const STONE = "#4a3a78", DARK = "#3b2f60", FLOOR = "#2a2048", GOLD = "#e2b04a";

    // drop the engine's ground far below: it becomes the cloud sea, and the summit stands above it
    scene.children.forEach(o => { if (o.isMesh && o.geometry.type === "PlaneGeometry") o.position.y = -14; });

    // the summit platform: a wide round top of the tower
    const R = 14;
    const top = k.cylinder(R, R + 0.6, 14, DARK, 24); top.position.y = -14; api.add(top);
    const floor = k.cylinder(R - 0.1, R - 0.1, 0.04, FLOOR, 24); api.add(floor);
    const band = k.cylinder(R + 0.7, R + 0.7, 0.5, STONE, 24); band.position.y = -1.2; api.add(band);
    // inlaid rings around the council
    [[2.6, 3.0], [6.6, 6.9]].forEach(([a, b]) => {
      const ring = new THREE.Mesh(new THREE.RingGeometry(a, b, 32), k.mat(STONE));
      ring.rotation.x = -Math.PI / 2; ring.position.set(0, 0.05, -1.4); ring.receiveShadow = true; api.add(ring);
    });
    // parapet: merlons around the rim
    for (let i = 0; i < 28; i++) {
      const a = (i / 28) * Math.PI * 2;
      const m = k.box(1.3, 0.7, 0.5, STONE);
      m.position.x = Math.sin(a) * (R - 0.3); m.position.z = Math.cos(a) * (R - 0.3); m.rotation.y = a; api.add(m);
    }
    const rimWall = new THREE.Mesh(new THREE.CylinderGeometry(R - 0.3, R - 0.3, 0.4, 40, 1, true), k.mat(DARK, { side: THREE.DoubleSide }));
    rimWall.position.y = 0.2; rimWall.receiveShadow = true; api.add(rimWall);
    // the hatch where the ladder from floor 4 comes up
    const hatch = k.box(1.6, 0.06, 1.6, "#120c24"); hatch.position.set(-8.6, 0, 3.4); api.add(hatch);
    const hrim = k.box(1.9, 0.12, 0.18, STONE); hrim.position.set(-8.6, 0, 2.5); api.add(hrim);
    [-9.35, -7.85].forEach(x => { const p = k.box(0.1, 1.1, 0.1, "#5a3b24"); p.position.set(x, 0, 2.55); api.add(p); });

    // the colonnade at the back, open in the middle, with the lintel and four banners
    [-13, -9, -5, 5, 9, 13].forEach(x => {
      const base = k.box(1.5, 0.4, 1.5, DARK); base.position.set(x, 0, -6.5); api.add(base);
      const col = k.cylinder(0.55, 0.62, 5.6, STONE, 8); col.position.set(x, 0.4, -6.5); api.add(col);
      const capi = k.box(1.5, 0.35, 1.5, DARK); capi.position.set(x, 5.95, -6.5); api.add(capi);
    });
    const lintel = k.box(28, 1, 1.4, DARK); lintel.position.set(0, 6.3, -6.5); api.add(lintel);
    const cornice = k.box(28.6, 0.25, 1.7, STONE); cornice.position.set(0, 7.3, -6.5); api.add(cornice);
    const bannerShape = new THREE.Shape();
    bannerShape.moveTo(-0.8, 0); bannerShape.lineTo(0.8, 0); bannerShape.lineTo(0.8, -3.2); bannerShape.lineTo(0, -2.6);
    bannerShape.lineTo(-0.8, -3.2); bannerShape.lineTo(-0.8, 0);
    const bannerGeo = new THREE.ShapeGeometry(bannerShape);
    api.banners = [];
    [["#b85a3a", -11], ["#2f6d60", -7], ["#6b3a5e", 7], ["#3a3f8f", 11]].forEach(([c, x]) => {
      const pivot = new THREE.Group(); pivot.position.set(x, 5.8, -5.7);
      const cloth = new THREE.Mesh(bannerGeo, k.mat(c, { side: THREE.DoubleSide })); cloth.castShadow = true; pivot.add(cloth);
      const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1.9, 6), k.mat(GOLD)); rod.rotation.z = Math.PI / 2; pivot.add(rod);
      const emblem = new THREE.Mesh(new THREE.CircleGeometry(0.34, 6), k.mat(GOLD, { side: THREE.DoubleSide })); emblem.position.set(0, -1.2, 0.02); pivot.add(emblem);
      api.add(pivot); api.banners.push(pivot);
    });

    // clouds below and around the summit, and a low dusk sun
    api.clouds = new THREE.Group();
    const cloudMats = ["#f7dcea", "#ecd0e8", "#fbe6e0"].map(c => k.mat(c, { emissive: "#7a5a70" }));
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2 + (i % 3) * 0.2, r = 24 + (i % 4) * 7;
      const c = new THREE.Group();
      for (let j = 0; j < 3; j++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(3 + ((i + j) % 3), 8, 6), cloudMats[(i + j) % 3]); puff.scale.y = 0.35; puff.position.set((j - 1) * 3.5, (j % 2) * 0.6, (j % 2) * 1.5); c.add(puff);
      }
      c.position.set(Math.sin(a) * r, -3 - (i % 3) * 1.5, Math.cos(a) * r - 4); api.clouds.add(c);
    }
    api.add(api.clouds);
    const sunDisk = new THREE.Mesh(new THREE.CircleGeometry(4.5, 24), new THREE.MeshBasicMaterial({ color: "#ffe2b8", fog: false }));
    sunDisk.position.set(30, -1, -90); api.add(sunDisk);

    // the elders' dais with three high stone seats
    const dais = k.box(8, 0.3, 1.8, DARK); dais.position.set(0, 0, -3.8); api.add(dais);
    const step = k.box(8.2, 0.12, 2.1, STONE); step.position.set(0, 0, -3.85); api.add(step);
    [[-2.3, 3.0], [0, 3.6], [2.3, 3.0]].forEach(([x, h]) => {
      const seat = k.archSlab(1.3, h, 0.25, STONE); seat.position.set(x, 0.3, -4.55); api.add(seat);
    });

    // the round council table
    const table = k.group();
    const ped = k.cylinder(0.35, 0.65, 0.85, "#5a3b24", 10); table.add(ped);
    const tTop = k.cylinder(1.45, 1.45, 0.14, "#6b4a2e", 18); tTop.position.y = 0.85; table.add(tTop);
    const edge = k.cylinder(1.5, 1.5, 0.05, GOLD, 18); edge.position.y = 0.83; table.add(edge);
    const scroll = k.emoji("📜", 0.5); scroll.position.set(-0.55, 1.25, 0.2); table.add(scroll);
    const scales = k.emoji("⚖️", 0.6); scales.position.set(0.45, 1.3, -0.1); table.add(scales);
    // a small cloth of each people's colour laid on the table
    ["#b85a3a", "#2f6d60", "#6b3a5e", "#3a3f8f"].forEach((c, i) => {
      const cl = k.box(0.5, 0.02, 0.32, c); const a = -0.9 + i * 0.6;
      cl.position.set(Math.sin(a) * 1.05, 0.99, Math.cos(a) * 1.05 - 0.15); cl.rotation.y = a; table.add(cl);
    });
    const tsign = k.sign("COUNCIL", { height: 0.24 }); tsign.position.set(0, 1.13, 1.0); tsign.rotation.x = -0.35; table.add(tsign);
    table.position.set(0, 0, -1.4); api.spot("table", table, { walkTo: [1.4, 0.9], height: 1.5 });

    // the three elders, standing on the dais behind the table
    const e1 = k.figure({ robe: "#b85a3a", trim: GOLD, mask: "#f4e8d2", hat: "tall", prop: "staff", scale: 1.05 });
    e1.position.set(-2.3, 0.3, -3.75); e1.rotation.y = 0.3; api.spot("elder1", e1, { walkTo: [-2.4, 0.4], height: 3.0 });
    const e2 = k.figure({ robe: "#3a3f8f", trim: "#f4c95d", mask: "#f2f0ff", hat: "crown", prop: "book", scale: 1.2 });
    e2.position.set(0, 0.3, -3.85); api.spot("elder2", e2, { walkTo: [0, 0.6], height: 3.2 });
    const e3 = k.figure({ robe: "#2f6d60", trim: "#f0b43c", mask: "#f6ead2", hat: "turban", prop: "scroll", scale: 1.05 });
    e3.position.set(2.3, 0.3, -3.75); e3.rotation.y = -0.3; api.spot("elder3", e3, { walkTo: [2.4, 0.4], height: 2.9 });

    // the bell: the way out, hanging in a frame on the right
    const bell = k.group();
    const bbase = k.box(3.2, 0.3, 1.3, DARK); bell.add(bbase);
    [-1.3, 1.3].forEach(x => { const p = k.box(0.32, 4.7, 0.32, "#5a3b24"); p.position.x = x; p.position.y += 0.3; bell.add(p); });
    const beam = k.box(3.3, 0.5, 0.45, "#4a2e1c"); beam.position.y = 4.8; bell.add(beam);
    const roof = k.box(3.8, 0.2, 0.9, STONE); roof.position.y = 5.3; bell.add(roof);
    const bsign = k.sign("BELL", { height: 0.38 }); bsign.position.set(0, 5.05, 0.24); bell.add(bsign);
    const pivot = new THREE.Group(); pivot.position.y = 4.8; bell.add(pivot);
    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.4, 6), k.mat("#2a2048")); rod.position.y = -0.2; pivot.add(rod);
    const prof = [[0.01, 0], [0.22, 0], [0.38, -0.12], [0.46, -0.45], [0.52, -0.9], [0.66, -1.22], [0.82, -1.38], [0.8, -1.45], [0.6, -1.4]]
      .map(([r, y]) => new THREE.Vector2(r, y));
    api.bellDull = k.mat("#8f7d4c", { side: THREE.DoubleSide });
    api.bellGold = k.mat("#f4c95d", { side: THREE.DoubleSide, emissive: "#9a6a12" });
    const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 12), api.bellDull); body.position.y = -0.4; body.castShadow = true; pivot.add(body);
    const lip = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.06, 5, 12), k.mat("#5e4f2c")); lip.rotation.x = Math.PI / 2; lip.position.y = -1.82; pivot.add(lip);
    const clapper = k.sphere(0.16, "#2a2048", 8); clapper.position.y = -1.75; pivot.add(clapper);
    // glow when the council has decided
    const gc = document.createElement("canvas"); gc.width = gc.height = 128;
    const gx = gc.getContext("2d"), grd = gx.createRadialGradient(64, 64, 4, 64, 64, 64);
    grd.addColorStop(0, "rgba(255,236,170,0.95)"); grd.addColorStop(0.4, "rgba(255,210,120,0.45)"); grd.addColorStop(1, "rgba(255,200,120,0)");
    gx.fillStyle = grd; gx.fillRect(0, 0, 128, 128);
    const gtex = new THREE.CanvasTexture(gc); gtex.colorSpace = THREE.SRGBColorSpace;
    const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: gtex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    glow.scale.set(4, 4, 4); glow.position.y = 3.6; bell.add(glow);
    const light = new THREE.PointLight("#ffd27a", 0, 10, 1.5); light.position.set(0, 3.4, 0.8); bell.add(light);
    const sparkle = k.emoji("✨", 0.7); sparkle.position.set(0, 2.2, 0.6); bell.add(sparkle);
    bell.position.set(6.6, 0, -3.4); bell.rotation.y = -0.3;
    api.spot("bell", bell, { walkTo: [6.0, -1.2], height: 5.6 });
    api.bellBody = body; api.bellPivot = pivot; api.bellGlow = glow; api.bellLight = light; api.bellSparkle = sparkle;
  },

  update(api, st) {
    const open = !!st.open;
    if (api.bellBody) api.bellBody.material = open ? api.bellGold : api.bellDull;
    if (api.bellGlow) api.bellGlow.visible = open;
    if (api.bellSparkle) api.bellSparkle.visible = open;
    if (api.bellLight) api.bellLight.intensity = open ? 8 : 0;
    api.bellOpen = open;
    if (!open && api.bellPivot) api.bellPivot.rotation.z = 0;
  },

  tick(api, t, dt) {
    if (api.bellOpen && api.bellPivot) {
      api.bellPivot.rotation.z = Math.sin(t * 2.2) * 0.12;
      if (api.bellGlow) api.bellGlow.material.opacity = 0.75 + Math.sin(t * 3) * 0.25;
    }
    if (api.clouds) api.clouds.rotation.y += dt * 0.01;
    if (api.banners) api.banners.forEach((b, i) => { b.rotation.x = Math.sin(t * 1.3 + i) * 0.05; });
  },
};
