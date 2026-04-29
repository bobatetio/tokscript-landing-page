"use client";

import React from "react";
import { IoShieldCheckmark } from "@/components/Icons";

const LegalDisclaimer = () => {
  return (
    <div className="legal-disclaimer-section">
      <div className="container">
        <div className="disclaimer-wrapper">
          <div className="disclaimer-icon">
            <IoShieldCheckmark />
          </div>
          <div className="disclaimer-content">
            <h6 className="disclaimer-title white m-0">LEGAL DISCLAIMER</h6>
            <p className="disclaimer-text">
              Tokscript is not affiliated with, endorsed by, or sponsored by
              TikTok, TikTok USDS Joint Venture LLC, ByteDance, Instagram, Meta,
              YouTube, or Google. All trademarks belong to their respective
              owners.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDisclaimer;
