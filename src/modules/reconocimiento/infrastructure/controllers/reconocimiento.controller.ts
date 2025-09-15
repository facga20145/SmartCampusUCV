import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReconocimientoCreateUseCase } from '../../application/use-cases/commands/reconocimiento-create.use-case';
import { ReconocimientoCreateRequestDto } from '../../application/dtos/reconocimiento-create-request.dto';
import { PrismaClient } from '@prisma/client';

@ApiTags('reconocimientos')
@Controller('reconocimientos')
export class ReconocimientoController {
  constructor(
    private readonly createUseCase: ReconocimientoCreateUseCase,
    private readonly prisma: PrismaClient,
  ) {}

  // Crear reconocimiento a un usuario
  @Post()
  create(@Body() dto: ReconocimientoCreateRequestDto) {
    return this.createUseCase.execute(dto);
  }

  // Listar reconocimientos por usuario
  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.prisma.reconocimiento.findMany({ where: { usuarioId: Number(usuarioId) } });
  }
}