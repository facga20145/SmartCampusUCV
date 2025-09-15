import { Injectable } from '@nestjs/common';
import { ParticipacionFindAllService } from '../../../domain/services/queries/participacion-find-all.service';
import { ParticipacionEntity } from '../../../domain/entities/participacion.entity';
  
@Injectable()
export class ParticipacionFindAllUseCase {
  constructor(private readonly service: ParticipacionFindAllService) {}

  async execute(actividadId: number): Promise<ParticipacionEntity[]> {
    return this.service.execute(actividadId);
  }
}