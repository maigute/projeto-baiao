"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SituationController = void 0;
const SituationServices_1 = require("../services/SituationServices");
class SituationController {
    static async create(req, res) {
        try {
            const situation = await SituationServices_1.SituationServices.create(req.body);
            return res.status(201).json(situation);
        }
        catch {
            return res.status(500).json({ message: 'Failed to create situation' });
        }
    }
    static async listAll(_req, res) {
        try {
            const situations = await SituationServices_1.SituationServices.listAll();
            return res.status(200).json(situations);
        }
        catch {
            return res.status(500).json({ message: 'Failed to list situations' });
        }
    }
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid situation id' });
            }
            const situation = await SituationServices_1.SituationServices.getById(id);
            if (!situation) {
                return res.status(404).json({ message: 'Situation not found' });
            }
            return res.status(200).json(situation);
        }
        catch {
            return res.status(500).json({ message: 'Failed to get situation' });
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid situation id' });
            }
            const situation = await SituationServices_1.SituationServices.update(id, req.body);
            if (!situation) {
                return res.status(404).json({ message: 'Situation not found' });
            }
            return res.status(200).json(situation);
        }
        catch {
            return res.status(500).json({ message: 'Failed to update situation' });
        }
    }
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid situation id' });
            }
            const deleted = await SituationServices_1.SituationServices.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Situation not found' });
            }
            return res.status(204).send();
        }
        catch {
            return res.status(500).json({ message: 'Failed to delete situation' });
        }
    }
}
exports.SituationController = SituationController;
