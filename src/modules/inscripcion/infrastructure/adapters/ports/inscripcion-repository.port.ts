import { InscripcionEntity } from '../../../domain/entities/inscripcion.entity';
import { IInscripcionCreate } from '../../../domain/interfaces/inscripcion-create.interface';
import { IInscripcionUpdate } from '../../../domain/interfaces/inscripcion-update.interface';

export abstract class InscripcionRepositoryPort {
  abstract create(data: IInscripcionCreate): Promise<InscripcionEntity>;
  abstract update(data: IInscripcionUpdate): Promise<InscripcionEntity>;
  abstract delete(id: number): Promise<void>;
  abstract findById(id: number): Promise<InscripcionEntity | null>;
  abstract findByActividad(actividadId: number): Promise<InscripcionEntity[]>;
  abstract findByUsuario(usuarioId: number): Promise<any[]>;
}