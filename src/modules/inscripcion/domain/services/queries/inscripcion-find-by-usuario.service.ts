import { Injectable, Inject } from '@nestjs/common';
import { InscripcionRepositoryPort } from '../../../infrastructure/adapters/ports/inscripcion-repository.port';
  
@Injectable()
export class InscripcionFindByUsuarioService {
  constructor(
    @Inject(InscripcionRepositoryPort)
    private readonly repo: InscripcionRepositoryPort,
  ) {}

  async execute(usuarioId: number): Promise<any[]> {
    return this.repo.findByUsuario(usuarioId);
  }
}

