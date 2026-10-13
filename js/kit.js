// Building blocks for the tower's floors: flat-shaded, Chants-of-Sennaar-like shapes.
// Every helper returns a THREE.Object3D positioned at the origin; the caller places it.
import * as THREE from "three";
import { charactersReady, makeCharacter, hand } from "./characters.js";

const matCache = new Map();
export function mat(color, opts = {}) {
  const key = color + JSON.stringify(opts);
  if (!matCache.has(key)) {
    matCache.set(key, new THREE.MeshLambertMaterial({ color, flatShading: true, ...opts }));
  }
  return matCache.get(key);
}

function shadowed(mesh) { mesh.castShadow = true; mesh.receiveShadow = true; return mesh; }

export function box(w, h, d, color) {
  const m = shadowed(new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color)));
  m.position.y = h / 2; // sits on the ground
  return m;
}

export function cylinder(rTop, rBottom, h, color, seg = 10) {
  const m = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(rTop, rBottom, h, seg), mat(color)));
  m.position.y = h / 2;
  return m;
}

export function cone(r, h, color, seg = 8) {
  const m = shadowed(new THREE.Mesh(new THREE.ConeGeometry(r, h, seg), mat(color)));
  m.position.y = h / 2;
  return m;
}

export function sphere(r, color, seg = 10) {
  return shadowed(new THREE.Mesh(new THREE.SphereGeometry(r, seg, Math.max(6, seg - 2)), mat(color)));
}

// A wall with an arched opening cut out (extruded shape). w × h, thickness t, opening ow × oh.
export function archWall(w, h, t, color, ow = 0, oh = 0) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h); s.lineTo(-w / 2, h); s.lineTo(-w / 2, 0);
  if (ow > 0) {
    const hole = new THREE.Path();
    hole.moveTo(-ow / 2, 0); hole.lineTo(ow / 2, 0); hole.lineTo(ow / 2, oh - ow / 2);
    hole.absarc(0, oh - ow / 2, ow / 2, 0, Math.PI, false);
    hole.lineTo(-ow / 2, 0);
    s.holes.push(hole);
  }
  const g = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false });
  g.translate(0, 0, -t / 2);
  return shadowed(new THREE.Mesh(g, mat(color)));
}

// A solid arch-topped slab (a door, a window panel). Stands on the ground.
export function archSlab(w, h, t, color) {
  const s = new THREE.Shape();
  s.moveTo(-w / 2, 0); s.lineTo(w / 2, 0); s.lineTo(w / 2, h - w / 2);
  s.absarc(0, h - w / 2, w / 2, 0, Math.PI, false); s.lineTo(-w / 2, 0);
  const g = new THREE.ExtrudeGeometry(s, { depth: t, bevelEnabled: false });
  g.translate(0, 0, -t / 2);
  return shadowed(new THREE.Mesh(g, mat(color)));
}

// Stairs going up along -z. n steps, each step w wide, sh high, sd deep.
export function stairs(n, w, sh, sd, color) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const b = box(w, sh * (i + 1), sd, color);
    b.position.z = -i * sd;
    g.add(b);
  }
  return g;
}

