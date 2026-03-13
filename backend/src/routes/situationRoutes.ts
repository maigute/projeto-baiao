import { Router } from 'express';
import { SituationController } from '../controllers/SituationController';
import { authenticate } from '../middlewares/authMiddleware';

export const situationRouter = Router();

situationRouter.use(authenticate);

situationRouter.post('/', SituationController.create);
situationRouter.get('/', SituationController.listAll);
situationRouter.get('/:id', SituationController.getById);
situationRouter.put('/:id', SituationController.update);
situationRouter.delete('/:id', SituationController.delete);

