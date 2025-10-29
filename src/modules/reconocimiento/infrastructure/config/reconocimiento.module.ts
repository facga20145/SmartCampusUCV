import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { JwtModule } from '@nestjs/jwt';
import { ReconocimientoController } from '../controllers/reconocimiento.controller';
import { ReconocimientoCreateUseCase } from '../../application/use-cases/commands/reconocimiento-create.use-case';
import { ReconocimientoCreateService } from '../../domain/services/commands/reconocimiento-create.service';
import { ReconocimientoRepositoryPort } from '../adapters/ports/reconocimiento-repository.port';
import { ReconocimientoRepositoryImpl } from '../adapters/implements/reconocimiento-repository.impl';

@Module({
  imports: [JwtModule],
  controllers: [ReconocimientoController],
  providers: [
    ReconocimientoCreateUseCase,
    ReconocimientoCreateService,
    { provide: ReconocimientoRepositoryPort, useClass: ReconocimientoRepositoryImpl },
    { provide: PrismaClient, useFactory: () => new PrismaClient() },
  ],
  exports: [ReconocimientoRepositoryPort],
})
export class ReconocimientoModule {}