import { execSync } from "child_process";

console.log("");
console.log("🏁 Début synchronisation");
console.log("");

try {

  console.log(
    "📥 Synchronisation activités..."
  );

  execSync(
    "npx tsx app/scripts/sync.ts",
    {
      stdio: "inherit",
    }
  );

  console.log("");
  console.log(
    "📥 Téléchargement sessions..."
  );

  execSync(
    "npx tsx app/scripts/download-all-sessions.ts",
    {
      stdio: "inherit",
    }
  );

  console.log("");
  console.log(
    "📊 Génération statistiques..."
  );

  execSync(
    "npx tsx app/scripts/build-stats.ts",
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

  console.error(
    "❌ Erreur pendant la synchronisation"
  );

  process.exit(1);
}