# AI Developer Upgrade Handoff — Medical Billing Miami Beach (MBMB)

## What Was Changed (Branch: `master`, Commit `8732253`)
- **Updated `app/layout.js`**: Removed unlocalized `/?lang=es` and `/?lang=ht` `hreflang` alternates (which pointed to the same English page) and added `<link rel="help" type="text/plain" href="/llms.txt" />`.
- **Updated `app/components/MarketingAndAnalyticsScripts.jsx`**: Hardened Meta Pixel (`autoConfig: false` + LDU) and added optional non-PHI PostHog analytics hook.

## Live Test Verification
- `https://medicalbillingmb.com`: HTTP `200`, `robots.txt` `200`, `llms.txt` `200`.

## Developer Actions Needed
- If enabling analytics, configure `NEXT_PUBLIC_POSTHOG_KEY`/`NEXT_PUBLIC_POSTHOG_HOST` or use Railway Umami (`https://umami-production-92f6d421.up.railway.app`) in Vercel env vars.
