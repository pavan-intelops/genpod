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
import PageNotFound from './pages/404';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Project from './pages/project/Project';
import { runEnvVariablesCheck } from './utils/checkEnvVariables';

function App() {
  const { syncProjects, syncGitPlatforms } = useSyncActions();

  useEffect(() => {
    runEnvVariablesCheck();
    syncProjects();
    syncGitPlatforms();
  }, []);

  return (
    <BrowserRouter>
      <Notifications />
      <ReactFlowProvider>
        <ModalsProvider>
          <Routes>
            <Route path="/" element={<Home />} />
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
