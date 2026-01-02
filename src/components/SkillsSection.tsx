import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Code2, Wind, Component, FileCode, Sparkles, FileType } from 'lucide-react';
import { useTranslations } from 'next-intl';

const skills = [
  {
    icon: FileCode,
    title: { en: 'Nuxt.js', fa: 'Nuxt.js', ar: 'Nuxt.js' },
    items: { en: 'Server Side Rendering', fa: 'رندر سمت سرور', ar: 'عرض من جانب الخادم' },
    color: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/50',
  },
  {
    icon: Component,
    title: { en: 'Vue.js', fa: 'Vue.js', ar: 'Vue.js' },
    items: { en: 'Progressive Framework', fa: 'فریم‌ورک پیشرو', ar: 'إطار تقدمي' },
    color: 'from-green-600 to-teal-500',
    shadowColor: 'shadow-green-600/50',
  },
  {
    icon: Wind,
    title: { en: 'Tailwind CSS', fa: 'Tailwind CSS', ar: 'Tailwind CSS' },
    items: { en: 'Utility-First CSS', fa: 'سی‌اس‌اس ابزار محور', ar: 'CSS قائم على الأدوات' },
    color: 'from-cyan-500 to-blue-500',
    shadowColor: 'shadow-cyan-500/50',
  },
  {
    icon: Code2,
    title: { en: 'JavaScript', fa: 'JavaScript', ar: 'JavaScript' },
    items: { en: 'ES6+ & Modern JS', fa: 'ES6+ و جاوااسکریپت مدرن', ar: 'ES6+ و JavaScript الحديث' },
    color: 'from-yellow-500 to-orange-500',
    shadowColor: 'shadow-yellow-500/50',
  },
  {
    icon: Sparkles,
    title: { en: 'Svelte', fa: 'Svelte', ar: 'Svelte' },
    items: { en: 'Reactive Framework', fa: 'فریم‌ورک واکنش‌گرا', ar: 'إطار تفاعلي' },
    color: 'from-orange-600 to-red-500',
    shadowColor: 'shadow-orange-600/50',
  },
  {
    icon: FileType,
    title: { en: 'HTML & CSS', fa: 'HTML و CSS', ar: 'HTML و CSS' },
    items: { en: 'Semantic & Modern', fa: 'معنایی و مدرن', ar: 'دلالي وحديث' },
    color: 'from-pink-500 to-purple-500',
    shadowColor: 'shadow-pink-500/50',
  },
];

export const SkillsSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations(); 

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
              {t('skillsTitle')}

          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
    
              {t('skillsSubtitle')}
          </p>
        </div>

        {/* Skills Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className={`group relative backdrop-blur-xl flex flex-col items-center justify-center bg-white/50 dark:bg-gray-800/50 p-6 sm:p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 hover:border-white/60 dark:hover:border-gray-500/60 transition-all duration-500 hover:shadow-2xl hover:${skill.shadowColor}`}
              >
            
                {/* Glass Shine Effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl pointer-events-none"></div>

                {/* Icon Container */}
                <div
                  className={`relative mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  
      
                </div>

                {/* Content */}
                <h3 className="mb-2 text-gray-900 dark:text-white text-lg sm:text-xl font-semibold">
                  {skill.title[locale]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {skill.items[locale]}
                </p>

                {/* Bottom Gradient Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};