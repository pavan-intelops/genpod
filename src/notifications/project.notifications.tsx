import { notifications } from '@mantine/notifications';

export const ProjectNotificationFunctions = {
  createdSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Created',
      message: `Project with id: ${projectId} has been successfully created.`,
      color: 'green'
    });
  },
  deletedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Deleted',
      message: `Project with id: ${projectId} has been successfully deleted.`,
      color: 'green'
    });
  },
  updatedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Updated',
      message: `Project with id: ${projectId} has been successfully updated.`,
      color: 'green'
    });
  }
};
