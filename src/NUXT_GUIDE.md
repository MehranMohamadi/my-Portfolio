# راهنمای تبدیل به Nuxt 3

این پروژه React را می‌توانید به Nuxt 3 تبدیل کنید. در زیر مراحل کامل آورده شده است:

## 1. ساختار پروژه Nuxt

```
nuxt-portfolio/
├── nuxt.config.ts
├── package.json
├── tsconfig.json
├── app.vue
├── pages/
│   └── index.vue
├── components/
│   ├── Header.vue
│   ├── IntroSection.vue
│   ├── SkillsSection.vue
│   ├── ProjectsSection.vue
│   ├── AboutSection.vue
│   ├── ContactSection.vue
│   ├── Footer.vue
│   └── Timeline.vue
├── composables/
│   └── useAppState.ts
├── assets/
│   └── css/
│       └── main.css
├── data/
│   └── translations.ts
└── public/
```

## 2. نصب Nuxt و پکیج‌های مورد نیاز

```bash
npx nuxi@latest init nuxt-portfolio
cd nuxt-portfolio
npm install

# نصب پکیج‌های اضافی
npm install @nuxtjs/tailwindcss
npm install @vueuse/motion
npm install @vueuse/core
npm install lucide-vue-next
```

## 3. فایل nuxt.config.ts

```typescript
export default defineNuxtConfig({
  devtools: { enabled: true },
  
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/motion/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  app: {
    head: {
      title: 'Portfolio - Modern & Minimal',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Modern portfolio website' }
      ],
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config',
  }
})
```

## 4. composables/useAppState.ts (جایگزین Context)

```typescript
export type Language = 'en' | 'fa' | 'ar';
export type Theme = 'light' | 'dark';

export const useAppState = () => {
  const language = useState<Language>('language', () => 'en');
  const theme = useState<Theme>('theme', () => 'light');

  const isRTL = computed(() => language.value === 'fa' || language.value === 'ar');

  const setLanguage = (lang: Language) => {
    language.value = lang;
    if (process.client) {
      document.documentElement.dir = isRTL.value ? 'rtl' : 'ltr';
      document.documentElement.lang = lang;
      localStorage.setItem('language', lang);
    }
  };

  const setTheme = (newTheme: Theme) => {
    theme.value = newTheme;
    if (process.client) {
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', newTheme);
    }
  };

  // Initialize from localStorage
  onMounted(() => {
    if (process.client) {
      const savedLang = localStorage.getItem('language') as Language;
      const savedTheme = localStorage.getItem('theme') as Theme;
      
      if (savedLang) setLanguage(savedLang);
      if (savedTheme) setTheme(savedTheme);
    }
  });

  return {
    language,
    theme,
    isRTL,
    setLanguage,
    setTheme
  };
};
```

## 5. مثال تبدیل کامپوننت: Header.vue

```vue
<template>
  <header class="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50">
    <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-bold text-xl">
            Portfolio
          </span>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center gap-8">
          <button
            v-for="item in navItems"
            :key="item.id"
            @click="scrollToSection(item.id)"
            class="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {{ t[item.key] }}
          </button>
        </div>

        <!-- Theme Toggle & Language Switcher -->
        <div class="hidden md:flex items-center gap-3">
          <!-- Language Switcher -->
          <div class="relative">
            <button
              @click="langMenuOpen = !langMenuOpen"
              class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Change language"
            >
              <Globe :size="20" />
            </button>
            
            <div
              v-if="langMenuOpen"
              class="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden min-w-[120px]"
            >
              <button
                v-for="lang in languages"
                :key="lang.code"
                @click="() => { setLanguage(lang.code); langMenuOpen = false; }"
                :class="[
                  'block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors',
                  language === lang.code ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : ''
                ]"
              >
                {{ lang.name }}
              </button>
            </div>
          </div>

          <!-- Theme Toggle -->
          <button
            @click="setTheme(theme === 'light' ? 'dark' : 'light')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            <Moon v-if="theme === 'light'" :size="20" />
            <Sun v-else :size="20" />
          </button>
        </div>

        <!-- Mobile Menu Button -->
        <div class="md:hidden flex items-center gap-2">
          <button
            @click="setTheme(theme === 'light' ? 'dark' : 'light')"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            aria-label="Toggle theme"
          >
            <Moon v-if="theme === 'light'" :size="20" />
            <Sun v-else :size="20" />
          </button>
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
            aria-label="Toggle menu"
          >
            <X v-if="mobileMenuOpen" :size="24" />
            <Menu v-else :size="24" />
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div v-if="mobileMenuOpen" class="md:hidden py-4 space-y-2">
        <button
          v-for="item in navItems"
          :key="item.id"
          @click="scrollToSection(item.id)"
          class="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          {{ t[item.key] }}
        </button>
        
        <!-- Mobile Language Switcher -->
        <div class="pt-2 border-t border-gray-200 dark:border-gray-700">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="() => { setLanguage(lang.code); mobileMenuOpen = false; }"
            :class="[
              'block w-full text-left px-4 py-2 rounded-lg transition-colors',
              language === lang.code
                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            ]"
          >
            {{ lang.name }}
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Menu, X, Sun, Moon, Globe } from 'lucide-vue-next';
import { translations } from '~/data/translations';

const { language, theme, setLanguage, setTheme } = useAppState();
const mobileMenuOpen = ref(false);
const langMenuOpen = ref(false);

const t = computed(() => translations[language.value]);

const navItems = [
  { id: 'home', key: 'home' },
  { id: 'skills', key: 'skills' },
  { id: 'projects', key: 'projects' },
  { id: 'about', key: 'about' },
  { id: 'contact', key: 'contact' },
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fa', name: 'فارسی' },
  { code: 'ar', name: 'العربية' },
];

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
    mobileMenuOpen.value = false;
  }
};
</script>
```

