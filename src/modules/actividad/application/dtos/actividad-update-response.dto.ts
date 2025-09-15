import { ApiProperty } from '@nestjs/swagger';
import { ActividadEntity } from '../../domain/entities/actividad.entity';
import { CategoriaActividad } from '@prisma/client';

export class ActividadUpdateResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  titulo: string;
  @ApiProperty({ required: false })
  descripcion?: string | null;
  @ApiProperty({ enum: CategoriaActividad })
  categoria: CategoriaActividad;
  @ApiProperty()
  fecha: string;
  @ApiProperty()
  hora: string;
  @ApiProperty()
  lugar: string;
  @ApiProperty({ required: false })
  maxParticipantes?: number | null;
  @ApiProperty({ required: false })
  nivelSostenibilidad?: number | null;
  @ApiProperty()
  organizadorId: number;

  static fromEntity(entity: ActividadEntity): ActividadUpdateResponseDto {
    const dto = new ActividadUpdateResponseDto();
    dto.id = entity.id;
    dto.titulo = entity.titulo;
    dto.descripcion = entity.descripcion ?? null;
    dto.categoria = entity.categoria;
    dto.fecha = entity.fecha.toISOString();
    dto.hora = entity.hora.toISOString();
    dto.lugar = entity.lugar;
    dto.maxParticipantes = entity.maxParticipantes ?? null;
    dto.nivelSostenibilidad = entity.nivelSostenibilidad ?? null;
    dto.organizadorId = entity.organizadorId;
    return dto;
  }
}