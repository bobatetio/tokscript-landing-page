"use client";

import { Check, Minus, Info } from "lucide-react";
import PRICING_CATEGORIES, { PLATFORM_GLYPHS } from "@/data/pricingFeatures";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function PricingCategoryList({ tier }) {
  return (
    <div className="pc-category-list">
      {PRICING_CATEGORIES.map((category) => {
        const hasAccess = category.features.some((f) =>
          f.tiers.includes(tier)
        );
        const isFreeTranscripts = tier === "free" && category.key === "transcripts";
        const label = category.tierLabels?.[tier] ?? category.key;
        const isHighlighted = category.key === "mcp" && tier !== "free";

        return (
          <div
            key={category.key}
            className={`pc-cat-group${isHighlighted ? " is-highlighted" : ""}`}
          >
            <div className="pc-cat-header">
              <span className="pc-cat-header-label">{label}</span>
              {category.key === "mcp" && hasAccess && (
                <span className="pc-cat-new-tag">NEW</span>
              )}
              {isFreeTranscripts && (
                <span className="pc-cat-badge">5 / day</span>
              )}
            </div>

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

            {category.platformGlyphs && hasAccess && (
              <div className="pc-platform-glyphs">
                {PLATFORM_GLYPHS.map(({ key, label, Glyph }) => (
                  <span
                    key={key}
                    className="pc-platform-glyph"
                    aria-label={label}
                  >
                    <Glyph />
                  </span>
                ))}
              </div>
            )}

            <ul className="pc-cat-features">
              {category.features.map((feature) => {
                const accessible = feature.tiers.includes(tier);
                return (
                  <li
                    key={feature.name}
                    className={`pc-cat-feature${accessible ? "" : " is-disabled"}`}
                  >
                    <span className="pc-cat-feature-indicator" aria-hidden="true">
                      {accessible ? (
                        <Check
                          className="pc-cat-check"
                          size={16}
                          strokeWidth={3}
                        />
                      ) : (
                        <Minus
                          className="pc-cat-dash"
                          size={14}
                          strokeWidth={2}
                        />
                      )}
                    </span>
                    <span className="pc-cat-feature-name">{feature.name}</span>
                    {feature.tooltip && (
                      <span
                        className="pc-cat-feature-info"
                        data-tooltip={feature.tooltip}
                        title={feature.tooltip}
                        tabIndex={0}
                        aria-label={feature.tooltip}
                      >
                        <Info size={13} strokeWidth={2} aria-hidden="true" />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
