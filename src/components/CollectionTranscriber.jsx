"use client";

// UX-55 / deliverable 05: the Collection Transcriber experience.
//
// One continuous flow: paste ONE TikTok collection link, the whole collection
// renders as a list (every row visible immediately, before anything is
// transcribed), then transcripts fill in. The first FREE_CAP open free
// (config driven), everything past that stays visible but locked. Reuses the
// UX-54 row states (BulkTranscriptResult) and the UX-54 wall (BulkUpgradeWall)
// so this ticket runs them at scale rather than redrawing them.
//
// Design here is a reasonable AWAITING BOB starting point. Every new string is
// an AWAITING MICHAEL placeholder. NUMBERS here are design assumptions / config,
// labeled as such, not copy: FREE_CAP is the product config, PRIMARY_N is the
// number the primary case is designed at, STRESS_N is the stress frame.
// No em dashes, no en dashes. No red or pink.

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import HomePage from "@/app/HomePage";
import { AlertTriangle, ArrowRight } from "lucide-react";
import magicIcon from "../assets/images/icons/magicIcon.svg";

const BulkTranscriptResult = dynamic(() => import("@/components/BulkTranscriptResult"));
const BulkUpgradeWall = dynamic(() => import("@/components/BulkUpgradeWall"));
const HeroFloatingIcons = dynamic(() => import("@/components/HeroFloatingIcons"), { ssr: false });

// ─── Numbers are assumptions / config, not copy ──────────────────────────────
const FREE_CAP = 50;   // config-driven free transcripts per collection
const PRIMARY_N = 312; // the number the primary case is designed at (assumption)
const STRESS_N = 500;  // the stress frame (assumption)


const T = {
  bg: "#0d0d0d",
  card: "#1c1c1c",
  panel: "#161616",
  border: "rgba(255,255,255,0.10)",
  text: "#ffffff",
  muted: "#9ca3af",
  accent: "#00d4cc",
  accentSoft: "rgba(0,212,204,0.12)",
};

const SAMPLE_VTT = [
  "WEBVTT", "", "00:00:00.000 --> 00:00:03.000", "Welcome back to the collection.",
  "", "00:00:03.000 --> 00:00:07.000", "Here is the first thing you need to know.",
].join("\n");

// The first rows deliberately cover the four description cases the brief calls
// out plus a missing-duration row, so a single scan proves the row survives all.
const SEED_ROWS = [
  { title: "One clean sentence that describes exactly what the video shows.", duration: "63" },
  { title: "A longer caption that runs onto a second line, the kind a creator writes to explain the recipe and the backstory together in one breath.", duration: "142" },
  { title: "#food #recipe #pasta #viral #fyp #cooking #kitchen #dinner #homemade #easy", duration: "51" },
  { title: "No description", duration: "88" },
  { title: "This video has no duration listed, and the row still stays clean.", duration: "" },
  { title: "The morning routine that finally stuck for good.", duration: "120" },
];

const COVERS = [
  "https://images.unsplash.com/photo-1565895405138-6c3a1555da6a?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1547592180-85f173990554?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=356&fit=crop",
  "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=200&h=356&fit=crop",
];

function makeItems(n, mode) {
  // mode: "pending" (nothing transcribed yet) | "gated" (first FREE_CAP open,
  // the rest locked). Guest-only page, so there is no all-open paid mode.
  return Array.from({ length: n }, (_, i) => {
    const seed = SEED_ROWS[i % SEED_ROWS.length];
    let status;
    if (mode === "pending") status = "pending";
    else if (i < FREE_CAP) {
      status = i === 2 || i === 3 ? "processing" : i === 4 ? "unavailable" : "complete";
    } else status = "locked";
    return {
      sourceUrl: `collection-item-${i}`,
      status,
      title: seed.title,
      duration: seed.duration,
      // The first rows carry a thumbnail (enough for the wall's 2x5 grid);
      // the rest stream in (Clock placeholder), keeping the stress frame light.
      thumbnail: i < 12 ? COVERS[i % COVERS.length] : null,
      transcript: status === "complete" ? SAMPLE_VTT : null,
    };
  });
}

