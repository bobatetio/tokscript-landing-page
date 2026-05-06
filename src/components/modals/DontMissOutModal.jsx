"use client";

import "@/assets/scss/modal.scss";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
} from "lucide-react";

const T = {
  outerBg: "#0d0d0d",
  formBg: "#161616",
  formText: "#ffffff",
  formMuted: "#9ca3af",
  formBorder: "rgba(255,255,255,0.10)",
  formInputBg: "#1c1c1c",
  formCtaBg: "#ffffff",
  formCtaText: "#0d0d0d",
  pitchText: "#ffffff",
  pitchMuted: "#9ca3af",
  pitchBorder: "rgba(255,255,255,0.08)",
  accent: "#00d4cc",
  accentSoft: "rgba(0,212,204,0.14)",
};

function FormField({ label, icon, type = "text", placeholder, value, onChange, trailing }) {
  return (
    <div>
      <label
        style={{
          display: "block",
          color: T.formText,
          fontSize: 11,
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 14px",
          borderRadius: 12,
          background: T.formInputBg,
          border: `1px solid ${T.formBorder}`,
        }}
      >
        <span style={{ color: T.formMuted, display: "inline-flex" }}>{icon}</span>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: T.formText,
            fontSize: 14,
            minWidth: 0,
          }}
        />
        {trailing}
      </div>
    </div>
  );
}

function FeatureLine({ children }) {
  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        color: T.pitchText,
        fontSize: 13.5,
        lineHeight: 1.4,
      }}
    >
      <span
        style={{
          flexShrink: 0,
          width: 20,
          height: 20,
          borderRadius: "50%",
          background: T.accentSoft,
          border: `1px solid rgba(0,212,204,0.30)`,
          color: T.accent,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Check size={11} strokeWidth={3} />
      </span>
      {children}
    </li>
  );
}

const PROOF_AVATARS = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face",
];

const PRO_FEATURES = [
  "Unlimited transcripts & bulk downloads",
  "Unlimited translations",
  "Bulk import 50 video links at once",
  "Instagram Reels & YouTube Shorts (unlimited)",
  "Download HD videos (no watermark) + Cover Images",
  "Download TikTok Collections & Playlists",
  "Chrome Extension with all Pro Features",
  "Quick URL method: just add tokscript.com/",
  "Export in multiple formats: .txt, .xml, .json, .csv",
];

const PRICING_TIERS = [
  { name: "Free", price: "$0", period: "/forever" },
  { name: "Monthly", price: "$10", period: "/month" },
  { name: "Annual", price: "$39", period: "/year", badge: "Save $81" },
];

