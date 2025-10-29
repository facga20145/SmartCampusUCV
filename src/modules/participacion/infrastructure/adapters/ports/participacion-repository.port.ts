import { ParticipacionEntity } from '../../../domain/entities/participacion.entity';
import { IParticipacionCreate } from '../../../domain/interfaces/participacion-create.interface';
import { IParticipacionUpdate } from '../../../domain/interfaces/participacion-update.interface';

export abstract class ParticipacionRepositoryPort {
  abstract create(data: IParticipacionCreate): Promise<ParticipacionEntity>;
  abstract update(data: IParticipacionUpdate): Promise<ParticipacionEntity>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<ParticipacionEntity | null>;
  abstract findByActividad(actividadId: number): Promise<ParticipacionEntity[]>;
  abstract findByUsuario(usuarioId: number): Promise<ParticipacionEntity[]>;
  abstract findByUsuarioAndActividad(usuarioId: number, actividadId: number): Promise<ParticipacionEntity | null>;
  abstract aggregateRankingByActividad(actividadId: number, limit?: number): Promise<Array<{ usuarioId: number; puntos: number; usuario?: any }>>;
  abstract aggregateRankingGlobal(limit?: number): Promise<Array<{ usuarioId: number; puntos: number; usuario?: any }>>;
}