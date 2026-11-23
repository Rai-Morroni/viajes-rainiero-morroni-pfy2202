// Etiqueta compacta reutilizable. La variante controla el color semántico;
// si se recibe una variante desconocida, se utiliza el estilo azul por defecto.
export function Badge({ children, variante = 'azul' }) {
  const estilos = {
    azul: 'bg-sky-100 text-sky-800',
    verde: 'bg-emerald-100 text-emerald-800',
    amarillo: 'bg-amber-100 text-amber-800',
    rojo: 'bg-rose-100 text-rose-800',
    gris: 'bg-slate-100 text-slate-700',
  };

  return (
    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold ${estilos[variante] || estilos.azul}`}>
      {children}
    </span>
  );
}