import { FastifyReply, FastifyRequest } from 'fastify';
import axios from 'axios';

export const streamLLMResponse = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const llmResponse = await axios.get('http://localhost:4000/llm', {
      responseType: 'stream'
    });

    reply.raw.writeHead(llmResponse.status, {
      'Content-Type': llmResponse.headers['content-type'],
      'Transfer-Encoding': llmResponse.headers['transfer-encoding'],
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    llmResponse.data.pipe(reply.raw);

    llmResponse.data.on('end', () => {
      reply.raw.end();
    });

    llmResponse.data.on('error', (err: unknown) => {
      reply.raw.writeHead(500);
      reply.raw.end('Internal Server Error');
      request.log.error(err);
    });
  } catch (error) {
    reply.raw.writeHead(500);
    reply.raw.end('Internal Server Error');
    request.log.error(error);
  }
};
