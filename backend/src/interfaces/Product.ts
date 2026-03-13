export interface IProduct {
  id?: number;
  name: string;
  productCategoryId: number;
  productSituationId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
