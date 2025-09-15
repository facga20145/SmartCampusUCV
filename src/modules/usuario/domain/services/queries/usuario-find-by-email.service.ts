import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryPort } from '../../../infrastructure/adapters/ports/usuario-repository.port';
import { UsuarioEntity } from '../../entities/usuario.entity';

@Injectable()
export class UsuarioFindByEmailService {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPort) {}

  async execute(email: string): Promise<UsuarioEntity | null> {
    return this.usuarioRepository.findByEmail(email);
  }
}
