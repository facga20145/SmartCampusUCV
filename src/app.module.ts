import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/infrastructure/config/usuario.module';
import { ActividadModule } from './modules/actividad/infrastructure/config/actividad.module';

@Module({
  imports: [ActividadModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
