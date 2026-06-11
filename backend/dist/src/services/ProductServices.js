"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const index_1 = require("../models/index");
class ProductServices {
    /** Criar produto. */
    static async create(data) {
        const product = await index_1.Product.create({
            name: data.name,
            productCategoryId: data.productCategoryId,
            productSituationId: data.productSituationId,
        });
        return product.toJSON();
    }
    /** Listar todos os produtos, com ProductCategory e ProductSituation incluídos. */
    static async listAll() {
        const products = await index_1.Product.findAll({
            order: [['id', 'ASC']],
            include: [
                { model: index_1.ProductCategory, as: 'category', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
                { model: index_1.ProductSituation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
            ],
        });
        return products.map((p) => p.toJSON());
    }
    /** Buscar produto por id, com ProductCategory e ProductSituation incluídos. */
    static async getById(id) {
        const product = await index_1.Product.findByPk(id, {
            include: [
                { model: index_1.ProductCategory, as: 'category', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
                { model: index_1.ProductSituation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
            ],
        });
        return product ? product.toJSON() : null;
    }
    /** Atualizar produto por id. */
    static async update(id, data) {
        const product = await index_1.Product.findByPk(id);
        if (!product)
            return null;
        await product.update(data);
        return product.toJSON();
    }
    /** Deletar produto por id. */
    static async delete(id) {
        const deleted = await index_1.Product.destroy({ where: { id } });
        return deleted > 0;
    }
}
exports.ProductServices = ProductServices;
