// Joins the one list of work (src/data/work.ts) with the case studies (src/content/projects).
// Every page reads projects from here, so each project has one entry and one address.
import { getCollection, type CollectionEntry } from 'astro:content';
import { work, type Work } from '../data/work';

export type Project = Work & {
  caseStudy?: CollectionEntry<'projects'>;
  href?: string; // where every link to this project goes: its case study, else the live site, else the code
};

const monthYear = new Intl.DateTimeFormat('en-GB', { month: 'short', year: 'numeric', timeZone: 'UTC' });
// '2025-11' -> 'Nov 2025'
export const showDate = (date: string) => monthYear.format(new Date(`${date}-01T00:00:00Z`));

export async function getWork() {
  const studies = await getCollection('projects');
  const ids = new Set(work.map((w) => w.id));
  const stray = studies.filter((s) => !ids.has(s.id));
  if (stray.length) {
    throw new Error(`Case studies with no entry in src/data/work.ts: ${stray.map((s) => s.id).join(', ')}. Add one with the same id.`);
  }

  // Oldest first; entries in the same month keep their order in work.ts.
  const projects: Project[] = work
    .filter((w) => !w.draft)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((w) => {
      const caseStudy = studies.find((s) => s.id === w.id);
      return { ...w, caseStudy, href: caseStudy ? `/projects/${w.id}` : w.live ?? w.repo };
    });
  const byOrder = projects.filter((p) => p.caseStudy).sort((a, b) => a.caseStudy!.data.order - b.caseStudy!.data.order);

  return {
    allWork: [...projects].reverse(), // newest first
    journeyStops: projects.filter((p) => p.journey), // oldest first
    caseStudies: byOrder,
    featured: byOrder.filter((p) => p.caseStudy!.data.featured),
  };
}
