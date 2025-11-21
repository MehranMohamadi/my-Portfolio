import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { translations } from '../data/translations';
import { Heart, Code, Coffee } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t.aboutTitle}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t.aboutSubtitle}
          </p>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-8 md:p-12 rounded-3xl border border-white/20 dark:border-gray-600/20 shadow-xl"
        >
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t.aboutText1}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t.aboutText2}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t.aboutText3}
            </motion.p>
          </div>

          {/* Decorative Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-600/50"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3"
              >
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <p className="text-gray-900 dark:text-white">5+ Years</p>
              <p className="text-gray-600 dark:text-gray-400">Experience</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3"
              >
                <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <p className="text-gray-900 dark:text-white">50+ Projects</p>
              <p className="text-gray-600 dark:text-gray-400">Completed</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              className="text-center group"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 mb-3"
              >
                <Coffee className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </motion.div>
              <p className="text-gray-900 dark:text-white">∞ Coffee</p>
              <p className="text-gray-600 dark:text-gray-400">Consumed</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};