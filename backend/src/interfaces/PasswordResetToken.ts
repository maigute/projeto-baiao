export interface IPasswordResetToken {
  id?: number;
  uuid: string;
  userId: number;
  code: string;
  expiresAt: Date;
  usedAt?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
}
