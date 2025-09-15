import { Injectable, Inject } from '@nestjs/common';
import { InscripcionRepositoryPort } from '../../../infrastructure/adapters/ports/inscripcion-repository.port';
  
@Injectable()
export class InscripcionDeleteService {
  constructor(
    @Inject(InscripcionRepositoryPort)
    private readonly repo: InscripcionRepositoryPort,
  ) {}

  async execute(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}