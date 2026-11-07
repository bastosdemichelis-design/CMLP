"use client";

import {
  useEffect,
  useState,
} from "react";

export default function PublicCounter() {

  const [count, setCount] =
    useState<number | null>(
      null
    );

  useEffect(() => {

    fetch(
      "/api/views",
      {
        method: "POST",
      }
    );

    fetch("/api/views")
      .then(
        (r) => r.json()
      )
      .then(
        (data) =>
          setCount(
            data.count
          )
      );

  }, []);

  return (
    <div
      className="card"
      style={{
        marginTop: "20px",
      }}
    >
      <h3>
        👀 Visites du site
      </h3>

      <h2>
        {count === null
          ? "..."
          : count.toLocaleString(
              "fr-FR"
            )}
      </h2>
    </div>
  );
}