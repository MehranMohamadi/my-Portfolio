'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { Timeline } from './Timeline';
import { useTranslations } from 'next-intl';

const projects = [
  { image: '', titleKey: 'project1Title', descKey: 'project1Desc', year: '2025' },
  { image: '', titleKey: 'project2Title', descKey: 'project2Desc', year: '2024' },
  { image: '', titleKey: 'project3Title', descKey: 'project3Desc', year: '2024' },
  { image: '', titleKey: 'project4Title', descKey: 'project4Desc', year: '2023' },
  { image: '', titleKey: 'project5Title', descKey: 'project5Desc', year: '2023' },
  { image: '', titleKey: 'project6Title', descKey: 'project6Desc', year: '2022' },
];

export const ProjectsSection: React.FC = () => {
  const t = useTranslations();

  const timelineItems = useMemo(
    () => [
      { year: '2022', title: t(projects[5].titleKey) },
      { year: '2023', title: t(projects[4].titleKey) },
      { year: '2024', title: t(projects[2].titleKey) },
      { year: '2025', title: t(projects[0].titleKey), active: true },
    ],
    [t]
  );

  return (
    <section
      id="projects"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/30"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {t('projectsTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t('projectsSubtitle')}
          </p>
        </div>

        {/* Timeline */}
        <div className="mb-16">
          <h3 className="text-center mb-8 text-gray-800 dark:text-gray-200 text-xl sm:text-2xl">
            {t('timelineTitle')}
          </h3>
          <Timeline items={timelineItems} />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.titleKey}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="relative bg-white/70 dark:bg-gray-800/70 rounded-3xl border border-white/40 dark:border-gray-600/40 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-blue-500/20">

                {/* Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={t(project.titleKey)}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <ExternalLink className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-5 bg-linear-to-b from-white/60 to-white/80 dark:from-gray-800/60 dark:to-gray-800/80">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900 dark:text-white text-base sm:text-lg font-semibold">
                      {t(project.titleKey)}
                    </h3>
                    <span className="ml-2 px-3 py-1 text-xs rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white">
                      {project.year}
                    </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
                    {t(project.descKey)}
                  </p>

                  <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-700/60 border border-white/40 dark:border-gray-600/40 text-blue-600 dark:text-blue-400 hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all text-sm">
                    {t('viewDetails')}
                    <ExternalLink className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  </button>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
