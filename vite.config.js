import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// El prefijo de producción debe coincidir con el nombre del repositorio de Pages.
// En desarrollo se usa la raíz para que las rutas y solicitudes mock sean simples.
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  base: mode === 'production' ? '/viajes-rainiero-morroni-pfy2202/' : '/',
}));