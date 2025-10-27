export interface IUsuarioUpdate {
  id: number;
  nombre?: string;
  apellido?: string;
  rol?: 'administrador' | 'organizador' | 'estudiante';
  intereses?: string;
  hobbies?: string;
  foto?: string;
  contrasena?: string;
}