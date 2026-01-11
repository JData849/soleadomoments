import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF4E8",
        sand: "#D8CAB3",
        sand2: "#C8B497",
        brand: "#9E713B",
        brand2: "#AE8F68",
        ink: "#2A1E14",
        ink2: "#4A3726",
        line: "#E7DCC8",
      },
      borderRadius: {
        xl: "1.25rem",
        "2xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(42, 30, 20, 0.08)",
        float: "0 18px 50px rgba(42, 30, 20, 0.14)",
      },
    },
  },
  plugins: [],
} satisfies Config;
