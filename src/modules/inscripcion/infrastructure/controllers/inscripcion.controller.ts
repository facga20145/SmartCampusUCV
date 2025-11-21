import { Body, Controller, Get, Param, Patch, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { InscripcionCreateUseCase } from '../../application/use-cases/commands/inscripcion-create.use-case';
import { InscripcionUpdateUseCase } from '../../application/use-cases/commands/inscripcion-update.use-case';
import { InscripcionFindAllUseCase } from '../../application/use-cases/queries/inscripcion-find-all.use-case';
import { InscripcionFindByUsuarioUseCase } from '../../application/use-cases/queries/inscripcion-find-by-usuario.use-case';
import { InscripcionCreateRequestDto } from '../../application/dtos/inscripcion-create-request.dto';
import { InscripcionUpdateRequestDto } from '../../application/dtos/inscripcion-update-request.dto';

@ApiTags('Inscripciones')
@Controller('inscripciones')
export class InscripcionController {
  constructor(
    private readonly createUseCase: InscripcionCreateUseCase,
    private readonly updateUseCase: InscripcionUpdateUseCase,
    private readonly findAllUseCase: InscripcionFindAllUseCase,
    private readonly findByUsuarioUseCase: InscripcionFindByUsuarioUseCase,
    private readonly jwtService: JwtService,
  ) { }

  // RF7: inscripción
  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Inscribirse en una actividad' })
  @ApiResponse({ status: 201, description: 'Inscripción creada' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async create(@Body() dto: InscripcionCreateRequestDto, @Req() req: Request) {
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
        usuarioId,
        actividadId: dto.actividadId,
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  // Obtener mis inscripciones (del usuario autenticado)
  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener mis inscripciones' })
  @ApiResponse({ status: 200, description: 'Lista de inscripciones del usuario' })
  async getMyInscripciones(@Req() req: Request) {
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

  // RF8: confirmación/cambio de estado
  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar estado de inscripción' })
  @ApiResponse({ status: 200, description: 'Estado actualizado' })
  update(@Param('id') id: string, @Body() dto: InscripcionUpdateRequestDto) {
    return this.updateUseCase.execute({ ...dto, id: Number(id) });
  }

  // RF9: lista de participantes por actividad
  @Get('actividad/:actividadId')
  @ApiOperation({ summary: 'Listar inscritos en una actividad' })
  @ApiResponse({ status: 200, description: 'Lista de inscritos' })
  findByActividad(@Param('actividadId') actividadId: string) {
    return this.findAllUseCase.execute(Number(actividadId));
  }
}