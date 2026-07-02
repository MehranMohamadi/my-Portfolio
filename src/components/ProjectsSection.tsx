import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

const projects = [
  { image: '/img/farsnews.avif', titleKey: 'fars', descKey: 'project1Desc', year: '2023', link: 'https://farsnews.ir/' },
  { image: '/img/virasty.avif', titleKey: 'virasty', descKey: 'project2Desc', year: '2023', link: 'https://virasty.com/' },
  { image: '/img/msgway.avif', titleKey: 'msgway', descKey: 'project3Desc', year: '2024', link: 'https://msgway.com/' },
  { image: '/img/gap.avif', titleKey: 'gap', descKey: 'project4Desc', year: '2023', link: 'https://gap.im/' },
  { image: '/img/bimehyar.avif', titleKey: 'bimehyar', descKey: 'project5Desc', year: '2023', link: 'https://bimehyar.com' },
  { image: '/img/nasimrezvan.avif', titleKey: 'nasimrezvan', descKey: 'project6Desc', year: '2022', link: 'https://app.nasimrezvan.com/', quality: 60 },
  { image: '/img/rpg-skill-tracker-cover.svg', titleKey: 'rpgSkillTracker', descKey: 'project7Desc', year: '2025', link: 'https://rpg-skill-tracker.vercel.app/' },
  { image: '/img/ipedco.webp', titleKey: 'ipedco2026', descKey: 'project8Desc', year: '2026', link: 'https://ipedco2026.vercel.app/' },
];

type ProjectsSectionProps = {
  title: string;
  subtitle: string;
  viewDetails: string;
  projectTitles: Record<string, string>;
  projectDescriptions: Record<string, string>;
};

export function ProjectsSection({
  title,
  subtitle,
  viewDetails,
  projectTitles,
  projectDescriptions,
}: ProjectsSectionProps) {
  return (
    <section
      id="projects"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/30"
    >
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {title}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {subtitle}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.titleKey}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="relative bg-gray-300/70 dark:bg-gray-800/70 rounded-3xl border border-white/40 dark:border-gray-600/40 overflow-hidden transition-[box-shadow,border-color] duration-500 hover:shadow-xl hover:shadow-blue-500/20">

                {/* Image with link */}
                <Link 
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block h-40 sm:h-48 overflow-hidden cursor-pointer"
                >
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={projectTitles[project.titleKey]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                      quality={project.quality ?? 75}
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  )}

                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center">
                      <ExternalLink className="w-7 h-7 text-white" />
                    </div>
                  </div>
                </Link>

                {/* Content */}
                <div className="relative p-5 bg-linear-to-b from-white/60 to-white/80 dark:from-gray-800/60 dark:to-gray-800/80">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-gray-900 dark:text-white text-base sm:text-lg font-semibold">
                      {projectTitles[project.titleKey]}
                    </h3>
                    {/* <span className="ml-2 px-3 py-1 text-xs rounded-full bg-linear-to-r from-blue-600 to-purple-600 text-white whitespace-nowrap">
                      {project.year}
                    </span> */}
                  </div>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-6">
                    {projectDescriptions[project.descKey]}
                  </p>

                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/60 dark:bg-gray-700/60 border border-white/40 dark:border-gray-600/40 text-blue-600 dark:text-blue-400 hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-[color,background-color,border-color] text-sm group/button"
                  >
                    {viewDetails}
                    <ExternalLink className="w-4 h-4 transition-transform group-hover/button:rotate-45" />
                  </Link>
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
}
