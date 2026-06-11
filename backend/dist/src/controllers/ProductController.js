"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const ProductServices_1 = require("../services/ProductServices");
class ProductController {
    static async create(req, res) {
        try {
            const product = await ProductServices_1.ProductServices.create(req.body);
            return res.status(201).json(product);
        }
        catch {
            return res.status(500).json({ message: 'Failed to create product' });
        }
    }
    static async listAll(_req, res) {
        try {
            const products = await ProductServices_1.ProductServices.listAll();
            return res.status(200).json(products);
        }
        catch {
            return res.status(500).json({ message: 'Failed to list products' });
        }
    }
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product id' });
            }
            const product = await ProductServices_1.ProductServices.getById(id);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        }
        catch {
            return res.status(500).json({ message: 'Failed to get product' });
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product id' });
            }
            const product = await ProductServices_1.ProductServices.update(id, req.body);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(200).json(product);
        }
        catch {
            return res.status(500).json({ message: 'Failed to update product' });
        }
    }
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid product id' });
            }
            const deleted = await ProductServices_1.ProductServices.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'Product not found' });
            }
            return res.status(204).send();
        }
        catch {
            return res.status(500).json({ message: 'Failed to delete product' });
        }
    }
}
exports.ProductController = ProductController;
