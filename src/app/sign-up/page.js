"use client";

// Sign-up page — ported verbatim (UI only) from the v3 dashboard's
// SignUpPage component (/Users/bob/Documents/tokscript/tokscriptv3-dashboard/
// src/app/components/SignUpPage.tsx). Tailwind utility classes from the
// original are expanded to inline styles so the landing-site bundle
// (which doesn't ship Tailwind) renders identically. Dark-mode only.
// Submits are no-ops; real auth lives on the dashboard.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import tokscriptLogo from "../../assets/images/icons/logo.png";

const THEME = {
  bg: "#0d0d0d",
  cardBg: "#141414",
  border: "#262626",
  text: "#ffffff",
  muted: "#888888",
  inputBg: "#0d0d0d",
  accent: "#00F2EA",
  submitBg: "#ffffff",
  submitText: "#111111",
  submitHoverBg: "#e8e8e8",
};

function GoogleSvg() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853" />
      <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
    </svg>
  );
}

function AuthInput({ icon, type = "text", placeholder, value, onChange, autoComplete, trailing, borderOverride }) {
  return (
    <div style={{ position: "relative" }}>
      <span
        aria-hidden
        style={{
          position: "absolute",
          left: 12,
          top: "50%",
          transform: "translateY(-50%)",
          color: THEME.muted,
          display: "inline-flex",
          alignItems: "center",
        }}
      >
        {icon}
      </span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          padding: trailing ? "12px 40px 12px 40px" : "12px 16px 12px 40px",
          borderRadius: 12,
          border: `1px solid ${borderOverride || THEME.border}`,
          background: THEME.inputBg,
          color: THEME.text,
          fontSize: 14,
          outline: "none",
          fontFamily: "inherit",
        }}
      />
      {trailing && (
        <span
          style={{
            position: "absolute",
            right: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: THEME.muted,
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          {trailing}
        </span>
      )}
    </div>
  );
}

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const passwordStrength = (pw) => {
    if (!pw) return null;
    if (pw.length < 6) return { label: "Weak", color: "#ef4444", width: "33%" };
    if (pw.length < 10 || !/[A-Z]/.test(pw) || !/[0-9]/.test(pw))
      return { label: "Fair", color: "#f59e0b", width: "66%" };
    return { label: "Strong", color: "#22c55e", width: "100%" };
  };
  const strength = passwordStrength(password);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (!agreed) {
      setError("Please accept the terms to continue.");
      return;
    }
    setLoading(true);
    setTimeout(() => setLoading(false), 1400);
  };

  const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";

  return (
    <>
      <main
        style={{
          minHeight: "100vh",
          background: THEME.bg,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 16px",
        }}
      >
        <div style={{ width: "100%", maxWidth: 440 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <Link
              href="/"
              aria-label="TokScript home"
              style={{ display: "inline-flex" }}
            >
              <Image
                src={tokscriptLogo}
                alt="TokScript"
                height={40}
                style={{ height: 40, width: "auto", display: "block" }}
                priority
              />
            </Link>
          </div>
          <div
            style={{
              background: THEME.cardBg,
              border: `1px solid ${THEME.border}`,
              borderRadius: 16,
              padding: 32,
            }}
          >
            <h1
              style={{
                textAlign: "center",
                margin: "0 0 4px",
                fontSize: "1.35rem",
                fontWeight: 700,
                color: THEME.text,
              }}
            >
              Create your account
            </h1>
            <p
              style={{
                textAlign: "center",
                margin: "0 0 28px",
                fontSize: 14,
                color: THEME.muted,
              }}
            >
              Start transcribing for free, no credit card required
            </p>

            <button
              type="button"
              style={{
                width: "100%",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "10px 12px",
                borderRadius: 12,
                background: THEME.inputBg,
                border: `1px solid ${THEME.border}`,
                color: THEME.text,
                fontSize: 14,
                fontWeight: 500,
                cursor: "pointer",
                marginBottom: 24,
              }}
            >
              <GoogleSvg />
              Sign up with Google
            </button>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <span style={{ flex: 1, height: 1, background: THEME.border }} />
              <span style={{ color: THEME.muted, fontSize: 12 }}>or</span>
              <span style={{ flex: 1, height: 1, background: THEME.border }} />
            </div>

            {error && (
              <div
                role="alert"
                style={{
                  padding: "12px 16px",
                  borderRadius: 12,
                  background: "rgba(239,68,68,0.10)",
                  border: "1px solid rgba(239,68,68,0.30)",
                  color: "#fca5a5",
                  fontSize: 13,
                  marginBottom: 16,
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: THEME.text, marginBottom: 6 }}>
                  Email
                </label>
                <AuthInput
                  icon={<Mail size={16} />}
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: THEME.text, marginBottom: 6 }}>
                  Password
                </label>
                <AuthInput
                  icon={<Lock size={16} />}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      tabIndex={-1}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      style={{
                        background: "none",
                        border: "none",
                        color: THEME.muted,
                        cursor: "pointer",
                        padding: 0,
                        display: "inline-flex",
                      }}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
                {strength && (
                  <div style={{ marginTop: 8 }}>
                    <div style={{ height: 4, borderRadius: 999, background: THEME.border, overflow: "hidden" }}>
                      <div
                        style={{
                          height: "100%",
                          width: strength.width,
                          background: strength.color,
                          borderRadius: 999,
                          transition: "width 300ms ease",
                        }}
                      />
                    </div>
                    <p style={{ margin: "4px 0 0", fontSize: 12, color: strength.color }}>{strength.label}</p>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: "block", fontSize: 14, fontWeight: 500, color: THEME.text, marginBottom: 6 }}>
                  Confirm password
                </label>
                <AuthInput
                  icon={<Lock size={16} />}
                  type={showConfirm ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  autoComplete="new-password"
                  borderOverride={
                    confirmPassword && confirmPassword !== password
                      ? "#ef4444"
                      : confirmPassword && confirmPassword === password
                      ? "#22c55e"
                      : undefined
                  }
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowConfirm((v) => !v)}
                      tabIndex={-1}
                      aria-label={showConfirm ? "Hide password" : "Show password"}
                      style={{
                        background: "none",
                        border: "none",
                        color: THEME.muted,
                        cursor: "pointer",
                        padding: 0,
                        display: "inline-flex",
                      }}
                    >
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  }
                />
              </div>

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
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: "hidden",
                    clip: "rect(0,0,0,0)",
                    border: 0,
                  }}
                />
                <span
                  onClick={() => setAgreed((v) => !v)}
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: agreed ? THEME.accent : "transparent",
                    border: `1px solid ${agreed ? THEME.accent : THEME.border}`,
                    flexShrink: 0,
                    marginTop: 2,
                  }}
                >
                  {agreed && (
                    <svg width="10" height="8" viewBox="0 0 10 8" fill="none" aria-hidden>
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#0d0d0d"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span style={{ fontSize: 12, lineHeight: 1.5, color: THEME.muted }}>
                  I agree to the{" "}
                  <span className="auth-inline-link" style={{ color: THEME.accent, cursor: "pointer" }}>
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="auth-inline-link" style={{ color: THEME.accent, cursor: "pointer" }}>
                    Privacy Policy
                  </span>
                </span>
              </label>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: "none",
                  background: THEME.submitBg,
                  color: THEME.submitText,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: loading ? "default" : "pointer",
                  opacity: loading ? 0.6 : 1,
                  marginTop: 4,
                  transition: "background 150ms ease",
                }}
                onMouseEnter={(e) => {
                  if (!loading) e.currentTarget.style.background = THEME.submitHoverBg;
                }}
                onMouseLeave={(e) => {
                  if (!loading) e.currentTarget.style.background = THEME.submitBg;
                }}
              >
                {loading ? "Creating account…" : "Create account"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 24, fontSize: 14, color: THEME.muted }}>
              Already have an account?{" "}
              <Link
                href="/signin"
                className="auth-inline-link"
                style={{ color: THEME.accent, fontWeight: 500, textDecoration: "none" }}
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
