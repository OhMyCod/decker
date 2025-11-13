import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shadcn/ui system colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        },

        // Palette familiale DECKER
        gamboge: {
          DEFAULT: '#f0a202',
          50: '#feedc9',
          100: '#fedb94',
          200: '#fdc85e',
          300: '#fdb629',
          400: '#f0a202',
          500: '#f0a202',
          600: '#be7f02',
          700: '#8e5f01',
          800: '#5f4001',
          900: '#2f2000'
        },
        tangerine: {
          DEFAULT: '#f18805',
          50: '#fee7cb',
          100: '#fdcf97',
          200: '#fcb763',
          300: '#fb9f2f',
          400: '#f18805',
          500: '#f18805',
          600: '#c06b04',
          700: '#905003',
          800: '#603602',
          900: '#301b01'
        },
        cinnabar: {
          DEFAULT: '#d95d39',
          50: '#f7dfd8',
          100: '#f0beb0',
          200: '#e89e89',
          300: '#e17d61',
          400: '#d95d39',
          500: '#d95d39',
          600: '#b94423',
          700: '#8b331a',
          800: '#5d2212',
          900: '#2e1109'
        },
        oxford: {
          DEFAULT: '#0e1428',
          50: '#bcc6e7',
          100: '#798dd0',
          200: '#3e58b0',
          300: '#26376d',
          400: '#0e1428',
          500: '#0e1428',
          600: '#0c1121',
          700: '#090d19',
          800: '#060811',
          900: '#030408'
        },
        cambridge: {
          DEFAULT: '#7b9e89',
          50: '#e5ebe7',
          100: '#cad8d0',
          200: '#b0c4b8',
          300: '#95b1a0',
          400: '#7b9e89',
          500: '#7b9e89',
          600: '#5f816d',
          700: '#486152',
          800: '#304136',
          900: '#18201b'
        },

        // Couleurs sémantiques de la famille
        heritage: {
          DEFAULT: '#0e1428', // Oxford blue - pour l'histoire
          light: '#26376d',
          dark: '#030408'
        },
        warmth: {
          DEFAULT: '#f0a202', // Gamboge - pour les moments chaleureux
          light: '#fdb629',
          dark: '#8e5f01'
        },
        creativity: {
          DEFAULT: '#f18805', // Tangerine - pour les créations
          light: '#fb9f2f',
          dark: '#905003'
        },
        legacy: {
          DEFAULT: '#d95d39', // Cinnabar - pour les personnalités marquantes
          light: '#e17d61',
          dark: '#8b331a'
        },
        nature: {
          DEFAULT: '#7b9e89', // Cambridge - pour la continuité familiale
          light: '#95b1a0',
          dark: '#486152'
        }
      },

      // Typographie personnalisée
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'Consolas', 'monospace'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },

      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },

      // Espacements personnalisés
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '100': '25rem',
        '112': '28rem',
        '128': '32rem',
      },

      // Breakpoints responsive
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
      },

      // Border radius
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },

      // Animations et transitions
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          from: {
            opacity: '0'
          },
          to: {
            opacity: '1'
          }
        },
        'fade-out': {
          from: {
            opacity: '1'
          },
          to: {
            opacity: '0'
          }
        },
        'slide-in-from-top': {
          from: {
            transform: 'translateY(-100%)'
          },
          to: {
            transform: 'translateY(0)'
          }
        },
        'slide-in-from-bottom': {
          from: {
            transform: 'translateY(100%)'
          },
          to: {
            transform: 'translateY(0)'
          }
        },
        'slide-in-from-left': {
          from: {
            transform: 'translateX(-100%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        'slide-in-from-right': {
          from: {
            transform: 'translateX(100%)'
          },
          to: {
            transform: 'translateX(0)'
          }
        },
        'scale-in': {
          from: {
            transform: 'scale(0.95)',
            opacity: '0'
          },
          to: {
            transform: 'scale(1)',
            opacity: '1'
          }
        },
        'shimmer': {
          '0%': {
            backgroundPosition: '-200% 0'
          },
          '100%': {
            backgroundPosition: '200% 0'
          }
        }
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-in',
        'fade-out': 'fade-out 0.3s ease-out',
        'slide-in-top': 'slide-in-from-top 0.3s ease-out',
        'slide-in-bottom': 'slide-in-from-bottom 0.3s ease-out',
        'slide-in-left': 'slide-in-from-left 0.3s ease-out',
        'slide-in-right': 'slide-in-from-right 0.3s ease-out',
        'scale-in': 'scale-in 0.2s ease-out',
        'shimmer': 'shimmer 2s infinite linear',
      },

      // Transitions personnalisées
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
