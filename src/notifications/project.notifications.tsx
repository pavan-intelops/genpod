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
  },
  uploadYamlFailed: (projectId: string, nodeId: string) => {
    return notifications.show({
      title: 'Failed to Upload Yaml',
      message: `Failed to upload yaml for project with id: ${projectId} and node with id: ${nodeId}.`,
      color: 'red'
    });
  },
  uploadedYamlSuccessfully: (projectId: string, nodeId: string) => {
    return notifications.show({
      title: 'Yaml Uploaded',
      message: `Yaml for project with id: ${projectId} and node with id: ${nodeId} has been successfully uploaded.`,
      color: 'green'
    });
  },
  failedToSync: (projectId: string) => {
    return notifications.show({
      title: 'Failed to Sync Project',
      message: `Failed to sync project with id: ${projectId}.`,
      color: 'red'
    });
  },
  syncedSuccessfully: (projectId: string) => {
    return notifications.show({
      title: 'Project Synced',
      message: `Project with id: ${projectId} has been successfully synced.`,
      color: 'green'
    });
  }
};
