"use client";

import "@/assets/scss/modal.scss";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import {
  X,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  ArrowRight,
  ArrowLeft,
  Crown,
  Gift,
  AlertTriangle,
} from "lucide-react";
import { LemonProducts } from "@/components/LemonProducts";
import PRICING_CATEGORIES from "@/data/pricingFeatures";
import PricingCategoryList from "@/components/PricingCategoryList";
import ClaudeIcon from "../../assets/images/icons/ai/ClaudeIcon";
import ChatGPTIcon from "../../assets/images/icons/ai/ChatGPTIcon";

// Returning-visitor skip: if the user finished Step 1 in a prior session and
// hasn't picked a tier yet, jump them straight to Step 2 next time.
const SIGNUP_PROGRESS_KEY = "tokscript_signup_progress_v1";
const SIGNUP_PROGRESS_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

// ─── Mock backend (client-side stubs for the prototype flow) ─────────────────
// These simulate the API behavior described in the mobile signup spec. They
// run entirely in the browser; swap for real fetch() calls when backend lands.

// Pretend these emails already exist. Anything else is treated as new.
const MOCK_EXISTING_EMAILS = new Set([
  "user@example.com",
  "existing@tokscript.com",
  "demo@tokscript.com",
]);

// For sign-in: pretend these emails are already on a paid plan; everyone else
// is on the free plan (so the sign-in flow can demonstrate the "paid users go
// straight back to the feature" branch).
const MOCK_PAID_EMAILS = new Set(["paid@tokscript.com", "demo@tokscript.com"]);

function mockCheckEmailExists(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_EXISTING_EMAILS.has(email.trim().toLowerCase()));
    }, 350);
  });
}

function mockSignIn(email /* , password */) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const e = email.trim().toLowerCase();
      const plan = MOCK_PAID_EMAILS.has(e) ? "pro" : "free";
      const user = { email: e, plan };
      try {
        window.localStorage.setItem("user", JSON.stringify(user));
      } catch (_) {}
      resolve(user);
    }, 350);
  });
}

// In-app browser detection (Instagram, TikTok, Twitter, FB, etc). Modal shows
// a small banner suggesting users open the page in their real browser.
function detectInAppBrowser() {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent || "";
  return /Instagram|FBAN|FBAV|FB_IAB|FBIOS|TikTok|musical_ly|Twitter|Line\//i.test(ua);
}

function mockCreateAccount(email /* , password */) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const e = email.trim().toLowerCase();
      const user = { email: e, plan: "free" };
      try {
        window.localStorage.setItem("user", JSON.stringify(user));
      } catch (_) {}
      resolve(user);
    }, 350);
  });
}

function readSignupProgress() {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SIGNUP_PROGRESS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.email || !parsed?.ts) return null;
    if (Date.now() - parsed.ts > SIGNUP_PROGRESS_MAX_AGE_MS) {
      window.localStorage.removeItem(SIGNUP_PROGRESS_KEY);
      return null;
    }
    return parsed;
  } catch (_) {
    return null;
  }
}

function saveSignupProgress(email) {
  if (typeof window === "undefined" || !email) return;
  try {
    window.localStorage.setItem(
      SIGNUP_PROGRESS_KEY,
      JSON.stringify({ email, ts: Date.now() })
    );
  } catch (_) {}
}

function clearSignupProgress() {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(SIGNUP_PROGRESS_KEY);
  } catch (_) {}
}

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
  accentSoftStronger: "rgba(0,212,204,0.20)",
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
          className="dont-miss-input"
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

function GoogleG() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden focusable="false">
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

function getCarouselFrames(t) {
  const tr = t?.dontMissOutModal?.carousel || {};
  // Final hero images live in public/figma-rows/ as "Modal image 1.png"
  // through "Modal image 5.png". Prefix with NEXT_PUBLIC_BASE_PATH so
  // static-export builds (gh-pages) resolve to /tokscript-landing-page/...
  const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return [
    {
      key: "modal-1",
      image: `${BP}/figma-rows/Modal%20image%201.png`,
      label: tr.frame1Label || "Bulk transcribe up to 50 videos at once",
      sub:
        tr.frame1Sub ||
        "Drop a batch of TikTok, Instagram, or YouTube links and let TokScript handle the rest.",
    },
    {
      key: "modal-2",
      image: `${BP}/figma-rows/Modal%20image%202.png`,
      label: tr.frame2Label || "AI-powered content audits",
      sub:
        tr.frame2Sub ||
        "Pipe any creator's catalog into Claude or ChatGPT and surface what actually works.",
    },
    {
      key: "modal-3",
      image: `${BP}/figma-rows/Modal%20image%203.png`,
      label: tr.frame3Label || "Your personal transcript library",
      sub:
        tr.frame3Sub ||
        "Every video you've ever transcribed, searchable by source, length, or keyword.",
    },
    {
      key: "modal-4",
      image: `${BP}/figma-rows/Modal%20image%204.png`,
      label: tr.frame4Label || "Transcribe from the address bar",
      sub:
        tr.frame4Sub ||
        "Prefix any TikTok URL with tokscript.com to pull a transcript in one click.",
    },
    {
      key: "modal-5",
      image: `${BP}/figma-rows/Modal%20image%205.png`,
      label: tr.frame5Label || "Scrape and analyze straight from TikTok",
      sub:
        tr.frame5Sub ||
        "The Chrome extension grabs transcripts and engagement data without leaving the page.",
    },
  ];
}

function getFeaturePills(t) {
  const tr = t?.dontMissOutModal?.pills || {};
  return [
    {
      label: tr.unlimited || "Unlimited Transcripts",
      mobileLabel: tr.unlimitedMobile || "No Daily Caps",
    },
    { label: tr.bulk || "Bulk Imports" },
    { label: tr.agents || "AI Agents" },
    { label: tr.hd || "HD Downloads" },
    { label: tr.extension || "Chrome Extension" },
    { label: tr.ai || "Claude + ChatGPT" },
  ];
}

function CarouselFrame({ frame }) {
  return (
    <div
      key={frame.key}
      style={{
        position: "relative",
        width: "100%",
        // Container height is dictated by the image's natural aspect
        // ratio — width fills the panel, height scales proportionally,
        // no cropping. No fixed height, no objectFit:cover zoom.
        overflow: "hidden",
        animation: "tsFadeIn 360ms ease-out",
        borderRadius: 12,
      }}
    >
      <img
        src={frame.image}
        alt={frame.label}
        loading="lazy"
        style={{
          width: "100%",
          height: "auto",
          display: "block",
        }}
      />
    </div>
  );
}

