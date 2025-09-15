import { Injectable, Inject } from '@nestjs/common';
import { ActividadRepositoryPort } from '../../../infrastructure/adapters/ports/actividad-repository.port';
import { ActividadEntity } from '../../entities/actividad.entity';
import { IActividadFilters } from '../../interfaces/actividad-filters.interface';
  
@Injectable()
export class ActividadFindAllService {
  constructor(
    @Inject(ActividadRepositoryPort)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(filters?: IActividadFilters): Promise<ActividadEntity[]> {
    return this.actividadRepository.findAll(filters);
  }
}