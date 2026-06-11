"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserServices_1 = require("../services/UserServices");
const PasswordRecoveryService_1 = require("../services/PasswordRecoveryService");
class UserController {
    static async create(req, res) {
        try {
            const user = await UserServices_1.UserServices.create(req.body);
            return res.status(201).json(user);
        }
        catch (error) {
            if (error.message === 'Email already in use') {
                return res.status(409).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Failed to create user' });
        }
    }
    static async listAll(_req, res) {
        try {
            const users = await UserServices_1.UserServices.listAll();
            return res.status(200).json(users);
        }
        catch {
            return res.status(500).json({ message: 'Failed to list users' });
        }
    }
    static async getById(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user id' });
            }
            const user = await UserServices_1.UserServices.getById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        }
        catch {
            return res.status(500).json({ message: 'Failed to get user' });
        }
    }
    static async update(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user id' });
            }
            const user = await UserServices_1.UserServices.update(id, req.body);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        }
        catch {
            return res.status(500).json({ message: 'Failed to update user' });
        }
    }
    static async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (Number.isNaN(id)) {
                return res.status(400).json({ message: 'Invalid user id' });
            }
            const deleted = await UserServices_1.UserServices.delete(id);
            if (!deleted) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(204).send();
        }
        catch {
            return res.status(500).json({ message: 'Failed to delete user' });
        }
    }
    static async recoveryPassword(req, res) {
        try {
            const { email } = req.body;
            if (!email) {
                return res.status(400).json({ message: 'Email is required' });
            }
            const result = await PasswordRecoveryService_1.PasswordRecoveryService.requestRecovery(email);
            return res.status(200).json(result);
        }
        catch (error) {
            if (error.message === 'Mailtrap credentials are not configured') {
                return res.status(500).json({ message: 'Email service is not configured' });
            }
            return res.status(500).json({ message: 'Failed to request password recovery' });
        }
    }
    static async setNewPassword(req, res) {
        var _a;
        try {
            const uuid = String((_a = req.params.uuid) !== null && _a !== void 0 ? _a : '');
            const { code, password } = req.body;
            if (!uuid) {
                return res.status(400).json({ message: 'Recovery uuid is required' });
            }
            await PasswordRecoveryService_1.PasswordRecoveryService.setNewPassword(uuid, code, password);
            return res.status(200).json({ message: 'Password updated successfully' });
        }
        catch (error) {
            const clientErrors = [
                'Code and password are required',
                'Password must be at least 8 characters',
                'Recovery code already used',
                'Recovery code expired',
                'Invalid recovery code',
            ];
            if (clientErrors.includes(error.message)) {
                return res.status(400).json({ message: error.message });
            }
            if (error.message === 'Recovery request not found') {
                return res.status(404).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Failed to update password' });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            if (!email || !password) {
                return res.status(400).json({ message: 'Email and password are required' });
            }
            const result = await UserServices_1.UserServices.login(email, password);
            return res.status(200).json(result);
        }
        catch (error) {
            if (error.message === 'Invalid credentials') {
                return res.status(401).json({ message: error.message });
            }
            return res.status(500).json({ message: 'Failed to login' });
        }
    }
    static async me(req, res) {
        try {
            if (!req.userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const user = await UserServices_1.UserServices.getLoggedUser(req.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            return res.status(200).json(user);
        }
        catch {
            return res.status(500).json({ message: 'Failed to get logged user' });
        }
    }
    static async logout(_req, res) {
        UserServices_1.UserServices.logout();
        return res.status(200).json({ message: 'Logged out successfully' });
    }
}
exports.UserController = UserController;
