import fs from 'fs';
import path from 'path';
import { FastifyReply, FastifyRequest } from 'fastify';

// Ensure that dump directory is created in the project root directory
const directoryToSaveFiles = path.join(process.cwd(), 'dump');

// Ensure the dump directory exists
if (!fs.existsSync(directoryToSaveFiles)) {
  fs.mkdirSync(directoryToSaveFiles, { recursive: true });
}

export const createOrUpdateFile = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { content, fileType, fileName } = request.body as {
    content: string;
    fileType: string;
    fileName: string;
  };

  const isBodyValid =
    fileType && fileType.trim() && fileName && fileName.trim();
  if (!isBodyValid) {
    return reply
      .status(400)
      .send({ error: 'Content and fileType and fileName are required' });
  }

  try {
    const dirName = path.dirname(fileName);
    const baseName = path.basename(fileName);
    const filePath = path.join(
      directoryToSaveFiles,
      dirName,
      `${baseName}.${fileType}`
    );

    // Create directory if it does not exist
    if (!fs.existsSync(path.join(directoryToSaveFiles, dirName))) {
      fs.mkdirSync(path.join(directoryToSaveFiles, dirName), {
        recursive: true
      });
    }

    if (fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, content, 'utf8');
      reply
        .status(200)
        .send({ message: 'File updated successfully', filePath });
    } else {
      fs.writeFileSync(filePath, content, 'utf8');
      reply
        .status(201)
        .send({ message: 'File created successfully', filePath });
    }
  } catch (error) {
    request.log.error(error);
    reply.status(500).send({
      error: 'Internal Server Error',
      message: 'File creation failed'
    });
  }
};
