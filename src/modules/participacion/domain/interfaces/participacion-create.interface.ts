export interface IParticipacionCreate {
  usuarioId: number;
  actividadId: number;
  asistencia?: boolean;
  feedback?: string | null;
  puntos?: number; // puntos iniciales
}