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
    detail: 'TODO(musa): one line on what you built on Renewly and with whom.',
    href: '/projects/renewly',
  },
];

export const education: Entry[] = [
  {
    when: 'TODO(musa)',
    title: 'TODO(musa): course name',
    where: 'TODO(musa): university',
    detail: 'TODO(musa): relevant modules, e.g. object-oriented programming in Java, databases, networks.',
  },
];
