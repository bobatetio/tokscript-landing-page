"use client";
import React, { useState, useEffect, useRef } from "react";

import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import logo from "../assets/images/icons/logo.png";
import bellIcon from "../assets/images/icons/bell-icon.svg";
// import avatarIcon from "../assets/images/icons/avatar.webp";
import avatarIcon from "../assets/images/user-icon.webp";
import gearIcon from "../assets/images/icons/gear-icon.webp";
import wheelIcon from "../assets/images/icons/wheel-icon.webp";
import logOutIcon from "../assets/images/icons/logout-icon.svg";
import lighteningIcon from "../assets/images/icons/lightning-icon.svg";
import extensionIcon from "../assets/images/icons/extension-icon.svg";
import bannerClaudeIcon from "../../assets_updated/images/mcp/banner-claude-icon.svg";
import bannerChatgptIcon from "../../assets_updated/images/mcp/banner-chatgpt-icon.svg";
import Link from "next/link";
import Image from "next/image";
import {
  FileText,
  Layers,
  FolderDown,
  Download,
  Cloud,
  Zap,
  Puzzle,
  Users,
  Globe,
  Bot,
} from "lucide-react";

import { features } from "@/data/features";
import LanguageSwitcher from "./LanguageSwitcher";

// Clean, minimal outline icons like Ferndesk
const FeatureIcons = {
  "transcript-generator": ({ color }) => (
    <FileText color={color} size={22} strokeWidth={2} />
  ),
  "bulk-import": ({ color }) => (
    <Layers color={color} size={22} strokeWidth={2} />
  ),
  "collection-import": ({ color }) => (
    <FolderDown color={color} size={22} strokeWidth={2} />
  ),
  "hd-downloads": ({ color }) => (
    <Download color={color} size={22} strokeWidth={2} />
  ),
  "cloud-storage": ({ color }) => (
    <Cloud color={color} size={22} strokeWidth={2} />
  ),
  "quick-download": ({ color }) => (
    <Zap color={color} size={22} strokeWidth={2} />
  ),
  "chrome-extension": ({ color }) => (
    <Puzzle color={color} size={22} strokeWidth={2} />
  ),
  "team-collaboration": ({ color }) => (
    <Users color={color} size={22} strokeWidth={2} />
  ),
  translations: ({ color }) => (
    <Globe color={color} size={22} strokeWidth={2} />
  ),
  "ai-agents": ({ color }) => <Bot color={color} size={22} strokeWidth={2} />,
};

