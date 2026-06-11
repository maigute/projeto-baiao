"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductSituationController = void 0;
const ProductSituationServices_1 = require("../services/ProductSituationServices");
class ProductSituationController {
    static async create(req, res) {
        try {
            const situation = await ProductSituationServices_1.ProductSituationServices.create(req.body);
            return res.status(201).json(situation);
        }
        catch {
            return res.status(500).json({ message: 'Failed to create product situation' });
        }
    }
    static async listAll(_req, res) {
        try {
            const situations = await ProductSituationServices_1.ProductSituationServices.listAll();
            return res.status(200).json(situations);
        }
        catch {
            return res.status(500).json({ message: 'Failed to list product situations' });
        }
    }
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product situation id' });
            }
            const situation = await ProductSituationServices_1.ProductSituationServices.getById(id);
            if (!situation) {
                return res.status(404).json({ message: 'Product situation not found' });
            }
            return res.status(200).json(situation);
        }
        catch {
            return res.status(500).json({ message: 'Failed to get product situation' });
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product situation id' });
            }
            const situation = await ProductSituationServices_1.ProductSituationServices.update(id, req.body);
            if (!situation) {
                return res.status(404).json({ message: 'Product situation not found' });
            }
            return res.status(200).json(situation);
        }
        catch {
            return res.status(500).json({ message: 'Failed to update product situation' });
        }
    }
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product situation id' });
            }
            const deleted = await ProductSituationServices_1.ProductSituationServices.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Product situation not found' });
            }
            return res.status(204).send();
        }
        catch {
            return res.status(500).json({ message: 'Failed to delete product situation' });
        }
    }
}
exports.ProductSituationController = ProductSituationController;
