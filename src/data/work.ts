// Every project, one entry each, oldest first. This is the only list of work on the site:
// - every entry shows on All work (/projects), newest first;
// - an entry with a `journey` block is a stop on /journey;
// - an entry whose id matches a file in src/content/projects is a case study, and every link to it goes there.
// To add a project, see workflows/add-project.md. Nothing here may overclaim: roles are stated,
// and every "learned" and "story" line comes from Musa's own account.
import type { ImageMetadata } from 'astro';
import prayer from '../assets/journey/prayer.jpg';
import newsflux from '../assets/journey/newsflux.jpg';
import hussein from '../assets/journey/hussein.jpg';
import placeholder from '../assets/journey/placeholder.svg';
import renewly from '../assets/projects/renewly-dashboard.jpg';
import dsb from '../assets/projects/dsb-home-desktop.jpg';
import gallery from '../assets/projects/gallery-home.jpg';
import afg from '../assets/projects/afg-home.jpg';
import bta from '../assets/projects/bta-play.jpg';
import lureHome from '../assets/journey/lure-home.jpg';

export type Work = {
  id: string;          // also the case study's filename (src/content/projects/<id>.mdx), if it has one
  date: string;        // 'YYYY-MM'; entries in the same month keep their order in this list
  title: string;
  role: string;        // "My own", "Team project", ...
  summary: string;     // one line, shown on All work
  stack: string[];     // what it is built with
  image: ImageMetadata;
  alt: string;
  host: string;        // label in the browser-frame bar
  live?: string;
  repo?: string;       // public repos only
  repoNote?: string;   // shown instead of a code link when the repo can't be public
  hue: string;         // the project's own signature colour; lights its Journey stop
  journey?: {          // present = a stop on /journey
    learned: string;   // the key takeaway, short enough for the timeline card
    short: string;     // the one paragraph beside the card on the timeline: what happened, ending on what it taught me (from `story` + `learned`)
    story: string[];   // the full version, shown on the case study ("How it changed me")
    skills?: string[]; // chips this stop adds to the running list (default: stack)
    polish: 0 | 1 | 2 | 3; // how rough the screenshot looks: 0 roughest ... 3 full colour
  };
  draft?: boolean;     // hidden everywhere until its words are in
};

