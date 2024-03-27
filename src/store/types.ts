import { Project } from 'src/components/user/projects/types';

export interface GitPlatform {
  gitPlatform: string;
  personalAccessToken: string;
  url: string;
  username: string;
}
export interface UserStore {
  gitPlatformStore: GitPlatformStore;
  personalDetails: PersonalDetails;
  setPersonalDetails: (personalDetails: PersonalDetails) => void;
  isUserLoggedIn: () => boolean;
  logout: () => void;
}

export interface PersonalDetails {
  email: string;
}
export interface GitPlatformStore {
  gitPlatforms: GitPlatform[];
  setGitPlatforms: (
    gitPlatforms: GitPlatform | GitPlatform[],
    append?: boolean
  ) => void;
  removeGitPlatform: (gitPlatform: GitPlatform) => void;
}

export type ProjectStoreState = {
  projects: Project[];
  activeProject: Project | null;
};
export type ProjectStoreActions = {
  setProjects: (projects: Project[]) => void;
  setActiveProject: (projectId: string) => void;
  removeProject: (project: Project) => void;
};
