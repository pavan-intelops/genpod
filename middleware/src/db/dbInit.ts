import sequelize from '.';
import Project from './models/project';
import User from './models/user';

export default (async function () {
  User.hasMany(Project, { foreignKey: 'userId', as: 'projects' });
  Project.belongsTo(User, { foreignKey: 'userId', as: 'projectUser' });
  await sequelize.sync({
    alter: false, // Update the tables to match the models without dropping them
    force: false // Ensure this is false to avoid dropping tables
  });
});
