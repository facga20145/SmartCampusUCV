import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { HttpModule } from '@nestjs/axios';

// Controlador
import { Recomendacion_iaController } from '../controllers/recomendacion_ia.controller';

// Casos de uso - Commands
import { RecomendacionIaCreateUseCase } from '../../application/use-cases/commands/recomendacion_ia-create.use-case';
import { RecomendacionIaUpdateUseCase } from '../../application/use-cases/commands/recomendacion_ia-update.use-case';

// Casos de uso - Queries
import { RecomendacionIaFindAllUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-all.use-case';
import { RecomendacionIaFindOneUseCase } from '../../application/use-cases/queries/recomendacion_ia-find-one.use-case';

// Servicios de dominio
import { Recomendacion_iaCreateService } from '../../domain/services/commands/recomendacion_ia-create.service';
import { Recomendacion_iaUpdateService } from '../../domain/services/commands/recomendacion_ia-update.service';
import { Recomendacion_iaFindAllService } from '../../domain/services/queries/recomendacion_ia-find-all.service';
import { Recomendacion_iaFindOneService } from '../../domain/services/queries/recomendacion_ia-find-one.service';

// Repositorio
import { Recomendacion_iaRepositoryImpl } from '../adapters/implements/recomendacion_ia-repository.impl';
import { RecomendacionIaRepositoryPort } from '../adapters/ports/recomendacion_ia-repository.port';

@Module({
  imports: [HttpModule],
  controllers: [Recomendacion_iaController],
  providers: [
    // Casos de uso - Commands
    RecomendacionIaCreateUseCase,
    RecomendacionIaUpdateUseCase,
    // Casos de uso - Queries
    RecomendacionIaFindAllUseCase,
    RecomendacionIaFindOneUseCase,
    // Servicios de dominio
    Recomendacion_iaCreateService,
    Recomendacion_iaUpdateService,
    Recomendacion_iaFindAllService,
    Recomendacion_iaFindOneService,
    // Repositorio
    {
      provide: RecomendacionIaRepositoryPort,
      useClass: Recomendacion_iaRepositoryImpl,
    },
    // Prisma Client
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient(),
    },
  ],
  exports: [
    RecomendacionIaRepositoryPort,
  ],
})
export class Recomendacion_iaModule {}