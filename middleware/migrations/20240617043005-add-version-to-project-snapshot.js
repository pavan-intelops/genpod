'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('project_snapshots', 'version', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: 'v0.0.1'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('project_snapshots', 'version');
  }
};
