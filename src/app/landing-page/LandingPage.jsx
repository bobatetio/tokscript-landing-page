import React from "react";
import magicIcon from "../assets/images/icons/magicIcon.svg";
import coverImg from "../assets/images/icons/coverImg.svg";
import downloadIcon from "../assets/images/icons/download-lg.svg";
import generateIcon from "../assets/images/icons/generate-viral.svg";
import scriptIcon from "../assets/images/icons/script.svg";
import analyzeImg from "../assets/images/icons/analyze.svg";
import { IoLockClosed, IoVideocam, FaBrain, FaCircle, FaCloud, FaCopy, FaDownload, FaFireAlt, FaFolder, FaImage, FaLink, FaPenFancy, FaPlus, FaShare, AiFillChrome } from "@/components/Icons";
import trustPilotLogo from "../assets/images/trustpilot.svg";
import bulkIcon from "../assets/images/icons/bulk-card.svg";
import ProgressBar from "react-bootstrap/ProgressBar";
import tiktokIocn from "../assets/images/icons/tiktok.svg";
import sarah from "../assets/images/sarah.webp";
import john from "../assets/images/john-smith.webp";
import sparkIcon from "../assets/images/icons/AI spark.svg";
import tiktokIcon from "../assets/images/icons/Tiktok logo.svg";
import youtubeIcon from "../assets/images/icons/Youtube logo.svg";
import instagramIcon from "../assets/images/icons/Instagram logo.svg";
import Accordion from "react-bootstrap/Accordion";
import Footer from "../components/Footer";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import AuthModal from "@/components/modals/AuthModal";

const featureCards = [
  {
    icon: coverImg,
    title: "Save cover image",
    description: "Download HD cover images",
  },
  {
    icon: downloadIcon,
    title: "Download HD video",
    description: "No watermarks, full quality",
  },
  {
    icon: generateIcon,
    title: "Generate Viral Hooks",
    description: "Create viral hooks instantly",
  },
  {
    icon: scriptIcon,
    title: "Rewrite scripts",
    description: "Turn transcripts to viral videos",
  },
  {
    icon: analyzeImg,
    title: "Analyze Virality",
    description: "Learn why video went viral",
  },
];
const priceCard = [
  {
    title: "Free Plan",
    description: "For casual users getting started",
    price: "$0",
  },
  {
    title: "Annual Plan",
    description: "Everything in the Monthly Plan, at a huge discount.",
    price: "$25",
    period: "/ per year",
  },
  {
    title: "Monthly Plan",
    description: "For creators & marketers who want full power",
    price: "$5",
    period: "/ per month",
  },
];

const accordianData = [
  {
    title: "What is TokScript?",
    content:
      "TokScript is an AI-powered platform that allows users to generate transcripts for TikTok, Instagram Reels, and YouTube Shorts videos. It offers features like bulk importing, cloud storage, team collaboration, and AI agents to enhance content creation and management.",
  },
  { title: "Who can use TokScript?", content: "" },
  { title: "How does TokScript work?", content: "" },
  { title: "Can I customize the scripts?", content: "" },
  { title: "Does TokScript only work for TikTok?", content: "" },
  { title: "Are the scripts original?", content: "" },
];

