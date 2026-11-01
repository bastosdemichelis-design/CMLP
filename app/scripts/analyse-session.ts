import fs from "fs";

const file =
  "./data/sessions/8485083802.csv";

const csv =
  fs.readFileSync(
    file,
    "utf8"
  );

const lines =
  csv.split("\n");

let laps = 0;
let bestLap = Number.MAX_VALUE;
let maxSpeed = 0;

for (const line of lines) {

  if (!line.includes("km/h"))
    continue;

  const cols =
    line.split(",");

  const lapTime =
    cols[5];

  const speed =
    cols[7];

  const matchTime =
    lapTime.match(
      /0:00:(\d+\.\d+)/
    );

  const matchSpeed =
    speed.match(
      /(\d+\.\d+)/
    );

  if (matchTime) {

    const sec =
      parseFloat(
        matchTime[1]
      );

    laps++;

    if (sec < bestLap) {
      bestLap = sec;
    }
  }

  if (matchSpeed) {

    const kmh =
      parseFloat(
        matchSpeed[1]
      );

    if (kmh > maxSpeed) {
      maxSpeed = kmh;
    }
  }
}

console.log(
  "Tours :", laps
);

console.log(
  "Meilleur tour :",
  bestLap.toFixed(3)
);

console.log(
  "Vitesse max :",
  maxSpeed.toFixed(3)
);