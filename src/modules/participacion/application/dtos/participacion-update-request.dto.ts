import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';

export class ParticipacionUpdateRequestDto {
  @ApiProperty()
  @IsInt()
  id: number;

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