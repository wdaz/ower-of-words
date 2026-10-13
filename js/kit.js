// Building blocks for the tower's floors: flat-shaded, Chants-of-Sennaar-like shapes.
// Every helper returns a THREE.Object3D positioned at the origin; the caller places it.
import * as THREE from "three";

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

// A robed, masked character. Options:
//  robe, trim (sash/hat colour), mask, skin, hat: "hood"|"tall"|"turban"|"round"|"crown"|none,
//  prop: "spear"|"staff"|"book"|"scroll"|none, scale, sit (boolean)
export function figure(o = {}) {
  const g = new THREE.Group();
  const s = o.scale || 1, robe = o.robe || "#8a6a5a", trim = o.trim || "#d9b44a";
  const bodyH = (o.sit ? 0.9 : 1.45) * s;
  const body = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.2 * s, 0.42 * s, bodyH, 10), mat(robe)));
  body.position.y = bodyH / 2; g.add(body);
  const sash = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.3 * s, 0.33 * s, 0.1 * s, 10), mat(trim)));
  sash.position.y = bodyH * 0.55; g.add(sash);
  const headY = bodyH + 0.22 * s;
  const head = sphere(0.22 * s, o.skin || "#2a1a14"); head.position.y = headY; g.add(head);
  // mask: a flattened sphere in front of the head, with a dark eye slit
  const mask = sphere(0.19 * s, o.mask || "#f2e6d0"); mask.scale.set(1, 1.15, 0.55); mask.position.set(0, headY, 0.1 * s); g.add(mask);
  const slit = new THREE.Mesh(new THREE.BoxGeometry(0.2 * s, 0.035 * s, 0.05 * s), mat("#1a1010"));
  slit.position.set(0, headY + 0.02 * s, 0.2 * s); g.add(slit);
  let hat = null;
  if (o.hat === "hood") { hat = new THREE.Mesh(new THREE.SphereGeometry(0.27 * s, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.6), mat(robe)); hat.position.y = headY - 0.02 * s; hat.rotation.x = -0.25; }
  if (o.hat === "tall") { hat = new THREE.Mesh(new THREE.ConeGeometry(0.2 * s, 0.75 * s, 8), mat(trim)); hat.position.y = headY + 0.5 * s; }
  if (o.hat === "turban") { hat = new THREE.Mesh(new THREE.SphereGeometry(0.26 * s, 10, 6), mat(trim)); hat.scale.set(1, 0.6, 1); hat.position.y = headY + 0.16 * s; }
  if (o.hat === "round") { hat = new THREE.Mesh(new THREE.CylinderGeometry(0.2 * s, 0.4 * s, 0.14 * s, 12), mat(trim)); hat.position.y = headY + 0.2 * s; }
  if (o.hat === "crown") { hat = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.2 * s, 0.26 * s, 6, 1, true), mat(trim, { side: THREE.DoubleSide })); hat.position.y = headY + 0.24 * s; }
  if (hat) { shadowed(hat); g.add(hat); }
  if (o.prop === "spear" || o.prop === "staff") {
    const len = (o.prop === "spear" ? 2.6 : 1.9) * s;
    const pole = shadowed(new THREE.Mesh(new THREE.CylinderGeometry(0.03 * s, 0.03 * s, len, 6), mat("#4a2e1c")));
    pole.position.set(0.5 * s, len / 2, 0.1 * s); g.add(pole);
    if (o.prop === "spear") { const tip = shadowed(new THREE.Mesh(new THREE.ConeGeometry(0.08 * s, 0.3 * s, 6), mat(trim))); tip.position.set(0.5 * s, len + 0.15 * s, 0.1 * s); g.add(tip); }
  }
  if (o.prop === "book" || o.prop === "scroll") {
    const p = o.prop === "book" ? new THREE.Mesh(new THREE.BoxGeometry(0.3 * s, 0.22 * s, 0.08 * s), mat(trim))
                                : new THREE.Mesh(new THREE.CylinderGeometry(0.05 * s, 0.05 * s, 0.4 * s, 6), mat("#efe2c4"));
    p.position.set(0.25 * s, bodyH * 0.6, 0.35 * s); if (o.prop === "scroll") p.rotation.z = Math.PI / 2;
    shadowed(p); g.add(p);
  }
  g.userData.height = headY + 0.4 * s;
  return g;
}

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
