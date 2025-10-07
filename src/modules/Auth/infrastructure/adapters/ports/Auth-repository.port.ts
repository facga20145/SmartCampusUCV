export abstract class AuthRepositoryPort {
  abstract findUsuarioByEmail(email: string): Promise<{
    id: number;
    nombre: string;
    apellido: string;
    correoInstitucional: string;
    contrasena: string;
    rol: string;
    intereses?: string | null;
    hobbies?: string | null;
    foto?: string | null;
  } | null>;
}