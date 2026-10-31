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
    detail: 'Aiming for a career in cyber security. Learning on the side: TryHackMe and the Google Cybersecurity Certificate.',
  },
];
