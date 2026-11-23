// A Day of One-Line Pitches — u-ronigrv-a-day-of-one-line-pitches-12cd9bb3
//
// One sentence, at most 240 characters, that would convince a friend who has
// never coded to let an AI agent build their first app idea on make.fun.
// The sentence is the whole entry: no code, no explanation.
//
// The program writes the pitch to $MAKEFUN_OUTPUT_DIR/entry.txt
// (default /output/entry.txt) and enforces its own 240-character gate:
// it refuses to write anything that is empty, whitespace-only, or longer
// than 240 characters, so a bad pitch can never reach the judge.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PITCH =
  "Just tell make.fun the app idea you have been carrying around for years, in plain words, and an AI agent will build the real thing for you — free, no coding, just your idea finally alive in your hands.";

const MAX_CHARS = 240;

function main(): void {
  const text = PITCH.trim();

  // Own gate: the entry must be 1..240 characters, not only whitespace.
  if (text.length === 0) {
    throw new Error("pitch is empty");
  }
  if (text.length > MAX_CHARS) {
    throw new Error(
      `pitch is ${text.length} characters, over the ${MAX_CHARS} limit`,
    );
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), text, "utf8");
  // 201 characters (203 bytes UTF-8) — well inside the 240-character gate.
  console.error(`wrote entry.txt: ${text.length} characters`);
}

main();
