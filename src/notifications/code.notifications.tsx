import { notifications } from '@mantine/notifications';

export const CodeNotificationFunctions = {
  failedToGenerate: (message?: string) => {
    return notifications.show({
      title: 'Failed to Generate Code',
      message: message || 'Failed to generate code for the project.',
      color: 'red'
    });
  },
  generatedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Code Generated',
      message: `Code for project with id: ${projectId} has been successfully generated.`,
      color: 'green'
    });
  }
};
