"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import tiktokLogo from "../assets/images/icons/Tiktok logo.svg";
import "./ViralMomentsCarousel.css";

const TIKTOK_FOLLOW_URL = "https://www.tiktok.com/@tokscript";

const VARIANTS = {
  home: {
    headline: "Creators Saying It Better Than We Could",
    sub: "Real creators, marketers, and agencies sharing how they use TokScript to research TikTok faster. Watch what they're saying, straight from TikTok.",
  },
  pricing: {
    headline: "Why Creators Pick TokScript",
    sub: "The same TikTok creators, marketers, and agencies you research every day already use TokScript. Here's what they have to say.",
  },
};

const VIRAL_MOMENTS = [
  {
    id: 1,
    username: "mrbeast",
    date: "2 days ago",
    caption: "I gave 1000 strangers $1000 each — here's what happened",
    thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 2,
    username: "gordonramsayofficial",
    date: "1 week ago",
    caption: "The one mistake every home cook makes with steak",
    thumbnail: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 3,
    username: "khaby.lame",
    date: "3 days ago",
    caption: "Why are people making it harder than it needs to be?",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 4,
    username: "charlidamelio",
    date: "5 days ago",
    caption: "POV: you just learned the dance everyone's doing",
    thumbnail: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 5,
    username: "bellapoarch",
    date: "1 day ago",
    caption: "When the bass drops at exactly the right moment",
    thumbnail: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 6,
    username: "therock",
    date: "4 days ago",
    caption: "5 AM workout. No excuses. Let's go.",
    thumbnail: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 7,
    username: "zachking",
    date: "6 days ago",
    caption: "How I made my coffee disappear (it's not magic)",
    thumbnail: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 8,
    username: "willsmith",
    date: "1 week ago",
    caption: "The lesson nobody told me at 25 — and I wish they had",
    thumbnail: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 9,
    username: "addisonre",
    date: "2 days ago",
    caption: "Get ready with me for the most chaotic day of the year",
    thumbnail: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 10,
    username: "dudewithsign",
    date: "3 days ago",
    caption: "Stop replying-all to company-wide emails. Just stop.",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 11,
    username: "shakira",
    date: "5 days ago",
    caption: "Hips don't lie — and apparently the algorithm agrees",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=900&fit=crop",
    transcript: null,
  },
  {
    id: 12,
    username: "spencerx",
    date: "1 week ago",
    caption: "Beatbox version of every TikTok song from this month",
    thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=900&fit=crop",
    transcript: null,
  },
];

function relativeDateToISO(rel, nowMs = Date.now()) {
  const m = /^(\d+)\s+(day|days|week|weeks|hour|hours|month|months)\s+ago$/i.exec(
    rel || ""
  );
  if (!m) return new Date(nowMs).toISOString();
  const n = parseInt(m[1], 10);
  const unit = m[2].toLowerCase();
  const ms =
    unit.startsWith("hour")  ? n * 60 * 60 * 1000 :
    unit.startsWith("day")   ? n * 24 * 60 * 60 * 1000 :
    unit.startsWith("week")  ? n * 7 * 24 * 60 * 60 * 1000 :
                               n * 30 * 24 * 60 * 60 * 1000;
  return new Date(nowMs - ms).toISOString();
}

function tiktokUrl(username) {
  return `https://www.tiktok.com/@${username}`;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const TikTokGlyph = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" aria-hidden="true">
    <path
      fill="currentColor"
      d="M19.6 7.7a6.4 6.4 0 0 1-3.7-1.2 6.5 6.5 0 0 1-2.4-3.5h-3v12.7a3 3 0 1 1-2.1-2.9V9.7a6 6 0 1 0 5.1 5.9V9.5a9.4 9.4 0 0 0 6.1 2.2V8.6c-.4 0-.7 0-1-.1Z"
    />
  </svg>
);

