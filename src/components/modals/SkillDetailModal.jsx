import { useState, useRef, useEffect } from "react";
import Modal from "react-bootstrap/Modal";

export default function SkillDetailModal({ show, onHide, skill }) {
  // Cache the last non-null skill to survive the 300ms Bootstrap fade-out
  const lastSkillRef = useRef(null);
  if (skill) lastSkillRef.current = skill;
  const displaySkill = skill || lastSkillRef.current;
  if (!displaySkill) return null;

  return (
    <SkillDetailModalInner
      show={show}
      onHide={onHide}
      displaySkill={displaySkill}
    />
  );
}

function SkillDetailModalInner({ show, onHide, displaySkill }) {
  const [copied, setCopied] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [downloadOpen, setDownloadOpen] = useState(false);
  const copiedTimeout = useRef(null);

  // Reset video state and download dropdown when the skill changes
  useEffect(() => {
    setVideoPlaying(false);
    setDownloadOpen(false);
  }, [displaySkill]);

  // Clean up timeout on unmount
  useEffect(() => () => clearTimeout(copiedTimeout.current), []);

  const handleCopy = () => {
    navigator.clipboard.writeText(displaySkill.prompt).catch(() => {});
    setCopied(true);
    clearTimeout(copiedTimeout.current);
    copiedTimeout.current = setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = (format) => {
    const content = displaySkill.prompt;
    const filename = `${displaySkill.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.${format}`;

    let blob;
    if (format === 'txt' || format === 'md') {
      blob = new Blob([content], { type: 'text/plain' });
    } else {
      // For pdf/docx, just download as text (full implementation would need a library)
      blob = new Blob([content], { type: 'text/plain' });
    }

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadOpen(false);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      className="skill-detail-modal"
      dialogClassName="skill-detail-dialog"
      contentClassName="skill-detail-content"
      aria-labelledby="skill-modal-title"
    >
      <Modal.Body style={{ padding: 0, position: "relative" }}>
        <button
          className="sd-close"
          onClick={onHide}
          aria-label="Close skill details"
        >
          &times;
        </button>

        <div className="sd-layout">
          {/* Left column */}
          <div className="sd-left">
            <div className="sd-left-scroll">
              <div className="sd-badge">
                {displaySkill.badge && (
                  <img
                    src={displaySkill.badge.src}
                    alt=""
                    aria-hidden="true"
                  />
                )}
                <span>{displaySkill.badgeLabel}</span>
              </div>

              <h2 className="sd-title" id="skill-modal-title">
                {displaySkill.title}
              </h2>

              <p className="sd-desc">{displaySkill.desc}</p>

              {displaySkill.tags && displaySkill.tags.length > 0 && (
                <div className="sd-tags">
                  {displaySkill.tags.map((tag, i) => (
                    <span key={i} className="sd-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <hr className="sd-divider" />

              <span className="sd-prompt-label">PROMPT</span>
              <div className="sd-prompt-box">{displaySkill.prompt}</div>
            </div>

            {/* Actions always visible at bottom of left column */}
            <div className="sd-actions">
              <button
                className={`sd-btn sd-btn-copy${copied ? " sd-btn-copied" : ""}`}
                onClick={handleCopy}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                {copied ? "Copied!" : "Copy Prompt"}
              </button>
              <button className="sd-btn sd-btn-dl-skill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Download Skill
              </button>
              <div className="sd-download-wrap">
                <button className="sd-btn sd-btn-download" onClick={() => setDownloadOpen(!downloadOpen)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Download <span className="sd-caret">&#9662;</span>
                </button>
                {downloadOpen && (
                  <div className="sd-dropdown">
                    <button className="sd-dropdown-item" onClick={() => handleDownload('txt')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download .txt
                    </button>
                    <button className="sd-dropdown-item" onClick={() => handleDownload('md')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download .md
                    </button>
                    <button className="sd-dropdown-item" onClick={() => handleDownload('pdf')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download .pdf
                    </button>
                    <button className="sd-dropdown-item" onClick={() => handleDownload('docx')}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                      Download .docx
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="sd-right">
            <span className="sd-howto-label">HOW TO USE</span>

            <div className="sd-video-wrap">
              {!videoPlaying ? (
                <div
                  style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => setVideoPlaying(true)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setVideoPlaying(true)}
                  aria-label="Play tutorial video"
                >
                  <div className="sd-play-btn" aria-hidden="true" />
                  {displaySkill.videoDuration && (
                    <span className="sd-duration">{displaySkill.videoDuration}</span>
                  )}
                </div>
              ) : (
                <iframe
                  src={displaySkill.videoUrl}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  frameBorder="0"
                  title={`${displaySkill.title} tutorial`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
            </div>

            <div className="sd-steps">
              <p>Copy or download the prompt above.</p>
              <p>Open your preferred AI tool (ChatGPT, Claude, Gemini, etc.).</p>
              <p>Paste the prompt and replace [TRANSCRIPT] with your transcript text.</p>
              <p>Run and iterate, adjust tone or length as needed.</p>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
