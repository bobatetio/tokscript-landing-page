import React from "react";
import Image from "next/image";
import SIgnupGetAccess from "./SIgnupGetAccess";

import tiktokIcon from "../assets/images/icons/Tiktok logo.svg";
import youtubeIcon from "../assets/images/icons/Youtube logo.svg";
import instagramIcon from "../assets/images/icons/Instagram logo.svg";

export default function DontMissComponent() {
  return (
    <div className="dont-miss-component-wrapper">
      <div className="main-title-wrapper">
        <h2>Don’t Miss Out</h2>
        <h3>You’re just one step away from unlocking this feature.</h3>
      </div>
      <SIgnupGetAccess />
      <div className="social-icons-wrapper">
        <span>Supported Social Networks</span>
        <ul className="social-icons">
          <li>
            <Image src={tiktokIcon} alt="TikTok" />
          </li>
          <li>
            <Image src={youtubeIcon} alt="YouTube" />
          </li>
          <li>
            <Image src={instagramIcon} alt="Instagram" />
          </li>
        </ul>
      </div>
      <div className="joining-main-wrapper">
        <div className="text-wrapper">
          <h3>✨ It only takes 10 seconds to join.</h3>
        </div>
        <div className="join-serch-bar">
          <div className="input-wrapper">
            <input
              type="text"
              className="form-control"
              placeholder="Email address"
            />
          </div>
          <div className="btn-wrapper">
            <button className="btn-style" onClick={() => window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`}>Get started</button>
          </div>
        </div>
      </div>
    </div>
  );
}
