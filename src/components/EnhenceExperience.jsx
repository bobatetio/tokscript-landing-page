import React from "react";

import ehnenceExperienceImg from "../assets/images/enhence-experience-img.webp";
import extensionIcon from "../assets/images/icons/extension-icon.svg";
import Image from "next/image";

export default function EnhenceExperience({ title, cta, imageAlt }) {
  return (
    <div className="enhence-experience-wrapper">
      <div className="container">
        <div className="inner-section">
          <div className="row">
            <div className="col-xl-6 col-lg-7 col-md-7 ">
              <div className="content-wrapper">
                <h2 className="white">
                  {title || "Enhance Your Experience with Our Chrome Extension"}
                </h2>
                <button className="btn-style dark" onClick={() => window.open('https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en-US', '_blank')}>
                  {" "}
                  <Image
                    src={extensionIcon}
                    alt=""
                    className="no-filter"
                  />{" "}
                  {cta || "Add to Chrome"}
                </button>
              </div>
            </div>
            <div className="col-xl-6 col-lg-5 col-md-5 align-self-end">
              <div className="image-wrapper">
                <Image src={ehnenceExperienceImg} alt={imageAlt || "TokScript Chrome extension showing one-click transcript extraction on a TikTok video"} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
