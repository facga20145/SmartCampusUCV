import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioFindByEmailService } from '../../../domain/services/queries/usuario-find-by-email.service';
import { UsuarioCreateResponseDto } from '../../dtos/usuario-create-response.dto';

@Injectable()
export class UsuarioFindByEmailUseCase {
  constructor(private readonly usuarioFindByEmailService: UsuarioFindByEmailService) {}

  async execute(email: string): Promise<UsuarioCreateResponseDto> {
    const usuario = await this.usuarioFindByEmailService.execute(email);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return UsuarioCreateResponseDto.fromEntity(usuario);
  }
}
