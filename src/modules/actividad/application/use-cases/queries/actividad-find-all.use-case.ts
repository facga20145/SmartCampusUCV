import { Injectable } from '@nestjs/common';
import { ActividadFindAllService } from '../../../domain/services/queries/actividad-find-all.service';
import { ActividadEntity } from '../../../domain/entities/actividad.entity';
import { IActividadFilters } from '../../../domain/interfaces/actividad-filters.interface';
  
@Injectable()
export class ActividadFindAllUseCase {
  constructor(private readonly findAllService: ActividadFindAllService) {}

  async execute(filters?: IActividadFilters): Promise<ActividadEntity[]> {
    return this.findAllService.execute(filters);
  }
}