// A robed, masked character with a simple rig so it can breathe, look, walk and gesture.
// Options:
//  robe, trim (sash/hat colour), mask, skin, hat: "hood"|"tall"|"turban"|"round"|"crown"|none,
//  prop: "spear"|"staff"|"book"|"scroll"|none, scale, sit (boolean)
// Structure: root group (placed by the caller) > rig (sways, breathes) > body parts, arms, head group.
export function figure(o = {}) {
  if (charactersReady() && !o.procedural) return riggedFigure(o);
  const g = new THREE.Group(), rig = new THREE.Group(); g.add(rig);
  const s = o.scale || 1, robe = o.robe || "#8a6a5a", trim = o.trim || "#d9b44a";
  const skin = o.skin || SKINS[Math.abs(hash(robe + (o.hat || ""))) % SKINS.length], hair = o.hair || HAIRS[Math.abs(hash(trim + robe)) % HAIRS.length];
  const bodyH = (o.sit ? 0.95 : 1.45) * s;
  // robe skirt from the waist to the floor, slightly flared
  const skirtH = bodyH * 0.58;
  const skirt = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.2 * s, 0.36 * s, skirtH, 12), mat(robe)));
  skirt.position.y = skirtH / 2; rig.add(skirt);
  // torso: narrow waist, broad shoulders
  const torsoH = bodyH - skirtH;
  const torso = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.27 * s, 0.2 * s, torsoH, 12), mat(robe)));
  torso.position.y = skirtH + torsoH / 2; rig.add(torso);
  [-1, 1].forEach(sd => { const sh = sphere(0.1 * s, robe, 8); sh.position.set(sd * 0.25 * s, bodyH - 0.06 * s, 0); rig.add(sh); });
  const sash = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.215 * s, 0.215 * s, 0.09 * s, 12), mat(trim)));
  sash.position.y = skirtH; rig.add(sash);
  const hem = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.365 * s, 0.37 * s, 0.07 * s, 12), mat(trim)));
  hem.position.y = 0.04 * s; rig.add(hem);
  [-1, 1].forEach(sd => { const ft = shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.11 * s, 0.07 * s, 0.2 * s), mat("#2a1a12"))); ft.position.set(sd * 0.11 * s, 0.035 * s, 0.3 * s); rig.add(ft); });
  const neck = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.07 * s, 0.08 * s, 0.12 * s, 8), mat(skin)));
  neck.position.y = bodyH + 0.04 * s; rig.add(neck);
  const collar = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.13 * s, 0.2 * s, 0.07 * s, 12), mat(trim)));
  collar.position.y = bodyH - 0.01 * s; rig.add(collar);

  // arms hang from the shoulders; rotating the pivot swings the whole arm
  const arm = side => {
    const pivot = new THREE.Group(); pivot.position.set(side * 0.3 * s, bodyH - 0.07 * s, 0);
    const sleeve = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.075 * s, 0.11 * s, 0.6 * s, 8), mat(robe)));
    sleeve.position.y = -0.3 * s; sleeve.rotation.z = side * 0.12; pivot.add(sleeve);
    const hand = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.07 * s, 8, 6), mat(skin)));
    hand.position.set(side * 0.04 * s, -0.66 * s, 0); pivot.add(hand);
    pivot.rotation.z = side * 0.08; rig.add(pivot); return pivot;
  };
  const armL = arm(-1), armR = arm(1);

  const headG = new THREE.Group(); const headY = bodyH + 0.27 * s; headG.position.y = headY; rig.add(headG);
  const head = sphere(0.2 * s, skin, 14); head.scale.set(0.95, 1.08, 1); headG.add(head);
  // hair at the back and top of the head
  const hairCap = shadowed(new THREE.Mesh(new THREE.SphereGeometry(0.212 * s, 14, 8, 0, Math.PI * 2, 0, Math.PI * 0.55), mat(hair)));
  hairCap.rotation.x = -0.5; hairCap.position.set(0, 0.015 * s, -0.02 * s); headG.add(hairCap);
  [-1, 1].forEach(sd => { const ear = sphere(0.045 * s, skin, 6); ear.scale.set(0.5, 1, 0.8); ear.position.set(sd * 0.19 * s, 0, 0); headG.add(ear); });
  // face: eyes (white + pupil) that blink, brows, nose, a mouth that opens when talking
  const eyes = new THREE.Group(), white = new THREE.MeshBasicMaterial({ color: "#fbf7ef" }), dark = new THREE.MeshBasicMaterial({ color: "#1d120c" });
  [-1, 1].forEach(sd => {
    const e = new THREE.Mesh(new THREE.SphereGeometry(0.038 * s, 10, 8), white); e.scale.set(1.15, 1, 0.5); e.position.set(sd * 0.072 * s, 0.03 * s, 0.178 * s); eyes.add(e);
    const pu = new THREE.Mesh(new THREE.SphereGeometry(0.021 * s, 8, 6), dark); pu.position.set(sd * 0.072 * s, 0.028 * s, 0.197 * s); eyes.add(pu);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.075 * s, 0.017 * s, 0.02 * s), mat(hair)); brow.position.set(sd * 0.074 * s, 0.083 * s, 0.183 * s); brow.rotation.z = -sd * 0.12; headG.add(brow);
  });
  headG.add(eyes);
  const nose = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.03 * s, 0.07 * s, 6), mat(skin))); nose.rotation.x = Math.PI / 2; nose.position.set(0, -0.015 * s, 0.215 * s); headG.add(nose);
  const mouth = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 10, 6), new THREE.MeshBasicMaterial({ color: "#5a1e1a" })); mouth.scale.set(1.2, 0.18, 0.4); mouth.position.set(0, -0.095 * s, 0.17 * s); headG.add(mouth);
  if (o.beard) { const bd = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.13 * s, 0.25 * s, 8), mat(o.beard))); bd.rotation.x = Math.PI; bd.position.set(0, -0.2 * s, 0.07 * s); headG.add(bd); }
  let hat = null;
  if (o.hat === "hood") { hat = new THREE.Mesh(new THREE.SphereGeometry(0.25 * s, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.62), mat(robe)); hat.position.set(0, 0.01 * s, -0.04 * s); hat.rotation.x = -0.45; }
  if (o.hat === "tall") { hat = new THREE.Mesh(new THREE.ConeGeometry(0.2 * s, 0.7 * s, 10), mat(trim)); hat.position.y = 0.5 * s; }
  if (o.hat === "turban") { hat = new THREE.Mesh(new THREE.SphereGeometry(0.26 * s, 10, 6), mat(trim)); hat.scale.set(1, 0.6, 1); hat.position.y = 0.16 * s; }
  if (o.hat === "round") { hat = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * s, 0.4 * s, 0.14 * s, 12), mat(trim)); hat.position.y = 0.2 * s; }
  if (o.hat === "crown") { hat = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.2 * s, 0.26 * s, 6, 1, true), mat(trim, { side: THREE.DoubleSide })); hat.position.y = 0.24 * s; }
  if (hat) { shadowed(hat); headG.add(hat); }

  // props are held in the right hand, so they move with the arm
  if (o.prop === "spear" || o.prop === "staff") {
    const len = (o.prop === "spear" ? 2.6 : 1.9) * s;
    const pole = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.03 * s, 0.03 * s, len, 6), mat("#4a2e1c")));
    pole.position.set(0.05 * s, -0.66 * s + len * 0.3, 0.06 * s); armR.add(pole);
    if (o.prop === "spear") { const tip = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.08 * s, 0.3 * s, 6), mat(trim))); tip.position.set(0.05 * s, -0.66 * s + len * 0.8 + 0.15 * s, 0.06 * s); armR.add(tip); }
    armR.rotation.x = -0.25; armR.userData.holding = true;
  }
  if (o.prop === "book" || o.prop === "scroll") {
    const p = o.prop === "book" ? new THREE.Mesh(new THREE.BoxGeometry(0.3 * s, 0.22 * s, 0.08 * s), mat(trim))
                                : new THREE.Mesh(new THREE.CylinderGeometry(0.05 * s, 0.05 * s, 0.4 * s, 6), mat("#efe2c4"));
    p.position.set(-0.06 * s, -0.62 * s, 0.14 * s); if (o.prop === "scroll") p.rotation.z = Math.PI / 2;
    shadowed(p); armR.add(p); armR.rotation.x = -0.7; armR.userData.holding = true;
  }
  g.userData.height = headY + 0.4 * s;
  g.userData.figure = { rig, armL, armR, headG, eyes, mouth, sit: !!o.sit, phase: Math.random() * 10,
    baseArmRx: armR.rotation.x, yaw: null, talk: 0, look: 0, nextBlink: 1 + Math.random() * 3 };
  return g;
}

