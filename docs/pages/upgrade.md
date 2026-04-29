# Upgrade | TokScript

**URL:** https://tokscript.com/upgrade

**File Source:** src/app/upgrade/page.js

## Overview

This is an interactive pricing and upgrade page designed for logged-in users to upgrade from the Free plan to Pro. It features pricing comparison, subscription management, and checkout integration via Lemon Squeezy payment processor.

## Key Characteristics

- **Type:** Client-side component (marked with "use client")
- **Purpose:** Enable users to view pricing tiers and upgrade subscriptions
- **Payment Processor:** Lemon Squeezy (secure payment handling)
- **Interactivity:** Extensive use of Framer Motion animations

## Page Components

### Header Component
Navigation header with links to main sections.

### Background
Decorative animated background component.

### Modals and Overlays

1. **DontMissOutModal**
   - Exit-intent popup triggered when user shows intent to leave
   - Provides last-minute upgrade incentive
   - 28+ translation strings for multilingual support

2. **CheckoutOverlay**
   - Embedded checkout interface
   - Displays Lemon Squeezy payment form
   - Approximately 30+ translated strings

3. **ConfirmationModal**
   - Post-purchase confirmation screen
   - Displays order/subscription details
   - Contains 5+ confirmation-related strings

### Pricing Display Section

#### Free vs Pro Comparison
Interactive pricing comparison table showing:

**Free Plan**
- Price: $0
- Limited transcripts per month
- Basic features

**Pro Plan**
- Price: $39/year or $10/month
- Unlimited transcripts
- Advanced features
- Priority support

#### Feature Comparison List
Itemized list comparing features between Free and Pro tiers using:
- Check icons (Check component from lucide-react) for included features
- X icons (X component from lucide-react) for unavailable features

Features compared include:
- Transcript count limits
- AI analysis capabilities
- Storage space
- Download options
- Team collaboration
- API access
- Priority support

### Animated Counter Component
Displays key metrics with animated number counters:
- from: Starting value
- to: Target value
- label: Metric description
- suffix: Unit suffix (%, +, etc.)

Animation triggers on scroll (useInView) and uses Framer Motion animate() for smooth transitions.

### Trust Signals
Visual elements building confidence:
- TrustPilot logo/integration
- User testimonials
- Star ratings
- Social proof indicators

### Lemon Squeezy Integration

Uses two components for payment processing:
1. **LemonProducts** (production environment)
2. **LemonProductsStaging** (staging/testing environment)

Both handle secure subscription checkout and payment token generation.

### Navigation and Routing
- Uses Next.js useRouter and useSearchParams for navigation
- Payment success/failure handling with URL parameters
- Toast notifications (react-toastify) for user feedback

### Dependencies

**Animation Library:**
- framer-motion: useScroll, useTransform, useInView, animate, AnimatePresence

**UI Icons:**
- lucide-react: Check, X, Zap, Crown, Sparkles, ChevronDown, ArrowRight, TrendingUp, Video, Layers, Lock, ShieldCheck, Globe, Star

**HTTP Client:**
- axios: API communication

**Payment:**
- Lemon Squeezy SDK integration

**UI Framework:**
- react-bootstrap: ProgressBar, Modal
- react-toastify: Toast notifications
- react-icons: FaBrain, FaBolt, FaCloud, FaCopy, FaDownload, FaFireAlt, FaFolder, FaImage, FaLink, FaPenFancy, FaPlus, FaShare, FaChevronDown

## Features

- Real-time subscription status validation
- Secure payment processing with Lemon Squeezy
- Animated counter statistics
- Responsive pricing comparison
- Exit-intent conversion optimization
- Post-purchase confirmation workflow
- Multilingual support (translations passed via props)
- Toast notifications for user actions
- Loading states during transaction processing

## Internationalization

Supports translations across multiple languages through locale JSON files. Component accepts optional `t` (translation) prop with English fallbacks for all text.

## Footer Component
Navigation footer with additional links and information.
