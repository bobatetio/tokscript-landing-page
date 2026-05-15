"use client";

import { useState } from "react";
import {
  Check,
  X,
  ChevronDown,
  FileText,
  LayoutGrid,
  Download,
  BookOpen,
  FileUp,
  Sparkles,
  Code,
  Zap,
  Chrome,
  Network,
} from "lucide-react";
import PRICING_CATEGORIES, { PLATFORM_GLYPH_MAP } from "@/data/pricingFeatures";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Colored icon-tile per bucket, matching the mockup's `.icon-tile` palette.
// Keyed by `category.key` so adding a new bucket only needs a single entry
// here plus the tint class in App.scss (.pc-cat-tile.is-<key>).
const BUCKET_ICONS = {
  transcripts: FileText,
  mcp: Network,
  collections: LayoutGrid,
  chrome: Chrome,
  download: Download,
  library: BookOpen,
  exports: FileUp,
  agents: Sparkles,
  api: Code,
  direct: Zap,
};

export default function PricingCategoryList({ tier, bucketKeys, labelOverrides }) {
  // Track which buckets are expanded — keyed by category.key.
  // Default: all collapsed (matches the pricing-mockup-13.html behavior).
  const [expanded, setExpanded] = useState({});

  const toggle = (key) =>
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));

  // Optional `bucketKeys` filter: render only the listed bucket keys, in
  // the order given. When omitted, every bucket from PRICING_CATEGORIES
  // is shown. Used by the upgrade-modal landscape cards to render a
  // curated 5-bucket subset instead of all 10.
  const categories = bucketKeys
    ? bucketKeys
        .map((k) => PRICING_CATEGORIES.find((c) => c.key === k))
        .filter(Boolean)
    : PRICING_CATEGORIES;

  return (
    <div className="pc-category-list">
      {categories.map((category) => {
        // Skip the entire bucket if it's gated to specific tiers (e.g. the
        // Direct Access bucket on Lifetime only).
        if (category.onlyForTiers && !category.onlyForTiers.includes(tier)) {
          return null;
        }

        const hasAccess = category.features.some((f) =>
          f.tiers.includes(tier)
        );
        const label =
          (labelOverrides && labelOverrides[category.key]) ??
          category.label ??
          category.tierLabels?.[tier] ??
          category.key;
        const isHighlighted = category.key === "mcp" && tier !== "free";
        const isFreeTranscripts = tier === "free" && category.key === "transcripts";
        const isExpanded = !!expanded[category.key];

        return (
          <div
            key={category.key}
            className={`pc-cat-group${isHighlighted ? " is-highlighted" : ""}${isExpanded ? " is-expanded" : ""}${!hasAccess ? " is-locked" : ""}`}
          >
            <button
              type="button"
              className="pc-cat-header"
              onClick={() => toggle(category.key)}
              aria-expanded={isExpanded}
              aria-controls={`pc-cat-body-${category.key}`}
            >
              {(category.iconImage || BUCKET_ICONS[category.key]) && (
                <span
                  className={`pc-cat-tile is-${category.key}${category.iconImage ? " has-image" : ""}`}
                  aria-hidden="true"
                >
                  {category.iconImage ? (
                    <img
                      src={`${BASE_PATH}${category.iconImage}?v=20260514a`}
                      alt=""
                    />
                  ) : (
                    (() => {
                      const Ico = BUCKET_ICONS[category.key];
                      return <Ico size={12} strokeWidth={2} />;
                    })()
                  )}
                </span>
              )}
              <span className="pc-cat-header-label">{label}</span>
              {category.key === "mcp" && hasAccess && (
                <span className="pc-cat-new-tag">NEW</span>
              )}
              {isFreeTranscripts ? (
                <span className="pc-cat-badge">5 / day</span>
              ) : (
                <span
                  className={`pc-cat-status${hasAccess ? " is-check" : " is-cross"}`}
                  aria-hidden="true"
                >
                  {hasAccess ? (
                    <Check size={14} strokeWidth={3} />
                  ) : (
                    <X size={14} strokeWidth={3} />
                  )}
                </span>
              )}
              <ChevronDown
                className="pc-cat-chevron"
                size={14}
                strokeWidth={2.5}
                aria-hidden="true"
              />
            </button>

            {isExpanded && (
              <div
                className="pc-cat-body"
                id={`pc-cat-body-${category.key}`}
              >
                {category.intro && (
                  <p className="pc-cat-intro">{category.intro}</p>
                )}

                {category.rowIcons && hasAccess && (
                  <div className="pc-section-icons">
                    {category.rowIcons.map((icon) => (
                      <img
                        key={icon.src}
                        src={`${BASE_PATH}${icon.src}`}
                        alt={icon.alt}
                        className="pc-section-icon"
                      />
                    ))}
                  </div>
                )}

                <ul className="pc-cat-features">
                  {category.features.map((feature) => (
                    <li key={feature.name} className="pc-cat-feature">
                      <span className="pc-cat-feature-name">{feature.name}</span>
                      {feature.platforms && feature.platforms.length > 0 && (
                        <span
                          className="pc-cat-feature-platforms"
                          aria-hidden="true"
                        >
                          {feature.platforms.map((pkey) => {
                            const glyph = PLATFORM_GLYPH_MAP[pkey];
                            if (!glyph) return null;
                            const { Glyph, label: gLabel } = glyph;
                            const isAi = ["claude", "chatgpt", "manus"].includes(pkey);
                            return (
                              <span
                                key={pkey}
                                className={`pc-cat-feature-glyph${isAi ? " is-ai" : ""}`}
                                aria-label={gLabel}
                              >
                                <Glyph />
                              </span>
                            );
                          })}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
