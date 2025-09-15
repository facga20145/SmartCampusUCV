export interface IUsuarioCreate {
  nombre: string;
  apellido: string;
  correoInstitucional: string;
  contrasena: string;
  rol: 'administrador' | 'organizador' | 'estudiante';
  intereses?: string;
  hobbies?: string;
  foto?: string;
}