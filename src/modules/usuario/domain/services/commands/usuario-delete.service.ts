import { Injectable } from '@nestjs/common';
import { UsuarioRepositoryPort } from '../../../infrastructure/adapters/ports/usuario-repository.port';

@Injectable()
export class UsuarioDeleteService {
  constructor(private readonly usuarioRepository: UsuarioRepositoryPort) {}

  async execute(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}