export default function Header({ t }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = typeof window !== "undefined" ? window.location : null;
  const [bannerDismissed, setBannerDismissed] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const featuresTimeoutRef = React.useRef(null);
  const wrapperRef = useRef(null);
  const [spacerHeight, setSpacerHeight] = useState(0);

  // Measure header+banner height for spacer
  useEffect(() => {
    const updateHeight = () => {
      if (wrapperRef.current) {
        setSpacerHeight(wrapperRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, [bannerDismissed]);

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

  // Add/remove active class to body when mobile menu opens/closes
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("active");
    } else {
      document.body.classList.remove("active");
    }

    // Cleanup function to remove class when component unmounts
    return () => {
      document.body.classList.remove("active");
    };
  }, [mobileMenuOpen]);

  const handleLogout = async () => {
    try {
      const authToken = localStorage.getItem("authToken");

      if (authToken) {
        // Make API call to logout endpoint
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${authToken}`,
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          console.error("Logout API call failed:", response.statusText);
        }
      }
    } catch (error) {
      console.error("Error during logout API call:", error);
    } finally {
      // Clear localStorage and reset state regardless of API call success/failure
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
      setUser(null);
    }
  };

  // Menu content for reuse
  const menuContent = (
    <ul className="menu">
      {/* <li>
        <a href="#">
          <DropdownButton
            key={"down"}
            id={`dropdown-button-drop-${"down"}`}
            drop={"down"}
            title={`Free Tools`}
          ></DropdownButton>
        </a>
      </li> */}
      {user ? (
        <>
          <li>
            <Link
              href="/"
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`)
              }
            >
              {t?.header?.nav?.home || "Home"}
            </Link>
          </li>

          <li>
            <Link href="https://help.tokscript.com/" target="_blank">
              {t?.header?.nav?.support || "Support"}
            </Link>
          </li>
          <li className="pricing-nav-item">
            <Link href="/pricing">{t?.header?.nav?.pricing || "Pricing"}</Link>
          </li>
          <li>
            <Link
              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/settings`}
              target="_blank"
            >
              {t?.header?.nav?.settings || "Settings"}
            </Link>
          </li>
          <li>
            <Link
              href="https://chromewebstore.google.com/detail/tokscript/ligffiaiehimfbhjflgkkfanhfjmdaoi?hl=en"
              target="_blank"
            >
              <Image src={extensionIcon} alt="" />
              {t?.header?.nav?.installExtension || "Install Chrome Extension"}
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              {" "}
              {/* <img src={logOutIcon} alt="" />  */}
              {t?.header?.nav?.logout || "Logout"}
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link href="/">{t?.header?.nav?.home || "Home"}</Link>
          </li>
          <li
            className="features-dropdown-wrapper"
            onMouseEnter={() => {
              clearTimeout(featuresTimeoutRef.current);
              setFeaturesOpen(true);
            }}
            onMouseLeave={() => {
              featuresTimeoutRef.current = setTimeout(
                () => setFeaturesOpen(false),
                150,
              );
            }}
          >
            <Dropdown
              className="features-dropdown"
              show={!mobileMenuOpen ? featuresOpen : undefined}
            >
              <Dropdown.Toggle as="button" className="features-toggle">
                {t?.header?.nav?.features || "Features"}
              </Dropdown.Toggle>
              <Dropdown.Menu className="features-menu">
                <div className="features-label">
                  {t?.header?.nav?.featuresLabel || "FEATURES"}
                </div>
                <div className="features-grid">
                  {features.map((feature) => {
                    const IconComponent = FeatureIcons[feature.slug];
                    return (
                      <Dropdown.Item
                        key={feature.slug}
                        as={Link}
                        href={feature.path}
                        className="feature-item"
                        style={{ "--item-color": feature.color }}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <div className="feature-icon">
                          {IconComponent && (
                            <IconComponent color={feature.color} />
                          )}
                        </div>
                        <div className="feature-text">
                          <strong>{feature.title}</strong>
                          <span>{feature.shortDescription}</span>
                        </div>
                      </Dropdown.Item>
                    );
                  })}
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </li>
          <li className="pricing-nav-item">
            <Link href="/pricing">{t?.header?.nav?.pricing || "Pricing"}</Link>
          </li>
          <li>
            <Link href="/mcp">MCP</Link>
          </li>
          <li className="affiliate-nav-item">
            <Link href="/affiliate">
              {t?.header?.nav?.affiliate || "Affiliate"}
              <span className="affiliate-badge">💰 40%</span>
            </Link>
          </li>
          <li onClick={() => setMobileMenuOpen(false)}>
            <a href={location?.pathname === "/pricing" ? "#faq" : "/#faqs"}>
              {t?.header?.nav?.faqs || "FAQs"}
            </a>
          </li>
        </>
      )}
    </ul>
  );

  const rightMenuContent = (
    <ul className="right-menu">
      {user ? (
        // Show user email and logout button when user is logged in
        <>
          {(user?.plan || "free").toLowerCase() === "free" ? (
            <>
              <Link
                href="/upgrade"
                className={`badge-wrapper green-gradient normal w-500`}
              >
                <Image src={lighteningIcon} alt="" />
                {t?.header?.nav?.upgradePlan || "Upgrade My Plan"}
              </Link>
            </>
          ) : (
            <>
              <span className={`badge-wrapper  normal w-500`}>
                {(user?.plan || "Free").charAt(0).toUpperCase() +
                  (user?.plan || "free").slice(1)}
                {" Plan"}
              </span>
            </>
          )}
          <div className="user-meta-info-wrapper">
            <div className="icon-wrapper">
              <Image
                src={user?.profilePicture || avatarIcon}
                alt="User avatar"
                width={40}
                height={40}
              />
            </div>
            <div className="text-wrapper">
              <DropdownButton
                key={"down"}
                id={`dropdown-button-drop-${"down"}`}
                drop={"down"}
                className="custom-dropdown"
                title={user?.name || " "}
              >
                <Dropdown.Item
                  as={Link}
                  href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/settings`}
                >
                  <Image src={gearIcon} alt="" />{" "}
                  {t?.header?.nav?.settings || "Settings"}
                </Dropdown.Item>
                <Dropdown.Item
                  as={Link}
                  href="https://help.tokscript.com/"
                  target="_blank"
                >
                  <Image src={wheelIcon} alt="" />{" "}
                  {t?.header?.nav?.helpSupport || "Help & Support"}
                </Dropdown.Item>
                <Dropdown.Item onClick={handleLogout}>
                  {" "}
                  <Image src={logOutIcon} alt="" />{" "}
                  {t?.header?.nav?.logout || "Logout"}
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </div>
          {/* <li>
            <button
              onClick={() =>
                (window.location.href = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/dashboard`)
              }
              className="btn-style has-shadow w-500"
            >
              My Dashboard
            </button>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="btn-style has-shadow w-500"
            >
              Logout
            </button>
          </li> */}
        </>
      ) : (
        // Show login and get started buttons when user is not logged in
        <>
          <LanguageSwitcher />
          <li>
            <Link
              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/signin`}
              className="white"
            >
              {t?.header?.auth?.login || "Log In"}
            </Link>
          </li>
          <li>
            <Link
              href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`}
              className="btn-style has-shadow w-500"
            >
              {t?.header?.auth?.getStarted || "Get Started"}
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <>
      <div className="header-sticky-wrapper" ref={wrapperRef}>
        <header className="header">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-3 col-xl-3  col-5 align-self-center">
                <div className="logo-wrapper">
                  <Link href="/">
                    <Image src={logo} alt="TokScript" />
                  </Link>
                </div>
              </div>
              {/* Desktop menu */}
              <div className="col-lg-6 col-xl-6  align-self-center d-none d-lg-block">
                <div className="menu-wrapper">{menuContent}</div>
              </div>
              <div className="col-lg-3 col-xl-3  align-self-center d-none d-lg-block">
                <div className="right-menu-wrapper">{rightMenuContent}</div>
              </div>
              {/* Hamburger icon for mobile */}
              <div className="col-lg-3 col-7 align-self-center d-lg-none">
                <div className="mobile-right-menu">
                  {user ? (
                    <>
                      {(user?.plan || "free").toLowerCase() === "free" ? (
                        <>
                          <Link
                            href="/upgrade"
                            className={`badge-wrapper green-gradient normal w-500`}
                          >
                            <Image src={lighteningIcon} alt="" />
                            {t?.header?.nav?.upgradePlan || "Upgrade My Plan"}
                          </Link>
                        </>
                      ) : (
                        <>
                          <span className={`badge-wrapper  normal w-500`}>
                            {(user?.plan || "Free").charAt(0).toUpperCase() +
                              (user?.plan || "free").slice(1)}
                            {" Plan"}
                          </span>
                        </>
                      )}
                      <div className="text-wrapper">
                        <DropdownButton
                          key={"down"}
                          id={`dropdown-button-drop-${"down"}`}
                          drop={"down"}
                          className="custom-dropdown"
                          title={
                            <Image
                              src={user?.profilePicture || avatarIcon}
                              alt="User avatar"
                              width={40}
                              height={40}
                            />
                          }
                        >
                          {/* <Dropdown.Item
                        as={Link}
                        href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/app/settings`}
                      >
                        <Image src={gearIcon} alt="" /> Settings
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        href="https://help.tokscript.com/"
                        target="_blank"
                      >
                        <Image src={wheelIcon} alt="" /> Help & Support
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        {" "}
                        <Image src={logOutIcon} alt="" /> Logout
                      </Dropdown.Item> */}
                        </DropdownButton>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/sign-up`}
                      className="btn-style has-shadow w-500"
                    >
                      {t?.header?.auth?.signUp || "Sign Up"}
                    </Link>
                  )}

                  {mobileMenuOpen ? (
                    <button
                      className="close-menu"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      &times;
                    </button>
                  ) : (
                    <div className="mobile-hamburger">
                      <button
                        className="hamburger-btn"
                        aria-label="Open menu"
                        onClick={() => setMobileMenuOpen(true)}
                      >
                        <span></span>
                        <span></span>
                        <span></span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Mobile menu drawer/overlay */}
          {mobileMenuOpen && (
            <div className="mobile-menu-overlay">
              <div className="mobile-menu-content">
                <div className="menu-wrapper">{menuContent}</div>
                <div className="right-menu-wrapper">{rightMenuContent}</div>
              </div>
            </div>
          )}
        </header>
        {!bannerDismissed && (
          <div className="affiliate-announcement-banner">
            <div className="banner-content">
              <img src={bannerClaudeIcon.src} alt="" className="banner-icon" />
              <img src={bannerChatgptIcon.src} alt="" className="banner-icon" />
              <span className="banner-text banner-text-desktop">
                New Update! TokScript now works inside Claude and ChatGPT
              </span>
              <span className="banner-text banner-text-mobile">
                New! Now inside Claude and ChatGPT
              </span>
              <Link href="/mcp" className="banner-cta">
                Learn More
              </Link>
            </div>
            <button
              className="banner-dismiss"
              onClick={() => {
                setBannerDismissed(true);
              }}
              aria-label="Dismiss banner"
            >
              ×
            </button>
          </div>
        )}
      </div>
      <div style={{ height: spacerHeight }} />
    </>
  );
}
