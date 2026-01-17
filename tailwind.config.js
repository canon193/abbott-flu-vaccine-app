module.exports = {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(0, 0%, 85%)",
        input: "hsl(0, 0%, 85%)",
        ring: "hsl(28, 90%, 48%)",
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(230, 65%, 21%)",
        primary: {
          DEFAULT: "hsl(28, 90%, 48%)",
          foreground: "hsl(0, 0%, 100%)",
          hover: "hsl(28, 90%, 42%)",
          active: "hsl(28, 90%, 38%)",
        },
        secondary: {
          DEFAULT: "hsl(28, 100%, 95%)",
          foreground: "hsl(28, 90%, 48%)",
          hover: "hsl(28, 100%, 90%)",
          active: "hsl(28, 100%, 85%)",
        },
        tertiary: {
          DEFAULT: "hsl(210, 80%, 45%)",
          foreground: "hsl(0, 0%, 100%)",
        },
        accent: {
          DEFAULT: "hsl(33, 100%, 88%)",
          foreground: "hsl(28, 90%, 40%)",
        },
        success: {
          DEFAULT: "hsl(122, 39%, 49%)",
          foreground: "hsl(122, 40%, 98%)",
        },
        warning: {
          DEFAULT: "hsl(41, 100%, 45%)",
          foreground: "hsl(41, 100%, 98%)",
        },
        error: {
          DEFAULT: "hsl(2, 80%, 45%)",
          foreground: "hsl(2, 80%, 98%)",
        },
        info: {
          DEFAULT: "hsl(202, 100%, 39%)",
          foreground: "hsl(202, 100%, 97%)",
        },
        muted: {
          DEFAULT: "hsl(0, 0%, 95%)",
          foreground: "hsl(0, 0%, 45%)",
        },
        card: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(230, 65%, 21%)",
        },
        popover: {
          DEFAULT: "hsl(0, 0%, 100%)",
          foreground: "hsl(230, 65%, 21%)",
        },
        gray: {
          50: "hsl(0, 0%, 98%)",
          100: "hsl(0, 0%, 95%)",
          200: "hsl(0, 0%, 90%)",
          300: "hsl(0, 0%, 80%)",
          400: "hsl(0, 0%, 65%)",
          500: "hsl(0, 0%, 55%)",
          600: "hsl(0, 0%, 45%)",
          700: "hsl(0, 0%, 35%)",
          800: "hsl(0, 0%, 25%)",
          900: "hsl(0, 0%, 15%)",
        },
      },
      fontFamily: {
        sans: ['"DM Sans"', 'sans-serif'],
        body: ['"Lato"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      fontSize: {
        h1: ['28px', { lineHeight: '1.2', fontWeight: '600' }],
        h2: ['22px', { lineHeight: '1.2', fontWeight: '500' }],
        h3: ['18px', { lineHeight: '1.2', fontWeight: '500' }],
        h4: ['16px', { lineHeight: '1.4', fontWeight: '500' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        caption: ['12px', { lineHeight: '1.4', fontWeight: '400' }],
      },
      spacing: {
        '1': '4px',
        '2': '8px',
        '4': '16px',
        '6': '24px',
        '8': '32px',
        '12': '48px',
        '16': '64px',
        'xs': '8px',
        'sm': '16px',
        'md': '24px',
        'lg': '32px',
        'xl': '48px',
        '2xl': '64px',
      },
      borderRadius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        sm: '0 1px 3px hsla(0, 0%, 0%, 0.08)',
        md: '0 2px 6px hsla(0, 0%, 0%, 0.1)',
        lg: '0 4px 12px hsla(0, 0%, 0%, 0.15)',
        xl: '0 8px 24px hsla(28, 90%, 40%, 0.2)',
        'button-primary': '0 4px 12px hsla(28, 90%, 40%, 0.2)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, hsl(220, 60%, 25%) 0%, hsl(203, 90%, 42%) 100%)',
        'gradient-secondary': 'linear-gradient(135deg, hsl(28, 90%, 50%) 0%, hsl(28, 90%, 60%) 100%)',
        'gradient-accent': 'linear-gradient(135deg, hsl(210, 80%, 45%) 0%, hsl(203, 90%, 55%) 100%)',
      },
      transitionDuration: {
        fast: '100ms',
        normal: '300ms',
        slow: '600ms',
      },
      transitionTimingFunction: {
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 300ms ease-out',
        'slide-up': 'slide-up 300ms ease-out',
        'scale-in': 'scale-in 200ms ease-out',
        'pulse-ring': 'pulse-ring 1.5s ease-out infinite',
      },
    },
  },
  plugins: [],
};
