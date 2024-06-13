import sequelize from './index'; // Ensure the correct path to index.ts
import Project from './models/project';
import ProjectSnapshot from './models/projectSnapshot';
import User from './models/user';

export default async function () {
  // Define associations
  User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
  Project.belongsTo(User, { foreignKey: 'userId', as: 'projectUser' });

  Project.hasMany(ProjectSnapshot, {
    foreignKey: 'projectId',
    as: 'snapshots'
  });
  ProjectSnapshot.belongsTo(Project, {
    foreignKey: 'projectId',
    as: 'originalProject'
  });

  User.hasMany(ProjectSnapshot, { foreignKey: 'userId', as: 'userSnapshots' });
  ProjectSnapshot.belongsTo(User, { foreignKey: 'userId', as: 'snapshotUser' });

  // Sync the database
  await sequelize.sync({
    alter: false, // This updates the tables to match the models without dropping them
    force: false // Ensure this is false to avoid dropping tables
  });
}
