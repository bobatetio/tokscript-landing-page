"use client";

/**
 * Transcript result page (free, "logged-in" simulated).
 * Visually replicates the v3 dashboard's /results view for a free-plan user.
 * All sidebar / top-bar interactions open the upgrade modal — this is a
 * marketing surface, not a real app shell.
 */

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import Link from "next/link";
import Header from "../../components/Header";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Search,
  LayoutDashboard,
  BookOpen,
  Compass,
  FileText,
  Folder,
  Video,
  ChevronRight,
  ChevronDown,
  Settings,
  Heart,
  Clock,
  Globe,
  Calendar,
  Download,
  Copy,
  RefreshCw,
  Zap,
  X,
  Sparkles,
  Bookmark,
  Eye,
  ExternalLink,
} from "lucide-react";

const DontMissOutModal = dynamic(
  () => import("../../components/modals/DontMissOutModal"),
  { ssr: false },
);

// ── Theme tokens (dark only) ────────────────────────────────────────────────
const T = {
  appBg: "#0a0a0a",
  bg: "#0d0d0d",
  border: "#262626",
  text: "#ffffff",
  muted: "#888888",
  hoverBg: "rgba(255,255,255,0.04)",
  cardBg: "#141414",
  panelBg: "#111111",
  sidebarBg: "#0f0f0f",
  accent: "#00b8b2",
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function formatCount(n) {
  const num = Number(n) || 0;
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(num);
}
function formatDuration(sec) {
  const n = Number(sec) || 0;
  const m = Math.floor(n / 60);
  const s = Math.floor(n % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}
function formatDate(ts) {
  const t = Number(ts);
  if (!t) return "—";
  const d = new Date(t * (t < 1e12 ? 1000 : 1));
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
function stripTimestamps(text) {
  if (!text) return "";
  return text
    .replace(/\r/g, "")
    // Drop the WEBVTT file header and any X-TIMESTAMP-MAP / NOTE lines
    .replace(/^\s*WEBVTT.*$/gim, "")
    .replace(/^\s*(?:NOTE|STYLE|REGION|X-[A-Z-]+).*$/gm, "")
    // Drop SRT/VTT cue numbers on their own line
    .replace(/^\s*\d+\s*$/gm, "")
    // Drop any line containing an arrow (timestamp ranges in any format)
    .replace(/^.*-->.*$/gm, "")
    // Drop any remaining standalone arrows
    .replace(/-->/g, "")
    // Drop simpler standalone timestamps like 0:12 / 00:12 / 1:23:45 at line edges
    .replace(/^\s*\[?\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?\]?\s*/gm, "")
    .replace(/\s\[?\d{1,2}:\d{2}(?::\d{2})?(?:[.,]\d{1,3})?\]?(?=\s|$)/g, " ")
    // Collapse extra whitespace
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n[ \t]+/g, "\n")
    .trim();
}

function sentencesFromText(text) {
  if (!text || typeof text !== "string") return [];
  const cleaned = stripTimestamps(text);
  if (!cleaned) return [];
  return cleaned
    .split(/\n+/)
    .flatMap((line) => line.split(/(?<=[.!?])\s+/))
    .map((s) => s.replace(/\s+/g, " ").trim())
    .filter(Boolean);
}

const FREE_PARAGRAPHS = 3;
const DOWNLOAD_FORMATS = [
  { label: "Plain Text (.txt)", free: true },
  { label: "Subtitles (.srt)", free: false },
  { label: "JSON (beta)", free: false },
];

const RELATED_VIDEOS = [
  { title: "5 Morning Habits That Changed My Life", creator: "@productivityhacks", duration: "0:58", views: "2.4M", thumb: "https://placehold.co/120x180/1a1a1a/666?text=Video" },
  { title: "The Secret to Perfect Pasta Every Time", creator: "@chefmike", duration: "1:23", views: "892K", thumb: "https://placehold.co/120x180/1f1f1f/666?text=Video" },
  { title: "30-Day Fitness Challenge Results", creator: "@fitnesswithsarah", duration: "0:47", views: "1.6M", thumb: "https://placehold.co/120x180/161616/666?text=Video" },
];

// ── Page ─────────────────────────────────────────────────────────────────────
export default function TranscriptResultPageWrapper() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: T.appBg }} />}>
      <TranscriptResultPage />
    </Suspense>
  );
}

function TranscriptResultPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const router = useRouter();
  const [videoData, setVideoData] = useState(null);
  const [hydrated, setHydrated] = useState(false);
  const [activeTab, setActiveTab] = useState("transcript");
  const [langOpen, setLangOpen] = useState(false);
  const [upgradeShow, setUpgradeShow] = useState(false);

  useEffect(() => {
    setHydrated(true);
    if (typeof window === "undefined" || !id) return;
    try {
      const raw = sessionStorage.getItem(`tk_transcript_${id}`);
      if (raw) setVideoData(JSON.parse(raw));
    } catch (e) {
      console.error("Failed to read transcript from sessionStorage:", e);
    }
  }, [id]);

  const upgrade = () => setUpgradeShow(true);

  // Map API → display fields
  const video = useMemo(() => {
    const d = videoData?.data || {};
    const subs = videoData?.subtitles || "";
    const wordCount = subs ? subs.trim().split(/\s+/).length : 0;
    const charCount = subs.length;
    const sentences = subs ? subs.split(/[.!?]+/).filter((s) => s.trim()).length : 0;
    return {
      title: d?.desc || "Untitled video",
      creator: d?.author?.uniqueId ? `@${d.author.uniqueId}` : "",
      avatar: d?.author?.avatarThumb || d?.author?.avatarMedium || "",
      thumbnail: d?.video?.cover || d?.video?.originCover || "",
      platform: "TikTok",
      likes: formatCount(d?.stats?.diggCount),
      duration: formatDuration(d?.video?.duration),
      language: (d?.textLanguage || "EN").toString().toUpperCase().slice(0, 2),
      date: formatDate(d?.createTime),
      wordCount,
      charCount,
      sentences,
      readability: "Grade 3",
    };
  }, [videoData]);

  const paragraphs = useMemo(() => sentencesFromText(videoData?.subtitles || ""), [videoData]);
  // Transcript text is always free for the user; locks are scoped to other tabs/features.

  if (!hydrated) return <div style={{ minHeight: "100vh", background: T.appBg }} />;

  if (!videoData) {
    return (
      <div style={{ minHeight: "100vh", background: T.appBg, color: T.text, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px", textAlign: "center", fontFamily: "Inter, system-ui, sans-serif" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Transcript no longer available</h1>
        <p style={{ color: T.muted, marginBottom: 24, maxWidth: 480 }}>This transcript has expired. Paste a link to start a new scan.</p>
        <button onClick={() => router.push("/")} style={{ background: "#fff", color: "#111", border: "none", borderRadius: 12, padding: "12px 24px", fontSize: 13, fontWeight: 500, cursor: "pointer" }}>
          Start a new scan
        </button>
      </div>
    );
  }

  return (
    <div className="landing-page transcript-page" style={{ display: "flex", flexDirection: "column", minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "Inter, system-ui, -apple-system, sans-serif", fontSize: 13 }}>
      <Header />
      <TranscriptResponsiveStyles />
      <TopBar router={router} title={video.title} upgrade={upgrade} />
      <div className="transcript-shell" style={{ padding: "16px 20px 32px", display: "flex", justifyContent: "center" }}>
        <div style={{ width: "100%", maxWidth: 1200 }}>
          <HeroCard video={video} upgrade={upgrade} />
          <div className="transcript-main-row" style={{ display: "flex", gap: 20, marginTop: 16, alignItems: "flex-start" }}>
            <MainPanel
              video={video}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              langOpen={langOpen}
              setLangOpen={setLangOpen}
              paragraphs={paragraphs}
              videoData={videoData}
              upgrade={upgrade}
            />
            <RightSidebar video={video} upgrade={upgrade} />
          </div>
        </div>
      </div>
      {upgradeShow && <DontMissOutModal show={upgradeShow} onHide={() => setUpgradeShow(false)} />}
    </div>
  );
}


// ── Top bar ──────────────────────────────────────────────────────────────────
function TopBar({ router, title, upgrade }) {
  return (
    <header className="transcript-topbar" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 16px", height: 52, flexShrink: 0, borderBottom: `1px solid ${T.border}`, background: T.bg }}>
      <div className="transcript-topbar-left" style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
        <button
          onClick={() => router.push("/")}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 8px", background: "transparent", border: "none", borderRadius: 8, color: T.muted, fontSize: 12, cursor: "pointer" }}
        >
          <ArrowLeft size={14} /> Back
        </button>
        <span className="transcript-topbar-divider" style={{ width: 1, height: 16, background: T.border }} />
        <span className="transcript-topbar-title" style={{ fontSize: 13, color: T.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 480 }}>{title}</span>
        <span className="transcript-topbar-pill" style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 6, background: "rgba(255,255,255,0.05)", color: T.muted, fontSize: 10 }}>Pro tip</span>
      </div>
      <div className="transcript-topbar-right" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <button
          onClick={upgrade}
          className="transcript-topbar-upgrade"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(0,184,178,0.12)", border: `1px solid rgba(0,184,178,0.25)`, color: T.accent, fontSize: 11, fontWeight: 500, cursor: "pointer" }}
        >
          <Zap size={12} /> <span className="transcript-topbar-upgrade-text">Upgrade your plan</span>
        </button>
        <button
          onClick={upgrade}
          className="transcript-topbar-chrome"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: `1px solid ${T.border}`, color: T.text, fontSize: 11, cursor: "pointer" }}
        >
          <img src="/figma-rows/Google_Chrome_Web_Store_icon_2015.svg.png" alt="" style={{ width: 14, height: 14, objectFit: "contain", display: "inline-block" }} />
          <span className="transcript-topbar-chrome-text">Install Chrome Extension</span>
        </button>
      </div>
    </header>
  );
}

