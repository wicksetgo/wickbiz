import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#111827",
        border: "#e5e7eb",
        input: "#e5e7eb",
        ring: "#395746",
        muted: "#f3f4f6",
        "muted-foreground": "#6b7280",
        primary: {
          DEFAULT: "#395746",
          foreground: "#f9fafb",
        },
        destructive: {
          DEFAULT: "#ef4444",
          foreground: "#f9fafb",
        },
      },
    },
  },
  plugins: [],
}

export default config