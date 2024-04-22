import { AppNotificationFunctions } from './app.notifications';
import { CodeNotificationFunctions } from './code.notifications';
import { ProjectNotificationFunctions } from './project.notifications';

export const InAppNotifications = {
  project: ProjectNotificationFunctions,
  code: CodeNotificationFunctions,
  app: AppNotificationFunctions
};
