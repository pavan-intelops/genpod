import Fastify from 'fastify';
import cors from '@fastify/cors';
import { fileRoutes } from './routes/fileRoutes';
import { CONSTANTS } from './constants';
import logger from './logger';

const fastify = Fastify({
  logger: logger
});

// Add CORS as *
fastify.register(cors, {
  origin: '*'
});

fastify.addContentTypeParser(
  'application/json',
  { parseAs: 'string' },
  function (req, body, done) {
    try {
      var json = JSON.parse(body as string);
      done(null, json);
    } catch (err: any) {
      err.statusCode = 400;
      done(err, undefined);
    }
  }
);

fastify.get('/', async (request, reply) => {
  reply.status(200).send({ message: 'File Server is running' });
});

// Register routes
fastify.register(fileRoutes);

// Start the server
const start = async () => {
  try {
    await fastify.listen({
      port: CONSTANTS.PORT
    });
    fastify.log.info(`Server listening on http://localhost:${CONSTANTS.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
