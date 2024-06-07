import { useCallback } from 'react';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { useProjectStore } from 'src/store/useProjectStore';

export const useSyncActions = () => {
  const setProjects = useProjectStore(state => state.setProjects);

  const { getProjects } = useProjectOperations();

  const syncProjects = useCallback(async () => {
    const { data: projects, error: getProjectsError } = await getProjects();
    if (getProjectsError) {
      return;
    }
    if (projects && projects?.length > 0) {
      setProjects(JSON.parse(projects as unknown as string));
    }
  }, []);

  return {
    syncProjects
  };
};
