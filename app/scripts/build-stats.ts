import fs from "fs";

const activities = JSON.parse(
  fs.readFileSync(
    "./data/activities.json",
    "utf8"
  )
);

const drivers: any = {};
const sessionsSummary: any[] = [];

for (const activity of activities) {

  const file =
    `./data/sessions/${activity.id}.csv`;

  if (!fs.existsSync(file))
    continue;

  const csv =
    fs.readFileSync(
      file,
      "utf8"
    );

  const lines =
    csv.split("\n");

  let laps = 0;
  let bestLap = Number.MAX_VALUE;
  let best3Consecutive =
    Number.MAX_VALUE;
  let maxSpeed = 0;
  let lapSum = 0;

  const lapTimes: number[] = [];

  for (const line of lines) {

    if (!line.includes("km/h"))
      continue;

    const cols =
      line.split(",");

    if (cols.length < 8)
      continue;

    const lapTime =
      cols[5];

    const speed =
      cols[7];

    const timeMatch =
      lapTime.match(
        /0:00:(\d+\.\d+)/
      );

    const speedMatch =
      speed.match(
        /(\d+\.\d+)/
      );

    if (timeMatch) {

      laps++;

      const sec =
        parseFloat(
          timeMatch[1]
        );

      lapTimes.push(sec);

      lapSum += sec;

      if (sec < bestLap) {
        bestLap = sec;
      }
    }

    if (speedMatch) {

      const kmh =
        parseFloat(
          speedMatch[1]
        );

      if (kmh > maxSpeed) {
        maxSpeed = kmh;
      }
    }
  }

  // Calcul du meilleur 3 tours consécutifs

  if (
    lapTimes.length >= 3
  ) {

    for (
      let i = 0;
      i <= lapTimes.length - 3;
      i++
    ) {

      const avg =
        (
          lapTimes[i] +
          lapTimes[i + 1] +
          lapTimes[i + 2]
        ) / 3;

      if (
        avg <
        best3Consecutive
      ) {
        best3Consecutive =
          avg;
      }
    }
  }

  const pilote =
    activity.chipLabel ||
    "Inconnu";

  const year =
    new Date(
      activity.startTime
    ).getFullYear();

  const key =
    `${pilote}-${year}`;

  if (!drivers[key]) {

    drivers[key] = {

      pilote,

      transpondeur:
        activity.chipCode,

      year,

      sessions: 0,

      laps: 0,

      bestLap:
        Number.MAX_VALUE,

      best3Consecutive:
        Number.MAX_VALUE,

      maxSpeed: 0,

      averageLap: 0,

      totalRuntimeMinutes: 0,
    };
  }

  drivers[key].sessions++;

  drivers[key].laps += laps;

  drivers[key].totalRuntimeMinutes +=
    lapSum / 60;

  if (laps > 0) {

    const currentAverage =
      lapSum / laps;

    if (
      drivers[key]
        .averageLap === 0
    ) {

      drivers[key]
        .averageLap =
        currentAverage;

    } else {

      drivers[key]
        .averageLap =
        (
          drivers[key]
            .averageLap +
          currentAverage
        ) / 2;
    }
  }

  if (
    bestLap <
    drivers[key].bestLap
  ) {
    drivers[key].bestLap =
      bestLap;
  }

  if (
    best3Consecutive <
    drivers[key]
      .best3Consecutive
  ) {
    drivers[key]
      .best3Consecutive =
      best3Consecutive;
  }

  if (
    maxSpeed >
    drivers[key].maxSpeed
  ) {
    drivers[key].maxSpeed =
      maxSpeed;
  }

  // sessions-summary.json

  sessionsSummary.push({
    id: activity.id,

    pilote,

    transpondeur:
      activity.chipCode,

    date:
      activity.startTime,

    year,

    laps,

    bestLap,

    best3Consecutive,

    maxSpeed,
  });
}

const stats =
  Object.values(drivers)
    .sort(
      (a: any, b: any) =>
        a.bestLap -
        b.bestLap
    );

fs.writeFileSync(
  "./data/stats.json",
  JSON.stringify(
    stats,
    null,
    2
  )
);

fs.writeFileSync(
  "./data/sessions-summary.json",
  JSON.stringify(
    sessionsSummary.sort(
      (
        a: any,
        b: any
      ) =>
        new Date(
          b.date
        ).getTime() -
        new Date(
          a.date
        ).getTime()
    ),
    null,
    2
  )
);

console.log(
  `${stats.length} statistiques générées`
);

console.log(
  `${sessionsSummary.length} sessions indexées`
);