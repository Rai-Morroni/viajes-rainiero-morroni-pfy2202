import { Link, NavLink } from 'react-router';

export function CabeceraSitio() {
  const claseEnlace = ({ isActive }) =>
    `px-3 py-2 text-xs font-bold uppercase tracking-wider transition border-b-2 ${
      isActive
        ? 'border-[#D71920] text-white'
        : 'border-transparent text-neutral-300 hover:text-white'
    }`;

  return (
    <header className="bg-[#2b2b2b] text-white relative z-30 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          {/* Logo en bloque rojo sobresaliente */}
          <Link
            to="/"
            className="bg-[#D71920] text-white px-4 py-5 -mb-6 self-start shadow-md flex flex-col items-center justify-center leading-tight hover:bg-[#b5141a] transition"
          >
            <span className="text-lg font-serif font-bold tracking-wide">Viajes</span>
            <span className="text-[10px] uppercase tracking-widest opacity-90">PFY</span>
          </Link>

          <nav className="flex items-center gap-2" aria-label="Navegación principal">
            <NavLink to="/" end className={claseEnlace}>
              Inicio
            </NavLink>
            <NavLink to="/destinos" className={claseEnlace}>
              Destinos
            </NavLink>
          </nav>
        </div>

        <span className="hidden sm:inline text-xs font-semibold tracking-wider text-neutral-300 uppercase">
          CL · ES
        </span>
      </div>
    </header>
  );
}