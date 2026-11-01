import stats from "../../../data/stats.json";
import Link from "next/link";
import { notFound } from "next/navigation";

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

  const latest =
    [...piloteStats].sort(
      (a: any, b: any) =>
        b.year - a.year
    )[0];

  const totalSessions =
    piloteStats.reduce(
      (sum: number, p: any) =>
        sum + p.sessions,
      0
    );

  const totalLaps =
    piloteStats.reduce(
      (sum: number, p: any) =>
        sum + p.laps,
      0
    );

  const bestLap =
    Math.min(
      ...piloteStats.map(
        (p: any) => p.bestLap
      )
    );

  const maxSpeed =
    Math.max(
      ...piloteStats.map(
        (p: any) => p.maxSpeed
      )
    );

  const classementGeneral =
    [...stats].sort(
      (a: any, b: any) =>
        a.bestLap - b.bestLap
    );

  const rangGeneral =
    classementGeneral.findIndex(
      (p: any) =>
        p.transpondeur ===
          latest.transpondeur &&
        p.year === latest.year
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
    <main
      style={{
        padding: "30px",
      }}
    >
      <Link
        href="/classement"
        style={{
          textDecoration: "none",
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
        Transpondeur :{" "}
        {transpondeur}
      </p>

      <p
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#c28b00",
        }}
      >
        🏅 Rang général : #{rangGeneral}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
          marginBottom: "50px",
        }}
      >
        <div>
          <h3>
            📅 Sessions
          </h3>

          <h2>
            {totalSessions}
          </h2>
        </div>

        <div>
          <h3>
            🔄 Tours
          </h3>

          <h2>
            {totalLaps.toLocaleString()}
          </h2>
        </div>

        <div>
          <h3>
            🏆 Record personnel
          </h3>

          <h2>
            {bestLap.toFixed(3)} s
          </h2>
        </div>

        <div>
          <h3>
            🚀 Vitesse max
          </h3>

          <h2>
            {maxSpeed.toFixed(3)} km/h
          </h2>
        </div>
      </div>

<h2
  style={{
    marginTop: "50px",
    marginBottom: "20px",
  }}
>
  📈 Évolution du meilleur tour
</h2>

<div
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "40px",
  }}
>

  {[...piloteStats]
    .sort(
      (a: any, b: any) =>
        a.year - b.year
    )
    .map((yearStat: any) => {

      const maxTime =
        Math.max(
          ...piloteStats.map(
            (p: any) =>
              p.bestLap
          )
        );

      const minTime =
        Math.min(
          ...piloteStats.map(
            (p: any) =>
              p.bestLap
          )
        );

      const percent =
        (
          (
            maxTime -
            yearStat.bestLap
          ) /
          (
            maxTime -
            minTime || 1
          )
        ) * 100;

      return (
        <div
          key={yearStat.year}
        >
          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              marginBottom: "5px",
            }}
          >
            <strong>
              {yearStat.year}
            </strong>

            <span>
              {yearStat.bestLap.toFixed(
                3
              )}{" "}
              s
            </span>
          </div>

          <div
            style={{
              height: "20px",
              background:
                "#e5e7eb",
              borderRadius:
                "10px",
              overflow:
                "hidden",
            }}
          >
            <div
              style={{
                width:
                  `${percent}%`,
                height:
                  "100%",
                background:
                  "#2563eb",
              }}
            />
          </div>
        </div>
      );
    })}

</div>

      <h2>
        📅 Historique annuel
      </h2>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          tableLayout: "fixed",
        }}
      >
        <thead>
          <tr
            style={{
              borderBottom:
                "2px solid #ddd",
            }}
          >
            <th
              style={{
                textAlign: "left",
                padding: "12px",
                width: "12%",
              }}
            >
              Année
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
                width: "12%",
              }}
            >
              Rang
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
                width: "16%",
              }}
            >
              Sessions
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
                width: "18%",
              }}
            >
              Tours
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
                width: "22%",
              }}
            >
              Meilleur tour
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
                width: "20%",
              }}
            >
              Vitesse max
            </th>
          </tr>
        </thead>

        <tbody>
          {piloteStats
            .sort(
              (a: any, b: any) =>
                b.year - a.year
            )
            .map(
              (
                yearStat: any
              ) => {

                const classementAnnee =
                  stats
                    .filter(
                      (p: any) =>
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
                    (p: any) =>
                      p.transpondeur ===
                      yearStat.transpondeur
                  ) + 1;

                return (
                  <tr
                    key={yearStat.year}
                    style={{
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >
                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {yearStat.year}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                        fontWeight:
                          "bold",
                        fontSize:
                          "18px",
                      }}
                    >
                      {getMedal(
                        rangAnnee
                      )}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {yearStat.sessions}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {yearStat.laps.toLocaleString()}
                    </td>

                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
                      {yearStat.bestLap.toFixed(
                        3
                      )}{" "}
                      s
                    </td>

                    <td
                      style={{
                        padding: "12px",
                      }}
                    >
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
    </main>
  );
}