/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ["Poppins", "sans-serif"],
      },
      borderRadius: {
        md: "0.3rem",
        sm: "0.2rem",
      },
      colors: {
        "primary-blue": {
          DEFAULT: "#0900b3",
          light: "#4b63de",
        },
        "secondary-gray": {
          DEFAULT: "#4d4d4d",
          light: "#808080",
        },
        background: {
          DEFAULT: "#f9fafb",
        },
        foreground: {
          DEFAULT: "#FFFFFF",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      keyframes: {
        dimPulse: {
          "0%, 100%": { opacity: 1, transform: "scale(1)" },
          "50%": { opacity: 0.3, transform: "scale(0.8)" },
        },
      },
      animation: {
        "dim-pulse": "dimPulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
