import { checkIfJSONIsValid } from 'src/feature-flag-configs/helpers';
import SideNavConfig from 'src/feature-flag-configs/side-nav.config.json';
import {
  ConfigJson,
  FEATURE_FLAG,
  FeatureFlagsState
} from 'src/feature-flag-configs/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import {
  FeatureFlagConfig,
  FeatureFlagStoreActions,
  FeatureFlagStoreState
} from './types';

export const useFeatureFlagStore = create<
  FeatureFlagStoreState & FeatureFlagStoreActions
>()(
  devtools((set, get) => ({
    areFeatureFlagsLoaded: false,
    featureFlags: {},
    fetchAllFeatureFlags() {
      // for now I will be importing here and setting the feature flags
      // in future this will be fetched from server
      try {
        const isChecked = checkIfJSONIsValid(SideNavConfig as ConfigJson);
        if (isChecked) {
          set({
            featureFlags: {
              [SideNavConfig.id]: {
                ...(SideNavConfig.featureFlags as Record<
                  string,
                  FeatureFlagsState
                >)
              }
            }
          });
          set({ areFeatureFlagsLoaded: true });
        }
      } catch (error) {
        console.error(error);
      }
    },
    setFeatureFlag: (featureFlag: FeatureFlagConfig) => {
      set({ featureFlags: featureFlag });
    },
    updateFeatureFlag: (id: FEATURE_FLAG, featureFlag: FeatureFlagConfig) => {
      set(state => ({
        featureFlags: {
          ...state.featureFlags,
          [id]: featureFlag[id]
        }
      }));
    },

    getFeatureFlag: (id: FEATURE_FLAG) => {
      return get().featureFlags[id];
    },

    removeFeatureFlag: (id: FEATURE_FLAG) => {
      const flags = get().featureFlags;
      delete flags[id];
      set(
        {
          featureFlags: flags
        },
        true
      );
    }
  }))
);