// ── Hero card ────────────────────────────────────────────────────────────────
function HeroCard({ video, upgrade }) {
  return (
    <div className="transcript-hero" style={{ display: "flex", alignItems: "flex-start", gap: 20, padding: 20, borderRadius: 16, background: T.panelBg, border: `1px solid ${T.border}` }}>
      <div className="transcript-hero-thumb" style={{ position: "relative", flexShrink: 0, width: 100, aspectRatio: "9/16", borderRadius: 12, overflow: "hidden", background: "#000" }}>
        {video.thumbnail && (
          <img src={video.thumbnail} alt={video.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
        )}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.2)" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="13" height="13" viewBox="0 0 14 14"><path d="M3.5 2.5L11.5 7L3.5 11.5V2.5Z" fill="#111" /></svg>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, minWidth: 0, flex: 1 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <p style={{ color: T.text, fontWeight: 600, fontSize: 17, lineHeight: 1.3, margin: 0 }}>{video.title}</p>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 8px", borderRadius: 6, fontSize: 10, color: T.muted, background: "rgba(255,255,255,0.05)" }}>{video.platform}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {video.avatar && (
            <div style={{ width: 18, height: 18, borderRadius: "50%", overflow: "hidden", flexShrink: 0 }}>
              <img src={video.avatar} alt="creator" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          )}
          {video.creator && <span style={{ fontSize: 12, color: T.muted }}>{video.creator}</span>}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 16, rowGap: 4, fontSize: 11, color: T.muted }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Heart size={12} /> {video.likes} likes</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Clock size={12} /> {video.duration}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Globe size={12} /> {video.language}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Calendar size={12} /> {video.date}</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 16, rowGap: 4, fontSize: 11, color: T.muted }}>
          <span><strong style={{ color: T.text, fontWeight: 600 }}>{video.wordCount.toLocaleString()}</strong> words</span>
          <span><strong style={{ color: T.text, fontWeight: 600 }}>{video.charCount.toLocaleString()}</strong> characters</span>
          <span><strong style={{ color: T.text, fontWeight: 600 }}>{video.sentences}</strong> sentences</span>
          <span><strong style={{ color: T.text, fontWeight: 600 }}>{video.readability}</strong> Readability</span>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, paddingTop: 8 }}>
          <ActionButton onClick={upgrade} icon={<Download size={13} />} label="Download Video" />
          <ActionButton onClick={upgrade} icon={<Download size={13} />} label="Download HD Cover" />
          <ActionButton onClick={upgrade} icon={<Bookmark size={13} />} label="Save to Folder" />
        </div>
      </div>
    </div>
  );
}

