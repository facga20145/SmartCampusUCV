import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsInt, IsString, IsBoolean } from 'class-validator';

export class RecomendacionIaUpdateRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  actividadId?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tipo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  aceptada?: boolean;
}