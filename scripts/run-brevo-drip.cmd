@echo off
cd /d "C:\Users\jasme\.gemini\antigravity\scratch\MBMB-website"
node scripts\send-brevo-campaign.mjs --resume >> "C:\Users\jasme\.gemini\antigravity\scratch\MBMB-website\scripts\brevo-drip.log" 2>&1
