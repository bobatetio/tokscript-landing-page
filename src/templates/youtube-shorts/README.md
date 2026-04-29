# YouTube Shorts Landing Page Template

This is a self-contained landing page template for the YouTube Shorts transcript generator.

## Quick Start for Backend Engineers

### 1. Copy this folder
Copy the entire `youtube-shorts/` folder to your project.

### 2. Update Configuration
Edit `config.js` to connect to your backend:

```js
// config.js - Key sections to update:

api: {
  baseUrl: "YOUR_API_BASE_URL",  // e.g., "https://api.yoursite.com"
  endpoints: {
    fetchVideoData: "/your/endpoint",
    userProfile: "/user/profile",
    changePlan: "/subscription/change-plan",
  },
},

urls: {
  appUrl: "YOUR_APP_URL",         // e.g., "https://app.yoursite.com"
  frontendUrl: "YOUR_FRONTEND",   // e.g., "https://yoursite.com"
},

lemonSqueezy: {
  productId: "YOUR_PRODUCT_ID",
  checkoutBaseUrl: "YOUR_CHECKOUT_URL",
},
```

### 3. Environment Variables
Set these in your `.env` file:

```env
NEXT_PUBLIC_API_URL=https://api.yoursite.com
NEXT_PUBLIC_APP_URL=https://app.yoursite.com
NEXT_PUBLIC_FRONTEND_URL=https://yoursite.com
NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID=your_product_id
```

## File Structure

```
youtube-shorts/
├── config.js         # All configurable settings
├── LandingPage.js    # Main React component
└── README.md         # This file
```

## Configuration Options

### Branding & Copy
Update text displayed on the page:
- `branding.headline` - Main page headline
- `branding.tagline` - Subheadline text
- `branding.inputPlaceholder` - Input field placeholder

### Feature Flags
Enable/disable page sections:
```js
features: {
  showAIFeatures: true,        // AI features cards
  showDashboardPreview: true,  // Dashboard preview section
  showBulkImport: true,        // Bulk import section
  showPricing: true,           // Pricing cards
  showFAQ: true,               // FAQ section
  // ... more options
}
```

### Pricing Plans
Customize the free plan and paid features in:
- `freePlan` - Free tier configuration
- `paidPlanFeatures` - Array of paid plan features

### SEO
Update meta information:
```js
seo: {
  title: "Your Page Title",
  description: "Your meta description",
  keywords: ["keyword1", "keyword2"],
}
```

## API Requirements

Your backend should implement these endpoints:

### POST `/tiktok/fetchTikTokData`
Fetch video data and transcript.

**Query Params:**
- `video` - Video URL
- `get_transcript` - "true"
- `ip` - User IP address

**Response:**
```json
{
  "video_data": { ... },
  "transcript": "..."
}
```

### GET `/user/profile`
Get user profile data.

**Headers:**
- `Authorization: Bearer {token}`

**Response:**
```json
{
  "user": {
    "id": "...",
    "email": "...",
    "plan": "free|pro",
    "subscription": { ... }
  }
}
```

### PUT `/subscription/change-plan`
Change user subscription plan.

**Headers:**
- `Authorization: Bearer {token}`

**Body:**
```json
{
  "plan": "pro",
  "billingCycle": "monthly|yearly",
  "variantId": "..."
}
```

## Dependencies

This template requires these npm packages (should already be in your project):
- react
- next
- react-bootstrap
- axios
- react-icons
- react-toastify

## Styling

The page uses the CSS class `youtube-landing-page` for theming.
Styles are defined in `/src/App.scss` (lines ~3020-3599).

To customize colors, update the SCSS variables in that file.

## Questions?

Contact the frontend team for any questions about this template.
