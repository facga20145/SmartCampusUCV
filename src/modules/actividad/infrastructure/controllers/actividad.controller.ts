import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiQuery } from '@nestjs/swagger';
import { ActividadCreateUseCase } from '../../application/use-cases/commands/actividad-create.use-case';
import { ActividadUpdateUseCase } from '../../application/use-cases/commands/actividad-update.use-case';
import { ActividadDeleteUseCase } from '../../application/use-cases/commands/actividad-delete.use-case';
import { ActividadFindAllUseCase } from '../../application/use-cases/queries/actividad-find-all.use-case';
import { ActividadFindOneUseCase } from '../../application/use-cases/queries/actividad-find-one.use-case';
import { ActividadCreateRequestDto } from '../../application/dtos/actividad-create-request.dto';
import { ActividadUpdateRequestDto } from '../../application/dtos/actividad-update-request.dto';
import { ApiDoc } from '../../../../common/decorators/api-doc.decorator';

@ApiTags('Actividades')
@Controller('actividades')
export class ActividadController {
  constructor(
    private readonly createUseCase: ActividadCreateUseCase,
    private readonly updateUseCase: ActividadUpdateUseCase,
    private readonly deleteUseCase: ActividadDeleteUseCase,
    private readonly findAllUseCase: ActividadFindAllUseCase,
    private readonly findOneUseCase: ActividadFindOneUseCase,
  ) { }

  @Post()
  @ApiDoc({
    summary: 'Crear una nueva actividad',
    ok: { status: 201, description: 'Actividad creada' },
  })
  create(@Body() dto: ActividadCreateRequestDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  @ApiQuery({ name: 'categoria', required: false })
  @ApiQuery({ name: 'fechaDesde', required: false })
  @ApiQuery({ name: 'fechaHasta', required: false })
  @ApiQuery({ name: 'lugar', required: false })
  @ApiQuery({ name: 'nivelSostenibilidadMin', required: false, type: Number })
  @ApiDoc({
    summary: 'Listar actividades con filtros',
    ok: { status: 200, description: 'Lista de actividades filtradas' },
  })
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
  @ApiDoc({
    summary: 'Obtener actividad por ID',
    ok: { status: 200, description: 'Actividad encontrada' },
    notFound: true,
  })
  findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(Number(id));
  }

  @Patch(':id')
  @ApiDoc({
    summary: 'Actualizar actividad',
    ok: { status: 200, description: 'Actividad actualizada' },
  })
  update(@Param('id') id: string, @Body() dto: ActividadUpdateRequestDto) {
    return this.updateUseCase.execute({ ...dto, id: Number(id) });
  }

  @Delete(':id')
  @ApiDoc({
    summary: 'Eliminar actividad',
    ok: { status: 200, description: 'Actividad eliminada' },
  })
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute(Number(id));
  }
}