"use client";
import React, { useState } from "react";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useApp } from "../contexts/AppContext"; // برای تم و ripple

export const Header: React.FC = () => {
  const t = useTranslations(); 
  const router = useRouter();
  const pathname = usePathname();

  const { theme, setTheme, setThemeWithRipple } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setThemeWithRipple(theme === "light" ? "dark" : "light", x, y);
  };

  const languages = [
    { code: "en", name: "English" },
    { code: "fa", name: "فارسی" },
    { code: "ar", name: "العربية" },
  ];

const changeLanguage = (lang: string) => {
  const segments = pathname.split('/').filter(Boolean);
  segments[0] = lang;
  router.push('/' + segments.join('/'));
};

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border-b-2 border-white/30 dark:border-gray-700/30 shadow-lg">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 dark:from-white/5 to-transparent pointer-events-none"></div>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div className="shrink-0" whileHover={{ scale: 1.05 }}>
            <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {["home", "skills", "projects", "about", "contact"].map(
              (section, index) => (
                <motion.button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="relative px-3 py-2 text-gray-700 dark:text-gray-200 hover:text-transparent hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text transition-all duration-300 font-medium"
                  whileHover={{ y: -2 }}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {t(section)}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-blue-600 to-purple-600 origin-left"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  ></motion.div>
                </motion.button>
              )
            )}
          </div>

          {/* Theme & Language */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <motion.button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/40 dark:border-gray-600/40 transition-all duration-300 shadow-lg"
                aria-label="Change language"
                whileHover={{ scale: 1.05, rotate: 15 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </motion.button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute top-full mt-2 right-0 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border-2 border-white/40 dark:border-gray-700/40 overflow-hidden min-w-[140px]"
                  >
                    {languages.map((lang) => (
                      <motion.button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        whileHover={{ x: 5 }}
                        className="block w-full text-left px-4 py-3 hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                      >
                        {lang.name}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <motion.button
              onClick={handleThemeToggle}
              className="relative p-2.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/40 dark:border-gray-600/40 transition-all duration-300 shadow-lg overflow-hidden"
              aria-label="Toggle theme"
              whileHover={{ scale: 1.05, rotate: 180 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === "light" ? (
                  <motion.div
                    key="moon"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 180, opacity: 0 }}
                  >
                    <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="sun"
                    initial={{ rotate: 180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -180, opacity: 0 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <motion.button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-600/40 shadow-lg"
              aria-label="Toggle theme"
              whileTap={{ scale: 0.9 }}
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </motion.button>
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-600/40 shadow-lg"
              aria-label="Toggle menu"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4 space-y-2 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 rounded-2xl my-2 border border-white/30 dark:border-gray-700/30"
            >
              {["home", "skills", "projects", "about", "contact"].map(
                (section, index) => (
                  <motion.button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    {t(section)}
                  </motion.button>
                )
              )}

              {/* Mobile Language Switcher */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    whileHover={{ x: 5 }}
                    className="block w-full text-left px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    {lang.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};