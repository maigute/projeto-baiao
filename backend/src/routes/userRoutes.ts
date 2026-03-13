import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { authenticate } from '../middlewares/authMiddleware';

export const userRouter = Router();

// Rotas públicas
userRouter.post('/login', UserController.login);

// A partir daqui, todas as rotas exigem JWT
userRouter.use(authenticate);

// CRUD de usuários (protegidos)
userRouter.post('/', UserController.create);
userRouter.get('/', UserController.listAll);
userRouter.get('/:id', UserController.getById);
userRouter.put('/:id', UserController.update);
userRouter.delete('/:id', UserController.delete);

// Autenticação relacionada a usuário (protegida)
userRouter.get('/me', UserController.me);
userRouter.post('/logout', UserController.logout);

