'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';
import { useTranslations } from 'next-intl';
import { portfolioSkills, type PortfolioLocale } from '@/data/skills';

const skillPresentation = [
  {
    title: { en: 'Nuxt.js', fa: 'Nuxt.js', ar: 'Nuxt.js' },
    logos: ['/img/skills/nuxt.svg'],
    brandColor: '#00DC82',
    softColor: 'rgba(0, 220, 130, 0.14)',
    core: true,
    items: { en: 'Server Side Rendering', fa: 'رندر سمت سرور', ar: 'عرض من جانب الخادم' },
  },
  {
    title: { en: 'Vue.js', fa: 'Vue.js', ar: 'Vue.js' },
    logos: ['/img/skills/vue.svg'],
    brandColor: '#42B883',
    softColor: 'rgba(66, 184, 131, 0.14)',
    core: true,
    items: { en: 'Progressive Framework', fa: 'فریم‌ورک پیشرو', ar: 'إطار تقدمي' },
  },
  {
    title: { en: 'Tailwind CSS', fa: 'Tailwind CSS', ar: 'Tailwind CSS' },
    logos: ['/img/skills/tailwind.svg'],
    brandColor: '#38BDF8',
    softColor: 'rgba(56, 189, 248, 0.14)',
    core: true,
    items: { en: 'Utility-First CSS', fa: 'سی‌اس‌اس ابزار محور', ar: 'CSS قائم على الأدوات' },
  },
  {
    title: { en: 'JavaScript', fa: 'JavaScript', ar: 'JavaScript' },
    logos: ['/img/skills/javascript.svg'],
    brandColor: '#F7DF1E',
    softColor: 'rgba(247, 223, 30, 0.16)',
    core: true,
    items: { en: 'ES6+ & Modern JS', fa: 'ES6+ و جاوااسکریپت مدرن', ar: 'ES6+ و JavaScript الحديث' },
  },
  {
    title: { en: 'AI Coding Tools', fa: 'ابزارهای AI کدنویسی', ar: 'أدوات الذكاء الاصطناعي للبرمجة' },
    logos: ['/img/skills/openai.svg'],
    brandColor: '#10A37F',
    softColor: 'rgba(16, 163, 127, 0.13)',
    items: { en: 'Codex, ChatGPT & AI Workflows', fa: 'Codex، ChatGPT و جریان‌کارهای AI', ar: 'Codex و ChatGPT وسير عمل AI' },
  },
  {
    title: { en: 'Next.js', fa: 'Next.js', ar: 'Next.js' },
    logos: ['/img/skills/next.svg'],
    brandColor: '#111827',
    softColor: 'rgba(17, 24, 39, 0.1)',
    items: { en: 'React Framework', fa: 'فریم‌ورک ری‌اکت', ar: 'إطار React' },
  },
  {
    title: { en: 'React', fa: 'React', ar: 'React' },
    logos: ['/img/skills/react.svg'],
    brandColor: '#61DAFB',
    softColor: 'rgba(97, 218, 251, 0.14)',
    items: { en: 'Component-Based UI', fa: 'رابط کامپوننت‌محور', ar: 'واجهة قائمة على المكونات' },
  },
  {
    title: { en: 'Svelte', fa: 'Svelte', ar: 'Svelte' },
    logos: ['/img/skills/svelte.svg'],
    brandColor: '#FF3E00',
    softColor: 'rgba(255, 62, 0, 0.13)',
    items: { en: 'Reactive Framework', fa: 'فریم‌ورک واکنش‌گرا', ar: 'إطار تفاعلي' },
  },
  {
    title: { en: 'HTML & CSS', fa: 'HTML و CSS', ar: 'HTML و CSS' },
    logos: ['/img/skills/html5.svg', '/img/skills/css3.svg'],
    brandColor: '#E34F26',
    softColor: 'rgba(227, 79, 38, 0.12)',
    items: { en: 'Semantic & Modern', fa: 'معنایی و مدرن', ar: 'دلالي وحديث' },
  },
  {
    title: { en: 'Git', fa: 'Git', ar: 'Git' },
    logos: ['/img/skills/git.svg'],
    brandColor: '#F05032',
    softColor: 'rgba(240, 80, 50, 0.13)',
    items: { en: 'Version Control', fa: 'کنترل نسخه', ar: 'التحكم في الإصدارات' },
  },
  {
    title: { en: 'Vite', fa: 'Vite', ar: 'Vite' },
    logos: ['/img/skills/vite.svg'],
    brandColor: '#646CFF',
    softColor: 'rgba(100, 108, 255, 0.13)',
    items: { en: 'Fast Build Tool', fa: 'ابزار بیلد سریع', ar: 'أداة بناء سريعة' },
  },
  {
    title: { en: 'Figma', fa: 'Figma', ar: 'Figma' },
    logos: ['/img/skills/figma.svg'],
    brandColor: '#A259FF',
    softColor: 'rgba(162, 89, 255, 0.12)',
    items: { en: 'Design Collaboration', fa: 'همکاری در طراحی', ar: 'التعاون في التصميم' },
  },
  {
    title: { en: 'Webpack', fa: 'Webpack', ar: 'Webpack' },
    logos: ['/img/skills/webpack.svg'],
    brandColor: '#8DD6F9',
    softColor: 'rgba(141, 214, 249, 0.14)',
    items: { en: 'Module Bundler', fa: 'باندلر ماژول', ar: 'حزم الوحدات' },
  },
  {
    title: { en: 'Pinia', fa: 'Pinia', ar: 'Pinia' },
    logos: ['/img/skills/pinia.svg'],
    brandColor: '#FFD859',
    softColor: 'rgba(255, 216, 89, 0.15)',
    items: { en: 'State Management', fa: 'مدیریت وضعیت', ar: 'إدارة الحالة' },
  },
  {
    title: { en: 'ESLint', fa: 'ESLint', ar: 'ESLint' },
    logos: ['/img/skills/eslint.svg'],
    brandColor: '#4B32C3',
    softColor: 'rgba(75, 50, 195, 0.13)',
    items: { en: 'Code Quality', fa: 'کیفیت کد', ar: 'جودة الكود' },
  },
  {
    title: { en: 'UnoCSS', fa: 'UnoCSS', ar: 'UnoCSS' },
    logos: ['/img/skills/unocss.svg'],
    brandColor: '#333333',
    softColor: 'rgba(51, 51, 51, 0.1)',
    items: { en: 'Atomic CSS Engine', fa: 'موتور CSS اتمیک', ar: 'محرك CSS ذري' },
  },
];

