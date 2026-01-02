'use client'
import React from 'react';
import { useTranslations } from 'next-intl';
import { Heart, Code, Coffee } from 'lucide-react';

export const AboutSection: React.FC = () => {
  const t = useTranslations(); // hook برای گرفتن متن‌ها طبق locale

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center mb-12"
        >
          <h2 className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            {t('aboutTitle')}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {t('aboutSubtitle')}
          </p>
        </div>

        {/* Content */}
        <div
          className="backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-8 md:p-12 rounded-3xl border border-white/20 dark:border-gray-600/20 shadow-xl"
        >
          <div className="space-y-6 text-gray-700 dark:text-gray-300 leading-relaxed">
            <p
            >
              {t('aboutText1')}
            </p>
            <p
            >
              {t('aboutText2')}
            </p>
            <p
            >
              {t('aboutText3')}
            </p>
          </div>

          {/* Decorative Stats */}
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 pt-8 border-t border-gray-200/50 dark:border-gray-600/50"
          >
            <div className="text-center group">
              <div
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-3"
              >
                <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <p className="text-gray-900 dark:text-white">4+ {t('years')}</p>
              <p className="text-gray-600 dark:text-gray-400">{t('experience')}</p>
            </div>
            <div className="text-center group">
              <div
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 mb-3"
              >
                <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <p className="text-gray-900 dark:text-white">7+ {t('project')}</p>
              <p className="text-gray-600 dark:text-gray-400">{t('completed')}</p>
            </div>
            <div className="text-center group">
              <div
                className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 mb-3"
              >
                <Coffee className="w-6 h-6 text-pink-600 dark:text-pink-400" />
              </div>
              <p className="text-gray-900 dark:text-white">∞ {t('coffee')}</p>
              <p className="text-gray-600 dark:text-gray-400">{t('consumed')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};