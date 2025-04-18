/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "slide-in": {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-360deg)" },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%",
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
        "gradient-xy": {
          "0%, 100%": {
            "background-size": "400% 400%",
            "background-position": "left center",
          },
          "25%": {
            "background-size": "300% 300%",
            "background-position": "center top",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
          "75%": {
            "background-size": "300% 300%",
            "background-position": "center bottom",
          },
        },
      },
      animation: {
        "slide-in": "slide-in 0.3s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        spin: "spin 1s linear infinite",
        "spin-slow": "spin-slow 1.5s linear infinite",
        aurora: "aurora 60s linear infinite",
        "gradient-xy": "gradient-xy 8s ease infinite",
        "gradient-xy-slow": "gradient-xy 12s ease infinite reverse",
        "gradient-xy-slower": "gradient-xy 15s linear infinite",
      },
      spacing: {
        "safe-area":
          "calc(var(--tg-content-safe-area-inset-top) + var(--tg-safe-area-inset-top))",
        "safe-area-inset": "var(--tg-safe-area-inset-top)",
        "safe-area-content": "var(--tg-content-safe-area-inset-top)",
      },
      colors: {
        primary: "#142947",
        secondary: "#0C1E3C",
        border: "#00D26A",
        textPrimary: "#FFFFFF",
        textAccent: "#00D26A",
        textSecondary: "#B0BEC5 ",
      },
      boxShadow: {
        "card-light":
          "0 0 0 2px rgba(0,0,0,.03), 0 2px 4px rgba(0,0,0,.05), 0 12px 24px rgba(0,0,0,.05)",
        "card-dark":
          "0 0 0 1px rgba(255,255,255,.05), 0 2px 4px rgba(0,0,0,.2), 0 12px 24px rgba(0,0,0,.2)",
        "card-sm-light":
          "0 0 0 2px rgba(0,0,0,.03), 0 1px 2px rgba(0,0,0,.05), 0 4px 8px rgba(0,0,0,.05)",
        "card-sm-dark":
          "0 0 0 1px rgba(255,255,255,.05), 0 1px 2px rgba(0,0,0,.1), 0 4px 8px rgba(0,0,0,.1)",
      },
    },
  },
  plugins: [],
};
