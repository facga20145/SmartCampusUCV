import { Injectable } from '@nestjs/common';
import { ActividadUpdateService } from '../../../domain/services/commands/actividad-update.service';
import { ActividadUpdateRequestDto } from '../../dtos/actividad-update-request.dto';
import { ActividadUpdateResponseDto } from '../../dtos/actividad-update-response.dto';
  
@Injectable()
export class ActividadUpdateUseCase {
  constructor(private readonly actividadUpdateService: ActividadUpdateService) {}

  async execute(dto: ActividadUpdateRequestDto): Promise<ActividadUpdateResponseDto> {
    const entity = await this.actividadUpdateService.execute({
      id: dto.id,
      titulo: dto.titulo,
      descripcion: dto.descripcion,
      categoria: dto.categoria,
      fecha: dto.fecha ? new Date(dto.fecha) : undefined,
      hora: dto.hora ? new Date(dto.hora) : undefined,
      lugar: dto.lugar,
      maxParticipantes: dto.maxParticipantes,
      nivelSostenibilidad: dto.nivelSostenibilidad,
    });
    return ActividadUpdateResponseDto.fromEntity(entity);
  }
}