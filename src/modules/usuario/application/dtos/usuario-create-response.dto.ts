import { ApiProperty } from '@nestjs/swagger';
import { UsuarioEntity } from '../../domain/entities/usuario.entity';

export class UsuarioCreateResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  nombre: string;

  @ApiProperty()
  apellido: string;

  @ApiProperty()
  correoInstitucional: string;

  @ApiProperty()
  rol: string;

  @ApiProperty({ required: false })
  intereses?: string;

  @ApiProperty({ required: false })
  hobbies?: string;

  @ApiProperty({ required: false })
  foto?: string;

  static fromEntity(entity: UsuarioEntity): UsuarioCreateResponseDto {
    const dto = new UsuarioCreateResponseDto();
    dto.id = entity.id;
    dto.nombre = entity.nombre;
    dto.apellido = entity.apellido;
    dto.correoInstitucional = entity.correoInstitucional;
    dto.rol = entity.rol;
    dto.intereses = entity.intereses;
    dto.hobbies = entity.hobbies;
    dto.foto = entity.foto;
    return dto;
  }
}