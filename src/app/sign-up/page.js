"use client";

// Full-page sign-up — modal contents flattened onto the page directly,
// no panel cards. A minimal auth top-bar (logo + "Already have an
// account? Sign In") replaces the full site nav. Submits are no-op;
// real auth lives on the dashboard. Element sizes mirror the modal
// exactly — only spacing is adjusted for the full-page layout.

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import tokscriptLogo from "../../assets/images/icons/logo.png";

const T = {
  outerBg: "#0d0d0d",
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

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
const FRAMES = [
  { key: "f1", image: `${BP}/figma-rows/Modal%20image%201.png`, caption: "Bulk transcribe up to 50 videos at once, drop the links in and get full transcripts back in seconds." },
  { key: "f2", image: `${BP}/figma-rows/Modal%20image%202.png`, caption: "Run AI-powered content audits by piping any creator's catalog straight into Claude or ChatGPT." },
  { key: "f3", image: `${BP}/figma-rows/Modal%20image%203.png`, caption: "Build a personal transcript library where every script you've pulled is searchable in one place." },
  { key: "f4", image: `${BP}/figma-rows/Modal%20image%204.png`, caption: "Transcribe from the address bar by prefixing any video URL with tokscript.com for instant scripts." },
  { key: "f5", image: `${BP}/figma-rows/Modal%20image%205.png`, caption: "Scrape and analyze straight from TikTok, grabbing transcripts and post data without leaving the app." },
];

function GoogleG() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

function FormField({ label, icon, type = "text", placeholder, value, onChange, autoComplete, trailing, name }) {
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
          gap: 8,
          padding: "9px 12px",
          borderRadius: 10,
          background: T.formInputBg,
          border: `1px solid ${T.formBorder}`,
        }}
      >
        <span style={{ color: T.formMuted, display: "inline-flex" }}>{icon}</span>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          className="auth-input"
          style={{
            flex: 1,
            background: "transparent",
            border: "none",
            outline: "none",
            color: T.formText,
            fontSize: 13,
            minWidth: 0,
          }}
        />
        {trailing}
      </div>
    </div>
  );
}

