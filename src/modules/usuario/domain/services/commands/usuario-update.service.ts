import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryPort } from '../../../infrastructure/adapters/ports/usuario-repository.port';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { IUsuarioUpdate } from '../../interfaces/usuario-update.interface';

@Injectable()
export class UsuarioUpdateService {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPort) {}

  async execute(data: IUsuarioUpdate): Promise<UsuarioEntity> {
    return this.usuarioRepository.update(data);
  }
}