import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CategoriaActividad } from '@prisma/client';

export class ActividadUpdateRequestDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string | null;

  @ApiProperty({ enum: CategoriaActividad, required: false })
  @IsOptional()
  @IsEnum(CategoriaActividad)
  categoria?: CategoriaActividad;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  fecha?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  hora?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  lugar?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxParticipantes?: number | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  @Min(0)
  nivelSostenibilidad?: number | null;
}