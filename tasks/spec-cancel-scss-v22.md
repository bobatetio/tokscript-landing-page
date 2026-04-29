# Spec: cancel-scss-v22 — All SCSS Changes

## File: `src/assets/scss/cancel-flow.scss`

## Variables Reference (from variables.scss)
- `$primary_cyan: #00f2ea`
- `$pink: #ff6393`
- `$inter: "Inter", sans-serif`
- `$text_light: #d1d5db`
- `$white: #ffffff`
- `$black: #000000`
- `$slate-300: #cbd5e1`
- `$slate-400: #94a3b8`
- `$slate-500: #64748b`
- `$slate-600: #475569`
- `$transition: 0.3s ease-in-out all`

## Changes

### 1. Rename `.cancel-flow-warning-label` to `.cancel-flow-step-label`
Find the block starting at approximately line 116.
Change selector from `.cancel-flow-warning-label` to `.cancel-flow-step-label`.
Change `color: $pink;` to `color: $primary_cyan;`.
Change `text-shadow: 0 0 20px rgba($pink, 0.3);` to `text-shadow: 0 0 12px rgba($primary_cyan, 0.3);`.
Keep everything else (display, font-family, font-size, font-weight, text-transform, letter-spacing, margin-bottom).

### 2. `.cancel-flow-impact-icon` — Shrink and recolor
Find the block at approximately line 212.
Change `width: 56px` to `width: 36px`.
Change `height: 56px` to `height: 36px`.
Change `background: rgba(#f59e0b, 0.1)` to `background: rgba($primary_cyan, 0.1)`.
Change `border: 1px solid rgba(#f59e0b, 0.2)` to `border: 1px solid rgba($primary_cyan, 0.2)`.
Change inner `svg` block: `width: 28px; height: 28px;` to `width: 20px; height: 20px;`.
Change `color: #f59e0b;` to `color: $primary_cyan;`.

### 3. `.cancel-flow-decorative` base — Strip to minimal stub
Find the block at approximately line 408.
Replace the BASE class (NOT the `&--large` variant) to contain only:
```scss
.cancel-flow-decorative {
  position: relative;
  overflow: hidden;
  border-radius: 12px;

  // Large variant for Step 3
  &--large {
    // Keep this EXACTLY as it is currently
  }
}
```
This means removing: `height: 120px;`, `margin: 24px 0;`, the `&::before` pseudo (orb 1), and the `&::after` pseudo (orb 2) from the BASE class only. The `&--large` variant keeps all of its current styles including its own ::before and ::after.

### 4. Remove `.cancel-flow-price-note`
Delete the entire `.cancel-flow-price-note` block (approximately lines 391-398).

### 5. Add `.cancel-flow-retain-list` — NEW
Add this after the `.cancel-flow-limits-list` block (after line ~259):
```scss
// RETAIN LIST (Step 2) — cyan check icons
.cancel-flow-retain-list {
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;

  li {
    display: flex !important;
    align-items: center;
    gap: 10px;
    color: $text_light !important;
    font-family: $inter;
    font-size: 14px;
  }
}
```

### 6. Add `.cancel-flow-check-icon` — NEW
Add immediately after `.cancel-flow-retain-list`:
```scss
.cancel-flow-check-icon {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba($primary_cyan, 0.15);
  border: 1px solid rgba($primary_cyan, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: $primary_cyan;
}
```

### 7. Add `.cancel-flow-learn-more` — NEW
Add after `.cancel-flow-check-icon`:
```scss
// "Compare all plans" link
.cancel-flow-learn-more {
  font-family: $inter;
  font-size: 13px;
  color: $slate-500;
  text-align: center;
  margin: 16px 0;

  a {
    color: $primary_cyan;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
```

### 8. `.cancel-flow-pricing-card` — Increase opacity
Find the block at approximately line 545.
Change `background: rgba($primary_cyan, 0.03)` to `background: rgba($primary_cyan, 0.06)`.
Change `border: 1px solid rgba($primary_cyan, 0.12)` to `border: 1px solid rgba($primary_cyan, 0.20)`.
Keep `margin: 20px 0;` (already exists), `padding: 24px`, `border-radius: 14px`, `text-align: center`, `position: relative`.

### 9. `.cancel-flow-btn--ghost` — Improve contrast
Find the `&--ghost` block inside `.cancel-flow-btn` (approximately line 332).
Change `color: $slate-500;` to `color: $slate-400;`.
Change hover `color: $slate-400;` to `color: $slate-300;`.

### 10. `.cancel-flow-divider` — Tighter margins
Find the block at approximately line 401.
Change `margin: 16px 0;` to `margin: 12px 0;`.

### 11. New `@media (max-width: 640px)` breakpoint
Add a NEW media query BEFORE the existing `@media (max-width: 576px)` block:
```scss
@media screen and (max-width: 640px) {
  .cancel-flow-impact-card {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}
```

### 12. Update existing `@media (max-width: 576px)`
Within the existing 576px breakpoint, ADD these rules (keep all existing rules):
```scss
  .cancel-flow-retain-list {
    gap: 6px;
  }

  .cancel-flow-pricing-card {
    padding: 16px;
  }

  .cancel-flow-learn-more {
    font-size: 12px;
  }
```
Also REMOVE the `.cancel-flow-impact-card` grid collapse from the 576px breakpoint since it now lives at 640px. The existing 576px block has `.cancel-flow-impact-card { grid-template-columns: 1fr; gap: 20px; padding: 20px; }` — remove ONLY the `grid-template-columns` and `gap` lines, keep the `padding: 20px;` line.

### 13. `.cancel-flow-btn--outline` margin for Step 2 context
Add `margin-bottom: 8px;` to the `&--outline` block inside `.cancel-flow-btn`. This creates space between the outline button and the divider in Step 2.
Wait, actually don't do this — it would affect ALL outline buttons. Instead, leave it as-is. The divider's margin handles the spacing.

## CRITICAL RULES
- Use ONLY variables from variables.scss (never hardcode colors that have variable equivalents)
- Do NOT modify any animation keyframes
- Do NOT modify `.cancel-flow-modal`, `.modal-dialog`, `.modal-content`, `.modal-body` styles
- Do NOT modify `.cancel-flow-close-btn` styles
- Do NOT modify `.cancel-flow-winback-overlay` or `.cancel-flow-winback-card` styles
- Do NOT modify `.cancel-flow-icon-wrap` styles
- Keep the global CSS override fix at the top: `ul li { color: $text_light !important; display: flex !important; }`
