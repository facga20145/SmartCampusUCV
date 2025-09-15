import { CategoriaActividad } from '@prisma/client';

export interface IActividadCreate {
  titulo: string;
  descripcion?: string | null;
  categoria: CategoriaActividad;
  fecha: Date;
  hora: Date;
  lugar: string;
  maxParticipantes?: number | null;
  nivelSostenibilidad?: number | null;
  organizadorId: number;
}