/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  mode: 'jit',
  content: ['./src/**/*.{html,js,jsx,ts,tsx}','./*.{html,js,jsx}','./src/*.jsx'],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
  ],
  daisyui: {
    themes: ["light"],
  },
}

