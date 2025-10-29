import { Body, Controller, Get, Param, Post, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReconocimientoCreateUseCase } from '../../application/use-cases/commands/reconocimiento-create.use-case';
import { ReconocimientoCreateRequestDto } from '../../application/dtos/reconocimiento-create-request.dto';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

@ApiTags('reconocimientos')
@Controller('reconocimientos')
export class ReconocimientoController {
  constructor(
    private readonly createUseCase: ReconocimientoCreateUseCase,
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  // Crear reconocimiento a un usuario (solo admin/organizador)
  @Post()
  create(@Body() dto: ReconocimientoCreateRequestDto) {
    return this.createUseCase.execute(dto);
  }

  // Listar todos los reconocimientos (para admin)
  @Get()
  async findAll() {
    return this.prisma.reconocimiento.findMany({
      include: {
        usuario: {
          select: {
            id: true,
            nombre: true,
            apellido: true,
            correoInstitucional: true,
          },
        },
      },
      orderBy: {
        fecha: 'desc',
      },
    });
  }

  // Obtener mis reconocimientos (del usuario autenticado)
  @Get('mis-reconocimientos')
  async getMyReconocimientos(@Req() req: Request) {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
    if (!token) {
      throw new UnauthorizedException('Token requerido');
    }
    
    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      const usuarioId = decoded.sub;
      
      return this.prisma.reconocimiento.findMany({
        where: { usuarioId },
        orderBy: {
          fecha: 'desc',
        },
      });
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }

  // Listar reconocimientos por usuario (por ID)
  @Get('usuario/:usuarioId')
  async findByUsuario(@Param('usuarioId') usuarioId: string) {
    return this.prisma.reconocimiento.findMany({
      where: { usuarioId: Number(usuarioId) },
      orderBy: {
        fecha: 'desc',
      },
    });
  }
}