'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { Github, Linkedin, Twitter, Mail, Heart } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const Footer: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations(); // تابع برای گرفتن متن‌ها

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
      
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Social Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {socialLinks.map((social, index) => {
            const Icon = social.icon;
            return (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="group relative p-4 rounded-2xl backdrop-blur-xl bg-white/70 dark:bg-gray-800/70 border-2 border-white/40 dark:border-gray-700/40 hover:border-white/60 dark:hover:border-gray-600/60 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}
                ></div>
            
                <Icon className="relative w-6 h-6 text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </a>
            );
          })}
        </div>

        {/* Animated Divider */}
        <div className="relative h-px mb-8 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"
          ></div>
        </div>

        {/* Footer Text */}
        <div
          className="text-center space-y-3"
        >
          <p
            className="text-gray-700 dark:text-gray-300 font-medium text-sm sm:text-base"
          >
            {t('footerText')}
          </p>
          
          <p
            className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2 flex-wrap text-sm"
          >
            <span>{t('footerMade').split('❤️')[0]}</span>
            <span
            
            >
              <Heart className="w-4 h-4 text-red-500 fill-current inline" />
            </span>
            <span>{t('footerMade').split('❤️')[1]}</span>
          </p>

       
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-purple-500/10 to-transparent pointer-events-none"></div>
    </footer>
  );
};