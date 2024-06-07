import { FastifyInstance } from 'fastify';
import { createOrUpdateFile } from '../handlers/fileHandlers';

export const fileRoutes = async (fastify: FastifyInstance) => {
   fastify.addHook('preHandler', async (request, reply) => {
     if (!request.session.authenticated) {
       reply.status(401).send({ error: 'Unauthorized' });
     }
   });
  fastify.post('/create-file', createOrUpdateFile);
};
