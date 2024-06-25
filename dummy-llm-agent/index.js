const fastify = require('fastify');
const fs = require('fs');
const path = require('path');
const cors = require('@fastify/cors');

const app = fastify({
  logger: true
});

app.register(cors, {
  origin: '*'
});
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const streamFile = (filePath, reply) => {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      reply.code(500).send('Internal Server Error');
      app.log.error(err);
      return;
    }

    const chunks = data.match(/.{1,1024}/g) || []; // Split file content into 1KB chunks
    let currentChunkIndex = 0;

    reply.raw.writeHead(200, {
      'Content-Type': 'text/plain',
      'Transfer-Encoding': 'chunked'
    });

    const interval = setInterval(() => {
      if (currentChunkIndex < chunks.length) {
        reply.raw.write(chunks[currentChunkIndex] + '\n');
        currentChunkIndex += 1;
      } else {
        clearInterval(interval);
        reply.raw.end();
      }
    }, getRandomInt(500, 1000));

    reply.raw.on('close', () => {
      clearInterval(interval);
    });
  });
};

app.get('/llm', (request, reply) => {
  const filePath = path.join(__dirname, 'sample.txt');
  streamFile(filePath, reply);
});

app.get('/:nodeId/:taskId/summary', (request, reply) => {
  const filePath = path.join(__dirname, 'log.txt');
  streamFile(filePath, reply);
});

app.get('/:nodeId/:taskId/logs', (request, reply) => {
  const filePath = path.join(__dirname, 'log.txt');
  streamFile(filePath, reply);
});

app.get('/:nodeId/tasks', (request, reply) => {
  reply.send([
    {
      id: '12345',
      name: 'Initialising',
      value: 'initialising',
      tabs: [
        {
          name: 'Summary',
          value: 'summary'
        },
        {
          name: 'Logs',
          value: 'logs'
        }
      ]
    },
    {
      id: '6789',
      name: 'Building',
      value: 'building',
      tabs: [
        {
          name: 'Summary',
          value: 'summary'
        },
        {
          name: 'Logs',
          value: 'logs'
        }
      ]
    },
    {
      id: '622789',
      name: 'Testing',
      value: 'testing'
    }
  ]);
});

const start = async () => {
  try {
    await app.listen({ port: 4000 });
    app.log.info(`LLM Agent server listening on ${app.server.address().port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
