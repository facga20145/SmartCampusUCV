import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class ReconocimientoCreateRequestDto {
  @ApiProperty()
  @IsInt()
  usuarioId: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  tipo?: string | null;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  descripcion?: string | null;
}