function ActionButton({ icon, label, onClick }) {
  const bg = "rgba(255,255,255,0.08)";
  const hoverBg = "rgba(255,255,255,0.14)";
  return (
    <button
      onClick={onClick}
      style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px", borderRadius: 8, fontSize: 11.5, fontWeight: 500, color: T.text, background: bg, border: `1px solid ${T.border}`, cursor: "pointer", whiteSpace: "nowrap", transition: "background .15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = hoverBg; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = bg; }}
    >
      {icon}
      {label}
    </button>
  );
}

// ── Main panel (tabs + transcript) ───────────────────────────────────────────
function MainPanel({ video, activeTab, setActiveTab, langOpen, setLangOpen, paragraphs, videoData, upgrade }) {
  return (
    <div className="transcript-main-panel" style={{ flex: 1, minWidth: 0, borderRadius: 16, overflow: "hidden", background: T.panelBg, border: `1px solid ${T.border}` }}>
      {/* Tab bar */}
      <div style={{ display: "flex", alignItems: "center", borderBottom: `1px solid ${T.border}` }}>
        <div style={{ display: "flex" }}>
          {["transcript", "caption", "analytics", "prompts"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "12px 16px",
                fontSize: 12,
                textTransform: "capitalize",
                background: "none",
                border: "none",
                borderBottom: activeTab === tab ? `2px solid ${T.text}` : "2px solid transparent",
                color: activeTab === tab ? T.text : T.muted,
                fontWeight: activeTab === tab ? 600 : 400,
                cursor: "pointer",
                marginBottom: -1,
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 16px" }}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setLangOpen((o) => !o)}
              style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: T.muted, background: "none", border: "none", cursor: "pointer" }}
            >
              <RefreshCw size={12} /> Retranslate
              <ChevronDown size={12} style={{ transform: langOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
            </button>
            {langOpen && (
              <div style={{ position: "absolute", right: 0, top: "100%", marginTop: 8, width: 144, borderRadius: 12, overflow: "hidden", zIndex: 50, background: T.panelBg, border: `1px solid ${T.border}` }}>
                {["English", "Spanish", "French", "German", "Japanese", "Portuguese"].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => { setLangOpen(false); upgrade(); }}
                    style={{ width: "100%", textAlign: "left", padding: "8px 12px", fontSize: 11, color: T.muted, background: "none", border: "none", cursor: "pointer" }}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={upgrade}
            style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, color: T.muted, background: "none", border: "none", cursor: "pointer" }}
          >
            <Copy size={12} /> Copy
          </button>
        </div>
      </div>

      {/* Tab content */}
      <div style={{ position: "relative", padding: 20 }}>
        {activeTab === "transcript" && (
          <div style={{ borderRadius: 16, padding: 20, background: T.bg, border: `1px solid ${T.border}` }}>
            {paragraphs.length === 0 ? (
              <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.75, margin: 0 }}>Transcript not available for this video.</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {paragraphs.map((para, i) => (
                  <p key={i} style={{ fontSize: 11.5, color: "rgba(255,255,255,0.78)", lineHeight: 1.7, margin: 0 }}>{para}</p>
                ))}
              </div>
            )}
          </div>
        )}
        {activeTab === "caption" && <CaptionTab upgrade={upgrade} videoData={videoData} />}
        {activeTab === "analytics" && <AnalyticsTab upgrade={upgrade} video={video} />}
        {activeTab === "prompts" && <PromptsTab upgrade={upgrade} />}
      </div>
    </div>
  );
}

