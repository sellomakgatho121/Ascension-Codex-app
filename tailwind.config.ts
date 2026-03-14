import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xl: "1rem",
        "2xl": "1.5rem",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        cosmic: {
          50: "var(--cosmic-50)",
          100: "var(--cosmic-100)",
          200: "var(--cosmic-200)",
          300: "var(--cosmic-300)",
          400: "var(--cosmic-400)",
          500: "var(--cosmic-500)",
          600: "var(--cosmic-600)",
          700: "var(--cosmic-700)",
          800: "var(--cosmic-800)",
          900: "var(--cosmic-900)",
        },
        sacred: {
          gold: "var(--sacred-gold)",
          silver: "var(--sacred-silver)",
          violet: "var(--sacred-violet)",
          crystal: "var(--sacred-crystal)",
          emerald: "var(--sacred-emerald)",
        },
        "deep-indigo": {
          DEFAULT: "var(--deep-indigo)",
          light: "var(--deep-indigo-light)",
          dark: "var(--deep-indigo-dark)",
        },
        "dark-violet": {
          DEFAULT: "var(--dark-violet)",
          light: "var(--dark-violet-light)",
          dark: "var(--dark-violet-dark)",
        },
        "royal-purple": {
          DEFAULT: "var(--royal-purple)",
          light: "var(--royal-purple-light)",
          dark: "var(--royal-purple-dark)",
        },
        "slate-blue": {
          DEFAULT: "var(--slate-blue)",
          light: "var(--slate-blue-light)",
          dark: "var(--slate-blue-dark)",
        },
        "luminous-violet": {
          DEFAULT: "var(--luminous-violet)",
          light: "var(--luminous-violet-light)",
          dark: "var(--luminous-violet-dark)",
        },
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        anti: {
          void: "#0a0a0a",
          bg: "#050505",
          acid: "#39ff14",
          neon: "#ff006e",
          cyan: "#00f0ff",
          glitch: "#ff0033",
          static: "#e8e8e8",
          yellow: "#ccff00",
          bruise: "#7b2dff",
          rust: "#ff6600",
        },
      },
      fontFamily: {
        header: ["Cinzel", "serif"],
        body: ["Open Sans", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "Courier New", "monospace"],
        sacred: ["Cinzel", "serif"],
        "anti-mono": ["Space Mono", "monospace"],
        "anti-display": ["Bebas Neue", "sans-serif"],
      },
      fontSize: {
        xs: ["var(--font-xs)", { lineHeight: "1.5" }],
        sm: ["var(--font-sm)", { lineHeight: "1.5" }],
        base: ["var(--font-base)", { lineHeight: "var(--line-height-base)" }],
        md: ["var(--font-md)", { lineHeight: "var(--line-height-base)" }],
        lg: ["var(--font-lg)", { lineHeight: "var(--line-height-base)" }],
        xl: ["var(--font-xl)", { lineHeight: "1.4" }],
        "2xl": ["var(--font-2xl)", { lineHeight: "1.3" }],
        "3xl": ["var(--font-3xl)", { lineHeight: "1.2" }],
        "4xl": ["var(--font-4xl)", { lineHeight: "1.1" }],
        "5xl": ["var(--font-5xl)", { lineHeight: "1.1" }],
        "6xl": ["var(--font-6xl)", { lineHeight: "1" }],
      },
      spacing: {
        xs: "var(--spacing-xs)",
        sm: "var(--spacing-sm)",
        md: "var(--spacing-md)",
        lg: "var(--spacing-lg)",
        xl: "var(--spacing-xl)",
        "2xl": "var(--spacing-2xl)",
        "3xl": "var(--spacing-3xl)",
        "4xl": "var(--spacing-4xl)",
        "5xl": "var(--spacing-5xl)",
      },
      backdropBlur: {
        glass: "16px",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        shimmer: {
          "0%, 100%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
        },
        glow: {
          from: {
            filter: "drop-shadow(0 0 5px currentColor)",
          },
          to: {
            filter: "drop-shadow(0 0 20px currentColor)",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-20px)",
          },
        },
        "slide-in": {
          from: {
            transform: "translateY(100%)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        shimmer: "shimmer 8s ease-in-out infinite",
        glow: "glow 3s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "slide-in": "slide-in 0.3s ease-out",
        "glitch-skew": "glitch-skew 0.4s ease infinite",
        "glitch-flicker": "glitch-flicker 3s ease infinite",
        "vhs-distort": "vhs-distort 0.5s ease infinite",
        "float-chaotic": "float-chaotic 8s ease-in-out infinite",
        "border-glitch": "border-glitch 0.5s linear infinite",
        "pulse-neon": "pulse-neon 2s ease infinite",
        "distort-wave": "distort-wave 4s ease infinite",
        "anti-marquee": "anti-marquee 20s linear infinite",
      },
      boxShadow: {
        glass: "var(--glass-shadow)",
        glow: "0 0 20px hsla(282, 100%, 41%, 0.3)",
        "glow-gold": "0 0 20px hsla(45, 95%, 65%, 0.3)",
        "glow-strong": "0 0 30px hsla(282, 100%, 41%, 0.5)",
      },
      transitionDuration: {
        fastest: "var(--anim-fastest)",
        fast: "var(--anim-fast)",
        medium: "var(--anim-medium)",
        slow: "var(--anim-slow)",
        slowest: "var(--anim-slowest)",
        epic: "var(--anim-epic)",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;