"use client";
import React from "react";
import "../app/chrome-extension/cx-stats.css";

const STATS = [
  { number: "2.6M+", label: "Videos Processed" },
  { number: "190K+", label: "Profiles Downloaded" },
  { number: "120K+", label: "Hours Saved" },
  { number: "84M+", label: "Minutes of Videos Total" },
];

export default function HomeSocialProof() {
  return (
    <section
      id="cx-stats"
      style={{ padding: "20px clamp(16px, 4vw, 32px)", gap: "12px" }}
    >
      <p
        className="cx-stats-headline"
        style={{ color: "#fff", fontStyle: "italic", fontWeight: 700, margin: 0 }}
      >
        41,000+ Users Have Processed More Than 2,600,000 Videos So Far
      </p>
      <div
        className="cx-stats-container"
        style={{ padding: "12px clamp(16px, 4vw, 32px)", gap: "clamp(12px, 2vw, 24px)" }}
      >
        {STATS.map((s) => (
          <div className="cx-stat" key={s.label}>
            <div className="cx-stat-number">{s.number}</div>
            <div className="cx-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
