import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryPort } from '../../../infrastructure/adapters/ports/usuario-repository.port';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { IUsuarioCreate } from '../../interfaces/usuario-create.interface';

@Injectable()
export class UsuarioCreateService {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPort) {}

  async execute(data: IUsuarioCreate): Promise<UsuarioEntity> {
    return this.usuarioRepository.create(data);
  }
}