function CarouselFrame({ frame }) {
  return (
    <div
      key={frame.key}
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        animation: "authFadeIn 360ms ease-out",
        borderRadius: 12,
      }}
    >
      <img
        src={frame.image}
        alt=""
        loading="lazy"
        style={{ width: "100%", height: "auto", display: "block" }}
      />
    </div>
  );
}

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActiveIdx((i) => (i + 1) % FRAMES.length), 3500);
    return () => clearInterval(id);
  }, [paused]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Please fill in all fields.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (!agreed) return setError("Please accept the terms to continue.");
    setLoading(true);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        { name: email.split("@")[0], email, password },
      );
      // Auto-login after register
      const loginRes = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
        { email, password },
      );
      if (loginRes.data?.tokens && loginRes.data?.user) {
        const { accessToken, refreshToken } = loginRes.data.tokens;
        localStorage.setItem("authToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("user", JSON.stringify(loginRes.data.user));
        const next =
          typeof window !== "undefined" &&
          new URLSearchParams(window.location.search).get("next");
        window.location.href = next || "/";
        return;
      }
      setError("Account created. Please sign in.");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const onGoogleAuth = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/simple`;
  };

  return (
    <main className="auth-page">
      <style>{`
        @keyframes authFadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .auth-page {
          min-height: 100vh;
          background: ${T.outerBg};
          color: ${T.pitchText};
          display: flex;
          flex-direction: column;
        }
        .auth-topbar {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 36px;
          border-bottom: 1px solid ${T.pitchBorder};
          flex-shrink: 0;
        }
        .auth-topbar-right {
          display: flex; align-items: center; gap: 12px;
        }
        .auth-topbar-prompt {
          color: ${T.pitchMuted}; font-size: 13;
        }
        .auth-topbar-link {
          padding: 8px 16px;
          border-radius: 10px;
          border: 1px solid ${T.formBorder};
          color: ${T.formText};
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          background: transparent;
          transition: background .15s, border-color .15s;
        }
        .auth-topbar-link:hover { background: rgba(255,255,255,0.04); border-color: rgba(255,255,255,0.18); }
        .auth-body {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 48px 24px 56px;
          width: 100%;
        }
        .auth-pitch {
          display: flex; flex-direction: column; gap: 14px;
          min-width: 0;
          max-width: 560px;
          flex: 1 1 auto;
          align-items: flex-start;
          text-align: left;
        }
        .auth-form {
          display: flex; flex-direction: column; gap: 10px;
          min-width: 0;
          width: 100%;
          max-width: 360px;
          flex: 0 0 360px;
          background: #161616;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 16px;
          padding: 20px 20px;
          text-align: center;
          align-items: center;
        }
        .auth-form > * { width: 100%; }
        .auth-form .auth-input { text-align: left; }
        .auth-form label { text-align: left; }
        .auth-footer {
          display: flex; align-items: center; justify-content: center;
          gap: 10px;
          padding: 18px 24px 28px;
          border-top: 1px solid ${T.pitchBorder};
          flex-shrink: 0;
        }
        @media (max-width: 960px) {
          .auth-topbar { padding: 14px 18px; }
          .auth-body {
            flex-direction: column;
            gap: 32px;
            padding: 24px 18px 40px;
          }
          .auth-pitch, .auth-form { max-width: none; flex: 1 1 auto; }
          .auth-form { padding: 20px 18px; border-radius: 14px; }
          .auth-footer { padding: 16px 18px 22px; }
        }
      `}</style>

      {/* Minimal auth top bar — logo + (prompt) + auth-switch button */}
      <div className="auth-topbar">
        <Link href="/" aria-label="TokScript home" style={{ display: "inline-flex" }}>
          <Image src={tokscriptLogo} alt="TokScript" height={32} style={{ height: 32, width: "auto", display: "block" }} priority />
        </Link>
        <div className="auth-topbar-right">
          <span className="auth-topbar-prompt" style={{ fontSize: 13, color: T.pitchMuted }}>
            Already have an account?
          </span>
          <Link href="/signin" className="auth-topbar-link">Log In</Link>
        </div>
      </div>

      <div className="auth-body">
        {/* ── Form column (flat, no card) ── */}
        <div className="auth-form" role="region" aria-label="Create your account">
          <div>
            <h2
              style={{
                margin: 0,
                color: T.formText,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "-0.015em",
                lineHeight: 1.2,
              }}
            >
              Create Your Account
            </h2>
            <p style={{ margin: "8px 0 0", color: T.formMuted, fontSize: 14, lineHeight: 1.45 }}>
              One account. Pick your plan next.
            </p>
          </div>

          <button
            type="button"
            onClick={onGoogleAuth}
            style={{
              width: "100%",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "9px 12px",
              borderRadius: 10,
              background: T.formInputBg,
              border: `1px solid ${T.formBorder}`,
              color: T.formText,
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            <GoogleG />
            Continue With Google
          </button>

          <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.formMuted, fontSize: 11 }}>
            <span style={{ flex: 1, height: 1, background: T.formBorder }} />
            or
            <span style={{ flex: 1, height: 1, background: T.formBorder }} />
          </div>

          {error && (
            <div
              role="alert"
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "rgba(239,68,68,0.10)",
                border: "1px solid rgba(239,68,68,0.30)",
                color: "#fca5a5",
                fontSize: 13,
              }}
            >
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <FormField
              label="Email"
              icon={<Mail size={16} />}
              type="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <FormField
              label="Password"
              icon={<Lock size={16} />}
              type={showPw ? "text" : "password"}
              name="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              trailing={
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  tabIndex={-1}
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

            <label
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
                cursor: "pointer",
                userSelect: "none",
                marginTop: 2,
              }}
            >
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  position: "absolute",
                  width: 1, height: 1, padding: 0, margin: -1,
                  overflow: "hidden", clip: "rect(0,0,0,0)", border: 0,
                }}
              />
              <span
                aria-hidden
                style={{
                  width: 16, height: 16, borderRadius: 4,
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  background: agreed ? T.accent : "transparent",
                  border: `1px solid ${agreed ? T.accent : T.formBorder}`,
                  flexShrink: 0, marginTop: 2,
                }}
              >
                {agreed && (
                  <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                    <path d="M1 4L3.5 6.5L9 1" stroke="#0d0d0d" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
              <span style={{ fontSize: 12, lineHeight: 1.5, color: T.formMuted }}>
                I agree to the{" "}
                <Link
                  href="/terms"
                  style={{
                    color: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    fontFamily: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  style={{
                    color: "inherit",
                    fontSize: "inherit",
                    fontWeight: "inherit",
                    fontFamily: "inherit",
                    textDecoration: "underline",
                  }}
                >
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit"
              disabled={loading}
              style={{
                marginTop: 2,
                padding: "10px 14px",
                borderRadius: 10,
                background: T.formCtaBg,
                border: "none",
                color: T.formCtaText,
                fontSize: 13,
                fontWeight: 700,
                cursor: loading ? "default" : "pointer",
                opacity: loading ? 0.6 : 1,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
              }}
            >
              {loading ? "Creating account…" : "Continue"}
              <ArrowRight size={14} />
            </button>
          </form>
        </div>
      </div>

      <footer className="auth-footer">
        <div style={{ display: "inline-flex", flexShrink: 0 }}>
          {[12, 33, 51, 64].map((id, i) => (
            <img
              key={id}
              src={`https://i.pravatar.cc/64?img=${id}`}
              alt=""
              aria-hidden
              style={{
                width: 26, height: 26, borderRadius: "50%", objectFit: "cover",
                border: `2px solid ${T.outerBg}`,
                marginLeft: i === 0 ? 0 : -8,
              }}
            />
          ))}
        </div>
        <span style={{ color: T.pitchMuted, fontSize: 12, lineHeight: 1.5 }}>
          41K+ Users · 2.6M+ Transcripts · 4.2★ Rating
        </span>
      </footer>
    </main>
  );
}
