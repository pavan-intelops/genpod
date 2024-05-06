import { Project } from 'src/components/user/projects/types';
import {
  FEATURE_FLAG,
  FeatureFlagsState
} from 'src/feature-flag-configs/types';

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
// Feature Flags Store
export type FeatureFlagVariant = {
  type: 'IMAGE' | 'PAGE';
  url: string;
};
type FeatureFlagsList = {
  variants: {
    [keyName: string]: FeatureFlagVariant;
  };
  features: {
    [keyName: string]: FeatureFlagsState;
  };
};
export type FeatureFlagConfig = {
  [configName: string | FEATURE_FLAG]: FeatureFlagsList;
};
export type FeatureFlagStoreState = {
  featureFlags: FeatureFlagConfig;
  areFeatureFlagsLoaded: boolean;
};
export type FeatureFlagStoreActions = {
  setFeatureFlag: (featureFlag: FeatureFlagConfig) => void;
  updateFeatureFlag: (id: FEATURE_FLAG, featureFlag: FeatureFlagConfig) => void;
  getFeatureFlag: (id: FEATURE_FLAG) => FeatureFlagsList;
  removeFeatureFlag: (id: FEATURE_FLAG) => void;
  fetchAllFeatureFlags: () => void;
};
