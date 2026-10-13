// Shrinks the KayKit Adventurers (CC0) characters for the web:
//   node tools/build-characters.mjs <dir with Knight.glb, Mage.glb, ...> <out dir>
// Each character keeps its meshes with a 256px atlas and no animations;
// anims.glb carries the few clips the game plays (all five share one rig).
import { NodeIO } from "@gltf-transform/core";
import { ALL_EXTENSIONS } from "@gltf-transform/extensions";
import { prune, dedup, textureCompress, quantize } from "@gltf-transform/functions";
import sharp from "sharp";
import path from "node:path";

// Animation.dispose() leaves its samplers and keyframe accessors alive; drop them,
// but keep accessors (keyframe times) that a clip we keep still shares
const orphan = x => x.listParents().every(p => p.propertyType === "Root");
const dropAnim = a => {
  const acc = new Set(a.listSamplers().flatMap(s => [s.getInput(), s.getOutput()]));
  a.listChannels().forEach(c => c.dispose()); a.listSamplers().forEach(s => s.dispose()); a.dispose();
  acc.forEach(x => x && orphan(x) && x.dispose());
};

const [src, out] = process.argv.slice(2);
const CHARS = ["Knight", "Barbarian", "Mage", "Rogue", "Rogue_Hooded"];
const KEEP = ["Idle", "Walking_A", "Sit_Chair_Idle", "Sit_Floor_Idle", "Interact", "Cheer", "Use_Item", "Spellcast_Raise"];
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);

for (const c of CHARS) {
  const doc = await io.read(path.join(src, c + ".glb"));
  doc.getRoot().listAnimations().forEach(dropAnim);
  await doc.transform(textureCompress({ encoder: sharp, targetFormat: "png", resize: [256, 256] }), prune(), dedup());
  await io.write(path.join(out, c + ".glb"), doc);
}

const anim = await io.read(path.join(src, "Knight.glb"));
const root = anim.getRoot();
for (const a of root.listAnimations()) if (!KEEP.includes(a.getName())) dropAnim(a);
for (const m of root.listMeshes()) m.dispose();
for (const t of root.listTextures()) t.dispose();
await anim.transform(prune({ keepLeaves: true }), dedup());
await io.write(path.join(out, "anims.glb"), anim);
