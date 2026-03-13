import { IProductCategory } from '../interfaces/ProductCategory';
import { ProductCategory } from '../models/ProductCategory';

export type ProductCategoryResponse = IProductCategory;

export class ProductCategoryServices {
  /** Criar categoria de produto. */
  static async create(
    data: Omit<IProductCategory, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<ProductCategoryResponse> {
    const category = await ProductCategory.create({
      name: data.name,
    });

    return category.toJSON() as ProductCategoryResponse;
  }

  /** Listar todas as categorias de produto. */
  static async listAll(): Promise<ProductCategoryResponse[]> {
    const categories = await ProductCategory.findAll({ order: [['id', 'ASC']] });
    return categories.map((c) => c.toJSON() as ProductCategoryResponse);
  }

  /** Buscar categoria de produto por id. */
  static async getById(id: number): Promise<ProductCategoryResponse | null> {
    const category = await ProductCategory.findByPk(id);
    return category ? (category.toJSON() as ProductCategoryResponse) : null;
  }

  /** Atualizar categoria de produto por id. */
  static async update(
    id: number,
    data: Partial<Omit<IProductCategory, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ProductCategoryResponse | null> {
    const category = await ProductCategory.findByPk(id);
    if (!category) return null;

    await category.update(data);
    return category.toJSON() as ProductCategoryResponse;
  }

  /** Deletar categoria de produto por id. */
  static async delete(id: number): Promise<boolean> {
    const deleted = await ProductCategory.destroy({ where: { id } });
    return deleted > 0;
  }
}

