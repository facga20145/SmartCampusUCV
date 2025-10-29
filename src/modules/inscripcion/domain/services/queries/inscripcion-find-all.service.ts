import { Injectable, Inject } from '@nestjs/common';
import { InscripcionRepositoryPort } from '../../../infrastructure/adapters/ports/inscripcion-repository.port';
  
@Injectable()
export class InscripcionFindAllService {
  constructor(
    @Inject(InscripcionRepositoryPort)
    private readonly repo: InscripcionRepositoryPort,
  ) {}

  async execute(actividadId: number): Promise<any[]> {
    return this.repo.findByActividad(actividadId);
  }
}