function toBulkData(items) {
  const completed = items.filter((i) => i.status === "complete").length;
  const unavailable = items.filter((i) => i.status === "unavailable").length;
  return {
    transcript: { bulkItems: items },
    summary: { total: items.length, completed, unavailable, failed: 0 },
  };
}

function FailedState({ onRetry }) {
  // Private, empty, or invalid collection. Calm and clear, not catastrophic.
  return (
    <div
      style={{
        maxWidth: 520,
        margin: "0 auto",
        textAlign: "center",
        padding: "40px 24px",
        background: T.card,
        border: `1px solid ${T.border}`,
        borderRadius: 18,
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          width: 48, height: 48, borderRadius: 12, margin: "0 auto 16px",
          background: "rgba(255,255,255,0.06)", display: "flex",
          alignItems: "center", justifyContent: "center",
        }}
      >
        <AlertTriangle size={22} style={{ color: T.muted }} />
      </div>
      <div style={{ color: T.text, fontSize: 18, fontWeight: 700, textWrap: "balance" }}>We could not open that collection</div>
      <div style={{ color: T.muted, fontSize: 13.5, lineHeight: 1.6, marginTop: 8, textWrap: "pretty" }}>It might be private, empty, or the link might be incomplete. Check the link and try again.</div>
      <button
        onClick={onRetry}
        className="pc-cta pc-cta-primary"
        style={{ marginTop: 20, height: 44, borderRadius: 12, fontSize: 14 }}
      >
        Try another collection link
      </button>
    </div>
  );
}

