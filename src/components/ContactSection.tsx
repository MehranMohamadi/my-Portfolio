'use client';

import React, { useState } from 'react';
import { Send, CheckCircle, Mail, User, MessageSquare, Sparkles, Rocket, AlertCircle, Linkedin, Github } from 'lucide-react';
import { useTranslations } from 'next-intl';

type ValidationMessageKey =
  | 'validationEmailRequired'
  | 'validationEmailTooLong'
  | 'validationEmailNoSpaces'
  | 'validationEmailOneAt'
  | 'validationEmailIncomplete'
  | 'validationEmailLocalTooLong'
  | 'validationEmailDots'
  | 'validationEmailInvalidChars'
  | 'validationEmailDomainInvalid'
  | 'validationEmailDomainChars'
  | 'validationEmailExtensionInvalid'
  | 'validationNameRequired'
  | 'validationNameTooShort'
  | 'validationNameTooLong'
  | 'validationNameInvalidChars'
  | 'validationNameMultipleSpaces';

const validationMessageKeys = new Set<string>([
  'validationEmailRequired',
  'validationEmailTooLong',
  'validationEmailNoSpaces',
  'validationEmailOneAt',
  'validationEmailIncomplete',
  'validationEmailLocalTooLong',
  'validationEmailDots',
  'validationEmailInvalidChars',
  'validationEmailDomainInvalid',
  'validationEmailDomainChars',
  'validationEmailExtensionInvalid',
  'validationNameRequired',
  'validationNameTooShort',
  'validationNameTooLong',
  'validationNameInvalidChars',
  'validationNameMultipleSpaces',
]);