const skills = skillPresentation.map((skill, index) => ({
  ...skill,
  title: portfolioSkills[index] ?? skill.title,
}));

export const SkillsSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations();
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [networkVisible, setNetworkVisible] = React.useState(false);
  const [lines, setLines] = React.useState<Array<{ id: string; d: string; toIndex: number; duration: number }>>([]);
  const [overlaySize, setOverlaySize] = React.useState({ width: 0, height: 0 });
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const clearTimerRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const visibleSkills = skills;
  const relations: Record<number, number[]> = React.useMemo(
    () => ({
      0: [1, 4, 5, 13],
      1: [0, 4, 5, 13, 15],
      2: [4, 5, 6, 8, 15],
      3: [4, 5, 6, 8, 9, 10, 12, 14],
      4: [0, 1, 2, 3, 5, 6, 9, 10, 14],
      5: [0, 1, 2, 4, 6, 9],
      6: [2, 3, 4, 5, 14],
      7: [3, 8, 15],
      8: [2, 3, 7, 11, 15],
      9: [3, 4, 5, 10, 14],
      10: [3, 4, 5, 9, 12],
      11: [2, 8, 15],
      12: [3, 5, 10],
      13: [0, 1, 6],
      14: [3, 4, 5, 6],
      15: [1, 2, 7, 8, 11],
    }),
    []
  );

  const connectedIndexes = React.useMemo(
    () => new Set(lines.map((line) => line.toIndex)),
    [lines]
  );

  const updateOverlaySize = React.useCallback(() => {
    const rect = gridRef.current?.getBoundingClientRect();
    if (!rect) return;
    setOverlaySize({ width: rect.width, height: rect.height });
  }, []);

  const getCenterInGrid = React.useCallback((element: HTMLDivElement, gridRect: DOMRect) => {
    const rect = element.getBoundingClientRect();
    return {
      x: rect.left - gridRect.left + rect.width / 2,
      y: rect.top - gridRect.top + rect.height / 2,
    };
  }, []);

  const makeCurvePath = React.useCallback(
    (from: { x: number; y: number }, to: { x: number; y: number }, seed: number) => {
      const dx = to.x - from.x;
      const dy = to.y - from.y;
      const distance = Math.hypot(dx, dy) || 1;
      const nx = -dy / distance;
      const ny = dx / distance;
      const bend = Math.min(48, 16 + distance * 0.12) * (seed % 2 === 0 ? 1 : -1);
      const cx = (from.x + to.x) / 2 + nx * bend;
      const cy = (from.y + to.y) / 2 + ny * bend;
      return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
    },
    []
  );

  const buildLines = React.useCallback(
    (sourceIndex: number) => {
      const grid = gridRef.current;
      const source = cardRefs.current[sourceIndex];
      if (!grid || !source) return [] as Array<{ id: string; d: string; toIndex: number; duration: number }>;

      const gridRect = grid.getBoundingClientRect();
      const from = getCenterInGrid(source, gridRect);
      const targetIndexes = (relations[sourceIndex] ?? []).filter((index) => index < visibleSkills.length);

      return targetIndexes
        .map((targetIndex, offset) => {
          const target = cardRefs.current[targetIndex];
          if (!target) return null;

          const to = getCenterInGrid(target, gridRect);
          const d = makeCurvePath(from, to, sourceIndex + targetIndex + offset);

          return {
            id: `skills-line-${sourceIndex}-${targetIndex}`,
            d,
            toIndex: targetIndex,
            duration: 1.5 + ((sourceIndex + targetIndex + offset) % 3) * 0.35,
          };
        })
        .filter((line): line is { id: string; d: string; toIndex: number; duration: number } => Boolean(line));
    },
    [getCenterInGrid, makeCurvePath, relations, visibleSkills.length]
  );

  const scheduleRecalculate = React.useCallback(() => {
    if (rafRef.current !== null) return;
    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateOverlaySize();
      if (hoveredIndex !== null) {
        setLines(buildLines(hoveredIndex));
      }
    });
  }, [buildLines, hoveredIndex, updateOverlaySize]);

  React.useEffect(() => {
    updateOverlaySize();
    window.addEventListener('resize', scheduleRecalculate, { passive: true });
    window.addEventListener('scroll', scheduleRecalculate, { passive: true });

    return () => {
      window.removeEventListener('resize', scheduleRecalculate);
      window.removeEventListener('scroll', scheduleRecalculate);
      if (clearTimerRef.current !== null) {
        window.clearTimeout(clearTimerRef.current);
      }
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [scheduleRecalculate, updateOverlaySize]);

  React.useEffect(() => {
    if (hoveredIndex === null) return;
    scheduleRecalculate();
  }, [hoveredIndex, scheduleRecalculate]);

  const onHover = (index: number) => {
    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
    setHoveredIndex(index);
    setNetworkVisible(true);
  };

  const onLeave = () => {
    setHoveredIndex(null);
    setNetworkVisible(false);
    clearTimerRef.current = window.setTimeout(() => {
      setLines([]);
      clearTimerRef.current = null;
    }, 220);
  };

  const getCardClass = (index: number) => {
    if (hoveredIndex === null) {
      return 'opacity-100 scale-100';
    }
    if (index === hoveredIndex) {
      return 'z-20 opacity-100 scale-[1.04] border-cyan-300/70 shadow-[0_0_45px_-20px_rgba(34,211,238,0.95)]';
    }
    if (connectedIndexes.has(index)) {
      return 'opacity-100 border-fuchsia-300/60 shadow-[0_0_45px_-22px_rgba(232,121,249,0.85)]';
    }
    return 'opacity-35';
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 text-2xl sm:text-3xl lg:text-4xl">
            {t('skillsTitle')}
          </h2>
          <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base">
            {t('skillsSubtitle')}
          </p>
        </div>

        <div ref={gridRef} className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" onMouseLeave={onLeave}>
          <svg
            className={`pointer-events-none absolute inset-0 z-30 h-full w-full overflow-visible transition-opacity duration-200 ${networkVisible ? 'opacity-100' : 'opacity-0'}`}
            viewBox={`0 0 ${overlaySize.width} ${overlaySize.height}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="skills-network-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
              <filter id="skills-network-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur stdDeviation="3.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {lines.map((line) => (
              <g key={line.id}>
                <path
                  id={line.id}
                  d={line.d}
                  pathLength={1}
                  fill="none"
                  stroke="url(#skills-network-gradient)"
                  strokeWidth={1.8}
                  strokeLinecap="round"
                  filter="url(#skills-network-glow)"
                  className="skills-network-line"
                />
                <circle r="2.8" fill="#a5f3fc" opacity={0.95} filter="url(#skills-network-glow)">
                  <animateMotion dur={`${line.duration}s`} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${line.id}`} />
                  </animateMotion>
                </circle>
              </g>
            ))}
          </svg>

          {visibleSkills.map((skill, index) => {
            const logoAlt = `${skill.title.en} logo`;
            return (
              <div
                key={index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                onMouseEnter={() => onHover(index)}
                style={{
                  borderColor: skill.core ? skill.brandColor : `${skill.brandColor}55`,
                  boxShadow: skill.core ? `0 18px 45px -28px ${skill.brandColor}` : undefined,
                }}
                className={`group relative z-0 flex min-h-32 flex-col items-center justify-center bg-white/45
                p-4 rounded-2xl border dark:bg-gray-800/45
                hover:shadow-xl transition-all duration-300
                ${skill.core ? 'min-h-36 ring-1 dark:ring-white/10' : ''}
                ${getCardClass(index)}`}
              >
                {skill.core && (
                  <span
                    style={{
                      borderColor: `${skill.brandColor}88`,
                      color: skill.brandColor,
                      backgroundColor: skill.softColor,
                    }}
                    className="absolute right-3 top-3 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider shadow-sm backdrop-blur dark:bg-gray-950/70"
                  >
                    Core
                  </span>
                )}
                <div
                  style={{
                    backgroundColor: skill.softColor,
                    borderColor: `${skill.brandColor}55`,
                  }}
                  className={`mb-3 flex h-14 w-14 items-center justify-center rounded-xl border bg-white/80 p-2.5 shadow-sm dark:bg-white/90 ${skill.logos.length > 1 ? '-space-x-1' : ''}`}
                >
                  {skill.logos.map((logo) => (
                    <img
                      key={logo}
                      src={logo}
                      alt={logoAlt}
                      className={`${skill.logos.length > 1 ? 'h-7 w-7' : 'h-9 w-9'} object-contain`}
                      loading="lazy"
                    />
                  ))}
                </div>
                <h3 className="mb-1 text-gray-900 dark:text-white text-sm font-semibold">
                  {skill.title[locale as PortfolioLocale]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-[11px] text-center">
                  {skill.items[locale as PortfolioLocale]}
                </p>
              </div>
            );
          })}
        </div>

      </div>
      <style jsx>{`
        .skills-network-line {
          stroke-dasharray: 1;
          stroke-dashoffset: 1;
          animation: drawLine 0.6s ease forwards, pulseLine 2.2s ease-in-out infinite 0.6s;
        }

        @keyframes drawLine {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes pulseLine {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  );
};
