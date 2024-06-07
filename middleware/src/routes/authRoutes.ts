import { FastifyInstance } from 'fastify';
import { register, login, logout } from '../handlers/authHandlers';

export const authRoutes = async (fastify: FastifyInstance) => {
  fastify.post('/register', register);
  fastify.post('/login', login);
  fastify.post('/logout', logout);
};
