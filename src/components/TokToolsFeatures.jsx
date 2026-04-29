import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import VideoLargeComponent from "./VideoLargeComponent";
import { HiLanguage, FaChevronDown } from "@/components/Icons";

import aiHooksIcon from "../assets/images/icons/hooks-icon.svg";
import rewriteScriptsIcon from "../assets/images/icons/re-write-icon.svg";
import frameworkIcon from "../assets/images/icons/frame-icon.svg";
import copyLightIcon from "../assets/images/icons/copy-light-icon.svg";
import uploadIcon from "../assets/images/icons/export-icon-line.svg";

export default function TokToolsFeatures({
  videoData,
  setDontMissOutModalShow,
}) {
  const [showTimestamp, setShowTimestamp] = useState(false);
  const [copied, setCopied] = useState(false);
  const [user, setUser] = useState(null);

  // Translate state
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [translateDropdownOpen, setTranslateDropdownOpen] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedTranscript, setTranslatedTranscript] = useState(null);
  const translateRef = useRef(null);

  // Reset translation when videoData changes
  useEffect(() => {
    setTranslatedTranscript(null);
    setSelectedLanguage(null);
    setIsTranslating(false);
  }, [videoData]);

  // Close translate dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        translateRef.current &&
        !translateRef.current.contains(event.target)
      ) {
        setTranslateDropdownOpen(false);
      }
    };

    if (translateDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [translateDropdownOpen]);
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
  // Parse subtitles from WebVTT format
  const parseSubtitles = (subtitleText) => {
    if (!subtitleText) return [];

    const lines = subtitleText.split("\n");
    const subtitles = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      // Check if line contains timestamp (format: 00:00:00 --> 00:00:05)
      if (line.includes("-->")) {
        const [start, end] = line.split("-->").map((t) => t.trim());
        const textLine = lines[i + 1]?.trim();
        if (textLine && textLine !== "WEBVTT" && !textLine.includes("-->")) {
          subtitles.push({
            start,
            end,
            text: textLine,
          });
        }
      }
    }

    return subtitles;
  };

  const subtitles = videoData?.subtitles
    ? parseSubtitles(translatedTranscript || videoData.subtitles)
    : [];

  // Get actual transcript text
  const getActualTranscript = () => {
    if (subtitles.length === 0) return "";
    return subtitles
      .map((subtitle) => `${subtitle.start}\n${subtitle.text}`)
      .join("\n\n");
  };

  // Format transcript with timestamps for display
  const formatTranscriptWithTimestamps = (transcript) => {
    return transcript;
  };

  // Get transcript lines without timestamps
  const getTranscriptLines = () => {
    return subtitles.map((subtitle) => subtitle.text);
  };

  // Copy subtitles to clipboard
  const handleCopySubtitles = async () => {
    if (subtitles.length === 0) return;

    const textToCopy = subtitles
      .map((subtitle) => {
        if (showTimestamp) {
          return `${subtitle.start}\n${subtitle.text}`;
        }
        return subtitle.text;
      })
      .join("\n\n");

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
      console.log("Subtitles copied to clipboard");
    } catch (err) {
      console.error("Failed to copy subtitles:", err);
      // Fallback for older browsers
      const textArea = document.createElement("textarea");
      textArea.value = textToCopy;
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Hide after 2 seconds
        console.log("Subtitles copied to clipboard (fallback)");
      } catch (fallbackErr) {
        console.error("Fallback copy failed:", fallbackErr);
      }
      document.body.removeChild(textArea);
    }
  };

  // Download subtitles as .txt file
  const handleDownloadSubtitles = () => {
    if (subtitles.length === 0) return;

    const textContent = subtitles
      .map((subtitle) => {
        if (showTimestamp) {
          return `${subtitle.start}\n${subtitle.text}`;
        }
        return subtitle.text;
      })
      .join("\n\n");

    const blob = new Blob([textContent], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transcript.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  // Handle language selection and retranslation
  const handleLanguageSelect = async (lang) => {
    setSelectedLanguage(lang);
    setTranslateDropdownOpen(false);

    const originalText = videoData?.subtitles;
    if (!originalText) {
      console.error("No transcript available to translate");
      setSelectedLanguage(null);
      return;
    }

    setIsTranslating(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/tiktok/retranslate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: originalText,
            targetLanguage: lang,
          }),
        },
      );

      const data = await response.json();

      if (data.success) {
        setTranslatedTranscript(data.translatedText);
        console.log(`Translation to ${lang} successful`);
      } else {
        console.error("Translation failed:", data.error);
        setSelectedLanguage(null);
        setTranslatedTranscript(null);
      }
    } catch (error) {
      console.error("Translation error:", error);
      setSelectedLanguage(null);
      setTranslatedTranscript(null);
    } finally {
      setIsTranslating(false);
    }
  };

  // GPT URLs
  const gptUrls = {
    generateHooks: "https://chatgpt.com/g/g-9BGRz0SfJ-viral-intro-hooks",
    generateScript: "https://chatgpt.com/g/g-V9jc9f08O-viral-script-rewriter",
    analyzeViral:
      "https://chatgpt.com/g/g-685df9b77bf48191b04a7e2d41584d6d-viral-coach-writer",
  };

  // Get formatted transcript text with timestamps for GPT prompts
  const getFormattedTranscript = () => {
    if (subtitles.length === 0) return "";
    return subtitles
      .map((subtitle) => `${subtitle.start}\n${subtitle.text}`)
      .join("\n\n");
  };

  // Function to automatically paste text in ChatGPT input
  const autoPasteInGPT = async (prompt, gptUrl) => {
    // Copy to clipboard first
    try {
      await navigator.clipboard.writeText(prompt);
      console.log("Prompt copied to clipboard");
    } catch (err) {
      console.error("Failed to copy prompt:", err);
    }

    // Open GPT in new tab
    const gptWindow = window.open(gptUrl, "_blank");

    // Wait a bit for the page to load, then try to paste
    setTimeout(async () => {
      try {
        // Focus the new window
        if (gptWindow) {
          gptWindow.focus();

          // Try to find and focus the input field, then paste
          const script = `
            (async function() {
              try {
                // Wait for page to fully load
                await new Promise(resolve => {
                  if (document.readyState === 'complete') {
                    resolve();
                  } else {
                    window.addEventListener('load', resolve);
                  }
                });
                
                // Wait a bit more for dynamic content
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Find the textarea input (ChatGPT's input field)
                const textarea = document.querySelector('textarea[placeholder*="Message"], textarea[data-id*="prompt"], textarea[id*="prompt"], #prompt-textarea, [data-testid="textbox"]') || 
                                document.querySelector('textarea') ||
                                document.querySelector('[contenteditable="true"]');
                
                if (textarea) {
                  textarea.focus();
                  
                  // Try to paste using different methods
                  try {
                    // Method 1: Use clipboard API
                    const clipboardText = await navigator.clipboard.readText();
                    textarea.value = clipboardText;
                    textarea.dispatchEvent(new Event('input', { bubbles: true }));
                    console.log('Auto-pasted successfully using clipboard API');
                  } catch (e) {
                    console.log('Clipboard API failed, trying execCommand');
                    
                    // Method 2: Use execCommand
                    textarea.select();
                    document.execCommand('paste');
                    console.log('Auto-pasted using execCommand');
                  }
                  
                  // Trigger change events
                  textarea.dispatchEvent(new Event('change', { bubbles: true }));
                  textarea.dispatchEvent(new Event('keyup', { bubbles: true }));
                } else {
                  console.log('Could not find input field');
                }
              } catch (error) {
                console.error('Auto-paste error:', error);
              }
            })();
          `;

          // Execute the script in the new window
          gptWindow.eval(script);
        }
      } catch (error) {
        console.error("Auto-paste failed:", error);
      }
    }, 3000); // Wait 3 seconds for page to load
  };

  // Handle GPT redirects with custom prompts
  const handleHooksRedirect = async () => {
    const transcript = getFormattedTranscript();
    if (!transcript) {
      alert("No transcript available to generate hooks.");
      return;
    }

    const prompt = `🎯 **VIRAL HOOKS GENERATOR**

I need you to analyze this video transcript and create powerful, attention-grabbing hooks that will stop scrollers within the first 3 seconds.

📋 **VIDEO TRANSCRIPT:**
${transcript}
`;

    await autoPasteInGPT(prompt, gptUrls.generateHooks);
  };

  const handleScriptRedirect = async () => {
    const transcript = getFormattedTranscript();
    if (!transcript) {
      alert("No transcript available to rewrite script.");
      return;
    }

    const prompt = `✨ **VIRAL SCRIPT REWRITER**

Transform this transcript into a viral, engaging script that maximizes viewer retention and social media engagement.

📋 **ORIGINAL TRANSCRIPT:**
${transcript}`;

    await autoPasteInGPT(prompt, gptUrls.generateScript);
  };

  const handleFrameworkRedirect = async () => {
    const transcript = getFormattedTranscript();
    if (!transcript) {
      alert("No transcript available to analyze framework.");
      return;
    }

    const prompt = `🧠 **VIRAL FRAMEWORK ANALYZER**

Analyze this video content and break down the viral framework, psychology, and structure used.

📋 **VIDEO TRANSCRIPT:**
${transcript}
`;

    await autoPasteInGPT(prompt, gptUrls.analyzeViral);
  };
  return (
    <div className="took-tools-features-component">
      <div className="text mb-3 mb-md-0 d-none d-md-block">
        <span className="w-500">You can do more with TokScript AI</span>
      </div>

      {/* VideoLargeComponent for mobile - only shown when videoData exists */}

      <div className="inner-wrapper">
        {
          <div className="btns-wrapper">
            <button
              className="btn-style cyan-light full-width"
              onClick={() =>
                user && user?.plan !== "free"
                  ? handleHooksRedirect()
                  : setDontMissOutModalShow(true)
              }
              disabled={subtitles.length === 0}
            >
              <Image src={aiHooksIcon} alt="" />
              Write hooks
            </button>
            <button
              className="btn-style cyan-light full-width"
              onClick={() =>
                user && user?.plan !== "free"
                  ? handleScriptRedirect()
                  : setDontMissOutModalShow(true)
              }
              disabled={subtitles.length === 0}
            >
              <Image src={rewriteScriptsIcon} alt="" />
              Rewrite scripts
            </button>
            <button
              className="btn-style cyan-light full-width"
              onClick={() =>
                user && user?.plan !== "free"
                  ? handleFrameworkRedirect()
                  : setDontMissOutModalShow(true)
              }
              disabled={subtitles.length === 0}
            >
              <Image src={frameworkIcon} alt="" />
              Get framework
            </button>
          </div>
        }
        <div className="text  mb-md-0 d-block d-md-none">
          <span className="w-500">You can do more with TokScript AI</span>
        </div>
        <div className="d-block d-md-none">
          {videoData && (
            <VideoLargeComponent
              videoData={videoData}
              user={user}
              setDontMissOutModalShow={setDontMissOutModalShow}
            />
          )}
        </div>

        <div className="transcripts-main-div">
          <div className="header-wrapper">
            <div className="custom-toggle-wrapper">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={showTimestamp}
                  onChange={(e) => setShowTimestamp(e.target.checked)}
                />
                <span className="toggle-switch"></span>
                Show timestamp
              </label>
            </div>
            <ul className="action-btns">
              <li>
                <div
                  className="translate-wrapper d-flex align-items-center gap-2"
                  ref={translateRef}
                >
                  <button
                    className={`translate-btn ${selectedLanguage !== null ? "active" : ""}`}
                    onClick={() =>
                      setTranslateDropdownOpen(!translateDropdownOpen)
                    }
                    disabled={
                      isTranslating ||
                      subtitles.length === 0
                    }
                  >
                    <HiLanguage />
                    <span>
                      {isTranslating
                        ? "Translating..."
                        : selectedLanguage
                          ? selectedLanguage
                          : "Retranslate"}
                    </span>
                    <FaChevronDown
                      className={`chevron ${translateDropdownOpen ? "open" : ""}`}
                    />
                  </button>
                  {translateDropdownOpen && (
                    <div className="translate-dropdown">
                      {[
                        "English",
                        "Portuguese (Brazil)",
                        "Spanish",
                        "Mandarin",
                        "French",
                        "German",
                        "Arabic",
                        "Hindi",
                        "Japanese",
                        "Korean",
                        "Italian",
                        "Russian",
                        "Turkish",
                        "Vietnamese",
                        "Thai",
                        "Indonesian",
                      ].map((lang) => (
                        <button
                          key={lang}
                          className={`translate-option ${selectedLanguage === lang ? "selected" : ""}`}
                          onClick={() => handleLanguageSelect(lang)}
                          disabled={isTranslating}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </li>
              <li>
                <button
                  className="transparent"
                  onClick={handleCopySubtitles}
                  disabled={subtitles.length === 0}
                  style={{ position: "relative" }}
                >
                  <Image src={copyLightIcon} alt="" />
                  {copied && (
                    <span
                      style={{
                        position: "absolute",
                        top: "-30px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        background: "#333",
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        whiteSpace: "nowrap",
                        zIndex: 1000,
                      }}
                    >
                      Copied!
                    </span>
                  )}
                </button>
              </li>
              <li>
                <button
                  className="transparent"
                  onClick={handleDownloadSubtitles}
                  disabled={subtitles.length === 0}
                >
                  <Image src={uploadIcon} alt="" />
                </button>
              </li>
            </ul>
          </div>
          <div className="features-wrapper">
            <div className="transcript-content">
              {subtitles.length === 0 ? (
                <p
                  style={{
                    color: "rgba(255, 255, 255, 0.6)",
                    textAlign: "center",
                    padding: "2rem 1rem",
                  }}
                >
                  No transcript available for this video.
                </p>
              ) : showTimestamp ? (
                <pre
                  className="transcript-with-timestamps"
                  style={{
                    color: "white",
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    overflowWrap: "break-word",
                    maxWidth: "100%",
                    overflowX: "hidden"
                  }}
                >
                  {formatTranscriptWithTimestamps(getActualTranscript())}
                </pre>
              ) : (
                <ul className="list-item">
                  {getTranscriptLines().map((line, index) => (
                    <li key={index}>{line}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
