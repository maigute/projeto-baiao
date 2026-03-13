import { Request, Response } from 'express';
import { SituationServices } from '../services/SituationServices';

export class SituationController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const situation = await SituationServices.create(req.body);
      return res.status(201).json(situation);
    } catch {
      return res.status(500).json({ message: 'Failed to create situation' });
    }
  }

  static async listAll(_req: Request, res: Response): Promise<Response> {
    try {
      const situations = await SituationServices.listAll();
      return res.status(200).json(situations);
    } catch {
      return res.status(500).json({ message: 'Failed to list situations' });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid situation id' });
      }

      const situation = await SituationServices.getById(id);
      if (!situation) {
        return res.status(404).json({ message: 'Situation not found' });
      }

      return res.status(200).json(situation);
    } catch {
      return res.status(500).json({ message: 'Failed to get situation' });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid situation id' });
      }

      const situation = await SituationServices.update(id, req.body);
      if (!situation) {
        return res.status(404).json({ message: 'Situation not found' });
      }

      return res.status(200).json(situation);
    } catch {
      return res.status(500).json({ message: 'Failed to update situation' });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid situation id' });
      }

      const deleted = await SituationServices.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'Situation not found' });
      }

      return res.status(204).send();
    } catch {
      return res.status(500).json({ message: 'Failed to delete situation' });
    }
  }
}

