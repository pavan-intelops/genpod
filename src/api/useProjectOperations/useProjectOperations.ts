import { Project } from 'src/components/user/projects/types';
import { UseOperationsOptions, UseOperationsReturnType } from '../api.types';
import axiosMiddleware from '../axiosMiddleware';

export const useProjectOperations = () => {
  const postProject = async (
    project: Project,
    options?: UseOperationsOptions<Project>
  ): UseOperationsReturnType<Project> => {
    try {
      const { data } = await axiosMiddleware.post(`/projects`, project);
      options?.onSuccess?.(data);
      return { data };
    } catch (error) {
      options?.onFail?.(error);
      return { error };
    }
  };

  const getProjects = async (
    options?: UseOperationsOptions<Project[]>
  ): UseOperationsReturnType<Project[]> => {
    try {
      const { data } = await axiosMiddleware.get(`/projects`);
      options?.onSuccess?.(data);
      return { data };
    } catch (error) {
      options?.onFail?.(error);
      return { error };
    }
  };

  const getProject = async (
    projectId: string,
    options?: UseOperationsOptions<Project>
  ): UseOperationsReturnType<Project> => {
    try {
      const { data } = await axiosMiddleware.get(`/projects/${projectId}`);
      options?.onSuccess?.(data);
      return { data: JSON.parse(data) };
    } catch (error) {
      options?.onFail?.(error);
      return { error };
    }
  };

  const updateProject = async (
    projectId: string,
    projectDetails: Project,
    options?: UseOperationsOptions<Project>
  ): UseOperationsReturnType<Project> => {
    try {
      const { data } = await axiosMiddleware.put(
        `/projects/${projectId}`,
        projectDetails
      );
      options?.onSuccess?.(data);
      return { data };
    } catch (error) {
      options?.onFail?.(error);
      return { error };
    }
  };

  const deleteProject = async (
    projectId: string,
    options?: UseOperationsOptions<void>
  ): UseOperationsReturnType<void> => {
    try {
      await axiosMiddleware.delete(`/projects/${projectId}`);
      options?.onSuccess?.();
      return {};
    } catch (error) {
      options?.onFail?.(error);
      return { error };
    }
  };
  return {
    postProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject
  };
};
