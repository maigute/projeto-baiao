"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSituationServices = void 0;
const ProductSituation_1 = require("../models/ProductSituation");
class ProductSituationServices {
    /** Criar situação de produto. */
    static async create(data) {
        const situation = await ProductSituation_1.ProductSituation.create({
            name: data.name,
        });
        return situation.toJSON();
    }
    /** Listar todas as situações de produto. */
    static async listAll() {
        const situations = await ProductSituation_1.ProductSituation.findAll({ order: [['id', 'ASC']] });
        return situations.map((s) => s.toJSON());
    }
    /** Buscar situação de produto por id. */
    static async getById(id) {
        const situation = await ProductSituation_1.ProductSituation.findByPk(id);
        return situation ? situation.toJSON() : null;
    }
    /** Atualizar situação de produto por id. */
    static async update(id, data) {
        const situation = await ProductSituation_1.ProductSituation.findByPk(id);
        if (!situation)
            return null;
        await situation.update(data);
        return situation.toJSON();
    }
    /** Deletar situação de produto por id. */
    static async delete(id) {
        const deleted = await ProductSituation_1.ProductSituation.destroy({ where: { id } });
        return deleted > 0;
    }
}
exports.ProductSituationServices = ProductSituationServices;
