import { Injectable } from '@nestjs/common';
import { ActividadDeleteService } from '../../../domain/services/commands/actividad-delete.service';
  
@Injectable()
export class ActividadDeleteUseCase {
  constructor(private readonly deleteService: ActividadDeleteService) {}

  async execute(id: number): Promise<void> {
    await this.deleteService.execute(id);
  }
}