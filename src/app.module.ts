import { ChatbotModule } from './modules/chatbot/infrastructure/config/chatbot.module';
import { Recomendacion_iaModule } from './modules/recomendacion_ia/infrastructure/config/recomendacion_ia.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsuarioModule } from './modules/usuario/infrastructure/config/usuario.module';
import { ActividadModule } from './modules/actividad/infrastructure/config/actividad.module';
import { InscripcionModule } from './modules/inscripcion/infrastructure/config/inscripcion.module';
import { ParticipacionModule } from './modules/participacion/infrastructure/config/participacion.module';
import { ReconocimientoModule } from './modules/reconocimiento/infrastructure/config/reconocimiento.module';

@Module({
  imports: [ChatbotModule, Recomendacion_iaModule, ReconocimientoModule, ParticipacionModule, InscripcionModule, ActividadModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
