import { useFlowsStore } from 'src/canvas/store/flowstore';
import { useProjectStore } from './useProjectStore';
import useUserStore from './userStore';
import { useFeatureFlagStore } from './useFeatureFlagStore';

export function initStores() {
  useUserStore.getState();
  useProjectStore.getState();
  useFlowsStore.getState();
  useFeatureFlagStore.getState();
}
