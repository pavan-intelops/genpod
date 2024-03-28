import { Project } from 'src/components/user/projects/types';
import useUserStore from 'src/store/userStore';
import axios from '../axios';
import { UseOperationsReturnType } from '../api.types';

export const useProjectOperations = () => {
  const {
    personalDetails: { email }
  } = useUserStore();

  const postYamlContent = async (
    nodeId: string,
    projectId: string,
    file: File | Blob | string
  ): UseOperationsReturnType => {
    if (!email) {
      return { error: new Error('User email is required') };
    }
    try {
      const formData = new FormData();
      formData.append('nodeId', nodeId);
      formData.append('projectId', projectId);
      formData.append('file', file); // `file` is expected to be a File or Blob object

      // Note: No need to JSON.stringify. We're directly sending FormData
      const response = await axios.post('/openapi/upload', formData, {
        headers: {
          // You don't need to manually set 'Content-Type': 'multipart/form-data',
          // Axios does that for you, including setting the boundary parameter.
        }
      });
      if (response.status >= 400) {
        return { error: new Error('Failed to upload file') };
      }
      return { data: response.data };
    } catch (error) {
      return { error };
    }
  };

  const postProject = async (
    project: Project
  ): UseOperationsReturnType<Project> => {
    if (!email) {
      return { error: new Error('User email is required') };
    }
    try {
      const stringifiedProject = JSON.stringify(project);
      const { data } = await axios.post(
        `/users/${email}/projects`,
        stringifiedProject
      );
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const getProjects = async (): UseOperationsReturnType<Project[]> => {
    if (!email) {
      return { error: new Error('User email is required') };
    }
    try {
      const { data } = await axios.get(`/users/${email}/projects`);
      return { data };
    } catch (error) {
      return { error };
    }
  };

  const getProject = async (
    projectId: string
  ): UseOperationsReturnType<Project> => {
    if (!email) {
      return { error: new Error('User email is required') };
    }
    try {
      const { data } = await axios.get(`/users/${email}/projects/${projectId}`);
      return { data: JSON.parse(data) };
    } catch (error) {
      return { error };
    }
  };

  const updateProject = async (
    projectId: string,
    projectDetails: Project
  ): UseOperationsReturnType<Project> => {
    if (!email) {
      return { error: new Error('User email is required') };
    }
    try {
      const transformedData = JSON.stringify(projectDetails);
      await axios.put(`/users/${email}/projects/${projectId}`, transformedData);
      return { data: projectDetails }; // Assuming the backend doesn't return the updated project
    } catch (error) {
      return { error };
    }
  };

  const deleteProject = async (projectId: string): UseOperationsReturnType => {
    if (!email) {
      return { error: new Error('User email is required') };
    }
    try {
      await axios.delete(`/users/${email}/projects/${projectId}`);
      return { data: null }; // Indicate successful deletion
    } catch (error) {
      return { error };
    }
  };

  return {
    postProject,
    getProjects,
    getProject,
    updateProject,
    deleteProject,
    postYamlContent
  };
};
