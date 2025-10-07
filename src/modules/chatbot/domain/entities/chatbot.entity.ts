export class InteraccionChatbotEntity {
  constructor(
    public readonly id: number,
    public usuarioId: number,
    public mensajeUsuario: string,
    public respuestaBot?: string,
    public fecha?: Date,
  ) {}
}