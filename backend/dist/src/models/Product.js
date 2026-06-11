"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const Product = database_1.default.define('Product', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    productCategoryId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'product_category_id',
    },
    productSituationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'product_situation_id',
    },
}, {
    tableName: 'products',
    timestamps: true,
    underscored: true,
});
exports.Product = Product;
