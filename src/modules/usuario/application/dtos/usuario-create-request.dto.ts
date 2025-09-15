import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsOptional, IsEnum } from 'class-validator';

export class UsuarioCreateRequestDto {
  @ApiProperty({ example: 'Juan' })
  @IsString()
  nombre: string;

  @ApiProperty({ example: 'Pérez' })
  @IsString()
  apellido: string;

  @ApiProperty({ example: 'juan@ucv.edu.ve' })
  @IsEmail()
  correoInstitucional: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  contrasena: string;

  @ApiProperty({ example: 'estudiante', enum: ['administrador', 'organizador', 'estudiante'] })
  @IsEnum(['administrador', 'organizador', 'estudiante'])
  rol: 'administrador' | 'organizador' | 'estudiante';

  @ApiProperty({ example: 'Deportes, Música', required: false })
  @IsOptional()
  @IsString()
  intereses?: string;

  @ApiProperty({ example: 'Fútbol, Guitarra', required: false })
  @IsOptional()
  @IsString()
  hobbies?: string;

  @ApiProperty({ example: 'https://foto.com/imagen.jpg', required: false })
  @IsOptional()
  @IsString()
  foto?: string;
}