import { UsuarioEntity } from '../entities/usuario.entity';
import { IUsuarioCreate } from '../interfaces/usuario-create.interface';

export class UsuarioFactory {
  static create(data: IUsuarioCreate): UsuarioEntity {
    return new UsuarioEntity(
      0, // El id se asigna al guardar en la base de datos
      data.nombre,
      data.apellido,
      data.correoInstitucional,
      data.contrasena,
      data.rol,
      data.intereses,
      data.hobbies,
      data.foto,
    );
  }
}