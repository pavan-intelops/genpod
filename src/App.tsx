import '@mantine/code-highlight/styles.css';
import '@mantine/core/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'reactflow/dist/style.css';
import './App.css';

import { ModalsProvider } from '@mantine/modals';
import { useEffect } from 'react';
import { ReactFlowProvider } from 'reactflow';
import { useSyncActions } from './hooks/useSyncActions';
import { InAppNotifications } from './notifications';
import PageNotFound from './pages/404';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Project from './pages/project/Project';
import { runEnvVariablesCheck } from './utils/checkEnvVariables';
import { pingCheckServer } from './utils/pingCheckServer';
import { useFeatureFlagStore } from './store/useFeatureFlagStore';
import ComingSoon from './pages/coming-soon/ComingSoon';

function App() {
  const { syncProjects, syncGitPlatforms } = useSyncActions();
  const { fetchAllFeatureFlags, areFeatureFlagsLoaded } = useFeatureFlagStore();
  useEffect(() => {
    runEnvVariablesCheck();
    syncProjects();
    syncGitPlatforms();
    fetchAllFeatureFlags();
    (async function () {
      const res = await pingCheckServer();
      if (!res) {
        InAppNotifications.app.failedToConnectToServer();
      }
    })();
  }, []);

  if (!areFeatureFlagsLoaded) return null;
  return (
    <BrowserRouter>
      <Notifications />
      <ReactFlowProvider>
        <ModalsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/coming-soon" element={<ComingSoon />} />
            <Route path="/login" element={<Login />} />
            <Route path="/project/:projectId" element={<Project />} />
            <Route path="/profile" index element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </ModalsProvider>
      </ReactFlowProvider>
    </BrowserRouter>
  );
}

export default App;
