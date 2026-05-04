"use client";
import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

/**
 * Embed a static HTML page (served from /public) inside the universal
 * Next.js Header + Footer. The iframe is auto-resized to its content height
 * so it looks like a normal continuous page (no internal scrollbar).
 */
export default function StaticPageFrame({ src, title }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(800);

  useEffect(() => {
    const iframe = ref.current;
    if (!iframe) return undefined;

    const resize = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const h = Math.max(
          doc.documentElement.scrollHeight,
          doc.body.scrollHeight
        );
        if (h && Math.abs(h - height) > 2) setHeight(h);
      } catch {
        // ignore (cross-origin) — same-origin /public is safe
      }
    };

    const onLoad = () => {
      resize();
      // Watch for late layout shifts (image loads, font load, JS-driven changes)
      try {
        const ro = new ResizeObserver(resize);
        const doc = iframe.contentDocument;
        if (doc) {
          ro.observe(doc.documentElement);
          ro.observe(doc.body);
        }
        iframe._ro = ro;
      } catch {
        /* noop */
      }
    };

    iframe.addEventListener("load", onLoad);
    if (iframe.contentDocument?.readyState === "complete") onLoad();

    const onWindowResize = () => resize();
    window.addEventListener("resize", onWindowResize);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", onWindowResize);
      iframe._ro?.disconnect();
    };
  }, [height]);

  return (
    <>
      <Header />
      <iframe
        ref={ref}
        src={src}
        title={title}
        scrolling="no"
        style={{
          display: "block",
          width: "100%",
          height: `${height}px`,
          border: 0,
          background: "#0d0d0d",
        }}
      />
      <Footer />
    </>
  );
}
