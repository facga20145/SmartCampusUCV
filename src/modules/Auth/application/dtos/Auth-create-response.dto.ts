export class AuthLoginResponseDto {
  accessToken: string;
  user: {
    id: number;
    nombre: string;
    apellido: string;
    correoInstitucional: string;
    rol: string;
    intereses?: string;
    hobbies?: string;
    foto?: string;
  };
}