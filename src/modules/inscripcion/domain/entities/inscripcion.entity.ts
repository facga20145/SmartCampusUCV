import { EstadoInscripcion } from '@prisma/client';

export class InscripcionEntity {
  constructor(
    public readonly id: number,
    public usuarioId: number,
    public actividadId: number,
    public fechaInscripcion: Date,
    public estado: EstadoInscripcion,
  ) {}
}