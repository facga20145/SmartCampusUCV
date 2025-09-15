import { ApiProperty } from '@nestjs/swagger';
import { EstadoInscripcion } from '@prisma/client';
import { InscripcionEntity } from '../../domain/entities/inscripcion.entity';

export class InscripcionUpdateResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  usuarioId: number;
  @ApiProperty()
  actividadId: number;
  @ApiProperty()
  fechaInscripcion: string;
  @ApiProperty({ enum: EstadoInscripcion })
  estado: EstadoInscripcion;

  static fromEntity(e: InscripcionEntity): InscripcionUpdateResponseDto {
    const dto = new InscripcionUpdateResponseDto();
    dto.id = e.id;
    dto.usuarioId = e.usuarioId;
    dto.actividadId = e.actividadId;
    dto.fechaInscripcion = e.fechaInscripcion.toISOString();
    dto.estado = e.estado;
    return dto;
  }
}