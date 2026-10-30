// The Journey section on the home page. Oldest first, ordered by GitHub creation date.
// To add a node, see workflows/add-journey-node.md. Nothing here may overclaim: roles are
// stated, and every "learned" line is Musa's own words (TODO(musa) until written).
import type { ImageMetadata } from 'astro';
import prayer from '../assets/journey/prayer.jpg';
import newsflux from '../assets/journey/newsflux.jpg';
import hussein from '../assets/journey/hussein.jpg';
import placeholder from '../assets/journey/placeholder.svg';
import renewly from '../assets/projects/renewly-dashboard.jpg';
import dsb from '../assets/projects/dsb-home-desktop.jpg';

export type Node = {
  id: string;
  date: string;        // shown on the line, e.g. "Nov 2025"
  title: string;
  role: string;        // "My own", "Team project", ...
  stack: string[];     // skills this node adds to the running list
  learned: string;     // one honest line, in Musa's words
  image: ImageMetadata;
  alt: string;
  host: string;        // label in the browser-frame bar
  href?: string;       // live site, case study or repo
  polish: 0 | 1 | 2 | 3; // how rough the screenshot looks: 0 roughest ... 3 full colour
  hue: string;         // the project's own signature colour; lights the line, dot and year
};

export const nodes: Node[] = [
  {
    id: 'islamic-tools-hub',
    date: 'Nov 2025',
    title: 'Islamic Tools Hub',
    role: 'My own', // TODO(musa): confirm
    stack: ['HTML', 'CSS', 'JavaScript', 'React', 'REST APIs'],
    learned: 'TODO(musa): what the very first build taught you.',
    image: prayer,
    alt: 'Islamic Tools Hub home page: lanterns and a crescent moon behind four buttons for Prayer Times, Tasbeeh Counter, Random Hadith and Islamic Quiz.',
    host: 'Practice_prayer_api · local run',
    href: 'https://github.com/Musaburke/Practice_prayer_api',
    polish: 0,
    hue: '#f2a65a', // lantern orange
  },
  {
    id: 'news-flux',
    date: 'Nov 2025',
    title: 'News Flux',
    role: 'Team project', // TODO(musa): confirm your part; repo is srahman14/news-flux
    stack: ['Python', 'Flask', 'Vite', 'API design'],
    learned: 'TODO(musa): what working on a Flask and React app taught you.',
    image: newsflux,
    alt: 'News Flux daily dashboard: weather forecast for Berlin, top currencies, top five cryptocurrencies and top headlines.',
    host: 'news-flux-krxg.onrender.com',
    href: 'https://news-flux-krxg.onrender.com/',
    polish: 1,
    hue: '#4fd18b', // News Flux green
  },
  {
    id: 'hussein',
    date: 'Dec 2025',
    title: 'Prof. Dr G. Hussein website',
    role: 'My own', // TODO(musa): confirm
    stack: ['GitHub Pages'],
    learned: 'TODO(musa): what building a site for someone else taught you.',
    image: hussein,
    alt: 'Home page of the Prof. Dr G. Hussein website.',
    host: 'musaburke.github.io',
    href: 'https://musaburke.github.io/Prof.-Dr-G.-Hussein-Website/',
    polish: 1,
    hue: '#5cc8d6', // site teal
  },
  {
    id: 'renewly',
    date: 'Jul 2026',
    title: 'Renewly',
    role: 'Team project', // TODO(musa): confirm your part
    stack: ['TypeScript', 'Next.js', 'Supabase', 'TanStack Query'],
    learned: 'TODO(musa): what the date logic and database rules taught you.',
    image: renewly,
    alt: 'Renewly dashboard with sample data: seven tracked contracts and the three closest last-safe-cancel dates.',
    host: 'Renewly · sample data',
    href: '/projects/renewly',
    polish: 2,
    hue: '#7fa7ff', // Renewly navy, lifted
  },
  {
    id: 'dsb',
    date: 'Oct 2026',
    title: 'DSB Commercial Cleaning',
    role: 'Sole developer, real client',
    stack: ['Astro', 'Tailwind CSS', 'Cloudflare', 'Security headers'],
    learned: 'TODO(musa): what shipping for a real client taught you.',
    image: dsb,
    alt: 'DSB Commercial Cleaning home page, black and gold, with a close-up of a freshly cleaned carpet.',
    host: 'dsbcommercialcleaning.co.uk',
    href: '/projects/dsb-cleaning',
    polish: 3,
    hue: '#e9c46a', // DSB gold
  },
];

// Used when a screenshot is missing: swap `image` for this and keep a truthful `alt`.
export const missingShot = placeholder;

export const future = {
  hue: '#9fd09c', // the site's own accent
  date: 'Next',
  title: 'Security',
  text: 'TODO(musa): what you are studying in cyber security right now, and what you want to build next.',
};
