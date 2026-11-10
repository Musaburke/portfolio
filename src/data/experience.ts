import type { ImageMetadata } from 'astro';
import googleCyber from '../assets/certs/google-cybersecurity.jpg';
// Timeline on /about. Newest first. Only real entries; gaps are TODO(musa).
export type Entry = { when: string; title: string; where: string; detail: string; href?: string };

export const experience: Entry[] = [
  {
    when: 'Oct 2026',
    title: 'Freelance web developer',
    where: 'DSB Commercial Cleaning Services',
    detail:
      'Designed, built and launched the company website on Cloudflare: quote form, coverage map, gallery, reviews and an enforced Content Security Policy.',
    href: '/projects/dsb-cleaning',
  },
  {
    when: '2026',
    title: 'Developer, Renewly',
    where: 'Team project',
    detail: 'Built with a friend: the dashboard and whole design, the contract logic, database rules, email 2FA, account deletion, and teams with owner and member permissions.',
    href: '/projects/renewly',
  },
];

export const education: Entry[] = [
  {
    when: 'Year 2',
    title: 'BSc Computer Science',
    where: 'City, University of London',
    detail: 'Aiming for a career in cyber security. Earned the Google Cybersecurity Certificate alongside it, and now working through TryHackMe.',
  },
];

// Certificates on /about (and the home About facts). Newest first.
export type Cert = {
  when: string;
  title: string;
  issuer: string;
  topics: string[];   // what it covered, shown as one line
  detail: string;     // what Musa took from it, in his words
  verify?: string;    // the issuer's public verification page
  image?: ImageMetadata;
  alt?: string;
};

export const certifications: Cert[] = [
  {
    when: 'Nov 2026',
    title: 'Google Cybersecurity Certificate',
    issuer: 'Google, on Coursera',
    topics: ['SIEM tools', 'Intrusion detection', 'Linux', 'SQL', 'Python automation', 'Network security', 'Incident response'],
    detail:
      'Nine courses on how a security team works day to day. I searched logs in a SIEM to find suspicious activity, got comfortable in the Linux command line, wrote SQL queries to pull out security data and wrote Python scripts to automate the repetitive checks. It also covered how networks get attacked, managing risk with frameworks like NIST, and handling an incident from the first alert to closing it.',
    verify: 'https://coursera.org/verify/professional-cert/4DNGSYGO1PEL',
    image: googleCyber,
    alt: 'Google Cybersecurity Professional Certificate awarded to Musa Ibraheem Burke on 5 November 2026, listing its nine courses, from Foundations of Cybersecurity to Automate Cybersecurity Tasks with Python.',
  },
];
