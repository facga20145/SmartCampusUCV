import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

// Controladores
import { UsuarioController } from '../infrastructure/controllers/usuario.controller';

// Casos de uso
import { CreateUsuarioUseCase } from '../application/use-cases/create-usuario.use-case';
import { UpdateUsuarioUseCase } from '../application/use-cases/update-usuario.use-case';
import { DeleteUsuarioUseCase } from '../application/use-cases/delete-usuario.use-case';
import { FindAllUsuariosUseCase } from '../application/use-cases/find-all-usuarios.use-case';
import { FindUsuarioByIdUseCase } from '../application/use-cases/find-usuario-by-id.use-case';
import { FindUsuarioByEmailUseCase } from '../application/use-cases/find-usuario-by-email.use-case';

// Servicios de dominio
import { UsuarioCreateService } from '../domain/services/commands/usuario-create.service';
import { UsuarioUpdateService } from '../domain/services/commands/usuario-update.service';
import { UsuarioDeleteService } from '../domain/services/commands/usuario-delete.service';
import { UsuarioFindAllService } from '../domain/services/queries/usuario-find-all.service';
import { UsuarioFindByIdService } from '../domain/services/queries/usuario-find-by-id.service';
import { UsuarioFindByEmailService } from '../domain/services/queries/usuario-find-by-email.service';

// Repositorios
import { UsuarioRepositoryImpl } from '../infrastructure/adapters/implements/usuario-repository.impl';
import { UsuarioRepositoryPort } from '../infrastructure/adapters/ports/usuario-repository.port';

@Module({
  imports: [],
  controllers: [UsuarioController],
  providers: [
    // Casos de uso
    CreateUsuarioUseCase,
    UpdateUsuarioUseCase,
    DeleteUsuarioUseCase,
    FindAllUsuariosUseCase,
    FindUsuarioByIdUseCase,
    FindUsuarioByEmailUseCase,
    
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