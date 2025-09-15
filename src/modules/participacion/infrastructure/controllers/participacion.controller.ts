import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ParticipacionCreateUseCase } from '../../application/use-cases/commands/participacion-create.use-case';
import { ParticipacionUpdateUseCase } from '../../application/use-cases/commands/participacion-update.use-case';
import { ParticipacionFindAllUseCase } from '../../application/use-cases/queries/participacion-find-all.use-case';
import { ParticipacionCreateRequestDto } from '../../application/dtos/participacion-create-request.dto';
import { ParticipacionUpdateRequestDto } from '../../application/dtos/participacion-update-request.dto';
import { ParticipacionRankingActividadUseCase } from '../../application/use-cases/queries/participacion-ranking-actividad.use-case';
import { ParticipacionRankingGlobalUseCase } from '../../application/use-cases/queries/participacion-ranking-global.use-case';

@ApiTags('participaciones')
@Controller('participaciones')
export class ParticipacionController {
  constructor(
    private readonly createUseCase: ParticipacionCreateUseCase,
    private readonly updateUseCase: ParticipacionUpdateUseCase,
    private readonly findAllUseCase: ParticipacionFindAllUseCase,
    private readonly rankingActividadUc: ParticipacionRankingActividadUseCase,
    private readonly rankingGlobalUc: ParticipacionRankingGlobalUseCase,
  ) {}

  // Asignar/crear participación (puntos iniciales)
  @Post()
  create(@Body() dto: ParticipacionCreateRequestDto) {
    return this.createUseCase.execute(dto as any);
  }

  // Actualizar asistencia/feedback/puntos
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ParticipacionUpdateRequestDto) {
    return this.updateUseCase.execute({ ...dto, id: Number(id) });
  }

  // Ranking por actividad
  @Get('ranking')
  ranking(@Query('actividadId') actividadId: string, @Query('limit') limit?: string) {
    return this.rankingActividadUc.execute(Number(actividadId), limit ? Number(limit) : undefined);
  }

  // Ranking global
  @Get('ranking-global')
  rankingGlobal(@Query('limit') limit?: string) {
    return this.rankingGlobalUc.execute(limit ? Number(limit) : undefined);
  }
}