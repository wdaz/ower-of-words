// The 3D stage: renderer, camera that follows the traveler, click-to-walk, clickable spots.
// Floors describe their world through the small `api` handed to their build() function.
import * as THREE from "three";
import * as kit from "./kit.js";

export function createEngine(container, { onSpot }) {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 200);
  let scene, floor, api, spots, markers, bounds, camOffset, ringMesh;
  const clock = new THREE.Clock();
  const raycaster = new THREE.Raycaster(), pointer = new THREE.Vector2();
  const groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);

  // the traveler (white mask, red scarf)
  const avatar = kit.figure({ robe: "#f4efe6", trim: "#c8402a", mask: "#ffffff", hat: "hood", scale: 0.95 });
  let target = null, arriveCb = null;
  const keys = new Set();

  function gradientTexture(top, bottom) {
    const c = document.createElement("canvas"); c.width = 2; c.height = 256;
    const g = c.getContext("2d"), grd = g.createLinearGradient(0, 0, 0, 256);
    grd.addColorStop(0, top); grd.addColorStop(1, bottom); g.fillStyle = grd; g.fillRect(0, 0, 2, 256);
    const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
  }

  function loadFloor(mod, state) {
    floor = mod;
    scene = new THREE.Scene();
    const sky = mod.sky || { top: "#f6c27a", bottom: "#e88a55" };
    scene.background = gradientTexture(sky.top, sky.bottom);
    if (mod.fog) scene.fog = new THREE.Fog(mod.fog.color, mod.fog.near, mod.fog.far);

    const hemi = new THREE.HemisphereLight(mod.light?.sky || "#fff4e0", mod.light?.ground || "#6b3a26", mod.light?.hemi ?? 1.1);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(mod.light?.sun || "#fff1d6", mod.light?.sunIntensity ?? 1.6);
    sun.position.set(...(mod.light?.sunPos || [8, 14, 6]));
    sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048);
    Object.assign(sun.shadow.camera, { left: -22, right: 22, top: 22, bottom: -22, near: 1, far: 60 });
    sun.shadow.bias = -0.0005;
    scene.add(sun);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), kit.mat(mod.groundColor || "#6b3322"));
    ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);

    spots = new Map(); markers = new Map();
    bounds = mod.bounds || { minX: -12, maxX: 12, minZ: -6, maxZ: 6 };
    camOffset = new THREE.Vector3(...(mod.camera || [0, 5.5, 10]));
    api = {
      THREE, kit, scene,
      add(obj) { scene.add(obj); return obj; },
      // register a clickable thing; walkTo is where the traveler stands to use it
      spot(id, obj, opts = {}) {
        scene.add(obj);
        obj.traverse(o => { o.userData.spotId = id; });
        const p = obj.position;
        spots.set(id, { id, obj, walkTo: opts.walkTo || [p.x, Math.min(bounds.maxZ, p.z + 1.4)], height: opts.height || (obj.userData.height || 2) });
        return obj;
      },
      spawn: [0, 3],
    };
    mod.build(kit, api, state);
    scene.add(avatar);
    avatar.position.set(api.spawn[0], 0, api.spawn[1]);
    avatar.rotation.y = 0;
    target = null; arriveCb = null;

    ringMesh = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.7, 32), new THREE.MeshBasicMaterial({ color: "#fff6c8", transparent: true, opacity: 0.8, depthWrite: false }));
    ringMesh.rotation.x = -Math.PI / 2; ringMesh.position.y = 0.02; ringMesh.visible = false; scene.add(ringMesh);

    if (mod.update) mod.update(api, state);
    camera.position.copy(avatar.position).add(camOffset);
    resize();
  }

  function refresh(state) { if (floor && floor.update) floor.update(api, state); }

  // bobbing diamond above the spots that want attention
  function setMarkers(ids) {
    for (const [id, m] of markers) { if (!ids.includes(id)) { scene.remove(m); markers.delete(id); } }
    ids.forEach(id => {
      if (markers.has(id) || !spots.has(id)) return;
      const s = spots.get(id), m = new THREE.Mesh(new THREE.OctahedronGeometry(0.22), new THREE.MeshBasicMaterial({ color: "#fff6c8" }));
      const wp = new THREE.Vector3(); s.obj.getWorldPosition(wp);
      m.position.set(wp.x, s.height + 0.5, wp.z); m.userData.baseY = m.position.y; scene.add(m); markers.set(id, m);
    });
  }

  function walkTo(x, z, cb) {
    target = new THREE.Vector3(THREE.MathUtils.clamp(x, bounds.minX, bounds.maxX), 0, THREE.MathUtils.clamp(z, bounds.minZ, bounds.maxZ));
    arriveCb = cb || null;
  }
  function goToSpot(id) {
    const s = spots.get(id); if (!s) return;
    walkTo(s.walkTo[0], s.walkTo[1], () => { faceTowards(s.obj); onSpot(id); });
  }
  function faceTowards(obj) { const wp = new THREE.Vector3(); obj.getWorldPosition(wp); avatar.rotation.y = Math.atan2(wp.x - avatar.position.x, wp.z - avatar.position.z); }

  function pick(ev) {
    const r = renderer.domElement.getBoundingClientRect();
    pointer.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const shown = o => { for (; o; o = o.parent) if (!o.visible) return false; return true; };
    const hits = raycaster.intersectObjects(scene.children, true).filter(h => h.object.userData.spotId && shown(h.object));
    if (hits.length) return { spot: hits[0].object.userData.spotId };
    const p = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(groundPlane, p)) return { ground: p };
    return null;
  }
  renderer.domElement.addEventListener("click", ev => {
    const h = pick(ev); if (!h) return;
    if (h.spot) goToSpot(h.spot); else walkTo(h.ground.x, h.ground.z);
  });
  renderer.domElement.addEventListener("pointermove", ev => {
    if (!scene) return;
    const h = pick(ev);
    renderer.domElement.style.cursor = h && h.spot ? "pointer" : "default";
    if (h && h.spot && spots.has(h.spot)) {
      const wp = new THREE.Vector3(); spots.get(h.spot).obj.getWorldPosition(wp);
      ringMesh.position.set(wp.x, 0.02, wp.z); ringMesh.visible = true;
    } else ringMesh.visible = false;
  });
  window.addEventListener("keydown", e => { if (e.target.closest("input,textarea")) return; const k = e.key.toLowerCase(); if (["w", "a", "s", "d", "arrowup", "arrowdown", "arrowleft", "arrowright"].includes(k)) { keys.add(k); e.preventDefault(); } });
  window.addEventListener("keyup", e => keys.delete(e.key.toLowerCase()));

  function resize() {
    const w = container.clientWidth, h = Math.round(w * (window.innerWidth < 600 ? 0.9 : 0.5625));
    renderer.setSize(w, h, false); renderer.domElement.style.width = "100%"; renderer.domElement.style.height = "auto";
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  window.addEventListener("resize", resize);

  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  function tick() {
    const dt = Math.min(0.05, clock.getDelta()), t = clock.elapsedTime;
    if (scene) {
      // keyboard walking
      const kv = new THREE.Vector3((keys.has("d") || keys.has("arrowright")) - (keys.has("a") || keys.has("arrowleft")), 0, (keys.has("s") || keys.has("arrowdown")) - (keys.has("w") || keys.has("arrowup")));
      if (kv.lengthSq()) { target = null; arriveCb = null; kv.normalize().multiplyScalar(4 * dt); avatar.position.add(kv); avatar.rotation.y = Math.atan2(kv.x, kv.z); }
      if (target) {
        const d = target.clone().sub(avatar.position); d.y = 0;
        const dist = d.length();
        if (dist < 0.08) { target = null; const cb = arriveCb; arriveCb = null; cb && cb(); }
        else { const step = Math.min(dist, 4 * dt); d.normalize(); avatar.position.addScaledVector(d, step); avatar.rotation.y = Math.atan2(d.x, d.z); }
      }
      avatar.position.x = THREE.MathUtils.clamp(avatar.position.x, bounds.minX, bounds.maxX);
      avatar.position.z = THREE.MathUtils.clamp(avatar.position.z, bounds.minZ, bounds.maxZ);
      const walking = target || kv.lengthSq();
      avatar.position.y = walking && !reduceMotion ? Math.abs(Math.sin(t * 10)) * 0.06 : 0;
      for (const m of markers.values()) { m.rotation.y += dt * 2; if (!reduceMotion) m.position.y = m.userData.baseY + Math.sin(t * 3) * 0.12; }
      if (floor.tick) floor.tick(api, t, dt);
      const want = avatar.position.clone().add(camOffset);
      camera.position.lerp(want, reduceMotion ? 1 : Math.min(1, dt * 3));
      camera.lookAt(avatar.position.x, 1.8, avatar.position.z - 4);
      renderer.render(scene, camera);
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  return { loadFloor, refresh, setMarkers, goToSpot, walkTo, resize, get api() { return api; }, renderer, camera };
}
