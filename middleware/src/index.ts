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
  origin: 'http://localhost:3000', // add forntend url here
  credentials: true
});
// cookie plugin registering
fastify.register(cookie);

// Register session plugin
fastify.register(session, {
  secret: CONSTANTS.SESSION_SECRET,
  cookieName: 'sessionId',
  cookie: {
    secure: false,
    httpOnly: true
  }
});

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
