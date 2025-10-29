import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { InscripcionController } from '../controllers/inscripcion.controller';
import { InscripcionCreateUseCase } from '../../application/use-cases/commands/inscripcion-create.use-case';
import { InscripcionUpdateUseCase } from '../../application/use-cases/commands/inscripcion-update.use-case';
import { InscripcionFindAllUseCase } from '../../application/use-cases/queries/inscripcion-find-all.use-case';
import { InscripcionFindByUsuarioUseCase } from '../../application/use-cases/queries/inscripcion-find-by-usuario.use-case';
import { InscripcionCreateService } from '../../domain/services/commands/inscripcion-create.service';
import { InscripcionUpdateService } from '../../domain/services/commands/inscripcion-update.service';
import { InscripcionDeleteService } from '../../domain/services/commands/inscripcion-delete.service';
import { InscripcionFindAllService } from '../../domain/services/queries/inscripcion-find-all.service';
import { InscripcionFindOneService } from '../../domain/services/queries/inscripcion-find-one.service';
import { InscripcionFindByUsuarioService } from '../../domain/services/queries/inscripcion-find-by-usuario.service';
import { InscripcionRepositoryPort } from '../adapters/ports/inscripcion-repository.port';
import { InscripcionRepositoryImpl } from '../adapters/implements/inscripcion-repository.impl';

@Module({
  imports: [],
  controllers: [InscripcionController],
  providers: [
    InscripcionCreateUseCase,
    InscripcionUpdateUseCase,
    InscripcionFindAllUseCase,
    InscripcionFindByUsuarioUseCase,

    InscripcionCreateService,
    InscripcionUpdateService,
    InscripcionDeleteService,
    InscripcionFindAllService,
    InscripcionFindOneService,
    InscripcionFindByUsuarioService,

    {
      provide: InscripcionRepositoryPort,
      useClass: InscripcionRepositoryImpl,
    },
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient(),
    },
  ],
  exports: [InscripcionRepositoryPort, InscripcionCreateUseCase],
})
export class InscripcionModule {}