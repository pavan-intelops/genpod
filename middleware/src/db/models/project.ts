import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';
import User from './user';
import ProjectSnapshot from './projectSnapshot';

interface ProjectAttributes {
  id: number;
  name: string;
  flow: object;
  userId: number;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: number;
  public name!: string;
  public flow!: object;
  public userId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flow: {
      type: DataTypes.JSON,
      allowNull: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    }
  },
  {
    sequelize,
    tableName: 'projects',
    hooks: {
      afterUpdate: async (project: Project, options) => {
        await ProjectSnapshot.create({
          projectId: project.id,
          name: project.name,
          flow: project.flow,
          userId: project.userId,
          createdAt: new Date()
        });
      }
    }
  }
);

export default Project;
