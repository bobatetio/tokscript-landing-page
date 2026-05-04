"use client";
import StaticPageFrame from "@/components/StaticPageFrame";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function PageData() {
  return (
    <StaticPageFrame
      src={`${BASE}/tokscriptmcp-pages/claude.html`}
      title="TokScript on Claude"
    />
  );
}
