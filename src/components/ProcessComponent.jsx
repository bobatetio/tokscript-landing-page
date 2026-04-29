"use client";

import React, { useState } from "react";
import Image from "next/image";
import ProgressBar from "react-bootstrap/ProgressBar";

import searchIcon from "../assets/images/icons/search-icon.svg";
import exportLightIcon from "../assets/images/icons/export-light-icon.svg";
import copyLightIcon from "../assets/images/icons/copy-light-icon.svg";
import videoImg from "../assets/images/video-img.svg";
import tickIcon from "../assets/images/icons/tick-icon.svg";

/**
 * ProcessComponent - Displays bulk processing results.
 *
 * @param {Object} props
 * @param {Object|null} props.bulkData - Response from the /bulk API route
 * @param {boolean} props.isProcessing - Whether bulk processing is in progress
 * @param {string[]} props.processingUrls - URLs currently being processed (shown during loading)
 * @param {Function} props.onSignUp - Callback to handle sign-up prompt
 * @param {Function} props.onItemClick - Callback when a bulk item is clicked
 * @param {number|null} props.selectedIndex - Index of the currently selected item
 */
export default function ProcessComponent({
  bulkData,
  isProcessing,
  processingUrls = [],
  onSignUp,
  onItemClick,
  selectedIndex = null,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("total");
  const [copiedIndex, setCopiedIndex] = useState(null);

  // When processing and no data yet, build placeholder items from URLs
  const bulkItems = bulkData?.transcript?.bulkItems || [];
  const displayItems =
    bulkItems.length > 0
      ? bulkItems
      : isProcessing && processingUrls.length > 0
        ? processingUrls.map((url) => ({
            sourceUrl: url,
            status: "processing",
            transcript: null,
            title: null,
            duration: null,
            views: null,
            thumbnail: null,
            username: null,
            author: {},
          }))
        : [];

  const summary = bulkData?.summary || {};
  const total = summary.total || displayItems.length || 0;
  const completed =
    summary.completed ||
    displayItems.filter((i) => i.status === "complete").length;
  const unavailable =
    summary.unavailable ||
    displayItems.filter((i) => i.status === "unavailable").length;
  const failed =
    summary.failed || displayItems.filter((i) => i.status === "failed").length;

  const progressPercent =
    total > 0
      ? Math.round(((completed + unavailable + failed) / total) * 100)
      : 0;

  // Filter items by tab
  const filteredItems = displayItems
    .filter((item) => {
      if (activeTab === "completed") return item.status === "complete";
      if (activeTab === "unavailable")
        return item.status === "unavailable" || item.status === "failed";
      return true;
    })
    .filter((item) => {
      if (!searchTerm) return true;
      const term = searchTerm.toLowerCase();
      return (
        item.title?.toLowerCase().includes(term) ||
        item.sourceUrl?.toLowerCase().includes(term) ||
        item.username?.toLowerCase().includes(term)
      );
    });

  const formatDuration = (duration) => {
    if (!duration) return "";
    const str = String(duration);
    // ISO 8601 (e.g. PT1H2M3S from YouTube)
    const isoMatch = str.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
    if (isoMatch) {
      const h = parseInt(isoMatch[1] || 0);
      const m = parseInt(isoMatch[2] || 0);
      const s = parseInt(isoMatch[3] || 0);
      if (h > 0)
        return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      return `${m}:${String(s).padStart(2, "0")}`;
    }
    // Numeric seconds
    const num = parseFloat(str);
    if (!isNaN(num)) {
      const totalSec = Math.round(num);
      const h = Math.floor(totalSec / 3600);
      const m = Math.floor((totalSec % 3600) / 60);
      const s = totalSec % 60;
      if (h > 0)
        return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
      return `${m}:${String(s).padStart(2, "0")}`;
    }
    return str;
  };

  const formatViews = (views) => {
    if (!views) return "";
    const num = parseInt(String(views).replace(/[^0-9]/g, ""));
    if (isNaN(num)) return String(views);
    if (num >= 1000000000)
      return `${(num / 1000000000).toFixed(1).replace(/\.0$/, "")}B Views`;
    if (num >= 1000000)
      return `${(num / 1000000).toFixed(1).replace(/\.0$/, "")}M Views`;
    if (num >= 1000)
      return `${(num / 1000).toFixed(1).replace(/\.0$/, "")}K Views`;
    return `${num} views`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "complete":
        return (
          <span className="ex-small cyan">
            <Image src={tickIcon} alt="" /> Complete
          </span>
        );
      case "unavailable":
        return (
          <span className="ex-small" style={{ color: "#fbbf24" }}>
            Unavailable
          </span>
        );
      case "failed":
        return (
          <span className="ex-small" style={{ color: "#ef4444" }}>
            Failed
          </span>
        );
      case "processing":
        return (
          <span className="ex-small" style={{ color: "#60a5fa" }}>
            Processing...
          </span>
        );
      default:
        return (
          <span className="ex-small" style={{ color: "#7a7a7a" }}>
            Pending
          </span>
        );
    }
  };

  const handleCopyTranscript = async (item, index) => {
    if (!item.transcript) return;
    const cleanText = item.transcript
      .replace(/WEBVTT\n\n/g, "")
      .replace(
        /\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}\n/g,
        "",
      )
      .replace(/\n{2,}/g, "\n")
      .trim();
    try {
      await navigator.clipboard.writeText(cleanText);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleDownloadTranscript = (item) => {
    if (!item.transcript) return;
    const cleanText = item.transcript
      .replace(/WEBVTT\n\n/g, "")
      .replace(
        /\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}\n/g,
        "",
      )
      .replace(/\n{2,}/g, "\n")
      .trim();
    const filename =
      (item.title || "transcript").replace(/[^a-z0-9]/gi, "_").slice(0, 50) +
      ".txt";
    const blob = new Blob([cleanText], { type: "text/plain;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const handleExportAll = () => {
    if (displayItems.length === 0) return;

    let csvContent = "Title,URL,Username,Duration,Views,Status,Transcript\n";
    displayItems.forEach((item) => {
      const cleanTranscript = (item.transcript || "")
        .replace(/WEBVTT\n\n/g, "")
        .replace(
          /\d{2}:\d{2}:\d{2}\.\d{3}\s*-->\s*\d{2}:\d{2}:\d{2}\.\d{3}\n/g,
          "",
        )
        .replace(/\n/g, " ")
        .replace(/"/g, '""');
      const title = (item.title || "").replace(/"/g, '""');
      const username = (item.username || "").replace(/"/g, '""');
      csvContent += `"${title}","${item.sourceUrl || ""}","${username}","${item.duration || ""}","${item.views || ""}","${item.status || ""}","${cleanTranscript}"\n`;
    });

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "bulk_transcripts.csv";
    link.click();
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="process-component-wrapper">
      <div className="processing-wrapper">
        <div className="title">
          <strong className="small white w-500">
            {isProcessing ? "Processing" : "Complete"}
          </strong>
          <strong className="small white w-500">
            {isProcessing && bulkItems.length === 0
              ? `0/${total} Videos`
              : `${completed + unavailable + failed}/${total} Videos`}
          </strong>
        </div>
        <div className="progress-wrapper">
          <ProgressBar
            now={
              isProcessing
                ? bulkItems.length === 0
                  ? 15
                  : progressPercent
                : 100
            }
            animated={isProcessing}
          />
        </div>
      </div>
      {!isProcessing && bulkItems.length > 0 && (
        <>
          <div className="search-bar-wrapper">
            <div className="search-wrapper has-left-icon">
              <input
                type="text"
                className="form-control"
                placeholder="Search transcripts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Image src={searchIcon} alt="" />
            </div>
            <button onClick={handleExportAll} title="Export all as CSV">
              <Image src={exportLightIcon} alt="" />
            </button>
          </div>
          <div className="tabs-wrapper light">
            <ul className="tabs-list">
              <li className={activeTab === "total" ? "active" : ""}>
                <button onClick={() => setActiveTab("total")}>
                  Total ({total})
                </button>
              </li>
              <li className={activeTab === "completed" ? "active" : ""}>
                <button onClick={() => setActiveTab("completed")}>
                  Completed ({completed})
                </button>
              </li>
              <li className={activeTab === "unavailable" ? "active" : ""}>
                <button onClick={() => setActiveTab("unavailable")}>
                  Unavailable ({unavailable + failed})
                </button>
              </li>
            </ul>
          </div>
        </>
      )}
      <div className="processed-result-listings">
        <div className="processed-listings">
          {filteredItems.map((item, index) => {
            const isClickable =
              (item.status === "complete" || item.status === "unavailable") &&
              !!onItemClick;
            return (
              <div
                className={`list-item${selectedIndex === index ? " selected" : ""}${isClickable ? " clickable" : ""}`}
                key={index}
                onClick={
                  isClickable ? () => onItemClick(item, index) : undefined
                }
                style={isClickable ? { cursor: "pointer" } : undefined}
              >
                <div className="icon-wrapper">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.title || "Video thumbnail"}
                    />
                  ) : (
                    <Image src={videoImg} alt="Video thumbnail" />
                  )}
                </div>
                <div className="text-wrapper">
                  <div className="title">
                    <strong
                      className="small w-700 white"
                      style={{
                        display: "block",
                        maxWidth: "280px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.title?.length > 20
                        ? item.title.slice(0, 20) + "..."
                        : item.title || "Processing..."}
                    </strong>
                    {item.status === "complete" && item.transcript && (
                      <ul className="action-btns">
                        <li>
                          <button
                            className="transparent"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopyTranscript(item, index);
                            }}
                            title={
                              copiedIndex === index
                                ? "Copied!"
                                : "Copy transcript"
                            }
                            style={{ position: "relative" }}
                          >
                            {copiedIndex === index ? (
                              <span
                                style={{
                                  color: "#00D9B4",
                                  fontSize: "12px",
                                  fontWeight: 600,
                                  whiteSpace: "nowrap",
                                }}
                              >
                                Copied!
                              </span>
                            ) : (
                              <Image src={copyLightIcon} alt="Copy" />
                            )}
                          </button>
                        </li>
                        <li>
                          <button
                            className="transparent"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDownloadTranscript(item);
                            }}
                            title="Download transcript"
                          >
                            <Image
                              src={exportLightIcon}
                              alt="Download"
                              style={{ filter: "brightness(0) invert(1)" }}
                            />
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                  <p className="small">
                    {item.duration
                      ? `${formatDuration(item.duration)}` + " - "
                      : ""}
                    {item.views ? `${formatViews(item.views)}` : ""}
                    {!item.duration && !item.views && item.username
                      ? `@${item.username}`
                      : ""}
                  </p>
                  <div className="loading-wrapper">
                    {getStatusBadge(item.status)}
                  </div>
                </div>
              </div>
            );
          })}
          {filteredItems.length === 0 && !isProcessing && (
            <div className="list-item">
              <div className="text-wrapper">
                <p
                  className="small"
                  style={{ textAlign: "center", padding: "1rem 0" }}
                >
                  {searchTerm ? "No results match your search" : "No items yet"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {!isProcessing && completed > 0 && onSignUp && (
        <div className="sign-up-text-wrapper">
          <p className="small">
            Sign up to save transcripts, access AI agents, and unlock unlimited
            bulk processing
          </p>
          <button className="btn-style sign-up-btn" onClick={onSignUp}>
            Sign Up Free
          </button>
        </div>
      )}
    </div>
  );
}
