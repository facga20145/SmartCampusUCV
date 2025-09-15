import { CategoriaActividad } from '@prisma/client';

export interface IActividadFilters {
  categoria?: CategoriaActividad;
  fechaDesde?: Date;
  fechaHasta?: Date;
  lugar?: string;
  nivelSostenibilidadMin?: number;
}


