"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductCategoryController = void 0;
const ProductCategoryServices_1 = require("../services/ProductCategoryServices");
class ProductCategoryController {
    static async create(req, res) {
        try {
            const category = await ProductCategoryServices_1.ProductCategoryServices.create(req.body);
            return res.status(201).json(category);
        }
        catch {
            return res.status(500).json({ message: 'Failed to create product category' });
        }
    }
    static async listAll(_req, res) {
        try {
            const categories = await ProductCategoryServices_1.ProductCategoryServices.listAll();
            return res.status(200).json(categories);
        }
        catch {
            return res.status(500).json({ message: 'Failed to list product categories' });
        }
    }
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product category id' });
            }
            const category = await ProductCategoryServices_1.ProductCategoryServices.getById(id);
            if (!category) {
                return res.status(404).json({ message: 'Product category not found' });
            }
            return res.status(200).json(category);
        }
        catch {
            return res.status(500).json({ message: 'Failed to get product category' });
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product category id' });
            }
            const category = await ProductCategoryServices_1.ProductCategoryServices.update(id, req.body);
            if (!category) {
                return res.status(404).json({ message: 'Product category not found' });
            }
            return res.status(200).json(category);
        }
        catch {
            return res.status(500).json({ message: 'Failed to update product category' });
        }
    }
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product category id' });
            }
            const deleted = await ProductCategoryServices_1.ProductCategoryServices.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Product category not found' });
            }
            return res.status(204).send();
        }
        catch {
            return res.status(500).json({ message: 'Failed to delete product category' });
        }
    }
}
exports.ProductCategoryController = ProductCategoryController;
