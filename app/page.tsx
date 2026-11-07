"use client";

import { useState } from "react";
import Link from "next/link";

import stats from "../data/stats.json";
import lastSync from "../data/last-sync.json";

export default function Home() {
  const years = [
    ...new Set(
      stats.map((p: any) => p.year)
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
    <main>
      <h1>
        🏁 CMLP Performance Center
      </h1>

      <p>
        Statistiques issues de
        Speedhive
      </p>

      <p
        style={{
          color: "#666",
          fontSize: "14px",
        }}
      >
        🕒 Dernière synchronisation :
        {" "}
        {formattedSyncDate}
      </p>

      <div className="filters">
        <select
          value={selectedYear}
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

      <div className="stats-grid">

        <div className="card">
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
              {recordAbsolu?.pilote}
            </Link>
          </p>

          <small>
            Année :
            {" "}
            {recordAbsolu?.year}
          </small>
        </div>

        <div className="card">
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
              {meilleur3Tours?.pilote}
            </Link>
          </p>

          <small>
            Année :
            {" "}
            {meilleur3Tours?.year}
          </small>
        </div>

        <div className="card">
          <h3>
            👥 Pilotes
          </h3>

          <h2>
            {nombrePilotes}
          </h2>
        </div>

        <div className="card">
          <h3>
            📅 Sessions
          </h3>

          <h2>
            {nombreSessions.toLocaleString()}
          </h2>
        </div>

        <div className="card">
          <h3>
            🔄 Tours
          </h3>

          <h2>
            {nombreTours.toLocaleString()}
          </h2>
        </div>

        <div className="card">
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
              {plusGrosRouleur?.pilote}
            </Link>
          </p>
        </div>

        <div className="card">
          <h3>
            🚀 Vitesse max
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
              {vitesseMax?.pilote}
            </Link>
          </p>
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

        <div
          style={{
            overflowX:
              "auto",
          }}
        >
          <table>
            <thead>
              <tr>
                <th>Rang</th>
                <th>Pilote</th>
                <th>Année</th>
                <th>Meilleur tour</th>
                <th>Sessions</th>
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
                    >
                      <td>
                        {index + 1}
                      </td>

                      <td>
                        <Link
                          href={`/pilote/${pilote.transpondeur}`}
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
                        {pilote.bestLap.toFixed(
                          3
                        )}{" "}
                        s
                      </td>

                      <td>
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
      </div>
    </main>
  );
}