import { FastifyInstance } from 'fastify';

import {
  createProject,
  getAllProjects,
  getProject,
  getProjectSnapshots,
  updateProject
} from '../handlers/projectHandlers';
import { attachUser } from '../middleware/attachUser';
import { streamLLMResponse } from 'src/handlers/llmHandlerts';

export async function llmRoutes(fastify: FastifyInstance) {
  // attachUser
  // fastify.addHook('preHandler', (req, reply, done) => {
  //   attachUser(req, reply, done);
  // });
  fastify.get('/stream', streamLLMResponse);
}
