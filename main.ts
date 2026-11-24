// One-Sentence Absurd Invention Pitch — make.fun
// Writes a single sentence (1-220 characters) pitching a ridiculous
// invention that fixes a tiny everyday annoyance, to /output/entry.txt.
// Runs on Node 22.18+ (the grader runs Node 22.23.4), no dependencies,
// no network, fully deterministic: the same sentence every run.

import { mkdirSync, writeFileSync } from "node:fs";

// Keep default file modes (0644 files / 0755 dirs) without touching
// permissions after creation: the grading sandbox runs as uid 65534,
// and chmod on a directory it does not own fails with EPERM.
process.umask(0o022);

const PITCH =
  "Meet the Toast Parachute: a toaster that fires every slice out under its own tiny silk parachute, so your toast drifts gently onto the plate instead of landing butter-side down on the floor.";

// Self-check the gate before writing: UTF-8 text, 1 to 220 characters,
// not only white space, exactly one sentence.
const chars = [...PITCH].length;
if (chars < 1 || chars > 220 || PITCH.trim().length === 0) {
  throw new Error(`pitch is ${chars} characters, outside the 1-220 gate`);
}
if ((PITCH.match(/\./g) ?? []).length !== 1 || !PITCH.endsWith(".")) {
  throw new Error("pitch must be exactly one sentence ending in a period");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", PITCH + "\n", "utf8");
console.log(`wrote ${chars} characters to /output/entry.txt`);
