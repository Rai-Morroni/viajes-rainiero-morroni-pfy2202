import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// Registra en el service worker del navegador las rutas mock definidas para la app.
export const worker = setupWorker(...handlers);