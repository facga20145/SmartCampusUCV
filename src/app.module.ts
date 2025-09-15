import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/infrastructure/config/usuario.module';
import { ActividadModule } from './modules/actividad/infrastructure/config/actividad.module';
import { InscripcionModule } from './modules/inscripcion/infrastructure/config/inscripcion.module';

@Module({
  imports: [InscripcionModule, ActividadModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
