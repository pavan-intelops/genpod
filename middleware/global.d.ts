import User from './src/db/models/user';

declare module 'fastify' {
  export interface Session {
    authenticated: boolean;
    user: string;
  }
  interface FastifyRequest {
    user: User;
  }
}
export {};
