import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';

export function registerAuthRoutes(server: FastifyInstance) {
  server.post('/auth/login', async (request, reply) => {
    const { username } = request.body as { username: string };
    const token = jwt.sign({ sub: username }, JWT_SECRET, { expiresIn: '1h' });
    reply.send({ access_token: token, token_type: 'Bearer', expires_in: 3600 });
  });

  server.get('/auth/profile', { preHandler: [server.auth as any] }, async (request, reply) => {
    reply.send({ user: { username: 'demo', roles: ['Admin'], permissions: ['map:write'] } });
  });
}
