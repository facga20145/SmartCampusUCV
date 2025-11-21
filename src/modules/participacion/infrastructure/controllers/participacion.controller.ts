import { Body, Controller, Get, Param, Patch, Post, Query, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { ParticipacionCreateUseCase } from '../../application/use-cases/commands/participacion-create.use-case';
import { ParticipacionUpdateUseCase } from '../../application/use-cases/commands/participacion-update.use-case';
import { ParticipacionFindAllUseCase } from '../../application/use-cases/queries/participacion-find-all.use-case';
import { ParticipacionFindByUsuarioUseCase } from '../../application/use-cases/queries/participacion-find-by-usuario.use-case';
import { ParticipacionCreateRequestDto } from '../../application/dtos/participacion-create-request.dto';
import { ParticipacionUpdateRequestDto } from '../../application/dtos/participacion-update-request.dto';
import { ParticipacionRankingActividadUseCase } from '../../application/use-cases/queries/participacion-ranking-actividad.use-case';
import { ParticipacionRankingGlobalUseCase } from '../../application/use-cases/queries/participacion-ranking-global.use-case';

@ApiTags('Participaciones')
@Controller('participaciones')
export class ParticipacionController {
  constructor(
    private readonly createUseCase: ParticipacionCreateUseCase,
    private readonly updateUseCase: ParticipacionUpdateUseCase,
    private readonly findAllUseCase: ParticipacionFindAllUseCase,
    private readonly findByUsuarioUseCase: ParticipacionFindByUsuarioUseCase,
    private readonly rankingActividadUc: ParticipacionRankingActividadUseCase,
    private readonly rankingGlobalUc: ParticipacionRankingGlobalUseCase,
    private readonly jwtService: JwtService,
  ) { }

  // Asignar/crear participación (puntos iniciales)
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Registrar participación' })
  @ApiResponse({ status: 201, description: 'Participación registrada' })
  async create(@Body() dto: ParticipacionCreateRequestDto, @Req() req: Request) {
    // Extraer usuarioId del token JWT
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      const usuarioId = decoded.sub;

      return this.createUseCase.execute({
        ...dto,
        usuarioId,
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  // Obtener mis participaciones (del usuario autenticado)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener mis participaciones' })
  @ApiResponse({ status: 200, description: 'Lista de participaciones' })
  async getMyParticipaciones(@Req() req: Request) {
    // Extraer usuarioId del token JWT
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }

    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      const usuarioId = decoded.sub;

      return this.findByUsuarioUseCase.execute(usuarioId);
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  // Actualizar asistencia/feedback/puntos
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar participación (feedback/puntos)' })
  @ApiResponse({ status: 200, description: 'Participación actualizada' })
  update(@Param('id') id: string, @Body() dto: ParticipacionUpdateRequestDto) {
    return this.updateUseCase.execute({ ...dto, id: Number(id) });
  }

  // Ranking por actividad
  @Get('ranking')
  @ApiOperation({ summary: 'Ranking por actividad' })
  @ApiQuery({ name: 'actividadId', required: true })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Ranking de la actividad' })
  ranking(@Query('actividadId') actividadId: string, @Query('limit') limit?: string) {
    return this.rankingActividadUc.execute(Number(actividadId), limit ? Number(limit) : undefined);
  }

  // Ranking global
  @Get('ranking-global')
  @ApiOperation({ summary: 'Ranking global' })
  @ApiQuery({ name: 'limit', required: false })
  @ApiResponse({ status: 200, description: 'Ranking global' })
  rankingGlobal(@Query('limit') limit?: string) {
    return this.rankingGlobalUc.execute(limit ? Number(limit) : undefined);
  }
}