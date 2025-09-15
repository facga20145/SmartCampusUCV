import { ReconocimientoEntity } from '../../../domain/entities/reconocimiento.entity';
import { IReconocimientoCreate } from '../../../domain/interfaces/reconocimiento-create.interface';
import { IReconocimientoUpdate } from '../../../domain/interfaces/reconocimiento-update.interface';

export abstract class ReconocimientoRepositoryPort {
  abstract create(data: IReconocimientoCreate): Promise<ReconocimientoEntity>;
  abstract findByUsuario(usuarioId: number): Promise<ReconocimientoEntity[]>;
}