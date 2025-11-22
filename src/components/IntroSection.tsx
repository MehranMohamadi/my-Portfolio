'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { ArrowRight, Mail, Code, Zap, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const IntroSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations(); 

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 pt-24 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -1000],
              x: [0, Math.random() * 200 - 100],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: '-10px',
            }}
          ></motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-2">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-blue-600 dark:text-blue-400 text-sm sm:text-base"
              >
                {t('introGreeting')}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl"
              >
                {t('introName')}
              </motion.h1>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-gray-700 dark:text-gray-300 text-xl sm:text-2xl lg:text-3xl"
              >
                {t('introTitle')}
              </motion.h2>
            </div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base"
            >
              {t('introDescription')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('projects')}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {t('viewWork')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4" />
                {t('contactMe')}
              </motion.button>
            </motion.div>

            {/* Decorative Creative Orbit Element */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="pt-8 flex justify-center lg:justify-start"
            >
              <div className="relative">
                <div className="relative w-32 h-32 sm:w-40 sm:h-40">
                  {/* Center Core */}
                  <motion.div
                    animate={{
                      rotate: 360,
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-2xl"
                  >
                    <motion.div
                      animate={{ rotate: -360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-2 rounded-xl bg-white/30 backdrop-blur-sm flex items-center justify-center"
                    >
                      <Code className="w-6 h-6 text-white" />
                    </motion.div>
                  </motion.div>

                  {[Code, Zap, Sparkles].map((Icon, index) => (
                    <motion.div
                      key={index}
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 8 - index,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 0.5,
                      }}
                      className="absolute top-1/2 left-1/2 w-full h-full"
                      style={{ transformOrigin: "center" }}
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          rotate: -360,
                        }}
                        transition={{
                          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 8 - index, repeat: Infinity, ease: "linear" },
                        }}
                        className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl flex items-center justify-center backdrop-blur-xl bg-white/20 border-2 border-white/40"
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </motion.div>
                    </motion.div>
                  ))}

                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ rotate: 360, opacity: [0, 1, 0] }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: i * 0.3,
                      }}
                      className="absolute top-1/2 left-1/2 w-full h-full"
                    >
                      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                    </motion.div>
                  ))}

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
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-blue-500"
                  ></motion.div>
                  <motion.div
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full border-2 border-purple-500"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative group w-full max-w-sm ">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-0 origin-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-40"
              ></motion.div>
              
              <motion.div
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="relative backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-gray-600/20 shadow-2xl"
              >
                <div className="relative">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-2xl overflow-hidden ring-4 ring-white/50 dark:ring-gray-600/50 shadow-xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1655249481446-25d575f1c054?..."
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-2 -right-2 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-60 blur-xl"
                  ></motion.div>
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-2 -left-2 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-60 blur-xl"
                  ></motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};