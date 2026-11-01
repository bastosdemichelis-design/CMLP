import fs from "fs";

const activities =
  JSON.parse(
    fs.readFileSync(
      "./data/activities.json",
      "utf8"
    )
  );

const headers = {
  Accept: "text/csv",
  Origin: "https://speedhive.mylaps.com",
  Referer: "https://speedhive.mylaps.com/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

async function downloadAll() {

  fs.mkdirSync(
    "./data/sessions",
    { recursive: true }
  );

  for (
    let i = 0;
    i < activities.length;
    i++
  ) {

    const activity =
      activities[i];

    const file =
      `./data/sessions/${activity.id}.csv`;

    if (
      fs.existsSync(file)
    ) {
      continue;
    }

    try {

      const response =
        await fetch(
          `https://practice-api.speedhive.com/api/v1/training/activities/${activity.id}/sessions?format=csv`,
          {
            headers,
          }
        );

      const csv =
        await response.text();

      fs.writeFileSync(
        file,
        csv
      );

      console.log(
        `${i + 1}/${activities.length} - ${activity.id}`
      );

    } catch (err) {

      console.log(
        `Erreur ${activity.id}`
      );

    }
  }

  console.log(
    "Terminé"
  );
}

downloadAll();