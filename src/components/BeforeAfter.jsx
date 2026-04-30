"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";

import baBg from "../../assets_updated/images/mcp/ba-bg.png";
import baHeaderBgL2 from "../../assets_updated/images/mcp/ba-header-bg-l2.png";
import baHeaderBgL1 from "../../assets_updated/images/mcp/ba-header-bg-l1.png";
import baCardBg from "../../assets_updated/images/mcp/ba-card-bg.png";
import baBeforeCompetitor from "../../assets_updated/images/mcp/ba-before-competitor.png";
import baAfterCompetitor from "../../assets_updated/images/mcp/ba-after-competitor.png";
import baBeforeScripting from "../../assets_updated/images/mcp/ba-before-scripting.png";
import baAfterScripting from "../../assets_updated/images/mcp/ba-after-scripting.png";
import baBeforeBriefing from "../../assets_updated/images/mcp/ba-before-briefing.png";
import baAfterBriefing from "../../assets_updated/images/mcp/ba-after-briefing.png";

import "../app/mcp/mcp.scss";

const slides = [
  {
    title: "Competitor Intelligence",
    beforeImg: baBeforeCompetitor,
    afterImg: baAfterCompetitor,
    beforeDesc:
      "Open 10 tabs, watch videos, take notes by hand, try to spot patterns across creators in your niche.",
    afterDesc:
      "“Research the top 5 creators in my niche and tell me what they have in common.” Done in under 30 seconds.",
  },
  {
    title: "Rapid Scripting",
    beforeImg: baBeforeScripting,
    afterImg: baAfterScripting,
    beforeDesc:
      "Try to remember what made your last video work, guess at a hook, write something, delete it, start over.",
    afterDesc:
      "Pull your top 5 scripts, generate 20 hooks, pick the best one, and have a full script written in one conversation.",
  },
  {
    title: "Automated Briefing",
    beforeImg: baBeforeBriefing,
    afterImg: baAfterBriefing,
    beforeDesc:
      "Spend hours writing briefs with no real data, guessing at structures that might work based on intuition alone.",
    afterDesc:
      "Analyze top-performing content in your niche and get a proven brief structure ready in 10 minutes.",
  },
];

export default function BeforeAfter() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const baCarouselRef = useRef(null);

  const goToSlide = (i) => {
    const next = ((i % slides.length) + slides.length) % slides.length;
    setCarouselIndex(next);
  };

  return (
    <div className="mcp-page">
    <section id="beforeafter">
      <img className="ba-bg" src={baBg.src} alt="" />
      <div className="ba-inner">
        <div className="ba-header-block">
          <div className="ba-header-bg">
            <img className="ba-header-bg-l2" src={baHeaderBgL2.src} alt="" />
            <img className="ba-header-bg-l1" src={baHeaderBgL1.src} alt="" />
          </div>
          <div className="ba-header-content">
            <div className="ba-pill">Before &amp; After</div>
            <h2 className="ba-title">
              From Manual Guesswork to
              <br />
              Automated Viral Systems
            </h2>
            <p className="ba-subtitle">
              Replace manual research with automated viral systems. Build
              data-backed scripts and scale your creative output in seconds.
            </p>
          </div>
        </div>

        <div className="ba-carousel-outer" ref={baCarouselRef}>
          <div
            className="ba-track"
            style={{
              transform: `translateX(-${carouselIndex * (baCarouselRef.current?.offsetWidth || 1100)}px)`,
            }}
          >
            {slides.map((slide, i) => (
              <div className="ba-slide" key={i}>
                <p className="ba-slide-title">{slide.title}</p>
                <div className="ba-cards-row">
                  <div className="ba-card ba-before">
                    <img className="ba-card-bg" src={baCardBg.src} alt="" />
                    <span className="ba-card-label">Before</span>
                    <img className="ba-card-img" src={slide.beforeImg.src} alt="Before" />
                    <p className="ba-card-desc">{slide.beforeDesc}</p>
                  </div>
                  <div className="ba-card ba-after">
                    <img className="ba-card-bg" src={baCardBg.src} alt="" />
                    <span className="ba-card-label">After</span>
                    <img className="ba-card-img" src={slide.afterImg.src} alt="After" />
                    <p className="ba-card-desc">{slide.afterDesc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ba-nav">
          <button className="ba-arrow" onClick={() => goToSlide(carouselIndex - 1)}>&#8592;</button>
          <div className="ba-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                className={`ba-dot${carouselIndex === i ? " active" : ""}`}
                onClick={() => goToSlide(i)}
              />
            ))}
          </div>
          <button className="ba-arrow" onClick={() => goToSlide(carouselIndex + 1)}>&#8594;</button>
        </div>

        <div className="ba-cta-wrap">
          <Link href="/pricing" className="ba-cta">Deploy These Workflows</Link>
        </div>
      </div>
    </section>
    </div>
  );
}
