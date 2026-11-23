// Define las rutas de la SPA. El basename permite que las mismas rutas funcionen
// bajo la raíz en desarrollo y bajo el subdirectorio de GitHub Pages en producción.
import { BrowserRouter, Routes, Route } from 'react-router';
import { Inicio } from './pages/Inicio';
import { Destinos } from './pages/Destinos';
import { DetalleDestino } from './pages/DetalleDestino';
import { NoEncontrado } from './pages/NoEncontrado';

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        {/* Las rutas específicas se declaran antes del comodín para conservar su prioridad. */}
        <Route path="/" element={<Inicio />} />
        <Route path="/destinos" element={<Destinos />} />
        <Route path="/destinos/:id" element={<DetalleDestino />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
    </BrowserRouter>
  );
}