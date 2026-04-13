# MBMB Brevo Email Campaign Setup Guide

This guide provides step-by-step instructions for setting up MBMB's email drip campaigns in Brevo (formerly Sendinblue).

## Overview

MBMB has three email sequences ready for import:

| Sequence | Emails | Duration | Purpose |
|----------|--------|----------|---------|
| Welcome Sequence | 3 | 7 days | New subscriber onboarding |
| Lead Nurture Sequence | 5 | 30 days | Doctors inquiring about billing |
| Re-engagement Sequence | 3 | 14 days | Cold leads (60+ days inactive) |

---

## Step 1: Import Contacts into Brevo

### Option A: Manual CSV Import

1. **Navigate to Contacts**
   - Go to Brevo Dashboard → Click "Contacts" in left sidebar
   - Click "Import contacts" button

2. **Upload CSV File**
   - Click "Upload a file" and select your contact CSV
   - CSV should include: `email`, `first_name`, `last_name`, `phone`, `company`, `specialty`

3. **Map Fields**
   - Map CSV columns to Brevo attributes
   - Required: `email` (identifier)
   - Recommended: `first_name`, `last_name`, `SPECIALTY`, `CITY`

4. **Create Lists During Import**
   - Check "Create new list"
   - Create these lists:
     - `MBMB - New Subscribers` (for Welcome sequence)
     - `MBMB - Leads` (for Nurture sequence)
     - `MBMB - Cold Leads` (for Re-engagement sequence)

5. **Complete Import**
   - Review and confirm import
   - Brevo will send confirmation email

### Option B: Existing Contacts Segmentation

If contacts already exist in Brevo:

1. Go to "Contacts" → "Segments"
2. Click "Create segment"
3. Create segments:
   - **MBMB New Subscribers**: `/optin_date` within last 7 days AND `list = MBMB`
   - **MBMB Leads**: `tag = lead-nurture` AND `email_status = active`
   - **MBMB Cold Leads**: `last_activity < 60 days ago` AND `tag = reengagement`

---

## Step 2: Create Contact Lists (Alternative Method)

1. Go to "Contacts" → "Lists"
2. Click "Create a new list"
3. Create the following lists:
   - `MBMB - Welcome Sequence`
   - `MBMB - Lead Nurture`
   - `MBMB - Re-engagement`

---

## Step 3: Create Email Templates

### Method A: Create from JSON (Recommended)

1. Go to "Campaigns" → "Emails" → "Create an email"
2. Select "Drag & Drop Editor" or "Design your own HTML"
3. For each email in the JSON files:
   - Copy the `html_content` field from the JSON
   - Paste into Brevo's HTML editor
   - Save as template with naming convention: `MBMB - [Sequence Name] - Email [N]`

### Method B: Using Design Editor

1. Create new email → Select template type
2. Use MBMB branding:
   - Primary color: `#0077b6` (blue)
   - Secondary color: `#00b4d8` (cyan)
   - Font: Segoe UI, Tahoma, sans-serif
   - Logo: Upload from medicalbillingmb.com
3. Replace merge tags:
   - `{{first_name}}` → Brevo `FIRSTNAME`
   - `{{last_name}}` → Brevo `LASTNAME`
   - `{{unsubscribe}}` → Brevo automatic (handled by Brevo)

---

## Step 4: Create Automation Workflows

### Welcome Sequence Setup

1. Go to "Automation" → "Create automation"
2. Select "Marketing automation"
3. Name: `MBMB Welcome Sequence`
4. Set trigger: "Contact added to list" → `MBMB - Welcome Sequence`
5. Add actions:
   ```
   [START] → When added to list "MBMB - Welcome Sequence"
   
   [EMAIL 1] → Wait 0 days → Send "MBMB - Welcome - Email 1"
   
   [EMAIL 2] → Wait 3 days → Send "MBMB - Welcome - Email 2"
   
   [EMAIL 3] → Wait 7 days → Send "MBMB - Welcome - Email 3"
   
   [END]
   ```

### Lead Nurture Sequence Setup

1. Create new automation
2. Name: `MBMB Lead Nurture Sequence`
3. Set trigger: "Contact added to list" → `MBMB - Lead Nurture`
4. Add actions:
   ```
   [START] → When added to list "MBMB - Lead Nurture"
   
   [EMAIL 1] → Wait 0 days → Send "MBMB - Nurture - Email 1"
   
   [EMAIL 2] → Wait 5 days → Send "MBMB - Nurture - Email 2"
   
   [EMAIL 3] → Wait 12 days → Send "MBMB - Nurture - Email 3"
   
   [EMAIL 4] → Wait 20 days → Send "MBMB - Nurture - Email 4"
   
   [EMAIL 5] → Wait 30 days → Send "MBMB - Nurture - Email 5"
   
   [END]
   ```

### Re-engagement Sequence Setup

