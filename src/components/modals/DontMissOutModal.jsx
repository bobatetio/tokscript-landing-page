"use client";

import "@/assets/scss/modal.scss";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";

import circularTickIcon from "../../assets/images/icons/circular-tick-icon.svg";
import closeIcon from "../../assets/images/icons/close-icon.svg";
import aoSparkIcon from "../../assets/images/icons/AI spark.svg";

import { FaBrain, FaFireAlt, FaPenFancy } from "@/components/Icons";

export default function DontMissOutModal({ show, onHide, t }) {
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
  return (
    <>
      {/* <div className="dont-miss-out-modal-wrapper"> */}
      <Modal
        // show={true}
        show={show}
        onHide={onHide}
        size="lg"
        className="dont-miss-out-modal"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <button className="cancel-icon" onClick={onHide}>
            <Image src={closeIcon} alt="Close" onClick={onHide} />
          </button>
          <div className="body-wrapper">
            <div className="content-wrapper">
              <h2 className="white w-700">{t?.dontMissOutModal?.title || "Don’t Miss Out"}</h2>
              <h3 className="w-500 white">
                {t?.dontMissOutModal?.subtitle || "You’re just one step away from unlocking this feature."}
              </h3>
            </div>
          </div>
          <div className="main-section">
            <div className="container p-0">
              <div className="row">
                <div className="col-md-6 align-self-center p-0">
                  <div className="main-content-wrapper">
                    <div className="features-list">
                      <ul className="list">
                        <li>
                          {" "}
                          <div className="text">
                            <Image src={aoSparkIcon} alt="" />{" "}
                            {t?.dontMissOutModal?.features?.unlimitedTranscripts || "Unlimited transcripts & bulk downloads"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.unlimitedTranslations || "Unlimited translations"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.bulkImport || "Bulk import 50 video links at once"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.reelsShorts || "Instagram Reels & YouTube Shorts (unlimited)"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.hdDownloads || "Download HD videos (no watermark) + Cover Images"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.collections || "Download TikTok Collections & Playlists"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.chromeExtension || "Chrome Extension with all Pro Features"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.quickUrl || "Quick URL method: just add tokscript.com/"}{" "}
                          </div>{" "}
                        </li>
                        <li>
                          {" "}
                          <div className="text">
                            <Image
                              src={circularTickIcon}
                              alt=""
                            />{" "}
                            {t?.dontMissOutModal?.features?.exportFormats || "Export in multiple formats: .txt, .xml, .json, .csv"}{" "}
                          </div>{" "}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 align-self-center p-0">
                  <div className="agents-detail-wrapper">
                    <div className="header-div">
                      <div className="text">
                        <strong>{t?.dontMissOutModal?.aiAgents?.heading || "Plus: Unlock our Powerful AI Agents"}</strong>
                        <strong className="ex-smal w-600">{t?.dontMissOutModal?.aiAgents?.unlimitedLabel || "UNLIMITED"}</strong>
                      </div>
                      <span className="ex-smal">
                        {t?.dontMissOutModal?.aiAgents?.description || "Create viral content - AI trained on 20,000+ viral videos to boost your reach"}
                      </span>
                    </div>
                    <div className="ai-dashboard">
                      <div className="desktop-content">
                        <strong>
                          <FaFireAlt
                            color="#FB923C"
                            style={{ width: "12px", height: "12px" }}
                          />
                          {t?.dontMissOutModal?.aiAgents?.hookGenerator?.title || "Agent #1: Viral Hook Generator"}
                        </strong>
                        <button className="generate-btn">{t?.dontMissOutModal?.aiAgents?.hookGenerator?.cta || "Generate"}</button>
                      </div>
                      <p className="transcript-download light">
                        {t?.dontMissOutModal?.aiAgents?.hookGenerator?.description || "Creates viral TikTok hooks based on transcript topics"}
                      </p>
                    </div>
                    <div className="ai-dashboard purple">
                      <div className="desktop-content">
                        <strong>
                          <FaPenFancy
                            color="#C084FC"
                            style={{ width: "12px", height: "12px" }}
                          />
                          {t?.dontMissOutModal?.aiAgents?.scriptWriter?.title || "Agent #2: Viral Script Writer"}
                        </strong>
                        <button className="generate-btn purple-btn">
                          {t?.dontMissOutModal?.aiAgents?.scriptWriter?.cta || "Rewrite"}
                        </button>
                      </div>
                      <p className="transcript-download light">
                        {t?.dontMissOutModal?.aiAgents?.scriptWriter?.description || "Rewrites transcripts into better viral scripts"}
                      </p>
                    </div>
                    <div className="ai-dashboard blue">
                      <div className="desktop-content">
                        <strong>
                          <FaBrain
                            color="#60A5FA"
                            style={{ width: "12px", height: "12px" }}
                          />
                          {t?.dontMissOutModal?.aiAgents?.viralityExplainer?.title || "Agent #3: Virality Explainer"}
                        </strong>
                        <button className="generate-btn blue-btn">
                          {t?.dontMissOutModal?.aiAgents?.viralityExplainer?.cta || "Analyze"}
                        </button>
                      </div>
                      <p className="transcript-download light">
                        {t?.dontMissOutModal?.aiAgents?.viralityExplainer?.description || "Explains psychology behind viral content + creates new scripts"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {user && user?.plan !== "free" ? (
            <Link
              href={"/app/dashboard"}
              className="btn-style"
              onClick={onHide}
            >
              {t?.dontMissOutModal?.ctaDashboard || "Access your dashboard"}
            </Link>
          ) : user && user?.plan == "free" ? (
            <Link href={"/upgrade"} className="btn-style" onClick={onHide}>
              {t?.dontMissOutModal?.ctaUpgrade || "Upgrade Now"}
            </Link>
          ) : (
            <Link href={"/app/sign-up"} className="btn-style" onClick={onHide}>
              {t?.dontMissOutModal?.ctaSignUp || "Sign Up & Get Access"}
            </Link>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
