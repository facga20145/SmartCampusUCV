import { Injectable, Inject } from '@nestjs/common';
import { ParticipacionRepositoryPort } from '../../../infrastructure/adapters/ports/participacion-repository.port';

@Injectable()
export class ParticipacionRankingGlobalService {
  constructor(
    @Inject(ParticipacionRepositoryPort)
    private readonly repo: ParticipacionRepositoryPort,
  ) {}

  async execute(limit = 10) {
    return this.repo.aggregateRankingGlobal(limit);
  }
}


