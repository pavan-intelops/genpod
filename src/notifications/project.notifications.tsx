import { notifications } from '@mantine/notifications'

export const showSuccessfullyDeletedProjectNotification = (
	projectId: string
) => {
	return notifications.show({
		title: 'Project Deleted',
		message: `Project with id: ${projectId} has been successfully deleted.`,
		color: 'green',
	})
}
