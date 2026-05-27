/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#000000',
          card: '#0A0A0A',
          dark: '#020203',
          border: '#1A1A1A'
        },
        gold: {
          DEFAULT: '#C4A67B',
          hover: '#B59E75',
          light: '#F1E3D3',
          dark: '#3A3225'
        },
        brand: {
          white: '#FFFFFF',
          darkText: '#1A1A1A'
        }
      },
      fontFamily: {
        sans: ['"Inter"', '"Plus Jakarta Sans"', 'sans-serif'],
        title: ['"Space Grotesk"', '"Syne"', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        mono: ['"Fira Code"', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      }
    },
  },
  plugins: [],
}
