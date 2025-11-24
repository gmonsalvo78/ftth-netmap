# Instalación rápida

1. **Requisitos**: Node 18+, Docker, PostgreSQL 14+.
2. **Backend**: `npm install` y `npm run dev:api` para entorno de prueba.
3. **Frontend**: `npm run dev:web` y abrir `http://localhost:4173`.
4. **Docker**: Cree un `.env` con `JWT_SECRET` y levante `docker-compose up` (script pendiente de agregar según su plataforma).
5. **Migraciones**: ejecute el SQL de `infrastructure/db/migrations/001_init.sql` en su base de datos.
6. **OpenAPI**: consulte `docs/openapi.yaml` o `/docs` cuando el backend esté corriendo.

Para integrar con Yii 1 use `integrations/yii1/NetmapWidget.php`. Para Laravel importe el paquete Composer y registre el `NetmapServiceProvider`.
