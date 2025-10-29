import { Injectable, Inject } from '@nestjs/common';
import { ParticipacionRepositoryPort } from '../../../infrastructure/adapters/ports/participacion-repository.port';
import { ParticipacionEntity } from '../../entities/participacion.entity';
  
@Injectable()
export class ParticipacionFindByUsuarioService {
  constructor(
    @Inject(ParticipacionRepositoryPort)
    private readonly repo: ParticipacionRepositoryPort,
  ) {}

  async execute(usuarioId: number): Promise<ParticipacionEntity[]> {
    return this.repo.findByUsuario(usuarioId);
  }
}

