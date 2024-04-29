export type FeatureFlagsState =
  | 'visible'
  | 'hidden'
  | 'presenting-teaser'
  | 'coming-soon';

export interface ConfigJson {
  id: string;
  featureFlags: {
    [key: string]: FeatureFlagsState;
  };
  misc?: {
    [key: string]: unknown;
  };
}
export enum FEATURE_FLAG {
  SIDE_NAV = 'side-nav'
}
