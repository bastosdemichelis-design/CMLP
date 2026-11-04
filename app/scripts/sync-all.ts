import { execSync } from "child_process";

console.log("🏁 Synchronisation CMLP");

try {

  execSync(
    "npx.cmd tsx app/scripts/sync.ts",
    { stdio: "inherit" }
  );

  execSync(
    "npx.cmd tsx app/scripts/download-all-sessions.ts",
    { stdio: "inherit" }
  );

  execSync(
    "npx.cmd tsx app/scripts/build-stats.ts",
    { stdio: "inherit" }
  );

  execSync(
    "npx.cmd tsx app/scripts/push-update.ts",
    { stdio: "inherit" }
  );

  console.log(
    "✅ Synchronisation terminée"
  );

} catch {

  console.error(
    "❌ Erreur de synchronisation"
  );

}