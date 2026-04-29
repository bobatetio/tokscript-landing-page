import PageData from "./PageData";

export const metadata = {
  title: "TokScript Affiliate Program | 40% Recurring Commissions + View Bonuses",
  description:
    "Join the TokScript affiliate program and earn 40% recurring commissions on every referral. Plus pay-per-view bonuses up to $1,000. Free to join, no minimum referrals.",
  alternates: {
    canonical: "https://tokscript.com/affiliate",
  },
  openGraph: {
    title: "TokScript Affiliate Program | 40% Recurring Commissions + View Bonuses",
    description:
      "Earn 40% recurring commissions on every referral. Plus pay-per-view bonuses up to $1,000. Free to join, no minimum referrals.",
    url: "https://tokscript.com/affiliate",
    siteName: "TokScript",
    images: [
      {
        url: "https://tokscript.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "TokScript Affiliate Program",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TokScript Affiliate Program | 40% Recurring Commissions + View Bonuses",
    description:
      "Earn 40% recurring commissions on every referral. Plus pay-per-view bonuses up to $1,000. Free to join, no minimum referrals.",
    images: ["https://tokscript.com/og-image.png"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://tokscript.com"
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Affiliate Program",
      item: "https://tokscript.com/affiliate"
    }
  ]
};

export default function Affiliate() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much commission do I earn?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You earn 40% on every payment your referrals make, monthly or annual. If someone subscribes at $10/mo, you earn $4.00/mo. If they go annual at $39/yr, you earn $15.60/yr. You keep earning for as long as they stay subscribed."
        }
      },
      {
        "@type": "Question",
        "name": "What is the pay-per-view program?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Track 2 program pays you for creating content about TokScript. Earn $100 for 50K views, $250 for 100K views, $500 for 500K views, and $1,000 for 1M views. You can stack this with referral commissions."
        }
      },
      {
        "@type": "Question",
        "name": "How long does the cookie last?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We use a 30-day cookie window. If someone clicks your referral link and signs up within those 30 days, you get credit for that referral."
        }
      },
      {
        "@type": "Question",
        "name": "Can I promote TokScript on any platform?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. You can share your affiliate link on YouTube, TikTok, Instagram, Twitter/X, your blog, email newsletters, Discord servers, or wherever else you have an audience. We have pre-made posts, emails, and scripts in the affiliate dashboard that you can grab and use."
        }
      },
      {
        "@type": "Question",
        "name": "When and how do I get paid?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Payouts are handled automatically by Lemon Squeezy via PayPal or Stripe. You can see your earnings update live inside your affiliate dashboard. The minimum payout is $5."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a minimum number of referrals?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No minimum. You earn 40% on each referral, whether it's your first or your thousandth. There's no cap on earnings either. Your commissions grow as your referrals do."
        }
      },
      {
        "@type": "Question",
        "name": "Can I earn from both tracks at the same time?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. Both tracks stack. If you post a video about TokScript that hits 100K views, you collect the $250 view bonus. And if people who watched that video sign up through your link, you also earn 40% commissions on their payments. The two payouts are separate and both go to you."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <PageData />
    </>
  );
}
