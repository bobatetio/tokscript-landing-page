"use client";
import React from "react";
import Link from "next/link";

import whoBgSpiral from "../../assets_updated/images/mcp/who-bg-spiral.png";
import whoHeaderBg from "../../assets_updated/images/mcp/who-header-bg.png";
import whoCardGridBg from "../../assets_updated/images/mcp/who-card-grid-bg.png";
import whoBrandMarketers from "../../assets_updated/images/mcp/who-brand-marketers.png";
import whoResearchers from "../../assets_updated/images/mcp/who-researchers.png";
import whoUgcMarketplaces from "../../assets_updated/images/mcp/who-ugc-marketplaces.png";
import whoSoloCreator from "../../assets_updated/images/mcp/who-solo-creator.png";
import whoAgencies from "../../assets_updated/images/mcp/who-agencies.png";

import "../app/mcp/mcp.scss";

const whoCards = [
  {
    num: 1,
    title: "Brand Marketers",
    img: whoBrandMarketers,
    desc: "Competitive intelligence through precise transcript and messaging analysis.",
    sizeClass: "who-card-img-sm",
  },
  {
    num: 2,
    title: "Researchers",
    img: whoResearchers,
    desc: "Large-scale data extraction to identify patterns and emerging tropes.",
    sizeClass: "who-card-img-sm",
  },
  {
    num: 3,
    title: "UGC Marketplaces",
    img: whoUgcMarketplaces,
    desc: "Provide your creator network with high-performing templates from real-time data.",
    sizeClass: "who-card-img-sm",
  },
  {
    num: 4,
    title: "Solo Creator",
    img: whoSoloCreator,
    desc: "Instant conversion from viral trends to structured, actionable scripts.",
    sizeClass: "who-card-img-lg",
  },
  {
    num: 5,
    title: "Agencies",
    img: whoAgencies,
    desc: "Automating high-performing script templates for creator rosters.",
    sizeClass: "who-card-img-lg",
  },
];

export default function WhoItsFor() {
  return (
    <div className="mcp-page">
    <section id="who">
      <img className="who-bg-spiral" src={whoBgSpiral.src} alt="" />
      <div className="who-inner">
        <div className="who-header-block">
          <img className="who-header-bg" src={whoHeaderBg.src} alt="" />
          <div className="who-header-content">
            <div className="who-pill">Who It&apos;s For</div>
            <h2 className="who-h2">
              Built for Anyone Who Works With Short-Form Video
            </h2>
            <p className="who-sub">
              TokScript MCP bridges the gap between viral trends and structured
              content data. Move beyond manual research with a unified
              intelligence layer built for your existing AI workspace.
            </p>
          </div>
        </div>

        <div className="who-cards-outer">
          {whoCards.map((card) => (
            <div className={`who-card who-card-${card.num}`} key={card.num}>
              <img className="who-card-grid-bg" src={whoCardGridBg.src} alt="" />
              <p className="who-card-title">{card.title}</p>
              <div className={`who-card-img ${card.sizeClass}`}>
                <img src={card.img.src} alt="" />
              </div>
              <p className="who-card-desc">{card.desc}</p>
            </div>
          ))}
        </div>

        <div className="who-cta">
          <p className="who-cta-text">Don&apos;t have an account?</p>
          <Link href="/pricing" className="who-cta-btn">
            Sign Up Today
          </Link>
        </div>
      </div>
    </section>
    </div>
  );
}
