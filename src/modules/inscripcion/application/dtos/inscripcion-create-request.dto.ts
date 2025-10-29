import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class InscripcionCreateRequestDto {
  @ApiProperty()
  @IsInt()
  actividadId: number;
}