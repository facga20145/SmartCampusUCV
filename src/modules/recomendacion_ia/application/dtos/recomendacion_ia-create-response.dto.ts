import { ApiProperty } from '@nestjs/swagger';
import { Recomendacion_iaEntity } from '../../domain/entities/recomendacion_ia.entity';

export class RecomendacionIaCreateResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  usuarioId: number;

  @ApiProperty({ required: false })
  actividadId?: number;

  @ApiProperty()
  fecha: Date;

  @ApiProperty({ required: false })
  tipo?: string;

  @ApiProperty()
  aceptada: boolean;

  static fromEntity(entity: Recomendacion_iaEntity): RecomendacionIaCreateResponseDto {
    const dto = new RecomendacionIaCreateResponseDto();
    dto.id = entity.id;
    dto.usuarioId = entity.usuarioId;
    dto.actividadId = entity.actividadId;
    dto.fecha = entity.fecha ?? new Date();
    dto.tipo = entity.tipo;
    dto.aceptada = entity.aceptada ?? false;
    return dto;
  }
}