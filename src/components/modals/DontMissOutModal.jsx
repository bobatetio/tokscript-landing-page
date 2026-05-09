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
} from "lucide-react";
import { LemonProducts } from "@/components/LemonProducts";

// Returning-visitor skip: if the user finished Step 1 in a prior session and
// hasn't picked a tier yet, jump them straight to Step 2 next time.
const SIGNUP_PROGRESS_KEY = "tokscript_signup_progress_v1";
const SIGNUP_PROGRESS_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

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
  // Placeholder images pulled from public/figma-rows/. Swap for final assets
  // when ready by changing the `image` field.
  return [
    {
      key: "dashboard",
      image: "/figma-rows/Your%20Dashboard.png",
      label: tr.dashboardLabel || "The Dashboard",
      sub: tr.dashboardSub || "All Your Research, In One Place",
    },
    {
      key: "extension",
      image: "/figma-rows/Chrome%20Extension.png",
      label: tr.extensionLabel || "Chrome Extension",
      sub: tr.extensionSub || "Live On Every TikTok",
    },
    {
      key: "ai",
      image: "/figma-rows/Mcp.png",
      label: tr.aiLabel || "Claude & ChatGPT",
      sub: tr.aiSub || "TikTok Data Inside Your AI",
    },
    {
      key: "bulk",
      image: "/figma-rows/Bulk%20Input.png",
      label: tr.bulkLabel || "Bulk Imports",
      sub: tr.bulkSub || "50 Links Or A Whole Collection",
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
        aspectRatio: "834 / 510",
        overflow: "hidden",
        animation: "tsFadeIn 360ms ease-out",
      }}
    >
      <img
        src={frame.image}
        alt={frame.label}
        loading="lazy"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
          display: "block",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 78%, rgba(0,0,0,0.85) 100%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 12,
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1.25,
            letterSpacing: "-0.005em",
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {frame.label}
        </div>
        <div
          style={{
            marginTop: 2,
            color: "rgba(255,255,255,0.85)",
            fontSize: 11.5,
            lineHeight: 1.4,
            textShadow: "0 1px 4px rgba(0,0,0,0.6)",
          }}
        >
          {frame.sub}
        </div>
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
}) {
  const frames = useMemo(() => getCarouselFrames(t), [t]);
  const pills = useMemo(() => getFeaturePills(t), [t]);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % frames.length);
    }, 3500);
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
          padding: "30px 32px 22px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
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
              marginBottom: 12,
            }}
          >
            {t?.dontMissOutModal?.eyebrow || "Get Full Access"}
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
              whiteSpace: "pre-line",
            }}
          >
            {t?.dontMissOutModal?.title || "Everything TokScript,\nIn One Account."}
          </h2>
        </div>

        {/* Carousel */}
        <div
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
        </div>

        {/* Feature pills (2 rows of 3) */}
        <div
          className="dont-miss-pills"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: 6,
          }}
        >
          {pills.map((p) => (
            <span
              key={p.label}
              className="dont-miss-pill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "7px 10px",
                borderRadius: 999,
                background: T.accentSoft,
                border: `1px solid rgba(0,212,204,0.22)`,
                color: T.pitchText,
                fontSize: 11.5,
                fontWeight: 600,
                lineHeight: 1.2,
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={p.label}
            >
              {p.mobileLabel ? (
                <>
                  <span className="pill-desktop-label">{p.label}</span>
                  <span className="pill-mobile-label">{p.mobileLabel}</span>
                </>
              ) : (
                p.label
              )}
            </span>
          ))}
        </div>

        {/* Stats row */}
        <div
          className="dont-miss-stats"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            paddingTop: 10,
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

        {/* Mobile-only Continue CTA for the intro step. Matches the site's
            primary `.pc-cta-primary` style. Hidden on desktop and on form/tiers. */}
        <div
          className="dont-miss-mobile-intro-ctas"
          style={{ display: "none", marginTop: 6 }}
        >
          <button
            type="button"
            onClick={onIntroContinue}
            className="pc-cta pc-cta-primary"
            style={{ width: "100%", boxShadow: "none", color: "#ffffff" }}
          >
            {t?.dontMissOutModal?.introCta ||
              t?.dontMissOutModal?.eyebrow ||
              "Get Full Access"}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Right: form panel ──────────────────────────────────────── */}
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
            {t?.dontMissOutModal?.continueCta || "Continue"}
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
          {t?.dontMissOutModal?.googleCta || "Continue With Google"}
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
          {t?.dontMissOutModal?.haveAccount || "Already Have An Account?"}{" "}
          <Link
            href="/app/login"
            style={{
              color: T.formText,
              fontWeight: 700,
              textDecoration: "none",
            }}
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
      bullets: [
        tr.proBullet1 || "Unlimited Transcripts",
        tr.proBullet2 || "Bulk Imports + AI Agents",
        tr.proBullet3 || "Claude & ChatGPT Integration",
      ],
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
      bullets: [
        tr.proBullet1 || "Unlimited Transcripts",
        tr.proBullet2 || "Bulk Imports + AI Agents",
        tr.proBullet3 || "Claude & ChatGPT Integration",
      ],
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
      bullets: [
        tr.lifetimeBullet1 || "Everything In Annual, Forever",
        tr.lifetimeBullet2 || "All Future Features Included",
        tr.lifetimeBullet3 || "No Subscriptions, Ever",
      ],
      cta: tr.lifetimeCta || "Get Lifetime, Save $269",
      href: `https://tokscript.lemonsqueezy.com/checkout/buy/${lifetimeSlug}${emailQuery}`,
      external: true,
      bestValue: true,
    },
  ];
}

