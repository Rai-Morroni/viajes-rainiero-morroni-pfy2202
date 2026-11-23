/** @type {import('tailwindcss').Config} */
// Tailwind busca clases en el HTML y los componentes fuente para generar solo
// las utilidades que realmente usa la interfaz.
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}