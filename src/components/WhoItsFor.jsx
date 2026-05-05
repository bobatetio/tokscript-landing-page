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

import { getPlatformCopy } from "../app/platformContent";
import "../app/mcp/mcp.scss";

const cardMeta = [
  { num: 1, title: "Content Creators",          img: whoSoloCreator,     key: "creators",    sizeClass: "who-card-img-sm" },
  { num: 2, title: "Educators & Researchers",   img: whoBrandMarketers,  key: "researchers", sizeClass: "who-card-img-sm" },
  { num: 3, title: "Marketers & Ad Analysts",   img: whoResearchers,     key: "marketers",   sizeClass: "who-card-img-sm" },
  { num: 4, title: "AI & Automation Users",     img: whoAgencies,        key: "ai",          sizeClass: "who-card-img-lg" },
  { num: 5, title: "UGC Creators & Influencers", img: whoUgcMarketplaces, key: "ugc",         sizeClass: "who-card-img-lg" },
];

export default function WhoItsFor({ platform = "tiktok" }) {
  const copy = getPlatformCopy(platform);
  const whoCards = cardMeta.map((c) => ({ ...c, desc: copy.who?.[c.key] || "" }));
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
              {copy.whoH2 || "Built for Anyone Who Works With Short-Form Video"}
            </h2>
            <p className="who-sub">
              {copy.whoSub ||
                "TokScript MCP bridges the gap between viral trends and structured content data. Move beyond manual research with a unified intelligence layer built for your existing AI workspace."}
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
