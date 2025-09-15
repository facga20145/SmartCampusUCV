import { Injectable, Inject } from '@nestjs/common';
import { InscripcionRepositoryPort } from '../../../infrastructure/adapters/ports/inscripcion-repository.port';
import { IInscripcionUpdate } from '../../interfaces/inscripcion-update.interface';
import { InscripcionEntity } from '../../entities/inscripcion.entity';
  
@Injectable()
export class InscripcionUpdateService {
  constructor(
    @Inject(InscripcionRepositoryPort)
    private readonly repo: InscripcionRepositoryPort,
  ) {}

  async execute(data: IInscripcionUpdate): Promise<InscripcionEntity> {
    return this.repo.update(data);
  }
}