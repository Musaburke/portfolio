#!/usr/bin/env node
// Checks that every inline script in dist/ is allowed by a sha256 hash in the CSP in public/_headers.
// Run after a build. Prints the hash to add if one is missing, and exits 1.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { createHash } from 'node:crypto';

const csp = readFileSync('public/_headers', 'utf8').match(/Content-Security-Policy: (.*)/)?.[1] ?? '';
const allowed = new Set([...csp.matchAll(/'sha256-([^']+)'/g)].map((m) => m[1]));
const pages = [];
(function walk(dir) {
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    if (statSync(p).isDirectory()) walk(p);
    else if (p.endsWith('.html')) pages.push(p);
  }
})('dist');

const missing = new Map();
for (const page of pages) {
  for (const [, attrs, body] of readFileSync(page, 'utf8').matchAll(/<script([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (/\bsrc=|application\/ld\+json/.test(attrs)) continue; // external files and data blocks need no hash
    const hash = createHash('sha256').update(body).digest('base64');
    if (!allowed.has(hash)) missing.set(hash, page);
  }
}
if (missing.size) {
  for (const [hash, page] of missing) console.log(`Inline script in ${page} is not in the CSP. Add 'sha256-${hash}' to script-src in public/_headers.`);
  process.exit(1);
}
console.log(`CSP: every inline script in ${pages.length} pages is hashed.`);
