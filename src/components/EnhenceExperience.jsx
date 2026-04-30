"use client";
import React from "react";
import Link from "next/link";

const AVATARS = [
  { bg: "#00b8b2", img: "https://randomuser.me/api/portraits/men/32.jpg" },
  { bg: "#a486d4", img: "https://randomuser.me/api/portraits/women/44.jpg" },
  { bg: "#f9bd24", img: "https://randomuser.me/api/portraits/men/65.jpg" },
  { bg: "#f96b24", img: "https://randomuser.me/api/portraits/women/68.jpg" },
];

export default function EnhenceExperience({ title, subtitle, cta, ctaHref }) {
  return (
    <section className="mcp-cta-wrapper">
      <div className="container">
        <div className="mcp-cta-card">
          <div className="mcp-cta-grid" aria-hidden />
          <div className="mcp-cta-glow mcp-cta-glow--left" aria-hidden />
          <div className="mcp-cta-glow mcp-cta-glow--right" aria-hidden />

          <div className="mcp-cta-inner">
            <div className="mcp-cta-rating">
              <div className="mcp-cta-stars" aria-label="Rated 4.9 out of 5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#FACC15" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="mcp-cta-rating-value">4.9/5</span>
            </div>

            <div className="mcp-cta-avatars">
              {AVATARS.map((a, i) => (
                <span key={i} className="mcp-cta-avatar" style={{ background: a.bg }}>
                  <img src={a.img} alt="" />
                </span>
              ))}
              <span className="mcp-cta-avatar mcp-cta-avatar--count">41K+</span>
            </div>

            <p className="mcp-cta-eyebrow">
              Over 41K+ creators and teams power their workflow with TokScript
            </p>

            <h2 className="mcp-cta-title">
              {title || "Run TokScript Right Inside Your AI"}
            </h2>
            <p className="mcp-cta-subtitle">
              {subtitle ||
                "TokScript MCP plugs every transcript, video download, and creator insight straight into Claude and ChatGPT — so creators can research, script, and ship without ever leaving the conversation."}
            </p>

            <Link href={ctaHref || "/mcp"} className="mcp-cta-button">
              {cta || "Set up MCP"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