function MobileTierCards({ t, email, selectedTier, setSelectedTier, onConfirm }) {
  const tiers = useMemo(() => getTiers(t, email), [t, email]);

  // Per-day cost shown on the right side of each card.
  const perDayText = (tier) => {
    if (tier.key === "monthly") return "$0.33 / day";
    if (tier.key === "annual") return "$0.11 / day";
    return "";
  };

  // Inline savings badge on the top row (matches the SAVE 17% / SAVE 29% chip
  // pattern in the Figma).
  const savingsBadge = (tier) => {
    if (tier.key === "annual") return "SAVE 68%";
    return null;
  };

  return (
    <div
      className="dont-miss-mobile-features"
      style={{
        display: "none",
        flexDirection: "column",
        gap: 9,
        marginTop: 6,
      }}
    >
      {tiers.map((tier) => {
        const isSelected = selectedTier === tier.key;
        const badge = savingsBadge(tier);
        return (
          <button
            key={tier.key}
            type="button"
            onClick={() => {
              setSelectedTier(tier.key);
              onConfirm?.(tier);
            }}
            aria-pressed={isSelected}
            style={{
              width: "100%",
              minHeight: 80,
              padding: "11px 15px",
              borderRadius: 16,
              background: "transparent",
              border: isSelected
                ? `1.8px solid ${T.accent}`
                : `1.8px solid rgba(0,212,204,0.22)`,
              color: T.pitchText,
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
              transition: "border-color .15s",
            }}
          >
            {/* Left column: plan label + badge → price → sub line */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 4,
                alignItems: "flex-start",
                minWidth: 0,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  height: 17,
                }}
              >
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 400,
                    color: "rgba(255,255,255,0.70)",
                    lineHeight: 1.3,
                    whiteSpace: "nowrap",
                  }}
                >
                  {tier.name}
                </span>
                {badge && (
                  <span
                    aria-hidden
                    style={{
                      background: "rgba(0,212,204,0.22)",
                      color: "#ffffff",
                      fontSize: 10.5,
                      fontWeight: 500,
                      lineHeight: 1,
                      padding: "3px 8px",
                      borderRadius: 10,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {badge}
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: "#ffffff",
                  lineHeight: 1.1,
                  letterSpacing: "-0.005em",
                  whiteSpace: "nowrap",
                }}
              >
                {tier.price}
              </span>
              <span
                style={{
                  fontSize: 10.5,
                  fontWeight: 400,
                  color: "rgba(255,255,255,0.70)",
                  lineHeight: 1.3,
                }}
              >
                {tier.tagline}
              </span>
            </div>

            {/* Right: per-day equivalent / "Pay Once" */}
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#ffffff",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {perDayText(tier)}
            </span>
          </button>
        );
      })}
    </div>
  );
}


// ─── Mobile multi-step components (Steps 4 / 5 / 6a / 6b) ───────────────────

