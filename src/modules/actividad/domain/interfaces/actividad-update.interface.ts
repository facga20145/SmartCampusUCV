export interface IActividadUpdate {
  id: number;
  titulo?: string;
  descripcion?: string | null;
  categoria?: string; // Permitir cualquier categoría
  fecha?: Date;
  hora?: Date;
  lugar?: string;
  maxParticipantes?: number | null;
  nivelSostenibilidad?: number | null;
}