# Medical Billing Miami Beach (MBMB) — Agent Rules & Growth Stack

## 1. Brand & Social Media Automation (`scripts/buffer-marketing.mjs`)
- **Visual Style:** Always use **Style 2 — Executive FinTech Data & ROI Scorecard Infographic** (Dark Navy `#0A1628`, Emerald `#10B981`, Gold `#F59E0B`, footer `medicalbillingmb.com | (786) 643-2099`).
- **Cadence:** Schedule **once a week** (Mondays) on Instagram (`69e40fcc031bfa423c1bba9b`) and LinkedIn (`69e40c02031bfa423c1ba626`) via Buffer MCP.
- **Copywriting:** Run LinkedIn and Instagram drafts through `.agents/skills/linkedin-post-writer/SKILL.md` and `.agents/skills/linkedin-humanizer/SKILL.md` so posts sound human, authoritative, and free of generic AI filler.

## 2. Installed Workspace Skills (`.agents/skills/`)
- **LinkedIn Growth Suite (12 skills from `sergebulaev/linkedin-skills`):**
  `linkedin-post-writer`, `linkedin-humanizer`, `linkedin-hook-extractor`, `linkedin-content-planner`, `linkedin-comment-drafter`, `linkedin-reply-handler`, `linkedin-repurposer`, `linkedin-profile-optimizer`, `linkedin-interviewer`, `linkedin-engager-analytics`, `linkedin-employee-advocacy`, `linkedin-thread-monitor`.
- **OpenSEO Suite (7 skills from `every-app/open-seo`):**
  `local-seo`, `seo-audit`, `keyword-research`, `keyword-clustering`, `competitor-analysis`, `ai-visibility-audit`, `link-prospecting`.
- **Agency Specialists (`msitarzewski/agency-agents`):**
  `agency-specialists` (10 curated marketing, AEO, carousel, and B2B outbound playbooks).
- **MBMB Growth Engine:**
  `mbmb-growth-engine` (Buffer + Brevo + Local Lead Enrichment workflow).

## 3. Email & Form Security
- Keep Brevo automated drip campaigns paused (`\MBMB_Brevo_Daily_Drip_300` disabled) until requested.
- Maintain the 4-layer anti-bot spam shield in `UTILS/email.js` (`isBotOrSpamSubmission`) on `/my-api/consultations` and `/my-api/contact`.
