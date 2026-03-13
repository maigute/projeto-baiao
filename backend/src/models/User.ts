import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IUser } from '../interfaces/User';

type UserCreationAttributes = Optional<IUser, 'id' | 'createdAt' | 'updatedAt'>;

const User = sequelize.define<Model<IUser, UserCreationAttributes>>(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    situationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'situation_id',
    },
  },
  {
    tableName: 'users',
    timestamps: true,
    underscored: true,
  }
);

export { User };
