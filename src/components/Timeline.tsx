import React from 'react';
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
            <div
              key={index}
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
                <div
                  className={`relative backdrop-blur-2xl bg-white/70 dark:bg-gray-900/70 p-4 sm:p-6 rounded-3xl border-2 border-white/40 dark:border-gray-700/40 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden ${
                    item.active ? `hover:${shadowColors[index % 4]}` : ''
                  }`}
                  style={{ transformStyle: 'preserve-3d' }}
                >
             
                  {/* Glass Shine Effect */}
                  <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-white/30 dark:from-white/10 to-transparent pointer-events-none rounded-t-3xl"></div>
                  
                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      {/* Icon with Animation */}
                      <div
                        className={`p-2 sm:p-3 rounded-xl bg-gradient-to-br ${colors[index % 4]} shadow-lg`}
                      >
                        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                      
                      {/* Year Badge */}
                      <div className={`relative inline-block px-3 sm:px-4 py-1 rounded-full bg-gradient-to-r ${colors[index % 4]} text-white text-sm sm:text-base font-semibold shadow-lg`}>
                        {item.year}
                        {/* Badge Glow */}
                        <div
                          className={`absolute inset-0 rounded-full bg-gradient-to-r ${colors[index % 4]} blur-md -z-10`}
                        ></div>
                      </div>
                    </div>
                    
                    <h3 className="text-gray-900 dark:text-white mb-2 text-base sm:text-lg font-semibold">
                      {item.title}
                    </h3>
                    
                    {item.active && (
                      <div
                        className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm"
                      >
                        <div
                          className="w-2 h-2 rounded-full bg-green-500"
                        ></div>
                        <span className="font-semibold">فعلی</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Glow Line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${colors[index % 4]} rounded-b-3xl`}></div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-white/30 dark:from-white/10 to-transparent rounded-tr-3xl pointer-events-none"></div>
                </div>
              </div>

              {/* Enhanced Center Marker */}
              <div className="absolute left-4 sm:start-8 md:left-1/2 transform md:-translate-x-1/2 flex items-center justify-center z-20">
                <div
                  className="relative"
                >
          
                  
                  {/* Main Marker Circle */}
                  <div
                    className={`relative w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-full border-3 ${
                      bgColors[index % 4]
                    } transition-all duration-300 z-10 cursor-pointer`}
                  >
                    {/* Inner Sparkle */}
                    <div
                      className="absolute inset-1 rounded-full bg-white/50"
                    ></div>
                  </div>

    
                </div>
              </div>

              {/* Connecting Line to Marker (Mobile only) */}
              <div className="md:hidden absolute left-4 sm:left-8 h-0.5 w-4 sm:w-8 bg-gradient-to-r from-gray-300 dark:from-gray-600 to-transparent"></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
