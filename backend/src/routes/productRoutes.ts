import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';
import { authenticate } from '../middlewares/authMiddleware';

export const productRouter = Router();

productRouter.use(authenticate);

productRouter.post('/', ProductController.create);
productRouter.get('/', ProductController.listAll);
productRouter.get('/:id', ProductController.getById);
productRouter.put('/:id', ProductController.update);
productRouter.delete('/:id', ProductController.delete);
