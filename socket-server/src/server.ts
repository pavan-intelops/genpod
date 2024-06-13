import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { spawn } from 'node-pty';
import { Server as SocketIOServer } from 'socket.io';

import logger from './logger';

dotenv.config();
const app = express();

function bootstrap() {
  app.use(
    cors({
      origin: '*'
    })
  );
  app.use(express.json());

  const server = createServer(app);
  const io = new SocketIOServer(server, {
    cors: {
      origin: '*'
    }
  });

  // Middleware to serve static files
  app.use(express.static('public'));

  // Socket.IO connection
  io.on('connection', socket => {
    logger.info('User connected');
    const ptyProcess = spawn(
      process.platform === 'win32' ? 'cmd.exe' : 'bash',
      [],
      {
        name: 'xterm-color',
        cols: 80,
        rows: 30,
        cwd: process.env.HOME,
        env: process.env
      }
    );

    ptyProcess.onData(data => {
      socket.emit('output', data);
    });

    socket.on('input', input => {
      ptyProcess.write(input);
    });

    socket.on('disconnect', () => {
      ptyProcess.kill();
      logger.info('User disconnected');
    });
  });

  // Start server
  logger.warn('Starting server...');
  const PORT = process.env.PORT || process.env.SOCKET_PORT || 3000;
  server.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
  });

  // if sigterm close the port and server
  process.on('SIGTERM', () => {
    logger.warn('SIGTERM received, closing server');
    server.close(() => {
      logger.info('Server closed');
    });
  });
}

bootstrap();
export default bootstrap;
