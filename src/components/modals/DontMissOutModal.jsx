"use client";

import "@/assets/scss/modal.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import { Gift, Download, Youtube, Chrome, WandSparkles, X } from "lucide-react";

import rocketImg from "../../assets/images/dont-miss-rocket.png";
import bgImg from "../../assets/images/dont-miss-bg.png";

const ACCENT = "#fb923c";

function FeatureIconFrame({ children }) {
  const dot = {
    position: "absolute",
    width: 4,
    height: 4,
    borderRadius: "50%",
    background: ACCENT,
  };
  const line = "1px dashed rgba(251,146,60,0.55)";
  return (
    <div
      style={{
        position: "relative",
        width: 40,
        height: 40,
        borderRadius: 7,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ position: "absolute", left: 5, top: 5, bottom: 5, borderLeft: line }} />
      <div style={{ position: "absolute", right: 5, top: 5, bottom: 5, borderRight: line }} />
      <div style={{ position: "absolute", top: 5, left: 5, right: 5, borderTop: line }} />
      <div style={{ position: "absolute", bottom: 5, left: 5, right: 5, borderBottom: line }} />
      <div style={{ ...dot, top: 3, left: 3 }} />
      <div style={{ ...dot, top: 3, right: 3 }} />
      <div style={{ ...dot, bottom: 3, left: 3 }} />
      <div style={{ ...dot, bottom: 3, right: 3 }} />
      <div style={{ position: "relative", color: "#ffffff", display: "flex" }}>{children}</div>
    </div>
  );
}

function FeatureRow({ icon, label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
      <FeatureIconFrame>{icon}</FeatureIconFrame>
      <span style={{ color: "#ffffff", fontSize: 15, fontWeight: 500, lineHeight: 1.4, whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

export default function DontMissOutModal({ show, onHide, t }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const features = [
    { icon: <Gift size={18} strokeWidth={2} />, label: t?.dontMissOutModal?.features?.unlimitedTranscripts || "Unlimited transcripts & bulk downloads" },
    { icon: <Download size={18} strokeWidth={2} />, label: t?.dontMissOutModal?.features?.bulkImport || "Bulk import 50 video links at once" },
    { icon: <Youtube size={18} strokeWidth={2} />, label: t?.dontMissOutModal?.features?.reelsShorts || "Instagram Reels & YouTube Shorts (unlimited)" },
    { icon: <Download size={18} strokeWidth={2} />, label: t?.dontMissOutModal?.features?.collections || "Download TikTok Collections & Playlists" },
    { icon: <Chrome size={18} strokeWidth={2} />, label: t?.dontMissOutModal?.features?.chromeExtension || "Chrome Extension with all Pro Features" },
    { icon: <WandSparkles size={18} strokeWidth={2} />, label: t?.dontMissOutModal?.features?.connectAi || "Connect TokScript to your AI" },
  ];

  const ctaHref = user && user?.plan && user.plan !== "free" ? "/app/dashboard" : user && user?.plan === "free" ? "/upgrade" : "/app/sign-up";
  const ctaLabel =
    user && user?.plan && user.plan !== "free"
      ? (t?.dontMissOutModal?.ctaDashboard || "Access your dashboard")
      : user && user?.plan === "free"
      ? (t?.dontMissOutModal?.ctaUpgrade || "Upgrade Now")
      : (t?.dontMissOutModal?.ctaSignUp || "Sign Up & Get Access");

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      className="dont-miss-out-modal-v2"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body style={{ padding: 0 }}>
        <div
          style={{
            position: "relative",
            background: "#181818",
            borderRadius: 20,
            overflow: "hidden",
            minHeight: 560,
          }}
        >
          {/* Sunset background — subtle, behind everything */}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              bottom: 0,
              height: "70%",
              opacity: 0.2,
              backgroundImage: `url(${bgImg.src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              pointerEvents: "none",
            }}
          />

          {/* Rocket */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 360,
              pointerEvents: "none",
              overflow: "hidden",
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }}
            className="dont-miss-rocket-wrap"
          >
            <Image
              src={rocketImg}
              alt=""
              style={{
                position: "absolute",
                top: "55%",
                left: "55%",
                width: 600,
                height: "auto",
                transform: "translate(-50%, calc(-50% + 206px)) rotate(-35.78deg)",
                transformOrigin: "center center",
              }}
            />
          </div>

          {/* Close button */}
          <button
            onClick={onHide}
            aria-label="Close"
            style={{
              position: "absolute",
              top: 14,
              right: 14,
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              zIndex: 3,
            }}
          >
            <X size={16} />
          </button>

          {/* Content */}
          <div
            style={{
              position: "relative",
              zIndex: 2,
              padding: "42px 40px 40px",
              maxWidth: 420,
            }}
            className="dont-miss-content"
          >
            <h2
              style={{
                color: "#ffffff",
                fontSize: 40,
                lineHeight: 1.05,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              {t?.dontMissOutModal?.title || "Don’t Miss Out"}
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.82)",
                fontSize: 14,
                lineHeight: 1.5,
                fontWeight: 500,
                marginTop: 12,
                marginBottom: 28,
                whiteSpace: "nowrap",
              }}
            >
              {t?.dontMissOutModal?.subtitle || "You’re just one step away from unlocking this feature."}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {features.map((f, i) => (
                <FeatureRow key={i} icon={f.icon} label={f.label} />
              ))}
            </div>

            <Link
              href={ctaHref}
              onClick={onHide}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                maxWidth: 340,
                height: 50,
                borderRadius: 16,
                background: "#ffffff",
                color: "#181818",
                fontSize: 16,
                fontWeight: 700,
                textDecoration: "none",
                transition: "transform .12s, box-shadow .15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.3)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {ctaLabel}
            </Link>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
