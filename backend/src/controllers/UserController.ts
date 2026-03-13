import { Request, Response } from 'express';
import { UserServices } from '../services/UserServices';

type AuthenticatedRequest = Request & { userId?: number };

export class UserController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await UserServices.create(req.body);
      return res.status(201).json(user);
    } catch (error: any) {
      if (error.message === 'Email already in use') {
        return res.status(409).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Failed to create user' });
    }
  }

  static async listAll(_req: Request, res: Response): Promise<Response> {
    try {
      const users = await UserServices.listAll();
      return res.status(200).json(users);
    } catch {
      return res.status(500).json({ message: 'Failed to list users' });
    }
  }

  static async getById(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user id' });
      }

      const user = await UserServices.getById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch {
      return res.status(500).json({ message: 'Failed to get user' });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user id' });
      }

      const user = await UserServices.update(id, req.body);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch {
      return res.status(500).json({ message: 'Failed to update user' });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: 'Invalid user id' });
      }

      const deleted = await UserServices.delete(id);
      if (!deleted) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(204).send();
    } catch {
      return res.status(500).json({ message: 'Failed to delete user' });
    }
  }

  static async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = await UserServices.login(email, password);
      return res.status(200).json(result);
    } catch (error: any) {
      if (error.message === 'Invalid credentials') {
        return res.status(401).json({ message: error.message });
      }
      return res.status(500).json({ message: 'Failed to login' });
    }
  }

  static async me(req: AuthenticatedRequest, res: Response): Promise<Response> {
    try {
      if (!req.userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const user = await UserServices.getLoggedUser(req.userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user);
    } catch {
      return res.status(500).json({ message: 'Failed to get logged user' });
    }
  }

  static async logout(_req: Request, res: Response): Promise<Response> {
    UserServices.logout();
    return res.status(200).json({ message: 'Logged out successfully' });
  }
}

