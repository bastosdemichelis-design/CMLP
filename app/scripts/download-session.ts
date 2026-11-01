import fs from "fs";

const ACTIVITY_ID = "8485083802";

const headers = {
  Accept: "text/csv",
  Origin: "https://speedhive.mylaps.com",
  Referer: "https://speedhive.mylaps.com/",
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
};

async function downloadSession() {

  const response = await fetch(
    `https://practice-api.speedhive.com/api/v1/training/activities/${ACTIVITY_ID}/sessions?format=csv`,
    { headers }
  );

  const csv = await response.text();

  fs.mkdirSync(
    "./data/sessions",
    { recursive: true }
  );

  fs.writeFileSync(
    `./data/sessions/${ACTIVITY_ID}.csv`,
    csv
  );

  console.log(
    `CSV téléchargé : ${ACTIVITY_ID}`
  );
}

downloadSession();