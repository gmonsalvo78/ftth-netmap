# FTTH-NETMAP (esqueleto)

Prototipo API-first para documentación, planificación y gestión de redes FTTH con GIS y editor de empalmes.

## Estructura
- `core/`: entidades y contratos (Clean Architecture)
- `application/`: casos de uso
- `infrastructure/`: repositorios y migraciones SQL
- `api/`: Fastify REST + OpenAPI
- `web/`: SPA Vue 3 con mock de GIS y editor 2D
- `integrations/`: ejemplos para Yii 1.1 y paquete Laravel
- `docs/`: OpenAPI y guías rápidas

## Scripts
- `npm run dev:api` – inicia API en `:3333`
- `npm run dev:web` – sirve la SPA en `:4173`

Consulte `docs/INSTALL.md` para instalación y `docs/openapi.yaml` para la API.
