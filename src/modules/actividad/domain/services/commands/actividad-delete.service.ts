import { Injectable, Inject } from '@nestjs/common';
import { ActividadRepositoryPort } from '../../../infrastructure/adapters/ports/actividad-repository.port';
  
@Injectable()
export class ActividadDeleteService {
  constructor(
    @Inject(ActividadRepositoryPort)
    private readonly actividadRepository: ActividadRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    await this.actividadRepository.delete(id);
  }
}