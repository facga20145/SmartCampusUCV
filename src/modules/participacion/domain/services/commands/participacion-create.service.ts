import { Injectable, Inject } from '@nestjs/common';
import { ParticipacionRepositoryPort } from '../../../infrastructure/adapters/ports/participacion-repository.port';
import { IParticipacionCreate } from '../../interfaces/participacion-create.interface';
import { ParticipacionEntity } from '../../entities/participacion.entity';
  
@Injectable()
export class ParticipacionCreateService {
  constructor(
    @Inject(ParticipacionRepositoryPort)
    private readonly repo: ParticipacionRepositoryPort,
  ) {}

  async execute(data: IParticipacionCreate): Promise<ParticipacionEntity> {
    return this.repo.create(data);
  }
}