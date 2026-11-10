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

  const podium3Tours =
    [...filteredStats]
      .filter(
        (p: any) =>
          p.best3Consecutive &&
          p.best3Consecutive <
            Number.MAX_VALUE
      )
      .sort(
        (a: any, b: any) =>
          a.best3Consecutive -
          b.best3Consecutive
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
          b.maxSpeed -
          a.maxSpeed
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
    <div className="card">
      <h2
        style={{
          marginBottom: "20px",
          color: "#f97316",
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
                  ? "1px solid #334155"
                  : "none",
              paddingBottom: "15px",
              marginBottom: "15px",
            }}
          >
            <div
              style={{
                fontSize: "28px",
                marginBottom: "10px",
              }}
            >
              {getMedal(index)}
            </div>

            <Link
              href={`/pilote/${pilote.transpondeur}`}
              style={{
                textDecoration:
                  "none",
                fontWeight: "bold",
                fontSize: "22px",
                color: "#60a5fa",
              }}
            >
              {pilote.pilote}
            </Link>

            <div
              style={{
                marginTop: "10px",
                fontSize: "24px",
                fontWeight:
                  "bold",
                color: "#f8fafc",
              }}
            >
              {valueFormatter(
                pilote[field]
              )}
            </div>

            <div
              style={{
                marginTop: "8px",
                color: "#94a3b8",
                fontSize: "14px",
              }}
            >
              Année : {pilote.year}
            </div>
          </div>
        )
      )}
    </div>
  );

  return (
    <main>
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
        className="stats-grid"
      >
        {podiumCard(
          "🏆 Record absolu",
          podiumRecord,
          (value) =>
            `${value.toFixed(
              3
            )} s`,
          "bestLap"
        )}

        {podiumCard(
          "🎯 Meilleurs 3 tours consécutifs",
          podium3Tours,
          (value) =>
            `${value.toFixed(
              3
            )} s`,
          "best3Consecutive"
        )}

        {podiumCard(
          "🔥 Plus gros rouleur",
          podiumTours,
          (value) =>
            `${value.toLocaleString()} tours`,
          "laps"
        )}

        {podiumCard(
          "🚀 Vitesse maximale",
          podiumVitesse,
          (value) =>
            `${value.toFixed(
              3
            )} km/h`,
          "maxSpeed"
        )}
      </div>
    </main>
  );
}