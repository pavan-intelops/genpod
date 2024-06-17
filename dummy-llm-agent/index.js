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
app.get('/llm', (request, reply) => {
  const filePath = path.join(__dirname, 'sample.txt');

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
    }, 500);

    reply.raw.on('close', () => {
      clearInterval(interval);
    });
  });
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
