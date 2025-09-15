import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class InscripcionCreateRequestDto {
  @ApiProperty()
  @IsInt()
  usuarioId: number;

  @ApiProperty()
  @IsInt()
  actividadId: number;
}