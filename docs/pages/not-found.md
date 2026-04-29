# Page Not Found | TokScript (404)

**URL:** Any invalid/non-existent URL path (dynamic 404 fallback)

**File Source:** src/app/not-found.js

## Metadata

- **Title:** Page Not Found | TokScript
- **Description:** The page you're looking for doesn't exist.
- **Robots Meta:** index: false, follow: true
- **Canonical:** null (not applicable for error page)
- **OpenGraph:** null (not applicable)
- **Twitter Card:** null (not applicable)

## Page Structure

### Wrapper Element
- **Class:** "page-not-found-page"
- Contains Header, NotFoundHero section, and Footer

### Header Component
Standard navigation header component.

### Not Found Hero Section

**Section Class:** "not-found-hero"

#### Decorative Glow Elements
- **not-found-glow-1:** First glowing background effect
- **not-found-glow-2:** Second glowing background effect

#### Main Content Container

**404 Code Display**
- **Class:** "not-found-code"
- Large, prominent display of "404" error code

**Main Heading**
- **H1 Text:** "This page doesn't exist"
- Primary message to users

**Subtitle**
- **Class:** "not-found-sub"
- **Text:** "The page you were looking for may have been moved, deleted, or never existed. Let's get you back on track."
- Provides context and reassurance to users

#### Action Buttons

**Primary Call-to-Action**
- **Class:** "not-found-cta"
- **Link:** "/" (home page)
- **Text:** "Back to Home"
- Standard button styling for primary action

**Secondary Link**
- **Class:** "not-found-link"
- **Link:** "/features"
- **Text:** "Explore Features"
- Alternative navigation option for users

### Footer Component
Standard footer component with links and information.

## Design Features

- Glow effects for visual interest and brand consistency
- Large 404 code as focal point
- Clear messaging explaining the error
- Two navigation options to redirect users
- Responsive layout for mobile and desktop
- No indexed content (robots: index: false) to prevent search engine indexing of error pages
- Follow existing links to allow search engines to crawl site structure

## Purpose

This page provides a user-friendly error experience when:
- Users navigate to non-existent URLs
- Links point to deleted content
- Typos in URL paths
- Old bookmarks or external links pointing to removed pages

The page reassures users and provides clear paths back to useful content through the home page or features section.
