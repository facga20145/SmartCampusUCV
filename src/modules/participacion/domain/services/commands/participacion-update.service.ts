import { Injectable, Inject } from '@nestjs/common';
import { ParticipacionRepositoryPort } from '../../../infrastructure/adapters/ports/participacion-repository.port';
import { IParticipacionUpdate } from '../../interfaces/participacion-update.interface';
import { ParticipacionEntity } from '../../entities/participacion.entity';
  
@Injectable()
export class ParticipacionUpdateService {
  constructor(
    @Inject(ParticipacionRepositoryPort)
    private readonly repo: ParticipacionRepositoryPort,
  ) {}

  async execute(data: IParticipacionUpdate): Promise<ParticipacionEntity> {
    return this.repo.update(data);
  }
}