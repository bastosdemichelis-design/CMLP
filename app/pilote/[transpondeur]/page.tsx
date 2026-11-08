import stats from "../../../data/stats.json";
import sessionsSummary from "../../../data/sessions-summary.json";

import Link from "next/link";
import { notFound } from "next/navigation";

import PiloteSessions from "../../components/PiloteSessions";

export default async function Page({
  params,
}: {
  params: Promise<{
    transpondeur: string;
  }>;
}) {
  const { transpondeur } =
    await params;

  const piloteStats =
    stats.filter(
      (p: any) =>
        String(
          p.transpondeur
        ) === transpondeur
    );

  if (
    piloteStats.length === 0
  ) {
    notFound();
  }

  const piloteSessions =
    sessionsSummary
      .filter(
        (session: any) =>
          String(
            session.transpondeur
          ) === transpondeur
      )
      .sort(
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
      );

  const latest =
    [...piloteStats].sort(
      (a: any, b: any) =>
        b.year - a.year
    )[0];

  const totalSessions =
    piloteStats.reduce(
      (
        sum: number,
        p: any
      ) =>
        sum +
        p.sessions,
      0
    );

  const totalLaps =
    piloteStats.reduce(
      (
        sum: number,
        p: any
      ) =>
        sum + p.laps,
      0
    );

    const totalDistanceKm =
  (
    totalLaps * 295
  ) / 1000;

  const bestLap =
    Math.min(
      ...piloteStats.map(
        (p: any) =>
          p.bestLap
      )
    );

  const best3Consecutive =
    Math.min(
      ...piloteStats.map(
        (p: any) =>
          p.best3Consecutive ??
          Number.MAX_VALUE
      )
    );

  const maxSpeed =
    Math.max(
      ...piloteStats.map(
        (p: any) =>
          p.maxSpeed
      )
    );

  const classementGeneral =
    [...stats].sort(
      (a: any, b: any) =>
        a.bestLap -
        b.bestLap
    );

  const rangGeneral =
    classementGeneral.findIndex(
      (p: any) =>
        p.transpondeur ===
        latest.transpondeur
    ) + 1;

  function getMedal(
    rank: number
  ) {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return `#${rank}`;
    }
  }

  return (
    <main>
      <Link
        href="/classement"
        style={{
          textDecoration:
            "none",
        }}
      >
        ← Retour au classement
      </Link>

      <h1
        style={{
          marginTop: "20px",
        }}
      >
        👤 {latest.pilote}
      </h1>

      <p>
        Transpondeur :
        {" "}
        {transpondeur}
      </p>

      <div
        className="card"
        style={{
          marginTop: "20px",
          marginBottom:
            "20px",
          textAlign: "center",
        }}
      >
        <h3>
          🏅 Rang général
        </h3>

        <h2>
          #{rangGeneral}
        </h2>
      </div>

      <div
        className="stats-grid"
        style={{
          marginTop: "30px",
          marginBottom:
            "50px",
        }}
      >
        <div className="card">
          <h3>
            📅 Sessions
          </h3>

          <h2>
            {totalSessions}
          </h2>
        </div>

        <div className="card">
  <h3>
    🛣️ Distance
  </h3>

  <h2>
    {totalDistanceKm.toFixed(1)} km
  </h2>
</div>

        <div className="card">
          <h3>
            🔄 Tours
          </h3>

          <h2>
            {totalLaps.toLocaleString()}
          </h2>
        </div>

        <div className="card">
  <h3>
    🛣️ Distance
  </h3>

  <h2>
    {totalDistanceKm.toFixed(1)} km
  </h2>
</div>

        <div className="card">
          <h3>
            🏆 Record personnel
          </h3>

          <h2>
            {bestLap.toFixed(
              3
            )}{" "}
            s
          </h2>
        </div>

        <div className="card">
          <h3>
            🎯 Meilleure moyenne
            3 tours
          </h3>

          <h2>
            {best3Consecutive.toFixed(
              3
            )}{" "}
            s
          </h2>
        </div>

        <div className="card">
          <h3>
            🚀 Vitesse max
          </h3>

          <h2>
            {maxSpeed.toFixed(
              3
            )}{" "}
            km/h
          </h2>
        </div>
      </div>

      <h2>
        📅 Historique annuel
      </h2>

      <div
        style={{
          overflowX:
            "auto",
          marginTop:
            "20px",
        }}
      >
        <table>
          <thead>
            <tr>
              <th>Année</th>
              <th>Rang</th>
              <th>Sessions</th>
              <th>Tours</th>
              <th>Distance</th>
              <th>Record</th>
              <th>3 tours</th>
              <th>Vitesse</th>
            </tr>
          </thead>

          <tbody>
            {piloteStats
              .sort(
                (
                  a: any,
                  b: any
                ) =>
                  b.year -
                  a.year
              )
              .map(
                (
                  yearStat: any
                ) => {
                  const classementAnnee =
                    stats
                      .filter(
                        (
                          p: any
                        ) =>
                          p.year ===
                          yearStat.year
                      )
                      .sort(
                        (
                          a: any,
                          b: any
                        ) =>
                          a.bestLap -
                          b.bestLap
                      );

                  const rangAnnee =
                    classementAnnee.findIndex(
                      (
                        p: any
                      ) =>
                        p.transpondeur ===
                        yearStat.transpondeur
                    ) + 1;

                  return (
                    <tr
                      key={
                        yearStat.year
                      }
                    >
                      <td>
                        {
                          yearStat.year
                        }
                      </td>

                      <td>
                        {getMedal(
                          rangAnnee
                        )}
                      </td>

                      <td>
                        {
                          yearStat.sessions
                        }
                      </td>

<td>
  {yearStat.laps.toLocaleString()}
</td>

<td>
  {(
    yearStat.laps *
    295 /
    1000
  ).toFixed(1)} km
</td>

<td>
  {yearStat.bestLap.toFixed(
    3
  )} s
</td>

                      <td>
                        {yearStat.best3Consecutive?.toFixed(
                          3
                        )}{" "}
                        s
                      </td>

                      <td>
                        {yearStat.maxSpeed.toFixed(
                          3
                        )}{" "}
                        km/h
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>

      <div
        className="card"
        style={{
          marginTop: "30px",
        }}
      >
        <h3>
          📊 Sessions enregistrées
        </h3>

        <h2>
          {piloteSessions.length}
        </h2>

        <p>
          Cliquez sur une
          session pour afficher
          le détail tour par
          tour.
        </p>
      </div>

      <PiloteSessions
        sessions={
          piloteSessions
        }
      />
    </main>
  );
}