# Medical Billing Miami Beach (MBMB) Website

A Next.js 14+ website for Medical Billing Miami Beach — a medical billing, coding, and credentialing service for Florida healthcare providers.

**Live URL:** https://medicalbillingmb.com

---

## 🚨 CRITICAL COMPONENTS — DO NOT REMOVE

These components are **essential business features**. Removing them breaks the site's lead generation, conversion, and user engagement. Before modifying `app/page.js`, read this section.

### 1. SplashScreen (`app/components/SplashScreen.jsx`)
- **What:** Black intro screen with 3D rotating MBMB logo, "Loading Experience" text
- **When:** Shows on first load for ~4.3 seconds
- **Why:** Brand impact, professional first impression
- **State:** `showSplash` (useState(true)) controls visibility

### 2. RevenueCalculator (`app/components/revenue-calculator.jsx`)
- **What:** Fixed floating widget (bottom-right) — calculates potential savings
- **Features:**
  - Monthly billing volume slider ($10K–$500K)
  - Current denial rate slider (1%–40%)
  - MBMB service tier selector (5.6%, 6.5%, 8%, 10%)
  - Shows monthly/yearly gain vs current denial rate
  - 98% clean claim rate benchmark
- **Why:** Primary conversion tool — lets doctors see $ savings before calling
- **CTA:** "Get Your Free Audit →" links to /consultation

### 3. LeadMagnetPopup (`app/components/lead-magnet-popup.jsx`)
- **What:** Modal popup offering FREE "2026 Florida Billing Compliance Checklist"
- **When:** Appears 5 seconds after page load (once per day, localStorage tracked)
- **Features:**
  - Email capture form
  - HIPAA, Florida Medicaid, 2026 coding changes, Security checklist items
  - Thank-you state after submission
- **Why:** Email list building, lead capture

### 4. FloatingVideo (`app/components/FloatingVideo.jsx`)
- **What:** Small floating video player (bottom-right, above calculator)
- **Content:** `/assets/medical-presentation (3).mp4` — autoplay, muted, loop
- **Why:** Humanizes the brand, shows the billing expert

### 5. AIVoiceCallButton (`app/components/AIVoiceCallButton.jsx`)
- **What:** AI voice receptionist button for hands-free interaction
- **Why:** Accessibility, modern UX, captures leads who prefer voice

### 6. UnifiedReceptionist (`app/components/UnifiedReceptionist.jsx`)
- **What:** Chat + Voice AI widget (bottom-left)
- **Why:** 24/7 lead capture, answers questions, schedules consultations

---

## 📁 Component Inventory

| Component | File | Type | Status |
|-----------|------|------|--------|
| SplashScreen | `app/components/SplashScreen.jsx` | Client | ✅ Required |
| RevenueCalculator | `app/components/revenue-calculator.jsx` | Client | ✅ Required |
| LeadMagnetPopup | `app/components/lead-magnet-popup.jsx` | Client | ✅ Required |
| FloatingVideo | `app/components/FloatingVideo.jsx` | Client | ✅ Required |
| AIVoiceCallButton | `app/components/AIVoiceCallButton.jsx` | Client | ✅ Required |
| UnifiedReceptionist | `app/components/UnifiedReceptionist.jsx` | Client | ✅ Required |
| RotatingLogo3D | `app/components/RotatingLogo3D.jsx` | Client | ✅ Required |
| DarkHeroBackground | `app/components/DarkHeroBackground.jsx` | Client | ✅ Required |
| SmartImage | `app/components/SmartImage` | Client | ✅ Required |

---

## ⚠️ BEFORE MODIFYING PAGE.JS

### Checklist:
- [ ] Did you verify ALL imports at the top of `app/page.js` are still needed?
- [ ] Did you check that ALL component JSX tags in the `Home()` function are still rendered?
- [ ] Did you confirm no components were accidentally deleted during copy-paste?
- [ ] Did you test `npm run build` locally before pushing?
- [ ] Did you verify the live site after Vercel deploys?

### Common Mistakes to Avoid:
1. **Copy-paste errors** — When fixing syntax (unclosed tags, duplicate functions), use `git diff` to verify nothing was accidentally removed
2. **Import stripping** — Don't remove imports even if VS Code says they're "unused" — client components may be conditionally rendered
3. **JSX tag removal** — Comment out instead of delete when testing; restore before commit
4. **Build ≠ Deploy** — Vercel auto-deploy only works if the branch matches Production Branch setting

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

## 📤 Deployment

**Platform:** Vercel (connected to GitHub)

**Production Branch:** `main` (previously `master` — renamed May 2026)

**Auto-deploy:** Enabled on push to `main`

**Manual redeploy:** Vercel Dashboard → Deployments → ⋮ → Redeploy

---

## 📞 Contact

- **Business:** Medical Billing Miami Beach
- **Email:** Jasmel@medicalbillingmb.com
- **Phone:** +1 786-643-2099
- **WhatsApp:** +1 786-643-2099

---

## License

Private — All rights reserved.
