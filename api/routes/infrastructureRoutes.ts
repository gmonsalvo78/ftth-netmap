import { FastifyInstance } from 'fastify';
import { InfrastructureRepository } from '../../infrastructure/repositories/infrastructureRepository';

const repo = new InfrastructureRepository();

export function registerInfrastructureRoutes(server: FastifyInstance) {
  server.get('/map/nodes', async (_request, reply) => {
    reply.send({ data: await repo.listNodes() });
  });

  server.post('/map/nodes', async (request, reply) => {
    const node = await repo.createNode(request.body as any);
    reply.code(201).send(node);
  });

  server.get('/exports/kml', async (_request, reply) => {
    const payload = await repo.exportKml();
    reply.header('Content-Type', 'application/vnd.google-earth.kml+xml');
    reply.send(payload);
  });
}
