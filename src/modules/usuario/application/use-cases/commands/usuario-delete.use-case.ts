import { Injectable } from '@nestjs/common';
import { UsuarioDeleteService } from '../../../domain/services/commands/usuario-delete.service';

@Injectable()
export class UsuarioDeleteUseCase {
  constructor(private readonly usuarioDeleteService: UsuarioDeleteService) {}

  async execute(id: number): Promise<void> {
    await this.usuarioDeleteService.execute(id);
  }
}