## 6. مثال با Motion: IntroSection.vue

```vue
<template>
  <section 
    id="home" 
    class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-20 pt-24"
  >
    <div class="max-w-6xl mx-auto w-full">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
        <!-- Text Content -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800 } }"
          class="space-y-4 sm:space-y-6 text-center lg:text-left order-2 lg:order-1"
        >
          <div class="space-y-2">
            <p
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 200 } }"
              class="text-blue-600 dark:text-blue-400 text-sm sm:text-base"
            >
              {{ t.introGreeting }}
            </p>
            <h1
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 300 } }"
              class="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl"
            >
              {{ t.introName }}
            </h1>
            <h2
              v-motion
              :initial="{ opacity: 0, y: 20 }"
              :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 400 } }"
              class="text-gray-700 dark:text-gray-300 text-xl sm:text-2xl lg:text-3xl"
            >
              {{ t.introTitle }}
            </h2>
          </div>
          
          <p
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 500 } }"
            class="text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 text-sm sm:text-base"
          >
            {{ t.introDescription }}
          </p>

          <div
            v-motion
            :initial="{ opacity: 0, y: 20 }"
            :enter="{ opacity: 1, y: 0, transition: { duration: 600, delay: 600 } }"
            class="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <button
              v-motion
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              @click="scrollToSection('projects')"
              class="group px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {{ t.viewWork }}
              <ArrowRight :size="16" class="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              v-motion
              :whileHover="{ scale: 1.05 }"
              :whileTap="{ scale: 0.95 }"
              @click="scrollToSection('contact')"
              class="px-6 py-3 backdrop-blur-sm bg-white/70 dark:bg-gray-800/70 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Mail :size="16" />
              {{ t.contactMe }}
            </button>
          </div>
        </div>

        <!-- Profile Card -->
        <div
          v-motion
          :initial="{ opacity: 0, x: 50 }"
          :enter="{ opacity: 1, x: 0, transition: { duration: 800, delay: 300 } }"
          class="flex justify-center order-1 lg:order-2"
        >
          <div class="relative group w-full max-w-sm">
            <!-- Gradient Background Blob -->
            <div
              v-motion
              :animate="{
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
              }"
              :transition="{
                duration: 8000,
                repeat: Infinity,
                ease: 'easeInOut',
              }"
              class="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl opacity-30 blur-2xl group-hover:opacity-40"
            ></div>
            
            <!-- Glass Card -->
            <div
              v-motion
              :whileHover="{ y: -10 }"
              class="relative backdrop-blur-xl bg-white/40 dark:bg-gray-800/40 p-6 sm:p-8 rounded-3xl border border-white/20 dark:border-gray-600/20 shadow-2xl"
            >
              <div class="relative">
                <!-- Profile Image -->
                <div
                  v-motion
                  :whileHover="{ scale: 1.05 }"
                  class="w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-2xl overflow-hidden ring-4 ring-white/50 dark:ring-gray-600/50 shadow-xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1655249481446-25d575f1c054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwb3J0cmFpdCUyMGJ1c2luZXNzfGVufDF8fHx8MTc2MzU4MDYwM3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Profile"
                    class="w-full h-full object-cover"
                  />
                </div>
                
                <!-- Decorative Elements -->
                <div
                  v-motion
                  :animate="{ rotate: 360 }"
                  :transition="{ duration: 20000, repeat: Infinity, ease: 'linear' }"
                  class="absolute -top-2 -right-2 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl opacity-60 blur-xl"
                ></div>
                <div
                  v-motion
                  :animate="{ rotate: -360 }"
                  :transition="{ duration: 15000, repeat: Infinity, ease: 'linear' }"
                  class="absolute -bottom-2 -left-2 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl opacity-60 blur-xl"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight, Mail } from 'lucide-vue-next';
import { translations } from '~/data/translations';

const { language } = useAppState();
const t = computed(() => translations[language.value]);

const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>
```

## 7. فایل data/translations.ts

این فایل را همان‌طور که هست کپی کنید، هیچ تغییری نیاز ندارد.

## 8. فایل assets/css/main.css

این فایل را از `/styles/globals.css` کپی کنید.

## 9. فایل app.vue (نقطه ورود اصلی)

```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
useHead({
  htmlAttrs: {
    dir: 'ltr',
    lang: 'en'
  }
})
</script>
```

## 10. فایل pages/index.vue

```vue
<template>
  <div class="min-h-screen">
    <Header />
    <main>
      <IntroSection />
      <SkillsSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Nuxt auto-imports components
</script>
```

## نکات مهم:

### تفاوت‌های اصلی React و Vue/Nuxt:

1. **JSX به Template**: از `<template>` به جای JSX استفاده کنید
2. **Hooks به Composables**: 
   - `useState` → `ref` یا `reactive`
   - `useEffect` → `watch` یا `watchEffect`
   - `useContext` → `useState` (Nuxt state management)
3. **Props**: به جای destructure، از `defineProps()` استفاده کنید
4. **Events**: به جای callback props، از `emit` استفاده کنید
5. **Motion**: 
   - `motion.div` → `<div v-motion>`
   - Props به directives تبدیل می‌شوند

### برای شروع:

```bash
# کلون پروژه و نصب
npx nuxi@latest init my-portfolio
cd my-portfolio
npm install

# نصب وابستگی‌ها
npm install @nuxtjs/tailwindcss @vueuse/motion @vueuse/core lucide-vue-next

# اجرا
npm run dev
```

سپس فایل‌ها را یکی یکی از React به Vue تبدیل کنید با استفاده از این راهنما.
