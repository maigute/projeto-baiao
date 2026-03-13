import { Router } from 'express';
import { ProductCategoryController } from '../controllers/ProductCategoryController';
import { authenticate } from '../middlewares/authMiddleware';

export const productCategoryRouter = Router();

productCategoryRouter.use(authenticate);

productCategoryRouter.post('/', ProductCategoryController.create);
productCategoryRouter.get('/', ProductCategoryController.listAll);
productCategoryRouter.get('/:id', ProductCategoryController.getById);
productCategoryRouter.put('/:id', ProductCategoryController.update);
productCategoryRouter.delete('/:id', ProductCategoryController.delete);

