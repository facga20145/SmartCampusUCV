import { Injectable } from '@nestjs/common';
import { InscripcionFindByUsuarioService } from '../../../domain/services/queries/inscripcion-find-by-usuario.service';
  
@Injectable()
export class InscripcionFindByUsuarioUseCase {
  constructor(private readonly service: InscripcionFindByUsuarioService) {}

  async execute(usuarioId: number): Promise<any[]> {
    return this.service.execute(usuarioId);
  }
}

