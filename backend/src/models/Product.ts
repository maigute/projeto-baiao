import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IProduct } from '../interfaces/Product';

type ProductCreationAttributes = Optional<IProduct, 'id' | 'createdAt' | 'updatedAt'>;

const Product = sequelize.define<Model<IProduct, ProductCreationAttributes>>(
  'Product',
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
    productCategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_category_id',
    },
    productSituationId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'product_situation_id',
    },
  },
  {
    tableName: 'products',
    timestamps: true,
    underscored: true,
  }
);

export { Product };