// ── Right sidebar ────────────────────────────────────────────────────────────
function RightSidebar({ video, upgrade }) {
  return (
    <div className="transcript-sidebar" style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: 16, width: 260 }}>
      {/* Download Transcript */}
      <div style={{ borderRadius: 16, padding: 16, background: T.panelBg, border: `1px solid ${T.border}` }}>
        <p style={{ fontSize: 12, marginTop: 0, marginBottom: 12, color: T.text, fontWeight: 600 }}>Download Transcript</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {DOWNLOAD_FORMATS.map((fmt) => (
            <button
              key={fmt.label}
              onClick={fmt.free ? undefined : upgrade}
              style={{ width: "100%", display: "inline-flex", alignItems: "center", gap: 8, padding: "10px 12px", borderRadius: 8, fontSize: 12, textAlign: "left", color: "#ffffff", background: "rgba(255,255,255,0.05)", border: `1px solid ${T.border}`, cursor: "pointer", transition: "background .15s, border-color .15s, transform .08s" }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.10)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = T.border; }}
              onMouseDown={(e) => { e.currentTarget.style.transform = "scale(0.98)"; }}
              onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              <Download size={14} style={{ flexShrink: 0, color: "#ffffff" }} />
              <span style={{ flex: 1, color: "#ffffff" }}>{fmt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* About the creator */}
      <div style={{ borderRadius: 16, padding: 16, background: T.panelBg, border: `1px solid ${T.border}` }}>
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, margin: 0, marginBottom: 12 }}>About the Creator</p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
          {video.avatar ? (
            <img src={video.avatar} alt={video.creator} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
          ) : (
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#3a3a3a" }} />
          )}
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: 13, color: T.text, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{video.creator || "Creator"}</div>
            <div style={{ fontSize: 11, color: T.muted }}>{video.platform}</div>
          </div>
        </div>
        <button
          onClick={upgrade}
          style={{ width: "100%", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "8px 0", borderRadius: 8, fontSize: 11, color: T.text, background: "rgba(255,255,255,0.05)", border: "none", cursor: "pointer" }}
        >
          <ExternalLink size={11} /> View all transcripts
        </button>
      </div>

      {/* Related Videos */}
      <div style={{ borderRadius: 16, padding: 16, background: T.panelBg, border: `1px solid ${T.border}` }}>
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, margin: 0, marginBottom: 12 }}>Related Videos</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {RELATED_VIDEOS.map((r, i) => (
            <button
              key={i}
              onClick={upgrade}
              style={{ display: "flex", gap: 10, alignItems: "flex-start", background: "transparent", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
            >
              <div style={{ width: 56, height: 80, borderRadius: 6, overflow: "hidden", flexShrink: 0, background: "#000" }}>
                <img src={r.thumb} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ fontSize: 11, color: T.text, fontWeight: 500, lineHeight: 1.35, marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{r.title}</div>
                <div style={{ fontSize: 10, color: T.muted, marginBottom: 2 }}>{r.creator}</div>
                <div style={{ fontSize: 10, color: T.muted, display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 3 }}><Eye size={9} /> {r.views}</span>
                  <span>{r.duration}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Locked overlays ──────────────────────────────────────────────────────────
function LockOverlay({ title, description, upgrade }) {
  return (
    <>
      <div style={{ position: "absolute", inset: "0 0 auto 0", height: 40, pointerEvents: "none", background: `linear-gradient(to bottom, ${T.panelBg}, transparent)` }} />
      <div style={{ position: "absolute", inset: "auto 0 0 0", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", paddingBottom: 20, paddingTop: 64, background: `linear-gradient(to top, ${T.panelBg} 60%, transparent)` }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, padding: "20px 24px", borderRadius: 16, textAlign: "center", background: T.cardBg, border: `1px solid ${T.border}`, maxWidth: 360 }}>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: 18, userSelect: "none" }}>🔒</span>
          </div>
          <div>
            <p style={{ fontSize: 12, marginBottom: 4, color: T.text, fontWeight: 600 }}>{title}</p>
            <p style={{ fontSize: 11, lineHeight: 1.55, color: T.muted, margin: 0 }}>{description}</p>
          </div>
          <button
            onClick={upgrade}
            style={{ width: "100%", padding: "8px 16px", borderRadius: 12, fontSize: 12, background: "#fff", color: "#111", fontWeight: 500, border: "none", cursor: "pointer" }}
          >
            Upgrade to unlock
          </button>
        </div>
      </div>
    </>
  );
}

// ── Caption tab — TikTok post caption (description + hashtags) ──────────────
function CaptionTab({ upgrade, videoData }) {
  const desc = (videoData?.data?.desc || "").trim();

  if (!desc) {
    return (
      <div style={{ borderRadius: 16, padding: 20, background: T.bg, border: `1px solid ${T.border}` }}>
        <p style={{ fontSize: 12, color: T.muted, lineHeight: 1.75, margin: 0 }}>This video has no caption.</p>
      </div>
    );
  }

  const tokens = desc.split(/(\s+)/);
  const hashtags = desc.match(/#[^\s#]+/g) || [];
  const body = desc.replace(/#[^\s#]+/g, "").replace(/\s+/g, " ").trim();
  const charCount = desc.length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ borderRadius: 16, padding: 20, background: T.bg, border: `1px solid ${T.border}` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600 }}>Post caption</span>
          <span style={{ fontSize: 10, color: T.muted }}>{charCount} chars</span>
        </div>
        <p style={{ fontSize: 13, color: T.text, lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
          {tokens.map((t, i) =>
            /^#\S+/.test(t)
              ? <span key={i} style={{ color: T.accent, fontWeight: 500 }}>{t}</span>
              : <span key={i}>{t}</span>
          )}
        </p>
      </div>

      {hashtags.length > 0 && (
        <div style={{ borderRadius: 16, padding: 20, background: T.bg, border: `1px solid ${T.border}` }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600 }}>Hashtags</span>
            <span style={{ fontSize: 10, color: T.muted }}>{hashtags.length} total</span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {hashtags.map((tag, i) => (
              <span key={i} style={{ fontSize: 11, padding: "4px 10px", borderRadius: 999, color: T.accent, background: "rgba(0,184,178,0.10)", border: "1px solid rgba(0,184,178,0.20)" }}>{tag}</span>
            ))}
          </div>
        </div>
      )}

      {body && (
        <div style={{ borderRadius: 16, padding: 20, background: T.bg, border: `1px solid ${T.border}` }}>
          <div style={{ marginBottom: 8 }}>
            <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600 }}>Caption (no hashtags)</span>
          </div>
          <p style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.65, margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{body}</p>
        </div>
      )}
    </div>
  );
}

// ── Analytics tab — basic stats free, advanced blurred ──────────────────────
function AnalyticsTab({ upgrade, video }) {
  const avgSentence = video.sentences > 0 ? Math.round(video.wordCount / video.sentences) : 0;
  const basic = [
    { label: "Words", value: video.wordCount.toLocaleString() },
    { label: "Readability", value: video.readability },
    { label: "Avg. sentence", value: `${avgSentence} words` },
    { label: "Sentences", value: String(video.sentences) },
  ];
  const performance = [
    { label: "Virality Score", value: "87 / 100", pct: 87 },
    { label: "Hook Strength", value: "Very Strong", pct: 92 },
    { label: "Pacing Score", value: "Fast", pct: 74 },
    { label: "Engagement Pred.", value: "High", pct: 81 },
  ];
  const keywords = ["pasta", "water", "garlic", "salt", "heat", "sauce", "boil", "timing", "golden"];
  const suggestions = [
    "Hook is in the top 10% for food education content.",
    'Consider a "pattern interrupt" around the 30-second mark.',
    "Short sentence bursts work well — keep them under 12 words.",
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, marginBottom: 10, marginTop: 0 }}>Basic stats</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {basic.map((s) => (
            <div key={s.label} style={{ borderRadius: 12, padding: "10px 12px", display: "flex", flexDirection: "column", gap: 2, background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 10, color: T.muted }}>{s.label}</span>
              <span style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, filter: "blur(6px)", opacity: 0.5, pointerEvents: "none", userSelect: "none" }}>
          <div>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, marginBottom: 12, marginTop: 0 }}>Performance analysis</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {performance.map((m) => (
                <div key={m.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 11, color: T.muted, minWidth: 120 }}>{m.label}</span>
                  <div style={{ flex: 1, height: 6, borderRadius: 3, overflow: "hidden", background: "rgba(255,255,255,0.08)" }}>
                    <div style={{ height: "100%", width: `${m.pct}%`, background: "rgba(255,255,255,0.5)" }} />
                  </div>
                  <span style={{ fontSize: 11, color: T.text, fontWeight: 500, minWidth: 72, textAlign: "right" }}>{m.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, marginBottom: 8, marginTop: 0 }}>Top keywords</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {keywords.map((kw) => (
                <span key={kw} style={{ padding: "2px 8px", borderRadius: 6, fontSize: 10, color: T.text, background: "rgba(255,255,255,0.06)" }}>{kw}</span>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, marginBottom: 8, marginTop: 0 }}>AI suggestions</p>
            <ul style={{ display: "flex", flexDirection: "column", gap: 6, listStyle: "none", padding: 0, margin: 0 }}>
              {suggestions.map((s) => (
                <li key={s} style={{ display: "flex", gap: 8, fontSize: 11, color: T.muted }}>
                  <span style={{ color: T.accent, flexShrink: 0 }}>→</span>{s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <LockOverlay
          upgrade={upgrade}
          title="Advanced analytics are locked"
          description="Unlock virality scoring, hook strength, pacing analysis, top keywords, and AI-powered suggestions."
        />
      </div>
    </div>
  );
}

// ── Prompts tab — 3 free fully visible, more locked below ───────────────────
function PromptsTab({ upgrade }) {
  const free = [
    { label: "Blog Post", icon: "✍️", preview: "Write a structured, SEO-friendly blog post based on this transcript. Include a compelling title, intro hook, 5 clearly defined sections with subheadings, and a conclusion with a CTA." },
    { label: "Newsletter Section", icon: "📬", preview: "Adapt this transcript into a conversational newsletter section. Keep it warm and direct. End with a teaser that makes readers want to watch the full video." },
    { label: "YouTube Script", icon: "🎬", preview: "Rewrite this transcript as a polished YouTube script with a strong hook (first 5 seconds), clear mid-section structure, and a compelling end-screen CTA." },
  ];
  const locked = [
    { label: "Twitter Thread", icon: "🧵", preview: "Convert this transcript into a viral 8-tweet thread with a strong opening hook and a CTA in the final tweet." },
    { label: "Instagram Carousel", icon: "🖼️", preview: "Break this transcript into a 7-slide carousel: hook, 5 takeaways, and a save/share CTA." },
    { label: "TikTok Hooks (×10)", icon: "🎯", preview: "Generate 10 alternate opening hooks rewriting the first 5 seconds for higher retention." },
    { label: "Email Sequence", icon: "📨", preview: "Turn this transcript into a 3-email nurture sequence with subject lines and CTAs." },
  ];

  const Card = ({ p, free }) => (
    <button
      onClick={free ? upgrade : upgrade}
      style={{ borderRadius: 12, padding: 16, display: "flex", flexDirection: "column", gap: 8, background: "rgba(255,255,255,0.04)", border: `1px solid ${T.border}`, textAlign: "left", cursor: "pointer", transition: "background .15s" }}
      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 16 }}>{p.icon}</span>
        <span style={{ fontSize: 12, color: T.text, fontWeight: 600 }}>{p.label}</span>
        {!free && <span style={{ marginLeft: "auto", fontSize: 10, padding: "1px 6px", borderRadius: 4, background: "rgba(0,184,178,0.15)", color: T.accent, fontWeight: 600 }}>PRO</span>}
      </div>
      <p style={{ fontSize: 11, lineHeight: 1.55, color: T.muted, margin: 0 }}>{p.preview}</p>
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, margin: 0 }}>Turn this transcript into content</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
        {free.map((p) => <Card key={p.label} p={p} free />)}
      </div>

      <p style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.09em", color: T.muted, fontWeight: 600, margin: 0, marginTop: 4 }}>More formats — Pro</p>
      <div style={{ position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, filter: "blur(4px)", opacity: 0.5, pointerEvents: "none", userSelect: "none" }}>
          {locked.map((p) => <Card key={p.label} p={p} free={false} />)}
        </div>
        <LockOverlay
          upgrade={upgrade}
          title={`${locked.length} more formats waiting`}
          description="Sign up to unlock all content formats — newsletters, scripts, hooks, and more."
        />
      </div>
    </div>
  );
}

function LockedTab({ title, description, upgrade }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "40px 24px", borderRadius: 16, textAlign: "center", background: T.cardBg, border: `1px solid ${T.border}` }}>
      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 18, userSelect: "none" }}>🔒</span>
      </div>
      <div>
        <p style={{ fontSize: 12, marginBottom: 6, color: T.text, fontWeight: 600 }}>{title}</p>
        <p style={{ fontSize: 11, lineHeight: 1.55, color: T.muted, maxWidth: 320, margin: 0 }}>{description}</p>
      </div>
      <button
        onClick={upgrade}
        style={{ padding: "8px 20px", borderRadius: 12, fontSize: 12, background: "#fff", color: "#111", fontWeight: 500, border: "none", cursor: "pointer" }}
      >
        Upgrade to unlock
      </button>
    </div>
  );
}

