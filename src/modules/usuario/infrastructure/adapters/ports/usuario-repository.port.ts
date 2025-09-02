import { IUsuarioCreate } from '../../../domain/interfaces/usuario-create.interface';
import { IUsuarioUpdate } from '../../../domain/interfaces/usuario-update.interface';
import { UsuarioEntity } from '../../../domain/entities/usuario.entity';

export abstract class UsuarioRepositoryPort {
  abstract create(data: IUsuarioCreate): Promise<UsuarioEntity>;
  abstract findAll(): Promise<UsuarioEntity[]>;
  abstract findById(id: number): Promise<UsuarioEntity | null>;
  abstract findByEmail(email: string): Promise<UsuarioEntity | null>;
  abstract update(data: IUsuarioUpdate): Promise<UsuarioEntity>;
  abstract delete(id: number): Promise<void>;
}