import { FastifyReply, FastifyRequest } from 'fastify';
import User from '../db/models/user';

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
  const { username, password } = request.body as {
    username: string;
    password: string;
  };

  if (!username || !password) {
    return reply
      .status(400)
      .send({ error: 'Username and password are required' });
  }

  if (!username || !password) {
    return reply
      .status(400)
      .send({ error: 'Username and password are required' });
  }

  let user = await User.findOne({ where: { username } });

  if (!user) {
    user = await User.create({ username, password });
    request.log.info(`Created new user: ${username}`);
  } else if (user.password !== password) {
    return reply.status(401).send({ error: 'Invalid password' });
  }

  request.session.authenticated = true;
  request.session.user = user.id;

  reply.status(200).send({
    message: 'Logged in successfully',
    data: {
      user: {
        id: username,
        username: username
      }
    }
  });
};

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  if (request.session.authenticated) {
    request.session.destroy(err => {
      if (err) {
        reply.status(500).send({ error: 'Failed to log out' });
      } else {
        reply.status(200).send({ message: 'Logged out successfully' });
      }
    });
  }
};
