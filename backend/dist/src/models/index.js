"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Situation = exports.ProductSituation = exports.ProductCategory = exports.Product = exports.PasswordResetToken = exports.User = exports.sequelize = void 0;
const database_1 = __importDefault(require("../config/database"));
exports.sequelize = database_1.default;
const User_1 = require("./User");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return User_1.User; } });
const Product_1 = require("./Product");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return Product_1.Product; } });
const ProductCategory_1 = require("./ProductCategory");
Object.defineProperty(exports, "ProductCategory", { enumerable: true, get: function () { return ProductCategory_1.ProductCategory; } });
const ProductSituation_1 = require("./ProductSituation");
Object.defineProperty(exports, "ProductSituation", { enumerable: true, get: function () { return ProductSituation_1.ProductSituation; } });
const Situation_1 = require("./Situation");
Object.defineProperty(exports, "Situation", { enumerable: true, get: function () { return Situation_1.Situation; } });
const PasswordResetToken_1 = require("./PasswordResetToken");
Object.defineProperty(exports, "PasswordResetToken", { enumerable: true, get: function () { return PasswordResetToken_1.PasswordResetToken; } });
// User ↔ Situation
User_1.User.belongsTo(Situation_1.Situation, {
    foreignKey: 'situationId',
    as: 'situation',
});
Situation_1.Situation.hasMany(User_1.User, {
    foreignKey: 'situationId',
    as: 'users',
});
// User ↔ PasswordResetToken
User_1.User.hasMany(PasswordResetToken_1.PasswordResetToken, {
    foreignKey: 'userId',
    as: 'passwordResetTokens',
});
PasswordResetToken_1.PasswordResetToken.belongsTo(User_1.User, {
    foreignKey: 'userId',
    as: 'user',
});
// Product ↔ ProductCategory
Product_1.Product.belongsTo(ProductCategory_1.ProductCategory, {
    foreignKey: 'productCategoryId',
    as: 'category',
});
ProductCategory_1.ProductCategory.hasMany(Product_1.Product, {
    foreignKey: 'productCategoryId',
    as: 'products',
});
// Product ↔ ProductSituation
Product_1.Product.belongsTo(ProductSituation_1.ProductSituation, {
    foreignKey: 'productSituationId',
    as: 'situation',
});
ProductSituation_1.ProductSituation.hasMany(Product_1.Product, {
    foreignKey: 'productSituationId',
    as: 'products',
});