// Bring a figure to life for one frame.
// st: { walking, talking, lookAt: THREE.Vector3 | null, turnTo: THREE.Vector3 | null, still (reduced motion) }
const _v = new THREE.Vector3();
export function animateFigure(g, t, dt, st = {}) {
  const f = g.userData.figure; if (!f) return;
  if (f.ch) return animateRigged(g, f, t, dt, st);
  const ph = f.phase, k = Math.min(1, dt * 6);
  if (f.yaw === null) f.yaw = g.rotation.y;
  f.talk += ((st.talking ? 1 : 0) - f.talk) * Math.min(1, dt * 5);
  if (st.still) { f.rig.scale.y = 1; return; }

  // breathing and a slow weight shift
  f.rig.scale.y = 1 + Math.sin(t * 1.9 + ph) * 0.018;
  f.rig.rotation.z = Math.sin(t * 0.6 + ph) * 0.025 + (st.walking ? Math.sin(t * 10) * 0.05 : 0);
  f.rig.position.y = st.talking ? Math.abs(Math.sin(t * 7 + ph)) * 0.02 : 0;

  // turn the whole body towards someone who comes close, then back to the authored pose
  if (st.turnTo) { g.getWorldPosition(_v); const want = Math.atan2(st.turnTo.x - _v.x, st.turnTo.z - _v.z); g.rotation.y += angleDelta(g.rotation.y, want) * Math.min(1, dt * 3); }
  else if (!st.walking && !st.keepYaw) g.rotation.y += angleDelta(g.rotation.y, f.yaw) * Math.min(1, dt * 1.5);

  // head: look at a target, otherwise glance around now and then
  let yaw = Math.sin(t * 0.35 + ph) * 0.35 * (Math.sin(t * 0.13 + ph * 2) > 0.3 ? 1 : 0.2), pitch = 0;
  if (st.lookAt) {
    f.headG.getWorldPosition(_v);
    const world = Math.atan2(st.lookAt.x - _v.x, st.lookAt.z - _v.z);
    yaw = THREE.MathUtils.clamp(angleDelta(g.rotation.y, world), -1.1, 1.1);
    pitch = THREE.MathUtils.clamp(-Math.atan2(st.lookAt.y - _v.y, Math.hypot(st.lookAt.x - _v.x, st.lookAt.z - _v.z)), -0.4, 0.4);
  }
  f.headG.rotation.y += (yaw - f.headG.rotation.y) * k;
  f.headG.rotation.x += (pitch + (st.talking ? Math.sin(t * 9 + ph) * 0.09 : 0) - f.headG.rotation.x) * k;
  f.headG.rotation.z = Math.sin(t * 0.8 + ph) * 0.04 * (1 - f.talk) + Math.sin(t * 4.5) * 0.06 * f.talk;

  // arms: swing when walking, gesture when talking, rest otherwise
  let lx = Math.sin(t * 1.3 + ph) * 0.04, rx = f.baseArmRx + Math.sin(t * 1.3 + ph + 1) * 0.04, lz = -0.08, rz = 0.08;
  if (st.walking) { lx = Math.sin(t * 10) * 0.6; if (!f.armR.userData.holding) rx = -Math.sin(t * 10) * 0.6; }
  if (f.talk > 0.01) {
    const free = f.armR.userData.holding ? f.armL : f.armR, side = free === f.armR ? 1 : -1;
    const gx = -1.1 - Math.sin(t * 5.5 + ph) * 0.35, gz = side * (0.35 + Math.sin(t * 3.7) * 0.15);
    if (free === f.armR) { rx += (gx - rx) * f.talk; rz += (gz - rz) * f.talk; } else { lx += (gx - lx) * f.talk; lz += (gz - lz) * f.talk; }
  }
  f.armL.rotation.x += (lx - f.armL.rotation.x) * k; f.armL.rotation.z += (lz - f.armL.rotation.z) * k;
  f.armR.rotation.x += (rx - f.armR.rotation.x) * k; f.armR.rotation.z += (rz - f.armR.rotation.z) * k;

  // mouth opens and closes while talking
  f.mouth.scale.y = 0.18 + f.talk * (0.35 + Math.sin(t * 17 + ph) * 0.3 + Math.sin(t * 11) * 0.15);
  // blink
  f.nextBlink -= dt;
  if (f.nextBlink < 0) { f.eyes.scale.y = 0.1; if (f.nextBlink < -0.12) { f.eyes.scale.y = 1; f.nextBlink = 2 + Math.random() * 4; } }
}
// ---- rigged characters (js/characters.js): skeletal clips from the model, look-at and talk on top ----
function riggedFigure(o) {
  const ch = makeCharacter(o), g = new THREE.Group(); g.add(ch.model);
  const s = o.scale || 1;
  // props the model does not carry itself are made here and put in the right hand
  if (o.prop && !ch.ownProp) {
    const p = new THREE.Group();
    if (o.prop === "spear" || o.prop === "staff") {
      const len = (o.prop === "spear" ? 2.4 : 1.8) * s;
      const pole = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.03 * s, 0.03 * s, len, 6), mat("#4a2e1c")));
      pole.position.y = len * 0.25; p.add(pole);
      if (o.prop === "spear") { const tip = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.07 * s, 0.28 * s, 6), mat(o.trim || "#d9b44a"))); tip.position.y = len * 0.75 + 0.14 * s; p.add(tip); }
    } else if (o.prop === "book") {
      p.add(shadowed(new THREE.Mesh(new THREE.BoxGeometry(0.28 * s, 0.2 * s, 0.07 * s), mat(o.trim || "#a3543c"))));
    } else if (o.prop === "scroll") {
      const sc = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.045 * s, 0.045 * s, 0.36 * s, 6), mat("#efe2c4"))); sc.rotation.z = Math.PI / 2; p.add(sc);
    }
    // place it at the hand in the resting pose, then let the hand bone carry it
    ch.model.updateMatrixWorld(true);
    hand(ch).getWorldPosition(p.position);
    ch.model.add(p); p.position.copy(ch.model.worldToLocal(p.position)); p.scale.setScalar(1 / ch.scale);
    ch.model.updateMatrixWorld(true); hand(ch).attach(p);
  }
  g.userData.height = ch.height + 0.25 * s;
  g.userData.figure = { ch, cur: ch.base, phase: Math.random() * 10, yaw: null, talk: 0, hy: 0, hp: 0, nextGesture: 0, gesture: null, posed: false };
  ch.mixer.addEventListener("finished", e => {
    const f = g.userData.figure; if (e.action !== f.gesture) return;
    e.action.fadeOut(0.3); ch.actions[f.cur].reset().fadeIn(0.3).play(); f.gesture = null;
  });
  return g;
}

