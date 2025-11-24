import Fastify from 'fastify';
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import swaggerUI from '@fastify/swagger-ui';
import { registerCableRoutes } from './routes/cableRoutes';
import { registerSpliceRoutes } from './routes/spliceRoutes';
import { registerAuthRoutes } from './routes/authRoutes';
import { registerInfrastructureRoutes } from './routes/infrastructureRoutes';

const server = Fastify({ logger: true });

server.register(cors, { origin: true });

server.register(swagger, {
  openapi: {
    info: {
      title: 'FTTH-NETMAP API',
      version: '0.1.0'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  }
});
server.register(swaggerUI, { routePrefix: '/docs' });

server.decorate('auth', async (request: any, reply: any) => {
  // Placeholder auth verification for JWT or OAuth2 token exchange.
  const authHeader = request.headers.authorization as string | undefined;
  if (!authHeader) {
    reply.code(401).send({ message: 'Unauthorized' });
  }
});

registerAuthRoutes(server);
registerCableRoutes(server);
registerSpliceRoutes(server);
registerInfrastructureRoutes(server);

server.setErrorHandler((error, request, reply) => {
  server.log.error(error);
  reply.status(500).send({ message: 'Internal server error', detail: error.message });
});

server.listen({ port: 3333, host: '0.0.0.0' }).catch((err) => {
  server.log.error(err);
  process.exit(1);
});
