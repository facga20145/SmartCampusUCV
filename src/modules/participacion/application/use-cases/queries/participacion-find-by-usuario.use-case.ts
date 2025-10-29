import { Injectable } from '@nestjs/common';
import { ParticipacionFindByUsuarioService } from '../../../domain/services/queries/participacion-find-by-usuario.service';
import { ParticipacionEntity } from '../../../domain/entities/participacion.entity';
  
@Injectable()
export class ParticipacionFindByUsuarioUseCase {
  constructor(private readonly service: ParticipacionFindByUsuarioService) {}

  async execute(usuarioId: number): Promise<ParticipacionEntity[]> {
    return this.service.execute(usuarioId);
  }
}

