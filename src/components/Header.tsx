"use client";
import React, { useEffect, useState } from "react";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
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
  const [activeSection, setActiveSection] = useState("home");
  const sections = ["home", "skills", "projects", "about", "contact"];


useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    }
  );

  sections.forEach((id) => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);


 const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
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
          <div className="shrink-0">
            <span className="text-xl sm:text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Portfolio
            </span>
          </div>

          {/* Desktop Navigation */}
         <div className="hidden md:flex items-center gap-6 lg:gap-8">
  {["home", "skills", "projects", "about", "contact"].map((section) => (
    <button
      key={section}
      onClick={() => scrollToSection(section)}
      className="relative px-3 py-2 font-medium transition-all duration-300
        text-gray-700 dark:text-gray-200
        hover:text-transparent hover:bg-linear-to-r hover:from-blue-600 hover:to-purple-600 hover:bg-clip-text"
    >
      {t(section)}

      {/* underline */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-0.5 
        bg-linear-to-r from-blue-600 to-purple-600
        transition-transform duration-300 origin-left
        ${
          activeSection === section
            ? "scale-x-100"
            : "scale-x-0"
        }`}
      />
    </button>
  ))}
</div>

          {/* Theme & Language */}
          <div className="hidden md:flex items-center gap-3">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="p-2.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/40 dark:border-gray-600/40 transition-all duration-300 shadow-lg"
                aria-label="Change language"
              >
                <Globe className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </button>


                {langMenuOpen && (
                  <div
                    className="absolute top-full mt-2 end-0 backdrop-blur-xl bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-2xl border-2 border-white/40 dark:border-gray-700/40 overflow-hidden min-w-[140px]"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        className="block w-full text-left px-4 py-3 hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={handleThemeToggle}
              className="relative p-2.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/40 dark:border-gray-600/40 transition-all duration-300 shadow-lg overflow-hidden"
              aria-label="Toggle theme"
            >
                {theme === "light" ? (
                  <div
                    key="moon"
                  >
                    <Moon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  </div>
                ) : (
                  <div
                    key="sun"
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </div>
                )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="p-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-600/40 shadow-lg"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 border border-white/40 dark:border-gray-600/40 shadow-lg"
              aria-label="Toggle menu"
            >
                {mobileMenuOpen ? (
                  <div
                    key="close"
                  >
                    <X className="w-6 h-6" />
                  </div>
                ) : (
                  <div
                    key="menu"
                  >
                    <Menu className="w-6 h-6" />
                  </div>
                )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div
              className="md:hidden py-4 space-y-2 backdrop-blur-xl bg-white/50 dark:bg-gray-900/50 rounded-2xl my-2 border border-white/30 dark:border-gray-700/30"
            >
              {["home", "skills", "projects", "about", "contact"].map(
                (section, index) => (
                  <button
                    key={section}
                    onClick={() => scrollToSection(section)}
                    className="block w-full text-start px-4 py-2 rounded-lg hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300"
                  >
                    {t(section)}
                  </button>
                )
              )}

              {/* Mobile Language Switcher */}
              <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className="block w-full text-start px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    {lang.name}
                  </button>
                ))}
              </div>
            </div>
          )}
      </nav>
    </header>
  );
};