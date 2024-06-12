import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';
import User from './user';

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
      type: DataTypes.INTEGER.UNSIGNED,
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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    tableName: 'projects'
  }
);

export default Project;
