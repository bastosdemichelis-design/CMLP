"use client";

import { useState } from "react";
import Link from "next/link";
import stats from "../../data/stats.json";

export default function HallOfFame() {
  const years = [
    ...new Set(
      stats.map(
        (p: any) => p.year
      )
    ),
  ].sort(
    (a: any, b: any) => b - a
  );

  const [selectedYear, setSelectedYear] =
    useState("Toutes");

  const filteredStats =
    selectedYear === "Toutes"
      ? stats
      : stats.filter(
          (p: any) =>
            p.year ===
            Number(selectedYear)
        );

  const podiumRecord =
    [...filteredStats]
      .sort(
        (a: any, b: any) =>
          a.bestLap - b.bestLap
      )
      .slice(0, 3);

  const podiumTours =
    [...filteredStats]
      .sort(
        (a: any, b: any) =>
          b.laps - a.laps
      )
      .slice(0, 3);

  const podiumVitesse =
    [...filteredStats]
      .sort(
        (a: any, b: any) =>
          b.maxSpeed - a.maxSpeed
      )
      .slice(0, 3);

  const getMedal = (
    rank: number
  ) => {
    switch (rank) {
      case 0:
        return "🥇";
      case 1:
        return "🥈";
      case 2:
        return "🥉";
      default:
        return "";
    }
  };

  const podiumCard = (
    title: string,
    data: any[],
    valueFormatter: (
      value: any
    ) => string,
    field: string
  ) => (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "20px",
        background: "#fff",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      {data.map(
        (
          pilote: any,
          index
        ) => (
          <div
            key={
              pilote.transpondeur +
              index
            }
            style={{
              borderBottom:
                index < 2
                  ? "1px solid #eee"
                  : "none",
              paddingBottom: "15px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                fontSize: "24px",
              }}
            >
              {getMedal(index)}
            </div>

            <Link
              href={`/pilote/${pilote.transpondeur}`}
              style={{
                textDecoration:
                  "none",
                fontWeight:
                  "bold",
                fontSize:
                  "18px",
                color:
                  "#0070f3",
              }}
            >
              {pilote.pilote}
            </Link>

            <div
              style={{
                marginTop: "5px",
                fontSize:
                  "20px",
              }}
            >
              {valueFormatter(
                pilote[field]
              )}
            </div>

            <small>
              Année :{" "}
              {pilote.year}
            </small>
          </div>
        )
      )}
    </div>
  );

  return (
    <main
      style={{
        padding: "30px",
      }}
    >
      <h1>
        🏆 Hall Of Fame CMLP
      </h1>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "30px",
        }}
      >
        <label>
          📅 Année :
        </label>

        <select
          value={selectedYear}
          onChange={(e) =>
            setSelectedYear(
              e.target.value
            )
          }
          style={{
            marginLeft: "10px",
            padding: "8px",
          }}
        >
          <option value="Toutes">
            Toutes les années
          </option>

          {years.map(
            (year: any) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            )
          )}
        </select>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(320px,1fr))",
          gap: "25px",
        }}
      >
        {podiumCard(
          "🏆 Record absolu",
          podiumRecord,
          (
            value
          ) =>
            `${value.toFixed(
              3
            )} s`,
          "bestLap"
        )}

        {podiumCard(
          "🔥 Plus gros rouleur",
          podiumTours,
          (
            value
          ) =>
            `${value.toLocaleString()} tours`,
          "laps"
        )}

        {podiumCard(
          "🚀 Vitesse maximale",
          podiumVitesse,
          (
            value
          ) =>
            `${value.toFixed(
              3
            )} km/h`,
          "maxSpeed"
        )}
      </div>
    </main>
  );
}