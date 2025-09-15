import { Injectable } from '@nestjs/common';
import { ActividadCreateRequestDto } from '../../dtos/actividad-create-request.dto';
import { ActividadCreateResponseDto } from '../../dtos/actividad-create-response.dto';
import { ActividadCreateService } from '../../../domain/services/commands/actividad-create.service';
  
@Injectable()
export class ActividadCreateUseCase {
  constructor(private readonly actividadCreateService: ActividadCreateService) {}

  async execute(dto: ActividadCreateRequestDto): Promise<ActividadCreateResponseDto> {
    const entity = await this.actividadCreateService.execute({
      titulo: dto.titulo,
      descripcion: dto.descripcion ?? null,
      categoria: dto.categoria,
      fecha: new Date(dto.fecha),
      hora: new Date(dto.hora),
      lugar: dto.lugar,
      maxParticipantes: dto.maxParticipantes ?? null,
      nivelSostenibilidad: dto.nivelSostenibilidad ?? null,
      organizadorId: dto.organizadorId,
    });
    return ActividadCreateResponseDto.fromEntity(entity);
  }
}