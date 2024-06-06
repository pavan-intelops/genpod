import { FastifyInstance } from 'fastify';
import { createOrUpdateFile } from '../handlers/fileHandlers';

export const fileRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/create-file', createOrUpdateFile);
};
