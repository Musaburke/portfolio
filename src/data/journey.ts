// The Journey section on the home page. Oldest first, ordered by GitHub creation date.
// To add a node, see workflows/add-journey-node.md. Nothing here may overclaim: roles are
// stated, and every "learned" and "story" line comes from Musa's own account.
import type { ImageMetadata } from 'astro';
import prayer from '../assets/journey/prayer.jpg';
import prayerTimes from '../assets/journey/prayer-times.jpg';
import newsflux from '../assets/journey/newsflux.jpg';
import newsfluxWeather from '../assets/journey/newsflux-weather.jpg';
import hussein from '../assets/journey/hussein.jpg';
import husseinServices from '../assets/journey/hussein-services.jpg';
import placeholder from '../assets/journey/placeholder.svg';
import renewly from '../assets/projects/renewly-dashboard.jpg';
import renewlyMembers from '../assets/projects/renewly-members.jpg';
import dsb from '../assets/projects/dsb-home-desktop.jpg';
import dsbAreas from '../assets/projects/dsb-areas.jpg';
import afg from '../assets/projects/afg-home.jpg';
import afgSources from '../assets/projects/afg-sources.jpg';
import bta from '../assets/projects/bta-play.jpg';
import btaDebrief from '../assets/projects/bta-debrief.jpg';

export type Node = {
  id: string;
  date: string;        // shown on the line, e.g. "Nov 2025"
  title: string;
  role: string;        // "My own", "Team project", ...
  stack: string[];     // skills this node adds to the running list
  learned: string;     // the key takeaway, short enough for the Journey card
  story: string[];     // the longer version, shown on /journey
  more?: { image: ImageMetadata; alt: string }; // a second screenshot on /journey
  image: ImageMetadata;
  alt: string;
  host: string;        // label in the browser-frame bar
  href?: string;       // live site, case study or repo
  polish: 0 | 1 | 2 | 3; // how rough the screenshot looks: 0 roughest ... 3 full colour
  hue: string;         // the project's own signature colour; lights the line, dot and year
  home?: boolean;      // one of the (at most five) picks on the home page; every node shows on /journey
  draft?: boolean;     // hidden everywhere until its words are in
};

