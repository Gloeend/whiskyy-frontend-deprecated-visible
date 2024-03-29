/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.tsx",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontSize: {
      '13px': [".8125rem"],
      "17px": ["1.0625rem"],
      "18px": ["1.125rem"],
      "20px": ["1.25rem"],
      "22px": ["1.375rem"],
      "24px": ["1.5rem"],
      "26px": ["1.625rem"],
      "28px": ["1.75rem"],
      "31px": ["1.9375rem"],
      "48px": ["3rem"],
      "56px": ["3.5rem"]
    },
    extend: {},
  },
  plugins: [],
}

