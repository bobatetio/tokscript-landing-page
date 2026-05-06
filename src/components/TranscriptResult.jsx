"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Copy,
  Download,
  Check,
  Languages,
  ChevronDown,
} from "lucide-react";

import aiHooksIcon from "../assets/images/icons/hooks-icon.svg";
import rewriteScriptsIcon from "../assets/images/icons/re-write-icon.svg";
import frameworkIcon from "../assets/images/icons/frame-icon.svg";
import copyLightIcon from "../assets/images/icons/copy-light-icon.svg";
import uploadIcon from "../assets/images/icons/export-icon-line.svg";

const T = {
  card: "#1c1c1c",
  pill: "#2a2a2a",
  pillBorder: "rgba(255,255,255,0.10)",
  text: "#ffffff",
  muted: "#888888",
  accent: "#00d4cc",
  accentSoft: "rgba(0,212,204,0.14)",
};

const TRANSLATE_LANGUAGES = [
  "English",
  "Portuguese (Brazil)",
  "Spanish",
  "Mandarin",
  "French",
  "German",
  "Arabic",
  "Hindi",
  "Japanese",
  "Korean",
  "Italian",
  "Russian",
  "Turkish",
  "Vietnamese",
  "Thai",
  "Indonesian",
];

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
    while (j < lines.length && lines[j].trim() !== "" && !lines[j].includes("-->")) {
      textLines.push(lines[j]);
      j += 1;
    }
    const text = textLines.join(" ").replace(/\s+/g, " ").trim();
    if (text && text !== "WEBVTT") cues.push({ time, text });
    i = j - 1;
  }
  return cues;
}

function AiButton({ icon, label, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1,
        minWidth: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: "12px 16px",
        borderRadius: 12,
        background: "#1f1f1f",
        border: "1px solid rgba(255,255,255,0.06)",
        color: T.text,
        fontSize: 13,
        fontWeight: 700,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.6 : 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis",
        transition: "background .15s, transform .08s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "#262626";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "#1f1f1f";
      }}
      onMouseDown={(e) => {
        if (!disabled) e.currentTarget.style.transform = "scale(0.99)";
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      <Image
        src={icon}
        alt=""
        width={16}
        height={16}
        style={{
          width: 16,
          height: 16,
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
      />
      {label}
    </button>
  );
}

function IconButton({ icon, onClick, disabled, ariaLabel, badge }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      style={{
        position: "relative",
        width: 30,
        height: 30,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: "transparent",
        border: "none",
        color: T.text,
        cursor: disabled ? "default" : "pointer",
        opacity: disabled ? 0.5 : 1,
        borderRadius: 8,
        transition: "background .15s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "transparent";
      }}
    >
      <Image
        src={icon}
        alt=""
        width={16}
        height={16}
        style={{
          width: 16,
          height: 16,
          objectFit: "contain",
          filter: "brightness(0) invert(1)",
        }}
      />
      {badge && (
        <span
          style={{
            position: "absolute",
            top: -28,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#333333",
            color: "#ffffff",
            padding: "4px 8px",
            borderRadius: 6,
            fontSize: 11,
            whiteSpace: "nowrap",
            zIndex: 100,
          }}
        >
          {badge}
        </span>
      )}
    </button>
  );
}

function PillButton({ icon, label, onClick, disabled, ghost = false, grow = false }) {
  const baseBg = ghost ? "transparent" : T.pill;
  const baseBorder = ghost ? "transparent" : T.pillBorder;
  const hoverBg = ghost ? "rgba(255,255,255,0.06)" : "#333333";
  const hoverBorder = ghost ? "transparent" : "rgba(255,255,255,0.18)";
  const textColor = ghost ? T.accent : T.text;
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
        borderRadius: 10,
        background: baseBg,
        border: `1px solid ${baseBorder}`,
        color: textColor,
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
      <span style={{ color: T.text, fontSize: 12, fontWeight: 500 }}>{label}</span>
    </span>
  );
}

