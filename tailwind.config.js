module.exports = {
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // 'media' or 'class'
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {
      screens: {
        portrait: { raw: "(orientation: portrait)" },
      },
      colors: {
        "accent-1": "#333",
      },
      transformOrigin: {
        0: "0%",
      },
      zIndex: {
        "-1": "-1",
      },
      backgroundImage: (theme) => ({
        "search-input": "url('/icons/search.svg')",
      }),
      backgroundPosition: {
        "left-4": "left 0.8rem top 1rem",
        "top-2": "left 0.8rem top 0.7rem",
      },
    },
  },
  variants: {
    extend: {
      width: ["focus"],
      backgroundColor: ["disabled"],
      cursor: ["disabled"],
      opacity: ["group-hover"],
      translate: ["hover"],
    },
  },
  plugins: [],
};
