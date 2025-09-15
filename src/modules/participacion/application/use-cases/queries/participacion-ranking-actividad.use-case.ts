import { Injectable } from '@nestjs/common';
import { ParticipacionRankingActividadService } from '../../../domain/services/queries/participacion-ranking-actividad.service';

@Injectable()
export class ParticipacionRankingActividadUseCase {
  constructor(private readonly service: ParticipacionRankingActividadService) {}

  async execute(actividadId: number, limit?: number) {
    return this.service.execute(actividadId, limit ?? 10);
  }
}


