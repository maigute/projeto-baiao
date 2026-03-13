import { Request, Response } from 'express';
import { ProductServices } from '../services/ProductServices';

export class ProductController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const product = await ProductServices.create(req.body);
      return res.status(201).json(product);
    } catch {
      return res.status(500).json({ message: 'Failed to create product' });
    }
  }

  static async listAll(_req: Request, res: Response): Promise<Response> {
    try {
      const products = await ProductServices.listAll();
      return res.status(200).json(products);
    } catch {
      return res.status(500).json({ message: 'Failed to list products' });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product id' });
      }

      const product = await ProductServices.getById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
    } catch {
      return res.status(500).json({ message: 'Failed to get product' });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product id' });
      }

      const product = await ProductServices.update(id, req.body);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(200).json(product);
    } catch {
      return res.status(500).json({ message: 'Failed to update product' });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product id' });
      }

      const deleted = await ProductServices.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Product not found' });
      }

      return res.status(204).send();
    } catch {
      return res.status(500).json({ message: 'Failed to delete product' });
    }
  }
}
