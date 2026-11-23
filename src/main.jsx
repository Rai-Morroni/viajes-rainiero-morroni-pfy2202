import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './services/apolloClient';
import './index.css';
import App from './App.jsx';

// Inicia MSW antes de montar React para que la primera solicitud de la interfaz
// ya pueda ser interceptada por los handlers locales.
async function enableMocking() {
  const { worker } = await import('./mocks/browser');
  return worker.start({
    serviceWorker: {
      url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
    },
    onUnhandledRequest: 'bypass',
  });
}

// Apollo y el router necesitan que el worker esté listo antes de renderizar.
enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </StrictMode>
  );
});