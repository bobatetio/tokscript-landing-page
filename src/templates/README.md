# Landing Page Templates

This folder contains self-contained, deployable landing page templates for different platforms.

## Available Templates

| Template | URL Route | Description |
|----------|-----------|-------------|
| `youtube-shorts/` | `/youtube-shorts` | YouTube Shorts transcript generator |
| `instagram-reels/` | `/instagram-reels` | Instagram Reels transcript generator |

## For Backend Engineers

### Quick Deploy Steps

1. **Copy the template folder** you need to your project
2. **Edit `config.js`** to update API endpoints and settings
3. **Set environment variables** in your `.env` file
4. **Deploy!**

### Each template contains:

```
template-name/
├── config.js         # ⚡ All configurable settings (edit this!)
├── LandingPage.js    # The React component
└── README.md         # Detailed instructions
```

### Key Configuration Areas

```js
// config.js

// 1. API Endpoints
api: {
  baseUrl: "YOUR_API_URL",
  endpoints: { ... }
}

// 2. App URLs
urls: {
  appUrl: "YOUR_APP_URL",
  frontendUrl: "YOUR_FRONTEND_URL"
}

// 3. Payment Integration
lemonSqueezy: {
  productId: "YOUR_PRODUCT_ID",
  checkoutBaseUrl: "YOUR_CHECKOUT_URL"
}

// 4. Feature Flags (toggle sections on/off)
features: {
  showPricing: true,
  showFAQ: true,
  // ...
}
```

### Required Environment Variables

```env
NEXT_PUBLIC_API_URL=https://api.yoursite.com
NEXT_PUBLIC_APP_URL=https://app.yoursite.com
NEXT_PUBLIC_FRONTEND_URL=https://yoursite.com
NEXT_PUBLIC_LEMONSQUEEZY_PRODUCT_ID=your_product_id
```

## How Routes Work

The actual route files in `/src/app/` simply import from these templates:

```js
// /src/app/youtube-shorts/page.js
import LandingPage from "../../templates/youtube-shorts/LandingPage";
export default function Page() {
  return <LandingPage />;
}
```

This keeps the routing clean and the templates self-contained.

## Creating a New Platform Template

1. Copy an existing template folder
2. Rename it (e.g., `tiktok/`)
3. Update `config.js` with new platform details
4. Update `themeClass` for custom styling
5. Create a new route in `/src/app/` that imports your template

## Questions?

Contact the frontend team for any questions.
