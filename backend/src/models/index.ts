import sequelize from '../config/database';
import { User } from './User';
import { Product } from './Product';
import { ProductCategory } from './ProductCategory';
import { ProductSituation } from './ProductSituation';
import { Situation } from './Situation';

// User ↔ Situation
User.belongsTo(Situation, {
  foreignKey: 'situationId',
  as: 'situation',
});

Situation.hasMany(User, {
  foreignKey: 'situationId',
  as: 'users',
});

// Product ↔ ProductCategory
Product.belongsTo(ProductCategory, {
  foreignKey: 'productCategoryId',
  as: 'category',
});

ProductCategory.hasMany(Product, {
  foreignKey: 'productCategoryId',
  as: 'products',
});

// Product ↔ ProductSituation
Product.belongsTo(ProductSituation, {
  foreignKey: 'productSituationId',
  as: 'situation',
});

ProductSituation.hasMany(Product, {
  foreignKey: 'productSituationId',
  as: 'products',
});

export { sequelize, User, Product, ProductCategory, ProductSituation, Situation };