function TierBox({ tier, highlighted }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 0,
        padding: "12px 12px",
        borderRadius: 12,
        background: highlighted ? T.accentSoft : "rgba(255,255,255,0.04)",
        border: `1px solid ${highlighted ? "rgba(0,212,204,0.40)" : T.pitchBorder}`,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        position: "relative",
      }}
    >
      {tier.badge && (
        <span
          style={{
            position: "absolute",
            top: -8,
            right: 8,
            padding: "2px 7px",
            borderRadius: 999,
            background: T.accent,
            color: "#0d0d0d",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {tier.badge}
        </span>
      )}
      <span
        style={{
          color: T.pitchMuted,
          fontSize: 11,
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {tier.name}
      </span>
      <span style={{ display: "inline-flex", alignItems: "baseline", gap: 2 }}>
        <span
          style={{
            color: T.pitchText,
            fontSize: 20,
            fontWeight: 700,
            lineHeight: 1,
            letterSpacing: "-0.01em",
          }}
        >
          {tier.price}
        </span>
        <span style={{ color: T.pitchMuted, fontSize: 11 }}>{tier.period}</span>
      </span>
    </div>
  );
}

export default function DontMissOutModal({ show, onHide, t }) {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const onSubmit = (e) => {
    e?.preventDefault?.();
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    const dest = `/app/sign-up${params.toString() ? `?${params.toString()}` : ""}`;
    if (typeof window !== "undefined") window.location.href = dest;
    onHide?.();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className="dont-miss-out-modal-v3"
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
            minHeight: 600,
          }}
        >
          {/* Accent glow on the left side */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              top: -120,
              left: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(0,212,204,0.20), transparent 65%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          {/* Close */}
          <button
            onClick={onHide}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 18,
              right: 18,
              width: 30,
              height: 30,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: `1px solid ${T.formBorder}`,
              color: T.pitchText,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 5,
            }}
          >
            <X size={14} />
          </button>

          {/* ── Left: pitch (sits on the outer dark bg, no separate panel) ── */}
          <div
            className="dont-miss-pitch"
            style={{
              flex: "1 1 0",
              minWidth: 0,
              padding: "34px 32px 28px",
              display: "flex",
              flexDirection: "column",
              gap: 22,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 11px",
                  borderRadius: 999,
                  background: T.accentSoft,
                  border: `1px solid rgba(0,212,204,0.30)`,
                  color: T.accent,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Pro
              </span>
              <h2
                style={{
                  margin: 0,
                  color: T.pitchText,
                  fontSize: 26,
                  fontWeight: 700,
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                }}
              >
                {t?.dontMissOutModal?.title || "You've Hit Your Free Limit"}
              </h2>
              <p
                style={{
                  marginTop: 10,
                  marginBottom: 0,
                  color: T.pitchMuted,
                  fontSize: 14,
                  lineHeight: 1.5,
                }}
              >
                {t?.dontMissOutModal?.subtitle ||
                  "Upgrade to keep researching without the daily cap."}
              </p>
            </div>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 11,
              }}
            >
              {PRO_FEATURES.map((label) => (
                <FeatureLine key={label}>{label}</FeatureLine>
              ))}
            </ul>

            <div
              style={{
                display: "flex",
                gap: 8,
                marginTop: 4,
              }}
            >
              {PRICING_TIERS.map((tier) => (
                <TierBox
                  key={tier.name}
                  tier={tier}
                  highlighted={tier.name === "Annual"}
                />
              ))}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
                paddingTop: 18,
                borderTop: `1px solid ${T.pitchBorder}`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <div style={{ display: "inline-flex", alignItems: "center" }}>
                  {PROOF_AVATARS.map((src, i) => (
                    <img
                      key={src}
                      src={src}
                      alt=""
                      style={{
                        width: 26,
                        height: 26,
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: `2px solid ${T.outerBg}`,
                        marginLeft: i === 0 ? 0 : -8,
                      }}
                    />
                  ))}
                </div>
                <span
                  style={{
                    color: T.pitchMuted,
                    fontSize: 11.5,
                    lineHeight: 1.4,
                  }}
                >
                  41K+ Users Have Processed More Than 2.6M Videos So Far
                </span>
              </div>
            </div>
          </div>

          {/* ── Right: dark form panel (inset with rounded corners) ───── */}
          <div
            className="dont-miss-form"
            style={{
              width: 380,
              flexShrink: 0,
              margin: "16px 16px 16px 0",
              padding: "30px 28px 24px",
              background: T.formBg,
              borderRadius: 18,
              border: `1px solid ${T.formBorder}`,
              display: "flex",
              flexDirection: "column",
              gap: 14,
              position: "relative",
              zIndex: 2,
            }}
          >
            <div>
              <h3
                style={{
                  margin: 0,
                  color: T.formText,
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: "-0.005em",
                }}
              >
                Create your account
              </h3>
            </div>

            <form
              onSubmit={onSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <FormField
                label="Email"
                icon={<Mail size={16} />}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FormField
                label="Password"
                icon={<Lock size={16} />}
                type={showPw ? "text" : "password"}
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                trailing={
                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    aria-label={showPw ? "Hide password" : "Show password"}
                    style={{
                      background: "none",
                      border: "none",
                      color: T.formMuted,
                      cursor: "pointer",
                      display: "inline-flex",
                      padding: 0,
                    }}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                }
              />

              <button
                type="submit"
                style={{
                  marginTop: 4,
                  padding: "13px 16px",
                  borderRadius: 12,
                  background: T.formCtaBg,
                  border: "none",
                  color: T.formCtaText,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  transition: "transform .08s, opacity .15s",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "scale(0.99)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                {user && user?.plan && user.plan !== "free"
                  ? "Access dashboard"
                  : user && user?.plan === "free"
                  ? "Upgrade now"
                  : "Get Started"}
              </button>
            </form>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                color: T.formMuted,
                fontSize: 11,
              }}
            >
              <span style={{ flex: 1, height: 1, background: T.formBorder }} />
              or
              <span style={{ flex: 1, height: 1, background: T.formBorder }} />
            </div>

            <a
              href="/app/sign-up"
              onClick={onHide}
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "12px 16px",
                borderRadius: 12,
                background: T.formInputBg,
                border: `1px solid ${T.formBorder}`,
                color: T.formText,
                fontSize: 13.5,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              <GoogleG />
              Continue with Google
            </a>

            <div style={{ flex: 1 }} />

            <p
              style={{
                margin: 0,
                textAlign: "center",
                color: T.formMuted,
                fontSize: 12.5,
              }}
            >
              Already have an account?{" "}
              <Link
                href="/app/login"
                onClick={onHide}
                style={{
                  color: T.formText,
                  fontWeight: 700,
                  textDecoration: "none",
                }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.6 12.227c0-.709-.064-1.39-.182-2.045H12v3.868h5.382a4.6 4.6 0 0 1-1.995 3.018v2.51h3.232c1.891-1.741 2.981-4.305 2.981-7.351z"
        fill="#4285F4"
      />
      <path
        d="M12 22c2.7 0 4.964-.895 6.619-2.422l-3.232-2.51c-.895.6-2.04.955-3.387.955-2.605 0-4.81-1.76-5.595-4.123H3.064v2.59A9.997 9.997 0 0 0 12 22z"
        fill="#34A853"
      />
      <path
        d="M6.405 13.9A6.001 6.001 0 0 1 6.09 12c0-.66.114-1.302.314-1.9V7.51H3.064A9.997 9.997 0 0 0 2 12c0 1.614.386 3.14 1.064 4.49l3.341-2.59z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C16.96 3.044 14.696 2 12 2A9.997 9.997 0 0 0 3.064 7.51l3.341 2.59C7.19 7.737 9.395 5.977 12 5.977z"
        fill="#EA4335"
      />
    </svg>
  );
}
