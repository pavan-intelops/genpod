import { FastifyInstance } from 'fastify';
import { login, logout } from '../handlers/authHandlers';

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/login', login);
  fastify.post('/logout', logout);
};