function validateEmailAddress(value: string) {
  const email = value.trim();

  if (!email) {
    return 'validationEmailRequired';
  }

  if (email.length > 254) {
    return 'validationEmailTooLong';
  }

  if (/\s/.test(email)) {
    return 'validationEmailNoSpaces';
  }

  const parts = email.split('@');

  if (parts.length !== 2) {
    return 'validationEmailOneAt';
  }

  const [localPart, domain] = parts;

  if (!localPart || !domain) {
    return 'validationEmailIncomplete';
  }

  if (localPart.length > 64) {
    return 'validationEmailLocalTooLong';
  }

  if (localPart.startsWith('.') || localPart.endsWith('.') || localPart.includes('..')) {
    return 'validationEmailDots';
  }

  if (!/^[A-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/i.test(localPart)) {
    return 'validationEmailInvalidChars';
  }

  if (domain.length > 253 || domain.includes('..')) {
    return 'validationEmailDomainInvalid';
  }

  const domainLabels = domain.split('.');

  if (
    domainLabels.length < 2 ||
    domainLabels.some((label) => !label || label.length > 63 || label.startsWith('-') || label.endsWith('-'))
  ) {
    return 'validationEmailDomainInvalid';
  }

  if (!domainLabels.every((label) => /^[A-Z0-9-]+$/i.test(label))) {
    return 'validationEmailDomainChars';
  }

  if (!/^[A-Z]{2,}$/i.test(domainLabels[domainLabels.length - 1])) {
    return 'validationEmailExtensionInvalid';
  }

  return '';
}

function validateFullName(value: string) {
  const name = value.trim();

  if (!name) {
    return 'validationNameRequired';
  }

  if (name.length < 2) {
    return 'validationNameTooShort';
  }

  if (name.length > 80) {
    return 'validationNameTooLong';
  }

  if (!/^[A-Z\u0600-\u06FF\s'.-]+$/i.test(name)) {
    return 'validationNameInvalidChars';
  }

  if (/\s{2,}/.test(name)) {
    return 'validationNameMultipleSpaces';
  }

  return '';
}

export const ContactSection: React.FC = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [nameTouched, setNameTouched] = useState(false);
  const [nameError, setNameError] = useState<ValidationMessageKey | ''>('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [emailError, setEmailError] = useState<ValidationMessageKey | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const getValidationMessage = (message: string, validKey: string) => {
    if (!message) {
      return t(validKey);
    }

    return validationMessageKeys.has(message) ? t(message) : message;
  };
  const contactLinks = [
    {
      href: 'mailto:mehran.mohammadi.frd@gmail.com',
      label: 'Email',
      text: 'mehran.mohammadi.frd@gmail.com',
      icon: Mail,
    },
    {
      href: 'https://t.me/Mehran_ll',
      label: 'Telegram',
      text: '@Mehran_ll',
      icon: Send,
    },
    {
      href: 'https://www.linkedin.com/in/mehran-mohammadi-far/',
      label: 'LinkedIn',
      text: 'LinkedIn',
      icon: Linkedin,
    },
    {
      href: 'https://github.com/MehranMohamadi',
      label: 'GitHub',
      text: 'GitHub',
      icon: Github,
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextNameError = validateFullName(formData.name);
    const nextEmailError = validateEmailAddress(formData.email);

    setNameTouched(true);
    setNameError(nextNameError);
    setEmailTouched(true);
    setEmailError(nextEmailError);

    if (nextNameError || nextEmailError) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setNameTouched(false);
      setNameError('');
      setEmailTouched(false);
      setEmailError('');

      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong. Please try again.');

      setTimeout(() => {
        setSubmitStatus('idle');
        setErrorMessage('');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const nextFormData = {
      ...formData,
      [e.target.name]: e.target.value,
    };

    setFormData(nextFormData);

    if (e.target.name === 'name' && nameTouched) {
      setNameError(validateFullName(e.target.value));
    }

    if (e.target.name === 'email' && emailTouched) {
      setEmailError(validateEmailAddress(e.target.value));
    }
  };

  return (
    <section id="contact" className="py-12 sm:py-16 lg:py-10 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-800/30 relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex p-4 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 mb-4">
            <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>

          <h2 className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {t('contactTitle')}
          </h2>

          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {t('contactSubtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-5">
            {contactLinks.map((link) => {
              const Icon = link.icon;
              const isExternal = link.href.startsWith('http');

              return (
                <a
                  key={link.href}
                  href={link.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  aria-label={`Contact Mehran Mohammadi on ${link.label}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 dark:bg-gray-800/70 border border-white/40 dark:border-gray-700/40 text-sm text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                  {link.text}
                </a>
              );
            })}
          </div>
        </div>

        <div className="relative">
          <div className="relative backdrop-blur-2xl bg-white/80 dark:bg-gray-800/80 p-6 sm:p-8 md:p-10 rounded-3xl border-2 border-white/40 dark:border-gray-600/40 shadow-2xl">
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/50 dark:from-white/10 to-transparent pointer-events-none rounded-t-3xl"></div>

            {submitStatus === 'success' ? (
              <div className="text-center py-12 relative z-10">
                <div className="relative inline-flex p-6 rounded-full bg-gradient-to-br from-green-500/30 to-emerald-500/30 mb-6">
                  <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
                  <CheckCircle className="w-16 h-16 text-green-600 dark:text-green-400 relative z-10" />
                </div>
                <h3 className="text-green-600 dark:text-green-400 mb-2 text-xl sm:text-2xl">
                  {t('contactSuccess')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {t('contactSuccessMessage')}
                </p>
              </div>
            ) : submitStatus === 'error' ? (
              <div className="text-center py-12 relative z-10">
                <div className="relative inline-flex p-6 rounded-full bg-gradient-to-br from-red-500/30 to-orange-500/30 mb-6">
                  <AlertCircle className="w-16 h-16 text-red-600 dark:text-red-400 relative z-10" />
                </div>
                <h3 className="text-red-600 dark:text-red-400 mb-2 text-xl sm:text-2xl">
                  Oops! Something went wrong
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {errorMessage || 'Please try again later.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6 relative z-10">
                <div className="relative group">
                  <label htmlFor="name" className="block mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <User className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    {t('contactName')}
                  </label>
                  <div className="relative">
                    <input
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => {
                        setFocusedField(null);
                        setNameTouched(true);
                        setNameError(validateFullName(formData.name));
                      }}
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={80}
                      aria-invalid={Boolean(nameError)}
                      aria-describedby="name-error"
                      disabled={isSubmitting}
                      placeholder={t('contactName')}
                      className={`w-full px-5 py-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gray-700/70 border-2 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                        nameError
                          ? 'border-red-400/70 dark:border-red-500/70 focus:border-red-500 dark:focus:border-red-400'
                          : 'border-gray-200/50 dark:border-gray-600/50 focus:border-blue-500 dark:focus:border-blue-400'
                      }`}
                    />
                    {focusedField === 'name' && (
                      <div className="absolute inset-0 rounded-2xl bg-blue-500/20 -z-10 blur-xl"></div>
                    )}
                  </div>
                  <p
                    id="name-error"
                    className={`mt-2 min-h-[20px] text-sm leading-5 text-red-600 dark:text-red-400 transition-opacity duration-200 ${
                      nameError ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-live="polite"
                  >
                    {getValidationMessage(nameError, 'validationNameValid')}
                  </p>
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block mb-2 text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    {t('contactEmail')}
                  </label>
                  <div className="relative">
                    <input
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => {
                        setFocusedField(null);
                        setEmailTouched(true);
                        setEmailError(validateEmailAddress(formData.email));
                      }}
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      aria-invalid={Boolean(emailError)}
                      aria-describedby="email-error"
                      disabled={isSubmitting}
                      placeholder={t('contactEmail')}
                      className={`w-full px-5 py-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gray-700/70 border-2 focus:outline-none transition-all duration-300 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed ${
                        emailError
                          ? 'border-red-400/70 dark:border-red-500/70 focus:border-red-500 dark:focus:border-red-400'
                          : 'border-gray-200/50 dark:border-gray-600/50 focus:border-purple-500 dark:focus:border-purple-400'
                      }`}
                    />
                    {focusedField === 'email' && (
                      <div className="absolute inset-0 rounded-2xl bg-purple-500/20 -z-10 blur-xl"></div>
                    )}
                  </div>
                  <p
                    id="email-error"
                    className={`mt-2 min-h-[20px] text-sm leading-5 text-red-600 dark:text-red-400 transition-opacity duration-200 ${
                      emailError ? 'opacity-100' : 'opacity-0'
                    }`}
                    aria-live="polite"
                  >
                    {getValidationMessage(emailError, 'validationEmailValid')}
                  </p>
                </div>

                <div className="relative group">
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
                      disabled={isSubmitting}
                      placeholder={t('contactMessage')}
                      className="w-full px-5 py-4 rounded-2xl backdrop-blur-md bg-white/70 dark:bg-gray-700/70 border-2 border-gray-200/50 dark:border-gray-600/50 focus:border-pink-500 dark:focus:border-pink-400 focus:outline-none transition-all duration-300 resize-none text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {focusedField === 'message' && (
                      <div className="absolute inset-0 rounded-2xl bg-pink-500/20 -z-10 blur-xl"></div>
                    )}
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-2xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <span className="relative flex items-center gap-2 text-base sm:text-lg font-semibold">
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          {t('contactSubmit')}
                        </>
                      ) : (
                        <>
                          <Rocket className="w-5 h-5 group-hover:rotate-45 transition-transform duration-300" />
                          {t('contactSubmit')}
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>
            )}

            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-bl-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-3xl pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
