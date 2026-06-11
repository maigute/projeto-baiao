"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middlewares/authMiddleware");
exports.userRouter = (0, express_1.Router)();
// Rotas públicas
exports.userRouter.post('/login', UserController_1.UserController.login);
exports.userRouter.post('/recovery-password', UserController_1.UserController.recoveryPassword);
exports.userRouter.post('/set-new-password/:uuid', UserController_1.UserController.setNewPassword);
// A partir daqui, todas as rotas exigem JWT
exports.userRouter.use(authMiddleware_1.authenticate);
// CRUD de usuários (protegidos)
exports.userRouter.post('/', UserController_1.UserController.create);
exports.userRouter.get('/', UserController_1.UserController.listAll);
exports.userRouter.get('/:id', UserController_1.UserController.getById);
exports.userRouter.put('/:id', UserController_1.UserController.update);
exports.userRouter.delete('/:id', UserController_1.UserController.delete);
// Autenticação relacionada a usuário (protegida)
exports.userRouter.get('/me', UserController_1.UserController.me);
exports.userRouter.post('/logout', UserController_1.UserController.logout);
