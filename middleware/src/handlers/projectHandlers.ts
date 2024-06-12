import { FastifyReply, FastifyRequest } from 'fastify';

import Project from '../db/models/project';

export const createProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, flow } = request.body as {
    name: string;
    flow: object;
  };

  if (!name) {
    return reply.status(400).send({ error: 'Project name is required' });
  }
  const userId = request.user?.id!;
  const project = await Project.create({ name, flow, userId });

  reply.status(201).send({ message: 'Project created successfully', project });
};

export const updateProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  const { name, flow } = request.body as {
    name: string;
    flow: object;
  };

  const project = await Project.findByPk(id);

  if (!project) {
    return reply.status(404).send({ error: 'Project not found' });
  }

  project.name = name;
  project.flow = flow;

  await project.save();

  reply.status(200).send({ message: 'Project updated successfully', project });
};

export const getProject = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };

  const project = await Project.findByPk(id);

  if (!project) {
    return reply.status(404).send({ error: 'Project not found' });
  }

  reply.status(200).send(project);
};

export const getAllProjects = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const projects = await Project.findAll();
  reply.status(200).send(projects);
};
