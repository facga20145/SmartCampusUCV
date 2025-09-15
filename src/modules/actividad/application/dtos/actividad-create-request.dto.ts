import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { CategoriaActividad } from '@prisma/client';

export class ActividadCreateRequestDto {
  @ApiProperty({ example: 'Feria de voluntariado' })
  @IsString()
  titulo: string;

  @ApiProperty({ example: 'Actividades para apoyar a la comunidad', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string | null;

  @ApiProperty({ enum: CategoriaActividad })
  @IsEnum(CategoriaActividad)
  categoria: CategoriaActividad;

  @ApiProperty({ example: '2025-10-01' })
  @IsDateString()
  fecha: string;

  @ApiProperty({ example: '2025-10-01T14:00:00.000Z', description: 'Usar ISO time' })
  @IsDateString()
  hora: string;

  @ApiProperty({ example: 'Auditorio principal' })
  @IsString()
  lugar: string;

  @ApiProperty({ example: 200, required: false, minimum: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  maxParticipantes?: number | null;

  @ApiProperty({ example: 3, required: false, description: 'Nivel 1-5' })
  @IsOptional()
  @IsInt()
  @Min(0)
  nivelSostenibilidad?: number | null;

  @ApiProperty({ example: 1 })
  @IsInt()
  organizadorId: number;
}