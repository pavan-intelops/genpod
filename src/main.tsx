// skipcq: JS-W1028
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

import { MantineProvider } from '@mantine/core';
import './index.css';
import theme, { cssVariableResolver } from './theme.ts';
import { initStores } from './store/initStores.ts';

initStores();

const rootElement = document.getElementById('root');
if (rootElement)
  createRoot(rootElement).render(
    // <React.StrictMode>
    <MantineProvider
      theme={theme}
      defaultColorScheme="dark"
      cssVariablesResolver={cssVariableResolver}
    >
      <App />
    </MantineProvider>
    // </React.StrictMode>
  );
