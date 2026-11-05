"use client";

import { useState } from "react";
import Link from "next/link";

import stats from "../data/stats.json";
import lastSync from "../data/last-sync.json";

export default function Home() {
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

  const syncDate = new Date(
    lastSync.lastSync
  );

  const formattedSyncDate =
    syncDate.toLocaleString(
      "fr-FR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );

  const nombrePilotes =
    new Set(
      filteredStats.map(
        (p: any) =>
          p.transpondeur
      )
    ).size;

  const nombreSessions =
    filteredStats.reduce(
      (
        sum: number,
        pilote: any
      ) =>
        sum +
        pilote.sessions,
      0
    );

  const nombreTours =
    filteredStats.reduce(
      (
        sum: number,
        pilote: any
      ) =>
        sum + pilote.laps,
      0
    );

  const recordAbsolu =
    [...filteredStats].sort(
      (a: any, b: any) =>
        a.bestLap -
        b.bestLap
    )[0];

  const vitesseMax =
    [...filteredStats].sort(
      (a: any, b: any) =>
        b.maxSpeed -
        a.maxSpeed
    )[0];

  const plusGrosRouleur =
    [...filteredStats].sort(
      (a: any, b: any) =>
        b.laps - a.laps
    )[0];

  const meilleur3Tours =
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
      )[0];

  return (
    <main
      style={{
        padding: "30px",
      }}
    >
      <h1>
        🏁 CMLP Performance Center
      </h1>

      <p>
        Statistiques issues de
        Speedhive
      </p>

      <p
        style={{
          marginTop: "10px",
          color: "#666",
          fontSize: "14px",
        }}
      >
        🕒 Dernière synchronisation :
        {" "}
        {formattedSyncDate}
      </p>

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
          value={
            selectedYear
          }
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
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            padding:
              "20px",
          }}
        >
          <h3>
            🏆 Record absolu
          </h3>

          <h2>
            {recordAbsolu?.bestLap.toFixed(
              3
            )} s
          </h2>

          <p>
            <Link
              href={`/pilote/${recordAbsolu?.transpondeur}`}
            >
              {
                recordAbsolu?.pilote
              }
            </Link>
          </p>

          <small>
            Année :
            {" "}
            {
              recordAbsolu?.year
            }
          </small>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            padding:
              "20px",
          }}
        >
          <h3>
            🎯 Record 3 tours
          </h3>

          <h2>
            {meilleur3Tours?.best3Consecutive.toFixed(
              3
            )} s
          </h2>

          <p>
            <Link
              href={`/pilote/${meilleur3Tours?.transpondeur}`}
            >
              {
                meilleur3Tours?.pilote
              }
            </Link>
          </p>

          <small>
            Année :
            {" "}
            {
              meilleur3Tours?.year
            }
          </small>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            padding:
              "20px",
          }}
        >
          <h3>
            👥 Nombre de pilotes
          </h3>

          <h2>
            {nombrePilotes}
          </h2>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            padding:
              "20px",
          }}
        >
          <h3>
            📅 Nombre de sessions
          </h3>

          <h2>
            {nombreSessions.toLocaleString()}
          </h2>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            padding:
              "20px",
          }}
        >
          <h3>
            🔄 Nombre total de tours
          </h3>

          <h2>
            {nombreTours.toLocaleString()}
          </h2>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            padding:
              "20px",
          }}
        >
          <h3>
            🔥 Plus gros rouleur
          </h3>

          <h2>
            {plusGrosRouleur?.laps.toLocaleString()} tours
          </h2>

          <p>
            <Link
              href={`/pilote/${plusGrosRouleur?.transpondeur}`}
            >
              {
                plusGrosRouleur?.pilote
              }
            </Link>
          </p>

          <small>
            Année :
            {" "}
            {
              plusGrosRouleur?.year
            }
          </small>
        </div>

        <div
          style={{
            border:
              "1px solid #ddd",
            borderRadius:
              "10px",
            padding:
              "20px",
          }}
        >
          <h3>
            🚀 Vitesse maximale
          </h3>

          <h2>
            {vitesseMax?.maxSpeed.toFixed(
              3
            )} km/h
          </h2>

          <p>
            <Link
              href={`/pilote/${vitesseMax?.transpondeur}`}
            >
              {
                vitesseMax?.pilote
              }
            </Link>
          </p>

          <small>
            Année :
            {" "}
            {
              vitesseMax?.year
            }
          </small>
        </div>
      </div>

      <div
        style={{
          marginTop: "50px",
        }}
      >
        <h2>
          🏆 Top 10 Pilotes
        </h2>

        <table
          style={{
            width: "100%",
            marginTop: "20px",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  "2px solid #ddd",
              }}
            >
              <th style={{ textAlign: "left", padding: "12px" }}>
                Rang
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Pilote
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Année
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Meilleur tour
              </th>

              <th style={{ textAlign: "left", padding: "12px" }}>
                Sessions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredStats
              .slice(0, 10)
              .map(
                (
                  pilote: any,
                  index
                ) => (
                  <tr
                    key={`${pilote.transpondeur}-${pilote.year}`}
                    style={{
                      borderBottom:
                        "1px solid #eee",
                    }}
                  >
                    <td
                      style={{
                        padding:
                          "12px",
                      }}
                    >
                      {index + 1}
                    </td>

                    <td
                      style={{
                        padding:
                          "12px",
                      }}
                    >
                      <Link
                        href={`/pilote/${pilote.transpondeur}`}
                      >
                        {
                          pilote.pilote
                        }
                      </Link>
                    </td>

                    <td
                      style={{
                        padding:
                          "12px",
                      }}
                    >
                      {
                        pilote.year
                      }
                    </td>

                    <td
                      style={{
                        padding:
                          "12px",
                      }}
                    >
                      {pilote.bestLap.toFixed(
                        3
                      )} s
                    </td>

                    <td
                      style={{
                        padding:
                          "12px",
                      }}
                    >
                      {
                        pilote.sessions
                      }
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