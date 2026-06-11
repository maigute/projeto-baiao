"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswordRecoveryService = void 0;
const uuid_1 = require("uuid");
const sequelize_1 = require("sequelize");
const index_1 = require("../models/index");
const EmailService_1 = require("./EmailService");
const auth_1 = require("../utils/auth");
const RECOVERY_CODE_LENGTH = 6;
const RECOVERY_EXPIRES_MINUTES = 15;
const MIN_PASSWORD_LENGTH = 8;
const GENERIC_RECOVERY_MESSAGE = 'Se o e-mail estiver cadastrado, você receberá um código de recuperação.';
function generateRecoveryCode() {
    const min = 10 ** (RECOVERY_CODE_LENGTH - 1);
    const max = 10 ** RECOVERY_CODE_LENGTH - 1;
    return String(Math.floor(min + Math.random() * (max - min + 1)));
}
function getExpirationDate() {
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + RECOVERY_EXPIRES_MINUTES);
    return expiresAt;
}
class PasswordRecoveryService {
    static async requestRecovery(email) {
        const user = await index_1.User.findOne({ where: { email } });
        if (!user) {
            return { message: GENERIC_RECOVERY_MESSAGE };
        }
        const plainCode = generateRecoveryCode();
        const codeHash = await (0, auth_1.hashPassword)(plainCode);
        const uuid = (0, uuid_1.v4)();
        const userId = user.get('id');
        await index_1.PasswordResetToken.update({ usedAt: new Date() }, { where: { userId, usedAt: null } });
        await index_1.PasswordResetToken.create({
            uuid,
            userId,
            code: codeHash,
            expiresAt: getExpirationDate(),
        });
        await EmailService_1.EmailService.sendPasswordRecoveryCode(email, plainCode);
        return { uuid, message: GENERIC_RECOVERY_MESSAGE };
    }
    static async setNewPassword(uuid, code, password) {
        if (!code || !password) {
            throw new Error('Code and password are required');
        }
        if (password.length < MIN_PASSWORD_LENGTH) {
            throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
        }
        const token = await index_1.PasswordResetToken.findOne({ where: { uuid } });
        if (!token) {
            throw new Error('Recovery request not found');
        }
        if (token.get('usedAt')) {
            throw new Error('Recovery code already used');
        }
        const expiresAt = token.get('expiresAt');
        if (expiresAt.getTime() < Date.now()) {
            throw new Error('Recovery code expired');
        }
        const isValidCode = await (0, auth_1.comparePassword)(code, token.get('code'));
        if (!isValidCode) {
            throw new Error('Invalid recovery code');
        }
        const userId = token.get('userId');
        const user = await index_1.User.findByPk(userId);
        if (!user) {
            throw new Error('Recovery request not found');
        }
        const passwordHash = await (0, auth_1.hashPassword)(password);
        await user.update({ password: passwordHash });
        await token.update({ usedAt: new Date() });
        const tokenId = token.get('id');
        await index_1.PasswordResetToken.update({ usedAt: new Date() }, { where: { userId, usedAt: null, id: { [sequelize_1.Op.ne]: tokenId } } });
    }
}
exports.PasswordRecoveryService = PasswordRecoveryService;
