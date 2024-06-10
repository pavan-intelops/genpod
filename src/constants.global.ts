export const GLOBAL_CONSTANTS = {
  baseBackendUrl: import.meta.env.VITE_BACKEND_URL! as string,
  socketUrl: import.meta.env.VITE_SOCKET_URL! as string,
  middlewareUrl: import.meta.env.VITE_FILE_SERVER_URL! as string
} as const;
