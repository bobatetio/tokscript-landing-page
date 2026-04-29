import React from "react";

import sparkIcon from "../assets/images/icons/AI spark.svg";
import circularIcon from "../assets/images/icons/circular-tick-icon.svg";
import Image from "next/image";
export default function SIgnupGetAccess() {
  return (
    <div className="sign-up-and-get-access-wrapper">
      <div className="text-wrapper">
        <strong className="white">Sign up free and get access to:</strong>
      </div>
      <div className="features-wrapper">
        <ul className="features">
          <li>
            <Image src={sparkIcon} alt="" /> 25 TikTok transcripts (no
            credit card needed)
          </li>
          <li>
            <Image src={circularIcon} alt="" />
            Save your history & bookmarks{" "}
          </li>
          <li>
            <Image src={circularIcon} alt="" />
            Try our Chrome Extension{" "}
          </li>
          <li>
            <Image src={circularIcon} alt="" />
            Download Reels & Shorts (3/day){" "}
          </li>
          <li>
            <Image src={circularIcon} alt="" />
            Chrome Extension (full features){" "}
          </li>
        </ul>
      </div>
    </div>
  );
}
