import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InscripcionCreateUseCase } from '../../application/use-cases/commands/inscripcion-create.use-case';
import { InscripcionUpdateUseCase } from '../../application/use-cases/commands/inscripcion-update.use-case';
import { InscripcionFindAllUseCase } from '../../application/use-cases/queries/inscripcion-find-all.use-case';
import { InscripcionCreateRequestDto } from '../../application/dtos/inscripcion-create-request.dto';
import { InscripcionUpdateRequestDto } from '../../application/dtos/inscripcion-update-request.dto';

@ApiTags('inscripciones')
@Controller('inscripciones')
export class InscripcionController {
  constructor(
    private readonly createUseCase: InscripcionCreateUseCase,
    private readonly updateUseCase: InscripcionUpdateUseCase,
    private readonly findAllUseCase: InscripcionFindAllUseCase,
  ) {}

  // RF7: inscripción
  @Post()
  create(@Body() dto: InscripcionCreateRequestDto) {
    return this.createUseCase.execute(dto);
  }

  // RF8: confirmación/cambio de estado
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: InscripcionUpdateRequestDto) {
    return this.updateUseCase.execute({ ...dto, id: Number(id) });
  }

  // RF9: lista de participantes por actividad
  @Get('actividad/:actividadId')
  findByActividad(@Param('actividadId') actividadId: string) {
    return this.findAllUseCase.execute(Number(actividadId));
  }
}