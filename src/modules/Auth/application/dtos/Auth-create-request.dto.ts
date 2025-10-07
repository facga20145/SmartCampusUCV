import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'juan@ucv.edu.ve' })
  @IsEmail()
  correoInstitucional: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  contrasena: string;
}