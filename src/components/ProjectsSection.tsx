import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { translations } from '../data/translations';
import { ExternalLink } from 'lucide-react';
import { Timeline } from './Timeline';

const projects = [
  {
    image: 'https://images.unsplash.com/photo-1669062897193-f8a4215c2033?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXZlbG9wbWVudHxlbnwxfHx8fDE3NjM1NzE1NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    titleKey: 'project1Title',
    descKey: 'project1Desc',
    year: '2025',
  },
  {
    image: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBkZXNpZ258ZW58MXx8fHwxNzYzNTk3MTQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    titleKey: 'project2Title',
    descKey: 'project2Desc',
    year: '2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3NjM1NjQ0OTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    titleKey: 'project3Title',
    descKey: 'project3Desc',
    year: '2024',
  },
  {
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MzYwODQ5N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    titleKey: 'project4Title',
    descKey: 'project4Desc',
    year: '2023',
  },
  {
    image: 'https://images.unsplash.com/photo-1669743267803-03f1de4b89ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwcGhvdG9ncmFwaHklMjByZXN0YXVyYW50fGVufDF8fHx8MTc2MzU3ODU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    titleKey: 'project5Title',
    descKey: 'project5Desc',
    year: '2023',
  },
  {
    image: 'https://images.unsplash.com/photo-1584827386916-b5351d3ba34b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaXRuZXNzJTIwd29ya291dCUyMGd5bXxlbnwxfHx8fDE3NjM1ODcxNTh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
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
    transition: {
      duration: 0.5,
    },
  },
};

export const ProjectsSection: React.FC = () => {
  const { locale } = useApp();
  const t = translations[locale];

  const timelineItems = [
    { year: '2022', title: projects[5].titleKey },
    { year: '2023', title: projects[4].titleKey },
    { year: '2024', title: projects[2].titleKey },
    { year: '2025', title: projects[0].titleKey, active: true },
  ];

  return (
    <section id="projects" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/30">
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
            {t.projectsTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t.projectsSubtitle}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="mb-12 sm:mb-16">
          <motion.h3
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-6 sm:mb-8 text-gray-800 dark:text-gray-200 text-xl sm:text-2xl"
          >
            {t.timelineTitle}
          </motion.h3>
          <Timeline items={timelineItems.map(item => ({
            year: item.year,
            title: t[item.title as keyof typeof t] as string,
            active: item.active
          }))} />
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              {/* Enhanced Glass Card with Multiple Layers */}
              <div className="relative backdrop-blur-2xl bg-white/70 dark:bg-gray-800/70 rounded-3xl border-2 border-white/40 dark:border-gray-600/40 overflow-hidden hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-500">
                
                {/* Animated Gradient Background */}
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -inset-20 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 blur-3xl transition-opacity duration-500"
                ></motion.div>

                {/* Top Glass Reflection */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-white/40 dark:from-white/10 to-transparent pointer-events-none z-10"></div>
                
                {/* Side Glass Reflections */}
                <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-white/20 dark:from-white/5 to-transparent pointer-events-none z-10"></div>
                <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-white/20 dark:from-white/5 to-transparent pointer-events-none z-10"></div>

                {/* Project Image */}
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <motion.img
                    whileHover={{ scale: 1.15 }}
                    transition={{ duration: 0.6 }}
                    src={project.image}
                    alt={t[project.titleKey as keyof typeof t] as string}
                    className="w-full h-full object-cover"
                  />
                  {/* Image Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Floating Glass Orb on Hover */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-white/30 dark:bg-white/10 backdrop-blur-xl border border-white/50 flex items-center justify-center"
                  >
                    <ExternalLink className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                {/* Project Info with Enhanced Glass Effect */}
                <div className="relative p-4 sm:p-6 backdrop-blur-sm bg-gradient-to-b from-white/50 to-white/70 dark:from-gray-800/50 dark:to-gray-800/70">
                  {/* Inner Glass Layer */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-purple-500/10 dark:from-white/5 dark:to-purple-500/5 pointer-events-none"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-gray-900 dark:text-white flex-1 text-base sm:text-lg font-semibold">
                        {t[project.titleKey as keyof typeof t]}
                      </h3>
                      <span className="px-3 py-1 ml-2 text-xs sm:text-sm shrink-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm sm:text-base">
                      {t[project.descKey as keyof typeof t]}
                    </p>

                    {/* View Details Button with Glass Effect */}
                    <motion.button
                      whileHover={{ x: 5 }}
                      className="group/btn flex items-center gap-2 px-4 py-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-700/60 border border-white/40 dark:border-gray-600/40 hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:text-white transition-all duration-300 text-blue-600 dark:text-blue-400 hover:border-transparent text-sm sm:text-base shadow-lg"
                    >
                      {t.viewDetails}
                      <ExternalLink className="w-4 h-4 group-hover/btn:rotate-45 transition-transform duration-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Bottom Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Corner Glass Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 bg-gradient-to-br from-white/40 to-transparent dark:from-white/10 rounded-tl-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-white/40 to-transparent dark:from-white/10 rounded-br-3xl pointer-events-none"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};