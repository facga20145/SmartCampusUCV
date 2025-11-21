import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch, Req, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';
import type { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AI_CONFIG } from '../../../../config/ai.config';
import { RecomendacionIaCreateUseCase } from '../../application/use-cases/commands/recomendacion_ia-create.use-case';
import { RecomendacionIaUpdateUseCase } from '../../application/use-cases/commands/recomendacion_ia-update.use-case';
import { RecomendacionIaFindAllUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-all.use-case';
import { RecomendacionIaFindOneUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-one.use-case';
import { RecomendacionIaCreateRequestDto } from '../../application/dtos/recomendacion_ia-create-request.dto';
import { RecomendacionIaCreateResponseDto } from '../../application/dtos/recomendacion_ia-create-response.dto';
import { RecomendacionIaUpdateRequestDto } from '../../application/dtos/recomendacion_ia-update-request.dto';
import { RecomendacionIaUpdateResponseDto } from '../../application/dtos/recomendacion_ia-update-response.dto';
import { InscripcionCreateUseCase } from '../../../inscripcion/application/use-cases/commands/inscripcion-create.use-case';

@ApiTags('Recomendaciones IA')
@Controller('recomendaciones-ia')
export class Recomendacion_iaController {
  constructor(
    private readonly createRecomendacionIaUseCase: RecomendacionIaCreateUseCase,
    private readonly updateRecomendacionIaUseCase: RecomendacionIaUpdateUseCase,
    private readonly findAllRecomendacionIaUseCase: RecomendacionIaFindAllUseCase,
    private readonly findOneRecomendacionIaUseCase: RecomendacionIaFindOneUseCase,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
    private readonly inscripcionCreateUseCase: InscripcionCreateUseCase,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Crear recomendación IA manual' })
  @ApiResponse({ status: 201, description: 'Recomendación creada', type: RecomendacionIaCreateResponseDto })
  async create(@Body() dto: RecomendacionIaCreateRequestDto): Promise<RecomendacionIaCreateResponseDto> {
    return this.createRecomendacionIaUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las recomendaciones' })
  @ApiResponse({ status: 200, description: 'Lista de recomendaciones', type: [RecomendacionIaCreateResponseDto] })
  async findAll(): Promise<RecomendacionIaCreateResponseDto[]> {
    return this.findAllRecomendacionIaUseCase.execute();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener recomendación por ID' })
  @ApiResponse({ status: 200, description: 'Recomendación encontrada', type: RecomendacionIaCreateResponseDto })
  @ApiResponse({ status: 404, description: 'Recomendación no encontrada' })
  async findById(@Param('id', ParseIntPipe) id: number): Promise<RecomendacionIaCreateResponseDto> {
    return this.findOneRecomendacionIaUseCase.execute(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar recomendación' })
  @ApiResponse({ status: 200, description: 'Recomendación actualizada', type: RecomendacionIaUpdateResponseDto })
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: RecomendacionIaUpdateRequestDto): Promise<RecomendacionIaUpdateResponseDto> {
    return this.updateRecomendacionIaUseCase.execute({ id, ...dto });
  }

  @Post('personalizadas')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Generar recomendación personalizada con IA' })
  @ApiResponse({ status: 200, description: 'Recomendación generada exitosamente' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async recomendarPersonalizada(@Req() req: Request, @Body() body?: { user_query?: string }) {
    // Extraer usuarioId del token JWT
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    let usuarioId: number;
    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      usuarioId = decoded.sub;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    // 1. Obtener actividades disponibles
    const actividades = await this.prisma.actividad.findMany({
      where: {
        fecha: {
          gte: new Date() // Solo actividades futuras
        }
      }
    });

    // 2. Obtener preferencias del usuario
    const preferencias = await this.prisma.preferenciaUsuario.findMany({
      where: { usuarioId }
    });

    // 3. Obtener historial de participación del usuario
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

    // 4. Preparar datos para el microservicio de IA (nuevo formato)
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
      nivel_interes: 1 // Puedes ajustar esto según tu modelo de datos
    }));

    // 5. Llamar al microservicio de IA
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${AI_CONFIG.SERVICE_URL}/recomendar`, {
          usuario_id: usuarioId,
          actividades: actividadesParaIA,
          preferencias: preferenciasParaIA,
          historial_participacion: historialParticipacion,
          user_query: body?.user_query || null
        })
      );

      // 6. Guardar la recomendación en la BD
      const recomendacion = await this.prisma.recomendacionIA.create({
        data: {
          usuarioId,
          tipo: 'personalizada',
          aceptada: false
        }
      });

      // 7. Devolver respuesta mejorada
      return {
        id: recomendacion.id,
        usuarioId,
        recomendaciones: response.data.recomendaciones || [],
        response_text: response.data.response_text,
        fecha: recomendacion.fecha,
        tipo: recomendacion.tipo
      };
    } catch (error: any) {
      console.error('Error al obtener recomendaciones de IA:', error);
      throw new Error(`Error al obtener recomendaciones de IA: ${error.message || 'Error desconocido'}`);
    }
  }

  // Endpoint para inscripción automática cuando el usuario acepta una recomendación
  @Post('inscribir/:actividadId')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Inscribirse desde una recomendación' })
  @ApiResponse({ status: 200, description: 'Inscripción realizada exitosamente' })
  @ApiResponse({ status: 400, description: 'Ya inscrito o error en inscripción' })
  async inscribirDesdeRecomendacion(
    @Param('actividadId', ParseIntPipe) actividadId: number,
    @Req() req: Request
  ) {
    // Extraer usuarioId del token JWT
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    let usuarioId: number;
    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      usuarioId = decoded.sub;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }

    // Verificar que la actividad existe
    const actividad = await this.prisma.actividad.findUnique({
      where: { id: actividadId }
    });

    if (!actividad) {
      throw new Error('Actividad no encontrada');
    }

    // Verificar que no esté ya inscrito
    const inscripcionExistente = await this.prisma.inscripcion.findFirst({
      where: {
        usuarioId,
        actividadId,
        estado: {
          in: ['pendiente', 'confirmada']
        }
      }
    });

    if (inscripcionExistente) {
      return {
        success: false,
        message: 'Ya estás inscrito en esta actividad',
        inscripcion: inscripcionExistente
      };
    }

    // Crear la inscripción
    try {
      const inscripcion = await this.inscripcionCreateUseCase.execute({
        usuarioId,
        actividadId
      });

      // Actualizar recomendación como aceptada si existe
      const recomendacion = await this.prisma.recomendacionIA.findFirst({
        where: {
          usuarioId,
          actividadId
        },
        orderBy: {
          fecha: 'desc'
        }
      });

      if (recomendacion) {
        await this.prisma.recomendacionIA.update({
          where: { id: recomendacion.id },
          data: { aceptada: true }
        });
      }

      return {
        success: true,
        message: 'Inscripción realizada exitosamente',
        inscripcion
      };
    } catch (error: any) {
      throw new Error(`Error al realizar la inscripción: ${error.message}`);
    }
  }
}