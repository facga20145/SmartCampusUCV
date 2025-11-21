import { Body, Controller, Delete, Get, Param, Post, Patch, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ActividadCreateUseCase } from '../../application/use-cases/commands/actividad-create.use-case';
import { ActividadUpdateUseCase } from '../../application/use-cases/commands/actividad-update.use-case';
import { ActividadDeleteUseCase } from '../../application/use-cases/commands/actividad-delete.use-case';
import { ActividadFindAllUseCase } from '../../application/use-cases/queries/actividad-find-all.use-case';
import { ActividadFindOneUseCase } from '../../application/use-cases/queries/actividad-find-one.use-case';
import { ActividadCreateRequestDto } from '../../application/dtos/actividad-create-request.dto';
import { ActividadUpdateRequestDto } from '../../application/dtos/actividad-update-request.dto';

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
  @ApiOperation({ summary: 'Crear una nueva actividad' })
  @ApiResponse({ status: 201, description: 'Actividad creada' })
  create(@Body() dto: ActividadCreateRequestDto) {
    return this.createUseCase.execute(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar actividades con filtros' })
  @ApiQuery({ name: 'categoria', required: false })
  @ApiQuery({ name: 'fechaDesde', required: false })
  @ApiQuery({ name: 'fechaHasta', required: false })
  @ApiQuery({ name: 'lugar', required: false })
  @ApiQuery({ name: 'nivelSostenibilidadMin', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'Lista de actividades filtradas' })
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
  @ApiOperation({ summary: 'Obtener actividad por ID' })
  @ApiResponse({ status: 200, description: 'Actividad encontrada' })
  @ApiResponse({ status: 404, description: 'Actividad no encontrada' })
  findOne(@Param('id') id: string) {
    return this.findOneUseCase.execute(Number(id));
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar actividad' })
  @ApiResponse({ status: 200, description: 'Actividad actualizada' })
  update(@Param('id') id: string, @Body() dto: ActividadUpdateRequestDto) {
    return this.updateUseCase.execute({ ...dto, id: Number(id) });
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar actividad' })
  @ApiResponse({ status: 200, description: 'Actividad eliminada' })
  remove(@Param('id') id: string) {
    return this.deleteUseCase.execute(Number(id));
  }
}