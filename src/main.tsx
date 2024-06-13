import './index.css';

// skipcq: JS-W1028
import { createRoot } from 'react-dom/client';

import { MantineProvider } from '@mantine/core';

import App from './App.tsx';
import { initStores } from './store/initStores.ts';
import theme, { cssVariableResolver } from './theme.ts';

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
