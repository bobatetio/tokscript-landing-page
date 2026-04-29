// "use client";
// import { useEffect } from 'react';
// import Script from 'next/script';

// export default function PlausibleAnalytics() {
//   useEffect(() => {
//     // Check if we're on the client side and the domain is tokscript.com
//     if (typeof window !== 'undefined' && window.location.hostname === 'tokscript.com') {
//       // Initialize plausible function if not already defined
//       window.plausible = window.plausible || function() { 
//         (window.plausible.q = window.plausible.q || []).push(arguments) 
//       };
//     }
//   }, []);

//   // Only render the script if we're on tokscript.com domain
//   if (typeof window !== 'undefined' && window.location.hostname !== 'tokscript.com') {
//     return null;
//   }

//   return (
//     <>
//       <Script
//         defer
//         data-domain="tokscript"
//         src="https://plausible.io/js/script.file-downloads.hash.outbound-links.pageview-props.revenue.tagged-events.js"
//         strategy="afterInteractive"
//       />
//       <Script
//         id="plausible-init"
//         strategy="afterInteractive"
//         dangerouslySetInnerHTML={{
//           __html: `window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }`
//         }}
//       />
//     </>
//   );
// }

"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function PlausibleAnalytics() {
  useEffect(() => {
    // Only run on tokscript.com
    if (typeof window !== "undefined" && window.location.hostname === "tokscript.com") {
      // Initialize plausible if not already defined
      window.plausible =
        window.plausible ||
        function () {
          (window.plausible.q = window.plausible.q || []).push(arguments);
        };
      window.plausible.init =
        window.plausible.init ||
        function (i) {
          window.plausible.o = i || {};
        };
      window.plausible.init();
    }
  }, []);

  // Don't load script on other domains
  if (typeof window !== "undefined" && window.location.hostname !== "tokscript.com") {
    return null;
  }

  return (
    <>
      <Script
        async
        src="https://plausible.io/js/pa-dp-zATptBhhMXG2UoxVDq.js"
        strategy="lazyOnload"
      />
      <Script
        id="plausible-init"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            window.plausible = window.plausible || function() { (plausible.q = plausible.q || []).push(arguments) };
            plausible.init = plausible.init || function(i) { plausible.o = i || {}; };
            plausible.init();
          `,
        }}
      />
    </>
  );
}
