import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { IProductSituation } from '../interfaces/ProductSituation';

type ProductSituationCreationAttributes = Optional<
  IProductSituation,
  'id' | 'createdAt' | 'updatedAt'
>;

const ProductSituation = sequelize.define<
  Model<IProductSituation, ProductSituationCreationAttributes>
>(
  'ProductSituation',
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
    tableName: 'product_situations',
    timestamps: true,
    underscored: true,
  }
);

export { ProductSituation };