// one-shot clip (a gesture, a cheer), blending back into the loop when done
function playOnce(f, name) {
  const a = f.ch.actions[name]; if (!a || f.gesture) return;
  a.reset().setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = false;
  f.ch.actions[f.cur].fadeOut(0.25); a.fadeIn(0.25).play(); f.gesture = a;
}
export function cheer(g) { const f = g?.userData.figure; if (f?.ch && !f.ch.base.startsWith("Sit")) playOnce(f, "Cheer"); }

const _q = new THREE.Quaternion(), _qg = new THREE.Quaternion(), _qp = new THREE.Quaternion(), _qb = new THREE.Quaternion(), _e = new THREE.Euler();
const GESTURES = ["Interact", "Use_Item"];
function animateRigged(g, f, t, dt, st) {
  const ch = f.ch;
  if (f.yaw === null) f.yaw = g.rotation.y;
  f.talk += ((st.talking ? 1 : 0) - f.talk) * Math.min(1, dt * 5);
  if (st.still) { if (!f.posed) { ch.mixer.update(0); f.posed = true; } return; }

  // loop: walk while moving, otherwise the figure's idle (standing or sitting)
  const want = st.walking ? "Walking_A" : ch.base;
  if (want !== f.cur) {
    if (st.walking && f.gesture) { f.gesture.fadeOut(0.2); f.gesture = null; } // walking cuts a gesture short
    if (!f.gesture) { ch.actions[f.cur].fadeOut(0.2); ch.actions[want].reset().fadeIn(0.2).play(); }
    f.cur = want;
  }
  // a hand gesture now and then while speaking
  if (st.talking && !st.walking && !ch.base.startsWith("Sit") && t > f.nextGesture) {
    playOnce(f, GESTURES[Math.floor(Math.random() * GESTURES.length)]);
    f.nextGesture = t + 3 + Math.random() * 3;
  }

  if (st.turnTo) { g.getWorldPosition(_v); const w = Math.atan2(st.turnTo.x - _v.x, st.turnTo.z - _v.z); g.rotation.y += angleDelta(g.rotation.y, w) * Math.min(1, dt * 3); }
  else if (!st.walking && !st.keepYaw) g.rotation.y += angleDelta(g.rotation.y, f.yaw) * Math.min(1, dt * 1.5);

  // the mixer only writes a bone when the clip's value changes, so undo last frame's head turn
  // first; otherwise it would pile up on a still clip
  const head = ch.bones.head;
  if (head && f.animQ) head.quaternion.copy(f.animQ);
  ch.mixer.update(dt);
  if (head) (f.animQ ||= new THREE.Quaternion()).copy(head.quaternion);

  // head on top of the clip: look at a target, else glance around; nod while talking
  const ph = f.phase, k = Math.min(1, dt * 6);
  let yaw = Math.sin(t * 0.35 + ph) * 0.35 * (Math.sin(t * 0.13 + ph * 2) > 0.3 ? 1 : 0.2), pitch = 0;
  if (st.lookAt && head) {
    head.getWorldPosition(_v);
    yaw = THREE.MathUtils.clamp(angleDelta(g.rotation.y, Math.atan2(st.lookAt.x - _v.x, st.lookAt.z - _v.z)), -1, 1);
    pitch = THREE.MathUtils.clamp(-Math.atan2(st.lookAt.y - _v.y, Math.hypot(st.lookAt.x - _v.x, st.lookAt.z - _v.z)), -0.35, 0.35);
  }
  if (st.walking) { yaw *= 0.3; pitch = 0; }
  f.hy += (yaw - f.hy) * k; f.hp += (pitch - f.hp) * k;
  if (head) {
    // the bone's own axes are not the body's, so build the turn in the figure's space and carry it over
    const nod = Math.sin(t * 8 + ph) * 0.07 * f.talk, tilt = Math.sin(t * 4.5) * 0.06 * f.talk;
    head.updateWorldMatrix(true, false);
    g.getWorldQuaternion(_qg); head.parent.getWorldQuaternion(_qp); head.getWorldQuaternion(_qb);
    _q.setFromEuler(_e.set(f.hp + nod, f.hy, tilt, "YXZ")).premultiply(_qg).multiply(_qg.invert()); // turn about the figure's axes, in world space
    head.quaternion.copy(_qp.invert().multiply(_q.multiply(_qb)));
  }
}

