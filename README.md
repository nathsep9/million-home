# Million Property Explorer

Aplicación Next.js para explorar propiedades con filtros y vista de detalle. Incluye UI con MUI, i18n (ES/EN), mocks con MSW y endpoints API internos para funcionar en recargas sin depender del worker.

## Tech stack
- Next.js 16 (App Router)
- React 19, TypeScript
- MUI 7 + Emotion (SSR de estilos)
- MSW 2 para mocking en desarrollo

## Ejecutar en local
1. Instalar dependencias:
   - `npm install`
2. Modo desarrollo:
   - `npm run dev` y abrir http://localhost:3000
3. Producción:
   - `npm run build` y `npm start`

Scripts disponibles: `dev`, `build`, `start`, `lint`.

## Rutas de la app
- `/about` — sección “Sobre nosotros”.
- `/buy` — listado con filtros (nombre, dirección, rango de precio).
- `/buy/[id]` — detalle de una propiedad.
- Legacy: `/properties` redirige a `/about` (y aliases a `/buy`).

## Filtros en “Buy”
- Name y Address con debounce.
- Price range con slider (aplica al soltar).

## API interna (siempre disponible)
Estos endpoints sirven datos de mock para garantizar que el reload funcione sin MSW.
- GET `/api/properties`
  - Query params opcionales: `name`, `address`, `minPrice`, `maxPrice`.
  - Respuesta: `{ items: PropertyDTO[] }`.
- GET `/api/properties/:id`
  - Respuesta: `PropertyDTO` o 404.

Fuente de datos mock: `src/app/mocks/data/ properties.mock.json` (nota: el archivo tiene un espacio inicial en el nombre del archivo por diseño).

## MSW (Mock Service Worker)
- Archivo del worker: `public/mockServiceWorker.js` (se versiona en el repo).
- En desarrollo, MSW puede interceptar `/api/*`. En producción normalmente no se inicia.
- La app seguirá funcionando sin MSW porque los endpoints API devuelven el mock.

##Demo
<img width="1557" height="1003" alt="image" src="https://github.com/user-attachments/assets/840d448b-507f-4bd0-ae52-0e5677189a3d" />

<img width="1557" height="1003" alt="image" src="https://github.com/user-attachments/assets/7aad3f3a-0cf7-416f-bcb9-b71d2066216a" />

<img width="1557" height="1003" alt="image" src="https://github.com/user-attachments/assets/ce38b9cb-6fec-4b2c-91aa-8d528bf3f2a6" />

<img width="1557" height="1003" alt="image" src="https://github.com/user-attachments/assets/21725043-f562-4873-bd2d-6cddcc8dfd63" />