function MobilePaywallStep({ t, trigger, user, onContinue, onSignIn, onClose }) {
  const tr = t?.dontMissOutModal?.paywall || {};
  // Guest (not signed in) has a 3/day cap; free users have 5/day.
  const dailyCap = user ? 5 : 3;
  // Shared value-prop bullets for every trigger variant (per latest spec).
  const sharedBullets = [
    tr.bullet1 || "Unlimited Scans",
    tr.bullet2 || "Bulk Downloads",
    tr.bullet3 || "Works Inside Claude & ChatGPT",
    tr.bullet4 || "Access To Chrome Extension",
  ];
  // Trigger-aware copy. Falls back to a generic message.
  const copy = (() => {
    switch (trigger) {
      case "daily-limit":
        return {
          title:
            (tr.dailyLimitTitleTemplate &&
              tr.dailyLimitTitleTemplate.replace("{cap}", dailyCap)) ||
            `You've Used Your ${dailyCap} Free Transcripts Today.`,
          sub: user
            ? tr.dailyLimitSubFree || "Upgrade To Keep Going."
            : tr.dailyLimitSub || "Create An Account To Keep Going.",
        };
      case "translation-limit":
        return {
          title: tr.transLimitTitle || "You've Hit Your Daily Translation Limit.",
          sub: tr.transLimitSub || "Create An Account To Keep Translating.",
        };
      case "paid-feature":
        return {
          title: tr.paidTitle || "This Feature Unlocks With A Paid Plan.",
          sub: tr.paidSub || "Sign Up To Get Full Access.",
        };
      default:
        return {
          title: tr.generalTitle || "Get Full Access To TokScript.",
          sub: tr.generalSub || "Create An Account To Continue.",
        };
    }
  })();
  const lockIconSrc = `${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/lock-bold.svg`;

  return (
    <div className="dont-miss-mobile-step" style={{ width: "100%", padding: "28px 22px 24px", display: "flex", flexDirection: "column", gap: 18, position: "relative", zIndex: 2 }}>
      <div
        aria-hidden
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: T.accentSoft,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          border: `1px solid rgba(0,212,204,0.30)`,
        }}
      >
        <span
          aria-hidden
          style={{
            width: 22,
            height: 22,
            display: "block",
            // Tint the SVG via CSS mask so the lock matches the Continue
            // button's solid teal (`#00b8b2`) exactly — no filter math.
            backgroundColor: "#00b8b2",
            WebkitMaskImage: `url(${lockIconSrc})`,
            maskImage: `url(${lockIconSrc})`,
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
        />
      </div>
      <div>
        <h2 style={{ margin: 0, color: T.pitchText, fontSize: 22, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.015em" }}>
          {copy.title}
        </h2>
        <p style={{ margin: "8px 0 0", color: T.pitchMuted, fontSize: 14, lineHeight: 1.45 }}>
          {copy.sub}
        </p>
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {sharedBullets.map((b) => (
          <li key={b} style={{ display: "flex", alignItems: "center", gap: 10, color: T.pitchText, fontSize: 13.5, lineHeight: 1.35 }}>
            <span
              aria-hidden
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: T.accent,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <Check size={11} strokeWidth={3} color="#06302e" />
            </span>
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        onClick={onContinue}
        className="pc-cta pc-cta-primary"
        style={{ width: "100%", boxShadow: "0 4px 0 rgba(0,0,0,0.85)", color: "#ffffff", borderRadius: 14 }}
      >
        {t?.dontMissOutModal?.continueCta || "Continue"}
        <ArrowRight size={16} />
      </button>
      <p style={{ margin: 0, textAlign: "center", color: T.pitchMuted, fontSize: 13 }}>
        {t?.dontMissOutModal?.alreadyMember || "Already A Member?"}{" "}
        <button
          type="button"
          onClick={onSignIn}
          style={{ background: "none", border: "none", padding: 0, color: T.accent, fontWeight: 700, cursor: "pointer" }}
        >
          {t?.dontMissOutModal?.signIn || "Sign In"}
        </button>
      </p>
    </div>
  );
}

function MobileEmailStep({ t, pendingEmail, setPendingEmail, onSubmit, onGoogle, onBack, busy, error }) {
  return (
    <form
      className="dont-miss-mobile-step"
      onSubmit={onSubmit}
      style={{ width: "100%", padding: "26px 22px 24px", display: "flex", flexDirection: "column", gap: 14, position: "relative", zIndex: 2 }}
    >
      <BackChip t={t} onBack={onBack} />
      <div>
        <h2 style={{ margin: 0, color: T.pitchText, fontSize: 22, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.015em" }}>
          {t?.dontMissOutModal?.emailStepTitle || "What's Your Email?"}
        </h2>
        <p style={{ margin: "6px 0 0", color: T.pitchMuted, fontSize: 13.5, lineHeight: 1.45 }}>
          {t?.dontMissOutModal?.emailStepSub || "We'll Sign You In Or Get You Started."}
        </p>
      </div>
      <FormField
        label={t?.dontMissOutModal?.emailLabel || "Email"}
        icon={<Mail size={16} />}
        type="email"
        placeholder={t?.dontMissOutModal?.emailPlaceholder || "you@example.com"}
        value={pendingEmail}
        onChange={(e) => setPendingEmail(e.target.value)}
      />
      {error && (
        <div style={{ color: "#ff7575", fontSize: 12.5, marginTop: -6 }}>{error}</div>
      )}
      <button
        type="submit"
        disabled={busy}
        className="pc-cta pc-cta-primary"
        style={{ width: "100%", boxShadow: "0 4px 0 rgba(0,0,0,0.85)", color: "#ffffff", borderRadius: 14, opacity: busy ? 0.7 : 1 }}
      >
        {busy
          ? t?.dontMissOutModal?.checking || "Checking…"
          : t?.dontMissOutModal?.continueCta || "Continue"}
        {!busy && <ArrowRight size={16} />}
      </button>
      <div style={{ display: "flex", alignItems: "center", gap: 10, color: T.formMuted, fontSize: 11 }}>
        <span style={{ flex: 1, height: 1, background: T.formBorder }} />
        {t?.dontMissOutModal?.or || "or"}
        <span style={{ flex: 1, height: 1, background: T.formBorder }} />
      </div>
      <button
        type="button"
        onClick={onGoogle}
        disabled={busy}
        style={{
          display: "inline-flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          padding: "12px 16px",
          borderRadius: 12,
          background: T.formInputBg,
          border: `1px solid ${T.formBorder}`,
          color: T.formText,
          fontSize: 14,
          fontWeight: 600,
          cursor: busy ? "not-allowed" : "pointer",
        }}
      >
        <GoogleG />
        {t?.dontMissOutModal?.googleCta || "Continue With Google"}
      </button>
    </form>
  );
}

function MobileSignInStep({ t, email, password, setPassword, showPw, setShowPw, onSubmit, onBack, busy, error }) {
  return (
    <form
      className="dont-miss-mobile-step"
      onSubmit={onSubmit}
      style={{ width: "100%", padding: "26px 22px 24px", display: "flex", flexDirection: "column", gap: 14, position: "relative", zIndex: 2 }}
    >
      <BackChip t={t} onBack={onBack} />
      <h2 style={{ margin: 0, color: T.pitchText, fontSize: 22, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.015em" }}>
        {t?.dontMissOutModal?.welcomeBackTitle || "Welcome Back."}
      </h2>
      <ReadonlyEmail email={email} t={t} />
      <FormField
        label={t?.dontMissOutModal?.passwordLabel || "Password"}
        icon={<Lock size={16} />}
        type={showPw ? "text" : "password"}
        placeholder={t?.dontMissOutModal?.passwordPlaceholder || "Min. 8 characters"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        trailing={<PwToggle showPw={showPw} setShowPw={setShowPw} />}
      />
      {error && (
        <div style={{ color: "#ff7575", fontSize: 12.5, marginTop: -6 }}>{error}</div>
      )}
      <button
        type="submit"
        disabled={busy}
        className="pc-cta pc-cta-primary"
        style={{ width: "100%", boxShadow: "0 4px 0 rgba(0,0,0,0.85)", color: "#ffffff", borderRadius: 14, opacity: busy ? 0.7 : 1 }}
      >
        {busy
          ? t?.dontMissOutModal?.signingIn || "Signing In…"
          : t?.dontMissOutModal?.signInCta || "Sign In"}
        {!busy && <ArrowRight size={16} />}
      </button>
      <a
        href="/app/forgot-password"
        style={{ alignSelf: "center", color: T.pitchMuted, fontSize: 12.5, textDecoration: "underline", textUnderlineOffset: 2 }}
      >
        {t?.dontMissOutModal?.forgotPassword || "Forgot Password?"}
      </a>
    </form>
  );
}

function MobileCreateAccountStep({ t, email, password, setPassword, showPw, setShowPw, onSubmit, onBack, busy, error }) {
  return (
    <form
      className="dont-miss-mobile-step"
      onSubmit={onSubmit}
      style={{ width: "100%", padding: "26px 22px 24px", display: "flex", flexDirection: "column", gap: 14, position: "relative", zIndex: 2 }}
    >
      <BackChip t={t} onBack={onBack} />
      <h2 style={{ margin: 0, color: T.pitchText, fontSize: 22, fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.015em" }}>
        {t?.dontMissOutModal?.createPasswordTitle || "Create Your Password."}
      </h2>
      <ReadonlyEmail email={email} t={t} />
      <FormField
        label={t?.dontMissOutModal?.passwordLabel || "Password"}
        icon={<Lock size={16} />}
        type={showPw ? "text" : "password"}
        placeholder={t?.dontMissOutModal?.passwordPlaceholder || "Min. 8 characters"}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        trailing={<PwToggle showPw={showPw} setShowPw={setShowPw} />}
      />
      {error && (
        <div style={{ color: "#ff7575", fontSize: 12.5, marginTop: -6 }}>{error}</div>
      )}
      <button
        type="submit"
        disabled={busy}
        className="pc-cta pc-cta-primary"
        style={{ width: "100%", boxShadow: "0 4px 0 rgba(0,0,0,0.85)", color: "#ffffff", borderRadius: 14, opacity: busy ? 0.7 : 1 }}
      >
        {busy
          ? t?.dontMissOutModal?.creating || "Creating…"
          : t?.dontMissOutModal?.continueCta || "Continue"}
        {!busy && <ArrowRight size={16} />}
      </button>
      <p style={{ margin: 0, color: T.pitchMuted, fontSize: 11.5, lineHeight: 1.5, textAlign: "center" }}>
        {t?.dontMissOutModal?.termsLine1 || "By continuing, you agree to our"}{" "}
        <a
          href="/terms"
          style={{
            color: T.pitchMuted,
            textDecoration: "underline",
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            fontFamily: "inherit",
          }}
        >
          {t?.dontMissOutModal?.terms || "Terms"}
        </a>
        {" "}{t?.dontMissOutModal?.and || "and"}{" "}
        <a
          href="/privacy"
          style={{
            color: T.pitchMuted,
            textDecoration: "underline",
            fontSize: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            fontFamily: "inherit",
          }}
        >
          {t?.dontMissOutModal?.privacy || "Privacy Policy"}
        </a>.
      </p>
    </form>
  );
}

// Small helpers used across the new mobile steps.
function BackChip({ t, onBack }) {
  return (
    <button
      type="button"
      onClick={onBack}
      style={{
        alignSelf: "flex-start",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "5px 10px",
        borderRadius: 999,
        background: "rgba(255,255,255,0.06)",
        border: `1px solid ${T.formBorder}`,
        color: T.pitchMuted,
        fontSize: 11.5,
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      <ArrowLeft size={12} />
      {t?.dontMissOutModal?.back || "Back"}
    </button>
  );
}

function ReadonlyEmail({ email, t }) {
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
        {t?.dontMissOutModal?.emailLabel || "Email"}
      </label>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 14px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.04)",
          border: `1px solid ${T.formBorder}`,
        }}
      >
        <Mail size={16} style={{ color: T.formMuted }} />
        <span style={{ flex: 1, color: T.formText, fontSize: 14, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {email}
        </span>
        <span aria-hidden style={{ color: T.accent, fontWeight: 800 }}>✓</span>
      </div>
    </div>
  );
}

function PwToggle({ showPw, setShowPw }) {
  return (
    <button
      type="button"
      onClick={() => setShowPw((s) => !s)}
      aria-label={showPw ? "Hide password" : "Show password"}
      style={{ background: "none", border: "none", color: T.formMuted, cursor: "pointer", display: "inline-flex", padding: 0 }}
    >
      {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
    </button>
  );
}

/* ── Mobile-only paywall (Figma node 2016:7529). Renders the checklist +
   4-tier picker panel + white "Subscribe to ..." CTA + sign-in line that
   replace the pills + intro CTA on mobile. Display is gated to mobile by
   the parent CSS rule on `.dont-miss-mobile-paywall`. */
function MobilePaywallV2({ t, selectedTier, setSelectedTier, onConfirm }) {
  const tr = t?.dontMissOutModal?.mobilePaywall || {};
  // Mirror the pricing cards: one row per pricing-card bucket, with a check
  // if the currently-selected tier has access to anything in that bucket,
  // an X otherwise. Selecting a different tier card below updates this list
  // live, so users can see exactly what each plan includes.
  const checklistTier = selectedTier || "annual";
  // Note: `checklist` array removed — PricingCategoryList now renders
  // the full pricing-card structure for `checklistTier` directly.
  const tiers = [
    { key: "free", label: "FREE", price: "$0", period: "/forever", ctaPrice: "$0/forever" },
    { key: "monthly", label: "MONTHLY", price: "$10", period: "/month", ctaPrice: "$10/month" },
    { key: "annual", label: "ANNUAL", price: "$39", period: "/year", featured: true, ribbon: "SAVE $81", ctaPrice: "$39/year" },
    { key: "lifetime", label: "LIFETIME", price: "$199", period: "/forever", ctaPrice: "$199 once" },
  ];
  const sel = tiers.find((tt) => tt.key === selectedTier) || tiers[2];
  const ctaText =
    sel.key === "free"
      ? tr.ctaFree || "Create Free Account"
      : `${tr.ctaPrefix || "Subscribe To"} ${sel.label.charAt(0) + sel.label.slice(1).toLowerCase()} ${sel.ctaPrice}`;

  return (
    <div className="dont-miss-mobile-paywall">
      {/* Feature list now mirrors the pricing-cards: expandable buckets
          with colored icon tiles, intros, per-feature platform glyphs.
          Tier passed in is the currently-selected tier in the tier picker
          below, so the checks update live as the user picks a plan. */}
      <div className="paywall-features">
        <PricingCategoryList tier={checklistTier} />
      </div>

      <div className="paywall-panel">
        <div className="paywall-tier-row">
          {tiers.map((tier) => {
            const isSelected = selectedTier === tier.key;
            return (
              <button
                key={tier.key}
                type="button"
                onClick={() => setSelectedTier(tier.key)}
                aria-pressed={isSelected}
                className={`paywall-tier${tier.featured ? " is-featured" : ""}${isSelected ? " is-selected" : ""}`}
              >
                {tier.ribbon && (
                  <span className="paywall-ribbon">{tier.ribbon}</span>
                )}
                <span className="paywall-tier-label">{tier.label}</span>
                <span className="paywall-tier-price">
                  <span className="paywall-price-main">{tier.price}</span>
                  <span className="paywall-price-period">{tier.period}</span>
                </span>
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="paywall-cta"
          onClick={() => onConfirm?.(selectedTier)}
        >
          {ctaText}
        </button>

        <p className="paywall-signin">
          {tr.haveAccount || "Already have an account?"}{" "}
          <Link href="/app/login" className="paywall-signin-link">
            {tr.signIn || "Sign In"}
          </Link>{" "}
          {tr.toContinue || "to continue"}
        </p>
      </div>
    </div>
  );
}

function StepOne({
  t,
  email,
  setEmail,
  password,
  setPassword,
  showPw,
  setShowPw,
  onContinue,
  onIntroContinue,
  onMaybeLater,
  selectedTier,
  setSelectedTier,
  user,
  onMobileTierConfirm,
  isMobile,
}) {
  const frames = useMemo(() => getCarouselFrames(t), [t]);
  const pills = useMemo(() => getFeaturePills(t), [t]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % frames.length);
    }, 5000);
    return () => clearInterval(id);
  }, [paused, frames.length]);

  return (
    <>
      {/* ── Left: visual pitch ─────────────────────────────────────── */}
      <div
        className="dont-miss-pitch"
        style={{
          flex: "1 1 0",
          minWidth: 0,
          // Trimmed top/bottom padding so the modal reads tighter now
          // that the pill-shaped features row is gone.
          padding: "22px 28px 18px",
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
              marginBottom: 12,
            }}
          >
            {user
              ? t?.dontMissOutModal?.freeEyebrow || "Upgrade"
              : t?.dontMissOutModal?.eyebrow || "Daily Limit Reached"}
          </span>
          <h2
            className="dont-miss-h2"
            style={{
              margin: 0,
              color: T.pitchText,
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1.18,
              letterSpacing: "-0.015em",
              whiteSpace: "normal",
            }}
          >
            {user
              ? t?.dontMissOutModal?.freeTitle || "Upgrade To Pro."
              : t?.dontMissOutModal?.title ||
                "You've Used Your 3 Free Transcripts Today."}
          </h2>
          <p
            style={{
              margin: "8px 0 0",
              color: T.pitchMuted,
              fontSize: 14,
              lineHeight: 1.45,
            }}
          >
            {user
              ? t?.dontMissOutModal?.freePaywallSub ||
                "Unlock Everything With A Paid Plan."
              : t?.dontMissOutModal?.guestPaywallSub ||
                "Create An Account To Keep Going."}
          </p>
        </div>

        {/* Mobile-only headline + sub. Hidden on desktop via SCSS; the
            `.dont-miss-desktop-title` block above handles desktop instead.
            Matches the Figma guest-paywall design (white→teal gradient on h2). */}
        <div className="dont-miss-mobile-header">
          <h2 className="dont-miss-mobile-h2">
            {user
              ? t?.dontMissOutModal?.freeTitleMobile ||
                t?.dontMissOutModal?.freeTitle ||
                "Upgrade To Pro."
              : t?.dontMissOutModal?.titleMobile ||
                "You've Used Your 3 Free Guest Transcripts."}
          </h2>
          <p className="dont-miss-mobile-sub">
            {user
              ? t?.dontMissOutModal?.freePaywallSub ||
                "Unlock Everything With A Paid Plan."
              : t?.dontMissOutModal?.guestPaywallSub ||
                "Create An Account To Keep Going."}
          </p>
        </div>

        {/* Carousel */}
        <div
          className="dont-miss-carousel"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          style={{ display: "flex", flexDirection: "column", gap: 10 }}
        >
          <CarouselFrame frame={frames[activeIdx]} />
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 2 }}>
            {frames.map((f, i) => (
              <button
                key={f.key}
                type="button"
                aria-label={`Show ${f.label}`}
                onClick={() => setActiveIdx(i)}
                style={{
                  width: i === activeIdx ? 18 : 6,
                  height: 6,
                  padding: 0,
                  borderRadius: 999,
                  border: "none",
                  background: i === activeIdx ? T.accent : "rgba(255,255,255,0.18)",
                  cursor: "pointer",
                  transition: "width .2s, background .2s",
                }}
              />
            ))}
          </div>
          <div
            className="carousel-caption"
            style={{
              marginTop: 6,
              textAlign: "center",
              color: "#ffffff",
              fontSize: 13,
              fontWeight: 400,
              lineHeight: 1.35,
              letterSpacing: "-0.005em",
            }}
          >
            {frames[activeIdx].sub}
          </div>
        </div>

        {/* ── Mobile-only paywall (Figma redesign). Gated to mobile by the
            isMobile prop so the embedded PricingCategoryList doesn't render
            (and so can't interact with) the desktop tree at all. The
            sibling pitch + form panels render unchanged on desktop. */}
        {isMobile && (
          <MobilePaywallV2
            t={t}
            selectedTier={selectedTier}
            setSelectedTier={setSelectedTier}
            onConfirm={onMobileTierConfirm}
          />
        )}

        {/* Pill-shaped feature row removed per design — the carousel +
            stats now carry the trust signal on their own. */}

        {/* Stats row */}
        <div
          className="dont-miss-stats"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            marginTop: 18,
            paddingTop: 18,
            borderTop: `1px solid ${T.pitchBorder}`,
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
              fontSize: 12,
              lineHeight: 1.5,
            }}
          >
            {t?.dontMissOutModal?.stats || "41K+ Users · 2.6M+ Transcripts · 4.2★ Rating"}
          </span>
        </div>

        {/* Mobile-only tier cards (3 horizontal mini-cards with ribbon, price,
            period, sub-line, and selection radio). Hidden on desktop. */}
        <MobileTierCards
          t={t}
          email={email}
          selectedTier={selectedTier}
          setSelectedTier={setSelectedTier}
        />

        {/* Intro CTA row removed — the form's "Get Full Access" submit
            button on the right panel is the only primary CTA now. */}
      </div>

      {/* ── Right: Create Your Account form. Always renders on desktop
          so the sign-in/up panel is never missing — signed-in users can
          use the "Already Have An Account? Sign In" link at the bottom
          to switch accounts. ── */}
      <div
        className="dont-miss-form"
        style={{
          width: 360,
          flexShrink: 0,
          margin: "14px 14px 14px 0",
          // Tighter padding so the form panel matches the trimmed pitch
          // panel's vertical rhythm.
          padding: "22px 24px 18px",
          background: T.formBg,
          borderRadius: 18,
          border: `1px solid ${T.formBorder}`,
          display: "flex",
          flexDirection: "column",
          gap: 12,
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
            {t?.dontMissOutModal?.formTitle || "Create Your Account"}
          </h3>
          <p
            style={{
              margin: "6px 0 0",
              color: T.formMuted,
              fontSize: 13,
              lineHeight: 1.45,
            }}
          >
            {t?.dontMissOutModal?.formSubtitle || "One account. Pick your plan next."}
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onContinue();
          }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <FormField
            label={t?.dontMissOutModal?.emailLabel || "Email"}
            icon={<Mail size={16} />}
            type="email"
            placeholder={t?.dontMissOutModal?.emailPlaceholder || "you@example.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FormField
            label={t?.dontMissOutModal?.passwordLabel || "Password"}
            icon={<Lock size={16} />}
            type={showPw ? "text" : "password"}
            placeholder={t?.dontMissOutModal?.passwordPlaceholder || "Min. 8 characters"}
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

          {/* Form submit reuses the teal "Get Full Access" pc-cta-primary
              treatment — replacing the previous white Continue button.
              Same submit behavior, just the branded CTA styling. */}
          <button
            type="submit"
            className="pc-cta pc-cta-primary"
            style={{
              marginTop: 4,
              width: "100%",
              height: 44,
              boxShadow: "none",
              color: "#ffffff",
            }}
          >
            {t?.dontMissOutModal?.introCta || "Get Full Access"}
            <ArrowRight size={16} />
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
          {t?.dontMissOutModal?.or || "or"}
          <span style={{ flex: 1, height: 1, background: T.formBorder }} />
        </div>

        <a
          href="/app/sign-up"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            // Match the Continue button height exactly.
            height: 44,
            padding: "0 16px",
            borderRadius: 12,
            background: T.formInputBg,
            border: `1px solid ${T.formBorder}`,
            color: T.formText,
            fontSize: 13.5,
            fontWeight: 500,
            lineHeight: 1,
            textDecoration: "none",
          }}
        >
          <GoogleG />
          {t?.dontMissOutModal?.googleCta || "Continue With Google"}
        </a>

        <div style={{ flex: 1 }} />

        <p
          style={{
            margin: 0,
            textAlign: "center",
            color: T.formMuted,
            fontSize: 12.5,
            lineHeight: 1.5,
          }}
        >
          {t?.dontMissOutModal?.haveAccount || "Already Have An Account?"}{" "}
          <Link
            href="/app/login"
            className="dont-miss-signin-link"
          >
            {t?.dontMissOutModal?.signIn || "Sign In"}
          </Link>
        </p>
      </div>
    </>
  );
}

function getTiers(t, email) {
  // Pull live Lemon Squeezy variant slugs from the same source the pricing page uses.
  // Index 2 = the active "Tokscript | Pro Subscription" product.
  let monthlySlug = "c63d36ca-7b06-4edb-b289-a9d9bf1b35c6";
  let annualSlug = "d614c4a5-3b78-4afc-9949-1f115f0ef845";
  try {
    const variants = LemonProducts()?.data?.[2]?.variants || [];
    const m = variants.find(
      (v) => v.attributes.interval === "month" && v.attributes.status === "published"
    );
    const a = variants.find(
      (v) => v.attributes.interval === "year" && v.attributes.status === "published"
    );
    if (m?.attributes?.slug) monthlySlug = m.attributes.slug;
    if (a?.attributes?.slug) annualSlug = a.attributes.slug;
  } catch (_) {
    // Fall back to the hardcoded slugs above.
  }

  const emailQuery = email ? `?checkout[email]=${encodeURIComponent(email)}` : "";
  const signupHref = email
    ? `/app/sign-up?email=${encodeURIComponent(email)}&tier=free`
    : "/app/sign-up?tier=free";

  // Lifetime variant isn't published in LemonProducts.js yet; mock the slug
  // and flip this to a real one when the product goes live.
  const lifetimeSlug = "lifetime-coming-soon";

  const tr = t?.dontMissOutModal?.tiers || {};

  return [
    {
      key: "monthly",
      name: tr.monthlyName || "Monthly",
      price: tr.monthlyPrice || "$10",
      period: tr.monthlyPeriod || "/ Month",
      tagline: tr.monthlyTagline || "Full Power, Flexible Billing",
      cta: tr.monthlyCta || "Get Monthly",
      href: `https://tokscript.lemonsqueezy.com/checkout/buy/${monthlySlug}${emailQuery}`,
      external: true,
    },
    {
      key: "annual",
      name: tr.annualName || "Annual",
      price: tr.annualPrice || "$39",
      period: tr.annualPeriod || "/ Year",
      tagline: tr.annualTagline || "Save $81 vs Monthly",
      pricePill: tr.annualPricePill || "That's $3.25/Month",
      cta: tr.annualCta || "Get Annual, Save $81",
      href: `https://tokscript.lemonsqueezy.com/checkout/buy/${annualSlug}${emailQuery}`,
      external: true,
      recommended: true,
    },
    {
      key: "lifetime",
      name: tr.lifetimeName || "Lifetime",
      price: tr.lifetimePrice || "$199",
      period: tr.lifetimePeriod || "Once",
      originalPrice: tr.lifetimeOriginalPrice || "$468",
      tagline: tr.lifetimeTagline || "Pay Once. Use Forever.",
      cta: tr.lifetimeCta || "Get Lifetime, Save $269",
      href: `https://tokscript.lemonsqueezy.com/checkout/buy/${lifetimeSlug}${emailQuery}`,
      external: true,
      // bestValue flag intentionally omitted — Lifetime renders as a plain
      // card with no "BEST VALUE" badge.
    },
  ];
}

function TierCard({ tier, t, onSelect }) {
  // Desktop Step 2 (Select Plan): only the `recommended` tier (Annual) gets the
  // teal accent treatment. Lifetime is rendered identically to Monthly — the
  // bestValue flag is intentionally ignored here.
  const isRec = !!tier.recommended;
  const accented = isRec;

  const cardStyle = {
    position: "relative",
    flex: "1 1 0",
    minWidth: 0,
    padding: "22px 16px 18px",
    borderRadius: 18,
    background: accented
      ? "linear-gradient(180deg, rgba(0,212,204,0.10) 0%, rgba(0,212,204,0.03) 100%)"
      : T.formInputBg,
    border: accented
      ? `1px solid rgba(0,212,204,0.55)`
      : `1px solid ${T.formBorder}`,
    boxShadow: isRec
      ? "0 0 0 4px rgba(0,212,204,0.10)"
      : "none",
    display: "flex",
    flexDirection: "column",
    gap: 10,
  };

  const ctaStyle = {
    marginTop: 4,
    padding: "12px 14px",
    borderRadius: 12,
    background: isRec ? T.accent : T.formCtaBg,
    border: "none",
    color: isRec ? "#06302e" : T.formCtaText,
    fontSize: 13.5,
    fontWeight: 700,
    cursor: "pointer",
    textAlign: "center",
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    whiteSpace: "nowrap",
  };

  const ctaProps = tier.external
    ? { href: tier.href, target: "_blank", rel: "noopener noreferrer", onClick: onSelect }
    : { href: tier.href, onClick: onSelect };

  const badgeText = isRec
    ? t?.dontMissOutModal?.tiers?.recommendedBadge || "Recommended"
    : null;

  return (
    <div className="dont-miss-tier-card" style={cardStyle}>
      {badgeText && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            top: -10,
            right: 14,
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            padding: "3px 9px",
            borderRadius: 999,
            background: T.accent,
            color: "#06302e",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <Crown size={11} />
          {badgeText}
        </span>
      )}

      <div
        style={{
          color: T.pitchText,
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: "0.02em",
          textTransform: "uppercase",
        }}
      >
        {tier.name}
      </div>

      <div style={{ display: "flex", alignItems: "baseline", gap: 6, flexWrap: "wrap" }}>
        <span
          style={{
            color: T.pitchText,
            fontSize: 26,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          {tier.price}
        </span>
        <span style={{ color: T.pitchMuted, fontSize: 12 }}>{tier.period}</span>
        {tier.originalPrice && (
          <span
            style={{
              color: T.pitchMuted,
              fontSize: 12,
              textDecoration: "line-through",
              marginLeft: 2,
            }}
          >
            {tier.originalPrice}
          </span>
        )}
      </div>

      <div
        style={{
          color: accented ? T.accent : T.pitchMuted,
          fontSize: 12,
          fontWeight: 600,
          minHeight: 18,
        }}
      >
        {tier.tagline}
      </div>

      {tier.pricePill && (
        <span
          style={{
            alignSelf: "flex-start",
            display: "inline-flex",
            alignItems: "center",
            padding: "3px 9px",
            borderRadius: 999,
            background: T.accentSoft,
            border: `1px solid rgba(0,212,204,0.30)`,
            color: T.accent,
            fontSize: 11,
            fontWeight: 700,
          }}
        >
          {tier.pricePill}
        </span>
      )}

      <a {...ctaProps} style={ctaStyle}>
        {tier.cta}
        {accented && <ArrowRight size={14} />}
      </a>
    </div>
  );
}

function StepTwo({
  t,
  email,
  onBack,
  onTierSelect,
  user,
  trigger,
  isMobile,
  selectedTier,
  setSelectedTier,
  wasSignedInOnOpen,
}) {
  // Active tab on mobile (drives which single card is visible). Desktop ignores
  // this because all four cards render in the grid.
  const [activeTab, setActiveTab] = useState(selectedTier || "annual");

  // Account creation happens on the separate /sign-up page at the app domain.
  // The marketing site routes the user there with the chosen tier; the app
  // handles the actual account flow + checkout.
  const signupBase = `${process.env.NEXT_PUBLIC_FRONTEND_URL || ""}/sign-up`;
  const signinHref = `${process.env.NEXT_PUBLIC_FRONTEND_URL || ""}/signin`;

  // Free tier visibility per spec:
  //   - Guest who just signed up (wasSignedInOnOpen=false, user exists now) →
  //     show Free as a 4th option, since this is their first plan choice.
  //   - Returning signed-in user (wasSignedInOnOpen=true) → hide Free; they
  //     already have an account, so only paid upgrades make sense.
  //   - Pure guest (no user at all) → show Free (this branch normally doesn't
  //     reach StepTwo, but kept for safety).
  const hideFree = !!user && wasSignedInOnOpen;
  // 'Pay To Upgrade' headline only fires for returning signed-in free users.
  // New signups see the generic 'Pick Your Plan' copy.
  const isFreeUserUpgrading =
    !!user && user.plan === "free" && wasSignedInOnOpen;

  const choose = (tierKey) => {
    onTierSelect?.({ key: tierKey });
    if (typeof window !== "undefined") {
      window.location.href = `${signupBase}?tier=${tierKey}`;
    }
  };

  return (
    <div
      className="dont-miss-step-two pricing-page-new"
      style={{
        flex: "1 1 0",
        width: "100%",
        padding: "26px 22px 0",
        display: "flex",
        flexDirection: "column",
        gap: 18,
        position: "relative",
        zIndex: 2,
      }}
    >
      <button
        type="button"
        onClick={onBack}
        style={{
          alignSelf: "flex-start",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "5px 10px",
          borderRadius: 999,
          background: "rgba(255,255,255,0.06)",
          border: `1px solid ${T.formBorder}`,
          color: T.pitchMuted,
          fontSize: 11.5,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        <ArrowLeft size={12} />
        {t?.dontMissOutModal?.back || "Back"}
      </button>

      <div style={{ textAlign: "center" }}>
        {/* Free user upgrade context: 'Pay To Upgrade'. Otherwise (guest who
            completed sign-up form, or paid user opening modal): generic 'Pick Your Plan'. */}
        <h2
          style={{
            margin: 0,
            color: T.pitchText,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.015em",
          }}
        >
          {isFreeUserUpgrading
            ? t?.dontMissOutModal?.freeUpgradeTitle || "Pay To Upgrade."
            : t?.dontMissOutModal?.tiersTitle || "Pick Your Plan To Continue."}
        </h2>
        <p
          style={{
            margin: "6px 0 0",
            color: T.pitchMuted,
            fontSize: 13.5,
            lineHeight: 1.5,
          }}
        >
          {isFreeUserUpgrading
            ? t?.dontMissOutModal?.freeUpgradeSub ||
              "Pick A Plan To Continue Using TokScript."
            : t?.dontMissOutModal?.tiersSubtitle ||
              "Start Free, Or Unlock Everything From Day One."}
        </p>
        {user?.email && (
          <p
            style={{
              margin: "8px 0 0",
              color: T.pitchMuted,
              fontSize: 12,
            }}
          >
            {t?.dontMissOutModal?.signedInAs || "Signed in as"}{" "}
            <span style={{ color: T.pitchText, fontWeight: 600 }}>{user.email}</span>
          </p>
        )}
      </div>

      {/* Mobile tabs: only visible on mobile, picks the active tier card. */}
      <div className="mobile-tabs">
        <div className="tab-container">
          {!hideFree && (
            <button
              type="button"
              className={`tab-btn ${activeTab === "free" ? "active" : "inactive"}`}
              onClick={() => setActiveTab("free")}
            >
              Free
            </button>
          )}
          <button
            type="button"
            className={`tab-btn ${activeTab === "monthly" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("monthly")}
          >
            Monthly
          </button>
          <button
            type="button"
            className={`tab-btn featured ${activeTab === "annual" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("annual")}
          >
            Annual
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "lifetime" ? "active" : "inactive"}`}
            onClick={() => setActiveTab("lifetime")}
          >
            Lifetime
          </button>
        </div>
      </div>

      {/* Card grid: desktop shows all cards; mobile shows only the active tab.
          When the Free card is hidden (returning signed-in user), drop to a
          3-column grid so the cards fill the modal instead of leaving a dead
          column on the right. */}
      <div className={`pc-grid${hideFree ? " pc-grid--three" : ""}`}>
        {!hideFree && (
          <div className={`pc-card-wrapper ${activeTab === "free" ? "active" : ""}`}>
            <div className="pc-card">
              <div className="pc-header">
                <div className="pc-plan-row">
                  <div className="pc-plan-name">Free</div>
                  <span className="pc-badge">Forever</span>
                </div>
                <p className="pc-description">For Trying The Basics</p>
                <div className="pc-price-row">
                  <span className="pc-price-main">$0</span>
                  <span className="pc-price-period">forever</span>
                </div>
                <div className="pc-price-highlight">
                  <span className="pc-price-highlight-pill pc-price-highlight-pill-muted">
                    <Gift size={13} strokeWidth={2} /> No Credit Card Needed
                  </span>
                </div>
              </div>
              <div className="pc-cta-wrap">
                <button type="button" className="pc-cta" onClick={() => choose("free")}>
                  Get Started
                </button>
              </div>
              <div className="pc-body">
                <PricingCategoryList tier="free" />
              </div>
            </div>
          </div>
        )}

        <div className={`pc-card-wrapper ${activeTab === "monthly" ? "active" : ""}`}>
          <div className="pc-card">
            <div className="pc-header">
              <div className="pc-plan-row">
                <div className="pc-plan-name">Monthly</div>
                <span className="pc-badge">Flexible</span>
              </div>
              <p className="pc-description">Full power, flexible billing</p>
              <div className="pc-price-row">
                <span className="pc-price-main">$10</span>
                <span className="pc-price-period">per month</span>
              </div>
              <div className="pc-price-highlight">
                <span className="pc-price-highlight-pill pc-price-highlight-pill-muted">
                  <AlertTriangle size={13} strokeWidth={2} /> Annual Saves $81
                </span>
              </div>
            </div>
            <div className="pc-cta-wrap">
              <button type="button" className="pc-cta" onClick={() => choose("monthly")}>
                Get Monthly
              </button>
            </div>
            <div className="pc-body">
              <PricingCategoryList tier="monthly" />
            </div>
          </div>
        </div>

        <div className={`pc-card-wrapper ${activeTab === "annual" ? "active" : ""}`}>
          <div className="pc-card pc-card-featured pc-card-recommended">
            <div className="pc-header">
              <div className="pc-plan-row">
                <div className="pc-plan-name">Annual</div>
                <span className="pc-badge pc-badge-bestvalue">
                  <Crown size={12} strokeWidth={2.5} /> Recommended
                </span>
              </div>
              <p className="pc-description">Best value for serious creators</p>
              <div className="pc-price-row">
                <span className="pc-price-main">$39</span>
                <span className="pc-price-period">per year</span>
                <span className="pc-price-original">$120</span>
              </div>
              <div className="pc-price-highlight">
                <span className="pc-price-highlight-pill pc-price-highlight-pill-gold">
                  That&apos;s $3.25/month, save $81
                </span>
              </div>
            </div>
            <div className="pc-cta-wrap">
              <button
                type="button"
                className="pc-cta pc-cta-primary"
                onClick={() => choose("annual")}
              >
                Get Annual · Save $81 <ArrowRight size={18} strokeWidth={2.5} />
              </button>
            </div>
            <div className="pc-body">
              <PricingCategoryList tier="annual" />
            </div>
          </div>
        </div>

        <div className={`pc-card-wrapper ${activeTab === "lifetime" ? "active" : ""}`}>
          <div className="pc-card pc-card-featured">
            <div className="pc-header">
              <div className="pc-plan-row">
                <div className="pc-plan-name">Lifetime</div>
                <span className="pc-badge">Best Value</span>
              </div>
              <p className="pc-description">Pay Once. Use Forever.</p>
              <div className="pc-price-row">
                <span className="pc-price-main">$199</span>
                <span className="pc-price-period">one-time</span>
                <span className="pc-price-original">$468</span>
              </div>
              <div className="pc-price-highlight">
                <span className="pc-price-highlight-pill pc-price-highlight-pill-muted">
                  <Lock size={13} strokeWidth={2} /> No Subscriptions, Ever
                </span>
              </div>
            </div>
            <div className="pc-cta-wrap">
              <button type="button" className="pc-cta" onClick={() => choose("lifetime")}>
                Get Lifetime
              </button>
            </div>
            <div className="pc-body">
              <PricingCategoryList tier="lifetime" />
            </div>
          </div>
        </div>
      </div>

      <p
        style={{
          position: "sticky",
          bottom: 0,
          // Negative horizontal margin pulls the bg to the shell edges so the
          // sticky strip covers cards that scroll behind it. Top padding
          // creates a soft fade-out band; bottom padding is the visible
          // breathing room beneath the text.
          margin: "0 -22px 0",
          padding: "18px 22px 16px",
          textAlign: "center",
          color: T.pitchMuted,
          fontSize: 11.5,
          lineHeight: 1.5,
          background: `linear-gradient(180deg, rgba(11,11,18,0) 0%, ${T.outerBg} 30%, ${T.outerBg} 100%)`,
          zIndex: 3,
        }}
      >
        {t?.dontMissOutModal?.tiersFooter ||
          "All Plans Include Cancel-Anytime and A 7-Day Refund Guarantee."}{" "}
        <a
          href={signinHref}
          style={{
            color: T.accent,
            textDecoration: "none",
            fontSize: "inherit",
            fontWeight: "inherit",
            fontFamily: "inherit",
            lineHeight: "inherit",
          }}
        >
          {t?.dontMissOutModal?.signIn || "Sign In"}
        </a>
      </p>
    </div>
  );
}

export default function DontMissOutModal({ show, onHide, t, trigger = "general" }) {
  // step values:
  //   Mobile flow:
  //     "paywall" → "email" → "signin"|"create" → "tiers"
  //   Desktop flow (unchanged):
  //     "signup" (combined pitch + form) → "tiers"
  // The two flows share the "tiers" terminal step.
  const [step, setStep] = useState("signup");
  // Entry-context for trigger-aware copy + tier visibility rules.
  // "daily-limit" | "translation-limit" | "paid-feature" | "general"
  const [entryTrigger] = useState(trigger);
  // Paid-feature trigger optionally carries which feature(s) — set by caller
  // via the trigger prop in a future extension; for now we just key off the
  // trigger kind for copy variations.
  const [pendingEmail, setPendingEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [authError, setAuthError] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  // Mobile flow: tier is chosen on the intro screen, then form submission
  // routes the user directly to checkout/sign-up based on this value.
  const [selectedTier, setSelectedTier] = useState("annual");
  // Detect a signed-in user from localStorage so we can skip the signup form
  // on mobile (sign-in screen-out).
  const [user, setUser] = useState(null);
  // Distinguishes a returning signed-in user (was already in localStorage when
  // the modal opened) from a brand-new signup completed during THIS session.
  //   - returning  → hide Free in the tier step (already past the free trial)
  //   - new signup → show Free in the tier step (it's their first plan choice)
  const [wasSignedInOnOpen, setWasSignedInOnOpen] = useState(false);
  const [inAppBrowser, setInAppBrowser] = useState(false);

  // Track viewport size so we can branch the flow (desktop = 2 steps, mobile = 3 steps).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 760px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    setInAppBrowser(detectInAppBrowser());
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // On every open: hydrate user state + saved Step 1 progress, decide step.
  useEffect(() => {
    if (!show) return;
    // Hydrate signed-in user (if any) from localStorage.
    let signedInUser = null;
    if (typeof window !== "undefined") {
      try {
        const raw = window.localStorage.getItem("user");
        if (raw) signedInUser = JSON.parse(raw);
      } catch (_) {}
    }
    setUser(signedInUser);
    setWasSignedInOnOpen(!!signedInUser?.email);
    if (signedInUser?.email) setEmail(signedInUser.email);

    const progress = readSignupProgress();
    setAuthError("");
    setAuthBusy(false);
    setSuccessToast("");
    setPendingEmail("");
    if (signedInUser?.email) {
      // Signed-in user (free or paid) → first see the "Upgrade To Pro" pitch
      // screen (carousel + value props + Get Full Access CTA), then on
      // Continue → tier selection. No form panel for them; that's hidden
      // via JSX conditional inside StepOne.
      setStep("intro");
    } else {
      // Guest: same pitch screen but with the daily-limit copy, and the
      // Create-Your-Account form on the right (or as step 2 on mobile).
      if (progress?.email) setEmail(progress.email);
      setStep(isMobile ? "intro" : "signup");
    }
    setPassword("");
  }, [show, isMobile]);

  const handleIntroContinue = () => {
    // Signed-in user already has an account — skip the form and go to tiers.
    // Guest needs to create an account first → form panel (signup step).
    setStep(user ? "tiers" : "signup");
  };

  // Inline tap-to-choose CTA on each mobile tier card. For a signed-in user we
  // skip the form and redirect straight to the tier's destination; otherwise
  // we advance to the sign-up form (where submit then redirects).
  const handleMobileTierConfirm = (tierKey) => {
    setSelectedTier(tierKey);
    if (user?.email) {
      const t2 = getTiers(t, user.email).find((tr) => tr.key === tierKey);
      if (t2 && typeof window !== "undefined") {
        clearSignupProgress();
        window.location.href = t2.href;
        onHide?.();
      }
      return;
    }
    setStep("signup");
  };

  // ─── Mobile multi-step signup handlers ─────────────────────────────────
  const handlePaywallContinue = () => {
    setAuthError("");
    setStep("email");
  };

  const handleEmailSubmit = async (e) => {
    e?.preventDefault?.();
    const value = pendingEmail.trim().toLowerCase();
    if (!value || !value.includes("@")) {
      setAuthError("Please enter a valid email address.");
      return;
    }
    setAuthError("");
    // Save email for the tier-step CTAs (so they can pass ?email= in the
    // /sign-up redirect). Account creation happens on the separate page.
    setEmail(value);
    saveSignupProgress(value);
    setStep("tiers");
  };

  const handleGoogleAuth = async () => {
    // Mock Google OAuth: pretend Google returned this email. Hydrate as a
    // new account on the free plan and advance to tier selection.
    setAuthBusy(true);
    const u = await mockCreateAccount("google.user@tokscript.com");
    setUser(u);
    setEmail(u.email);
    setAuthBusy(false);
    setStep("tiers");
  };

  const handleSignIn = async (e) => {
    e?.preventDefault?.();
    if (!password || password.length < 8) {
      setAuthError("Password must be at least 8 characters.");
      return;
    }
    setAuthError("");
    setAuthBusy(true);
    const u = await mockSignIn(email, password);
    setUser(u);
    setAuthBusy(false);

    // Paid users → close modal + toast (route back to the feature is handled
    // by the parent page since the modal doesn't own routing).
    if (u.plan && u.plan !== "free") {
      clearSignupProgress();
      setSuccessToast(
        `${t?.dontMissOutModal?.welcomeBack || "Welcome back,"} ${u.email}.`
      );
      setTimeout(() => {
        setSuccessToast("");
        onHide?.();
      }, 1600);
      return;
    }
    // Free user → upgrade options only (no Free card / no "Start Free" link).
    setStep("tiers");
  };

  const handleCreateAccount = async (e) => {
    e?.preventDefault?.();
    if (!password || password.length < 8) {
      setAuthError("Password must be at least 8 characters.");
      return;
    }
    setAuthError("");
    setAuthBusy(true);
    const u = await mockCreateAccount(email);
    setUser(u);
    // Mark this user as never-welcomed so the dashboard (separate codebase)
    // can show the Step 10 welcome state on first visit. Cleared on dismissal
    // there. Stubbed here since the dashboard lives in another repo.
    try {
      window.localStorage.setItem("tokscript_welcomed_v1", "pending");
    } catch (_) {}
    setAuthBusy(false);
    setStep("tiers");
  };

  const handleContinue = () => {
    saveSignupProgress(email);
    // Persist a temporary free-tier user in localStorage so this prototype
    // can demo the signed-in free-user experience right after sign-up. The
    // real backend would replace this with an actual account creation call.
    if (typeof window !== "undefined" && email && email.includes("@")) {
      try {
        const newUser = { email, plan: "free" };
        window.localStorage.setItem("user", JSON.stringify(newUser));
        setUser(newUser);
      } catch (_) {}
    }
    // Both viewports: form submit advances to the tier-selection step.
    setStep("tiers");
  };

  const handleTierSelect = (tier) => {
    // Clear progress when the user picks any tier so the marker doesn't stick
    // around forever. For paid plans (target=_blank), clearing on click is OK
    // because the parent tab is no longer mid-flow once they've handed off.
    clearSignupProgress();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className={`dont-miss-out-modal-v3 dont-miss-step-${step}`}
      backdropClassName="dont-miss-backdrop"
      aria-labelledby="contained-modal-title-vcenter"
    >
      <Modal.Body style={{ padding: 0 }}>
        <style>{`
          @keyframes tsFadeIn {
            from { opacity: 0; transform: translateY(4px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        <div
          className="dont-miss-shell"
          style={{
            position: "relative",
            display: "flex",
            background: T.outerBg,
            // Match the .modal-content radius exactly so the modal reads
            // with the same curve on all four corners (was previously
            // 20 inside a 24 outer, which made the top edge appear more
            // rounded than the bottom).
            borderRadius: 20,
            // Let the shell scroll internally instead of clipping card content
            // when the modal hits its viewport cap. Horizontal stays clipped so
            // the bg image + glows respect the rounded corners.
            overflowX: "hidden",
            overflowY: "auto",
            // Trimmed from 90vh → 78vh so the desktop modal feels tighter.
            // The internal panels still scroll if content exceeds.
            maxHeight: "78vh",
            minHeight: 0,
          }}
        >
          {/* Soft swirl background (Figma asset). Sits behind all modal content
              at 14% opacity on both desktop and mobile. */}
          <img
            className="dont-miss-bg-image"
            src={`${process.env.NEXT_PUBLIC_BASE_PATH || ""}/figma-rows/modal-bg-mobile.png`}
            alt=""
            aria-hidden
          />

          {/* Accent glow — top-left */}
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

          {/* Accent glow — bottom-right (mirrors the top glow). */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              bottom: -120,
              right: -80,
              width: 320,
              height: 320,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(0,212,204,0.20), transparent 65%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <button
            onClick={onHide}
            aria-label={t?.dontMissOutModal?.closeAlt || "Close"}
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

          {/* In-app browser banner (Instagram/TikTok/etc). Suggests opening
              the page in a real browser for the best signup experience. */}
          {inAppBrowser && (
            <a
              href={typeof window !== "undefined" ? window.location.href : "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                margin: "12px 12px 0",
                padding: "8px 12px",
                borderRadius: 10,
                background: "rgba(0,212,204,0.10)",
                border: `1px solid rgba(0,212,204,0.30)`,
                color: T.accent,
                fontSize: 12,
                fontWeight: 600,
                textAlign: "center",
                textDecoration: "none",
                position: "relative",
                zIndex: 4,
              }}
            >
              {t?.dontMissOutModal?.openInBrowser ||
                "For Best Experience, Open In Safari →"}
            </a>
          )}

          {/* Mobile 3-step flow: intro (pitch + Get Full Access) → signup
              (email/password form) → tiers (plan selection). Desktop renders
              the same 2-step flow it always did. The contextual-paywall +
              email-check components stay defined in the file but are not used
              in this simpler flow. */}
          {step === "tiers" ? (
            <StepTwo
              t={t}
              email={email}
              onBack={() => setStep(isMobile ? "signup" : "signup")}
              onTierSelect={handleTierSelect}
              user={user}
              trigger={entryTrigger}
              isMobile={isMobile}
              selectedTier={selectedTier}
              setSelectedTier={setSelectedTier}
              wasSignedInOnOpen={wasSignedInOnOpen}
            />
          ) : (
            // intro (mobile pitch) and signup (form) both render StepOne. SCSS
            // rules hide the form on mobile-intro and hide the pitch on
            // mobile-signup; desktop shows both panels side-by-side.
            <StepOne
              t={t}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              showPw={showPw}
              setShowPw={setShowPw}
              onContinue={handleContinue}
              onIntroContinue={handleIntroContinue}
              onMaybeLater={onHide}
              selectedTier={selectedTier}
              setSelectedTier={setSelectedTier}
              user={user}
              onMobileTierConfirm={handleMobileTierConfirm}
              isMobile={isMobile}
            />
          )}

          {successToast && (
            <div
              role="status"
              aria-live="polite"
              style={{
                position: "absolute",
                bottom: 16,
                left: 16,
                right: 16,
                padding: "12px 16px",
                borderRadius: 12,
                background: T.accent,
                color: "#06302e",
                fontSize: 13.5,
                fontWeight: 700,
                textAlign: "center",
                zIndex: 50,
                boxShadow: "0 8px 22px -4px rgba(0,184,178,0.4)",
              }}
            >
              {successToast}
            </div>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
