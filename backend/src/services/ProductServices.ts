import { IProduct } from '../interfaces/Product';
import { IProductCategory } from '../interfaces/ProductCategory';
import { IProductSituation } from '../interfaces/ProductSituation';
import { Product, ProductCategory, ProductSituation } from '../models/index';

export type ProductResponse = IProduct & {
  category?: IProductCategory;
  situation?: IProductSituation;
};

export class ProductServices {
  /** Criar produto. */
  static async create(data: Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>): Promise<ProductResponse> {
    const product = await Product.create({
      name: data.name,
      productCategoryId: data.productCategoryId,
      productSituationId: data.productSituationId,
    });

    return product.toJSON() as ProductResponse;
  }

  /** Listar todos os produtos, com ProductCategory e ProductSituation incluídos. */
  static async listAll(): Promise<ProductResponse[]> {
    const products = await Product.findAll({
      order: [['id', 'ASC']],
      include: [
        { model: ProductCategory, as: 'category', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
        { model: ProductSituation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
      ],
    });
    return products.map((p) => p.toJSON() as ProductResponse);
  }

  /** Buscar produto por id, com ProductCategory e ProductSituation incluídos. */
  static async getById(id: number): Promise<ProductResponse | null> {
    const product = await Product.findByPk(id, {
      include: [
        { model: ProductCategory, as: 'category', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
        { model: ProductSituation, as: 'situation', attributes: ['id', 'name', 'createdAt', 'updatedAt'] },
      ],
    });
    return product ? (product.toJSON() as ProductResponse) : null;
  }

  /** Atualizar produto por id. */
  static async update(
    id: number,
    data: Partial<Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<ProductResponse | null> {
    const product = await Product.findByPk(id);
    if (!product) return null;

    await product.update(data);
    return product.toJSON() as ProductResponse;
  }

  /** Deletar produto por id. */
  static async delete(id: number): Promise<boolean> {
    const deleted = await Product.destroy({ where: { id } });
    return deleted > 0;
  }
}

