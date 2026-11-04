import fs from "fs";
import { execSync } from "child_process";

console.log("");
console.log("🏁 Synchronisation CMLP");
console.log("");

try {
  console.log(
    "📥 Synchronisation activités..."
  );

  execSync(
    "npx.cmd tsx app/scripts/sync.ts",
    {
      stdio: "inherit",
    }
  );

  console.log("");
  console.log(
    "📥 Téléchargement sessions..."
  );

  execSync(
    "npx.cmd tsx app/scripts/download-all-sessions.ts",
    {
      stdio: "inherit",
    }
  );

  console.log("");
  console.log(
    "📊 Génération statistiques..."
  );

  execSync(
    "npx.cmd tsx app/scripts/build-stats.ts",
    {
      stdio: "inherit",
    }
  );

  // Écriture de la date de dernière synchronisation
  fs.writeFileSync(
    "./data/last-sync.json",
    JSON.stringify(
      {
        lastSync:
          new Date().toISOString(),
      },
      null,
      2
    )
  );

  console.log("");
  console.log(
    "🕒 Date de synchronisation mise à jour"
  );

  execSync(
    "npx.cmd tsx app/scripts/push-update.ts",
    {
      stdio: "inherit",
    }
  );

  console.log("");
  console.log(
    "✅ Synchronisation terminée"
  );
  console.log("");

} catch (error) {
  console.error("");
  console.error(
    "❌ Erreur pendant la synchronisation"
  );
  console.error(error);
  console.error("");

  process.exit(1);
}