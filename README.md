# Viajes PFY

Aplicación web de una agencia de viajes desarrollada con React y Vite. Permite explorar destinos turísticos y consultar opciones simuladas de vuelos y hoteles mediante servicios REST y GraphQL.

## Demo

- **Aplicación desplegada:** [GitHub Pages](https://rai-morroni.github.io/viajes-rainiero-morroni-pfy2202/)

## Funcionalidades

- Página de inicio con acceso a la lista de destinos.
- Catálogo de destinos con búsqueda por ciudad o país.
- Vista de detalle con descripción, imagen y actividades populares.
- Consulta de vuelos y hoteles por destino.
- Estados de carga, error y resultados vacíos, con reintento en las solicitudes que lo admiten.
- Navegación SPA con rutas para inicio, catálogo, detalle y página inexistente.
- Datos interceptados localmente por Mock Service Worker (MSW), sin necesidad de un backend real.

## Stack tecnológico

- React 19
- Vite 8
- React Router
- Apollo Client 4 y GraphQL 16
- Mock Service Worker 2
- Tailwind CSS 3
- ESLint 10

## Arquitectura

La interfaz sigue una aproximación de Atomic Design. Cada nivel combina piezas del nivel inferior, mientras que las páginas coordinan los datos y la navegación:

- `src/components/atoms/`: `Badge` presenta etiquetas; `Spinner` comunica carga; `MensajeEstado` comunica resultados vacíos, información o errores y puede ofrecer reintento.
- `src/components/molecules/`: `TarjetaDestino`, `TarjetaVuelo` y `TarjetaHotel` presentan los datos de una entidad.
- `src/components/organisms/`: `CabeceraSitio` y `PieSitio` forman la navegación y el pie; `ListaDestinos`, `SeccionVuelos` y `SeccionHoteles` agrupan tarjetas y contemplan listas vacías.
- `src/components/templates/`: `PlantillaPrincipal` proporciona el marco compartido de las páginas.
- `src/pages/`: vistas asociadas a rutas. `Destinos` carga y filtra el catálogo; `DetalleDestino` reúne el detalle REST con las opciones GraphQL.
- `src/services/`: funciones de acceso REST, cliente Apollo y operación GraphQL.
- `src/mocks/`: datos de ejemplo y handlers MSW para REST y GraphQL.
- `src/App.jsx`: mapa de rutas; `src/main.jsx`: punto de entrada, inicialización de MSW y proveedores React.

### Flujo de datos

1. `src/main.jsx` inicia el worker de MSW y, una vez listo, monta React con `ApolloProvider`.
2. `src/App.jsx` selecciona la página según la URL.
3. La página de destinos llama a `obtenerDestinos()` (`src/services/destinosService.js`); el catálogo se filtra en el navegador mientras la persona escribe.
4. La página de detalle solicita en paralelo `obtenerDestinoPorId(id)` para los datos descriptivos y `OBTENER_OPCIONES_VIAJE` para vuelos y hoteles. Si cambia el ID de la ruta o se desmonta la página, se ignora la respuesta REST anterior.
5. MSW intercepta las solicitudes, simula latencia y responde con los datos de `src/mocks/data.js`.
6. La página pasa los resultados a los organismos y tarjetas, que muestran la información o los estados vacíos.

### Archivos de configuración y recursos

- `vite.config.js`: activa el plugin React y define la ruta base, necesaria para GitHub Pages.
- `tailwind.config.js` y `postcss.config.js`: indican dónde buscar clases de Tailwind y procesan las capas CSS.
- `eslint.config.js`: activa reglas generales, de React Hooks y React Refresh; excluye los archivos generados de `dist/` y el worker de MSW.
- `index.html`: documento HTML inicial y nodo donde se monta React.
- `src/index.css`: importa las capas de Tailwind. `src/App.css` conserva estilos de la plantilla original de Vite y no se importa en la aplicación.
- `public/mockServiceWorker.js`: worker generado por MSW; no editar manualmente. `public/favicon.svg` y `public/icons.svg` son recursos estáticos.
- `package.json`: dependencias y comandos npm. El manifiesto de MSW indica que el worker vive en `public/`.

## Servicios mock

### REST

- `GET /api/destinos`: obtiene la lista de destinos.
- `GET /api/destinos/:id`: obtiene el detalle de un destino.
- Los errores del detalle y la información no encontrada se resuelven mediante respuestas mock HTTP.

### GraphQL

- `POST /graphql`
- Operación: `ObtenerOpcionesViaje`
- Variable: `destinoId: ID!`
- Devuelve los vuelos y hoteles asociados al destino seleccionado.

MSW intercepta las solicitudes tanto en desarrollo como en producción. El worker se inicia antes de renderizar React y utiliza `public/mockServiceWorker.js`.

Los handlers simulan latencias para que se puedan observar los indicadores de carga. Las rutas REST responden con HTTP 404 cuando no existe un destino; el handler GraphQL expresa ese caso mediante un arreglo `errors` en el cuerpo de la respuesta.

## Datos de ejemplo y cómo ampliarlos

Los datos se mantienen en `src/mocks/data.js` como tres arreglos exportados. Los valores de `destinoId` deben coincidir con `id` de un destino:

| Colección | Campos principales |
| --- | --- |
| `destinos` | `id`, `nombre`, `pais`, `descripcion`, `actividadesPopulares`, `imagen` |
| `vuelos` | `id`, `destinoId`, `aerolinea`, `precio`, `fechaSalida`, `fechaRegreso`, `disponibilidad`, `escalas` |
| `hoteles` | `id`, `destinoId`, `nombre`, `precioNoche`, `estrellas`, `fechas`, `disponibilidad` |

Para agregar opciones a un destino, agrega registros a `vuelos` o `hoteles` con el mismo `destinoId`. Para agregar un nuevo campo que deba llegar a la interfaz, actualiza tanto los datos como el handler o la selección GraphQL y el componente que lo presenta. Los campos consultados por GraphQL deben coincidir con `src/services/queries.js`.

La información es estática y ficticia: no se reservan servicios ni se consulta disponibilidad comercial. Las imágenes de destinos usan URLs externas y los precios se presentan en USD.

## Presentación y estados

- Las páginas deciden qué estado presentar a partir de sus solicitudes: carga, error, contenido o lista vacía.
- El catálogo muestra un mensaje si la búsqueda no encuentra coincidencias. Si falla la carga, el botón **Reintentar** vuelve a solicitar el catálogo por REST.
- En el detalle, el error de la solicitud REST se presenta como destino no encontrado. La consulta de opciones GraphQL es independiente y ofrece reintento mediante `refetch` si falla.
- Las secciones de vuelos y hoteles muestran un mensaje específico cuando la consulta GraphQL finaliza correctamente pero no devuelve opciones.
- Los componentes reutilizables reciben datos y callbacks por props; no realizan solicitudes de red.
- Los enlaces y controles incluyen etiquetas accesibles, como nombres para la navegación, texto alternativo para imágenes y una región `role="status"` para la carga.

## Rutas de la aplicación

| Ruta | Vista |
| --- | --- |
| `/` | Inicio |
| `/destinos` | Catálogo y búsqueda |
| `/destinos/:id` | Detalle y opciones de viaje |
| `*` | Página no encontrada |

La aplicación está configurada para servir desde la raíz en desarrollo y desde `/viajes-rainiero-morroni-pfy2202/` en producción.

## Requisitos

- Node.js `^20.19.0` o `>=22.12.0`
- npm

## Instalación y ejecución local

```bash
git clone https://github.com/Rai-Morroni/viajes-rainiero-morroni-pfy2202.git
cd viajes-rainiero-morroni-pfy2202
npm install
npm run dev
```

Vite mostrará la URL local al iniciar el servidor de desarrollo, normalmente `http://localhost:5173`.

## Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia el servidor de desarrollo. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente el build de producción. |
| `npm run lint` | Ejecuta las reglas de ESLint sobre el proyecto. |
| `npm run deploy` | Publica el contenido de `dist/` en GitHub Pages. |

Para desplegar, primero se genera el build y después se publica:

```bash
npm run deploy
```

El script `predeploy` ejecuta automáticamente `npm run build` antes de `deploy`.

## Estructura principal

```text
.
├── index.html                 # Documento HTML y punto de montaje de React
├── package.json               # Dependencias y scripts npm
├── public/
│   ├── mockServiceWorker.js   # Worker generado por MSW (no editar)
│   ├── favicon.svg            # Icono del sitio
│   └── icons.svg              # Sprite de iconos estáticos
├── src/
│   ├── components/            # Componentes organizados por Atomic Design
│   ├── mocks/                 # Datos y handlers de Mock Service Worker
│   ├── pages/                 # Vistas vinculadas con las rutas
│   ├── services/              # Acceso REST y configuración/consulta GraphQL
│   ├── App.jsx                # Enrutamiento de la SPA
│   ├── index.css              # Capas globales de Tailwind
│   └── main.jsx               # Inicialización de servicios y montaje React
├── vite.config.js             # Configuración de Vite y ruta de despliegue
├── tailwind.config.js         # Archivos inspeccionados por Tailwind
├── postcss.config.js          # Procesamiento CSS
└── eslint.config.js           # Reglas y exclusiones de lint
```

`node_modules/` y `dist/` son directorios generados localmente: el primero contiene dependencias instaladas y el segundo el resultado del build.
