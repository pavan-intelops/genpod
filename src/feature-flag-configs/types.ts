export type FeatureFlagsState = 'visible' | 'hidden' | 'coming-soon';

export interface ConfigJson {
  id: string;
  featureFlags: {
    [key: string]: FeatureFlagsState;
  };
  variants?: {
    [key: string]: {
      type: 'IMAGE' | 'PAGE';
      url: string;
    };
  };
  misc?: {
    [key: string]: unknown;
  };
}
export enum FEATURE_FLAG {
  SIDE_NAV = 'side-nav'
}
