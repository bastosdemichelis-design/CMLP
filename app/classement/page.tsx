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
    <main
      style={{
        padding: "30px",
      }}
    >
      <h1>
        🏆 Classement CMLP
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >

        <div>
          <label>
            📆 Année :
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

        <div>
          <input
            type="text"
            placeholder="🔎 Rechercher un pilote..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            style={{
              padding: "8px",
              minWidth: "250px",
            }}
          />
        </div>

      </div>

      <p>
        👥 Résultat(s) :
        {" "}
        {filteredStats.length}
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse:
            "collapse",
          marginTop: "20px",
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
              }}
            >
              Rang
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Pilote
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Année
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Sessions
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Tours
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Meilleur Tour
            </th>

            <th
              style={{
                textAlign: "left",
                padding: "12px",
              }}
            >
              Vitesse max
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredStats.map(
            (
              pilote: any,
              index
            ) => (

              <tr
                key={
                  pilote.transpondeur +
                  "-" +
                  pilote.year
                }
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
                  {index + 1}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  <Link
                    href={`/pilote/${pilote.transpondeur}`}
                    style={{
                      textDecoration:
                        "none",
                      color:
                        "#0070f3",
                      fontWeight:
                        "bold",
                    }}
                  >
                    {pilote.pilote}
                  </Link>
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {pilote.year}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {pilote.sessions}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {pilote.laps.toLocaleString()}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {pilote.bestLap.toFixed(
                    3
                  )}
                </td>

                <td
                  style={{
                    padding: "12px",
                  }}
                >
                  {pilote.maxSpeed.toFixed(
                    3
                  )}
                </td>

              </tr>

            )
          )}

        </tbody>

      </table>

    </main>
  );
}