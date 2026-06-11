"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SituationServices = void 0;
const Situation_1 = require("../models/Situation");
class SituationServices {
    /** Criar situação. */
    static async create(data) {
        const situation = await Situation_1.Situation.create({
            name: data.name,
        });
        return situation.toJSON();
    }
    /** Listar todas as situações. */
    static async listAll() {
        const situations = await Situation_1.Situation.findAll({ order: [['id', 'ASC']] });
        return situations.map((s) => s.toJSON());
    }
    /** Buscar situação por id. */
    static async getById(id) {
        const situation = await Situation_1.Situation.findByPk(id);
        return situation ? situation.toJSON() : null;
    }
    /** Atualizar situação por id. */
    static async update(id, data) {
        const situation = await Situation_1.Situation.findByPk(id);
        if (!situation)
            return null;
        await situation.update(data);
        return situation.toJSON();
    }
    /** Deletar situação por id. */
    static async delete(id) {
        const deleted = await Situation_1.Situation.destroy({ where: { id } });
        return deleted > 0;
    }
}
exports.SituationServices = SituationServices;
