import { DataTypes, Model, Optional } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '../index';

interface ProjectSnapshotAttributes {
  id: string;
  projectId: string;
  name: string;
  flow: object;
  userId: string;
  createdAt: Date;
}

interface ProjectSnapshotCreationAttributes
  extends Optional<ProjectSnapshotAttributes, 'id'> {}

class ProjectSnapshot
  extends Model<ProjectSnapshotAttributes, ProjectSnapshotCreationAttributes>
  implements ProjectSnapshotAttributes
{
  public id!: string;
  public projectId!: string;
  public name!: string;
  public flow!: object;
  public userId!: string;
  public createdAt!: Date;
}

ProjectSnapshot.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    projectId: {
      type: DataTypes.UUID,
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
      type: DataTypes.UUID,
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
