# Guía rápida para técnicos

## Crear caja de empalme desde el mapa
1. Abra la SPA y active la capa "Cajas de empalme".
2. Haga click en el mapa. Se envía un `POST /map/nodes` con lat/lng.
3. El backend crea la caja y devuelve el ID.
4. El módulo de empalmes crea un `SplicePlan` y lo muestra en el editor 2D.
5. Imprima o escanee el QR generado por el widget externo.

## Conectar fibra a splitter
1. Seleccione el splitter en el panel lateral del editor.
2. Seleccione la fibra libre en la lista.
3. Presione **Conectar**. Se llama a `POST /splices/{id}/connect`.
4. El historial registra el vínculo y la GUI marca la fibra como usada.

## Exportaciones
- Use `/exports/kml` para KML, o consulte `openapi.yaml` para JSON/Excel.

## Roles sugeridos
- **Admin**: gestiona usuarios y permisos.
- **Planner**: diseña la red y autoriza empalmes.
- **Técnico**: opera en terreno, usa QR y edita empalmes.
- **Auditor**: solo lectura, descarga reportes.
