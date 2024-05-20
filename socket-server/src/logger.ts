import pino from 'pino';
const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true
    }
  },
  name: 'socket-server'
});

export default logger;
