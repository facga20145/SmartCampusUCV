import { Injectable } from '@nestjs/common';
import { ActividadFindOneService } from '../../../domain/services/queries/actividad-find-one.service';
import { ActividadEntity } from '../../../domain/entities/actividad.entity';
  
@Injectable()
export class ActividadFindOneUseCase {
  constructor(private readonly findOneService: ActividadFindOneService) {}

  async execute(id: number): Promise<ActividadEntity | null> {
    return this.findOneService.execute(id);
  }
}