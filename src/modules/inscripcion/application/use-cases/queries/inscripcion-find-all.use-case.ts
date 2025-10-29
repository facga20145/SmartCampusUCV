import { Injectable } from '@nestjs/common';
import { InscripcionFindAllService } from '../../../domain/services/queries/inscripcion-find-all.service';
  
@Injectable()
export class InscripcionFindAllUseCase {
  constructor(private readonly service: InscripcionFindAllService) {}

  async execute(actividadId: number): Promise<any[]> {
    return this.service.execute(actividadId);
  }
}