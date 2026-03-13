export interface IUser {
  id?: number;
  email: string;
  password: string;
  situationId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
