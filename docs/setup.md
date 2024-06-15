
# Genpod Project Setup Documentation

This documentation provides detailed instructions on how to set up the **Genpod** project locally.

## Project Structure

The project consists of three main parts:

*   React application using Vite
*   File server
*   Socket server

## Prerequisites

*   Node.js (>= 14.x)
*   Yarn package manager

## Step-by-Step Setup

### 1\. Clone the Repository

    git clone <repository-url>

### 2\. Environment Variables

Create a `.env` file in the root directory and add the following environment variables:

    VITE_BACKEND_URL=http://localhost:5002
    VITE_SOCKET_URL=http://localhost:3002
    VITE_FILE_SERVER_URL=http://localhost:3003
    SOCKET_PORT=3002

### 3\. Setting Up the React Application

    cd intelops-genpod
    yarn
    yarn dev

### 4\. Running the Development Server

Create a `scripts/dev.sh` file with the following content:

    #!/bin/bash
    # parallelly run the server and client
    bash -c "cd socket-server && yarn && yarn dev" &
    bash -c "yarn && vite --host --force" &
    # run the file-server
    bash -c "cd file-server && yarn && yarn dev"

Make the script executable:

    chmod +x scripts/dev.sh

Run the development script:

    ./scripts/dev.sh

### 5\. Setting Up the File Server

    cd file-server
    yarn
    yarn dev

The `file-server` should now be running at `http://localhost:3003`.

### 6\. Setting Up the Socket Server

    cd socket-server
    yarn
    yarn dev

The `socket-server` should now be running at `http://localhost:3002`.

## Project Dependencies

### React Application Dependencies

    {
      "dependencies": {
        "@codemirror/autocomplete": "^6.16.0",
        "@hookform/resolvers": "^3.3.4",
        "@mantine/code-highlight": "^7.6.1",
        "@mantine/core": "^7.6.1",
        "@mantine/dates": "^7.6.1",
        "@mantine/form": "^7.6.1",
        "@mantine/hooks": "^7.6.1",
        "@mantine/modals": "^7.6.1",
        "@mantine/notifications": "^7.6.1",
        "@tabler/icons": "^2.47.0",
        "@tabler/icons-react": "^2.47.0",
        "@uiw/codemirror-extensions-langs": "^4.22.0",
        "@uiw/react-codemirror": "^4.22.0",
        "axios": "^1.6.7",
        "classnames": "^2.5.1",
        "dayjs": "^1.11.10",
        "immer": "^10.0.4",
        "lodash": "^4.17.21",
        "nanoid": "^5.0.6",
        "pino": "^9.1.0",
        "pino-pretty": "^11.0.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-hook-form": "^7.51.0",
        "react-hook-form-mantine": "^3.1.3",
        "react-hotkeys-hook": "^4.5.0",
        "react-icons": "^5.0.1",
        "react-router-dom": "^6.22.2",
        "reactflow": "^11.10.4",
        "socket.io-client": "^4.7.5",
        "xterm": "^5.3.0",
        "xterm-addon-fit": "^0.8.0",
        "zod": "^3.22.4",
        "zustand": "^4.5.2"
      },
      "devDependencies": {
        "@cypress/code-coverage": "^3.12.20",
        "@cypress/react18": "^2.0.0",
        "@istanbuljs/nyc-config-typescript": "^1.0.2",
        "@storybook/addon-essentials": "^7.6.6",
        "@storybook/addon-interactions": "^7.6.6",
        "@storybook/addon-links": "^7.6.6",
        "@storybook/addon-onboarding": "^1.0.10",
        "@storybook/blocks": "^7.6.6",
        "@storybook/react": "^7.6.6",
        "@storybook/react-vite": "^7.6.6",
        "@storybook/test": "^7.6.6",
        "@tanstack/eslint-plugin-query": "^5.18.1",
        "@types/cypress__code-coverage": "^3.10.2",
        "@types/react": "^18.2.43",
        "@types/react-dom": "^18.2.17",
        "@typescript-eslint/eslint-plugin": "^6.14.0",
        "@typescript-eslint/parser": "^6.14.0",
        "@vitejs/plugin-react": "^4.2.1",
        "autoprefixer": "^10.4.16",
        "cypress": "^13.6.4",
        "eslint": "^8.55.0",
        "eslint-config-prettier": "^9.1.0",
        "eslint-plugin-react-hooks": "^4.6.0",
        "eslint-plugin-react-refresh": "^0.4.5",
        "eslint-plugin-storybook": "^0.6.15",
        "postcss": "^8.4.33",
        "postcss-nested": "^6.0.1",
        "postcss-preset-mantine": "^1.12.0",
        "postcss-simple-vars": "^7.0.1",
        "serve": "^14.2.1",
        "storybook": "^7.6.6",
        "storybook-dark-mode": "^3.0.3",
        "tailwindcss": "^3.4.0",
        "typescript": "^5.2.2",
        "vite": "^5.0.8",
        "vite-plugin-istanbul": "^5.0.0"
      }
    }

### File Server Dependencies

    {
      "dependencies": {
        "@fastify/cors": "^9.0.1",
        "fastify": "^4.27.0",
        "pino": "^9.1.0",
        "pino-pretty": "^11.1.0",
        "ts-node": "^10.9.2",
        "typescript": "^5.4.5"
      },
      "devDependencies": {
        "@types/node": "^20.14.1",
        "nodemon": "^3.1.3"
      }
    }

### Socket Server Dependencies

    {
      "dependencies": {
        "cors": "^2.8.5",
        "dotenv": "^16.4.5",
        "express": "^4.19.2",
        "node-pty": "^1.0.0",
        "pino": "^9.1.0",
        "pino-pretty": "^11.0.0",
        "socket.io": "^4.7.5",
        "ts-node": "^10.9.2"
      },
      "devDependencies": {
        "@types/express": "^4.17.21",
        "@types/node": "^20.12.12",
        "typescript": "^5.4.5"
      }
    }

## Running Scripts

### React Application Scripts

*   `yarn dev-cy` - Install Cypress and run the development server and coverage report.
*   `yarn dev` - Run the development script located at `scripts/dev.sh`.
*   `yarn build` - Compile TypeScript and build the Vite project.
*   `yarn lint` - Lint the project files.
*   `yarn clean-dev` - Clean node_modules, reinstall dependencies, and run the development server.
*   `yarn preview` - Preview the built project.
*   `yarn storybook` - Start Storybook for UI component development.
*   `yarn build-storybook` - Build the Storybook static site.
*   `yarn cy-install` - Install Cypress.
*   `yarn cy:open-e2e` - Open Cypress for end-to-end testing.
*   `yarn cy:open-unit` - Open Cypress for unit testing.
*   `yarn cy:run-e2e` - Run Cypress end-to-end tests.
*   `yarn cy:run-unit` - Run Cypress unit tests.
*   `yarn coverage-open` - Run unit tests and serve the coverage report.

### File Server Scripts

*   `yarn dev` - Start the file server using `nodemon`.

### Socket Server Scripts

*   `yarn dev` - Start the socket server using `ts-node`.

## Conclusion

By following the steps outlined in this documentation, you should be able to set up and run the Genpod project locally. Ensure that all dependencies are correctly installed and the environment variables are properly configured. If you encounter any issues, refer to the project documentation or seek support from the project maintainers.
