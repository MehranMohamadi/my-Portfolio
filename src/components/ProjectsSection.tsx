'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ExternalLink } from 'lucide-react';
import { Timeline } from './Timeline';
import { useTranslations } from 'next-intl';

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1669062897193-f8a4215c2033?...',
    titleKey: 'project1Title',
    descKey: 'project1Desc',
    year: '2025',
  },
  {
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?...',
    titleKey: 'project2Title',
    descKey: 'project2Desc',
    year: '2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1519217651866-847339e674d4?...',
    titleKey: 'project3Title',
    descKey: 'project3Desc',
    year: '2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?...',
    titleKey: 'project4Title',
    descKey: 'project4Desc',
    year: '2023',
  },
  {
    image: 'https://images.unsplash.com/photo-1669743267803-03f1de4b89ff?...',
    titleKey: 'project5Title',
    descKey: 'project5Desc',
    year: '2023',
  },
  {
    image: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?...',
    titleKey: 'project6Title',
    descKey: 'project6Desc',
    year: '2022',
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
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

export const ProjectsSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations();

  const timelineItems = [
    { year: '2022', title: t(projects[5].titleKey) },
    { year: '2023', title: t(projects[4].titleKey) },
    { year: '2024', title: t(projects[2].titleKey) },
    { year: '2025', title: t(projects[0].titleKey), active: true },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {t('projectsTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-12 sm:mb-16">
          <h3
            className="text-center mb-6 sm:mb-8 text-gray-800 dark:text-gray-200 text-xl sm:text-2xl"
          >
            {t('timelineTitle')}
          </h3>
          <Timeline items={timelineItems} />
        </div>

        {/* Projects Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-3xl border-2 border-white/40 dark:border-gray-600/40 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500">
                
  
                {/* Top Glass Reflection */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/40 dark:from-white/10 to-transparent pointer-events-none z-10"></div>
                
                {/* Side Glass Reflections */}
                <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white/20 dark:from-white/5 to-transparent pointer-events-none z-10"></div>
                <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white/20 dark:from-white/5 to-transparent pointer-events-none z-10"></div>

                {/* Project Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={t(project.titleKey)}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/50 flex items-center justify-center"
                  >
                    <ExternalLink className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="relative p-4 sm:p-6  bg-gradient-to-b from-white/50 to-white/70 dark:from-gray-800/50 dark:to-gray-800/70">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-500/10 dark:from-white/5 dark:to-purple-500/5 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900 dark:text-white flex-1 text-base sm:text-lg font-semibold">
                        {t(project.titleKey)}
                      </h3>
                      <span className="px-3 py-1 ml-2 text-xs sm:text-sm shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                      {t(project.descKey)}
                    </p>

                    <button
                      className="group/btn flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-700/60 border border-white/40 dark:border-gray-600/40 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 text-blue-600 dark:text-blue-400 hover:border-transparent text-sm sm:text-base shadow-lg"
                    >
                      {t('viewDetails')}
                      <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                    </button>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 rounded-tl-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/40 to-transparent dark:from-white/10 rounded-br-3xl pointer-events-none"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};