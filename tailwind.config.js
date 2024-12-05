/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
      },
      backdropBlur: {
        'md': '12px',
      },
      borderColor: {
        'white/10': 'rgba(255, 255, 255, 0.1)',
      },
      backgroundColor: {
        'black/30': 'rgba(0, 0, 0, 0.3)',
      }
    },
  },
  plugins: [],
  safelist: [
    'bg-gradient-to-br',
    'from-yellow-400',
    'to-orange-500',
    'from-blue-400',
    'to-purple-500',
    'text-yellow-400',
    'text-blue-400',
    'text-gray-400',
    'text-black',
  ]
}
