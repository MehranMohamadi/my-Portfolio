type ProjectDefinition = {
  image: string;
  titleKey: string;
  descKey: string;
  year: string;
  link: string;
  quality?: number;
};

export const projectDefinitions: readonly ProjectDefinition[] = [
  {
    image: '/img/farsnews.avif',
    titleKey: 'fars',
    descKey: 'project1Desc',
    year: '2023',
    link: 'https://farsnews.ir/',
  },
  {
    image: '/img/virasty.avif',
    titleKey: 'virasty',
    descKey: 'project2Desc',
    year: '2023',
    link: 'https://virasty.com/',
  },
  {
    image: '/img/msgway.avif',
    titleKey: 'msgway',
    descKey: 'project3Desc',
    year: '2024',
    link: 'https://msgway.com/',
  },
  {
    image: '/img/gap.avif',
    titleKey: 'gap',
    descKey: 'project4Desc',
    year: '2023',
    link: 'https://gap.im/',
  },
  {
    image: '/img/bimehyar.avif',
    titleKey: 'bimehyar',
    descKey: 'project5Desc',
    year: '2023',
    link: 'https://bimehyar.com',
  },
  {
    image: '/img/nasimrezvan.avif',
    titleKey: 'nasimrezvan',
    descKey: 'project6Desc',
    year: '2022',
    link: 'https://app.nasimrezvan.com/',
    quality: 60,
  },
  {
    image: '/img/rpg-skill-tracker-cover.svg',
    titleKey: 'rpgSkillTracker',
    descKey: 'project7Desc',
    year: '2025',
    link: 'https://rpg-skill-tracker.vercel.app/',
  },
  {
    image: '/img/ipedco.webp',
    titleKey: 'ipedco2026',
    descKey: 'project8Desc',
    year: '2026',
    link: 'https://ipedco2026.vercel.app/',
  },
];
