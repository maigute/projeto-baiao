import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IProductCategory } from '../interfaces/ProductCategory';

type ProductCategoryCreationAttributes = Optional<
  IProductCategory,
  'id' | 'createdAt' | 'updatedAt'
>;

const ProductCategory = sequelize.define<
  Model<IProductCategory, ProductCategoryCreationAttributes>
>(
  'ProductCategory',
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
    tableName: 'product_categories',
    timestamps: true,
    underscored: true,
  }
);

export { ProductCategory };
