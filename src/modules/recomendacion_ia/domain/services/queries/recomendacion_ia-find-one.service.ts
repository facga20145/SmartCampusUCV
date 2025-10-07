import { Injectable } from '@nestjs/common';
import { RecomendacionIaRepositoryPort } from '../../../infrastructure/adapters/ports/recomendacion_ia-repository.port';
import { Recomendacion_iaEntity } from '../../entities/recomendacion_ia.entity';

@Injectable()
export class Recomendacion_iaFindOneService {
  constructor(private readonly recomendacionIaRepository: RecomendacionIaRepositoryPort) {}

  async execute(id: number): Promise<Recomendacion_iaEntity | null> {
    return this.recomendacionIaRepository.findById(id);
  }
}