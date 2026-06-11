import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IPasswordResetToken } from '../interfaces/PasswordResetToken';

type PasswordResetTokenCreationAttributes = Optional<
  IPasswordResetToken,
  'id' | 'usedAt' | 'createdAt' | 'updatedAt'
>;

const PasswordResetToken = sequelize.define<
  Model<IPasswordResetToken, PasswordResetTokenCreationAttributes>
>(
  'PasswordResetToken',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'user_id',
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'expires_at',
    },
    usedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'used_at',
    },
  },
  {
    tableName: 'password_reset_tokens',
    timestamps: true,
    underscored: true,
  }
);

export { PasswordResetToken };
