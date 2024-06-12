import { FastifyInstance } from 'fastify';

import {
  createProject,
  getAllProjects,
  getProject,
  updateProject
} from '../handlers/projectHandlers';
import { attachUser } from '../middleware/attachUser';

export async function projectRoutes(fastify: FastifyInstance) {
  // attachUser
  fastify.addHook('preHandler', (req, reply, done) => {
    attachUser(req, reply, done);
  });
  fastify.post('/projects', createProject);
  fastify.put('/projects/:id', updateProject);
  fastify.get('/projects/:id', getProject);
  fastify.get('/projects', getAllProjects);
}
