import { notifications } from '@mantine/notifications';

export const AppNotificationFunctions = {
  failedToConnectToServer: () => {
    return notifications.show({
      title: 'Failed to Connect to Server',
      message: 'Failed to connect to the server.',
      color: 'red'
    });
  }
};
