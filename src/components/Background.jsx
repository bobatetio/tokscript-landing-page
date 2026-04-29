import React from "react";

const Background = () => {
  return (
    <div className="bg-fixed-layer">
      {/* Visual Assets (Noise, Grid, Vignette) */}
      <div
        className="bg-noise"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="bg-grid"></div>
      <div className="bg-vignette"></div>

      {/* Animated Orbs - CSS animation replaces framer-motion */}
      <div
        className="bg-glow-blob bg-glow-blob--1"
        style={{
          top: 0,
          left: "25%",
          width: "500px",
          height: "500px",
          backgroundColor: "rgba(79, 70, 229, 0.2)",
        }}
      />

      <div
        className="bg-glow-blob bg-glow-blob--2"
        style={{
          bottom: 0,
          right: "25%",
          width: "600px",
          height: "600px",
          backgroundColor: "rgba(147, 51, 234, 0.1)",
        }}
      />
    </div>
  );
};

export default Background;
