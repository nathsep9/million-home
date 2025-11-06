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

## Resolución de problemas
- 404 en `/api/properties` al recargar “Buy”: asegúrate de que los archivos existan en `src/app/api/properties/route.ts` y `src/app/api/properties/[id]/route.ts` y que el servidor esté corriendo.
- Estilos parpadean (FOUC): el proyecto ya inyecta estilos de Emotion en SSR vía `ThemeRegistry`.
- Imágenes: Next permite dominios de Unsplash en `next.config.ts`.

## Estructura (resumen)
```
src/
  app/
    about/
    buy/
      [id]/
    api/
      properties/
        [id]/route.ts
        route.ts
    mocks/
      data/
        properties.mock.json
    components/
    theme/
```

## Licencia
Uso interno/educativo.
