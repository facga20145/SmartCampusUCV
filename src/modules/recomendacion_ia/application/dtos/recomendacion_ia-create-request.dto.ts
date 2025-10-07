import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, IsBoolean } from 'class-validator';

export class RecomendacionIaCreateRequestDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  usuarioId: number;

  @ApiProperty({ example: 2, required: false })
  @IsOptional()
  @IsInt()
  actividadId?: number;

  @ApiProperty({ example: 'personalizada', required: false })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  aceptada?: boolean;
}