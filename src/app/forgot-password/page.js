"use client";

// Forgot-password page — ported verbatim (UI only) from the v3
// dashboard's ForgotPasswordPage component (/Users/bob/Documents/
// tokscript/tokscriptv3-dashboard/src/app/components/ForgotPasswordPage.tsx).
// Tailwind classes from the original expanded to inline styles since the
// landing site doesn't ship Tailwind. Dark-mode only. Submit is a no-op
// that flips to the success state — no real auth backend wired up.

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
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

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1200);
  };

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
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
            <Link href="/" aria-label="TokScript home" style={{ display: "inline-flex" }}>
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
            {!sent ? (
              <>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background:
                        "linear-gradient(135deg, #00F2EA 0%, #00b8b3 100%)",
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                </div>

                <h1
                  style={{
                    textAlign: "center",
                    margin: "0 0 4px",
                    fontSize: "1.35rem",
                    fontWeight: 700,
                    color: THEME.text,
                  }}
                >
                  Forgot your password?
                </h1>
                <p
                  style={{
                    textAlign: "center",
                    margin: "0 0 28px",
                    fontSize: 14,
                    lineHeight: 1.45,
                    color: THEME.muted,
                  }}
                >
                  No worries — enter your email and we&apos;ll send you a reset link.
                </p>

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

                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 14,
                        fontWeight: 500,
                        color: THEME.text,
                        marginBottom: 6,
                      }}
                    >
                      Email address
                    </label>
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
                        }}
                      >
                        <Mail size={16} />
                      </span>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                        style={{
                          width: "100%",
                          padding: "12px 16px 12px 40px",
                          borderRadius: 12,
                          border: `1px solid ${THEME.border}`,
                          background: THEME.inputBg,
                          color: THEME.text,
                          fontSize: 14,
                          outline: "none",
                          fontFamily: "inherit",
                        }}
                      />
                    </div>
                  </div>

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
                    {loading ? "Sending…" : "Send reset link"}
                  </button>
                </form>

                <Link
                  href="/signin"
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    marginTop: 20,
                    fontSize: 14,
                    color: THEME.muted,
                    textDecoration: "none",
                  }}
                >
                  <ArrowLeft size={14} />
                  Back to sign in
                </Link>
              </>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "8px 0",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                    background: "rgba(0,242,234,0.10)",
                  }}
                >
                  <CheckCircle2 size={28} style={{ color: THEME.accent }} />
                </div>
                <h2
                  style={{
                    margin: "0 0 8px",
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: THEME.text,
                  }}
                >
                  Check your inbox
                </h2>
                <p style={{ margin: "0 0 8px", fontSize: 14, lineHeight: 1.5, color: THEME.muted }}>
                  We&apos;ve sent a password reset link to
                </p>
                <p style={{ margin: "0 0 24px", fontSize: 14, fontWeight: 600, color: THEME.text }}>
                  {email}
                </p>
                <p style={{ margin: "0 0 28px", fontSize: 12, lineHeight: 1.5, color: THEME.muted }}>
                  Didn&apos;t receive it? Check your spam folder, or{" "}
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    style={{
                      background: "none",
                      border: "none",
                      color: THEME.accent,
                      cursor: "pointer",
                      padding: 0,
                      fontSize: 12,
                    }}
                  >
                    try again
                  </button>
                  .
                </p>
                <Link
                  href="/signin"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: 12,
                    background: THEME.submitBg,
                    color: THEME.submitText,
                    fontSize: 14,
                    fontWeight: 600,
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Back to sign in
                </Link>
              </div>
            )}
          </div>

          {!sent && (
            <p style={{ textAlign: "center", marginTop: 20, fontSize: 12, lineHeight: 1.5, color: THEME.muted }}>
              Remember your password?{" "}
              <Link href="/signin" style={{ color: THEME.accent, fontWeight: 500, textDecoration: "none" }}>
                Sign in
              </Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
