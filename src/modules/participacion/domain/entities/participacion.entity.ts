export class ParticipacionEntity {
  constructor(
    public readonly id: number,
    public usuarioId: number,
    public actividadId: number,
    public asistencia: boolean,
    public feedback: string | null,
    public puntos: number,
  ) {}
}