import { Body, Controller, Get, Post, Req, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import type { Request } from 'express';
import { HashUtil } from '../../../../utils/hash.util';
import { AuthRepositoryPort } from '../adapters/ports/Auth-repository.port';
import { AuthLoginResponseDto } from '../../application/dtos/Auth-create-response.dto';
import { LoginRequestDto } from '../../application/dtos/Auth-create-request.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaClient,
    private readonly authRepo: AuthRepositoryPort,
  ) { }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión de usuario' })
  @ApiResponse({ status: 200, description: 'Login exitoso', type: AuthLoginResponseDto })
  @ApiResponse({ status: 401, description: 'Credenciales inválidas' })
  async login(@Body() body: LoginRequestDto): Promise<AuthLoginResponseDto> {
    const usuario = await this.authRepo.findUsuarioByEmail(body.correoInstitucional);
    if (!usuario) throw new UnauthorizedException('Credenciales inválidas');
    const ok = await HashUtil.comparePassword(body.contrasena, usuario.contrasena);
    if (!ok) throw new UnauthorizedException('Credenciales inválidas');
    const payload = { sub: usuario.id, rol: usuario.rol };
    const accessToken = await this.jwtService.signAsync(payload);
    const user = {
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correoInstitucional: usuario.correoInstitucional,
      rol: usuario.rol,
      intereses: usuario.intereses ?? undefined,
      hobbies: usuario.hobbies ?? undefined,
      foto: usuario.foto ?? undefined,
    };
    return { accessToken, user };
  }

  @Get('me')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener información del usuario actual' })
  @ApiResponse({ status: 200, description: 'Perfil de usuario recuperado' })
  @ApiResponse({ status: 401, description: 'No autorizado' })
  async me(@Req() req: Request) {
    const auth = req.headers.authorization || '';
    const token = auth.startsWith('Bearer ') ? auth.slice(7) : undefined;
    if (!token) throw new UnauthorizedException('Token requerido');
    try {
      const decoded: any = await this.jwtService.verifyAsync(token);
      const usuario = await this.prisma.usuario.findUnique({ where: { id: decoded.sub } });
      if (!usuario) throw new UnauthorizedException('Usuario no encontrado');
      return {
        user: {
          id: usuario.id,
          nombre: usuario.nombre,
          apellido: usuario.apellido,
          correoInstitucional: usuario.correoInstitucional,
          rol: usuario.rol,
          intereses: usuario.intereses ?? undefined,
          hobbies: usuario.hobbies ?? undefined,
          foto: usuario.foto ?? undefined,
        },
      };
    } catch {
      throw new UnauthorizedException('Token inválido');
    }
  }
}