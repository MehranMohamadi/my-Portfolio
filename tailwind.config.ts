import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        notoNaskh: ['NotoNaskh', 'serif'],
        iranYekan: ['IranYekan', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config