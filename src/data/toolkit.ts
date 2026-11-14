// The toolkit list on the home page. Each row lights up a picture of where it was used, a different one per row.
// `shot` must be a key in the `shots` map in src/components/Toolkit.astro.
export type Shot = 'afgHome' | 'btaInbox' | 'renewlyDashboard' | 'dsbContact' | 'security' | 'btaDebrief';
export type Tool = { name: string; detail: string; shot: Shot };

export const toolkit: Tool[] = [
  {
    name: 'Astro',
    detail: "Static pages built from data: the field guide's ten guides and 50 sources, and DSB's services, reviews and FAQs. This portfolio too.",
    shot: 'afgHome',
  },
  {
    name: 'TypeScript',
    detail: 'Typed site data and components, so facts live in one file and the build catches mistakes.',
    shot: 'btaInbox',
  },
  {
    name: 'Next.js & Supabase',
    detail: 'App Router, Postgres with Row Level Security, and TanStack Query for server state.',
    shot: 'renewlyDashboard',
  },
  {
    name: 'React',
    detail: 'Interactive parts only where needed: the quote form, the filterable gallery, the dashboard.',
    shot: 'dsbContact',
  },
  {
    name: 'Web security',
    detail: 'An enforced Content Security Policy, security headers, and a form with a honeypot, time trap and length limits.',
    shot: 'security',
  },
  {
    name: 'Cyber security',
    detail: 'Google Cybersecurity Certificate, Nov 2026: SIEM tools, Linux, SQL and Python automation. Now on TryHackMe, alongside my BSc.',
    shot: 'btaDebrief',
  },
];
