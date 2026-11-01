import fs from "fs";

const headers = {
  Accept: "application/json",
  Origin: "https://speedhive.mylaps.com",
  Referer: "https://speedhive.mylaps.com/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

async function syncActivities() {

  const start = Date.now();

  const firstResponse = await fetch(
    "https://practice-api.speedhive.com/api/v1/locations/4389/activities?count=25&offset=0",
    {
      headers,
    }
  );

  const firstData =
    await firstResponse.json();

  const total =
    firstData.activityCount;

  console.log(
    `Total activités : ${total}`
  );

  const allActivities = [];

  for (
    let offset = 0;
    offset < total;
    offset += 25
  ) {

    console.log(
      `Téléchargement offset ${offset}`
    );

    const response = await fetch(
      `https://practice-api.speedhive.com/api/v1/locations/4389/activities?count=25&offset=${offset}`,
      {
        headers,
      }
    );

    const data =
      await response.json();

    allActivities.push(
      ...data.activities
    );
  }

fs.mkdirSync("./data", {
  recursive: true,
});

fs.writeFileSync(
  "./data/activities.json",
    JSON.stringify(
      allActivities,
      null,
      2
    )
  );

  console.log(
    `${allActivities.length} activités sauvegardées`
  );

  console.log(
    `Durée : ${
      (Date.now() - start) / 1000
    } secondes`
  );
}

syncActivities();