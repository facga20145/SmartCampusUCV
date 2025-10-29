import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class ParticipacionCreateRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  usuarioId?: number;

  @ApiProperty()
  @IsInt()
  actividadId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  asistencia?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  feedback?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  puntos?: number;
}