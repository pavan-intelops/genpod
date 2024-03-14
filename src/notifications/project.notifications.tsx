import { notifications } from '@mantine/notifications';

/**
 * Show a notification for a successfully deleted project.
 * @param projectId - The ID of the deleted project.
 * @returns The notification object.
 */
export const showSuccessfullyDeletedProjectNotification = (
  projectId: string
) => {
  return notifications.show({
    title: 'Project Deleted',
    message: `Project with id: ${projectId} has been successfully deleted.`,
    color: 'green'
  });
};

/**
 * Show a notification for a failed code generation.
 * @param message - The optional error message.
 * @returns The notification object.
 */
export const showFailedToGenerateCodeNotification = (message?: string) => {
  return notifications.show({
    title: 'Failed to Generate Code',
    message: message || 'Failed to generate code for the project.',
    color: 'red'
  });
};
