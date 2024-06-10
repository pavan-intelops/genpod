import { FastifyInstance } from 'fastify';

import {
  createProject,
  getAllProjects,
  getProject,
  updateProject
} from '../handlers/projectHandlers';

export async function projectRoutes(fastify: FastifyInstance) {
  fastify.post('/projects', createProject);
  fastify.put('/projects/:id', updateProject);
  fastify.get('/projects/:id', getProject);
  fastify.get('/projects', getAllProjects);
}
