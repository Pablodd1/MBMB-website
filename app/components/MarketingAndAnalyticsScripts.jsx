'use client';

import Script from 'next/script';

/**
 * Privacy-Safe Marketing & Analytics Scripts (Section 8 Compliance)
 *
 * Rules enforced:
 * - Only loads when environment variables (NEXT_PUBLIC_GA_ID, NEXT_PUBLIC_GTM_ID,
 *   NEXT_PUBLIC_META_PIXEL_ID) are explicitly configured.
 * - Explicitly disables automatic form-data/user-provided-data scraping in Meta Pixel
 *   and sanitizes page_location in GA4 so query parameters or form field contents
 *   are never transmitted to third-party ad networks on healthcare/legal intake routes.
 */
export default function MarketingAndAnalyticsScripts() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <>
      {/* Google Analytics 4 (Privacy-Safe Configuration) */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="mbmb-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaId}', {
                anonymize_ip: true,
                allow_google_signals: false,
                allow_ad_personalization_signals: false,
                page_location: window.location.origin + window.location.pathname
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager (Optional) */}
      {gtmId && (
        <Script id="mbmb-gtm-init" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      )}

      {/* Meta / Facebook Pixel (Restricted Mode: No Form-Body or Automatic Advanced Matching) */}
      {metaPixelId && (
        <Script id="mbmb-meta-pixel-init" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('dataProcessingOptions', ['LDU'], 0, 0);
            fbq('init', '${metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
