import { ActividadEntity } from '../entities/actividad.entity';
import { IActividadCreate } from '../interfaces/actividad-create.interface';
import { IActividadUpdate } from '../interfaces/actividad-update.interface';

export class ActividadFactory {
  static createFrom(data: IActividadCreate, id: number): ActividadEntity {
    return new ActividadEntity(
      id,
      data.titulo,
      data.descripcion ?? null,
      data.categoria,
      data.fecha,
      data.hora,
      data.lugar,
      data.maxParticipantes ?? null,
      data.nivelSostenibilidad ?? null,
      data.organizadorId,
    );
  }

  static merge(entity: ActividadEntity, changes: IActividadUpdate): ActividadEntity {
    return new ActividadEntity(
      entity.id,
      changes.titulo ?? entity.titulo,
      changes.descripcion ?? entity.descripcion,
      changes.categoria ?? entity.categoria,
      changes.fecha ?? entity.fecha,
      changes.hora ?? entity.hora,
      changes.lugar ?? entity.lugar,
      changes.maxParticipantes ?? entity.maxParticipantes,
      changes.nivelSostenibilidad ?? entity.nivelSostenibilidad,
      entity.organizadorId,
    );
  }
}