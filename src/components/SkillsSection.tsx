import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { translations } from '../data/translations';
import { Code2, Wind, Component, FileCode, Sparkles, FileType } from 'lucide-react';

const skills = [
  {
    icon: FileCode,
    title: { en: 'Nuxt.js', fa: 'نکست', ar: 'نكست' },
    items: { en: 'Server Side Rendering', fa: 'رندر سمت سرور', ar: 'عرض من جانب الخادم' },
    color: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/50',
  },
  {
    icon: Component,
    title: { en: 'Vue.js', fa: 'ویو', ar: 'فيو' },
    items: { en: 'Progressive Framework', fa: 'فریم‌ورک پیشرو', ar: 'إطار تقدمي' },
    color: 'from-green-600 to-teal-500',
    shadowColor: 'shadow-green-600/50',
  },
  {
    icon: Wind,
    title: { en: 'Tailwind CSS', fa: 'تیلویند', ar: 'تيلويند' },
    items: { en: 'Utility-First CSS', fa: 'سی‌اس‌اس ابزار محور', ar: 'CSS قائم على الأدوات' },
    color: 'from-cyan-500 to-blue-500',
    shadowColor: 'shadow-cyan-500/50',
  },
  {
    icon: Code2,
    title: { en: 'JavaScript', fa: 'جاوااسکریپت', ar: 'جافا سكريبت' },
    items: { en: 'ES6+ & Modern JS', fa: 'ES6+ و جاوااسکریپت مدرن', ar: 'ES6+ و JavaScript الحديث' },
    color: 'from-yellow-500 to-orange-500',
    shadowColor: 'shadow-yellow-500/50',
  },
  {
    icon: Sparkles,
    title: { en: 'Svelte', fa: 'اسولت', ar: 'سفيلت' },
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export const SkillsSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {t.skillsTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t.skillsSubtitle}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className={`group relative backdrop-blur-xl bg-white/50 dark:bg-gray-800/50 p-6 sm:p-8 rounded-3xl border border-white/30 dark:border-gray-600/30 hover:border-white/60 dark:hover:border-gray-500/60 transition-all duration-500 hover:shadow-2xl hover:${skill.shadowColor}`}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-500`}
                ></motion.div>

                {/* Glass Shine Effect */}
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-3xl pointer-events-none"></div>

                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className={`relative mb-4 inline-flex p-4 rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg`}
                >
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  
                  {/* Icon Glow */}
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} blur-md`}
                  ></motion.div>
                </motion.div>

                {/* Content */}
                <h3 className="mb-2 text-gray-900 dark:text-white text-lg sm:text-xl font-semibold">
                  {skill.title[language]}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                  {skill.items[language]}
                </p>

                {/* Bottom Gradient Line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-b-3xl`}></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};