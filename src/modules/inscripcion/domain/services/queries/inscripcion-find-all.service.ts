import { Injectable, Inject } from '@nestjs/common';
import { InscripcionRepositoryPort } from '../../../infrastructure/adapters/ports/inscripcion-repository.port';
import { InscripcionEntity } from '../../entities/inscripcion.entity';
  
@Injectable()
export class InscripcionFindAllService {
  constructor(
    @Inject(InscripcionRepositoryPort)
    private readonly repo: InscripcionRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<InscripcionEntity[]> {
    return this.repo.findByActividad(actividadId);
  }
}