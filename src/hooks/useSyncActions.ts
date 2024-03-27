import { useCallback } from 'react';
import { useGitPlatformOperations } from 'src/api/useGitPlatformOperations';
import { useProjectOperations } from 'src/api/useProjectOperations/useProjectOperations';
import { useProjectStore } from 'src/store/useProjectStore';
import useUserStore from 'src/store/userStore';

export const useSyncActions = () => {
  const setGitPlatforms = useUserStore(state => {
    return state.gitPlatformStore.setGitPlatforms;
  });
  const setProjects = useProjectStore(state => state.setProjects);

  const { getGitPlatforms } = useGitPlatformOperations();
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

  const syncGitPlatforms = useCallback(async () => {
    const res = await getGitPlatforms();
    res.data && setGitPlatforms(res.data, false);
  }, []);

  return {
    syncGitPlatforms,
    syncProjects
  };
};
