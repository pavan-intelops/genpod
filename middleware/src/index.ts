import Fastify from 'fastify';

import cookie from '@fastify/cookie';
import cors from '@fastify/cors';
import session from '@fastify/session';

import { CONSTANTS } from './constants';
import logger from './logger';
import { authRoutes } from './routes/authRoutes';
import { fileRoutes } from './routes/fileRoutes';

const fastify = Fastify({
  logger: logger
});

// Add CORS as *
fastify.register(cors, {
  origin: '*'
});
// cookie plugin registering
fastify.register(cookie);

// Register session plugin
fastify.register(session, {
  secret: 'dfsfds',
  cookieName: 'sessionId',
  cookie: {
    secure: false
  }
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
// Register auth routes
fastify.register(authRoutes);

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
