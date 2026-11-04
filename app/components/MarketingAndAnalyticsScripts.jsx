'use client';

import { useEffect } from 'react';
import Script from 'next/script';

const DEFAULT_GA_IDS = ['G-K6JSWT8YWN', 'G-M1RHKRVS9M'];

function getVisitorContext() {
  if (typeof window === 'undefined') return {};
  const sp = new URLSearchParams(window.location.search);
  const storedSource = sessionStorage.getItem('mbmb_utm_source') || '';
  const storedCampaign = sessionStorage.getItem('mbmb_utm_campaign') || '';
  const storedAudience = localStorage.getItem('mbmb_audience') || '';

  const utm_source = sp.get('utm_source') || storedSource || (document.referrer ? new URL(document.referrer).hostname.replace('www.', '') : 'direct');
  const utm_medium = sp.get('utm_medium') || '';
  const utm_campaign = sp.get('utm_campaign') || storedCampaign || '';
  const utm_content = sp.get('utm_content') || '';
  const explicitAudience = sp.get('audience') || '';

  if (sp.get('utm_source')) sessionStorage.setItem('mbmb_utm_source', sp.get('utm_source'));
  if (sp.get('utm_campaign')) sessionStorage.setItem('mbmb_utm_campaign', sp.get('utm_campaign'));

  const path = window.location.pathname;
  const combined = `${path} ${utm_campaign} ${utm_content} ${explicitAudience} ${document.referrer}`.toLowerCase();
  let audience = storedAudience || 'general';
  if (
    combined.includes('attorney') ||
    combined.includes('law') ||
    combined.includes('legal') ||
    combined.includes('chronology')
  ) {
    audience = 'attorney';
    localStorage.setItem('mbmb_audience', 'attorney');
  } else if (
    combined.includes('provider') ||
    combined.includes('doctor') ||
    combined.includes('clinic') ||
    combined.includes('coding') ||
    combined.includes('credentialing') ||
    combined.includes('rcm') ||
    combined.includes('medicaid') ||
    combined.includes('denial')
  ) {
    audience = 'provider';
    localStorage.setItem('mbmb_audience', 'provider');
  }

  return {
    path,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    audience,
    lang: navigator.language || 'en-US',
    referrer: document.referrer || '',
  };
}

export function sendFirstPartyTelemetry(eventName, extra = {}) {
  if (typeof window === 'undefined') return;
  try {
    const ctx = getVisitorContext();
    const payload = JSON.stringify({
      event: eventName,
      ...ctx,
      ...extra,
    });
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: 'application/json' });
      navigator.sendBeacon('/my-api/telemetry', blob);
    } else {
      fetch('/my-api/telemetry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // Non-blocking telemetry
  }
}

export function trackMBMBEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, {
      ...params,
      send_to: DEFAULT_GA_IDS[0],
    });
  }
  sendFirstPartyTelemetry(eventName, {
    label: params.cta_text || params.event_label || params.form_location || '',
  });
}

export default function MarketingAndAnalyticsScripts() {
  const envGaId = process.env.NEXT_PUBLIC_GA_ID;
  const gaIds = Array.from(new Set([envGaId, ...DEFAULT_GA_IDS].filter(Boolean)));
  const primaryGaId = gaIds[0];
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 0. Record First-Party Page View & Session Start
    const isNewSession = !sessionStorage.getItem('mbmb_session_active');
    if (isNewSession) {
      sessionStorage.setItem('mbmb_session_active', '1');
    }
    sendFirstPartyTelemetry('page_view', { isNewSession });

    // Notify dynamic UI components if audience changed
    window.dispatchEvent(new CustomEvent('mbmb:context-updated', { detail: getVisitorContext() }));

    // 1. Delegated click listener for high-value Key Events (phone, email, consultation CTAs, calculator)
    const handleDocumentClick = (e) => {
      const anchor = e.target?.closest?.('a, button, input[type="range"]');
      if (!anchor) return;

      if (anchor.tagName === 'INPUT' && anchor.type === 'range') {
        trackMBMBEvent('calculator_interaction', {
          event_category: 'engagement',
          page_path: window.location.pathname,
        });
        return;
      }

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
        href.includes('/for-attorneys') ||
        href.includes('/for-providers')
      ) {
        if (href.includes('/for-attorneys')) {
          localStorage.setItem('mbmb_audience', 'attorney');
        } else if (href.includes('/for-providers')) {
          localStorage.setItem('mbmb_audience', 'provider');
        }
        trackMBMBEvent('cta_click', {
          event_category: 'conversion_intent',
          destination: href,
          cta_text: label,
          page_path: window.location.pathname,
        });
      }
    };

    // 2. Delegated form submission listener for GA4 + First-Party "generate_lead" Key Event
    const handleFormSubmit = (e) => {
      const form = e.target;
      if (!form || form.tagName !== 'FORM') return;
      trackMBMBEvent('generate_lead', {
        event_category: 'lead_submission',
        form_location: window.location.pathname,
      });
    };

    // 3. 25-second engaged reader + 50% scroll depth signal
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
