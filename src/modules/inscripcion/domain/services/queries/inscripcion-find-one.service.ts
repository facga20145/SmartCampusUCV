import { Injectable, Inject } from '@nestjs/common';
import { InscripcionRepositoryPort } from '../../../infrastructure/adapters/ports/inscripcion-repository.port';
import { InscripcionEntity } from '../../entities/inscripcion.entity';
  
@Injectable()
export class InscripcionFindOneService {
  constructor(
    @Inject(InscripcionRepositoryPort)
    private readonly repo: InscripcionRepositoryPort,
  ) {}

  async execute(id: number): Promise<InscripcionEntity | null> {
    return this.repo.findById(id);
  }
}