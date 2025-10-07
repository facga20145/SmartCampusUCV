import { Body, Controller, Post } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller('chatbot')
export class ChatbotController {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly httpService: HttpService,
  ) {}

  @Post('mensaje')
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

    // Procesar el mensaje
    if (mensaje.toLowerCase().includes('recomend') || mensaje.toLowerCase().includes('actividad')) {
      // El usuario está pidiendo recomendaciones
      respuestaBot = await this.procesarRecomendacion(usuarioId);
    } else if (mensaje.toLowerCase().includes('hola') || mensaje.toLowerCase().includes('salud')) {
      respuestaBot = '¡Hola! Soy el asistente de SmartCampus. ¿En qué puedo ayudarte? Puedes pedirme recomendaciones de actividades.';
    } else {
      respuestaBot = 'No entiendo tu mensaje. Puedes pedirme recomendaciones de actividades o saludarme.';
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
      fecha: interaccion.fecha
    };
  }

  private async procesarRecomendacion(usuarioId: number): Promise<string> {
    try {
      // Verificar si el usuario tiene preferencias
      const preferencias = await this.prisma.preferenciaUsuario.findMany({
        where: { usuarioId }
      });

      if (preferencias.length === 0) {
        return 'Para darte recomendaciones personalizadas, necesito conocer tus preferencias. ¿Qué tipo de actividades te gustan? (deportiva, artistica, voluntariado, canto)';
      }

      // Obtener actividades
      const actividades = await this.prisma.actividad.findMany();

      // Preparar datos para la IA
      const actividadesParaIA = actividades.map(act => ({
        id: act.id,
        categoria: act.categoria,
        titulo: act.titulo,
        descripcion: act.descripcion
      }));

      const preferenciasParaIA = preferencias.map(pref => ({
        categoria: pref.categoria
      }));

      // Llamar al microservicio Python
      const response = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:8000/recomendar', {
          actividades: actividadesParaIA,
          preferencias: preferenciasParaIA
        })
      );

      // Formatear respuesta
      const recomendaciones = response.data.recomendaciones;
      if (recomendaciones.length === 0) {
        return 'No encontré actividades que coincidan con tus preferencias. ¿Te gustaría explorar otros tipos de actividades?';
      }

      let respuesta = 'Basándome en tus preferencias, te recomiendo estas actividades:\n\n';
      recomendaciones.forEach((rec: any, index: number) => {
        respuesta += `${index + 1}. ${rec.titulo} (${rec.categoria})\n`;
        if (rec.descripcion) {
          respuesta += `   ${rec.descripcion}\n`;
        }
      });

      return respuesta;

    } catch (error) {
      return 'Lo siento, hubo un problema al generar las recomendaciones. Por favor, inténtalo de nuevo.';
    }
  }
}