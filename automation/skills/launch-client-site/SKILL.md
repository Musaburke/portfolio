---
name: launch-client-site
description: Take a client's static site from finished build to handover, covering owner actions, legal gaps and pre-ship checks. Use before launching or handing over a site built for someone else.
---

# Launch a client site

Evidence: `DBS-cleaning/OWNER-NOTES.md` records the owner actions from one client site, `DBS-cleaning/newsite.sh` scripts skill setup for new sites, and `portfolio/workflows/pre-ship.md` is the check list. Only one client site exists so far, so treat this as a first draft and correct it on the second.

This is not legal advice. Flag legal points for the owner and suggest a solicitor or Citizens Advice.

1. Keep an `OWNER-NOTES.md` that is never published. Tag items `FIXME (legal)`, `TODO (security)`, `TODO` or `NOTE`. Markdown comments reach page source, so notes never live in content files.
2. Ask the owner about what the site must show: for a UK Ltd, company number and registered office; privacy retention promises they must really keep; consumer cancellation notices; data protection fee.
3. Keep private details out of the site: home addresses, certificates showing names or addresses, insurer names.
4. Claim only what the owner confirmed. Check accreditations on the official register and logo rules before use. Record expiry dates for anything displayed.
5. Check third-party links show the client's own name. Lock down form keys and turn on spam protection.
6. Run `workflows/pre-ship.md`: check, real domain in config, screenshots of every route, keyboard pass, Lighthouse, SEO audit.
7. Deploying and going public is the owner's or Musa's decision. Ask first.
