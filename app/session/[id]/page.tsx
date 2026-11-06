import fs from "fs";
import sessions from "../../../data/sessions-summary.json";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } =
    await params;

  const session =
    sessions.find(
      (s: any) =>
        String(s.id) === id
    );

  if (!session) {
    notFound();
  }

  const file =
    `./data/sessions/${id}.csv`;

  let laps: any[] = [];

  if (
    fs.existsSync(file)
  ) {
    const csv =
      fs.readFileSync(
        file,
        "utf8"
      );

    laps = csv
      .split("\n")
      .filter((l) =>
        l.includes("km/h")
      )
      .map(
        (
          line,
          index
        ) => {
          const cols =
            line.split(",");

          return {
            lap:
              index + 1,
            time:
              cols[5] ?? "",
            speed:
              cols[7] ?? "",
          };
        }
      );
  }

  return (
    <main
      style={{
        padding: "30px",
      }}
    >
      <Link
        href={`/pilote/${session.transpondeur}`}
      >
        ← Retour pilote
      </Link>

      <h1>
        🏁 Session
      </h1>

      <p>
        Pilote :
        {" "}
        {session.pilote}
      </p>

      <p>
        Date :
        {" "}
        {new Date(
          session.date
        ).toLocaleString(
          "fr-FR"
        )}
      </p>

      <p>
        Tours :
        {" "}
        {session.laps}
      </p>

      <p>
        Record :
        {" "}
        {session.bestLap.toFixed(
          3
        )} s
      </p>

      <p>
        Best 3 :
        {" "}
        {session.best3Consecutive.toFixed(
          3
        )} s
      </p>

      <p>
        Vitesse max :
        {" "}
        {session.maxSpeed.toFixed(
          3
        )} km/h
      </p>

      <h2>
        📈 Détail tour par tour
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Tour</th>
            <th>Temps</th>
            <th>Vitesse</th>
          </tr>
        </thead>

        <tbody>
          {laps.map(
            (
              lap: any
            ) => (
              <tr
                key={
                  lap.lap
                }
              >
                <td>
                  {
                    lap.lap
                  }
                </td>

                <td>
                  {
                    lap.time
                  }
                </td>

                <td>
                  {
                    lap.speed
                  }
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </main>
  );
}