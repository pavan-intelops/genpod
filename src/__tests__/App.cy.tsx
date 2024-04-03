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

describe('App Navigation', () => {
  it('navigates to the login page', () => {
    mount(
      <MantineProvider>
        <App />
      </MantineProvider>
    );
    cy.get('button').contains('Login').click();
    cy.url().should('include', '/login');
  });
});

/**
 * Add more tests
 */
