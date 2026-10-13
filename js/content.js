// Story, words and tasks for the tower's floors, bottom to top. Each floor has two files with the same name:
// js/content/<scene>.js (story, words, tasks) and js/floors/<scene>.js (its 3D scene); spot ids must match.
// Task types: fetch, line, choice, build, free, talk (several turns), listen (questions after a speech).
// The 2D version (2d/index.html) keeps its own copy of the first five floors.
import gate from "./content/gate.js";
import market from "./content/market.js";
import inn from "./content/inn.js";
import library from "./content/library.js";
import workshop from "./content/workshop.js";
import observatory from "./content/observatory.js";
import garden from "./content/garden.js";
import summit from "./content/summit.js";
export const SCENES = ["gate", "market", "inn", "library", "workshop", "observatory", "garden", "summit"];
export const FLOORS = [gate, market, inn, library, workshop, observatory, garden, summit];
