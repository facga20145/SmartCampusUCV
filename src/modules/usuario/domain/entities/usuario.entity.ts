export class UsuarioEntity {
  constructor(
    public readonly id: number,
    public nombre: string,
    public apellido: string,
    public correoInstitucional: string,
    public contrasena: string,
    public rol: 'administrador' | 'organizador' | 'estudiante',
    public intereses?: string,
    public hobbies?: string,
    public foto?: string,
  ) {}
}