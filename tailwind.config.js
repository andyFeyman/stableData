/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}',],
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

/* 可以添加到你的全局样式中 */
.stats {
  @apply grid;
  grid-auto-flow: row dense;
}

.stats-horizontal {
  grid-auto-flow: column;
}

@media (max-width: 768px) {
  .stats-vertical {
      grid-auto-flow: row dense;
  }
}