const SKINS = ["#e9c3a0", "#d9a77f", "#c08a62", "#a36f4c", "#7d5236", "#f0d2b6"];
const HAIRS = ["#2b1d16", "#4a3022", "#6b4a2e", "#1f1a1a", "#8c8278"];
function hash(str) { let h = 0; for (const c of str) h = (h * 31 + c.charCodeAt(0)) | 0; return h; }
function angleDelta(a, b) { let d = (b - a) % (Math.PI * 2); if (d > Math.PI) d -= Math.PI * 2; if (d < -Math.PI) d += Math.PI * 2; return d; }

// Text on a plaque, readable in the world. Faces +z by default.
export function sign(text, { bg = "#f2e3c4", ink = "#2a1a12", height = 0.4, font = "Marcellus, Georgia, serif" } = {}) {
  const px = 64, c = document.createElement("canvas"), ctx = c.getContext("2d");
  ctx.font = `${px}px ${font}`;
  const w = Math.ceil(ctx.measureText(text).width + px * 1.2);
  c.width = w; c.height = Math.ceil(px * 1.6);
  ctx.fillStyle = bg; ctx.fillRect(0, 0, c.width, c.height);
  ctx.strokeStyle = ink; ctx.lineWidth = 6; ctx.strokeRect(3, 3, c.width - 6, c.height - 6);
  ctx.font = `${px}px ${font}`; ctx.fillStyle = ink; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(text, c.width / 2, c.height / 2 + 4);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace; tex.anisotropy = 4;
  const aspect = c.width / c.height;
  const m = new THREE.Mesh(new THREE.PlaneGeometry(height * aspect, height), new THREE.MeshBasicMaterial({ map: tex }));
  return m;
}

// An emoji drawn on a camera-facing sprite (fruit, bread, a key...). size in world units.
export function emoji(ch, size = 0.5) {
  const c = document.createElement("canvas"); c.width = c.height = 128;
  const ctx = c.getContext("2d"); ctx.font = "100px serif"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
  ctx.fillText(ch, 64, 72);
  const tex = new THREE.CanvasTexture(c); tex.colorSpace = THREE.SRGBColorSpace;
  const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: tex, transparent: true }));
  sp.scale.set(size, size, size);
  return sp;
}

// Small helper: place an object and return it.
export function at(obj, x, y, z, rotY = 0) { obj.position.x += x; obj.position.y += y; obj.position.z += z; obj.rotation.y = rotY; return obj; }

export function group(...children) { const g = new THREE.Group(); children.forEach(c => g.add(c)); return g; }

export { THREE };
