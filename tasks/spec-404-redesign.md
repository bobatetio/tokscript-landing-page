# 404 Page Redesign Spec

## Shared Class Names & Structure

```
.page-not-found-page
  Header
  .not-found-hero
    .not-found-glow-1   (ambient cyan glow, top-left, pseudo or div)
    .not-found-glow-2   (ambient pink glow, bottom-right, pseudo or div)
    .container
      .not-found-content
        .not-found-code  -> "404" (large gradient text)
        h1              -> "This page doesn't exist"
        p.not-found-sub -> "The page you were looking for may have been moved, deleted, or never existed. Let's get you back on track."
        .not-found-actions
          Link.not-found-cta  -> "Back to Home" href="/"
          Link.not-found-link -> "Explore Features" href="/features/chrome-extension"
  Footer
```

## Brand Variables (from App.scss)
- `$primary_cyan: #00f2ea`
- `$pink: #ff6393`
- `$inter: "Inter"`
- `$body_bg_color: #0a1025`

## Design Details
- Full viewport min-height with flex centering
- "404" text: ~180px, cyan-to-pink gradient via background-clip, 0.15 opacity with text-shadow glow, subtle pulse animation
- Ambient glows: absolute-positioned radial gradients, pointer-events: none
- CTA button: gradient background (cyan to pink), white text, rounded, hover scale
- Secondary link: cyan colored, underline on hover
- Mobile: scale down 404 text to ~100px, tighten spacing
