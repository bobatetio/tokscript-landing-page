"use client";

import { useMemo, useState } from "react";
import {
  Copy,
  Download,
  Sparkles,
  RefreshCw,
  BarChart3,
  Check,
  Clock,
  Globe,
  Heart,
  Calendar,
  ExternalLink,
} from "lucide-react";

const T = {
  card: "#1c1c1c",
  pill: "#2a2a2a",
  pillBorder: "rgba(255,255,255,0.10)",
  text: "#ffffff",
  muted: "#888888",
  accent: "#00d4cc",
};

function parseCues(subtitles) {
  if (!subtitles || typeof subtitles !== "string") return [];
  const lines = subtitles.replace(/\r/g, "").split("\n");
  const cues = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!line.includes("-->")) continue;
    const [startRaw] = line.split("-->").map((t) => t.trim());
    const m = startRaw.match(
      /^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:[.,](\d{1,3}))?$/,
    );
    if (!m) continue;
    const h = m[3] ? Number(m[1]) : 0;
    const mm = m[3] ? Number(m[2]) : Number(m[1]);
    const ss = m[3] ? Number(m[3]) : Number(m[2]);
    const totalSec = h * 3600 + mm * 60 + ss;
    const minutes = Math.floor(totalSec / 60);
    const seconds = (totalSec % 60).toString().padStart(2, "0");
    const time = `${minutes}:${seconds}`;
    const textLines = [];
    let j = i + 1;
    while (
      j < lines.length &&
      lines[j].trim() !== "" &&
      !lines[j].includes("-->")
    ) {
      textLines.push(lines[j]);
      j += 1;
    }
    const text = textLines.join(" ").replace(/\s+/g, " ").trim();
    if (text && text !== "WEBVTT") cues.push({ time, text });
    i = j - 1;
  }
  return cues;
}

function PillButton({ icon, label, onClick, disabled, fullRound = false, grow = false, ghost = false }) {
  const baseBg = ghost ? "transparent" : T.pill;
  const baseBorder = ghost ? "transparent" : T.pillBorder;
  const hoverBg = ghost ? "rgba(255,255,255,0.06)" : "#333333";
  const hoverBorder = ghost ? "transparent" : "rgba(255,255,255,0.18)";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: grow ? 1 : "0 0 auto",
        minWidth: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        padding: "7px 8px",
        borderRadius: fullRound ? 999 : 10,
        background: baseBg,
        border: `1px solid ${baseBorder}`,
        color: ghost ? T.accent : T.text,
        fontSize: 12,
        fontWeight: ghost ? 700 : 500,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.6 : 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        transition: "background .15s, border-color .15s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = hoverBg;
        e.currentTarget.style.borderColor = hoverBorder;
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = baseBg;
        e.currentTarget.style.borderColor = baseBorder;
      }}
    >
      {icon}
      {label}
    </button>
  );
}

function Toggle({ on, onChange, label }) {
  return (
    <span
      onClick={() => onChange(!on)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        userSelect: "none",
      }}
    >
      <span
        style={{
          position: "relative",
          width: 28,
          height: 16,
          borderRadius: 999,
          background: on ? T.accent : "rgba(255,255,255,0.18)",
          transition: "background .2s",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 2,
            left: on ? 14 : 2,
            width: 12,
            height: 12,
            borderRadius: "50%",
            background: "#ffffff",
            transition: "left .2s",
          }}
        />
      </span>
      <span style={{ color: T.text, fontSize: 12, fontWeight: 500 }}>
        {label}
      </span>
    </span>
  );
}

