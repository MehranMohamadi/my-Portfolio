'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';
import {
  Code2, Wind, Component, FileCode, Sparkles, FileType,
  Github, Package, Figma, Boxes, Store, Layers, Atom,
  CheckCircle, Paintbrush
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const skills = [
  {
    icon: FileCode,
    title: { en: 'Nuxt.js', fa: 'Nuxt.js', ar: 'Nuxt.js' },
    items: { en: 'Server Side Rendering', fa: 'رندر سمت سرور', ar: 'عرض من جانب الخادم' },
    color: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/40',
  },
  {
    icon: Component,
    title: { en: 'Vue.js', fa: 'Vue.js', ar: 'Vue.js' },
    items: { en: 'Progressive Framework', fa: 'فریم‌ورک پیشرو', ar: 'إطار تقدمي' },
    color: 'from-green-600 to-teal-500',
    shadowColor: 'shadow-green-600/40',
  },
  {
    icon: Wind,
    title: { en: 'Tailwind CSS', fa: 'Tailwind CSS', ar: 'Tailwind CSS' },
    items: { en: 'Utility-First CSS', fa: 'سی‌اس‌اس ابزار محور', ar: 'CSS قائم على الأدوات' },
    color: 'from-cyan-500 to-blue-500',
    shadowColor: 'shadow-cyan-500/40',
  },
  {
    icon: Layers,
    title: { en: 'Next.js', fa: 'Next.js', ar: 'Next.js' },
    items: { en: 'React Framework', fa: 'فریم‌ورک ری‌اکت', ar: 'إطار React' },
    color: 'from-neutral-700 to-black',
    shadowColor: 'shadow-neutral-700/40',
  },
  {
    icon: Atom,
    title: { en: 'React', fa: 'React', ar: 'React' },
    items: { en: 'Component-Based UI', fa: 'رابط کامپوننت‌محور', ar: 'واجهة قائمة على المكونات' },
    color: 'from-cyan-400 to-blue-600',
    shadowColor: 'shadow-cyan-400/40',
  },
  {
    icon: Code2,
    title: { en: 'JavaScript', fa: 'JavaScript', ar: 'JavaScript' },
    items: { en: 'ES6+ & Modern JS', fa: 'ES6+ و جاوااسکریپت مدرن', ar: 'ES6+ و JavaScript الحديث' },
    color: 'from-yellow-500 to-orange-500',
    shadowColor: 'shadow-yellow-500/40',
  },
  {
    icon: Sparkles,
    title: { en: 'Svelte', fa: 'Svelte', ar: 'Svelte' },
    items: { en: 'Reactive Framework', fa: 'فریم‌ورک واکنش‌گرا', ar: 'إطار تفاعلي' },
    color: 'from-orange-600 to-red-500',
    shadowColor: 'shadow-orange-600/40',
  },
  {
    icon: FileType,
    title: { en: 'HTML & CSS', fa: 'HTML و CSS', ar: 'HTML و CSS' },
    items: { en: 'Semantic & Modern', fa: 'معنایی و مدرن', ar: 'دلالي وحديث' },
    color: 'from-pink-500 to-purple-500',
    shadowColor: 'shadow-pink-500/40',
  },
  {
    icon: Github,
    title: { en: 'Git', fa: 'Git', ar: 'Git' },
    items: { en: 'Version Control', fa: 'کنترل نسخه', ar: 'التحكم في الإصدارات' },
    color: 'from-gray-700 to-gray-900',
    shadowColor: 'shadow-gray-700/40',
  },
  {
    icon: Package,
    title: { en: 'Vite', fa: 'Vite', ar: 'Vite' },
    items: { en: 'Fast Build Tool', fa: 'ابزار بیلد سریع', ar: 'أداة بناء سريعة' },
    color: 'from-purple-500 to-indigo-500',
    shadowColor: 'shadow-purple-500/40',
  },
  {
    icon: Figma,
    title: { en: 'Figma', fa: 'Figma', ar: 'Figma' },
    items: { en: 'Design Collaboration', fa: 'همکاری در طراحی', ar: 'التعاون في التصميم' },
    color: 'from-pink-500 to-rose-500',
    shadowColor: 'shadow-pink-500/40',
  },
  {
    icon: Boxes,
    title: { en: 'Webpack', fa: 'Webpack', ar: 'Webpack' },
    items: { en: 'Module Bundler', fa: 'باندلر ماژول', ar: 'حزم الوحدات' },
    color: 'from-blue-500 to-sky-500',
    shadowColor: 'shadow-blue-500/40',
  },
  {
    icon: Store,
    title: { en: 'Pinia', fa: 'Pinia', ar: 'Pinia' },
    items: { en: 'State Management', fa: 'مدیریت وضعیت', ar: 'إدارة الحالة' },
    color: 'from-yellow-400 to-amber-500',
    shadowColor: 'shadow-yellow-400/40',
  },
  {
    icon: CheckCircle,
    title: { en: 'ESLint', fa: 'ESLint', ar: 'ESLint' },
    items: { en: 'Code Quality', fa: 'کیفیت کد', ar: 'جودة الكود' },
    color: 'from-indigo-500 to-violet-600',
    shadowColor: 'shadow-indigo-500/40',
  },
  {
    icon: Paintbrush,
    title: { en: 'UnoCSS', fa: 'UnoCSS', ar: 'UnoCSS' },
    items: { en: 'Atomic CSS Engine', fa: 'موتور CSS اتمیک', ar: 'محرك CSS ذري' },
    color: 'from-teal-400 to-emerald-500',
    shadowColor: 'shadow-teal-400/40',
  },
];

export const SkillsSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations();
  const [showAll, setShowAll] = React.useState(false);

  const visibleSkills = showAll ? skills : skills.slice(0, 8);

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {t('skillsTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t('skillsSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {visibleSkills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className={`group relative flex flex-col items-center justify-center bg-white/40 dark:bg-gray-800/40 
                p-4 rounded-2xl border border-white/20 dark:border-gray-600/20 
                hover:border-white/50 dark:hover:border-gray-500/50 transition-all duration-300 hover:shadow-xl hover:${skill.shadowColor}`}
              >
                <div className={`mb-3 inline-flex p-3 rounded-xl bg-gradient-to-br ${skill.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="mb-1 text-gray-900 dark:text-white text-sm font-semibold">
                  {skill.title[locale]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-[11px] text-center">
                  {skill.items[locale]}
                </p>
              </div>
            );
          })}
        </div>

        {skills.length > 8 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(v => !v)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showAll ? t('showLess') : t('showMore')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
