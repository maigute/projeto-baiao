import { Router } from 'express';
import { ProductSituationController } from '../controllers/ProductSituationController';
import { authenticate } from '../middlewares/authMiddleware';

export const productSituationRouter = Router();

productSituationRouter.use(authenticate);

productSituationRouter.post('/', ProductSituationController.create);
productSituationRouter.get('/', ProductSituationController.listAll);
productSituationRouter.get('/:id', ProductSituationController.getById);
productSituationRouter.put('/:id', ProductSituationController.update);
productSituationRouter.delete('/:id', ProductSituationController.delete);