export default function CollectionTranscriber() {
  // Guest-only page (non-logged-in visitors). Signed-in users go to the v3
  // dashboard, so there is no paid or logged-in-free variant here.
  // stage: "idle" | "scanning" | "scanned" | "done" | "failed"
  const [stage, setStage] = useState("idle");
  const [countState, setCountState] = useState("counting");
  const [items, setItems] = useState([]);
  const [link, setLink] = useState("");
  const [wallOpen, setWallOpen] = useState(false);
  const [N, setN] = useState(PRIMARY_N);

  // Read the comp / stress params from the URL so Bob can open each required
  // comp directly: ?comp=scan | locked | failed and ?stress=1.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const p = new URLSearchParams(window.location.search);
    const stress = p.get("stress") === "1";
    const n = stress ? STRESS_N : PRIMARY_N;
    setN(n);
    const comp = p.get("comp");
    if (comp === "scan") {
      setItems(makeItems(n, "pending"));
      setCountState("ready");
      setStage("scanned");
    } else if (comp === "locked") {
      setItems(makeItems(n, "gated"));
      setCountState("ready");
      setStage("done");
    } else if (comp === "failed") {
      setStage("failed");
    }
  }, []);

  const bulkData = useMemo(() => (items.length ? toBulkData(items) : null), [items]);
  const openCount = Math.min(FREE_CAP, items.length);
  const lockedCount = items.filter((i) => i.status === "locked").length;

  // Interactive run: scan lands the full list (all pending), the count arrives
  // slightly late, then transcripts fill in and the wall follows.
  const runScan = () => {
    if (!link.trim()) return;
    // Treat a link without a collection path as a failed scan.
    const looksLikeCollection = /collection|playlist|\/@[^/]+\//i.test(link);
    if (!looksLikeCollection) {
      setStage("failed");
      return;
    }
    setItems(makeItems(N, "pending"));
    setCountState("counting"); // count is not asserted yet
    setStage("scanning");
    // The true count arrives late (open question in the brief: late/climbing/never).
    setTimeout(() => setCountState("ready"), 1200);
    setTimeout(() => setStage("scanned"), 1250);
    // Transcripts fill in; first FREE_CAP open, the rest lock.
    setTimeout(() => {
      setItems(makeItems(N, "gated"));
      setStage("done");
      setWallOpen(true);
    }, 2600);
  };

  const reset = () => {
    setStage("idle");
    setItems([]);
    setLink("");
    setWallOpen(false);
    setCountState("counting");
  };

  const showList = stage === "scanning" || stage === "scanned" || stage === "done";

  const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

  // Reuse the full landing page (header, MCP, how it works, features, pricing,
  // FAQ, footer) via HomePage, and inject only the collection-specific hero. So
  // the collection page is a complete landing page where just the hero differs.
  const collectionHero = (
    <div className="banner-section collection-banner">
      <div className="banner-flare" aria-hidden="true">
        <img src={`${BP}/assets/chatgpt-hero-flare.png`} alt="" />
      </div>
      <HeroFloatingIcons />
      <div className="container">
        <div className="inner-section">
          <div className="banner-content-wrapper collection-hero">
            <button className="ai-btn">
              <Image src={magicIcon} alt="AI icon" width={20} height={20} priority />
              AI Powered
            </button>
            <h1>TikTok Collection Transcriber</h1>
            <p>
              Paste one link to a TikTok collection and get a clean transcript for every single video inside it.
            </p>
          </div>

          {/* Landing-page input styling (teal border + focus ring), kept at
              the collection page's single-line height. */}
          <div
            className="chat-input-container"
            style={{ display: "flex", alignItems: "center", gap: 8, padding: 8 }}
          >
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && runScan()}
              placeholder="https://www.tiktok.com/@username/collection/7123456789012345678"
              style={{
                flex: 1, minWidth: 0, background: "transparent", border: "none", outline: "none",
                color: "#ffffff", fontSize: 14.5, padding: "10px 12px",
              }}
            />
            <button
              onClick={runScan}
              disabled={stage === "scanning"}
              className="pc-cta pc-cta-primary"
              style={{ flex: "0 0 auto", height: 44, borderRadius: 10, fontSize: 14 }}
            >
              {stage === "scanning" ? "Scanning" : "Scan Collection"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Results live inside the hero block, so the marketing sections follow
            beneath them. */}
        {(stage === "failed" || showList) && (
          <div style={{ maxWidth: 1200, margin: "8px auto 0", position: "relative", zIndex: 1 }}>
            {stage === "failed" && <FailedState onRetry={reset} />}
            {showList && (
              <BulkTranscriptResult
                bulkData={bulkData}
                selectedItem={null}
                selectedIndex={0}
                onItemClick={() => {}}
                isProcessing={stage === "scanning"}
                processingUrls={[]}
                upgrade={() => setWallOpen(true)}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <HomePage platform="tiktok" heroReplacement={collectionHero} />

      {wallOpen && (
        <BulkUpgradeWall
          open
          variant="guest"
          openCount={openCount}
          lockedCount={lockedCount}
          total={items.length}
          items={items}
          onClose={() => setWallOpen(false)}
          onPrimary={() => setWallOpen(false)}
        />
      )}

      <style>{`
        @keyframes ct-spin{to{transform:rotate(360deg)}}
        .ct-spin{animation:ct-spin 1s linear infinite}
        /* Collection hero: keep the global headline size, only make it heavier;
           and make the description smaller than the global 19px. */
        .banner-section .banner-content-wrapper.collection-hero h1 {
          font-weight: 800 !important;
        }
        .banner-section .banner-content-wrapper.collection-hero p {
          font-size: clamp(14px, 3.5vw, 16px) !important;
        }
        /* Give the hero room to breathe: nav + hero fill at least the viewport,
           with the content vertically centered instead of crammed at the top.
           min-height, not a fixed height, so results still push the page taller. */
        .banner-section.collection-banner {
          min-height: calc(100vh - 220px);
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: 40px;
          padding-bottom: 40px;
        }
      `}</style>
    </>
  );
}
