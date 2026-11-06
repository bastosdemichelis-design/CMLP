"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Session = {
  id: number;
  pilote: string;
  transpondeur: string;
  date: string;
  year: number;
  laps: number;
  bestLap: number;
  best3Consecutive: number;
  maxSpeed: number;
};

export default function PiloteSessions({
  sessions,
}: {
  sessions: Session[];
}) {
  const [selectedYear, setSelectedYear] =
    useState("Toutes");

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("date");

  const years = [
    "Toutes",
    ...Array.from(
      new Set(
        sessions.map(
          (s) => s.year
        )
      )
    ).sort(
      (a: any, b: any) =>
        Number(b) - Number(a)
    ),
  ];

  const filteredSessions =
    useMemo(() => {
      let result = [...sessions];

      if (
        selectedYear !==
        "Toutes"
      ) {
        result = result.filter(
          (s) =>
            s.year ===
            Number(selectedYear)
        );
      }

      if (
        search.trim().length > 0
      ) {
        const query =
          search.toLowerCase();

        result = result.filter(
          (s) =>
            s.date
              .toLowerCase()
              .includes(query) ||
            String(
              s.id
            ).includes(query) ||
            String(
              s.bestLap
            ).includes(query) ||
            String(
              s.laps
            ).includes(query)
        );
      }

      switch (sortBy) {
        case "bestLap":
          result.sort(
            (a, b) =>
              a.bestLap -
              b.bestLap
          );
          break;

        case "best3":
          result.sort(
            (a, b) =>
              a.best3Consecutive -
              b.best3Consecutive
          );
          break;

        case "laps":
          result.sort(
            (a, b) =>
              b.laps - a.laps
          );
          break;

        case "speed":
          result.sort(
            (a, b) =>
              b.maxSpeed -
              a.maxSpeed
          );
          break;

        default:
          result.sort(
            (a, b) =>
              new Date(
                b.date
              ).getTime() -
              new Date(
                a.date
              ).getTime()
          );
      }

      return result;
    }, [
      sessions,
      selectedYear,
      search,
      sortBy,
    ]);

  return (
    <>
      <h2
        style={{
          marginTop: "50px",
        }}
      >
        📋 Historique des sessions
      </h2>

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="🔎 Rechercher..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          style={{
            padding: "8px",
            minWidth: "220px",
          }}
        />

        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              e.target.value
            )
          }
        >
          {years.map((year) => (
            <option
              key={year}
              value={year}
            >
              {year}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
        >
          <option value="date">
            Date
          </option>

          <option value="bestLap">
            Best Lap
          </option>

          <option value="best3">
            Best 3
          </option>

          <option value="laps">
            Tours
          </option>

          <option value="speed">
            Vitesse
          </option>
        </select>
      </div>

      <p>
        {
          filteredSessions.length
        }{" "}
        session(s)
        affichée(s)
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Tours</th>
            <th>Best Lap</th>
            <th>Best 3</th>
            <th>Vitesse</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {filteredSessions.map(
            (session) => (
              <tr
                key={session.id}
              >
                <td>
                  {new Date(
                    session.date
                  ).toLocaleDateString(
                    "fr-FR"
                  )}
                </td>

                <td>
                  {session.laps}
                </td>

                <td>
                  {session.bestLap.toFixed(
                    3
                  )}{" "}
                  s
                </td>

                <td>
                  {session.best3Consecutive.toFixed(
                    3
                  )}{" "}
                  s
                </td>

                <td>
                  {session.maxSpeed.toFixed(
                    3
                  )}{" "}
                  km/h
                </td>

                <td>
                  <Link
                    href={`/session/${session.id}`}
                  >
                    🔍 Voir
                  </Link>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>

      {filteredSessions.length ===
        0 && (
        <p>
          Aucune session trouvée.
        </p>
      )}
    </>
  );
}