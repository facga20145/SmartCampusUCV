import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsOptional } from 'class-validator';
import { EstadoInscripcion } from '@prisma/client';

export class InscripcionUpdateRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  id?: number;

  @ApiProperty({ enum: EstadoInscripcion })
  @IsEnum(EstadoInscripcion)
  estado: EstadoInscripcion;
}