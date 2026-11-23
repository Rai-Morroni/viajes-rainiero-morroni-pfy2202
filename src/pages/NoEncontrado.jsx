import { Link } from 'react-router';
import { PlantillaPrincipal } from '../components/templates/PlantillaPrincipal';

// Vista de respaldo para cualquier URL que no corresponda a una ruta declarada.
export function NoEncontrado() {
  return (
    <PlantillaPrincipal>
      <div className="text-center py-16 space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">404</h1>
        <p className="text-slate-600">La página que buscas no existe.</p>
        <Link
          to="/"
          className="inline-block px-5 py-2.5 bg-sky-600 text-white font-semibold rounded-xl hover:bg-sky-700 transition"
        >
          Volver al inicio
        </Link>
      </div>
    </PlantillaPrincipal>
  );
}