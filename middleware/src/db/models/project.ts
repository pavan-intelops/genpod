import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../index';
import ProjectSnapshot from './projectSnapshot';

interface ProjectAttributes {
  id: string;
  name: string;
  flow: object;
  userId: string;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'id'> {}

class Project
  extends Model<ProjectAttributes, ProjectCreationAttributes>
  implements ProjectAttributes
{
  public id!: string;
  public name!: string;
  public flow!: object;
  public userId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Project.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
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
      type: DataTypes.UUID,
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
      afterUpdate: async (project: Project) => {
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
