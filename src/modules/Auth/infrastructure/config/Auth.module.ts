import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
import { AuthController } from '../controllers/Auth.controller';
import { AuthRepositoryPort } from '../adapters/ports/Auth-repository.port';
import { AuthRepositoryImpl } from '../adapters/implements/Auth-repository.impl';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'dev-secret',
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient(),
    },
    {
      provide: AuthRepositoryPort,
      useClass: AuthRepositoryImpl,
    },
  ],
})
export class AuthModule {}