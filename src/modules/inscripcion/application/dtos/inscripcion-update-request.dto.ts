import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt } from 'class-validator';
import { EstadoInscripcion } from '@prisma/client';

export class InscripcionUpdateRequestDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ enum: EstadoInscripcion })
  @IsEnum(EstadoInscripcion)
  estado: EstadoInscripcion;
}