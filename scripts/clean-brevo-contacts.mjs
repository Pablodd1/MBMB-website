import https from 'node:https';
import fs from 'node:fs';
import path from 'node:path';

const env = fs.readFileSync(path.resolve(process.cwd(), '.env.local'), 'utf8');
const key = env.match(/BREVO_API_KEY=(.+)/)[1].trim();

function brevoReq(method, reqPath, body = null) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: 'api.brevo.com',
        path: reqPath,
        method,
        family: 4,
        headers: {
          'api-key': key,
          Accept: 'application/json',
          ...(payload ? { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => {
          let parsed = data;
          try {
            parsed = data ? JSON.parse(data) : null;
          } catch {}
          resolve({ status: res.statusCode, data: parsed });
        });
      }
    );
    req.on('error', reject);
    if (payload) req.write(payload);
    req.end();
  });
}

async function run() {
  const report = JSON.parse(fs.readFileSync('scripts/brevo-audit-report.json', 'utf8'));
  const toDelete = [
    ...report.fakePlaceholders.map((x) => ({ id: x.id, label: x.email })),
    ...report.blacklistedAndBouncedEmails.map((x) => ({ id: x.id, label: x.email })),
  ];

  console.log(`Deleting ${toDelete.length} invalid/placeholder/hard-bounced contacts...`);

  let deletedCount = 0;
  let failedCount = 0;

  // Run 3 at a time with 350ms pause to respect Brevo's 10 req/sec rate limit
  const batchSize = 3;
  for (let i = 0; i < toDelete.length; i += batchSize) {
    const batch = toDelete.slice(i, i + batchSize);
    await Promise.all(
      batch.map(async (item) => {
        let res = await brevoReq('DELETE', `/v3/contacts/${encodeURIComponent(String(item.id))}`);
        if (res.status === 429) {
          await new Promise((r) => setTimeout(r, 1200));
          res = await brevoReq('DELETE', `/v3/contacts/${encodeURIComponent(String(item.id))}`);
        }
        if (res.status === 204 || res.status === 200 || res.status === 404) {
          deletedCount++;
        } else {
          failedCount++;
          console.log(`  WARN deleting ID ${item.id} (${item.label}): HTTP ${res.status}`, res.data);
        }
      })
    );
    await new Promise((r) => setTimeout(r, 350));
    if ((i + batchSize) % 60 === 0 || i + batchSize >= toDelete.length) {
      console.log(`  Progress: ${Math.min(i + batchSize, toDelete.length)} / ${toDelete.length} (deleted=${deletedCount}, failed=${failedCount})`);
    }
  }

  // Also check if any contacts in List #2 are NOT in List #29 before removing them from List #2
  console.log('\nChecking List #2 ("Your first list") vs List #29 ("MBMB MIAMI")...');
  let allRemaining = [];
  let offset = 0;
  while (true) {
    const page = await brevoReq('GET', `/v3/contacts?limit=1000&offset=${offset}`);
    const contacts = page.data?.contacts || [];
    if (contacts.length === 0) break;
    allRemaining.push(...contacts);
    offset += contacts.length;
    if (contacts.length < 1000) break;
  }

  const inList2 = allRemaining.filter((c) => (c.listIds || []).includes(2));
  const inList2Only = inList2.filter((c) => !(c.listIds || []).includes(29));
  console.log(`Contacts remaining after bounce cleanup: ${allRemaining.length}`);
  console.log(`Contacts in List #2: ${inList2.length} (in List #2 ONLY and not #29: ${inList2Only.length})`);

  if (inList2Only.length > 0) {
    const emailsToAdd29 = inList2Only.map((c) => c.email).filter(Boolean);
    if (emailsToAdd29.length > 0) {
      console.log(`Adding ${emailsToAdd29.length} unique contacts from List #2 into List #29 ("MBMB MIAMI")...`);
      await brevoReq('POST', '/v3/contacts/lists/29/contacts/add', { emails: emailsToAdd29 });
    }
  }

  // Empty List #2 so there are no duplicate sends between #2 and #29
  if (inList2.length > 0) {
    console.log('Emptying duplicate contacts from List #2 ("Your first list") so all MBMB contacts live cleanly in List #29...');
    const removeRes = await brevoReq('POST', '/v3/contacts/lists/2/contacts/remove', { all: true });
    console.log('  List #2 remove all response:', removeRes.status, removeRes.data);
  }

  // Consolidate "MBMB6 scrap" (#19) into "MBMB6" (#24) and empty #19
  const inList19 = allRemaining.filter((c) => (c.listIds || []).includes(19));
  const inList19Only = inList19.filter((c) => !(c.listIds || []).includes(24));
  console.log(`Contacts in List #19 ("MBMB6 scrap"): ${inList19.length} (not yet in #24: ${inList19Only.length})`);
  if (inList19Only.length > 0) {
    const emailsToAdd24 = inList19Only.map((c) => c.email).filter(Boolean);
    if (emailsToAdd24.length > 0) {
      await brevoReq('POST', '/v3/contacts/lists/24/contacts/add', { emails: emailsToAdd24 });
    }
  }
  if (inList19.length > 0) {
    console.log('Emptying duplicate contacts from List #19 ("MBMB6 scrap")...');
    await brevoReq('POST', '/v3/contacts/lists/19/contacts/remove', { all: true });
  }

  // Also consolidate lowercase "mbmb3" (#13) into "MBMB3" (#10) if overlapping
  const inList13 = allRemaining.filter((c) => (c.listIds || []).includes(13));
  const inList13NotIn29 = inList13.filter((c) => !(c.listIds || []).includes(29));
  console.log(`Contacts in List #13 ("mbmb3"): ${inList13.length} (not yet in #29: ${inList13NotIn29.length})`);

  // Print final clean list summary
  const listsAfter = await brevoReq('GET', '/v3/contacts/lists?limit=50');
  console.log('\n=== Final Clean Brevo Lists ===');
  for (const l of listsAfter.data?.lists || []) {
    if ((l.uniqueSubscribers || l.totalSubscribers || 0) > 0) {
      console.log(`- List #${l.id} "${l.name}": ${l.uniqueSubscribers} clean subscribers (Blacklisted: ${l.totalBlacklisted})`);
    }
  }
}

run().catch(console.error);
