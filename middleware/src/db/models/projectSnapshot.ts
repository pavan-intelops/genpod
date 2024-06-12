import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../index';
import User from './user';
import Project from './project';

interface ProjectSnapshotAttributes {
  id: number;
  projectId: number;
  name: string;
  flow: object;
  userId: number;
  createdAt: Date;
}

interface ProjectSnapshotCreationAttributes
  extends Optional<ProjectSnapshotAttributes, 'id'> {}

class ProjectSnapshot
  extends Model<ProjectSnapshotAttributes, ProjectSnapshotCreationAttributes>
  implements ProjectSnapshotAttributes
{
  public id!: number;
  public projectId!: number;
  public name!: string;
  public flow!: object;
  public userId!: number;
  public createdAt!: Date;
}

ProjectSnapshot.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'projects',
        key: 'id'
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    flow: {
      type: DataTypes.JSON,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    tableName: 'project_snapshots'
  }
);

export default ProjectSnapshot;