1. Create new automation
2. Name: `MBMB Re-engagement Sequence`
3. Set trigger: "Contact added to list" → `MBMB - Re-engagement`
4. Add actions:
   ```
   [START] → When added to list "MBMB - Re-engagement"
   
   [EMAIL 1] → Wait 0 days → Send "MBMB - Reengagement - Email 1"
   
   [EMAIL 2] → Wait 7 days → Send "MBMB - Reengagement - Email 2"
   
   [EMAIL 3] → Wait 14 days → Send "MBMB - Reengagement - Email 3"
   
   [END]
   ```

---

## Step 5: Configure Sender Settings

For each email template, ensure these settings:

| Setting | Value |
|---------|-------|
| Sender Name | Medical Billing Miami Beach |
| Sender Email | Jasmel@medicalbillingmb.com |
| Reply-to | Jasmel@medicalbillingmb.com |
| Subject Line | Use subject from JSON files |
| Preheader | Use preheader from JSON files |

---

## Step 6: Add UTM Tracking (Optional)

To track email performance in Google Analytics:

1. In Brevo email editor, add link tracking parameters
2. Append to all CTAs:
   ```
   ?utm_source=brevo&utm_medium=email&utm_campaign=[sequence-name]
   ```
   Example:
   ```
   https://medicalbillingmb.com/free-billing-audit?utm_source=brevo&utm_medium=email&utm_campaign=welcome-sequence
   ```

---

## Step 7: Test the Sequences

### Test with Your Email

1. Create a test contact in Brevo
2. Add test contact to each list temporarily
3. Verify emails arrive with correct content and timing

### Checklist Before Launch

- [ ] All 3 emails in Welcome Sequence created and saved
- [ ] All 5 emails in Nurture Sequence created and saved
- [ ] All 3 emails in Re-engagement Sequence created and saved
- [ ] Welcome automation created and activated
- [ ] Nurture automation created and activated
- [ ] Re-engagement automation created and activated
- [ ] Sender settings configured
- [ ] UTM parameters added to all links
- [ ] Test emails sent and verified
- [ ] Unsubscribe links working

---

## Step 8: Activate and Monitor

### Activating Automations

1. Go to "Automation" → Find your automation
2. Toggle "Active/Inactive" switch to Active
3. Set to "Always active" for continuous lead flow

### Monitoring Performance

Key metrics to track weekly:

| Metric | Welcome | Nurture | Re-engagement |
|--------|---------|---------|---------------|
| Open Rate | 30%+ | 25%+ | 20%+ |
| Click Rate | 5%+ | 4%+ | 3%+ |
| Unsubscribe Rate | <0.5% | <0.5% | <1% |

### Brevo Reports Location

- Go to "Campaigns" → "Reports"
- Filter by campaign name/tag: `MBMB`
- Review: Delivery rate, Open rate, Click rate, Unsubscribes

---

## API Integration (Optional)

If using Brevo API to manage contacts programmatically:

### Base URL
```
https://api.brevo.com/v3
```

### Authentication
```bash
curl -H "api-key: YOUR_BREVO_API_KEY" \
     -H "Content-Type: application/json" \
     https://api.brevo.com/v3/contacts
```

### Key API Endpoints

| Endpoint | Purpose |
|----------|---------|
| `POST /contacts` | Create/update contact |
| `POST /contacts/lists/{listId}/contacts` | Add contact to list |
| `POST /emailCampaigns` | Create email campaign |
| `GET /emailCampaigns` | List campaigns |
| `PUT /emailCampaigns/{id}` | Update campaign |

### Add Contact to Welcome Sequence via API

```bash
curl -X POST \
  -H "api-key: YOUR_BREVO_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "doctor@example.com",
    "firstName": "John",
    "lastName": "Martinez",
    "attributes": {
      "SPECIALTY": "Cardiology",
      "CITY": "Miami"
    },
    "listIds": [2],
    "tags": ["welcome-sequence"]
  }' \
  "https://api.brevo.com/v3/contacts"
```

---

## Troubleshooting

### Emails Not Sending
- Check automation is set to "Active"
- Verify contact is in correct list
- Check contact email status is not "blocked"

### Merge Tags Not Working
- Ensure attribute names match exactly in Brevo
- Use Brevo's test send feature to preview with sample data

### High Unsubscribes
- Check email frequency isn't too aggressive
- Ensure content provides value first
- Review targeting criteria

---

## Files Reference

| File | Location | Contents |
|------|----------|----------|
| `welcome-sequence.json` | `/MARKETING/email-campaigns/` | 3 welcome emails |
| `nurture-sequence.json` | `/MARKETING/email-campaigns/` | 5 lead nurture emails |
| `reengagement-sequence.json` | `/MARKETING/email-campaigns/` | 3 re-engagement emails |
| `brevo-setup-guide.md` | `/MARKETING/email-campaigns/` | This setup guide |

---

## Contact

For questions about this setup guide:
- **Email**: Jasmel@medicalbillingmb.com
- **Phone**: (786) 643-2099
- **Website**: medicalbillingmb.com

---

*Last updated: April 2026*
