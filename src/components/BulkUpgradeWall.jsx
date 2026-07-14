"use client";

// UX-54 / deliverable 01b: the end-of-run upgrade wall.
// Fires once, at the end of a run, after results are on screen. Never for a paid
// plan. Guest and free are told two different things.
//
// Built on the SAME two-panel shell as the site paywall (DontMissOutModal):
// pitch on the left, the reused sign-up form on the right. Instead of the
// paywall's feature carousel, the left panel shows real thumbnails of the videos
// in this run, so the visitor sees exactly what they are unlocking.
// Example copy in place for review, final wording is Michael's.

import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Lock } from "lucide-react";
import "@/assets/scss/modal.scss";
import { DashboardAuthForm } from "@/components/modals/DontMissOutModal";

const T = {
  outerBg: "#0d0d0d",
  pitchText: "#ffffff",
  pitchMuted: "#9ca3af",
  pitchBorder: "rgba(255,255,255,0.08)",
  accent: "#00d4cc",
  accentSoft: "rgba(0,212,204,0.14)",
};

// Example copy in place for review. More explanatory wording, kept to two lines.
// Every number is spoken as a sentence, never a bare fraction.
function wallCopy(variant, openCount, lockedCount, total) {
  const headline = `Your first ${openCount} of ${total} transcripts are unlocked`;
  if (variant === "free") {
    return {
      eyebrow: "Daily limit reached",
      headline,
      sub: `The first ${openCount} are ready to read right now. The other ${lockedCount} are already transcribed and waiting until your free transcripts reset tomorrow.`,
    };
  }
  return {
    eyebrow: "Free preview unlocked",
    headline,
    sub: `The first ${openCount} are ready to read right now. The other ${lockedCount} are already transcribed and waiting behind a free account.`,
  };
}

// A 2x5 grid of real video thumbnails from the run, so the visitor sees exactly
// what they are signing up to unlock. Locked ones carry a lock; the last tile
// is a real thumbnail greyed out with a "+N more" count so it reads as pressing.
function ThumbStrip({ items, total }) {
  const withThumb = (items || []).filter((i) => i && i.thumbnail);
  if (withThumb.length === 0) return null;
  const shown = withThumb.slice(0, 10);
  const moreCount = Math.max(0, total - shown.length);

  const tile = {
    position: "relative",
    aspectRatio: "9 / 16",
    borderRadius: 8,
    overflow: "hidden",
    background: "#000",
    border: `1px solid ${T.pitchBorder}`,
  };
  const overlay = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 7, marginTop: 4 }}>
      {shown.map((item, i) => {
        const isMoreTile = i === shown.length - 1 && moreCount > 0;
        return (
          <span key={i} style={tile}>
            <img
              src={item.thumbnail}
              alt=""
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
                // The "+N" tile is greyed so it reads as "more behind this".
                filter: isMoreTile ? "grayscale(1) brightness(0.45)" : "none",
              }}
            />
            {isMoreTile ? (
              <span style={{ ...overlay, color: "#fff", fontWeight: 800, fontSize: 15 }}>
                +{moreCount}
              </span>
            ) : (
              item.status === "locked" && (
                <span style={{ ...overlay, background: "rgba(0,0,0,0.45)" }}>
                  <Lock size={14} style={{ color: "#fff" }} />
                </span>
              )
            )}
          </span>
        );
      })}
    </div>
  );
}

