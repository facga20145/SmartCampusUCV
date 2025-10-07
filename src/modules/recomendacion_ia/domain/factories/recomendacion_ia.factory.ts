import { Recomendacion_iaEntity } from '../entities/recomendacion_ia.entity';
import { IRecomendacion_iaCreate } from '../interfaces/recomendacion_ia-create.interface';

export class Recomendacion_iaFactory {
  static create(data: IRecomendacion_iaCreate): Recomendacion_iaEntity {
    return new Recomendacion_iaEntity(
      0, // El id se asigna al guardar en la base de datos
      data.usuarioId,
      data.actividadId,
      undefined, // fecha se asigna por defecto en la BD
      data.tipo,
      data.aceptada ?? false,
    );
  }
}