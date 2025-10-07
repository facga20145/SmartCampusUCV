import { Injectable } from '@nestjs/common';
import { RecomendacionIaRepositoryPort } from '../../../infrastructure/adapters/ports/recomendacion_ia-repository.port';
import { Recomendacion_iaEntity } from '../../entities/recomendacion_ia.entity';
import { IRecomendacion_iaCreate } from '../../interfaces/recomendacion_ia-create.interface';

@Injectable()
export class Recomendacion_iaCreateService {
  constructor(private readonly recomendacionIaRepository: RecomendacionIaRepositoryPort) {}

  async execute(data: IRecomendacion_iaCreate): Promise<Recomendacion_iaEntity> {
    return this.recomendacionIaRepository.create(data);
  }
}