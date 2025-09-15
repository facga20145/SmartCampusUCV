import { ApiProperty } from '@nestjs/swagger';
import { ReconocimientoEntity } from '../../domain/entities/reconocimiento.entity';

export class ReconocimientoCreateResponseDto {
  @ApiProperty()
  id: number;
  @ApiProperty()
  usuarioId: number;
  @ApiProperty({ required: false })
  tipo?: string | null;
  @ApiProperty({ required: false })
  descripcion?: string | null;
  @ApiProperty()
  fecha: string;

  static fromEntity(e: ReconocimientoEntity): ReconocimientoCreateResponseDto {
    const dto = new ReconocimientoCreateResponseDto();
    dto.id = e.id;
    dto.usuarioId = e.usuarioId;
    dto.tipo = e.tipo ?? null;
    dto.descripcion = e.descripcion ?? null;
    dto.fecha = e.fecha.toISOString();
    return dto;
  }
}