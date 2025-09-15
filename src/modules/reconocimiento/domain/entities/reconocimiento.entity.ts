export class ReconocimientoEntity {
  constructor(
    public readonly id: number,
    public usuarioId: number,
    public tipo: string | null,
    public descripcion: string | null,
    public fecha: Date,
  ) {}
}