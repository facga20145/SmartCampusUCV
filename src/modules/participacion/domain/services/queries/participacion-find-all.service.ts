import { Injectable, Inject } from '@nestjs/common';
import { ParticipacionRepositoryPort } from '../../../infrastructure/adapters/ports/participacion-repository.port';
import { ParticipacionEntity } from '../../entities/participacion.entity';
  
@Injectable()
export class ParticipacionFindAllService {
  constructor(
    @Inject(ParticipacionRepositoryPort)
    private readonly repo: ParticipacionRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<ParticipacionEntity[]> {
    return this.repo.findByActividad(actividadId);
  }
}