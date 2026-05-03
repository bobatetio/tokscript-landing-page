"use client";

import { useEffect } from "react";
import Header from "../../components/Header";
import { bodyHtml, pageScript, jsonLd } from "./content";
import "./chatgpt.css";

export default function ChatgptPage() {
  useEffect(() => {
    // Execute the page's interactive scripts after the body HTML is in the DOM.
    // The script attaches click handlers, copy-button helpers (on window for inline onclick),
    // platform tab switching, logo rotation, and the platform-word rotator.
    const scriptEl = document.createElement("script");
    scriptEl.textContent = pageScript;
    scriptEl.setAttribute("data-tokscript-chatgpt-runtime", "1");
    document.body.appendChild(scriptEl);

    return () => {
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
        className="chatgpt-page-body"
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />
    </>
  );
}
