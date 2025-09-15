import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ParticipacionController } from '../controllers/participacion.controller';
import { ParticipacionCreateUseCase } from '../../application/use-cases/commands/participacion-create.use-case';
import { ParticipacionUpdateUseCase } from '../../application/use-cases/commands/participacion-update.use-case';
import { ParticipacionFindAllUseCase } from '../../application/use-cases/queries/participacion-find-all.use-case';
import { ParticipacionRankingActividadUseCase } from '../../application/use-cases/queries/participacion-ranking-actividad.use-case';
import { ParticipacionRankingGlobalUseCase } from '../../application/use-cases/queries/participacion-ranking-global.use-case';
import { ParticipacionUpdateService } from '../../domain/services/commands/participacion-update.service';
import { ParticipacionCreateService } from '../../domain/services/commands/participacion-create.service';
import { ParticipacionFindAllService } from '../../domain/services/queries/participacion-find-all.service';
import { ParticipacionRankingActividadService } from '../../domain/services/queries/participacion-ranking-actividad.service';
import { ParticipacionRankingGlobalService } from '../../domain/services/queries/participacion-ranking-global.service';
import { ParticipacionRepositoryPort } from '../adapters/ports/participacion-repository.port';
import { ParticipacionRepositoryImpl } from '../adapters/implements/participacion-repository.impl';

@Module({
  imports: [],
  controllers: [ParticipacionController],
  providers: [
    ParticipacionCreateUseCase,
    ParticipacionUpdateUseCase,
    ParticipacionFindAllUseCase,
    ParticipacionRankingActividadUseCase,
    ParticipacionRankingGlobalUseCase,

    ParticipacionCreateService,
    ParticipacionUpdateService,
    ParticipacionFindAllService,
    ParticipacionRankingActividadService,
    ParticipacionRankingGlobalService,

    { provide: ParticipacionRepositoryPort, useClass: ParticipacionRepositoryImpl },
    { provide: PrismaClient, useFactory: () => new PrismaClient() },
  ],
  exports: [ParticipacionRepositoryPort],
})
export class ParticipacionModule {}