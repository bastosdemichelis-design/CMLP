import fs from "fs";

const activities = JSON.parse(
  fs.readFileSync(
    "./data/activities.json",
    "utf8"
  )
);

const headers = {
  Accept: "text/csv",
  Origin: "https://speedhive.mylaps.com",
  Referer:
    "https://speedhive.mylaps.com/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

async function downloadAll() {
  fs.mkdirSync(
    "./data/sessions",
    { recursive: true }
  );

  let downloaded = 0;
  let skipped = 0;
  let errors = 0;

  for (
    let i = 0;
    i < activities.length;
    i++
  ) {
    const activity =
      activities[i];

    const file =
      `./data/sessions/${activity.id}.csv`;

    // Décommente pour tester uniquement Bastos#2
    
if (
  fs.existsSync(file)
) {
  const content =
    fs.readFileSync(
      file,
      "utf8"
    );

  const validCsv =
    content.includes(
      "Transponder"
    );

  if (validCsv) {
    skipped++;
    continue;
  }

  console.log(
    `🔄 CSV invalide détecté : ${activity.id}`
  );
}
    
if (
  fs.existsSync(file)
) {

  const content =
    fs.readFileSync(
      file,
      "utf8"
    );

  const validCsv =
    content.includes(
      "Transponder"
    );

  if (validCsv) {
    skipped++;
    continue;
  }

  console.log(
    `🔄 CSV invalide détecté : ${activity.id}`
  );

  fs.unlinkSync(file);

  console.log(
    `🗑 Ancien fichier supprimé`
  );
}
  

    try {
      const url =
        `https://practice-api.speedhive.com/api/v1/training/activities/${activity.id}/sessions?format=csv`;

      const response =
        await fetch(url, {
          headers,
        });

      console.log(
        `${activity.id} | ${activity.chipLabel} | HTTP ${response.status}`
      );

      if (
        !response.ok
      ) {
        errors++;

        console.log(
          `❌ HTTP ${response.status} pour ${activity.id}`
        );

        continue;
      }

      const csv =
        await response.text();

      if (
        !csv.includes(
          "Transponder"
        )
      ) {
        errors++;

        console.log(
          `❌ CSV invalide pour ${activity.id}`
        );

        console.log(
          csv.substring(
            0,
            200
          )
        );

        continue;
      }

      fs.writeFileSync(
        file,
        csv
      );

      downloaded++;

      console.log(
        `✅ ${i + 1}/${activities.length} - ${activity.id}`
      );
    } catch (err) {
      errors++;

      console.log(
        `❌ Erreur ${activity.id}`
      );

      console.error(
        err
      );
    }
  }

  console.log("");
  console.log(
    "==================="
  );

  console.log(
    `✅ Téléchargés : ${downloaded}`
  );

  console.log(
    `⏭ Ignorés : ${skipped}`
  );

  console.log(
    `❌ Erreurs : ${errors}`
  );

  console.log(
    "==================="
  );
}

downloadAll();