export default function TranscriptResult({ videoData, upgrade }) {
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [copied, setCopied] = useState(false);

  const cues = useMemo(
    () => parseCues(videoData?.subtitles || ""),
    [videoData?.subtitles],
  );

  const cover =
    videoData?.data?.video?.cover ||
    videoData?.data?.video?.originCover ||
    "";
  const title = videoData?.data?.desc || "TikTok video";

  const transcriptText = useMemo(() => {
    if (!cues.length) return "";
    return cues
      .map((c) => (showTimestamp ? `[${c.time}] ${c.text}` : c.text))
      .join("\n");
  }, [cues, showTimestamp]);

  const author = videoData?.data?.author || {};
  const handle = author?.uniqueId ? `@${author.uniqueId}` : "@creator";
  const avatar = author?.avatarThumb || author?.avatarMedium || "";
  const durationSec = Number(videoData?.data?.video?.duration || 0);
  const durationLabel = `${Math.floor(durationSec / 60)}:${String(Math.floor(durationSec % 60)).padStart(2, "0")}`;
  const language = (videoData?.data?.textLanguage || "EN").toString().toUpperCase().slice(0, 2);
  const likes = Number(videoData?.data?.stats?.diggCount || 0);
  const formatCount = (n) => {
    if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
    if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  };
  const titleRaw = (videoData?.data?.desc || title || "Untitled video").trim();
  const titleClean =
    titleRaw.replace(/#\S+/g, "").replace(/\s+/g, " ").trim() || titleRaw;
  const createTime = Number(videoData?.data?.createTime || 0);
  const dateLabel = createTime
    ? new Date((createTime < 1e12 ? createTime * 1000 : createTime)).toLocaleDateString(
        "en-US",
        { year: "numeric", month: "short", day: "numeric" },
      )
    : "";

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(transcriptText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch (e) {
      console.error("Copy failed:", e);
    }
  };

  const onDownload = () => {
    if (!transcriptText) return;
    const blob = new Blob([transcriptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <style>{`
        @media (max-width: 900px) {
          .transcript-result {
            flex-direction: column !important;
            height: auto !important;
            padding: 12px !important;
            gap: 12px !important;
          }
          .transcript-result-video {
            width: 100% !important;
            height: auto !important;
            aspect-ratio: 16 / 11 !important;
          }
          .transcript-result-transcript {
            padding-top: 4px !important;
            padding-bottom: 4px !important;
          }
          .transcript-result-body {
            max-height: 360px;
          }
        }
        @media (max-width: 560px) {
          .transcript-result {
            border-radius: 18px !important;
          }
          .transcript-result-toolbar {
            gap: 0 !important;
          }
          .transcript-result-toolbar > button {
            padding: 7px 6px !important;
          }
          .transcript-result-actions {
            flex-direction: column;
          }
          .transcript-result-actions > button {
            width: 100%;
            flex: 1 1 auto;
          }
        }
      `}</style>
    <div
      className="transcript-result-wrap"
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: 32,
      }}
    >
      <div
        className="transcript-result"
        style={{
          width: "100%",
          maxWidth: 880,
          background: T.card,
          borderRadius: 28,
          padding: 16,
          display: "flex",
          gap: 16,
          alignItems: "stretch",
          height: 601,
        }}
      >
        {/* ── Video frame (inside the card) ─────────────────────────────── */}
        <div
          className="transcript-result-video"
          style={{
            position: "relative",
            flexShrink: 0,
            width: 320,
            height: 569,
            borderRadius: 18,
            overflow: "hidden",
            background: "#000",
          }}
        >
          {cover ? (
            <img
              src={cover}
              alt={title}
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          ) : (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(135deg, rgba(0,212,204,0.25), rgba(0,0,0,0.6))",
              }}
            />
          )}

          <div
            style={{
              position: "absolute",
              left: 10,
              right: 10,
              bottom: 10,
              display: "flex",
              gap: 8,
            }}
          >
            <button
              onClick={upgrade}
              style={{
                flex: 1,
                minWidth: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 8px",
                borderRadius: 10,
                background: "rgba(20,20,20,0.85)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: T.text,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Download size={12} />
              Save cover image
            </button>
            <button
              onClick={upgrade}
              style={{
                flex: 1,
                minWidth: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "7px 8px",
                borderRadius: 10,
                background: "rgba(20,20,20,0.85)",
                border: "1px solid rgba(255,255,255,0.10)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                color: T.text,
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              <Download size={12} />
              Download video
            </button>
          </div>
        </div>

        {/* ── Transcript section (no separate panel; flows in the card) ─── */}
        <div
          className="transcript-result-transcript"
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            gap: 16,
            paddingTop: 14,
            paddingBottom: 14,
          }}
        >
          {/* Toolbar */}
          <div
            className="transcript-result-toolbar"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              gap: 10,
              padding: "0 8px",
              marginTop: -6,
            }}
          >
              <PillButton
                icon={
                  copied ? (
                    <Check size={12} strokeWidth={2.75} style={{ color: T.accent }} />
                  ) : (
                    <Copy size={12} strokeWidth={2.75} />
                  )
                }
                label={copied ? "Copied" : "Copy"}
                onClick={onCopy}
                disabled={!transcriptText}
                ghost
              />
              <PillButton
                icon={<Download size={12} strokeWidth={2.75} />}
                label="Download"
                onClick={onDownload}
                disabled={!transcriptText}
                ghost
              />
          </div>

          {/* Divider */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.08)",
              margin: "0 8px",
              marginTop: -8,
            }}
          />

          {/* Body */}
          <div
            className="transcript-result-body"
            style={{
              flex: 1,
              padding: "8px 8px",
              overflowY: "auto",
              minHeight: 0,
            }}
          >
            {cues.length === 0 ? (
              <p
                style={{
                  color: T.muted,
                  fontSize: 16,
                  lineHeight: 1.7,
                  margin: 0,
                }}
              >
                No transcript available for this video.
              </p>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 22,
                }}
              >
                {cues.map((c, i) => (
                  <p
                    key={i}
                    style={{
                      margin: 0,
                      fontSize: 13,
                      lineHeight: 1.45,
                      color: T.text,
                    }}
                  >
                    {c.text}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Divider above action chips */}
          <div
            style={{
              height: 1,
              background: "rgba(255,255,255,0.08)",
              margin: "0 8px",
              marginBottom: -8,
            }}
          />

          {/* Action chips — same style as the video frame buttons */}
          <div
            className="transcript-result-actions"
            style={{
              display: "flex",
              gap: 10,
            }}
          >
            <PillButton
              icon={<Sparkles size={12} />}
              label="Create viral hooks"
              onClick={upgrade}
            />
            <PillButton
              icon={<RefreshCw size={12} />}
              label="Generate new script"
              onClick={upgrade}
            />
            <PillButton
              icon={<BarChart3 size={12} />}
              label="Analyze video"
              onClick={upgrade}
            />
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
