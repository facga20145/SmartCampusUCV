export class Recomendacion_iaEntity {
  constructor(
    public readonly id: number,
    public usuarioId: number,
    public actividadId?: number,
    public fecha?: Date,
    public tipo?: string,
    public aceptada?: boolean,
  ) {}
}