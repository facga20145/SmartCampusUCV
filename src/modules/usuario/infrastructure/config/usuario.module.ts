import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Controladores
import { UsuarioController } from '../../infrastructure/controllers/usuario.controller';

// Casos de uso - Commands
import { UsuarioCreateUseCase } from '../../application/use-cases/commands/usuario-create.use-case';
import { UsuarioUpdateUseCase } from '../../application/use-cases/commands/usuario-update.use-case';
import { UsuarioDeleteUseCase } from '../../application/use-cases/commands/usuario-delete.use-case';

// Casos de uso - Queries
import { UsuarioFindAllUseCase } from '../../application/use-cases/queries/usuario-find-all.use-case';
import { UsuarioFindOneUseCase } from '../../application/use-cases/queries/usuario-find-one.use-case';
import { UsuarioFindByEmailUseCase } from '../../application/use-cases/queries/usuario-find-by-email.use-case';

// Servicios de dominio
import { UsuarioCreateService } from '../../domain/services/commands/usuario-create.service';
import { UsuarioUpdateService } from '../../domain/services/commands/usuario-update.service';
import { UsuarioDeleteService } from '../../domain/services/commands/usuario-delete.service';
import { UsuarioFindAllService } from '../../domain/services/queries/usuario-find-all.service';
import { UsuarioFindByIdService } from '../../domain/services/queries/usuario-find-by-id.service';
import { UsuarioFindByEmailService } from '../../domain/services/queries/usuario-find-by-email.service';

// Repositorios
import { UsuarioRepositoryImpl } from '../../infrastructure/adapters/implements/usuario-repository.impl';
import { UsuarioRepositoryPort } from '../../infrastructure/adapters/ports/usuario-repository.port';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [
    // Casos de uso - Commands
    UsuarioCreateUseCase,
    UsuarioUpdateUseCase,
    UsuarioDeleteUseCase,

    // Casos de uso - Queries
    UsuarioFindAllUseCase,
    UsuarioFindOneUseCase,
    UsuarioFindByEmailUseCase,
    
    // Servicios de dominio
    UsuarioCreateService,
    UsuarioUpdateService,
    UsuarioDeleteService,
    UsuarioFindAllService,
    UsuarioFindByIdService,
    UsuarioFindByEmailService,
    
    // Repositorios
    {
      provide: UsuarioRepositoryPort,
      useClass: UsuarioRepositoryImpl,
    },
    
    // Prisma Client
    {
      provide: PrismaClient,
      useFactory: () => new PrismaClient(),
    },
  ],
  exports: [
    UsuarioRepositoryPort,
  ],
})
export class UsuarioModule {}