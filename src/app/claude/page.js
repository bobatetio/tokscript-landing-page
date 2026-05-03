"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import { bodyHtml, pageScript, jsonLd } from "./content";
import "./claude.css";

export default function ClaudePage() {
  useEffect(() => {
    // Execute the page's interactive scripts after the body HTML is in the DOM.
    // The script attaches click handlers, copy-button helpers (on window for inline onclick),
    // platform tab switching, logo rotation, and the platform-word rotator.
    const scriptEl = document.createElement("script");
    scriptEl.textContent = pageScript;
    scriptEl.setAttribute("data-tokscript-claude-runtime", "1");
    document.body.appendChild(scriptEl);

    return () => {
      // Clean up the injected script tag on unmount; intervals declared in the IIFEs
      // continue running until full page navigation, which matches the original static
      // behavior (the original page never tore them down either).
      scriptEl.remove();
    };
  }, []);

  return (
    <>
      <Header />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <div
        className="claude-page-body"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </>
  );
}
