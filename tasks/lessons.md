# Lessons Learned

## 2026-02-03: Features Dropdown Implementation

### Mistake 1: Not Verifying Visual Output
**What happened:** Implemented a Features dropdown but didn't visually verify the result. The menu was completely broken - items stacking vertically instead of horizontally.

**Root cause:** Used Bootstrap utility classes `d-none d-lg-block` which override `display` to `block`, breaking the inline menu layout.

**Rule:** Always visually verify UI changes in the browser before marking complete. Build success ≠ visual correctness.

### Mistake 2: Dull/Boring Icons
**What happened:** Used plain white icons with no visual distinction between features. User had to request colorful icons like the Ferndesk reference.

**Root cause:** Didn't fully study the reference design. Ferndesk uses colorful icon backgrounds to make each feature visually distinct.

**Rule:** When given a reference design, match the visual quality and details (colors, spacing, effects), not just the structure.

### Mistake 3: Click-only Dropdown
**What happened:** Implemented dropdown that only opens on click, but standard UX for navigation menus is hover-to-open.

**Root cause:** Didn't consider UX patterns for navigation dropdowns.

**Rule:** Navigation dropdowns should open on hover (desktop) for better UX. Use CSS `:hover` with visibility/opacity transitions.

---

## Patterns to Apply

1. **Visual verification is mandatory** - No UI task is complete without checking it in a browser
2. **Match reference design quality** - Study colors, spacing, icons, and effects
3. **Consider standard UX patterns** - Nav dropdowns = hover, modals = click, etc.
4. **Test both desktop and mobile** - Responsive issues are common
