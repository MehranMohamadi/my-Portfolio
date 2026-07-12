import arMessages from '@/messages/ar.json';
import enMessages from '@/messages/en.json';
import faMessages from '@/messages/fa.json';
import { getPublishedBlogPosts } from '@/data/blogPosts';
import { projectDefinitions } from '@/data/projects';
import { portfolioSkills, type PortfolioLocale } from '@/data/skills';

type Messages = Record<string, string>;

const messagesByLocale: Record<PortfolioLocale, Messages> = {
  en: enMessages,
  fa: faMessages,
  ar: arMessages,
};

const profileKeys = [
  'introName',
  'introTitle',
  'introDescription',
  'aboutSubtitle',
  'aboutText1',
  'aboutText2',
  'aboutText3',
  'experienceRoleFrontend',
  'experienceCompanyTsit',
  'experienceDateTsit',
  'experienceResponsibilityTsit1',
  'experienceResponsibilityTsit2',
  'experienceResponsibilityTsit3',
  'experienceResponsibilityTsit4',
  'experienceResponsibilityTsit5',
  'experienceImpactTsit',
  'contactSubtitle',
] as const;

export function normalizeChatLocale(locale: unknown): PortfolioLocale | null {
  return locale === 'en' || locale === 'fa' || locale === 'ar' ? locale : null;
}

export function buildPortfolioKnowledge(locale: PortfolioLocale) {
  const messages = messagesByLocale[locale];
  const profile = profileKeys
    .map((key) => messages[key])
    .filter(Boolean)
    .join('\n');

  const skills = portfolioSkills.map((skill) => skill[locale]).join(', ');
  const projects = projectDefinitions
    .map((project) => {
      const title = messages[project.titleKey] ?? project.titleKey;
      const description = messages[project.descKey] ?? '';
      return `- ${title} (${project.year}): ${description} | ${project.link}`;
    })
    .join('\n');
  const posts = getPublishedBlogPosts(locale)
    .map((post) => `- ${post.title}: ${post.excerpt}`)
    .join('\n');

  return [
    'PROFILE',
    profile,
    '',
    `SKILLS\n${skills}`,
    '',
    `PROJECTS\n${projects}`,
    '',
    `PUBLISHED ARTICLES\n${posts}`,
    '',
    'CONTACT',
    'Email: mehran.mohammadi.frd@gmail.com',
    'Telegram: https://t.me/Mehran_ll',
    'LinkedIn: https://www.linkedin.com/in/mehran-mohammadi-far/',
    'GitHub: https://github.com/MehranMohamadi',
    'Portfolio: https://mehranmohammadifrd.ir',
  ].join('\n');
}

