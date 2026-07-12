export type PortfolioLocale = 'en' | 'fa' | 'ar';

export type LocalizedSkill = Record<PortfolioLocale, string>;

export const portfolioSkills: readonly LocalizedSkill[] = [
  { en: 'Nuxt.js', fa: 'Nuxt.js', ar: 'Nuxt.js' },
  { en: 'Vue.js', fa: 'Vue.js', ar: 'Vue.js' },
  { en: 'Tailwind CSS', fa: 'Tailwind CSS', ar: 'Tailwind CSS' },
  { en: 'JavaScript', fa: 'JavaScript', ar: 'JavaScript' },
  { en: 'AI Coding Tools', fa: 'ابزارهای هوش مصنوعی کدنویسی', ar: 'أدوات الذكاء الاصطناعي للبرمجة' },
  { en: 'Next.js', fa: 'Next.js', ar: 'Next.js' },
  { en: 'React', fa: 'React', ar: 'React' },
  { en: 'Svelte', fa: 'Svelte', ar: 'Svelte' },
  { en: 'HTML & CSS', fa: 'HTML و CSS', ar: 'HTML و CSS' },
  { en: 'Git', fa: 'Git', ar: 'Git' },
  { en: 'Vite', fa: 'Vite', ar: 'Vite' },
  { en: 'Figma', fa: 'Figma', ar: 'Figma' },
  { en: 'Webpack', fa: 'Webpack', ar: 'Webpack' },
  { en: 'Pinia', fa: 'Pinia', ar: 'Pinia' },
  { en: 'ESLint', fa: 'ESLint', ar: 'ESLint' },
  { en: 'UnoCSS', fa: 'UnoCSS', ar: 'UnoCSS' },
] as const;

