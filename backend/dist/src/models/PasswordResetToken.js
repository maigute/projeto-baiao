"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordResetToken = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const PasswordResetToken = database_1.default.define('PasswordResetToken', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    uuid: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false,
        unique: true,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    expiresAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        field: 'expires_at',
    },
    usedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        field: 'used_at',
    },
}, {
    tableName: 'password_reset_tokens',
    timestamps: true,
    underscored: true,
});
exports.PasswordResetToken = PasswordResetToken;
