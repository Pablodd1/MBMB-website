---
name: mbmb-growth-engine
description: >-
  End-to-end growth, social media (Buffer Style 2 Executive Scorecards),
  local lead prospecting, and Brevo CRM hygiene workflow for Medical Billing
  Miami Beach (medicalbillingmb.com). Use when scheduling weekly social media
  posts, auditing Brevo contacts, or enriching South Florida clinic and law
  firm lead lists.
---

# MBMB Growth Engine & Social Media Automation Skill

## Overview
Coordinates **Medical Billing Miami Beach (`https://medicalbillingmb.com`)** weekly social media publishing, local South Florida lead enrichment, LinkedIn/Instagram copywriting, and Brevo CRM hygiene.

## Dependencies
- `linkedin-post-writer` & `linkedin-humanizer` (`.agents/skills/`): Drafts and refines high-authority B2B healthcare & legal copy without AI clichés.
- `local-seo` & `seo-audit` (`.agents/skills/`): Audits local Miami-Dade, Broward, and Palm Beach search visibility.
- `agency-specialists` (`.agents/skills/agency-specialists/`): Specialist playbooks for carousels, AEO, and B2B offers.
- `buffer` MCP Server: Publishes and schedules posts to Instagram (`@medicalbillingmiami`, ID `69e40fcc031bfa423c1bba9b`) and LinkedIn (`Medical Billing Miami Beach`, ID `69e40c02031bfa423c1ba626`).

## Core Rules & Brand Standards
1. **Visual Style (Style 2 Only):** Every social media image must use **Style 2 — Executive FinTech Data & ROI Scorecard Infographic** (Dark Navy `#0A1628` background, glowing Emerald/Teal `#10B981` and Gold `#F59E0B` comparison cards, crisp data callouts, and footer bar `medicalbillingmb.com | (786) 643-2099`).
2. **Posting Cadence:** Strictly **once a week** (Mondays) across Instagram and LinkedIn.
3. **Production Image Verification:** Always deploy new social graphics to `public/raster/social/`, alias to `medicalbillingmb.com`, and verify `HTTP 200 OK` (`Content-Type: image/jpeg`) before calling Buffer MCP.
4. **Email Campaigns (Brevo):** Keep `\MBMB_Brevo_Daily_Drip_300` paused unless explicitly instructed by the user.

## Utility Scripts
- [`scripts/buffer-marketing.mjs`](../../scripts/buffer-marketing.mjs):
  - `node scripts/buffer-marketing.mjs --status` — Inspect channel health and scheduled queue.
  - `node scripts/buffer-marketing.mjs --weekly-style2` — Clear outdated daily posts and schedule the 5-week Style 2 scorecard rotation.
- [`scripts/clean-brevo-contacts.mjs`](../../scripts/clean-brevo-contacts.mjs):
  - `node scripts/clean-brevo-contacts.mjs` — Remove hard-bounced/blacklisted contacts and consolidate duplicate lists in Brevo.
