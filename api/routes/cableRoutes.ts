import { FastifyInstance } from 'fastify';
import { CreateCableUseCase } from '../../application/use-cases/createCable';
import { CableRepository } from '../../infrastructure/repositories/cableRepository';

const repo = new CableRepository();
const createCable = new CreateCableUseCase(repo);

export function registerCableRoutes(server: FastifyInstance) {
  server.get('/cables', async (_request, reply) => {
    const cables = await repo.list();
    reply.send({ data: cables });
  });

  server.post('/cables', async (request, reply) => {
    const payload = request.body as any;
    const cable = await createCable.execute(payload);
    reply.code(201).send(cable);
  });
}
