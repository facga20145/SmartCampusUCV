import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { AuthRepositoryPort } from '../ports/Auth-repository.port';
  
@Injectable()
export class AuthRepositoryImpl implements AuthRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async findUsuarioByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { correoInstitucional: email } });
  }
}