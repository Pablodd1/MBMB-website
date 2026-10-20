'use client';

import { useEffect } from 'react';
import Script from 'next/script';

/**
 * Privacy-Safe Marketing, GA4 & Key Event Analytics (Section 8 Compliance)
 *
 * Connected GA4 Measurement IDs:
 * - G-K6JSWT8YWN (Primary Property reporting in Google Analytics)
 * - G-M1RHKRVS9M (Secondary MBMB Stream)
 *
 * Key Features:
 * 1. Restores active GA4 tracking while keeping HIPAA-safe privacy controls
 *    (anonymize_ip, no Google Signals, no Ad Personalization).
 * 2. Preserves safe marketing attribution parameters (utm_source, utm_medium,
 *    utm_campaign, utm_content, utm_term) so Brevo Email & Instagram campaigns
 *    track properly in GA4 without ever leaking form query strings or PHI.
 * 3. Automatically tracks GA4 Key Events recommended in your GA4 report:
 *    - generate_lead (Consultation, Contact & Attorney Pilot submissions)
 *    - book_appointment (Calendar booking widget completions)
 *    - click_phone_call (Clicks on (786) 643-2099)
 *    - click_email (Clicks on Jasmel@medicalbillingmb.com)
 *    - cta_click (Clicks on Request Consultation / For Providers / For Attorneys CTAs)
 *    - engaged_reader_30s & scroll_depth_50 (Accurately records engaged sessions & reduces false bounce rate)
 */

const DEFAULT_GA_IDS = ['G-K6JSWT8YWN', 'G-M1RHKRVS9M'];

export function trackMBMBEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      send_to: DEFAULT_GA_IDS[0],
    });
  }
}

export default function MarketingAndAnalyticsScripts() {
  const envGaId = process.env.NEXT_PUBLIC_GA_ID;
  const gaIds = Array.from(new Set([envGaId, ...DEFAULT_GA_IDS].filter(Boolean)));
  const primaryGaId = gaIds[0];
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Delegated click listener for high-value Key Events (phone, email, consultation CTAs)
    const handleDocumentClick = (e) => {
      const anchor = e.target?.closest?.('a, button');
      if (!anchor) return;

      const href = anchor.getAttribute('href') || '';
      const label = (anchor.innerText || anchor.getAttribute('aria-label') || '').trim().slice(0, 60);

      if (href.startsWith('tel:')) {
        trackMBMBEvent('click_phone_call', {
          event_category: 'engagement',
          event_label: href.replace('tel:', ''),
          page_path: window.location.pathname,
        });
      } else if (href.startsWith('mailto:')) {
        trackMBMBEvent('click_email', {
          event_category: 'engagement',
          event_label: href.replace('mailto:', ''),
          page_path: window.location.pathname,
        });
      } else if (
        href.includes('/consultation') ||
        href.includes('/for-attorneys#pilot-form') ||
        href.includes('/for-providers')
      ) {
        trackMBMBEvent('cta_click', {
          event_category: 'conversion_intent',
          destination: href,
          cta_text: label,
          page_path: window.location.pathname,
        });
      }
    };

    // 2. Delegated form submission listener for GA4 "generate_lead" Key Event (never sends form field values/PHI)
    const handleFormSubmit = (e) => {
      const form = e.target;
      if (!form || form.tagName !== 'FORM') return;
      trackMBMBEvent('generate_lead', {
        event_category: 'lead_submission',
        form_location: window.location.pathname,
      });
    };

    // 3. 25-second engaged reader + 50% scroll depth signal (improves GA4 engagement time & bounce rate accuracy)
    let scrolled50 = false;
    const handleScroll = () => {
      if (scrolled50) return;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 200 && scrollTop / docHeight >= 0.5) {
        scrolled50 = true;
        trackMBMBEvent('scroll_depth_50', {
          event_category: 'engagement',
          page_path: window.location.pathname,
        });
      }
    };

    const engagedTimer = setTimeout(() => {
      trackMBMBEvent('engaged_reader_25s', {
        event_category: 'engagement',
        page_path: window.location.pathname,
      });
    }, 25000);

    document.addEventListener('click', handleDocumentClick, { passive: true });
    document.addEventListener('submit', handleFormSubmit, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      clearTimeout(engagedTimer);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('submit', handleFormSubmit);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Google Analytics 4 (Privacy-Safe + UTM Campaign Attribution Preserved) */}
      {primaryGaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${primaryGaId}`}
            strategy="afterInteractive"
          />
          <Script id="mbmb-ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              (function() {
                var allowedParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
                var searchParams = new URLSearchParams(window.location.search);
                var cleanParams = new URLSearchParams();
                allowedParams.forEach(function(key) {
                  if (searchParams.has(key)) {
                    cleanParams.set(key, searchParams.get(key));
                  }
                });
                var qs = cleanParams.toString();
                var safeLocation = window.location.origin + window.location.pathname + (qs ? '?' + qs : '');

                ${gaIds
                  .map(
                    (id) => `gtag('config', '${id}', {
                  anonymize_ip: true,
                  allow_google_signals: false,
                  allow_ad_personalization_signals: false,
                  page_location: safeLocation
                });`
                  )
                  .join('\n                ')}
              })();
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
