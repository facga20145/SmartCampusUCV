import { Injectable } from '@nestjs/common';
import { InscripcionFindAllService } from '../../../domain/services/queries/inscripcion-find-all.service';
import { InscripcionEntity } from '../../../domain/entities/inscripcion.entity';
  
@Injectable()
export class InscripcionFindAllUseCase {
  constructor(private readonly service: InscripcionFindAllService) {}

  async execute(actividadId: number): Promise<InscripcionEntity[]> {
    return this.service.execute(actividadId);
  }
}