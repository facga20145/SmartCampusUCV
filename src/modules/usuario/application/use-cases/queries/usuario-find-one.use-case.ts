import { Injectable, NotFoundException } from '@nestjs/common';
import { UsuarioFindByIdService } from '../../../domain/services/queries/usuario-find-by-id.service';
import { UsuarioCreateResponseDto } from '../../dtos/usuario-create-response.dto';

@Injectable()
export class UsuarioFindOneUseCase {
  constructor(private readonly usuarioFindByIdService: UsuarioFindByIdService) {}

  async execute(id: number): Promise<UsuarioCreateResponseDto> {
    const usuario = await this.usuarioFindByIdService.execute(id);
    if (!usuario) throw new NotFoundException('Usuario no encontrado');
    return UsuarioCreateResponseDto.fromEntity(usuario);
  }
}