// ── Responsive overrides (tablet & mobile) ──────────────────────────────────
function TranscriptResponsiveStyles() {
  return (
    <style>{`
      /* Tablet (≤ 1023px): stack sidebar below main content */
      @media (max-width: 1023px) {
        .transcript-main-row {
          flex-direction: column !important;
          align-items: stretch !important;
        }
        .transcript-sidebar {
          width: 100% !important;
        }
        .transcript-shell {
          padding: 14px 16px 28px !important;
        }
        .transcript-topbar-chrome-text,
        .transcript-topbar-pill {
          display: none !important;
        }
        .transcript-topbar-upgrade,
        .transcript-topbar-chrome {
          white-space: nowrap;
          flex-shrink: 0;
        }
        .transcript-topbar-title {
          max-width: 240px !important;
        }
      }
      /* Mobile (≤ 640px): tighten everything */
      @media (max-width: 640px) {
        .transcript-shell {
          padding: 12px 12px 24px !important;
        }
        .transcript-topbar {
          padding: 0 10px !important;
          gap: 6px;
        }
        .transcript-topbar-divider,
        .transcript-topbar-pill,
        .transcript-topbar-upgrade-text {
          display: none !important;
        }
        .transcript-topbar-title {
          max-width: 38vw !important;
          font-size: 12px !important;
        }
        .transcript-topbar-right {
          gap: 6px !important;
        }
        .transcript-topbar-upgrade,
        .transcript-topbar-chrome {
          padding: 6px 8px !important;
        }
        .transcript-hero {
          flex-direction: column !important;
          padding: 14px !important;
          gap: 12px !important;
        }
        .transcript-hero-thumb {
          width: 100% !important;
          aspect-ratio: 16 / 10 !important;
        }
      }
    `}</style>
  );
}
