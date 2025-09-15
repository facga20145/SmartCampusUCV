import { EstadoInscripcion } from '@prisma/client';

export interface IInscripcionUpdate {
  id: number;
  estado: EstadoInscripcion;
}