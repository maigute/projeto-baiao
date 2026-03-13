import { Request, Response } from 'express';
import { ProductSituationServices } from '../services/ProductSituationServices';

export class ProductSituationController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const situation = await ProductSituationServices.create(req.body);
      return res.status(201).json(situation);
    } catch {
      return res.status(500).json({ message: 'Failed to create product situation' });
    }
  }

  static async listAll(_req: Request, res: Response): Promise<Response> {
    try {
      const situations = await ProductSituationServices.listAll();
      return res.status(200).json(situations);
    } catch {
      return res.status(500).json({ message: 'Failed to list product situations' });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product situation id' });
      }

      const situation = await ProductSituationServices.getById(id);
      if (!situation) {
        return res.status(404).json({ message: 'Product situation not found' });
      }

      return res.status(200).json(situation);
    } catch {
      return res.status(500).json({ message: 'Failed to get product situation' });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product situation id' });
      }

      const situation = await ProductSituationServices.update(id, req.body);
      if (!situation) {
        return res.status(404).json({ message: 'Product situation not found' });
      }

      return res.status(200).json(situation);
    } catch {
      return res.status(500).json({ message: 'Failed to update product situation' });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid product situation id' });
      }

      const deleted = await ProductSituationServices.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Product situation not found' });
      }

      return res.status(204).send();
    } catch {
      return res.status(500).json({ message: 'Failed to delete product situation' });
    }
  }
}
