import { Project } from 'src/components/user/projects/types';
import {
  FEATURE_FLAG,
  FeatureFlagsState
} from 'src/feature-flag-configs/types';


export interface UserStore {
  personalDetails: PersonalDetails;
  setPersonalDetails: (personalDetails: PersonalDetails) => void;
  isUserLoggedIn: () => boolean;
  logout: () => void;
}

export interface PersonalDetails {
  username: string;
  id: string;
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