export default function BulkUpgradeWall({
  open,
  variant = "guest", // "guest" | "free"
  openCount = 0,
  lockedCount = 0,
  total = 0,
  items = [],
  onClose,
  onPrimary,
}) {
  const [authMode, setAuthMode] = useState("signup");
  const copy = wallCopy(variant, openCount, lockedCount, total);

  // Prototype auth: mark a mock user, then close and let the run unlock.
  const handleAuthSuccess = () => {
    try {
      window.localStorage.setItem("user", JSON.stringify({ email: "you@example.com", plan: "free" }));
    } catch (_) {}
    onPrimary?.();
    onClose?.();
  };

  return (
    <Modal
      show={!!open}
      onHide={onClose}
      size="lg"
      centered
      className="dont-miss-out-modal-v3 dont-miss-step-signup"
      backdropClassName="dont-miss-backdrop"
      aria-labelledby="bulk-upgrade-wall-title"
    >
      <Modal.Body style={{ padding: 0 }}>
        <div
          className="dont-miss-shell"
          style={{
            position: "relative",
            display: "flex",
            background: T.outerBg,
            borderRadius: 20,
            overflow: "hidden",
            height: "72vh",
            minHeight: 0,
          }}
        >
          {/* Soft swirl background + accent glows, reused from the paywall. */}
          <img
            className="dont-miss-bg-image"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/modal-bg-mobile.png`}
            alt=""
            aria-hidden
          />
          <div
            aria-hidden
            style={{
              position: "absolute", top: -120, left: -80, width: 320, height: 320,
              borderRadius: "50%", pointerEvents: "none", zIndex: 0,
              background: "radial-gradient(ellipse at center, rgba(0,212,204,0.20), transparent 65%)",
            }}
          />
          <div
            aria-hidden
            style={{
              position: "absolute", bottom: -120, right: -80, width: 320, height: 320,
              borderRadius: "50%", pointerEvents: "none", zIndex: 0,
              background: "radial-gradient(ellipse at center, rgba(0,212,204,0.20), transparent 65%)",
            }}
          />

          {/* ── Left: the pitch, with real thumbnails of this run ── */}
          <div
            className="dont-miss-pitch"
            style={{
              flex: "1 1 0",
              minWidth: 0,
              margin: "14px 7px 14px 14px",
              padding: "22px 24px 18px",
              display: "flex",
              flexDirection: "column",
              gap: 12,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div className="dont-miss-desktop-title">
              <span
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "5px 11px", borderRadius: 999,
                  background: T.accentSoft, border: `1px solid rgba(0,212,204,0.30)`,
                  color: T.accent, fontSize: 11, fontWeight: 700,
                  letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 12,
                }}
              >
                {copy.eyebrow}
              </span>
              <h2
                id="bulk-upgrade-wall-title"
                className="dont-miss-h2"
                style={{ margin: 0, color: T.pitchText, fontSize: 26, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.014em", textWrap: "balance" }}
              >
                {copy.headline}
              </h2>
              <p style={{ margin: "8px 0 0", color: T.pitchMuted, fontSize: 14, lineHeight: 1.45, textWrap: "pretty" }}>
                {copy.sub}
              </p>
            </div>

            {/* Thumbnails of the videos in this run. */}
            <ThumbStrip items={items} total={total} />

            {/* Avatar trust band, pinned to the bottom (reused from paywall). */}
            <div
              className="dont-miss-stats"
              style={{
                display: "flex", alignItems: "center", gap: 10,
                marginTop: "auto", paddingTop: 18, borderTop: `1px solid ${T.pitchBorder}`,
              }}
            >
              <div style={{ display: "inline-flex", alignItems: "center", flexShrink: 0 }}>
                {[12, 33, 51, 64].map((id, i) => (
                  <img
                    key={id}
                    src={`https://i.pravatar.cc/64?img=${id}`}
                    alt=""
                    aria-hidden
                    style={{
                      width: 26, height: 26, borderRadius: "50%", objectFit: "cover",
                      border: `2px solid ${T.outerBg}`, marginLeft: i === 0 ? 0 : -8,
                    }}
                  />
                ))}
              </div>
              <span style={{ color: T.pitchMuted, fontSize: 12, lineHeight: 1.5 }}>
                41K+ users · 4.2 star rating
              </span>
            </div>
          </div>

          {/* ── Right: the reused sign-up form ── */}
          <DashboardAuthForm
            mode={authMode}
            onSwitchMode={setAuthMode}
            onAuthSuccess={handleAuthSuccess}
            signupTitle="Sign up to continue"
            loginTitle="Sign in to continue"
          />
        </div>
      </Modal.Body>
    </Modal>
  );
}
