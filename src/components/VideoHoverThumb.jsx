"use client";
import React, { useRef } from "react";

const BP = process.env.NEXT_PUBLIC_BASE_PATH || "";
const DEFAULT_VIDEO = `${BP}/figma-rows/demo.mp4`;

export default function VideoHoverThumb({ src, alt = "", videoSrc = DEFAULT_VIDEO }) {
  const videoRef = useRef(null);

  const onEnter = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0;
    const p = v.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  };

  const onLeave = () => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
  };

  return (
    <span
      className="vh-thumb"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onTouchStart={onEnter}
      onTouchEnd={onLeave}
    >
      <img className="vh-thumb-img" src={src} alt={alt} />
      <video
        className="vh-thumb-video"
        ref={videoRef}
        src={videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
    </span>
  );
}
