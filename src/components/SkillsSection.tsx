'use client';

import React from 'react';
import { useApp } from '../contexts/AppContext';
import {
  Code2, Wind, Component, FileCode, Sparkles, FileType,
  Github, Package, Figma, Boxes, Store, Layers, Atom,
  CheckCircle, Paintbrush
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const skills = [
  {
    icon: FileCode,
    title: { en: 'Nuxt.js', fa: 'Nuxt.js', ar: 'Nuxt.js' },
    items: { en: 'Server Side Rendering', fa: 'رندر سمت سرور', ar: 'عرض من جانب الخادم' },
    color: 'from-green-500 to-emerald-500',
    shadowColor: 'shadow-green-500/40',
  },
  {
    icon: Component,
    title: { en: 'Vue.js', fa: 'Vue.js', ar: 'Vue.js' },
    items: { en: 'Progressive Framework', fa: 'فریم‌ورک پیشرو', ar: 'إطار تقدمي' },
    color: 'from-green-600 to-teal-500',
    shadowColor: 'shadow-green-600/40',
  },
  {
    icon: Wind,
    title: { en: 'Tailwind CSS', fa: 'Tailwind CSS', ar: 'Tailwind CSS' },
    items: { en: 'Utility-First CSS', fa: 'سی‌اس‌اس ابزار محور', ar: 'CSS قائم على الأدوات' },
    color: 'from-cyan-500 to-blue-500',
    shadowColor: 'shadow-cyan-500/40',
  },
  {
    icon: Layers,
    title: { en: 'Next.js', fa: 'Next.js', ar: 'Next.js' },
    items: { en: 'React Framework', fa: 'فریم‌ورک ری‌اکت', ar: 'إطار React' },
    color: 'from-neutral-700 to-black',
    shadowColor: 'shadow-neutral-700/40',
  },
  {
    icon: Atom,
    title: { en: 'React', fa: 'React', ar: 'React' },
    items: { en: 'Component-Based UI', fa: 'رابط کامپوننت‌محور', ar: 'واجهة قائمة على المكونات' },
    color: 'from-cyan-400 to-blue-600',
    shadowColor: 'shadow-cyan-400/40',
  },
  {
    icon: Code2,
    title: { en: 'JavaScript', fa: 'JavaScript', ar: 'JavaScript' },
    items: { en: 'ES6+ & Modern JS', fa: 'ES6+ و جاوااسکریپت مدرن', ar: 'ES6+ و JavaScript الحديث' },
    color: 'from-yellow-500 to-orange-500',
    shadowColor: 'shadow-yellow-500/40',
  },
  {
    icon: Sparkles,
    title: { en: 'Svelte', fa: 'Svelte', ar: 'Svelte' },
    items: { en: 'Reactive Framework', fa: 'فریم‌ورک واکنش‌گرا', ar: 'إطار تفاعلي' },
    color: 'from-orange-600 to-red-500',
    shadowColor: 'shadow-orange-600/40',
  },
  {
    icon: FileType,
    title: { en: 'HTML & CSS', fa: 'HTML و CSS', ar: 'HTML و CSS' },
    items: { en: 'Semantic & Modern', fa: 'معنایی و مدرن', ar: 'دلالي وحديث' },
    color: 'from-pink-500 to-purple-500',
    shadowColor: 'shadow-pink-500/40',
  },
  {
    icon: Github,
    title: { en: 'Git', fa: 'Git', ar: 'Git' },
    items: { en: 'Version Control', fa: 'کنترل نسخه', ar: 'التحكم في الإصدارات' },
    color: 'from-gray-700 to-gray-900',
    shadowColor: 'shadow-gray-700/40',
  },
  {
    icon: Package,
    title: { en: 'Vite', fa: 'Vite', ar: 'Vite' },
    items: { en: 'Fast Build Tool', fa: 'ابزار بیلد سریع', ar: 'أداة بناء سريعة' },
    color: 'from-purple-500 to-indigo-500',
    shadowColor: 'shadow-purple-500/40',
  },
  {
    icon: Figma,
    title: { en: 'Figma', fa: 'Figma', ar: 'Figma' },
    items: { en: 'Design Collaboration', fa: 'همکاری در طراحی', ar: 'التعاون في التصميم' },
    color: 'from-pink-500 to-rose-500',
    shadowColor: 'shadow-pink-500/40',
  },
  {
    icon: Boxes,
    title: { en: 'Webpack', fa: 'Webpack', ar: 'Webpack' },
    items: { en: 'Module Bundler', fa: 'باندلر ماژول', ar: 'حزم الوحدات' },
    color: 'from-blue-500 to-sky-500',
    shadowColor: 'shadow-blue-500/40',
  },
  {
    icon: Store,
    title: { en: 'Pinia', fa: 'Pinia', ar: 'Pinia' },
    items: { en: 'State Management', fa: 'مدیریت وضعیت', ar: 'إدارة الحالة' },
    color: 'from-yellow-400 to-amber-500',
    shadowColor: 'shadow-yellow-400/40',
  },
  {
    icon: CheckCircle,
    title: { en: 'ESLint', fa: 'ESLint', ar: 'ESLint' },
    items: { en: 'Code Quality', fa: 'کیفیت کد', ar: 'جودة الكود' },
    color: 'from-indigo-500 to-violet-600',
    shadowColor: 'shadow-indigo-500/40',
  },
  {
    icon: Paintbrush,
    title: { en: 'UnoCSS', fa: 'UnoCSS', ar: 'UnoCSS' },
    items: { en: 'Atomic CSS Engine', fa: 'موتور CSS اتمیک', ar: 'محرك CSS ذري' },
    color: 'from-teal-400 to-emerald-500',
    shadowColor: 'shadow-teal-400/40',
  },
];

export const SkillsSection: React.FC = () => {
  const { locale } = useApp();
  const t = useTranslations();
  const [showAll, setShowAll] = React.useState(false);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);
  const [networkVisible, setNetworkVisible] = React.useState(false);
  const [lines, setLines] = React.useState<Array<{ id: string; d: string; toIndex: number; duration: number }>>([]);
  const [overlaySize, setOverlaySize] = React.useState({ width: 0, height: 0 });
  const gridRef = React.useRef<HTMLDivElement | null>(null);
  const cardRefs = React.useRef<Array<HTMLDivElement | null>>([]);
  const clearTimerRef = React.useRef<number | null>(null);
  const rafRef = React.useRef<number | null>(null);

  const visibleSkills = showAll ? skills : skills.slice(0, 8);
  const relations: Record<number, number[]> = React.useMemo(
    () => ({
      0: [1, 3, 12],
      1: [0, 3, 12, 14],
      2: [3, 4, 7, 14],
      3: [0, 1, 2, 4, 8],
      4: [2, 3, 5, 13],
      5: [3, 4, 7, 8, 9, 11, 13],
      6: [5, 7, 14],
      7: [2, 5, 6, 10, 14],
      8: [3, 5, 9, 13],
      9: [3, 5, 8, 11],
      10: [2, 7, 14],
      11: [3, 5, 9],
      12: [0, 1, 4],
      13: [3, 4, 5],
      14: [1, 2, 6, 7, 10],
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
  }, [hoveredIndex, showAll, scheduleRecalculate]);

  const onHover = (index: number) => {
    if (clearTimerRef.current !== null) {
      window.clearTimeout(clearTimerRef.current);
      clearTimerRef.current = null;
    }
    setHoveredIndex(index);
    updateOverlaySize();
    setLines(buildLines(index));
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
    <section id="skills" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
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
            className={`pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible transition-opacity duration-200 ${networkVisible ? 'opacity-100' : 'opacity-0'}`}
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
            const Icon = skill.icon;
            return (
              <div
                key={index}
                ref={(element) => {
                  cardRefs.current[index] = element;
                }}
                onMouseEnter={() => onHover(index)}
                className={`group relative z-0 flex flex-col items-center justify-center bg-white/40 dark:bg-gray-800/40 
                p-4 rounded-2xl border border-white/20 dark:border-gray-600/20 
                hover:border-white/50 dark:hover:border-gray-500/50 transition-all duration-300 hover:shadow-xl ${skill.shadowColor} ${getCardClass(index)}`}
              >
                <div className={`mb-3 inline-flex p-3 rounded-xl bg-gradient-to-br ${skill.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="mb-1 text-gray-900 dark:text-white text-sm font-semibold">
                  {skill.title[locale]}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-[11px] text-center">
                  {skill.items[locale]}
                </p>
              </div>
            );
          })}
        </div>

        {skills.length > 8 && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setShowAll(v => !v)}
              className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {showAll ? t('showLess') : t('showMore')}
            </button>
          </div>
        )}
      </div>
      <style jsx>{`
        .skills-network-line {
          stroke-dasharray: 420;
          stroke-dashoffset: 420;
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
