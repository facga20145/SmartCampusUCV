import { ActividadEntity } from '../../../domain/entities/actividad.entity';
import { IActividadCreate } from '../../../domain/interfaces/actividad-create.interface';
import { IActividadUpdate } from '../../../domain/interfaces/actividad-update.interface';
import { IActividadFilters } from '../../../domain/interfaces/actividad-filters.interface';

export abstract class ActividadRepositoryPort {
  abstract create(data: IActividadCreate): Promise<ActividadEntity>;
  abstract findAll(filters?: IActividadFilters): Promise<ActividadEntity[]>;
  abstract findById(id: number): Promise<ActividadEntity | null>;
  abstract update(data: IActividadUpdate): Promise<ActividadEntity>;
  abstract delete(id: number): Promise<void>;
}