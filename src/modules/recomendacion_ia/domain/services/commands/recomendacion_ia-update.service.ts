import { Injectable } from '@nestjs/common';
import { RecomendacionIaRepositoryPort } from '../../../infrastructure/adapters/ports/recomendacion_ia-repository.port';
import { Recomendacion_iaEntity } from '../../entities/recomendacion_ia.entity';
import { IRecomendacion_iaUpdate } from '../../interfaces/recomendacion_ia-update.interface';

@Injectable()
export class Recomendacion_iaUpdateService {
  constructor(private readonly recomendacionIaRepository: RecomendacionIaRepositoryPort) {}

  async execute(data: IRecomendacion_iaUpdate): Promise<Recomendacion_iaEntity> {
    return this.recomendacionIaRepository.update(data);
  }
}