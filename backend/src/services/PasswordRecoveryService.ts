import { v4 as uuidv4 } from 'uuid';
import { Op } from 'sequelize';
import { User, PasswordResetToken } from '../models/index';
import { EmailService } from './EmailService';
import { hashPassword, comparePassword } from '../utils/auth';

const RECOVERY_CODE_LENGTH = 6;
const RECOVERY_EXPIRES_MINUTES = 15;
const MIN_PASSWORD_LENGTH = 8;

const GENERIC_RECOVERY_MESSAGE =
  'Se o e-mail estiver cadastrado, você receberá um código de recuperação.';

function generateRecoveryCode(): string {
  const min = 10 ** (RECOVERY_CODE_LENGTH - 1);
  const max = 10 ** RECOVERY_CODE_LENGTH - 1;
  return String(Math.floor(min + Math.random() * (max - min + 1)));
}

function getExpirationDate(): Date {
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + RECOVERY_EXPIRES_MINUTES);
  return expiresAt;
}

export class PasswordRecoveryService {
  static async requestRecovery(email: string): Promise<{ uuid?: string; message: string }> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { message: GENERIC_RECOVERY_MESSAGE };
    }

    const plainCode = generateRecoveryCode();
    const codeHash = await hashPassword(plainCode);
    const uuid = uuidv4();
    const userId = user.get('id') as number;

    await PasswordResetToken.update(
      { usedAt: new Date() },
      { where: { userId, usedAt: null } }
    );

    await PasswordResetToken.create({
      uuid,
      userId,
      code: codeHash,
      expiresAt: getExpirationDate(),
    });

    await EmailService.sendPasswordRecoveryCode(email, plainCode);

    return { uuid, message: GENERIC_RECOVERY_MESSAGE };
  }

  static async setNewPassword(uuid: string, code: string, password: string): Promise<void> {
    if (!code || !password) {
      throw new Error('Code and password are required');
    }

    if (password.length < MIN_PASSWORD_LENGTH) {
      throw new Error(`Password must be at least ${MIN_PASSWORD_LENGTH} characters`);
    }

    const token = await PasswordResetToken.findOne({ where: { uuid } });
    if (!token) {
      throw new Error('Recovery request not found');
    }

    if (token.get('usedAt')) {
      throw new Error('Recovery code already used');
    }

    const expiresAt = token.get('expiresAt') as Date;
    if (expiresAt.getTime() < Date.now()) {
      throw new Error('Recovery code expired');
    }

    const isValidCode = await comparePassword(code, token.get('code') as string);
    if (!isValidCode) {
      throw new Error('Invalid recovery code');
    }

    const userId = token.get('userId') as number;
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('Recovery request not found');
    }

    const passwordHash = await hashPassword(password);
    await user.update({ password: passwordHash });
    await token.update({ usedAt: new Date() });

    const tokenId = token.get('id') as number;
    await PasswordResetToken.update(
      { usedAt: new Date() },
      { where: { userId, usedAt: null, id: { [Op.ne]: tokenId } } }
    );
  }
}
