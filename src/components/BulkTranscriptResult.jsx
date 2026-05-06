"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import {
  Search,
  Download,
  Layers,
  Check,
  Clock,
  Copy,
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
  panel: "#161616",
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

function StatusIcon({ status }) {
  if (status === "complete")
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: T.accent,
          fontSize: 11,
          fontWeight: 600,
        }}
      >
        <Check size={11} strokeWidth={3} />
        Complete
      </span>
    );
  if (status === "processing" || status === "pending")
    return (
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 4,
          color: T.muted,
          fontSize: 11,
          fontWeight: 500,
        }}
      >
        <Clock size={11} />
        In Progress…
      </span>
    );
  if (status === "unavailable" || status === "failed")
    return (
      <span style={{ color: T.muted, fontSize: 11 }}>No Transcript Available</span>
    );
  return null;
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
        transition: "background .15s",
      }}
      onMouseEnter={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "#262626";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        e.currentTarget.style.background = "#1f1f1f";
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
          border: "1px solid transparent",
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

function formatDur(d) {
  if (!d) return "";
  const num = parseFloat(String(d).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(num)) return String(d);
  const total = Math.round(num);
  const m = Math.floor(total / 60);
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function BulkListItem({ item, isSelected, onClick }) {
  const isComplete = item.status === "complete";
  const isProcessing = item.status === "processing" || item.status === "pending";
  return (
    <button
      onClick={onClick}
      disabled={!isComplete}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 8,
        borderRadius: 10,
        background: isSelected ? "rgba(0,212,204,0.10)" : "transparent",
        border: `1px solid ${isSelected ? "rgba(0,212,204,0.30)" : "transparent"}`,
        color: T.text,
        cursor: isComplete ? "pointer" : "default",
        opacity: isComplete ? 1 : 0.7,
        textAlign: "left",
        width: "100%",
        transition: "background .15s, border-color .15s",
      }}
      onMouseEnter={(e) => {
        if (!isComplete || isSelected) return;
        e.currentTarget.style.background = "rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        if (!isComplete || isSelected) return;
        e.currentTarget.style.background = "transparent";
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 38,
          height: 38,
          borderRadius: 8,
          overflow: "hidden",
          background: "#0a0a0a",
          position: "relative",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {item.thumbnail ? (
          <img
            src={item.thumbnail}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <Clock size={14} style={{ color: T.muted }} />
        )}
      </span>
      <span style={{ minWidth: 0, flex: 1 }}>
        <span
          style={{
            display: "block",
            fontSize: 12,
            fontWeight: 600,
            color: T.text,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {item.title || item.sourceUrl || "Untitled video"}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
          {item.duration && (
            <span style={{ color: T.muted, fontSize: 10.5 }}>
              {formatDur(item.duration)} duration
            </span>
          )}
          <StatusIcon status={item.status} />
        </span>
      </span>
      {isComplete && (
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <Image
            src={copyLightIcon}
            alt=""
            width={14}
            height={14}
            style={{
              width: 14,
              height: 14,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              opacity: 0.7,
            }}
          />
          <Image
            src={uploadIcon}
            alt=""
            width={14}
            height={14}
            style={{
              width: 14,
              height: 14,
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              opacity: 0.7,
            }}
          />
        </span>
      )}
    </button>
  );
}

export default function BulkTranscriptResult({
  bulkData,
  selectedItem,
  selectedIndex,
  onItemClick,
  isProcessing,
  processingUrls = [],
  upgrade,
}) {
  const [showTimestamp, setShowTimestamp] = useState(true);
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("total");

  const bulkItems = bulkData?.transcript?.bulkItems || [];
  const displayItems =
    bulkItems.length > 0
      ? bulkItems
      : isProcessing && processingUrls.length > 0
      ? processingUrls.map((url) => ({
          sourceUrl: url,
          status: "processing",
          transcript: null,
          title: null,
          duration: null,
          thumbnail: null,
          username: null,
        }))
      : [];

  const summary = bulkData?.summary || {};
  const total = summary.total || displayItems.length || 0;
  const completed =
    summary.completed ||
    displayItems.filter((i) => i.status === "complete").length;
  const unavailable =
    (summary.unavailable || displayItems.filter((i) => i.status === "unavailable").length) +
    (summary.failed || displayItems.filter((i) => i.status === "failed").length);

  const filteredItems = displayItems.filter((item) => {
    if (activeTab === "completed" && item.status !== "complete") return false;
    if (
      activeTab === "unavailable" &&
      item.status !== "unavailable" &&
      item.status !== "failed"
    )
      return false;
    if (!searchTerm) return true;
    const term = searchTerm.toLowerCase();
    return (
      item.title?.toLowerCase().includes(term) ||
      item.sourceUrl?.toLowerCase().includes(term) ||
      item.username?.toLowerCase().includes(term)
    );
  });

  const cues = useMemo(
    () => parseCues(selectedItem?.transcript || ""),
    [selectedItem?.transcript],
  );

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

  const cover =
    selectedItem?.thumbnail || displayItems.find((i) => i.thumbnail)?.thumbnail || "";
  const title = selectedItem?.title || "";
  const completedFraction = total > 0 ? `${completed}/${total} Videos` : "";
  const progressPct = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <>
      <style>{`
        @media (max-width: 1100px) {
          .bulk-transcript-result {
            flex-direction: column !important;
            height: auto !important;
            padding: 12px !important;
            gap: 12px !important;
          }
          .bulk-transcript-list,
          .bulk-transcript-video,
          .bulk-transcript-transcript {
            width: 100% !important;
            height: auto !important;
          }
          .bulk-transcript-video {
            aspect-ratio: 16 / 11 !important;
          }
          .bulk-transcript-list {
            max-height: 380px;
          }
        }
        @media (max-width: 560px) {
          .bulk-transcript-result {
            border-radius: 18px !important;
          }
        }
      `}</style>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: 32,
        }}
      >
        <div
          className="bulk-transcript-result"
          style={{
            width: "100%",
            maxWidth: 1200,
            background: T.card,
            borderRadius: 28,
            padding: 16,
            display: "flex",
            gap: 16,
            alignItems: "stretch",
          }}
        >
          {/* ── Left: bulk list ────────────────────────────────────────── */}
          <aside
            className="bulk-transcript-list"
            style={{
              flexShrink: 0,
              width: 300,
              height: 569,
              borderRadius: 18,
              background: T.panel,
              border: `1px solid ${T.pillBorder}`,
              padding: 14,
              display: "flex",
              flexDirection: "column",
              gap: 12,
              overflow: "hidden",
            }}
          >
            {/* Progress header */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ color: T.text, fontSize: 13, fontWeight: 600 }}>
                  {isProcessing ? "Processing" : "Processed"}
                </span>
                <span style={{ color: T.muted, fontSize: 12, fontWeight: 500 }}>
                  {completedFraction}
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  borderRadius: 4,
                  background: "rgba(255,255,255,0.08)",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: `${progressPct}%`,
                    height: "100%",
                    background: T.accent,
                    transition: "width .3s",
                  }}
                />
              </div>
            </div>

            {/* Search */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 10px",
                borderRadius: 10,
                background: "#0f0f0f",
                border: `1px solid ${T.pillBorder}`,
              }}
            >
              <Search size={13} style={{ color: T.muted }} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search transcripts..."
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  outline: "none",
                  color: T.text,
                  fontSize: 12,
                  minWidth: 0,
                }}
              />
              <IconButton
                icon={uploadIcon}
                onClick={upgrade}
                ariaLabel="Export bulk"
              />
            </div>

            {/* Tabs */}
            <div
              style={{
                display: "flex",
                gap: 4,
                flexShrink: 0,
                flexWrap: "nowrap",
                width: "100%",
              }}
            >
              {[
                { id: "total", label: "Total", count: total },
                { id: "completed", label: "Completed", count: completed },
                { id: "unavailable", label: "Unavailable", count: unavailable },
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      flex: "1 1 0",
                      minWidth: 0,
                      padding: "5px 4px",
                      borderRadius: 8,
                      background: isActive ? T.pill : "transparent",
                      border: `1px solid ${isActive ? T.pillBorder : "transparent"}`,
                      color: isActive ? T.text : T.muted,
                      fontSize: 11,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    {tab.label} ({tab.count})
                  </button>
                );
              })}
            </div>

            {/* Bulk upload card */}
            {total > 0 && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: 10,
                  borderRadius: 10,
                  background: "rgba(0,212,204,0.06)",
                  border: `1px solid rgba(0,212,204,0.20)`,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    flexShrink: 0,
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    background: T.accentSoft,
                    color: T.accent,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Layers size={16} />
                </span>
                <span style={{ minWidth: 0, flex: 1 }}>
                  <span
                    style={{
                      display: "block",
                      color: T.text,
                      fontSize: 12,
                      fontWeight: 700,
                    }}
                  >
                    Bulk upload · {total} videos
                  </span>
                  <span
                    style={{
                      display: "block",
                      color: T.muted,
                      fontSize: 11,
                    }}
                  >
                    {isProcessing ? "Loading..." : "Ready"}
                  </span>
                </span>
              </div>
            )}

            {/* Items */}
            <div
              style={{
                flex: 1,
                minHeight: 0,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                marginInline: -4,
                paddingInline: 4,
              }}
            >
              {filteredItems.length === 0 ? (
                <p
                  style={{
                    color: T.muted,
                    fontSize: 12,
                    textAlign: "center",
                    padding: "16px 0",
                    margin: 0,
                  }}
                >
                  No items
                </p>
              ) : (
                filteredItems.map((item, i) => {
                  const idx = displayItems.indexOf(item);
                  return (
                    <BulkListItem
                      key={`${item.sourceUrl}-${i}`}
                      item={item}
                      isSelected={idx === selectedIndex}
                      onClick={() => onItemClick?.(item, idx)}
                    />
                  );
                })
              )}
            </div>
          </aside>

          {/* ── Middle: video frame ──────────────────────────────────── */}
          <div
            className="bulk-transcript-video"
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
              {[
                { icon: <Download size={12} />, label: "Save cover image" },
                { icon: <Download size={12} />, label: "Download video" },
              ].map((b) => (
                <button
                  key={b.label}
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
                  {b.icon}
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Right: AI section + toolbar + transcript ─────────────── */}
          <div
            className="bulk-transcript-transcript"
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
            <div style={{ padding: "0 8px" }}>
              <span style={{ color: T.text, fontSize: 13, fontWeight: 500 }}>
                You can do more with{" "}
                <span style={{ color: T.accent, fontWeight: 700 }}>TokScript AI</span>
              </span>
            </div>

            <div style={{ display: "flex", gap: 10, padding: "0 8px" }}>
              <AiButton icon={aiHooksIcon} label="Write hooks" onClick={upgrade} />
              <AiButton
                icon={rewriteScriptsIcon}
                label="Rewrite scripts"
                onClick={upgrade}
              />
              <AiButton icon={frameworkIcon} label="Get framework" onClick={upgrade} />
            </div>

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.08)",
                margin: "0 8px",
              }}
            />

            <div
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

            <div
              style={{
                height: 1,
                background: "rgba(255,255,255,0.08)",
                margin: "0 8px",
                marginTop: -8,
              }}
            />

            <div
              style={{
                flex: 1,
                padding: "8px 8px",
                overflowY: "auto",
                minHeight: 0,
              }}
            >
              {!selectedItem ? (
                <p style={{ color: T.muted, fontSize: 13, lineHeight: 1.7, margin: 0 }}>
                  Select a completed video on the left to view its transcript.
                </p>
              ) : cues.length === 0 ? (
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