function TierCard({ tier, t, onSelect }) {
  const isRec = !!tier.recommended;
  const isBest = !!tier.bestValue;
  const accented = isRec || isBest;

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
    boxShadow: isBest
      ? "0 0 0 5px rgba(0,212,204,0.16), 0 12px 32px rgba(0,212,204,0.18)"
      : isRec
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

  const badgeText = isBest
    ? t?.dontMissOutModal?.tiers?.bestValueBadge || "Best Value"
    : isRec
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

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "6px 0 8px",
          display: "flex",
          flexDirection: "column",
          gap: 7,
        }}
      >
        {tier.bullets.map((b) => (
          <li
            key={b}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 7,
              color: T.pitchText,
              fontSize: 12.5,
              lineHeight: 1.4,
            }}
          >
            <Check
              size={14}
              style={{ color: T.accent, marginTop: 2, flexShrink: 0 }}
              aria-hidden
            />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <a {...ctaProps} style={ctaStyle}>
        {tier.cta}
        {accented && <ArrowRight size={14} />}
      </a>
    </div>
  );
}

function StepTwo({ t, email, onBack, onTierSelect }) {
  const tiers = useMemo(() => getTiers(t, email), [t, email]);
  return (
    <div
      className="dont-miss-step-two"
      style={{
        flex: "1 1 0",
        padding: "30px 22px 24px",
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
        <h2
          style={{
            margin: 0,
            color: T.pitchText,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: "-0.015em",
          }}
        >
          {t?.dontMissOutModal?.tiersTitle || "Welcome. Pick Your Plan."}
        </h2>
        <p
          style={{
            margin: "6px 0 0",
            color: T.pitchMuted,
            fontSize: 13.5,
            lineHeight: 1.5,
          }}
        >
          {t?.dontMissOutModal?.tiersSubtitle ||
            "Start Free, Or Unlock Everything From Day One."}
        </p>
      </div>

      {email && (
        <div
          style={{
            margin: "-6px auto 0",
            color: T.pitchMuted,
            fontSize: 12,
            textAlign: "center",
          }}
        >
          {t?.dontMissOutModal?.continuingAs || "Continuing as"}{" "}
          <span style={{ color: T.pitchText, fontWeight: 600 }}>{email}</span>
          <span style={{ margin: "0 6px" }}>·</span>
          <button
            type="button"
            onClick={onBack}
            style={{
              background: "none",
              border: "none",
              padding: 0,
              color: T.accent,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {t?.dontMissOutModal?.useDifferentEmail || "Use Different Email"}
          </button>
        </div>
      )}

      <div
        className="dont-miss-tier-row"
        style={{
          display: "flex",
          gap: 8,
          alignItems: "stretch",
        }}
      >
        {tiers.map((tier) => (
          <TierCard
            key={tier.key}
            tier={tier}
            t={t}
            onSelect={() => onTierSelect?.(tier)}
          />
        ))}
      </div>

      <a
        href={
          email
            ? `/app/sign-up?email=${encodeURIComponent(email)}&tier=free`
            : "/app/sign-up?tier=free"
        }
        onClick={() => onTierSelect?.({ key: "free" })}
        style={{
          alignSelf: "center",
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          padding: "9px 16px",
          borderRadius: 999,
          background: "transparent",
          border: `1px solid ${T.formBorder}`,
          color: T.pitchMuted,
          fontSize: 12.5,
          fontWeight: 600,
          textDecoration: "none",
          marginTop: -2,
        }}
      >
        {t?.dontMissOutModal?.tryFreeFirst || "Try Free First, Decide Later"}
      </a>

      <p
        style={{
          margin: 0,
          textAlign: "center",
          color: T.pitchMuted,
          fontSize: 11.5,
          lineHeight: 1.5,
        }}
      >
        {t?.dontMissOutModal?.tiersFooter ||
          "All Plans Include Cancel-Anytime and A 7-Day Refund Guarantee."}
      </p>
    </div>
  );
}

export default function DontMissOutModal({ show, onHide, t }) {
  // step values:
  //   "intro" — mobile-only pitch screen (carousel + Continue / Maybe Later)
  //   "signup" — desktop two-panel layout, OR mobile form-only screen
  //   "tiers"  — plan selection
  const [step, setStep] = useState("signup");
  const [isMobile, setIsMobile] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);

  // Track viewport size so we can branch the flow (desktop = 2 steps, mobile = 3 steps).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 760px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  // On every open: if there's saved Step 1 progress, hydrate the email and
  // skip directly to tiers. Otherwise: mobile starts at intro, desktop starts
  // at signup (which shows pitch + form side-by-side).
  useEffect(() => {
    if (!show) return;
    const progress = readSignupProgress();
    if (progress?.email) {
      setEmail(progress.email);
      setStep("tiers");
    } else {
      setStep(isMobile ? "intro" : "signup");
    }
    setPassword("");
  }, [show, isMobile]);

  const handleIntroContinue = () => {
    setStep("signup");
  };

  const handleContinue = () => {
    saveSignupProgress(email);
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
      aria-labelledby="contained-modal-title-vcenter"
      centered
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
            borderRadius: 20,
            overflow: "hidden",
            minHeight: step === "signup" ? 0 : 460,
          }}
        >
          {/* Accent glow */}
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

          {step === "tiers" ? (
            <StepTwo
              t={t}
              email={email}
              onBack={() => setStep("signup")}
              onTierSelect={handleTierSelect}
            />
          ) : (
            // step === "intro" or "signup". On desktop both render the same
            // side-by-side layout. On mobile, CSS hides the form panel for
            // "intro" and the pitch panel for "signup".
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
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}
