function withOpacity(variableName:string) {
  return ({ opacityValue }:{opacityValue:any}) => {
    if (opacityValue !== undefined) {
      return `rgba(var(${variableName}), ${opacityValue})`;
    }
    return `rgb(var(${variableName}))`;
  };
}

import { fontFamily } from "tailwindcss/defaultTheme";
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
      colors: {
        skin: {
          primary: withOpacity("--primary"),
          // secondary: withOpacity("--secondary"),
          accent: withOpacity("--accent"),
          neutral: withOpacity("--neutral"),
          white: withOpacity("--white"),
        },
        tm:{
          dashboard :{
            white:"#fcfcfd",
            gray:"#E4E4E4",
            dark:"#303644"

          }
        },
        dashboard: {
          primary: "#00728d",

          dark: "#393a3e",
          blue: "#0e0c28",
          green: "#1d2939",
          red: "#fa0101",
          nav_item_bg: "#5184b1",

          gra_end: "#3e453e",
          gra_start: "#7ed956",
          // gra_end:"#232b4c",
          // gra_start: "#00718c",

          btn_green: "#057884",
          btn_green_end: "#35bd41",
        },
        auth: {
          gray: "#71748d",
          blue: "#5969ff",
          red: "#dc3545",
          hover_color: "#0069d9",
          facebook_blue: "#3c73df",
          twitter_blue: "#2caeff",
          border_color: "#d2d2e4",
          title_color: "#3d405c",
        },
        product: {
          blue: "#2ed573",
          gold: "#ff6348",
        },
        dpage: {
          gray: "#e9e8f0",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
