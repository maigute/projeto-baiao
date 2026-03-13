import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { ISituation } from '../interfaces/Situation';

type SituationCreationAttributes = Optional<ISituation, 'id' | 'createdAt' | 'updatedAt'>;

const Situation = sequelize.define<Model<ISituation, SituationCreationAttributes>>(
  'Situation',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'situations',
    timestamps: true,
    underscored: true,
  }
);

export { Situation };
