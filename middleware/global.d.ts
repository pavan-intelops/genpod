declare module 'fastify' {
  export interface Session {
    authenticated: boolean;
    user: string;
  }
}
export {};
