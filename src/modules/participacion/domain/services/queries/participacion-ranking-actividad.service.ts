import { Injectable, Inject } from '@nestjs/common';
import { ParticipacionRepositoryPort } from '../../../infrastructure/adapters/ports/participacion-repository.port';

@Injectable()
export class ParticipacionRankingActividadService {
  constructor(
    @Inject(ParticipacionRepositoryPort)
    private readonly repo: ParticipacionRepositoryPort,
  ) {}

  async execute(actividadId: number, limit = 10) {
    return this.repo.aggregateRankingByActividad(actividadId, limit);
  }
}


