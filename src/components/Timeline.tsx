import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Star, Sparkles, Rocket } from 'lucide-react';

interface TimelineItem {
  year: string;
  title: string;
  active?: boolean;
  color?: string;
}

interface TimelineProps {
  items: TimelineItem[];
}

const icons = [Zap, Star, Sparkles, Rocket];

export const Timeline: React.FC<TimelineProps> = ({ items }) => {
  return (
    <div className="relative py-8 px-4">
      {/* Animated Vertical Timeline Line with Gradient */}
      <div className="absolute left-4 sm:left-8 md:left-1/2 top-0 bottom-0 w-1 md:w-2 rounded-full overflow-hidden">
      
        <div className="absolute inset-0 bg-gradient-to-b from-blue-500 via-purple-500 via-pink-500 to-orange-500 opacity-30"></div>
        
  
      </div>

      {/* Timeline Items */}
      <div className="space-y-8 md:space-y-12">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;
          const colors = [
            'from-blue-500 to-cyan-500',
            'from-purple-500 to-pink-500',
            'from-pink-500 to-rose-500',
            'from-orange-500 to-yellow-500',
          ];
          const bgColors = [
            'bg-blue-500',
            'bg-purple-500',
            'bg-pink-500',
            'bg-orange-500',
          ];
          const shadowColors = [
            'shadow-blue-500/50',
            'shadow-purple-500/50',
            'shadow-pink-500/50',
            'shadow-orange-500/50',
          ];
          const Icon = icons[index % icons.length];
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative flex items-center ${
                isLeft ? 'md:justify-start' : 'md:justify-end'
              } justify-start`}
            >
              {/* Content Card with Enhanced Glass Effect */}
              <div
                className={`w-full sm:w-10/12 md:w-5/12 ml-8 sm:ml-12 md:ml-0 ${
                  !isLeft ? 'md:mr-8' : ''
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.05, y: -10, rotateY: isLeft ? 5 : -5 }}
                  className={`relative backdrop-blur-2xl bg-white/70 dark:bg-gray-900/70 p-4 sm:p-6 rounded-3xl border-2 border-white/40 dark:border-gray-700/40 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden ${
                    item.active ? `hover:${shadowColors[index % 4]}` : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {/* Animated Background Gradient */}
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
                    className={`absolute -inset-10 bg-gradient-to-br ${colors[index % 4]} opacity-0 group-hover:opacity-20 blur-2xl`}
                  ></motion.div>

                  {/* Glass Shine Effect */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/30 dark:from-white/10 to-transparent pointer-events-none rounded-t-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Icon with Animation */}
                      <motion.div
                        whileHover={{ rotate: 360, scale: 1.2 }}
                        transition={{ duration: 0.6 }}
                        className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${colors[index % 4]} shadow-lg`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </motion.div>
                      
                      {/* Year Badge */}
                      <div className={`relative inline-block px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r ${colors[index % 4]} text-white text-sm sm:text-base font-semibold shadow-lg`}>
                        {item.year}
                        {/* Badge Glow */}
                        <motion.div
                          animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.3, 0, 0.3],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors[index % 4]} blur-md -z-10`}
                        ></motion.div>
                      </div>
                    </div>
                    
                    <h3 className="text-gray-900 dark:text-white mb-2 text-base sm:text-lg font-semibold">
                      {item.title}
                    </h3>
                    
                    {item.active && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm"
                      >
                        <motion.div
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                          className="w-2 h-2 rounded-full bg-green-500"
                        ></motion.div>
                        <span className="font-semibold">فعلی</span>
                      </motion.div>
                    )}
                  </div>

                  {/* Bottom Glow Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors[index % 4]} rounded-b-3xl`}></div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/30 dark:from-white/10 to-transparent rounded-tr-3xl pointer-events-none"></div>
                </motion.div>
              </div>

              {/* Enhanced Center Marker */}
              <div className="absolute start-4 sm:start-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-20">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1, type: "spring", stiffness: 200 }}
                  className="relative"
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.6, 0, 0.6],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className={`absolute -inset-2 rounded-full ${bgColors[index % 4]} opacity-30`}
                  ></motion.div>

                  {/* Pulsing Glow */}
                  {item.active && (
                    <motion.div
                      animate={{
                        scale: [1, 2, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className={`absolute inset-0 ${bgColors[index % 4]} rounded-full blur-xl`}
                    ></motion.div>
                  )}
                  
                  {/* Main Marker Circle */}
                  <motion.div
                    whileHover={{ scale: 1.3, rotate: 180 }}
                    className={`relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-3 sm:border-4 border-white dark:border-gray-900 ${
                      bgColors[index % 4]
                    } shadow-2xl ${item.active ? 'scale-125' : ''} transition-all duration-300 z-10 cursor-pointer`}
                  >
                    {/* Inner Sparkle */}
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute inset-1 rounded-full bg-white/50"
                    ></motion.div>
                    
                    {item.active && (
                      <motion.div
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className={`absolute inset-0 rounded-full ${bgColors[index % 4]} opacity-50 blur-sm`}
                      ></motion.div>
                    )}
                  </motion.div>

    
                </motion.div>
              </div>

              {/* Connecting Line to Marker (Mobile only) */}
              <div className="md:hidden absolute left-4 sm:left-8 h-0.5 w-4 sm:w-8 bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"></div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
