import { mount } from '@cypress/react18';
import App from 'src/App';
import { MantineProvider } from '@mantine/core';
describe('App', () => {
  it('mounts app component', () => {
    mount(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
  });
});
