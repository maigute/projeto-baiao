import { Router } from 'express';
import { userRouter } from './userRoutes';
import { productRouter } from './productRoutes';
import { productCategoryRouter } from './productCategoryRoutes';
import { productSituationRouter } from './productSituationRoutes';
import { situationRouter } from './situationRoutes';

const router = Router();

router.use('/users', userRouter);
router.use('/products', productRouter);
router.use('/product-categories', productCategoryRouter);
router.use('/product-situations', productSituationRouter);
router.use('/situations', situationRouter);

export default router;
