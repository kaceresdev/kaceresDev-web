import { cpSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

/**
 * Firebase App Hosting's Next adapter builds with standalone mode.
 * Next file tracing often only copies a subset of `public/` (e.g. some PNGs)
 * into `.next/standalone/public`, then the adapter skips replacing that folder.
 * Force-copy the full public tree so webp/pdf assets are available at runtime.
 */
const src = "public";
const dest = join(".next", "standalone", "public");

if (!existsSync(src)) {
  console.warn("[ensure-standalone-public] No public/ directory found; skipping.");
  process.exit(0);
}

if (!existsSync(join(".next", "standalone"))) {
  console.warn("[ensure-standalone-public] No .next/standalone yet; skipping.");
  process.exit(0);
}

mkdirSync(dest, { recursive: true });
cpSync(src, dest, { recursive: true });
console.log("[ensure-standalone-public] Copied public/ → .next/standalone/public");
