import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../contexts/AppContext';
import { translations } from '../data/translations';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useApp();
  const t = translations[language];

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'from-gray-700 to-gray-900' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-600 to-blue-800' },
    { icon: Twitter, href: '#', label: 'Twitter', color: 'from-sky-500 to-blue-600' },
    { icon: Mail, href: '#', label: 'Email', color: 'from-purple-600 to-pink-600' },
  ];

  return (
    <footer className="relative py-12 px-4 backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border-t-2 border-white/30 dark:border-gray-700/30 shadow-2xl overflow-hidden">
      {/* Glass Shine Effect */}
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 dark:from-white/5 to-transparent pointer-events-none"></div>
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            className="absolute w-1 h-1 bg-blue-500/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
            }}
          ></motion.div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <motion.a
                key={index}
                href={social.href}
                aria-label={social.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-4 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-2 border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                {/* Hover Gradient Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></motion.div>
                
                {/* Icon Glow on Hover */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0, 0.3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                  className={`absolute inset-0 bg-gradient-to-br ${social.color} blur-xl opacity-0 group-hover:opacity-100`}
                ></motion.div>

                <Icon className="relative w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </motion.a>
            );
          })}
        </div>

        {/* Animated Divider */}
        <div className="relative h-px mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          <motion.div
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
          ></motion.div>
        </div>

        {/* Footer Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-3"
        >
          <motion.p
            className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base"
            whileHover={{ scale: 1.02 }}
          >
            {t.footerText}
          </motion.p>
          
          <motion.p
            className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap text-sm"
            whileHover={{ scale: 1.02 }}
          >
            <span>{t.footerMade.split('❤️')[0]}</span>
            <motion.span
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current inline" />
            </motion.span>
            <span>{t.footerMade.split('❤️')[1]}</span>
          </motion.p>

          {/* Decorative Dots */}
          <div className="flex justify-center gap-2 pt-2">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
              ></motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Corner Glass Accents */}
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent pointer-events-none"></div>
    </footer>
  );
};
