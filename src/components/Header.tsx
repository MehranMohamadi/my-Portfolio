"use client";
import React, { useEffect, useRef, useState } from "react";
import { Sun, Moon, Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useApp } from "../contexts/AppContext"; // برای تم و ripple

const sections = ["home", "skills", "projects", "blog", "about", "contact"];
const headerOffset = 80;

export const Header: React.FC = () => {
  const t = useTranslations(); 
  const router = useRouter();
  const pathname = usePathname();

  const { locale, theme, setTheme, setThemeWithRipple } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);


useEffect(() => {
  const homePath = `/${locale}`;

  if (pathname !== homePath) {
    setActiveSection(pathname.startsWith(`${homePath}/blog/`) ? "blog" : "home");
    return;
  }

  let frameId: number | null = null;
  const main = document.querySelector("main");

  const updateActiveSection = () => {
    const activationLine = 32;
    let nextActive = sections[0];

    for (const section of sections) {
      const element = document.getElementById(section);
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const top = rect.top - headerOffset;
      const bottom = rect.bottom - headerOffset;

      if (top <= activationLine && bottom > activationLine) {
        nextActive = section;
        break;
      }

      if (top <= activationLine) {
        nextActive = section;
      }
    }

    setActiveSection(nextActive);
  };

  const scheduleUpdate = () => {
    if (frameId !== null) return;

    frameId = window.requestAnimationFrame(() => {
      frameId = null;
      updateActiveSection();
    });
  };

  const mutationObserver = new MutationObserver(scheduleUpdate);

  if (main) {
    mutationObserver.observe(main, { childList: true, subtree: true });
  }

  scheduleUpdate();
  const delayedUpdateId = window.setTimeout(scheduleUpdate, 750);

  window.addEventListener("scroll", scheduleUpdate, { passive: true });
  window.addEventListener("resize", scheduleUpdate);
  window.addEventListener("hashchange", scheduleUpdate);

  return () => {
    mutationObserver.disconnect();
    window.clearTimeout(delayedUpdateId);
    window.removeEventListener("scroll", scheduleUpdate);
    window.removeEventListener("resize", scheduleUpdate);
    window.removeEventListener("hashchange", scheduleUpdate);

    if (frameId !== null) {
      window.cancelAnimationFrame(frameId);
    }
  };
}, [locale, pathname]);

useEffect(() => {
  if (!mobileMenuOpen) {
    return;
  }

  const handlePointerDown = (event: PointerEvent) => {
    const target = event.target;

    if (
      target instanceof Node &&
      mobileMenuRef.current &&
      !mobileMenuRef.current.contains(target) &&
      !mobileMenuButtonRef.current?.contains(target)
    ) {
      setMobileMenuOpen(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setMobileMenuOpen(false);
    }
  };

  document.addEventListener("pointerdown", handlePointerDown);
  document.addEventListener("keydown", handleKeyDown);

  return () => {
    document.removeEventListener("pointerdown", handlePointerDown);
    document.removeEventListener("keydown", handleKeyDown);
  };
}, [mobileMenuOpen]);


 const scrollToSection = (id: string) => {
  const homePath = `/${locale}`;

  if (pathname !== homePath) {
    router.push(`${homePath}#${id}`);
    setMobileMenuOpen(false);
    return;
  }

  const element = document.getElementById(id);
  if (element) {
    const top = window.scrollY + element.getBoundingClientRect().top - headerOffset;

    window.scrollTo({ top, behavior: "smooth" });
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
  setLangMenuOpen(false);
  setMobileMenuOpen(false);
  router.push('/' + segments.join('/'));
};

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-white/80 dark:bg-gray-900/80 border-b-2 border-white/30 dark:border-gray-700/30 shadow-lg">
      <div className="absolute top-0 left-0 right-0 h-1/2 bg-linear-to-b from-white/30 dark:from-white/5 to-transparent pointer-events-none"></div>
      <nav className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 relative">
        <div className="flex items-center justify-between gap-2 h-16">
          {/* Logo */}
          <div className="min-w-0 flex-1 md:flex-none">
            <span className="block truncate text-lg sm:text-2xl font-bold bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Mehran Mohammadi
            </span>
          </div>

          {/* Desktop Navigation */}
         <div className="hidden md:flex items-center gap-6 lg:gap-8">
  {sections.map((section) => (
    <button
      key={section}
      onClick={() => scrollToSection(section)}
      className="relative px-3 py-2 font-medium transition-colors duration-300
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
                className="p-2.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/40 dark:border-gray-600/40 transition-[background-color,border-color] duration-300 shadow-lg"
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
                        className="block w-full text-left px-4 py-3 hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-colors duration-300"
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
              className="relative p-2.5 rounded-xl backdrop-blur-md bg-white/60 dark:bg-gray-800/60 hover:bg-white/80 dark:hover:bg-gray-700/80 border border-white/40 dark:border-gray-600/40 transition-[background-color,border-color] duration-300 shadow-lg overflow-hidden"
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
          <div className="md:hidden flex shrink-0 items-center gap-1.5">
            <button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-md dark:border-gray-600/40 dark:bg-gray-800/60"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
            </button>
            <button
              ref={mobileMenuButtonRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-white/40 bg-white/60 shadow-lg backdrop-blur-md transition-colors duration-300 dark:border-gray-600/40 dark:bg-gray-800/60"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-gray-800 transition-transform duration-300 ease-out dark:bg-gray-100 ${
                  mobileMenuOpen ? "translate-y-0 rotate-45" : "-translate-y-1.5 rotate-0"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-gray-800 transition-opacity duration-200 ease-out dark:bg-gray-100 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute h-0.5 w-5 rounded-full bg-gray-800 transition-transform duration-300 ease-out dark:bg-gray-100 ${
                  mobileMenuOpen ? "translate-y-0 -rotate-45" : "translate-y-1.5 rotate-0"
                }`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
            <div
              ref={mobileMenuRef}
              id="mobile-navigation"
              className={`md:hidden grid overflow-hidden rounded-2xl border bg-white/70 shadow-xl shadow-black/5 backdrop-blur-xl origin-top transition-[grid-template-rows,opacity,transform,margin,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-gray-900/70 ${
                mobileMenuOpen
                  ? "grid-rows-[1fr] my-2 border-white/30 opacity-100 translate-y-0 scale-100 pointer-events-auto dark:border-gray-700/30"
                  : "grid-rows-[0fr] my-0 border-transparent opacity-0 -translate-y-1 scale-[0.98] pointer-events-none dark:border-transparent"
              }`}
              aria-hidden={!mobileMenuOpen}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="space-y-1.5 p-3">
                  {sections.map(
                    (section) => (
                      <button
                        key={section}
                        onClick={() => scrollToSection(section)}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        className="block w-full text-start px-4 py-2.5 rounded-xl hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-colors duration-300"
                      >
                        {t(section)}
                      </button>
                    )
                  )}

                  <div className="mt-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => changeLanguage(lang.code)}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        className="block w-full text-start px-4 py-3 leading-6 rounded-xl hover:bg-linear-to-r hover:from-blue-500/20 hover:to-purple-500/20 transition-colors duration-300"
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
      </nav>
    </header>
  );
};