export default function LandingPage() {
  return (
    <>
      <Header />
      <div className="landing-page">
        <div className="container-fluid">
          <div className="ai-powered">
            <button className="ai-btn">
              <Image src={magicIcon} alt="" />
              AI Powered
            </button>
            <h1>TikTok Transcript Generator</h1>
            <p>Turn speech into text for any TikTok, Reels, and Shorts video</p>
            <div className="link-field">
              <input type="text" placeholder="Paste your video link here" />
              <button>
                Send
                <Image src={magicIcon} alt="" />
              </button>
            </div>
          </div>

          <div className="ai-features-div">
            <div className="title">
              <strong>Try our latest AI features!</strong>
            </div>
            <div className="row row-cols-5">
              {featureCards.map((item, index) => (
                <div className="col" key={index}>
                  <div className="feature-card">
                    <Image src={item.icon} alt={item.title} />
                    <div className="content-div">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="net-div">
            <div className="title-section">
              <h3>Preview: Your Dashboard Awaits</h3>
              <p className="fw-medium">
                Get instant access to all your transcripts, AI agents, folders,
                and bulk uploads <br />
                See everything you’ll unlock when you sign in
              </p>
            </div>
          </div>
          <div className="dashboard-img-section">
            <div className="inner-section">
              <div className="sign-up-div">
                <div className="btn-style">
                  <IoLockClosed />
                  Sign in to access your full dashboard
                </div>
              </div>
              {/* <div className="trust-pilot-card">
                <Image src={trustPilotLogo} alt="Trust Pilot Logo" />
              </div> */}
            </div>
          </div>

          <div className="title-section">
            <h3>#1 Video Transcript & Download Platform</h3>
            <p className="">
              The best tool for video transcription, bulk downloads, and AI
              content
            </p>
          </div>

          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <h4>Bulk Importing</h4>
                <p className="bulk-text-div">
                  Bulk import up to 50 TikTok, Instagram, or YouTube Shorts
                  links at once to quickly download transcripts in bulk. Save
                  time and manage large volumes of videos efficiently, all in
                  one place.
                </p>
                <ul>
                  <li>Bulk import up to 50 video links</li>
                  <li>TikTok, Instagram, and YouTube Shorts support</li>
                  <li>Bulk export all transcripts at once</li>
                  <li>Individual or batch processing options</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="process-card">
                    <div className="text-detail">
                      <div className="icon-wrap">
                        <Image src={bulkIcon} alt="" />
                      </div>
                      <strong>Bulk Processing...</strong>
                    </div>
                    <ProgressBar now={60} />
                    <p>40 of 50 videos processed</p>
                  </div>
                  <div className="text-progress">
                    <strong>TikTok Video #1</strong>
                    <span>✓ Complete</span>
                  </div>
                  <div className="text-progress">
                    <strong className="purple">TikTok Video #1</strong>
                    <span>✓ Complete</span>
                  </div>
                  <div className="text-progress">
                    <strong className="red">TikTok Video #1</strong>
                    <span className="yellow">⏳ Processing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div">
                    <strong>Collection Import</strong>
                    <strong className="small">SMART</strong>
                  </div>
                  <div className="process-card sm-padding">
                    <p className="playlist margin-div">
                      <img src={tiktokIocn} alt="TikTok" width="20" height="20" />
                      Playlist Detected
                    </p>
                    <p className="fw-normal margin-div">
                      "Cooking Series by @chefmike"
                    </p>
                    <div className="text-progress">
                      <span className="light-grey">15 videos found</span>
                      <strong className="cyan">Auto-importing...</strong>
                    </div>
                  </div>
                  <div className="text-progress">
                    <span className="light-grey">Episode 1: Pasta Basics</span>
                    <span>✓</span>
                  </div>
                  <div className="text-progress">
                    <span className="light-grey">Episode 2: Sauce Secrets</span>
                    <span>✓</span>
                  </div>
                  <div className="text-progress">
                    <span className="light-grey">
                      Episode 3: Perfect Timing
                    </span>
                    <span>⏳</span>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>TikTok Collection & Playlist Importing</h4>
                <p className="bulk-text-div">
                  Users can paste a single link to a public TikTok collection
                  (bookmarks) or a creator's playlist to automatically import
                  and transcribe all videos contained within it. Playlists often
                  represent a creator's mini-series based on a specific subject,
                  topic, or series.
                </p>
                <ul>
                  <li>Public TikTok collection importing</li>
                  <li>Creator playlist auto-detection</li>
                  <li>Series and topic-based organization</li>
                  <li>Automatic metadata preservation</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <h4>Cloud Storage</h4>
                <p className="bulk-text-div">
                  Store all your video transcripts securely in the cloud with
                  enterprise-grade encryption. Instantly sync and access your
                  files across every device. Anytime, anywhere, with automatic
                  cloud backup and unmatched reliability.
                </p>
                <ul>
                  <li>Secure cloud storage with encryption</li>
                  <li>Cross-device automatic sync</li>
                  <li>Access from anywhere, anytime</li>
                  <li>Enterprise-grade reliability</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div align-items-center">
                    <strong>
                      <FaCloud className="cloud-icon" />
                      Cloud Sync Status
                    </strong>
                    <span className="online-status ">
                      <FaCircle width={12} height={12} color="#00F2EA" />
                      Online
                    </span>
                  </div>
                  <div className="desktop-div">
                    <div className="desktop-content">
                      <strong>Desktop</strong>
                      <span>Synced 2 min ago</span>
                    </div>
                    <ProgressBar now={90} />
                  </div>
                  <div className="desktop-div">
                    <div className="desktop-content">
                      <strong>Mobile</strong>
                      <span>Synced 5 min ago</span>
                    </div>
                    <ProgressBar now={100} />
                  </div>
                  <p className="transcription-status">
                    2,600 transcripts • 312 MB
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div align-items-center">
                    <strong>History & Bookmarks</strong>
                    <button className="folder-btn">New Folder</button>
                  </div>
                  <div className="desktop-div cooking-series">
                    <div className="desktop-content">
                      <strong>
                        <FaFolder width={16} height={14} color="#FACC15" />
                        Cooking Series
                      </strong>
                      <div className="action-btn">
                        <button className="delete-btn">
                          <FaShare color="#60A5FA" />
                        </button>
                        <button>
                          <FaDownload color="#4ADE80" />
                        </button>
                      </div>
                    </div>
                    <p className="transcript-download">
                      15 transcripts • Downloaded Jan 15, 2025
                    </p>
                  </div>
                  <div className="desktop-div cooking-series">
                    <div className="desktop-content">
                      <strong>Latest Download</strong>
                      <p className="transcript-download">2 hours ago</p>
                    </div>
                    <p className="transcript-download light">
                      Video: "How to Cook Pasta" (2:34) <br />
                      Format: TXT, PDF available
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>History & Bookmarking</h4>
                <p className="bulk-text-div">
                  Access a complete transcript history for every video you
                  process—automatically logging download dates, transcript
                  details, video sources, and durations. Instantly re-download
                  transcripts in TXT, XML, or PDF formats, and organize your
                  entire video library with custom bookmark folders.
                  Effortlessly share, bulk export, or review transcripts,
                  collections, and playlists for ultimate video transcript
                  organization and workflow management.
                </p>
                <ul>
                  <li>Complete download history with metadata</li>
                  <li>Custom bookmark folders</li>
                  <li>Re-download in TXT, XML, PDF formats</li>
                  <li>Bulk export and sharing capabilities</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                {/* <h4>HD Video & Cover Image Downloads</h4> */}
                <p className="bulk-text-div">
                  Download TikTok, Instagram Reels, and YouTube Shorts videos in
                  HD quality with no watermarks. Instantly save high-resolution
                  cover images and preserve original video quality across all
                  supported platforms.
                </p>
                <ul>
                  <li>HD video downloads without watermarks</li>
                  <li>Cover image extraction and download</li>
                  <li>Multiple platform support</li>
                  <li>Original quality preservation</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div">
                    <strong>Media Downloads</strong>
                  </div>
                  <div className="media-download">
                    <div className="desktop-content">
                      <strong>
                        <IoVideocam
                          color="#00F2EA"
                          style={{ width: "20px", height: "20px" }}
                        />
                        HD Video
                      </strong>
                      <span className="fw-semibold">1080p</span>
                    </div>
                    <p className="transcript-download light">
                      Watermark-free, original quality
                    </p>
                  </div>
                  <div className="media-download purple">
                    <div className="desktop-content">
                      <strong>
                        <FaImage
                          color="#C084FC"
                          style={{ width: "17px", height: "17px" }}
                        />
                        Cover Image
                      </strong>
                      <span
                        className="fw-semibold color"
                        style={{ color: "#C084FC" }}
                      >
                        PNG
                      </span>
                    </div>
                    <p className="transcript-download light">
                      High-resolution thumbnail
                    </p>
                  </div>
                  <div className="desktop-div mb-0">
                    <div className="desktop-content">
                      <strong>Download Progress</strong>
                      <span className="fw-semibold">Complete</span>
                    </div>
                    <ProgressBar now={90} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div">
                    <strong>Quick Access Methods</strong>
                  </div>
                  <div className="access-method">
                    <div className="desktop-content">
                      <strong>
                        <FaLink
                          color="#22D3EE"
                          style={{ width: "16px", height: "16px" }}
                        />
                        Quick URL Method
                      </strong>
                    </div>
                    <p className="transcript-download light">
                      Add tokscript.com/ before any video URL
                    </p>
                  </div>
                  <div className="access-method red-gradient">
                    <div className="desktop-content">
                      <strong>
                        <AiFillChrome
                          color="#FB923C"
                          style={{ width: "18px", height: "18px" }}
                        />
                        Chrome Extension
                      </strong>
                    </div>
                    <p className="transcript-download light">
                      One-click download from any page
                    </p>
                  </div>
                  <div className="example-usage-div">
                    <p className="transcript-download fw-medium mb-2">
                      Example Usage:
                    </p>
                    <Link href="">
                      tokscript.com/tiktok.com/@user/video/123
                    </Link>
                    <div className="instant-section">
                      <p className="transcript-download light">Status:</p>
                      <span className="cyan-color">Auto-redirected</span>
                    </div>
                    <div className="instant-section">
                      <p className="transcript-download light">Download:</p>
                      <span>Instant</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Quick URL Download</h4>
                <p className="bulk-text-div">
                  Instant video transcripts just add ‘tokscript.com/’ in front
                  of any video URL. Instantly redirect and download transcripts
                  without logging in or visiting the main website—fast,
                  automatic, and works with every platform.
                </p>
                <ul>
                  <li>Instant URL-based downloading</li>
                  <li>No need to visit main website</li>
                  <li>Works with all supported platforms</li>
                  <li>Automatic redirect and processing</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <h4>Chrome Extension</h4>
                <p className="bulk-text-div">
                  Use our Chrome extension to instantly copy video transcripts
                  to your clipboard or download them as .txt files while
                  watching TikTok, Instagram Reels, or YouTube Shorts—no need to
                  copy the URL. Works on both web and mobile browsers for
                  ultimate convenience.
                </p>
                <ul>
                  <li>One-click transcript download</li>
                  <li>Instant clipboard copying</li>
                  <li>Works on web and mobile browsers</li>
                  <li>No URL copying required</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div">
                    <strong>
                      <AiFillChrome
                        color="#FB923C"
                        style={{ width: "22px", height: "22px" }}
                      />
                      Extension Panel
                    </strong>
                    <strong className="small">ACTIVE</strong>
                  </div>
                  <button className="clipboard-btn">
                    <FaCopy />
                    Copy to Clipboard
                  </button>
                  <button className="clipboard-btn download-green-btn">
                    <FaDownload />
                    Download as TXT
                  </button>
                  <div className="detected-video-div">
                    <p className="transcript-download">Detected Video:</p>
                    <p
                      className="transcript-download fw-medium"
                      style={{ color: "#FFFFFF" }}
                    >
                      "Cooking Tutorial #5"
                    </p>
                    <span style={{ color: "#737373" }}>Duration: 2:34</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div">
                    <strong>Team Workspace</strong>
                    <strong className="small">ENTERPRISE</strong>
                  </div>
                  <div className="desktop-div">
                    <div className="desktop-content">
                      <strong>
                        <Image
                          src={john}
                          alt="John Smith"
                          className="team-profile-icon"
                        />
                        Cooking Series
                      </strong>
                      <span className="fw-medium" style={{ color: "#60A5FA" }}>
                        Admin
                      </span>
                    </div>
                    <p className="transcript-download">
                      Shared "Marketing Campaign" folder
                    </p>
                  </div>
                  <div className="desktop-div">
                    <div className="desktop-content">
                      <strong>
                        <Image
                          src={sarah}
                          alt="Sarah"
                          className="team-profile-icon"
                        />
                        Latest Download
                      </strong>
                      <span className="fw-medium">Editor</span>
                    </div>
                    <p className="transcript-download">
                      Added 5 new transcripts
                    </p>
                  </div>
                  <button className="invite-team-btn">
                    <FaPlus />
                    Invite Team Member
                  </button>
                </div>
              </div>
              <div className="col-md-6">
                <h4>Team Collaboration</h4>
                <p className="bulk-text-div">
                  For Agencies and Brands. Share, manage, and organize
                  transcripts with your team. Set permissions, collaborate in
                  real-time, and control access—perfect for agencies, editors,
                  and educators.
                </p>
                <ul>
                  <li>Share transcripts with team members</li>
                  <li>Collaborate on projects in real-time</li>
                  <li>Manage workspace permissions</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
            </div>
          </div>
          <div className="bulk-import-section">
            <div className="row">
              <div className="col-md-6">
                <h4>AI Agents</h4>
                <p className="bulk-text-div m-0">
                  AI-Powered Virality: Hooks, Viral Script writing & Video
                  Breakdown Unlock the secret weapons behind today’s top viral
                  videos, powered by AI. Designed for those who want to win
                  attention and grow fast.
                </p>
                <div className="ai-listing">
                  <ul>
                    <li>
                      Viral Hook Generator:
                      <p>
                        Generate scroll-stopping, proven hooks in seconds—no
                        more guessing or losing viewers in the first five
                        seconds.
                      </p>
                    </li>
                    <li>
                      Agent #2 Viral Script Writer:
                      <p>
                        Turn any video transcript into a brand new, viral-ready
                        script. Remix, mimic, and create unique content with one
                        click.
                      </p>
                    </li>
                    <li>
                      Agent #3 Virality Explainer:
                      <p>
                        See exactly why a video went viral. Get actionable
                        breakdowns of psychological triggers and algorithm
                        secrets—so you can repeat the formula.viral, teaching
                        and educating users along the way.
                      </p>
                    </li>
                  </ul>
                </div>
                <ul>
                  <li>Viral Hook Generator for instant engagement</li>
                  <li>Script rewriter with viral essence preservation</li>
                  <li>Virality psychology analysis and insights</li>
                  <li>One-click content transformation</li>
                </ul>
                <Link href="/pricing" className="start-now">
                  Start now
                </Link>
              </div>
              <div className="col-md-6">
                <div className="bulking-process">
                  <div className="header-div">
                    <strong>AI Agent Dashboard</strong>
                    <strong className="small">POWERED BY AI</strong>
                  </div>
                  <div className="ai-dashboard">
                    <div className="desktop-content">
                      <strong>
                        <FaFireAlt
                          color="#FB923C"
                          style={{ width: "14px", height: "16px" }}
                        />
                        Agent #1: Viral Hook Generator
                      </strong>
                      <button className="generate-btn">Generate</button>
                    </div>
                    <p className="transcript-download light">
                      Creates viral TikTok hooks based on transcript topics
                    </p>
                  </div>
                  <div className="ai-dashboard purple">
                    <div className="desktop-content">
                      <strong>
                        <FaPenFancy
                          color="#C084FC"
                          style={{ width: "14px", height: "16px" }}
                        />
                        Agent #2: Viral Script Writer
                      </strong>
                      <button className="generate-btn purple-btn">
                        Rewrite
                      </button>
                    </div>
                    <p className="transcript-download light">
                      Rewrites transcripts into better viral scripts
                    </p>
                  </div>
                  <div className="ai-dashboard blue">
                    <div className="desktop-content">
                      <strong>
                        <FaBrain
                          color="#60A5FA"
                          style={{ width: "14px", height: "16px" }}
                        />
                        Agent #3: Virality Explainer
                      </strong>
                      <button className="generate-btn blue-btn">Analyze</button>
                    </div>
                    <p className="transcript-download light">
                      Explains psychology behind viral content + creates new
                      scripts
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="title-section">
            <h3>Pricing</h3>
            <p>Find the plan that fits your content workflow</p>
          </div>
          <div className="pricing-card-detail">
            <div className="row">
              {priceCard.map((item, index) => (
                <div className="col-md-4" key={index}>
                  <div className="pricing-card-div">
                    <div className="ellipce-wrap">
                      <div className="inner-wrap">
                        <div className="inner-div">
                          {/* Add any content here if needed */}
                        </div>
                      </div>
                    </div>
                    <div className="recomended-div">
                      <span>
                        <Image src={sparkIcon} alt="" />
                        Recommended
                      </span>
                    </div>
                    <div className="amount-detail">
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                    <h4 className="dollar-price">
                      {item.price}
                      <span>{item.period}</span>
                    </h4>
                    <button className="get-started-btn">Get Started</button>

                    <div className="social-networks">
                      <p className="gray">Supported Social Networks</p>
                      <div className="icons-div">
                        <Image src={tiktokIcon} alt="TikTok" />
                        <Image src={youtubeIcon} alt="YouTube" />
                        <Image src={instagramIcon} alt="Instagram" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="title-section">
            <h3>Frequently</h3>
            <p>Your questions, answered.</p>
          </div>
          <div className="faq-section">
            <Accordion defaultActiveKey="0">
              {accordianData.map((item, index) => (
                <Accordion.Item key={index} eventKey="0">
                  <Accordion.Header>{item.title}</Accordion.Header>
                  <Accordion.Body>{item.content}</Accordion.Body>
                </Accordion.Item>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
