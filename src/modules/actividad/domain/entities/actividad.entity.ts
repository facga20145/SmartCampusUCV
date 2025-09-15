import { CategoriaActividad } from '@prisma/client';

export class ActividadEntity {
  constructor(
    public readonly id: number,
    public titulo: string,
    public descripcion: string | null,
    public categoria: CategoriaActividad,
    public fecha: Date,
    public hora: Date,
    public lugar: string,
    public maxParticipantes: number | null,
    public nivelSostenibilidad: number | null,
    public organizadorId: number,
  ) {}
}