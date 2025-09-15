import { ApiProperty } from '@nestjs/swagger';
import { ParticipacionEntity } from '../../domain/entities/participacion.entity';

export class ParticipacionUpdateResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  usuarioId: number;
  @ApiProperty()
  actividadId: number;
  @ApiProperty()
  asistencia: boolean;
  @ApiProperty({ required: false })
  feedback?: string | null;
  @ApiProperty()
  puntos: number;

  static fromEntity(e: ParticipacionEntity): ParticipacionUpdateResponseDto {
    const dto = new ParticipacionUpdateResponseDto();
    dto.id = e.id;
    dto.usuarioId = e.usuarioId;
    dto.actividadId = e.actividadId;
    dto.asistencia = e.asistencia;
    dto.feedback = e.feedback ?? null;
    dto.puntos = e.puntos;
    return dto;
  }
}