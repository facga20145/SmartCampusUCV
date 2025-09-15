import { Injectable, Inject } from '@nestjs/common';
import { ActividadRepositoryPort } from '../../../infrastructure/adapters/ports/actividad-repository.port';
import { IActividadUpdate } from '../../interfaces/actividad-update.interface';
import { ActividadEntity } from '../../entities/actividad.entity';

@Injectable()
export class ActividadUpdateService {
  constructor(
    @Inject(ActividadRepositoryPort)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(data: IActividadUpdate): Promise<ActividadEntity> {
    return this.actividadRepository.update(data);
  }
}