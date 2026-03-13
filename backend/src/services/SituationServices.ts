import { ISituation } from '../interfaces/Situation';
import { Situation } from '../models/Situation';

export type SituationResponse = ISituation;

export class SituationServices {
  /** Criar situação. */
  static async create(data: Omit<ISituation, 'id' | 'createdAt' | 'updatedAt'>): Promise<SituationResponse> {
    const situation = await Situation.create({
      name: data.name,
    });

    return situation.toJSON() as SituationResponse;
  }

  /** Listar todas as situações. */
  static async listAll(): Promise<SituationResponse[]> {
    const situations = await Situation.findAll({ order: [['id', 'ASC']] });
    return situations.map((s) => s.toJSON() as SituationResponse);
  }

  /** Buscar situação por id. */
  static async getById(id: number): Promise<SituationResponse | null> {
    const situation = await Situation.findByPk(id);
    return situation ? (situation.toJSON() as SituationResponse) : null;
  }

  /** Atualizar situação por id. */
  static async update(
    id: number,
    data: Partial<Omit<ISituation, 'id' | 'createdAt' | 'updatedAt'>>
  ): Promise<SituationResponse | null> {
    const situation = await Situation.findByPk(id);
    if (!situation) return null;

    await situation.update(data);
    return situation.toJSON() as SituationResponse;
  }

  /** Deletar situação por id. */
  static async delete(id: number): Promise<boolean> {
    const deleted = await Situation.destroy({ where: { id } });
    return deleted > 0;
  }
}

