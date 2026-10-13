// Rigged, animated people for the tower: the KayKit Adventurers (CC0, Kay Lousberg).
// The five models share one skeleton, so the clips live once in anims.glb and drive every clone.
// If loading fails the game falls back to the procedural figures in kit.js.
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

const BASE = new URL("../assets/characters/", import.meta.url).href;
export const MODELS = ["Knight", "Barbarian", "Mage", "Rogue", "Rogue_Hooded"];
let lib = null;

// Resolves once the models are in (or after `timeoutMs`, leaving the procedural fallback).
export function loadCharacters(timeoutMs = 12000) {
  const loader = new GLTFLoader();
  const get = name => loader.loadAsync(BASE + name + ".glb");
  const all = Promise.all([get("anims"), ...MODELS.map(get)]).then(([anims, ...models]) => {
    const clips = {};
    anims.animations.forEach(c => { clips[c.name] = c; });
    const scenes = {};
    models.forEach((g, i) => {
      g.scene.traverse(o => { if (o.isMesh) { o.castShadow = true; o.receiveShadow = true; } });
      scenes[MODELS[i]] = g.scene;
    });
    lib = { clips, scenes };
  }).catch(e => console.warn("characters: using procedural figures", e));
  return Promise.race([all, new Promise(r => setTimeout(r, timeoutMs))]);
}
export const charactersReady = () => !!lib;

// Which model fits a figure's old description (hat / prop), unless one is named outright.
export function pickModel(o) {
  if (o.model) return o.model;
  if (o.prop === "spear") return "Knight";
  if (o.hat === "tall" || o.hat === "crown" || o.prop === "staff" && o.hat !== "hood") return "Mage";
  if (o.hat === "turban") return "Barbarian";
  if (o.hat === "hood") return "Rogue_Hooded";
  return "Rogue";
}

// Model items kept per prop (the Mage's spellbook); everything else in the hand slots (swords, crossbows…) is hidden.
const KEEP_ITEM = { book: ["Spellbook"] };
const HEIGHT = 2.15; // world units for scale 1, about the old figures' height

export function makeCharacter(o) {
  const name = pickModel(o), s = o.scale || 1;
  const model = SkeletonUtils.clone(lib.scenes[name]);
  const bones = {};
  model.traverse(ob => {
    if (ob.isBone || /^handslot|^head$/.test(ob.name)) bones[ob.name] = ob;
    if (ob.isSkinnedMesh) ob.frustumCulled = false; // bounds follow the bind pose, not the animation
  });
  const keep = KEEP_ITEM[o.prop] || [];
  let ownProp = false;
  ["handslotl", "handslotr"].forEach(h => bones[h]?.children.forEach(c => {
    c.visible = keep.includes(c.name);
    if (c.visible) ownProp = true;
  }));
  const cloth = o.cloth || o.robe;
  if (cloth) { const m = tinted(name, cloth); if (m) model.traverse(ob => { if (ob.isMesh && ob.material.map) ob.material = m; }); }
  if (o.hideHat) model.traverse(ob => { if (/_Helmet$|_Hat$/.test(ob.name)) ob.visible = false; });

  // normalise height on the body alone (bind pose), not on hats or the long weapons in the hands
  const box = new THREE.Box3(), part = new THREE.Box3();
  lib.scenes[name].updateMatrixWorld(true);
  lib.scenes[name].traverse(ob => { if (ob.isSkinnedMesh) { ob.geometry.computeBoundingBox(); box.union(part.copy(ob.geometry.boundingBox).applyMatrix4(ob.matrixWorld)); } });
  const k = (HEIGHT * s) / (box.max.y - box.min.y);
  model.scale.setScalar(k);

  const mixer = new THREE.AnimationMixer(model);
  const actions = {};
  for (const [n, c] of Object.entries(lib.clips)) actions[n] = mixer.clipAction(c);
  const base = o.sit ? (o.sitOn === "floor" ? "Sit_Floor_Idle" : "Sit_Chair_Idle") : "Idle";
  actions[base].play();
  mixer.update(Math.random() * 3); // so a crowd does not breathe in step
  // floors place sitting figures on the seat itself, so lower the clip until the hips rest on it
  if (o.sit && bones.hips) {
    model.updateMatrixWorld(true);
    model.position.y = -(bones.hips.getWorldPosition(new THREE.Vector3()).y - 0.08 * s);
  }

  return { name, model, mixer, actions, bones, base, ownProp, scale: k, height: HEIGHT * s };
}

// The five models share one look per class; recolour the clothes in the atlas to the figure's robe
// so a crowd of Rogues does not all wear green. Skin, hair and leather (warm, low hues) stay as they are.
const tintCache = new Map();
function tinted(name, robe) {
  const key = name + robe;
  if (tintCache.has(key)) return tintCache.get(key);
  let src = null; lib.scenes[name].traverse(ob => { if (!src && ob.isMesh && ob.material.map) src = ob.material; });
  const img = src?.map?.image; if (!img) return null;
  const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
  const ctx = c.getContext("2d"); ctx.drawImage(img, 0, 0);
  const d = ctx.getImageData(0, 0, c.width, c.height), px = d.data;
  const want = {}; new THREE.Color(robe).getHSL(want);
  const col = new THREE.Color(), hsl = {};
  for (let i = 0; i < px.length; i += 4) {
    col.setRGB(px[i] / 255, px[i + 1] / 255, px[i + 2] / 255); col.getHSL(hsl);
    const warm = hsl.h > 0.02 && hsl.h < 0.14; // skin, hair, leather, gold
    if (warm || hsl.s < 0.18) continue;
    // keep the atlas' shading (lightness differences) but move it towards the robe's colour
    col.setHSL(want.h, want.s * Math.min(1, hsl.s * 1.6), THREE.MathUtils.clamp(Math.max(0.36, want.l) + (hsl.l - 0.4) * 0.7, 0.1, 0.94));
    px[i] = col.r * 255; px[i + 1] = col.g * 255; px[i + 2] = col.b * 255;
  }
  ctx.putImageData(d, 0, 0);
  const tex = new THREE.CanvasTexture(c);
  for (const k of ["flipY", "colorSpace", "wrapS", "wrapT", "magFilter", "minFilter"]) tex[k] = src.map[k];
  const m = src.clone(); m.map = tex; tintCache.set(key, m); return m;
}

// Lets kit.js attach its own props (spear, scroll…) to a hand. GLTFLoader drops the "." from "handslot.r".
export function hand(ch, side = "r") { return ch.bones["handslot" + side]; }
