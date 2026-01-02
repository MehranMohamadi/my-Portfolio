'use client';

import React, { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { Send, CheckCircle, Mail, User, MessageSquare, Sparkles, Rocket } from 'lucide-react';
import { useTranslations } from 'next-intl';

export const ContactSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations(); 
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/30 relative overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500/30 rounded-full blur-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-8 sm:mb-12"
        >
          <div
            className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4"
          >
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h2 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {t('contactTitle')}
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            {t('contactSubtitle')}
          </p>
        </div>

        {/* Contact Form */}
        <div
          className="relative"
        >
          <div className="relative backdrop-blur-2xl bg-white/80 dark:bg-gray-800/80 p-6 sm:p-8 md:p-10 rounded-3xl border-2 border-white/40 dark:border-gray-600/40 shadow-2xl">
            
            {/* Top Glass Reflection */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/50 dark:from-white/10 to-transparent pointer-events-none rounded-t-3xl"></div>
            
       

              {isSubmitted ? (
                /* Success Message */
                <div
                  key="success"
                  className="text-center py-12 relative z-10"
                >
                  <div
                    className="relative inline-flex p-6 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 mb-6"
                  >
                    <div
                      className="absolute inset-0 bg-green-500 rounded-full blur-xl"
                    ></div>
                    <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 relative z-10" />
                  </div>
                  <h3 className="text-green-600 dark:text-green-400 mb-2 text-xl sm:text-2xl">
                    {t('contactSuccess')}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {t('contactSuccessMessage')}
                  </p>
                </div>
              ) : (
                /* Form Fields */
                <form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6 relative z-10"
                >
                  {/* Submit Button */}
                  <div
                    className="flex justify-center mb-8"
                  >
                    <button
                      type="submit"
                      className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl overflow-hidden"
                    >
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                      ></div>
                      <span className="relative flex items-center gap-2 text-base sm:text-lg font-semibold">
                        <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                        {t('contactSubmit')}
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </button>
                  </div>

                  {/* Name Input */}
                  <div
                    className="relative group"
                  >
                    <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      {t('contactName')}
                    </label>
                    <div className="relative">
                      <input
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder={t('contactName')}
                        className="w-full px-5 py-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      {focusedField === 'name' && (
                        <div
                          className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl -z-10"
                        ></div>
                      )}
                    </div>
                  </div>

                  {/* Email Input */}
                  <div
                    className="relative group"
                  >
                    <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      {t('contactEmail')}
                    </label>
                    <div className="relative">
                      <input
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder={t('contactEmail')}
                        className="w-full px-5 py-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      {focusedField === 'email' && (
                        <div
                          className="absolute inset-0 rounded-2xl bg-purple-500/20 blur-xl -z-10"
                        ></div>
                      )}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div
                    className="relative group"
                  >
                    <label htmlFor="message" className="block mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-pink-600 dark:text-pink-400" />
                      {t('contactMessage')}
                    </label>
                    <div className="relative">
                      <textarea
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        placeholder={t('contactMessage')}
                        className="w-full px-5 py-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-pink-500 dark:focus:border-pink-400 focus:outline-none transition-all duration-300 resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500"
                      />
                      {focusedField === 'message' && (
                        <div
                          className="absolute inset-0 rounded-2xl bg-pink-500/20 blur-xl -z-10"
                        ></div>
                      )}
                    </div>
                  </div>
                </form>
              )}

            {/* Bottom Corner Accents */}
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-bl-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};