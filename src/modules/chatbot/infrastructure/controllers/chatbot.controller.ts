import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ApiTags } from '@nestjs/swagger';
import { ApiDoc } from '../../../../common/decorators/api-doc.decorator';
import { AI_CONFIG } from '../../../../config/ai.config';

@ApiTags('Chatbot')
@Controller('chatbot')
export class ChatbotController {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly httpService: HttpService,
  ) { }

  @Post('mensaje')
  @ApiDoc({
    summary: 'Procesar mensaje del chatbot',
    ok: { status: 201, description: 'Mensaje procesado exitosamente' },
  })
  async procesarMensaje(@Body() body: { usuarioId: number; mensaje: string }) {
    const { usuarioId, mensaje } = body;

    // Guardar mensaje del usuario
    const interaccion = await this.prisma.interaccionChatbot.create({
      data: {
        usuarioId,
        mensajeUsuario: mensaje,
        respuestaBot: null, // Se llenará después
      }
    });

    let respuestaBot = '';
    let recomendaciones: any[] = [];

    // Procesar el mensaje con detección mejorada
    const mensajeLower = mensaje.toLowerCase();

    // Comando explícito de inscripción (oculto al usuario normal, enviado por botón)
    if (mensaje.startsWith('CMD_INSCRIBIR_ID:')) {
      const idStr = mensaje.split(':')[1].trim();
      respuestaBot = await this.procesarInscripcionPorId(usuarioId, parseInt(idStr));
    }
    else if (mensajeLower.includes('recomend') || mensajeLower.includes('actividad') || mensajeLower.includes('suger')) {
      // El usuario está pidiendo recomendaciones
      const resultado = await this.procesarRecomendacion(usuarioId, mensaje);
      respuestaBot = resultado.texto;
      recomendaciones = resultado.recomendaciones;
    } else if (
      mensajeLower.includes('inscrib') ||
      mensajeLower.includes('quiero ir') ||
      mensajeLower.includes('me anoto') ||
      mensajeLower.includes('apuntar')
    ) {
      // El usuario quiere inscribirse por texto (método antiguo/natural)
      respuestaBot = await this.procesarInscripcionTexto(usuarioId, mensaje);
    } else if (mensajeLower.includes('hola') || mensajeLower.includes('salud') || mensajeLower.includes('buenos') || mensajeLower.includes('buenas')) {
      respuestaBot = '¡Hola! Soy el asistente de SmartCampus. Puedo ayudarte a:\n- Obtener recomendaciones personalizadas de actividades\n- Inscribirte en actividades\n\n¿Qué te gustaría hacer?';
    } else {
      respuestaBot = 'No entiendo tu mensaje. Puedes:\n- Pedirme recomendaciones de actividades\n- Inscribirte en una actividad\n- O simplemente saludarme\n\n¿En qué puedo ayudarte?';
    }

    // Actualizar la respuesta del bot
    await this.prisma.interaccionChatbot.update({
      where: { id: interaccion.id },
      data: { respuestaBot }
    });

    return {
      id: interaccion.id,
      mensajeUsuario: mensaje,
      respuestaBot,
      recomendaciones, // Devolver recomendaciones estructuradas
      fecha: interaccion.fecha
    };
  }

  private async procesarRecomendacion(usuarioId: number, userQuery?: string): Promise<{ texto: string, recomendaciones: any[] }> {
    try {
      // Verificar si el usuario tiene preferencias
      const preferencias = await this.prisma.preferenciaUsuario.findMany({
        where: { usuarioId }
      });

      // Obtener actividades disponibles (solo futuras)
      const actividades = await this.prisma.actividad.findMany({
        where: {
          fecha: {
            gte: new Date()
          }
        }
      });

      // Obtener historial de participación
      const participaciones = await this.prisma.participacion.findMany({
        where: { usuarioId },
        include: {
          actividad: {
            select: {
              id: true,
              categoria: true,
              titulo: true
            }
          }
        }
      });

      const historialParticipacion = participaciones.map(p => ({
        actividad_id: p.actividadId,
        categoria: p.actividad.categoria,
        titulo: p.actividad.titulo,
        asistencia: p.asistencia,
        puntos: p.puntos
      }));

      // Preparar datos para la IA
      const actividadesParaIA = actividades.map(act => ({
        id: act.id,
        categoria: act.categoria,
        titulo: act.titulo || '',
        descripcion: act.descripcion || '',
        fecha: act.fecha ? act.fecha.toISOString().split('T')[0] : '',
        lugar: act.lugar || '',
        nivel_sostenibilidad: act.nivelSostenibilidad || 0
      }));

      const preferenciasParaIA = preferencias.map(pref => ({
        categoria: pref.categoria,
        nivel_interes: 1
      }));

      // Llamar al microservicio de IA
      const response = await firstValueFrom(
        this.httpService.post(`${AI_CONFIG.SERVICE_URL}/recomendar`, {
          usuario_id: usuarioId,
          actividades: actividadesParaIA,
          preferencias: preferenciasParaIA,
          historial_participacion: historialParticipacion,
          user_query: userQuery || null
        })
      );

      const recomendaciones = response.data.recomendaciones || [];

      if (recomendaciones.length === 0) {
        return {
          texto: 'No encontré actividades que coincidan con tus preferencias. ¿Te gustaría explorar otros tipos de actividades?',
          recomendaciones: []
        };
      }

      // Enriquecer recomendaciones con datos reales de la BD para asegurar consistencia
      const recomendacionesEnriquecidas = recomendaciones.map((rec: any) => {
        const actividadReal = actividades.find(a => a.id === rec.actividad_id);
        return {
          ...rec,
          ...actividadReal // Sobrescribir con datos frescos de la BD
        };
      });

      let respuesta = '🎯 Basándome en tus preferencias, te recomiendo estas actividades:';

      return {
        texto: respuesta,
        recomendaciones: recomendacionesEnriquecidas
      };

    } catch (error: any) {
      console.error('Error procesando recomendación:', error);
      return {
        texto: 'Lo siento, hubo un problema al generar las recomendaciones. Por favor, inténtalo de nuevo.',
        recomendaciones: []
      };
    }
  }

  private async procesarInscripcionPorId(usuarioId: number, actividadId: number): Promise<string> {
    try {
      const actividad = await this.prisma.actividad.findUnique({
        where: { id: actividadId }
      });

      if (!actividad) {
        return 'Lo siento, no pude encontrar esa actividad. Puede que haya sido cancelada.';
      }

      // Verificar si ya está inscrito
      const inscripcionExistente = await this.prisma.inscripcion.findFirst({
        where: {
          usuarioId,
          actividadId: actividadId,
          estado: {
            in: ['pendiente', 'confirmada']
          }
        }
      });

      if (inscripcionExistente) {
        return `✅ Ya estás inscrito en la actividad "${actividad.titulo}". Tu estado es: ${inscripcionExistente.estado}.`;
      }

      // Realizar la inscripción
      await this.prisma.inscripcion.create({
        data: {
          usuarioId,
          actividadId: actividad.id,
          estado: 'pendiente'
        }
      });

      return `✅ ¡Inscripción exitosa! Te has anotado en "${actividad.titulo}".\n\n📅 Fecha: ${actividad.fecha?.toLocaleDateString('es-ES')}\n📍 Lugar: ${actividad.lugar || 'Por confirmar'}`;

    } catch (error) {
      console.error('Error inscripción por ID:', error);
      return 'Hubo un error al procesar tu inscripción. Inténtalo de nuevo.';
    }
  }

  private async procesarInscripcionTexto(usuarioId: number, mensaje: string): Promise<string> {
    try {
      // Intentar extraer el ID de actividad o nombre de la actividad del mensaje
      const actividadesRecientes = await this.prisma.actividad.findMany({
        where: {
          fecha: {
            gte: new Date()
          }
        },
        orderBy: {
          fecha: 'asc'
        },
        take: 10
      });

      // Buscar coincidencias en el mensaje
      let actividadSeleccionada: any = null;

      // Intentar encontrar por número (ej: "actividad 1", "primera actividad")
      // NOTA: Esto sigue siendo riesgoso si el usuario ve una lista diferente, 
      // pero se mantiene como fallback para chat de texto libre.
      const numeroMatch = mensaje.match(/(?:actividad\s*)?(\d+)/);
      if (numeroMatch) {
        const num = parseInt(numeroMatch[1]) - 1;
        if (num >= 0 && num < actividadesRecientes.length) {
          actividadSeleccionada = actividadesRecientes[num];
        }
      }

      // Si no hay número, buscar por nombre
      if (!actividadSeleccionada) {
        for (const act of actividadesRecientes) {
          if (act.titulo && mensaje.toLowerCase().includes(act.titulo.toLowerCase().substring(0, 10))) {
            actividadSeleccionada = act;
            break;
          }
        }
      }

      // Si no se encontró, usar la primera actividad disponible
      if (!actividadSeleccionada && actividadesRecientes.length > 0) {
        actividadSeleccionada = actividadesRecientes[0];
      }

      if (!actividadSeleccionada) {
        return 'No encontré actividades disponibles para inscribirte. Primero pídeme recomendaciones con "recomiéndame actividades".';
      }

      return await this.procesarInscripcionPorId(usuarioId, actividadSeleccionada.id);

    } catch (error: any) {
      console.error('Error procesando inscripción:', error);
      return 'Lo siento, hubo un problema al realizar la inscripción. Por favor, inténtalo de nuevo o contacta con el organizador.';
    }
  }
}