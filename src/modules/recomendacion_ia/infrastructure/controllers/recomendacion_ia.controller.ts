import { Body, Controller, Get, Param, ParseIntPipe, Post, Patch } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaClient } from '@prisma/client';
import { firstValueFrom } from 'rxjs';
import { RecomendacionIaCreateUseCase } from '../../application/use-cases/commands/recomendacion_ia-create.use-case';
import { RecomendacionIaUpdateUseCase } from '../../application/use-cases/commands/recomendacion_ia-update.use-case';
import { RecomendacionIaFindAllUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-all.use-case';
import { RecomendacionIaFindOneUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-one.use-case';
import { RecomendacionIaCreateRequestDto } from '../../application/dtos/recomendacion_ia-create-request.dto';
import { RecomendacionIaCreateResponseDto } from '../../application/dtos/recomendacion_ia-create-response.dto';
import { RecomendacionIaUpdateRequestDto } from '../../application/dtos/recomendacion_ia-update-request.dto';
import { RecomendacionIaUpdateResponseDto } from '../../application/dtos/recomendacion_ia-update-response.dto';

@Controller('recomendaciones-ia')
export class Recomendacion_iaController {
  constructor(
    private readonly createRecomendacionIaUseCase: RecomendacionIaCreateUseCase,
    private readonly updateRecomendacionIaUseCase: RecomendacionIaUpdateUseCase,
    private readonly findAllRecomendacionIaUseCase: RecomendacionIaFindAllUseCase,
    private readonly findOneRecomendacionIaUseCase: RecomendacionIaFindOneUseCase,
    private readonly httpService: HttpService,
    private readonly prisma: PrismaClient,
  ) {}

  @Post()
  async create(@Body() dto: RecomendacionIaCreateRequestDto): Promise<RecomendacionIaCreateResponseDto> {
    return this.createRecomendacionIaUseCase.execute(dto);
  }

  @Get()
  async findAll(): Promise<RecomendacionIaCreateResponseDto[]> {
    return this.findAllRecomendacionIaUseCase.execute();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<RecomendacionIaCreateResponseDto> {
    return this.findOneRecomendacionIaUseCase.execute(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: RecomendacionIaUpdateRequestDto): Promise<RecomendacionIaUpdateResponseDto> {
    return this.updateRecomendacionIaUseCase.execute({ id, ...dto });
  }

  @Post('personalizadas/:usuarioId')
  async recomendarPersonalizada(@Param('usuarioId', ParseIntPipe) usuarioId: number) {
    // 1. Obtener actividades disponibles
    const actividades = await this.prisma.actividad.findMany();
    
    // 2. Obtener preferencias del usuario
    const preferencias = await this.prisma.preferenciaUsuario.findMany({
      where: { usuarioId }
    });

    // 3. Preparar datos para el microservicio Python
    const actividadesParaIA = actividades.map(act => ({
      id: act.id,
      categoria: act.categoria,
      titulo: act.titulo,
      descripcion: act.descripcion
    }));

    const preferenciasParaIA = preferencias.map(pref => ({
      categoria: pref.categoria
    }));

    // 4. Llamar al microservicio Python
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://127.0.0.1:8000/recomendar', {
          actividades: actividadesParaIA,
          preferencias: preferenciasParaIA
        })
      );

      // 5. Guardar la recomendación en la BD
      const recomendacion = await this.prisma.recomendacionIA.create({
        data: {
          usuarioId,
          tipo: 'personalizada',
          aceptada: false
        }
      });

      // 6. Devolver respuesta
      return {
        id: recomendacion.id,
        usuarioId,
        recomendaciones: response.data.recomendaciones,
        fecha: recomendacion.fecha,
        tipo: recomendacion.tipo
      };
    } catch (error) {
      throw new Error(`Error al obtener recomendaciones de IA: ${error.message}`);
    }
  }
}