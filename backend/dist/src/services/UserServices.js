"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const index_1 = require("../models/index");
const auth_1 = require("../utils/auth");
function toUserResponse(user) {
    const json = user.toJSON();
    const { password: _, ...rest } = json;
    return rest;
}
class UserServices {
    /** Criar usuário (senha é hasheada antes de persistir). */
    static async create(data) {
        const existing = await index_1.User.findOne({ where: { email: data.email } });
        if (existing) {
            throw new Error('Email already in use');
        }
        const passwordHash = await (0, auth_1.hashPassword)(data.password);
        const user = await index_1.User.create({
            email: data.email,
            password: passwordHash,
            situationId: data.situationId,
        });
        return toUserResponse(user);
    }
    /** Listar todos os usuários (sem senha), com Situation incluída. */
    static async listAll() {
        const users = await index_1.User.findAll({
            order: [['id', 'ASC']],
            include: [{ model: index_1.Situation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] }],
        });
        return users.map(toUserResponse);
    }
    /** Listar usuário por id (sem senha), com Situation incluída. */
    static async getById(id) {
        const user = await index_1.User.findByPk(id, {
            include: [{ model: index_1.Situation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] }],
        });
        return user ? toUserResponse(user) : null;
    }
    /** Atualizar usuário. Se `password` vier no payload, será hasheada antes de salvar. */
    static async update(id, data) {
        const user = await index_1.User.findByPk(id);
        if (!user)
            return null;
        const payload = { ...data };
        if (data.password !== undefined && data.password !== '') {
            payload.password = await (0, auth_1.hashPassword)(data.password);
        }
        else if (data.password === '') {
            delete payload.password;
        }
        await user.update(payload);
        return toUserResponse(user);
    }
    /** Deletar usuário por id. */
    static async delete(id) {
        const deleted = await index_1.User.destroy({ where: { id } });
        return deleted > 0;
    }
    /** Login: valida email/senha e retorna usuário (sem senha) e token JWT. */
    static async login(email, password) {
        const user = await index_1.User.findOne({ where: { email } });
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isValid = await (0, auth_1.comparePassword)(password, user.get('password'));
        if (!isValid) {
            throw new Error('Invalid credentials');
        }
        const plainUser = user.toJSON();
        const token = (0, auth_1.generateAuthToken)(plainUser);
        return {
            user: toUserResponse(user),
            token,
        };
    }
    /** Obter dados do usuário logado por id (sem senha). */
    static async getLoggedUser(userId) {
        return UserServices.getById(userId);
    }
    /** Logout: invalidação é client-side; o backend apenas confirma sucesso. */
    static logout() {
        // Nenhuma ação no servidor. O cliente descarta o token.
    }
}
exports.UserServices = UserServices;
