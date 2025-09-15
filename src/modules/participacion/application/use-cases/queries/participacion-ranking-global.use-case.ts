import { Injectable } from '@nestjs/common';
import { ParticipacionRankingGlobalService } from '../../../domain/services/queries/participacion-ranking-global.service';

@Injectable()
export class ParticipacionRankingGlobalUseCase {
  constructor(private readonly service: ParticipacionRankingGlobalService) {}

  async execute(limit?: number) {
    return this.service.execute(limit ?? 10);
  }
}


