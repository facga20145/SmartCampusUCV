import { Injectable, Inject } from '@nestjs/common';
import { ActividadRepositoryPort } from '../../../infrastructure/adapters/ports/actividad-repository.port';
import { IActividadCreate } from '../../interfaces/actividad-create.interface';
import { ActividadEntity } from '../../entities/actividad.entity';
  
@Injectable()
export class ActividadCreateService {
  constructor(
    @Inject(ActividadRepositoryPort)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(data: IActividadCreate): Promise<ActividadEntity> {
    return this.actividadRepository.create(data);
  }
}