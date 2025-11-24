import { FastifyInstance } from 'fastify';
import { SpliceRepository } from '../../infrastructure/repositories/spliceRepository';
import { CreateSpliceUseCase } from '../../application/use-cases/createSplice';

const repo = new SpliceRepository();
const createSplice = new CreateSpliceUseCase(repo);

export function registerSpliceRoutes(server: FastifyInstance) {
  server.get('/splices', async (_request, reply) => {
    reply.send({ data: await repo.list() });
  });

  server.post('/splices', async (request, reply) => {
    const splice = await createSplice.execute(request.body as any);
    reply.code(201).send(splice);
  });

  server.post('/splices/:id/connect', async (request, reply) => {
    const { id } = request.params as { id: string };
    const { fiberId, splitterId } = request.body as { fiberId: string; splitterId: string };
    const updated = await repo.connectFiber(id, fiberId, splitterId);
    reply.send(updated);
  });
}
