"use client";

import { useState } from "react";
import Link from "next/link";

import stats from "../../data/stats.json";

export default function Classement() {
  const years = [
    ...new Set(
      stats.map(
        (s: any) => s.year
      )
    ),
  ].sort(
    (a: any, b: any) => b - a
  );

  const [selectedYear, setSelectedYear] =
    useState("Toutes");

  const [search, setSearch] =
    useState("");

  let filteredStats =
    selectedYear === "Toutes"
      ? stats
      : stats.filter(
          (p: any) =>
            p.year ===
            Number(selectedYear)
        );

  filteredStats =
    filteredStats.filter(
      (p: any) =>
        p.pilote
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <main>
      <h1>
        🏆 Classement CMLP
      </h1>

      <div className="filters">

        <select
          value={
            selectedYear
          }
          onChange={(e) =>
            setSelectedYear(
              e.target.value
            )
          }
        >
          <option value="Toutes">
            Toutes les années
          </option>

          {years.map(
            (
              year: any
            ) => (
              <option
                key={year}
                value={year}
              >
                {year}
              </option>
            )
          )}
        </select>

        <input
          type="text"
          placeholder="🔎 Rechercher un pilote..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

      </div>

      <p>
        👥 Résultat(s) :
        {" "}
        {filteredStats.length}
      </p>

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
              <th>Rang</th>
              <th>Pilote</th>
              <th>Année</th>
              <th>Sessions</th>
              <th>Tours</th>
              <th>Meilleur Tour</th>
              <th>Vitesse max</th>
            </tr>
          </thead>

          <tbody>

            {filteredStats.map(
              (
                pilote: any,
                index
              ) => (
                <tr
                  key={`${pilote.transpondeur}-${pilote.year}`}
                >
                  <td>
                    {index + 1}
                  </td>

                  <td>
                    <Link
                      href={`/pilote/${pilote.transpondeur}`}
                      style={{
                        fontWeight:
                          "bold",
                      }}
                    >
                      {
                        pilote.pilote
                      }
                    </Link>
                  </td>

                  <td>
                    {
                      pilote.year
                    }
                  </td>

                  <td>
                    {
                      pilote.sessions
                    }
                  </td>

                  <td>
                    {pilote.laps.toLocaleString()}
                  </td>

                  <td>
                    {pilote.bestLap.toFixed(
                      3
                    )} s
                  </td>

                  <td>
                    {pilote.maxSpeed.toFixed(
                      3
                    )} km/h
                  </td>

                </tr>
              )
            )}

          </tbody>
        </table>
      </div>
    </main>
  );
}