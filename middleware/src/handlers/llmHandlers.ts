import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';
import { CONSTANTS } from 'src/constants';

const setupResponseHeadersForStreaming = (
  reply: FastifyReply,
  llmResponse: any
) => {
  reply.raw.writeHead(llmResponse.status, {
    'Content-Type': llmResponse.headers['content-type'],
    'Transfer-Encoding': llmResponse.headers['transfer-encoding'],
    'Access-Control-Allow-Origin': CONSTANTS.FRONT_END_URL,
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
};

const handleStreamResponse = (
  llmResponse: any,
  reply: FastifyReply,
  request: FastifyRequest
) => {
  llmResponse.data.pipe(reply.raw);

  llmResponse.data.on('end', () => {
    reply.raw.end();
  });

  llmResponse.data.on('error', (err: unknown) => {
    reply.raw.writeHead(500);
    reply.raw.end('Internal Server Error');
    request.log.error(err);
  });
};

const streamTaskData = async (
  request: FastifyRequest,
  reply: FastifyReply,
  type: 'logs' | 'summary'
) => {
  try {
    const { nodeId, taskId } = request.params as {
      nodeId: string;
      taskId: string;
    };
    const llmResponse = await axios.get(
      `http://localhost:4000/${nodeId}/${taskId}/${type}`,
      {
        responseType: 'stream'
      }
    );

    setupResponseHeadersForStreaming(reply, llmResponse);
    handleStreamResponse(llmResponse, reply, request);
  } catch (error) {
    reply.raw.writeHead(500);
    reply.raw.end('Internal Server Error');
    request.log.error(error);
  }
};

export const streamLogForANodeTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await streamTaskData(request, reply, 'logs');
};

export const streamSummaryForANodeTask = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  await streamTaskData(request, reply, 'summary');
};

export const getAllTasksForANode = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const { nodeId } = request.params as {
      nodeId: string;
    };
    const tasksResponse = await axios.get(
      `http://localhost:4000/${nodeId}/tasks`
    );
    reply.send(tasksResponse.data);
  } catch (error) {
    reply.code(500).send('Internal Server Error');
    request.log.error(error);
  }
};
