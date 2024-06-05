export const GLOBAL_CONSTANTS = {
  baseBackendUrl: import.meta.env.VITE_BACKEND_URL!,
  socketUrl: import.meta.env.VITE_SOCKET_URL!,
  fileServerUrl: import.meta.env.VITE_FILE_SERVER_URL!
} as const;