export const nodes: Node[] = [
  {
    id: 'islamic-tools-hub',
    date: 'Nov 2025',
    title: 'Islamic Tools Hub',
    role: 'My own',
    stack: ['HTML', 'CSS', 'REST APIs'],
    learned: 'This taught me the very basics: what an API key is, how it works and how to use one.',
    story: [
      "This was my first real try at building something with an API. It was very low level, it wasn't technical and it didn't look good at all.",
      'It did teach me the very basics of what an API key is and how it works. Seeing that work is what made me want to build more.',
    ],
    more: { image: prayerTimes, alt: 'Prayer Times page of Islamic Tools Hub: city, country and calculation method fields above a Get Prayer Times button.' },
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
    role: 'Team project',
    stack: ['JavaScript', 'React', 'Tailwind CSS', 'Vite', 'Flask', 'Postman', 'Git'],
    learned: 'How to work with a collaborator: committing, pushing and building one site together. Also my first proper go at React.',
    story: [
      'News Flux is a news aggregator I built with a friend. He made the news page. I made the weather, currency, NASA and crypto pages and designed the site.',
      'It taught me how to work with a collaborator, and how to commit and push. I got much more practice with API keys, which gave me trouble at first, and picked up better design techniques from templates and classes I found online and on GitHub.',
      'It was the first project where I properly used JavaScript in a website, along with Tailwind, React, Vite and Flask, and the first time I tested with Postman. It still had plenty of issues, but it was the first thing I made that I thought looked good.',
    ],
    more: { image: newsfluxWeather, alt: 'News Flux weather page showing a five-day forecast for London.' },
    image: newsflux,
    alt: 'News Flux daily dashboard: a five-day weather forecast for Madrid, top currencies and the top five cryptocurrencies.',
    host: 'news-flux-krxg.onrender.com',
    href: 'https://news-flux-krxg.onrender.com/',
    polish: 1,
    hue: '#4fd18b', // News Flux green
  },
  {
    id: 'hussein',
    home: true,
    date: 'Dec 2025',
    title: 'Prof. Dr G. Hussein website',
    role: 'My own',
    stack: ['Web forms', 'CAPTCHA', 'GitHub Pages'],
    learned: "If communication with a client isn't done right, the build drags on. And reuse matters: I wrote hundreds of near-identical lines of HTML.",
    story: [
      'I made this site for a professor to document his work, achievements and history. It was my first bigger solo project, and it showed.',
      "The main thing I learnt is how important it is to communicate with a client. I didn't do it well, and that made the build extremely long and dragged out.",
      'I also learnt the value of reusability. I built it almost entirely in HTML and some CSS, which meant hundreds of similar, redundant lines. Libraries would have made it far easier. It was also my first time with web forms, email routing, CAPTCHA, a navbar and 15+ blog posts with templates I designed myself. Not all of it went perfectly, but I got it running and I was really proud of it.',
    ],
    more: { image: husseinServices, alt: 'Services page of the Prof. Dr G. Hussein website: six cards of therapeutic, supervision and research services on a teal background.' },
    image: hussein,
    alt: 'Publications page of the Prof. Dr G. Hussein website: cards for books, journals and blogs above gradient buttons for browsing books by year.',
    host: 'musaburke.github.io',
    href: 'https://musaburke.github.io/Prof.-Dr-G.-Hussein-Website/',
    polish: 1,
    hue: '#5cc8d6', // site teal
  },
  {
    id: 'renewly',
    home: true,
    date: 'Jul 2026',
    title: 'Renewly',
    role: 'Team project',
    stack: ['TypeScript', 'Next.js', 'Supabase', 'SQL', 'Zustand'],
    learned: 'Working with a database and real users means security comes first: who can see what, and what the frontend never gets to touch.',
    story: [
      'Renewly was my first big collaborative project and my first time working with a database, a login system and a user base. If it went wrong it could cause real damage, and that changed how I think. We also planned the flow and tools first, instead of just coding with no direction.',
      "Most of what I learnt was about protecting data. I used SQL and Supabase to manage the database and set its rules, stopped people reaching other accounts' data by changing the URL, and kept the backend hidden from the frontend.",
      "It also showed me how much communication with a collaborator matters, and how important file and variable naming gets across a huge number of files. I lost progress more than once to bad Git habits I thought didn't matter, which is how I learnt to take branches and rebasing seriously.",
    ],
    more: { image: renewlyMembers, alt: 'Renewly members page with sample data: an owner, two admins and members in an invented team, with a form to invite someone.' },
    image: renewly,
    alt: 'Renewly dashboard with sample data: ten tracked contracts, £1,923 monthly spend and the three closest last-safe-cancel dates.',
    host: 'Renewly · sample data',
    href: '/projects/renewly',
    polish: 2,
    hue: '#7fa7ff', // Renewly navy, lifted
  },
  {
    id: 'dsb',
    home: true,
    date: 'Oct 2026',
    title: 'DSB Commercial Cleaning',
    role: 'Sole developer, real client',
    stack: ['Astro', 'Cloudflare', 'Web3Forms', 'Security headers'],
    learned: 'Everything came together here. I also learnt to use AI properly: as a co-agent that helps me build, teaches me and debugs, with me reviewing all of it.',
    story: [
      'This is where I put everything together, including my past mistakes. I had a full plan and stuck to it. I asked the client all my questions at once instead of waiting, set up scheduled talks and built prototypes for them to react to.',
      "I also learnt how to use AI properly. I treat it as a co-agent: it helps me build, teaches me as I go and helps me debug when I'm stuck, and I review everything it recommends before it goes in. A lot of people use it blindly and their skills get dulled, so I made a point of using it the right way, and it went well.",
      'It was my first time using Web3Forms, getting my own domain through Namecheap, deploying it and connecting it all through Cloudflare, after a lot of tutorials and failed deployments. It was also my first time doing proper security checks: HTTPS enforced with HSTS, a Content Security Policy, security headers and rate limiting. I set up a business email address with SPF and DMARC, used a Cloudflare Worker for email routing around launch, connected Google Search Console, and followed UK rules on handling user data.',
    ],
    more: { image: dsbAreas, alt: 'DSB areas page with London picked on a gold outline map of the five counties covered.' },
    image: dsb,
    alt: 'DSB Commercial Cleaning home page, black and gold, with a close-up of a freshly cleaned carpet.',
    host: 'dsbcommercialcleaning.co.uk',
    href: '/projects/dsb-cleaning',
    polish: 3,
    hue: '#e9c46a', // DSB gold
  },
  {
    id: 'ai-field-guide',
    home: true,
    date: 'Nov 2026',
    title: 'AI field guide',
    role: 'My own',
    stack: ['React', 'Radix', 'Cloudflare Pages'],
    learned: 'Researching it taught me how to get more out of AI myself: a second brain in Obsidian, managing my usage and better prompts.',
    story: [
      'I set out to show how useful AI really is when it is used wisely. While researching it, I ended up learning how to get the most out of AI myself.',
      'I discovered how much a second brain helps: notes in Obsidian that every new chat can start from. I learnt how to properly manage my usage and how to prompt AI better, and I checked every claim against a source, labelling how far I had read each one.',
      'I built the site with Claude, and doing that taught me how to use Claude better, first hand. I turned that experience into guides on the site, like Manage your usage, Give AI a second brain and Build websites with AI, so other people can use what I learnt. It also took six design directions before one felt right.',
    ],
    more: { image: afgSources, alt: 'Sources page of the AI field guide showing how far each of the 50 sources was checked.' },
    image: afg,
    alt: 'AI field guide home page on a pale mint ground, with the headline "Get more out of AI, and stay sharp".',
    host: 'musa-ai-field-guide.pages.dev',
    href: '/projects/ai-field-guide',
    polish: 3,
    hue: '#cbe7c9', // field guide mint
  },
  {
    id: 'break-the-ai',
    home: true,
    date: 'Nov 2026',
    title: 'Break the AI',
    role: 'My own',
    stack: ['Cloudflare Workers', 'D1', 'Workers AI', 'Prompt injection', 'OWASP LLM Top 10'],
    learned: 'An AI only sees text, so "I work here" is just more text. Keeping secrets away from the model beats any prompt.',
    story: [
      'After finishing the Google Cybersecurity Certificate, I wanted to put the attacking side of security into practice. So I built a game where you trick a made-up bank\'s AI chatbots into leaking their secrets, then a debrief explains the fix.',
      'Building the attacks taught me how these models actually fail. Filters only catch what they were built to look for, and a prompt that says "never share it" is not a defence. The game is built so the server decides everything: secrets are worked out per player and never stored, and the shared AI allowance can\'t be drained by one person.',
      'Playing it myself, I got stuck on level 2 and used all three hints. That taught me to test honestly on myself, so I reworked the clues, the hints and the way a blocked message shows up until it felt fair.',
    ],
    more: { image: btaDebrief, alt: 'Level 1 debrief of Break the AI: Level 1 cleared in huge type, the score from 2 messages and 0 hints, then what the attack was.' },
    image: bta,
    alt: 'Level 1 of Break the AI: an email from the bank\'s security lead and the task on the left, and the bank\'s green support chat refusing to share the staff code on the right.',
    host: 'break-the-ai.muburke07.workers.dev',
    href: '/projects/break-the-ai',
    polish: 3,
    hue: '#c6f432', // Break the AI lime
  },
];

// Every node that is ready, oldest first (/journey shows all of these).
export const published = nodes.filter((n) => !n.draft);
// The home page keeps the timeline short: at most five picks, so nobody is stuck scrolling through it.
export const homeNodes = published.filter((n) => n.home).slice(0, 5);

// Used when a screenshot is missing: swap `image` for this and keep a truthful `alt`.
export const missingShot = placeholder;

export const future = {
  hue: '#9fd09c', // the site's own accent
  date: 'Next',
  title: 'Security',
  text: 'Google Cybersecurity Certificate done in Nov 2026. Now working through TryHackMe, with the aim of a career in cyber security.',
};