function RetranslateDropdown({ value, onSelect, disabled }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={disabled}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "7px 10px",
          borderRadius: 10,
          background: "transparent",
          border: `1px solid transparent`,
          color: value ? T.accent : T.text,
          fontSize: 12,
          fontWeight: 500,
          cursor: disabled ? "default" : "pointer",
          opacity: disabled ? 0.6 : 1,
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => {
          if (disabled) return;
          e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        <Languages size={13} />
        <span>{value || "Retranslate"}</span>
        <ChevronDown
          size={12}
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform .15s",
          }}
        />
      </button>
      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            zIndex: 30,
            minWidth: 180,
            maxHeight: 240,
            overflowY: "auto",
            background: T.pill,
            border: `1px solid ${T.pillBorder}`,
            borderRadius: 10,
            padding: 4,
            boxShadow: "0 8px 24px rgba(0,0,0,0.45)",
          }}
        >
          {TRANSLATE_LANGUAGES.map((lang) => (
            <button
              key={lang}
              onClick={() => {
                onSelect?.(lang);
                setOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "7px 10px",
                background: value === lang ? "rgba(0,212,204,0.10)" : "transparent",
                border: "none",
                color: value === lang ? T.accent : T.text,
                fontSize: 12,
                fontWeight: value === lang ? 600 : 500,
                cursor: "pointer",
                borderRadius: 6,
              }}
              onMouseEnter={(e) => {
                if (value !== lang)
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
              }}
              onMouseLeave={(e) => {
                if (value !== lang)
                  e.currentTarget.style.background = "transparent";
              }}
            >
              {lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TranscriptResult({ videoData, upgrade }) {
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState(null);

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
            flex-wrap: wrap !important;
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
          }}
        >
          {/* ── Left: video frame ───────────────────────────────────────── */}
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

          {/* ── Right: AI section + toolbar + transcript ─────────────── */}
          <div
            className="transcript-result-transcript"
            style={{
              flex: 1,
              minWidth: 0,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              paddingTop: 14,
              paddingBottom: 14,
            }}
          >
            {/* 1. AI section header */}
            <div style={{ padding: "0 8px" }}>
              <span
                style={{
                  color: T.text,
                  fontSize: 13,
                  fontWeight: 500,
                }}
              >
                You can do more with{" "}
                <span style={{ color: T.accent, fontWeight: 700 }}>TokScript AI</span>
              </span>
            </div>

            {/* 2. AI action buttons — original .btn-style.cyan-light look */}
            <div
              className="transcript-result-actions"
              style={{
                display: "flex",
                gap: 10,
                padding: "0 8px",
              }}
            >
              <AiButton icon={aiHooksIcon} label="Write hooks" onClick={upgrade} />
              <AiButton
                icon={rewriteScriptsIcon}
                label="Rewrite scripts"
                onClick={upgrade}
              />
              <AiButton icon={frameworkIcon} label="Get framework" onClick={upgrade} />
            </div>

            {/* Divider above toolbar */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.08)",
                margin: "0 8px",
              }}
            />

            {/* 3. Toolbar — Show timestamp · Retranslate · Copy · Download */}
            <div
              className="transcript-result-toolbar"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
                padding: "0 8px",
              }}
            >
              <Toggle
                on={showTimestamp}
                onChange={setShowTimestamp}
                label="Show timestamp"
              />
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <RetranslateDropdown
                  value={language}
                  onSelect={(lang) => {
                    setLanguage(lang);
                    upgrade?.();
                  }}
                  disabled={!cues.length}
                />
                <IconButton
                  icon={copyLightIcon}
                  onClick={onCopy}
                  disabled={!transcriptText}
                  ariaLabel="Copy transcript"
                  badge={copied ? "Copied!" : null}
                />
                <IconButton
                  icon={uploadIcon}
                  onClick={onDownload}
                  disabled={!transcriptText}
                  ariaLabel="Download transcript"
                />
              </div>
            </div>

            {/* Divider below toolbar */}
            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.08)",
                margin: "0 8px",
                marginTop: -8,
              }}
            />

            {/* 4. Transcript body */}
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
                <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
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
                      {showTimestamp && (
                        <span
                          style={{
                            display: "inline-block",
                            minWidth: 38,
                            marginRight: 10,
                            color: T.muted,
                            fontVariantNumeric: "tabular-nums",
                            fontSize: 12,
                          }}
                        >
                          {c.time}
                        </span>
                      )}
                      {c.text}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
