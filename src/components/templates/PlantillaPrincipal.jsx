import { CabeceraSitio } from '../organisms/CabeceraSitio';
import { PieSitio } from '../organisms/PieSitio';

// Estructura común de página: navegación, contenido variable y pie de sitio.
export function PlantillaPrincipal({ children, anchoCompleto = false }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#f7f7f7] text-neutral-900">
      <CabeceraSitio />
      <main className={anchoCompleto ? 'flex-1 w-full' : 'flex-1 max-w-6xl w-full mx-auto px-4 py-10'}>
        {children}
      </main>
      <PieSitio />
    </div>
  );
}