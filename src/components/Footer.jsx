"use client";

import React, { useEffect, useState } from "react";
import logo from "../assets/images/icons/logo.png";
import { FaInstagram, FaLinkedinIn, FaTiktok, FaYoutube, FaXTwitter } from "@/components/Icons";
import Link from "next/link";
import Image from "next/image";
import PerplexityIcon from "../assets/images/icons/ai/PerplexityIcon";
import ChatGPTIcon from "../assets/images/icons/ai/ChatGPTIcon";
import GrokIcon from "../assets/images/icons/ai/GrokIcon";
import ClaudeIcon from "../assets/images/icons/ai/ClaudeIcon";
import GeminiIcon from "../assets/images/icons/ai/GeminiIcon";
import { getAiPromptUrls } from "../lib/aiPrompts";

const Footer = ({ t }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Check if user data exists in localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const trackAiClick = (platform) => {
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'ai_prompt_click',
        platform: platform,
        event_category: 'footer',
        event_label: 'prompt_preloading'
      });
    }
  };

  const aiPromptUrls = getAiPromptUrls();

  return (
    <div className="footer-section">
      <div className="container">
        <div className="row">
          <div className="col-md-4 col-12">
            <div className="left-section">
              <Link href="/">
                <Image src={logo} alt="TokScript" className="footer-logo" />
              </Link>
              <p>
                {t?.footer?.description || "The most advanced TikTok transcription tool. Turn your videos into accurate transcripts instantly with AI-powered technology."}
              </p>
              <div className="main-div d-md-block d-none">
                <div className="icons-div">
                  <Link href="https://tiktok.com/@tokscript" target="_blank">
                    <FaTiktok />
                  </Link>
                  <Link href="https://www.instagram.com/tokscript" target="_blank">
                    <FaInstagram />
                  </Link>
                  <Link href="https://www.youtube.com/@Tokscript" target="_blank">
                    <FaYoutube />
                  </Link>
                  <Link href="https://www.linkedin.com/company/tokscript/" target="_blank">
                    <FaLinkedinIn />
                  </Link>
                  <Link href="https://x.com/tokscript" target="_blank" rel="noopener noreferrer">
                    <FaXTwitter />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-4 mb-md-0">
            <div className="right-section">
              <span className="footer-col-title">{t?.footer?.generators?.title || "Generators"}</span>
              <div className="link-detail">
                <Link href="/">{t?.footer?.generators?.tiktok || "TikTok Transcript Generator"}</Link>
              </div>
              <div className="link-detail">
                <Link href="/instagram-transcript-generator">
                  {t?.footer?.generators?.instagram || "Instagram Transcript Generator"}
                </Link>
              </div>
              <div className="link-detail">
                <Link href="/youtube-transcript-generator">
                  {t?.footer?.generators?.youtube || "YouTube Transcript Generator"}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-3 col-12 mb-4 mb-md-0">
            <div className="right-section">
              <span className="footer-col-title">{t?.footer?.product?.title || "Product"}</span>
              <div className="link-detail">
                <Link href="/features">{t?.footer?.product?.features || "Features"}</Link>
              </div>
              <div className="link-detail">
                <Link href="/pricing">{t?.footer?.product?.pricing || "Pricing"}</Link>
              </div>
              <div className="link-detail">
                <Link href={`/api`}>{t?.footer?.product?.api || "API"}</Link>
              </div>
              <div className="link-detail">
                <Link href={`/integration`}>{t?.footer?.product?.integrations || "Integrations"}</Link>
              </div>
              <div className="link-detail">
                <Link href={`/legal`}>{t?.footer?.product?.legal || "Legal"}</Link>
              </div>
            </div>
          </div>
          <div className="col-md-2 col-12">
            <div className="right-section">
              <span className="footer-col-title">{t?.footer?.company?.title || "Company"}</span>
              <div className="link-detail">
                <Link href={`/about-us`}>{t?.footer?.company?.about || "About"}</Link>
              </div>
              <div className="link-detail">
                <Link href={`/contact`}>{t?.footer?.company?.contact || "Contact"}</Link>
              </div>
              <div className="link-detail">
                <Link href={`/privacy`}>{t?.footer?.company?.privacy || "Privacy"}</Link>
              </div>
              <div className="link-detail">
                <Link href={`/terms`}>{t?.footer?.company?.terms || "Terms"}</Link>
              </div>

              <div className="link-detail">
                <Link href="https://help.tokscript.com/" target="_blank">
                  {t?.footer?.company?.helpCenter || "Featurebase help center"}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-12 d-md-none d-block">
            <div className="left-section">
              <div className="icons-div">
                <Link href="https://tiktok.com/@tokscript" target="_blank">
                  <FaTiktok />
                </Link>
                <Link href="https://www.instagram.com/tokscript" target="_blank">
                  <FaInstagram />
                </Link>
                <Link href="https://www.youtube.com/@Tokscript" target="_blank">
                  <FaYoutube />
                </Link>
                <Link href="https://www.linkedin.com/company/tokscript/" target="_blank">
                  <FaLinkedinIn />
                </Link>
                <Link href="https://x.com/tokscript" target="_blank" rel="noopener noreferrer">
                  <FaXTwitter />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="ask-ai-section">
          <p className="ask-ai-label">Ask AI about TokScript</p>
          <div className="ask-ai-icons">
            {aiPromptUrls.map(({ platform, url, ariaLabel, title }) => {
              const IconComponent = {
                perplexity: PerplexityIcon,
                chatgpt: ChatGPTIcon,
                grok: GrokIcon,
                claude: ClaudeIcon,
                gemini: GeminiIcon,
              }[platform];
              return (
                <a
                  key={platform}
                  href={url}
                  target="_blank"
                  rel="nofollow noopener"
                  title={title}
                  aria-label={ariaLabel}
                  onClick={() => trackAiClick(platform)}
                >
                  <IconComponent />
                </a>
              );
            })}
          </div>
        </div>
        <div className="bottom-section">
          <p>{t?.footer?.copyright ? t.footer.copyright.replace("{year}", new Date().getFullYear()) : `© ${new Date().getFullYear()} TokScript. All rights reserved.`}</p>
          {user ? (
            <></>
          ) : (
            <button
              className="trial-btn"
              onClick={() =>
                window.open(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`)
              }
            >
              {t?.footer?.cta || "Start Free Today"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Footer;
