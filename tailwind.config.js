/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          red:   '#000000',
          dark:  '#ECE7DE',
          brown: '#D9CFBF',
          amber: '#A7552F',
          cream: '#111111',
          gold:  '#929292',
        },
      },
      fontFamily: {
        display: ['Alegreya', 'Georgia', 'serif'],
        heading: ['Alegreya', 'Georgia', 'serif'],
        body:    ['Roboto', 'system-ui', 'sans-serif'],
        accent:  ['"Special Elite"', 'Georgia', 'serif'],
      },
      // ── Fix missing py-18 (used in section-padding) ──────
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        // safe-area insets for notched phones
        'safe-top':    'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left':   'env(safe-area-inset-left)',
        'safe-right':  'env(safe-area-inset-right)',
      },
      screens: {
        xs: '375px',
      },
      fontSize: {
        // Fluid hero heading — clamp so it never breaks on mobile
        'hero':    ['clamp(32px,9vw,84px)', { lineHeight: '0.92', letterSpacing: '-0.03em' }],
        'hero-sm': ['clamp(28px,7vw,64px)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn 0.8s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'float':      'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%':   { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card':    '0 2px 8px rgba(0,0,0,0.06), 0 8px 24px rgba(0,0,0,0.04)',
        'card-lg': '0 4px 16px rgba(0,0,0,0.08), 0 16px 48px rgba(0,0,0,0.06)',
        'panel':   '0 14px 30px rgba(0,0,0,0.06)',
        'lift':    '0 20px 60px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
