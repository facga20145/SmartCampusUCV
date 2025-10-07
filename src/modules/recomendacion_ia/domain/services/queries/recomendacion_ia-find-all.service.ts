import { Injectable } from '@nestjs/common';
import { RecomendacionIaRepositoryPort } from '../../../infrastructure/adapters/ports/recomendacion_ia-repository.port';
import { Recomendacion_iaEntity } from '../../entities/recomendacion_ia.entity';

@Injectable()
export class Recomendacion_iaFindAllService {
  constructor(private readonly recomendacionIaRepository: RecomendacionIaRepositoryPort) {}

  async execute(): Promise<Recomendacion_iaEntity[]> {
    return this.recomendacionIaRepository.findAll();
  }
}