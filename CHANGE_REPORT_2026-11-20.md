# Change Report — 2026-11-20 (`medicalbillingmb.com`)

## Summary of Changes
Synced `master` via fast-forward to `origin/master` (`04ef758`) and applied UX, image, GA4 tracking, and conversion form fixes (`35 insertions, 9 deletions` across `8` tracked files + `app/for-providers/ProviderAuditForm.jsx`).

### 1. Inline Conversion Capture on `/for-providers`
- Created `app/for-providers/ProviderAuditForm.jsx`: Direct 20-claim audit request form posting to `/my-api/consultations` with `generate_lead` telemetry and a PHI warning banner, preventing visitors from having to bounce to `/consultation` before submitting.
- Updated `app/for-providers/page.jsx`: Embedded `<ProviderAuditForm />`, targeted hero CTAs to `#provider-audit-form`, and added `priority` loading on provider imagery.

### 2. Service Imagery & Load Priority
- Replaced & compressed service imagery under `public/raster/authentic/`:
  - `consultation-audit-desk.jpg` (`94,441` B) — plus `priority` added in `app/consultation/page.js`
  - `providers-rcm-analytics.jpg` (`78,494` B) — replacing missing/dark tile on `/for-providers`
  - `providers-hero-team.jpg` (`186,958` B)
  - `providers-coding-specialist.jpg` (`79,853` B)

### 3. GA4 Isolation & Locale Alternates
- `app/components/MarketingAndAnalyticsScripts.jsx`: Removed `G-M1RHKRVS9M` (AI Dynamic Pro property) from `DEFAULT_GA_IDS` so MBMB reports cleanly to `['G-K6JSWT8YWN']` only.
- `app/layout.js`: Restored `alternates.languages` (`en-US`, `es-US`, `ht-HT`, `x-default`).

## Verification
- `npx biome lint app/components/MarketingAndAnalyticsScripts.jsx app/for-providers/ProviderAuditForm.jsx app/consultation/page.js`: exited `0` (`0` errors; pre-existing JSON-LD/SVG/key lint items in `app/for-providers/page.jsx` and `app/layout.js` and CRLF formatting preserved untouched).
- `npm run build` (`next build` 16.1.6 Turbopack): exited `0`, compiled in `3.8s`, generated `36/36` routes.

## Remaining Manual Actions
- Add exact physical street/suite address (currently `Miami Beach, FL 33139`).
- Add verified client quotes / Google Business Profile reviews with real attribution once collected.
- Mark `generate_lead` and `click_phone_call` as Key Events in GA4 property `G-K6JSWT8YWN`.