export default function ViralMomentsCarousel({ variant = "home" }) {
  const copy = VARIANTS[variant] || VARIANTS.home;
  const cards = useMemo(() => [...VIRAL_MOMENTS, ...VIRAL_MOMENTS], []);
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const rafRef = useRef(0);
  const lastTsRef = useRef(0);
  const halfWidthRef = useRef(0);
  const [paused, setPaused] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startOffset: 0,
    moved: false,
  });

  const schema = useMemo(() => {
    const now = Date.now();
    return {
      "@context": "https://schema.org",
      "@graph": VIRAL_MOMENTS.map((c) => ({
        "@type": "VideoObject",
        name: c.caption,
        description: `@${c.username} talking about TokScript on TikTok`,
        thumbnailUrl: c.thumbnail,
        uploadDate: relativeDateToISO(c.date, now),
        contentUrl: tiktokUrl(c.username),
        embedUrl: tiktokUrl(c.username),
        publisher: { "@type": "Organization", name: "TikTok" },
      })),
    };
  }, []);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      halfWidthRef.current = track.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);

    const SPEED = 28;
    const tick = (ts) => {
      if (!lastTsRef.current) lastTsRef.current = ts;
      const dt = (ts - lastTsRef.current) / 1000;
      lastTsRef.current = ts;
      if (!paused && !dragRef.current.active && halfWidthRef.current > 0) {
        offsetRef.current -= SPEED * dt;
        if (offsetRef.current <= -halfWidthRef.current) {
          offsetRef.current += halfWidthRef.current;
        }
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${offsetRef.current}px)`;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      lastTsRef.current = 0;
      ro.disconnect();
    };
  }, [paused]);

  const onPointerDown = (e) => {
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startOffset: offsetRef.current,
      moved: false,
    };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!dragRef.current.active) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) > 4) dragRef.current.moved = true;
    let next = dragRef.current.startOffset + dx;
    const half = halfWidthRef.current;
    if (half > 0) {
      while (next <= -half) next += half;
      while (next > 0) next -= half;
    }
    offsetRef.current = next;
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(${next}px)`;
    }
  };
  const onPointerUp = (e) => {
    if (!dragRef.current.active) return;
    dragRef.current.active = false;
    e.currentTarget.releasePointerCapture?.(e.pointerId);
  };

  const onCardClick = (e, card) => {
    if (dragRef.current.moved) {
      e.preventDefault();
      return;
    }
    e.preventDefault();
    setActiveCard(card);
  };

  useEffect(() => {
    if (!activeCard) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") setActiveCard(null);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [activeCard]);

  const buildEmbedSrc = (card) => {
    if (card.videoId) {
      return `https://www.tiktok.com/embed/v2/${card.videoId}?autoplay=1`;
    }
    return null;
  };

  return (
    <section
      className="vm-section"
      aria-labelledby="vm-heading"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="vm-inner">
        <div className="vm-header">
          <span className="vm-pill">
            <span className="vm-pill-dot" aria-hidden="true" />
            As Seen On TikTok
          </span>
          <h2 id="vm-heading" className="vm-h2">
            {copy.headline}
          </h2>
          <p className="vm-sub">{copy.sub}</p>
          <a
            className="vm-follow-cta"
            href={TIKTOK_FOLLOW_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Follow TokScript on TikTok"
          >
            <TikTokGlyph />
            Follow us on TikTok
          </a>
        </div>

        <div
          className="vm-track-wrap"
          role="region"
          aria-label="Creators talking about TokScript on TikTok"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <div className="vm-track" ref={trackRef}>
            {cards.map((c, i) => {
              const url = tiktokUrl(c.username);
              return (
                <div className="vm-card-shell" key={`${c.id}-${i}`}>
                  <a
                    className="vm-card"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Play @${c.username} talking about TokScript on TikTok`}
                    draggable={false}
                    onClick={(e) => onCardClick(e, c)}
                  >
                    <img
                      className="vm-card-thumb"
                      src={c.thumbnail}
                      alt=""
                      loading="lazy"
                      draggable={false}
                    />
                    <div className="vm-card-vignette" aria-hidden="true" />
                    <img
                      className="vm-card-logo"
                      src={tiktokLogo.src || tiktokLogo}
                      alt=""
                      aria-hidden="true"
                      draggable={false}
                    />
                    <div className="vm-card-play" aria-hidden="true">
                      <PlayIcon />
                    </div>
                    <div className="vm-card-meta">
                      <span className="vm-pill-sm">@{c.username}</span>
                      <span className="vm-pill-sm">{c.date}</span>
                    </div>
                    <div className="vm-sr-only">
                      {`@${c.username} on TikTok: ${c.caption}.${c.transcript ? ` ${c.transcript}` : ""}`}
                    </div>
                  </a>
                  <div className="vm-card-caption-wrap">
                    <p className="vm-card-caption">{c.caption}</p>
                    <p className="vm-card-hint">Click to watch on TikTok</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {activeCard && (
        <div
          className="vm-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`@${activeCard.username} on TikTok`}
          onClick={() => setActiveCard(null)}
        >
          <div
            className="vm-lightbox-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="vm-lightbox-close"
              onClick={() => setActiveCard(null)}
              aria-label="Close video"
            >
              ✕
            </button>
            {buildEmbedSrc(activeCard) ? (
              <iframe
                className="vm-lightbox-iframe"
                src={buildEmbedSrc(activeCard)}
                allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                allowFullScreen
                title={`@${activeCard.username} on TikTok — ${activeCard.caption}`}
              />
            ) : (
              <div className="vm-lightbox-fallback">
                <img
                  className="vm-lightbox-thumb"
                  src={activeCard.thumbnail}
                  alt=""
                />
                <div className="vm-lightbox-overlay">
                  <span className="vm-lightbox-handle">
                    <TikTokGlyph />@{activeCard.username}
                  </span>
                  <p className="vm-lightbox-caption">{activeCard.caption}</p>
                  <a
                    className="vm-lightbox-cta"
                    href={tiktokUrl(activeCard.username)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TikTokGlyph />
                    Watch on TikTok
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
