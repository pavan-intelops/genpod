import { FastifyReply, FastifyRequest } from 'fastify';

const adminCredentials = {
  username: 'admin',
  password: 'password'
};

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  return reply.status(400).send({ error: 'Registration is not allowed, YET!' });
};

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

  if (
    username !== adminCredentials.username ||
    password !== adminCredentials.password
  ) {
    return reply.status(401).send({ error: 'Invalid username or password' });
  }

  request.session.authenticated = true;
  request.session.user = username;

  reply.status(200).send({ message: 'Logged in successfully' });
};

export const logout = async (request: FastifyRequest, reply: FastifyReply) => {
  request.session.destroy(err => {
    if (err) {
      reply.status(500).send({ error: 'Failed to log out' });
    } else {
      reply.status(200).send({ message: 'Logged out successfully' });
    }
  });
};
