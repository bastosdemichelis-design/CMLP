import { execSync } from "child_process";

try {

  execSync(
    'git add .',
    { stdio: "inherit" }
  );

  execSync(
    'git commit -m "Auto update stats"',
    { stdio: "inherit" }
  );

  execSync(
    "git push",
    { stdio: "inherit" }
  );

  console.log(
    "✅ GitHub mis à jour"
  );

} catch {

  console.log(
    "ℹ️ Aucun changement à publier"
  );

}