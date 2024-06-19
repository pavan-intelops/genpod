import { FastifyInstance } from 'fastify';

import {
  getAllTasksForANode,
  streamLogForANodeTask,
  streamSummaryForANodeTask
} from 'src/handlers/llmHandlers';

export async function llmRoutes(fastify: FastifyInstance) {
  fastify.get('/:nodeId/tasks', getAllTasksForANode);
  fastify.get('/:nodeId/:taskId/summary', streamSummaryForANodeTask);
  fastify.get('/:nodeId/:taskId/logs', streamLogForANodeTask);
}
