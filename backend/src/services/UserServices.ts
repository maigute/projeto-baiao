import { IUser } from '../interfaces/User';
import { ISituation } from '../interfaces/Situation';
import { User, Situation } from '../models/index';
import { hashPassword, comparePassword, generateAuthToken } from '../utils/auth';

export type UserResponse = Omit<IUser, 'password'> & { situation?: ISituation };

export interface AuthResult {
  user: UserResponse;
  token: string;
}

function toUserResponse(user: InstanceType<typeof User>): UserResponse {
  const json = user.toJSON() as IUser;
  const { password: _, ...rest } = json;
  return rest;
}

export class UserServices {
  /** Criar usuário (senha é hasheada antes de persistir). */
  static async create(data: Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserResponse> {
    const existing = await User.findOne({ where: { email: data.email } });
    if (existing) {
      throw new Error('Email already in use');
    }
    const passwordHash = await hashPassword(data.password);
    const user = await User.create({
      email: data.email,
      password: passwordHash,
      situationId: data.situationId,
    });
    return toUserResponse(user);
  }

  /** Listar todos os usuários (sem senha), com Situation incluída. */
  static async listAll(): Promise<UserResponse[]> {
    const users = await User.findAll({
      order: [['id', 'ASC']],
      include: [{ model: Situation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] }],
    });
    return users.map(toUserResponse);
  }

  /** Listar usuário por id (sem senha), com Situation incluída. */
  static async getById(id: number): Promise<UserResponse | null> {
    const user = await User.findByPk(id, {
      include: [{ model: Situation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] }],
    });
    return user ? toUserResponse(user) : null;
  }

  /** Atualizar usuário. Se `password` vier no payload, será hasheada antes de salvar. */
  static async update(
    id: number,
    data: Partial<Omit<IUser, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<UserResponse | null> {
    const user = await User.findByPk(id);
    if (!user) return null;

    const payload: Partial<IUser> = { ...data };
    if (data.password !== undefined && data.password !== '') {
      payload.password = await hashPassword(data.password);
    } else if (data.password === '') {
      delete (payload as Record<string, unknown>).password;
    }

    await user.update(payload);
    return toUserResponse(user);
  }

  /** Deletar usuário por id. */
  static async delete(id: number): Promise<boolean> {
    const deleted = await User.destroy({ where: { id } });
    return deleted > 0;
  }

  /** Login: valida email/senha e retorna usuário (sem senha) e token JWT. */
  static async login(email: string, password: string): Promise<AuthResult> {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const isValid = await comparePassword(password, user.get('password') as string);
    if (!isValid) {
      throw new Error('Invalid credentials');
    }
    const plainUser = user.toJSON() as IUser;
    const token = generateAuthToken(plainUser);
    return {
      user: toUserResponse(user),
      token,
    };
  }

  /** Obter dados do usuário logado por id (sem senha). */
  static async getLoggedUser(userId: number): Promise<UserResponse | null> {
    return UserServices.getById(userId);
  }

  /** Logout: invalidação é client-side; o backend apenas confirma sucesso. */
  static logout(): void {
    // Nenhuma ação no servidor. O cliente descarta o token.
  }
}

