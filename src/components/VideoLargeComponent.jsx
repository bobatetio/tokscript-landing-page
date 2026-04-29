import React, { useState } from "react";
import Image from "next/image";
import videoImg from "../assets/images/thumbnail-img.webp";
import downloadIcon from "../assets/images/icons/download-vide-icon.svg";
import saveIcon from "../assets/images/icons/save-icon.svg";
import exportDownArrow from "../assets/images/icons/export-down-arrow.svg";
import axios from "axios";

export default function VideoLargeComponent({
  videoData,
  user,
  setDontMissOutModalShow,
}) {
  const [isDownloadingVideo, setIsDownloadingVideo] = useState(false);
  const [isDownloadingCover, setIsDownloadingCover] = useState(false);

  // Get video cover image from API response
  const videoCover = videoData?.data?.video?.cover;
  const videoTitle = videoData?.data?.desc || "Video Title";
  const downloadUrl = videoData?.data?.video?.downloadAddr;

  const handleSaveCover = async () => {
    const videoUrl = `https://www.tiktok.com/@${videoData?.data?.author?.uniqueId}/video/${videoData?.data?.id}`;

    if (!videoUrl) {
      alert("Video URL not found");
      return;
    }

    // Only proceed if this is a TikTok URL
    if (!videoUrl.includes("tiktok.com")) {
      alert("Cover download is only supported for TikTok videos");
      return;
    }

    setIsDownloadingCover(true);

    try {
      // Step 1: Call the scrap endpoint to process the photo
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tiktok/scrap/single/url/photo`,
        {
          link: videoUrl,
          download_link: videoData?.data?.video?.downloadAddr,
        }
      );
      const scrapResult = response.data;

      if (scrapResult.photosDownloadResult === "success" && scrapResult.id) {
        // Step 2: Download the processed file
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tiktok/download/single/photo/${scrapResult.id}`,
          {
            responseType: "blob",
          }
        );
        downloadFile(response.data, scrapResult.filename || "cover-image.png");
      } else {
        throw new Error("Failed to process cover image");
      }
    } catch (error) {
      console.error("Error downloading cover:", error);
      alert("Failed to download cover image. Please try again.");
    } finally {
      setIsDownloadingCover(false);
    }
  };

  const downloadFile = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const handleDownloadVideo = async () => {
    const videoUrl = `https://www.tiktok.com/@${videoData?.data?.author?.uniqueId}/video/${videoData?.data?.id}`;

    if (!videoUrl) {
      alert("Video URL not found");
      return;
    }

    // Only proceed if this is a TikTok URL
    if (!videoUrl.includes("tiktok.com")) {
      alert("Video download is only supported for TikTok videos");
      return;
    }

    setIsDownloadingVideo(true);

    try {
      // For TikTok videos, we might not have a direct download link
      // The controller will extract it using yt-dlp
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tiktok/scrap/single/url/video`,
        {
          link: videoUrl,
          download_link: videoData?.data?.video?.downloadAddr,
          timeOfSendingRequest: new Date().toISOString(),
        }
      );
      const scrapResult = response.data;

      if (scrapResult.videosDownloadResult === "success" && scrapResult.id) {
        // Step 2: Download the processed file
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/tiktok/download/single/photo/${scrapResult.id}`,
          {
            responseType: "blob",
          }
        );
        downloadFile(response.data, `${scrapResult.filename || "video"}.mp4`);
      } else {
        throw new Error("Failed to process video");
      }
    } catch (error) {
      console.error("Error downloading video:", error);
      alert("Failed to download video. Please try again.");
    } finally {
      setIsDownloadingVideo(false);
    }
  };

  return (
    <div className="video-large-component-wrapper">
      <div className="video-main-wrapper">
        {videoCover && (
          <a
            href={`https://www.tiktok.com/@${videoData?.data?.author?.uniqueId}/video/${videoData?.data?.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={videoCover} alt={videoTitle} />
          </a>
        )}
      </div>
      <div className="btn-wrapper ">
        <button
          className="btn-style cyan-light full-width"
          onClick={() => {
            if (user && user !== null && user?.plan !== 'free' && user?.usageLimit == -1) {
              handleSaveCover();
            } else {
              setDontMissOutModalShow(true);
            }
          }}
          disabled={!videoData?.data?.video?.cover}
        >
          <Image src={saveIcon} alt="" />
          {isDownloadingCover ? "Downloading..." : "Save cover image"}
        </button>
        <button
          className="btn-style cyan-light full-width"
          onClick={() => {
            if (user && user !== null && user?.plan !== 'free' && user?.usageLimit == -1) {
              handleDownloadVideo();
            } else {
              setDontMissOutModalShow(true);
            }
          }}
          disabled={isDownloadingVideo}
        >
          {/* <Image
            src={downloadIcon}
            alt="Download Icon"
            className="d-none d-md-block"
          /> */}
          <Image
            src={exportDownArrow}
            alt=""
            // className="d-block d-md-none"
          />
          {isDownloadingVideo ? "Downloading..." : "Download video"}
        </button>
      </div>
    </div>
  );
}
