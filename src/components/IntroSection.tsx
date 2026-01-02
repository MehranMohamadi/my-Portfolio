'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { ArrowRight, Mail, Code, Zap, Sparkles } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from "next/image";

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

      <div className="max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Text Content */}
          <div
            className="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
          >
            <div className="space-y-2 text-start">
              <p
                className="text-blue-600 dark:text-blue-400 text-sm sm:text-base"
              >
                {t('introGreeting')}
              </p>
              <h1
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl"
              >
                {t('introName')}
              </h1>
              <h2
                className="text-gray-700 dark:text-gray-300 text-xl sm:text-2xl lg:text-3xl"
              >
                {t('introTitle')}
              </h2>
            </div>
            
            <p
              className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base text-start"
            >
              {t('introDescription')}
            </p>

            <div
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                {t('viewWork')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <Mail className="w-4 h-4" />
                {t('contactMe')}
              </button>
            </div>
    
          </div>

          {/* Profile Card */}
          <div
            className="flex justify-center order-1 lg:order-2"
          >
            <div className="relative group w-full max-w-sm ">
              <div
                className="absolute inset-0 origin-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-40"
              ></div>
              
              <div
                className="relative bg-white/40 dark:bg-gray-800/40 p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-gray-600/20 shadow-2xl"
              >
                <div className="relative">
                  <div
                    className="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-2xl overflow-hidden ring-4 ring-white/50 dark:ring-gray-600/50 shadow-xl"
                  >
                 <Image
  src="/img/profile.png"
  alt="Profile"
  width={256}
  height={256}
  priority
  fetchPriority="high"
  className="w-full h-full object-cover"
/>
                  </div>
                  
                  <div
                    className="absolute -top-2 -right-2 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-60 blur-xl"
                  ></div>
                  <div
                    className="absolute -bottom-2 -left-2 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-60 blur-xl"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};