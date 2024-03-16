/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            "fallout-yellow": "#cba240",
            "fallout-blue": "#8c92a6",
        }
    },
  },
  plugins: [],
}

