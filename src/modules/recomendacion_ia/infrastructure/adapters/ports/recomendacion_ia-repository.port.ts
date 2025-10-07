import { IRecomendacion_iaCreate } from '../../../domain/interfaces/recomendacion_ia-create.interface';
import { IRecomendacion_iaUpdate } from '../../../domain/interfaces/recomendacion_ia-update.interface';
import { Recomendacion_iaEntity } from '../../../domain/entities/recomendacion_ia.entity';

export abstract class RecomendacionIaRepositoryPort {
  abstract create(data: IRecomendacion_iaCreate): Promise<Recomendacion_iaEntity>;
  abstract update(data: IRecomendacion_iaUpdate): Promise<Recomendacion_iaEntity>;
  abstract findAll(): Promise<Recomendacion_iaEntity[]>;
  abstract findById(id: number): Promise<Recomendacion_iaEntity | null>;
}