export const work: Work[] = [
  {
    id: 'news-flux',
    date: '2025-11',
    title: 'News Flux',
    role: 'Team project',
    summary: 'A news aggregator built with a friend: they made the news page, I made the weather, currency, NASA and crypto pages and designed the site.',
    stack: ['JavaScript', 'React', 'Tailwind CSS', 'Vite', 'Flask', 'Postman', 'Git'],
    image: newsflux,
    alt: 'News Flux daily dashboard: a five-day weather forecast for Madrid, top currencies and the top five cryptocurrencies.',
    host: 'news-flux-krxg.onrender.com',
    live: 'https://news-flux-krxg.onrender.com/',
    hue: '#4fd18b', // News Flux green
    journey: {
      learned: 'How to work with a collaborator: committing, pushing and building one site together. Also my first proper go at React.',
      // TODO(musa): check the timeline paragraphs (`short`). Each is your own story and learned text joined into one paragraph, nothing added.
      short: "A news aggregator I built with a friend: he made the news page, I made the weather, currency, NASA and crypto pages and designed the site. It taught me how to work with a collaborator, committing, pushing and building one site together, and it was my first proper go at React.",
      story: [
        'News Flux is a news aggregator I built with a friend. He made the news page. I made the weather, currency, NASA and crypto pages and designed the site.',
        'It taught me how to work with a collaborator, and how to commit and push. I got much more practice with API keys, which gave me trouble at first, and picked up better design techniques from templates and classes I found online and on GitHub.',
        'It was the first project where I properly used JavaScript in a website, along with Tailwind, React, Vite and Flask, and the first time I tested with Postman. It still had plenty of issues, but it was the first thing I made that I thought looked good.',
      ],
      polish: 1,
    },
  },
  {
    id: 'islamic-tools-hub',
    date: '2025-11',
    title: 'Islamic Tools Hub',
    role: 'My own',
    summary: 'My first try at building with an API: a small site of Islamic tools that includes prayer times.',
    stack: ['HTML', 'CSS', 'REST APIs'],
    image: prayer,
    alt: 'Islamic Tools Hub home page: lanterns and a crescent moon behind four buttons for Prayer Times, Tasbeeh Counter, Random Hadith and Islamic Quiz.',
    host: 'Practice_prayer_api · local run',
    repo: 'https://github.com/Musaburke/Practice_prayer_api',
    hue: '#f2a65a', // lantern orange
    journey: {
      learned: 'This taught me the very basics: what an API key is, how it works and how to use one.',
      short: "My first real try at building something with an API. It was very low level and didn't look good at all, but it taught me the very basics: what an API key is, how it works and how to use one. Seeing that work is what made me want to build more.",
      story: [
        "This was my first real try at building something with an API. It was very low level, it wasn't technical and it didn't look good at all.",
        'It did teach me the very basics of what an API key is and how it works. Seeing that work is what made me want to build more.',
      ],
      polish: 0,
    },
  },
  {
    id: 'hussein',
    date: '2025-12',
    title: 'Prof. Dr G. Hussein website',
    role: 'Built for a client',
    summary: 'A site for a professor: their work, achievements and history in one place.',
    stack: ['HTML', 'CSS', 'Web forms', 'CAPTCHA', 'GitHub Pages'],
    image: hussein,
    alt: 'Publications page of the Prof. Dr G. Hussein website: cards for books, journals and blogs above gradient buttons for browsing books by year.',
    host: 'musaburke.github.io',
    live: 'https://musaburke.github.io/Prof.-Dr-G.-Hussein-Website/',
    hue: '#5cc8d6', // site teal
    journey: {
      learned: "If communication with a client isn't done right, the build drags on. And reuse matters: I wrote hundreds of near-identical lines of HTML.",
      short: "A site for a professor to document his work, achievements and history: my first bigger solo project. I learnt that if communication with a client isn't done right, the build drags on, and that reuse matters: I wrote hundreds of near-identical lines of HTML.",
      story: [
        'I made this site for a professor to document his work, achievements and history. It was my first bigger solo project, and it showed.',
        "The main thing I learnt is how important it is to communicate with a client. I didn't do it well, and that made the build extremely long and dragged out.",
        'I also learnt the value of reusability. I built it almost entirely in HTML and some CSS, which meant hundreds of similar, redundant lines. Libraries would have made it far easier. It was also my first time with web forms, email routing, CAPTCHA, a navbar and 15+ blog posts with templates I designed myself. Not all of it went perfectly, but I got it running and I was really proud of it.',
      ],
      skills: ['Web forms', 'CAPTCHA', 'GitHub Pages'],
      polish: 1,
    },
  },
  {
    id: 'renewly',
    date: '2026-07',
    title: 'Renewly',
    role: 'Team project',
    summary: 'A shared dashboard that tells small teams the last day they can safely cancel each paid tool, before it auto-renews.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'TanStack Query', 'Tailwind CSS'],
    image: renewly,
    alt: 'Renewly dashboard with sample data: ten tracked contracts, £1,923 monthly spend and the three closest last-safe-cancel dates.',
    host: 'Renewly · sample data',
    live: 'https://therenewly.vercel.app',
    repo: 'https://github.com/srahman14/renewly',
    hue: '#7fa7ff', // Renewly navy, lifted
    journey: {
      learned: 'Working with a database and real users means security comes first: who can see what, and what the frontend never gets to touch.',
      short: "My first big collaborative project, and my first time with a database, a login system and a user base. It taught me that with real users, security comes first: who can see what, and what the frontend never gets to touch.",
      story: [
        'Renewly was my first big collaborative project and my first time working with a database, a login system and a user base. If it went wrong it could cause real damage, and that changed how I think. We also planned the flow and tools first, instead of just coding with no direction.',
        "Most of what I learnt was about protecting data. I used SQL and Supabase to manage the database and set its rules, stopped people reaching other accounts' data by changing the URL, and kept the backend hidden from the frontend.",
        "It also showed me how much communication with a collaborator matters, and how important file and variable naming gets across a huge number of files. I lost progress more than once to bad Git habits I thought didn't matter, which is how I learnt to take branches and rebasing seriously.",
      ],
      skills: ['TypeScript', 'Next.js', 'Supabase', 'SQL', 'Zustand'],
      polish: 2,
    },
  },
  {
    id: 'dsb-cleaning',
    date: '2026-10',
    title: 'DSB Commercial Cleaning',
    role: 'Sole developer, real client',
    summary: 'A fast, secure website for a London-area cleaning company, live on its own domain.',
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'React', 'Cloudflare'],
    image: dsb,
    alt: 'DSB Commercial Cleaning home page, black and gold, with a close-up of a freshly cleaned carpet.',
    host: 'dsbcommercialcleaning.co.uk',
    live: 'https://dsbcommercialcleaning.co.uk',
    repoNote: 'Private (client site)',
    hue: '#e9c46a', // DSB gold
    journey: {
      learned: 'Everything came together here. I also learnt to use AI properly: as a co-agent that helps me build, teaches me and debugs, with me reviewing all of it.',
      short: "Where everything came together: a full plan, all my questions to the client at once, prototypes, my own domain and proper security checks. I also learnt to use AI properly, as a co-agent that helps me build, teaches me and debugs, with me reviewing all of it.",
      story: [
        'This is where I put everything together, including my past mistakes. I had a full plan and stuck to it. I asked the client all my questions at once instead of waiting, set up scheduled talks and built prototypes for them to react to.',
        "I also learnt how to use AI properly. I treat it as a co-agent: it helps me build, teaches me as I go and helps me debug when I'm stuck, and I review everything it recommends before it goes in. A lot of people use it blindly and their skills get dulled, so I made a point of using it the right way, and it went well.",
        'It was my first time using Web3Forms, getting my own domain through Namecheap, deploying it and connecting it all through Cloudflare, after a lot of tutorials and failed deployments. It was also my first time doing proper security checks: HTTPS enforced with HSTS, a Content Security Policy, security headers and spam protection on the quote form. I set up a business email address with SPF and DMARC, used a Cloudflare Worker for email routing around launch, and connected Google Search Console. The form asks only for what a quote needs, and the site itself stores nothing.',
      ],
      skills: ['Astro', 'Cloudflare', 'Web3Forms', 'Security headers'],
      polish: 3,
    },
  },
  {
    id: 'design-gallery',
    date: '2026-11',
    title: 'Design gallery',
    role: 'My own',
    // TODO(musa): check this line.
    summary: 'The backgrounds, effects and building blocks I use on my sites, each one running live with its code a click away.',
    stack: ['Astro', 'TypeScript', 'Tailwind CSS', 'Three.js', 'Cloudflare'],
    image: gallery,
    alt: 'Design gallery home page: the headline "Everything my sites are made of" beside a list of component groups, above live previews of a starfield and a glass orb.',
    host: 'musa-design-gallery.pages.dev',
    live: 'https://musa-design-gallery.pages.dev',
    repo: 'https://github.com/Musaburke/design-gallery',
    hue: '#8fd19e', // gallery logo green
  },
  {
    id: 'ai-field-guide',
    date: '2026-11',
    title: 'AI field guide',
    role: 'My own',
    summary: 'Practical guides to using AI well, for students and professionals, with every source labelled by how far I checked it.',
    stack: ['Astro', 'React', 'Radix', 'CSS', 'Cloudflare Pages'],
    image: afg,
    alt: 'AI field guide home page on a pale mint ground, with the headline "Get more out of AI, and stay sharp".',
    host: 'musa-ai-field-guide.pages.dev',
    live: 'https://musa-ai-field-guide.pages.dev',
    repo: 'https://github.com/Musaburke/ai-field-guide',
    hue: '#cbe7c9', // field guide mint
    journey: {
      learned: 'Researching it taught me how to get more out of AI myself: a second brain in Obsidian, managing my usage and better prompts.',
      short: "I set out to show how useful AI really is when it is used wisely. Researching it taught me how to get more out of AI myself: a second brain in Obsidian, managing my usage and better prompts.",
      story: [
        'I set out to show how useful AI really is when it is used wisely. While researching it, I ended up learning how to get the most out of AI myself.',
        'I discovered how much a second brain helps: notes in Obsidian that every new chat can start from. I learnt how to properly manage my usage and how to prompt AI better, and I labelled every source by how far I had read it.',
        'I built the site with Claude, and doing that taught me how to use Claude better, first hand. I turned that experience into guides on the site, like Manage your usage, Give AI a second brain and Build websites with AI, so other people can use what I learnt. It also took six design directions before one felt right.',
      ],
      skills: ['React', 'Radix', 'Cloudflare Pages'],
      polish: 3,
    },
  },
  {
    id: 'the-lure',
    date: '2026-11',
    title: 'The Lure',
    role: 'My own',
    summary: "A scroll-down dive through the ocean's depth zones. At each depth, a real deep-sea animal that survives by trickery, the scam that works the same way, and a challenge to spot the fake.",
    stack: ['Astro', 'TypeScript', 'WebGL', 'Web Audio', 'Lenis', 'Cloudflare Pages'],
    image: lureHome,
    alt: 'The first screen of The Lure. The title and a one-line promise on deep blue water, a depth readout on the left, and a glass-like bubble on the right showing two reef sharks.',
    host: 'the-lure.pages.dev',
    live: 'https://the-lure.pages.dev',
    repo: 'https://github.com/Musaburke/the-lure',
    hue: '#4fe6d4', // The Lure lens-rim teal
    journey: {
      learned: 'Smooth motion needs two layers working together, and a link checker can only recognise tricks it already knows, so it should never call a link safe.',
      short: "A dive through the ocean's depth zones, where each deep-sea trickster meets the scam that works the same way. It taught me that smooth motion needs two layers working together, and that a link checker can only recognise tricks it already knows, so it should never call a link safe.",
      story: [
        "The Lure is a scroll-down dive through the ocean's depth zones for everyday adults. At each depth you meet a deep-sea animal that survives by tricking others, then the online scam that works the same way, then a short challenge where you pick out the fake.",
        'I built a glass-like lens that floats beside the text, a link checker that never calls a link safe, 60 spot-the-fake questions and an endless practice dive. Every fact links to its source, and the scam brands in the examples are invented.',
        'The first version felt childish to me, so I took out the cartoon creatures and added sourced UK figures. The motion took the longest: it only felt fluid once the whole page glided and the lens chased a goal on a spring.',
      ],
      polish: 3,
    },
  },
  {
    id: 'break-the-ai',
    date: '2026-11',
    title: 'Break the AI',
    role: 'My own',
    summary: "A browser game where you trick a fictional bank's AI chatbots into leaking their secrets, then learn the fix that would have stopped you.",
    stack: ['Astro', 'TypeScript', 'Cloudflare Workers', 'D1', 'Workers AI', 'Vitest'],
    image: bta,
    alt: 'Level 1 of Break the AI: an email from the bank\'s security lead and the task on the left, and the bank\'s green support chat refusing to share the staff code on the right.',
    host: 'break-the-ai.muburke07.workers.dev',
    live: 'https://break-the-ai.muburke07.workers.dev',
    repo: 'https://github.com/Musaburke/break-the-ai',
    hue: '#c6f432', // Break the AI lime
    journey: {
      learned: 'An AI only sees text, so "I work here" is just more text. Keeping secrets away from the model beats any prompt.',
      short: "After the Google Cybersecurity Certificate, I built a game where you trick a made-up bank's AI chatbots into leaking secrets. It taught me that an AI only sees text, so \"I work here\" is just more text, and keeping secrets away from the model beats any prompt.",
      story: [
        'After finishing the Google Cybersecurity Certificate, I wanted to put the attacking side of security into practice. So I built a game where you trick a made-up bank\'s AI chatbots into leaking their secrets, then a debrief explains the fix.',
        'Building the attacks taught me how these models actually fail. Filters only catch what they were built to look for, and a prompt that says "never share it" is not a defence. The game is built so the server decides everything: secrets are worked out per player and never stored, and the shared AI allowance can\'t be drained by one person.',
        'Playing it myself, I got stuck on level 2 and used all three hints. That taught me to test honestly on myself, so I reworked the clues, the hints and the way a blocked message shows up until it felt fair.',
      ],
      skills: ['Cloudflare Workers', 'D1', 'Workers AI', 'Prompt injection', 'OWASP LLM Top 10'],
      polish: 3,
    },
  },
];

// Used when a screenshot is missing: swap `image` for this and keep a truthful `alt`.
export const missingShot = placeholder;

export const future = {
  hue: '#9fd09c', // the site's own accent
  date: 'Next',
  title: 'Security',
  text: 'Google Cybersecurity Certificate done in Nov 2026. Now working through TryHackMe, with the aim of a career in cyber security.',
};
