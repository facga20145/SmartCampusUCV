import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryPort } from '../../../infrastructure/adapters/ports/usuario-repository.port';
import { UsuarioEntity } from '../../entities/usuario.entity';

@Injectable()
export class UsuarioFindAllService {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPort) {}

  async execute(): Promise<UsuarioEntity[]> {
    return this.usuarioRepository.findAll();
  }
}