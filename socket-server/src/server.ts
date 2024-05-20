import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import { spawn } from 'node-pty';
import cors from 'cors';
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
    console.log('A user connected');

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
      console.log('data: ', data);
      socket.emit('output', data);
    });

    socket.on('input', input => {
      ptyProcess.write(input);
    });

    socket.on('disconnect', () => {
      ptyProcess.kill();
      console.log('User disconnected');
    });
  });

  // Start server
  console.log('Starting Socket Server...');
  const PORT = process.env.PORT || process.env.SOCKET_PORT || 3000;
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
bootstrap();
export default bootstrap;
