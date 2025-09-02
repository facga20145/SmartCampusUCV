import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from '../../entities/usuario.entity';
import { UsuarioRepositoryPort } from '../../../infrastructure/adapters/ports/usuario-repository.port';

@Injectable()
export class UsuarioFindByIdService {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPort) {}

  async execute(id: number): Promise<UsuarioEntity> {
    return this.usuarioRepository.findById(id);
  }
}