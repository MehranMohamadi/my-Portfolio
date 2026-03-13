<template>
  <section class="relative w-full">
    <div ref="gridRef" class="relative grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <article
        v-for="(skill, index) in skills"
        :key="skill.id"
        :ref="(el) => setCardRef(el, index)"
        class="skill-card group relative rounded-2xl border border-cyan-400/20 bg-slate-900/70 p-5 backdrop-blur transition-all duration-300"
        :class="cardClass(index)"
        @mouseenter="onHover(index)"
        @mouseleave="onLeave"
      >
        <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400/20 to-fuchsia-500/20 text-cyan-300">
          <component :is="skill.icon" class="h-5 w-5" />
        </div>
        <h3 class="mb-1 text-base font-semibold text-white">{{ skill.title }}</h3>
        <p class="text-sm text-slate-300">{{ skill.description }}</p>
      </article>

      <svg
        class="pointer-events-none absolute inset-0 z-20 h-full w-full overflow-visible"
        :viewBox="`0 0 ${overlay.width} ${overlay.height}`"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="skills-link-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#22d3ee" />
            <stop offset="100%" stop-color="#ec4899" />
          </linearGradient>
          <filter id="skills-link-glow" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g class="transition-opacity duration-200" :class="networkVisible ? 'opacity-100' : 'opacity-0'">
          <template v-for="line in renderedLines" :key="line.id">
            <path
              :id="line.id"
              :d="line.path"
              fill="none"
              stroke="url(#skills-link-gradient)"
              stroke-width="1.8"
              stroke-linecap="round"
              filter="url(#skills-link-glow)"
              class="network-line"
            />
            <circle r="2.8" fill="#a5f3fc" filter="url(#skills-link-glow)" opacity="0.95">
              <animateMotion
                :dur="`${line.duration}s`"
                repeatCount="indefinite"
                rotate="auto"
                keyPoints="0;1"
                keyTimes="0;1"
              >
                <mpath :href="`#${line.id}`" />
              </animateMotion>
            </circle>
          </template>
        </g>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

type Skill = {
  id: string;
  title: string;
  description: string;
  icon: unknown;
  linksTo: string[];
};

type Point = { x: number; y: number };
type Line = { id: string; path: string; duration: number; toIndex: number };

const props = defineProps<{
  skills: Skill[];
}>();

const gridRef = ref<HTMLElement | null>(null);
const cardRefs = ref<(HTMLElement | null)[]>([]);
const hoveredIndex = ref<number | null>(null);
const overlay = ref({ width: 0, height: 0 });
const renderedLines = ref<Line[]>([]);
const networkVisible = ref(false);

let clearTimer: number | null = null;
let rafId: number | null = null;

const skillIndexMap = computed(() => {
  const map = new Map<string, number>();
  props.skills.forEach((skill, index) => map.set(skill.id, index));
  return map;
});

const connectedIndexes = computed(() => new Set(renderedLines.value.map((item) => item.toIndex)));

const cardClass = (index: number) => {
  if (hoveredIndex.value === null) {
    return 'opacity-100 scale-100 border-cyan-400/20';
  }

  if (hoveredIndex.value === index) {
    return 'z-30 scale-[1.035] opacity-100 border-cyan-300/70 shadow-[0_0_45px_-18px_rgba(34,211,238,0.95)]';
  }

  if (connectedIndexes.value.has(index)) {
    return 'opacity-100 border-fuchsia-300/55 shadow-[0_0_40px_-20px_rgba(217,70,239,0.85)]';
  }

  return 'opacity-35';
};

const setCardRef = (el: Element | null, index: number) => {
  cardRefs.value[index] = (el as HTMLElement | null) ?? null;
};

const updateOverlaySize = () => {
  const rect = gridRef.value?.getBoundingClientRect();
  if (!rect) return;
  overlay.value = { width: rect.width, height: rect.height };
};

const getCenterInGrid = (el: HTMLElement, gridRect: DOMRect): Point => {
  const rect = el.getBoundingClientRect();
  return {
    x: rect.left - gridRect.left + rect.width / 2,
    y: rect.top - gridRect.top + rect.height / 2,
  };
};

const makeCurvePath = (from: Point, to: Point, seed: number) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const distance = Math.hypot(dx, dy) || 1;
  const nx = -dy / distance;
  const ny = dx / distance;
  const bend = Math.min(52, 18 + distance * 0.1) * (seed % 2 === 0 ? 1 : -1);
  const cx = (from.x + to.x) / 2 + nx * bend;
  const cy = (from.y + to.y) / 2 + ny * bend;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
};

const buildConnections = (sourceIndex: number) => {
  const grid = gridRef.value;
  const source = cardRefs.value[sourceIndex];
  if (!grid || !source) return [];

  const gridRect = grid.getBoundingClientRect();
  const from = getCenterInGrid(source, gridRect);
  const sourceSkill = props.skills[sourceIndex];
  const lineList: Line[] = [];

  sourceSkill.linksTo.forEach((targetId, offset) => {
    const targetIndex = skillIndexMap.value.get(targetId);
    if (targetIndex === undefined) return;
    const targetEl = cardRefs.value[targetIndex];
    if (!targetEl) return;

    const to = getCenterInGrid(targetEl, gridRect);
    const path = makeCurvePath(from, to, sourceIndex + offset);

    lineList.push({
      id: `net-line-${sourceIndex}-${targetIndex}`,
      path,
      duration: 1.55 + (offset % 3) * 0.35,
      toIndex: targetIndex,
    });
  });

  return lineList;
};

const recalculate = () => {
  if (hoveredIndex.value === null) return;
  updateOverlaySize();
  renderedLines.value = buildConnections(hoveredIndex.value);
};

const scheduleRecalculate = () => {
  if (rafId !== null) return;
  rafId = requestAnimationFrame(() => {
    rafId = null;
    recalculate();
  });
};

const onHover = async (index: number) => {
  hoveredIndex.value = index;
  if (clearTimer) {
    window.clearTimeout(clearTimer);
    clearTimer = null;
  }
  await nextTick();
  updateOverlaySize();
  renderedLines.value = buildConnections(index);
  networkVisible.value = true;
};

const onLeave = () => {
  hoveredIndex.value = null;
  networkVisible.value = false;
  if (clearTimer) {
    window.clearTimeout(clearTimer);
  }
  clearTimer = window.setTimeout(() => {
    renderedLines.value = [];
    clearTimer = null;
  }, 220);
};

onMounted(() => {
  updateOverlaySize();
  window.addEventListener('resize', scheduleRecalculate, { passive: true });
  window.addEventListener('scroll', scheduleRecalculate, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', scheduleRecalculate);
  window.removeEventListener('scroll', scheduleRecalculate);
  if (clearTimer) window.clearTimeout(clearTimer);
  if (rafId !== null) cancelAnimationFrame(rafId);
});
</script>

<style scoped>
.network-line {
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
  animation: draw-line 0.6s ease forwards, pulse-line 2.2s ease-in-out infinite 0.6s;
}

@keyframes draw-line {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pulse-line {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}
</style>
