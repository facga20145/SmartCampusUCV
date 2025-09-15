import { Injectable, Inject } from '@nestjs/common';
import { ActividadRepositoryPort } from '../../../infrastructure/adapters/ports/actividad-repository.port';
import { ActividadEntity } from '../../entities/actividad.entity';
  
@Injectable()
export class ActividadFindOneService {
  constructor(
    @Inject(ActividadRepositoryPort)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(id: number): Promise<ActividadEntity | null> {
    return this.actividadRepository.findById(id);
  }
}