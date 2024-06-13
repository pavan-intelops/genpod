import { FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import User from 'src/db/models/user';

export const attachUser = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: HookHandlerDoneFunction
) => {
  if (request.session && request.session.user) {
    const userId = request.session.user;

    if (userId) {
      try {
        const user = await User.findByPk(userId);
        if (user) {
          request.user = user;
        } else {
          return reply.status(401).send({ error: 'Unauthorized' });
        }
      } catch (error) {
        return reply.status(500).send({ error: 'Internal Server Error' });
      }
    } else {
      return reply.status(401).send({ error: 'Unauthorized' });
    }
  } else {
    return reply.status(401).send({ error: 'Unauthorized' });
  }
  done();
};
