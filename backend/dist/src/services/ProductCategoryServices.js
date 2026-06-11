"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryServices = void 0;
const ProductCategory_1 = require("../models/ProductCategory");
class ProductCategoryServices {
    /** Criar categoria de produto. */
    static async create(data) {
        const category = await ProductCategory_1.ProductCategory.create({
            name: data.name,
        });
        return category.toJSON();
    }
    /** Listar todas as categorias de produto. */
    static async listAll() {
        const categories = await ProductCategory_1.ProductCategory.findAll({ order: [['id', 'ASC']] });
        return categories.map((c) => c.toJSON());
    }
    /** Buscar categoria de produto por id. */
    static async getById(id) {
        const category = await ProductCategory_1.ProductCategory.findByPk(id);
        return category ? category.toJSON() : null;
    }
    /** Atualizar categoria de produto por id. */
    static async update(id, data) {
        const category = await ProductCategory_1.ProductCategory.findByPk(id);
        if (!category)
            return null;
        await category.update(data);
        return category.toJSON();
    }
    /** Deletar categoria de produto por id. */
    static async delete(id) {
        const deleted = await ProductCategory_1.ProductCategory.destroy({ where: { id } });
        return deleted > 0;
    }
}
exports.ProductCategoryServices = ProductCategoryServices;
