import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsInt, IsEnum } from 'class-validator';
import { RolUsuario } from '@prisma/client';

export class UsuarioUpdateRequestDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apellido?: string;

  @ApiProperty({ required: false, enum: ['administrador', 'organizador', 'estudiante'] })
  @IsOptional()
  @IsEnum(RolUsuario)
  rol?: RolUsuario;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  intereses?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  hobbies?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  foto?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  contrasena?: string;
}