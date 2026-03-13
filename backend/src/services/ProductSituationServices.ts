import { IProductSituation } from '../interfaces/ProductSituation';
import { ProductSituation } from '../models/ProductSituation';

export type ProductSituationResponse = IProductSituation;

export class ProductSituationServices {
  /** Criar situação de produto. */
  static async create(
    data: Omit<IProductSituation, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ProductSituationResponse> {
    const situation = await ProductSituation.create({
      name: data.name,
    });

    return situation.toJSON() as ProductSituationResponse;
  }

  /** Listar todas as situações de produto. */
  static async listAll(): Promise<ProductSituationResponse[]> {
    const situations = await ProductSituation.findAll({ order: [['id', 'ASC']] });
    return situations.map((s) => s.toJSON() as ProductSituationResponse);
  }

  /** Buscar situação de produto por id. */
  static async getById(id: number): Promise<ProductSituationResponse | null> {
    const situation = await ProductSituation.findByPk(id);
    return situation ? (situation.toJSON() as ProductSituationResponse) : null;
  }

  /** Atualizar situação de produto por id. */
  static async update(
    id: number,
    data: Partial<Omit<IProductSituation, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ProductSituationResponse | null> {
    const situation = await ProductSituation.findByPk(id);
    if (!situation) return null;

    await situation.update(data);
    return situation.toJSON() as ProductSituationResponse;
  }

  /** Deletar situação de produto por id. */
  static async delete(id: number): Promise<boolean> {
    const deleted = await ProductSituation.destroy({ where: { id } });
    return deleted > 0;
  }
}

