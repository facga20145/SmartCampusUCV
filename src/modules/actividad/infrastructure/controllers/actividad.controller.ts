import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ActividadCreateUseCase } from '../../application/use-cases/commands/actividad-create.use-case';
import { ActividadUpdateUseCase } from '../../application/use-cases/commands/actividad-update.use-case';
import { ActividadDeleteUseCase } from '../../application/use-cases/commands/actividad-delete.use-case';
import { ActividadFindAllUseCase } from '../../application/use-cases/queries/actividad-find-all.use-case';
import { ActividadFindOneUseCase } from '../../application/use-cases/queries/actividad-find-one.use-case';
import { ActividadCreateRequestDto } from '../../application/dtos/actividad-create-request.dto';
import { ActividadUpdateRequestDto } from '../../application/dtos/actividad-update-request.dto';

@ApiTags('actividades')
@Controller('actividades')
export class ActividadController {
  constructor(
    private readonly createUseCase: ActividadCreateUseCase,
    private readonly updateUseCase: ActividadUpdateUseCase,
    private readonly deleteUseCase: ActividadDeleteUseCase,
    private readonly findAllUseCase: ActividadFindAllUseCase,
    private readonly findOneUseCase: ActividadFindOneUseCase,
  ) {}

  @Post()
  create(@Body() dto: ActividadCreateRequestDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  findAll(
    @Query('categoria') categoria?: string,
    @Query('fechaDesde') fechaDesde?: string,
    @Query('fechaHasta') fechaHasta?: string,
    @Query('lugar') lugar?: string,
    @Query('nivelSostenibilidadMin') nivelSostenibilidadMin?: string,
  ) {
    return this.findAllUseCase.execute({
      categoria,
      fechaDesde: fechaDesde ? new Date(fechaDesde) : undefined,
      fechaHasta: fechaHasta ? new Date(fechaHasta) : undefined,
      lugar,
      nivelSostenibilidadMin: nivelSostenibilidadMin ? Number(nivelSostenibilidadMin) : undefined,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(Number(id));
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: ActividadUpdateRequestDto) {
    return this.updateUseCase.execute({ ...dto, id: Number(id) });
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute(Number(id));
  }
}