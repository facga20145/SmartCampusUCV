import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ActividadController } from '../controllers/actividad.controller';
import { ActividadCreateUseCase } from '../../application/use-cases/commands/actividad-create.use-case';
import { ActividadUpdateUseCase } from '../../application/use-cases/commands/actividad-update.use-case';
import { ActividadDeleteUseCase } from '../../application/use-cases/commands/actividad-delete.use-case';
import { ActividadFindAllUseCase } from '../../application/use-cases/queries/actividad-find-all.use-case';
import { ActividadFindOneUseCase } from '../../application/use-cases/queries/actividad-find-one.use-case';
import { ActividadCreateService } from '../../domain/services/commands/actividad-create.service';
import { ActividadUpdateService } from '../../domain/services/commands/actividad-update.service';
import { ActividadDeleteService } from '../../domain/services/commands/actividad-delete.service';
import { ActividadFindAllService } from '../../domain/services/queries/actividad-find-all.service';
import { ActividadFindOneService } from '../../domain/services/queries/actividad-find-one.service';
import { ActividadRepositoryPort } from '../adapters/ports/actividad-repository.port';
import { ActividadRepositoryImpl } from '../adapters/implements/actividad-repository.impl';

@Module({
  imports: [],
  controllers: [ActividadController],
  providers: [
    // Use cases
    ActividadCreateUseCase,
    ActividadUpdateUseCase,
    ActividadDeleteUseCase,
    ActividadFindAllUseCase,
    ActividadFindOneUseCase,

    // Domain services
    ActividadCreateService,
    ActividadUpdateService,
    ActividadDeleteService,
    ActividadFindAllService,
    ActividadFindOneService,

    // Repository binding
    {
      provide: ActividadRepositoryPort,
      useClass: ActividadRepositoryImpl,
    },

    // Prisma client
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient(),
    },
  ],
  exports: [ActividadRepositoryPort],
})
export class ActividadModule {}