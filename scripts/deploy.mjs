import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";

const env = { ...process.env };
const localConfig = join(process.cwd(), ".firebase-config");

// Prefer project-local Firebase CLI config when present (avoids ~/.config permission issues).
if (existsSync(localConfig)) {
  env.XDG_CONFIG_HOME = localConfig;
}

const result = spawnSync(
  "firebase",
  ["deploy", "--only", "apphosting", "--project", "kaceresweb", "--force"],
  { stdio: "inherit", env, shell: true },
);

process.exit(result.status ?? 1);
