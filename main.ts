import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The best meal I ever had — one sentence, 185 characters.
const ENTRY =
  "After closing my mother's stall, I ate lontong kupang still steaming on a low stool, its salty clam broth warming my throat, petis on my fingers, and nothing since has tasted like home.";

// Keep the entry exactly as written: one sentence, no trailing newline,
// no extra whitespace — the sealed scorer counts every character.
const entry = ENTRY.trim();
if (entry.length < 1 || entry.length > 200) {
  throw new Error(`entry must be 1-200 characters, got ${entry.length}`);
}
if ((entry.match(/\./g) ?? []).length !== 1 || !entry.endsWith(".")) {
  throw new Error("entry must be exactly one sentence");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");
writeFileSync(outPath, entry, "utf8");

// Verify the bytes on disk are exactly the entry we meant to write.
const written = readFileSync(outPath, "utf8");
if (written !== entry) {
  throw new Error("entry.txt does not match the entry");
}
